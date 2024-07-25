<script>
import { h } from "vue";
import TinyEmitter from "tiny-emitter";
import get from "lodash/get";
import upperFirst from "lodash/upperFirst";
import dayjs from "dayjs";
import AsyncValidator from "async-validator";
import { isEmpty, toArray, noop, isObject } from "./utils";
import VersaLabelWrap from "./label-wrap.vue";
import VersaCard from "./card.vue";

export default {
  name: "versa-form-item",
  inheritAttrs: false,
  props: {
    status: {
      type: String,
      default: "edit",
    },
    tips: String,
    label: String,
    labelWidth: String,
    /** label样式 */
    labelType: [String, Object],
    prop: String,
    required: {
      type: Boolean,
      default: undefined,
    },
    rules: [Object, Array],
    error: String,
    validateStatus: String,
    for: String,
    inlineMessage: {
      type: [String, Boolean],
      default: "",
    },
    showMessage: {
      type: Boolean,
      default: true,
    },
    size: String,
  },
  provide() {
    return {
      VersaFormItem: this,
    };
  },
  inject: {
    VersaForm: {
      default: null,
    },
  },
  data() {
    return {
      validateState: "",
      validateMessage: "",
      computedLabelWidth: "",
      fields: [],
    };
  },
  computed: {
    /** 标签配置 */
    labelConfig() {
      const baseConfig = {
        border: true,
        type: "line",
      };
      if (typeof this.labelType === "string") {
        return {
          ...baseConfig,
          type: this.labelType,
        };
      }

      if (isObject(this.labelType)) {
        return { ...baseConfig, ...this.labelType };
      }

      return baseConfig;
    },
    optionConfig() {
      return this.$attrs.optionConfig || {};
    },
    interceptPreview() {
      return this.status === "preview" && !this.optionConfig.useCustomPreview;
    },
    previewText() {
      // 不需要预览，则不进行任何计算。
      if (!this.interceptPreview) {
        return "";
      }

      const { format, element } = this.optionConfig;

      // 日期类： el-date-picker等
      if (/.*date.*/.test(element)) {
        const valueToArr = toArray(this.fieldValue)
          .map((item) => {
            if (isEmpty(item)) {
              return null;
            }
            return typeof format === "string"
              ? dayjs(item).format(format)
              : item;
          })
          .filter(Boolean);
        return valueToArr.join(" ~ ");
      }

      // 通用文本
      return typeof format === "function"
        ? format(this.fieldValue, this.optionConfig)
        : this.fieldValue;
    },
    labelFor() {
      return this.for || this.prop;
    },
    labelStyle() {
      const ret = {};
      if (this.VersaForm.labelPosition === "top") {
        return ret;
      }
      const labelWidth = this.labelWidth || this.VersaForm.labelWidth;
      if (labelWidth === "auto") {
        ret.width = labelWidth;
      } else if (labelWidth) {
        ret.width = `${labelWidth}px`.replace(/(px)*$/, "px");
      }
      return ret;
    },
    isRequired() {
      return this.formItemRules.some((rule) => !!rule.required);
    },
    sizeClass() {
      return this.size || this.VersaForm.size;
    },
    fieldValue() {
      const model = this.VersaForm.model;
      if (!model || !this.prop) {
        return;
      }

      let path = this.prop;
      if (path.indexOf(":") !== -1) {
        path = path.replace(/:/, ".");
      }

      return get(model, path);
    },
    formItemRules() {
      let formRules = this.VersaForm.rules;
      const selfRules = this.rules;
      const requiredRule =
        this.required !== undefined ? { required: !!this.required } : [];

      const prop = get(formRules, this.prop || "");
      formRules = formRules ? prop[this.prop || ""] || prop.v : [];

      return [].concat(selfRules || formRules || []).concat(requiredRule);
    },
    /** 表单项校验的触发节点，change映射为input */
    validateTrigger() {
      const triggers = this.formItemRules.map((rule) =>
        rule.trigger === "change"
          ? "update:modelValue"
          : rule.trigger || "update:modelValue"
      );
      return triggers;
    },
  },
  created() {
    // 注册专属emitter，用于管控form事件
    this.$emitter = new TinyEmitter();

    // 监听表单字段注册
    this.$emitter.on("addField", (field) => {
      this.fields.push(field);
    });

    // 监听表单字段移除
    this.$emitter.on("removeField", (field) => {
      this.fields = this.fields.filter((f) => f !== field);
    });
  },
  mounted() {
    if (this.prop) {
      this.VersaForm?.$emitter.emit("addField", this);
    }
  },
  beforeUnmount() {
    this.VersaForm?.$emitter.emit("removeField", this);
  },
  methods: {
    // 拦截trigger: input、blur等
    proxyEvent(nodes) {
      return nodes.map?.((node) => {
        if (node.children?.length) {
          this.proxyEvent(node.children);
        }

        // 需绑定v-model才算做表单子节点
        if (!node.props?.["onUpdate:modelValue"]) {
          return false;
        }
        for (const key in node.props) {
          if (Object.hasOwnProperty.call(node.props, key)) {
            const fn = node.props[key];
            if (typeof fn === "function") {
              node.props[key] = (...args) => fn(...args, this.VersaForm);
            }
          }
        }
        const prevProps = { ...node.props };
        this.validateTrigger.forEach((trigger) => {
          const eventName = `on${upperFirst(trigger)}`;
          Object.assign(node.props, {
            [eventName]: (...args) => {
              prevProps[eventName]?.(...args);
              this.validate(trigger);
            },
          });
        });
      });
    },
    validate(trigger, callback = noop) {
      const rules = this.formItemRules
        .filter((rule) => {
          if (
            !rule.trigger ||
            trigger === "" ||
            (trigger === "update:modelValue" &&
              ["input", "change"].includes(rule.trigger))
          ) {
            return true;
          }
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.indexOf(trigger) > -1;
          } else {
            return rule.trigger === trigger;
          }
        })
        .map((rule) => Object.assign({}, rule));

      // formItem没有定义规则且不是子表单则直接返回校验通过
      if (rules.length === 0 && !this.fields.length) {
        callback(true, {});
        return true;
      }

      this.validateState = "validating";

      let valid = true;
      let count = 0;
      let totalCount = this.fields.length + (rules.length ? 1 : 0);

      const invalidFields = {
        [this.prop]: [],
      };

      if (rules.length !== 0) {
        const descriptor = {};
        if (rules && rules.length > 0) {
          rules.forEach((rule) => {
            delete rule.trigger;
          });
        }
        descriptor[this.prop] = rules;

        const validator = new AsyncValidator(descriptor);

        validator.validate(
          { [this.prop]: this.fieldValue },
          { firstFields: true },
          (errors, errorields) => {
            this.validateState = !errors ? "success" : "error";
            this.validateMessage = errors ? errors[0].message : "";

            if (errors) {
              valid = false;
              invalidFields[this.prop].push(...errorields[this.prop]);
            }

            if (typeof callback === "function" && ++count === totalCount) {
              callback(valid, valid ? {} : invalidFields);
            }

            this.VersaForm?.$emit(
              "validate",
              this.prop,
              !errors,
              this.validateMessage || null
            );
          }
        );
      }

      this.fields.forEach((field) => {
        field.validate((isValid, errorields) => {
          if (!isValid) {
            valid = false;
            invalidFields[this.prop].push(...Object.values(errorields).flat());
          }

          if (typeof callback === "function" && ++count === totalCount) {
            callback(valid, valid ? {} : invalidFields);
          }
        });
      });
    },
    clearValidate() {
      this.validateState = "";
      this.validateMessage = "";
      this.fields?.forEach((field) => {
        field.clearValidate();
      });
    },
    updateComputedLabelWidth(width) {
      this.computedLabelWidth = width ? `${width}px` : "";
    },
  },
  render() {
    const children = [];

    if (this.interceptPreview) {
      children.push(this.previewText?.toString?.() ?? this.previewText);
    } else {
      children.push(...this.$slots.default?.());

      if (this.status !== "preview") {
        this.proxyEvent(children);
      }
    }

    const showErrorMsg =
      this.validateState === "error" &&
      this.showMessage &&
      this.VersaForm.showMessage;
    const isCard = this.labelConfig.type === "card";
    const showTips = !!this.tips && !showErrorMsg && !isCard;

    if (showErrorMsg) {
      children.push(
        h("transition", { name: "el-zoom-in-top" }, [
          this.$slots.error?.({
            error: this.validateMessage,
          }) ??
            h(
              "div",
              {
                class: [
                  "versa-form-item__error",
                  {
                    "versa-form-item__error--inline":
                      typeof this.inlineMessage === "boolean"
                        ? this.inlineMessage
                        : this.VersaForm?.inlineMessage ?? false,
                  },
                ],
              },
              [this.validateMessage]
            ),
        ])
      );
    }

    const elements = [
      h(
        "div",
        {
          class: [
            "versa-form-item__content",
            `versa-form-item__content--${this.status}`,
            {
              "versa-form-item--mb": !showTips && !isCard,
            },
          ],
          style: this.$attrs.contentStyle,
        },
        {
          default: () => children,
        }
      ),
    ];

    if (!isCard) {
      elements.unshift(
        h(
          VersaLabelWrap,
          {
            isAutoWidth: this.labelStyle && this.labelStyle.width === "auto",
            updateAll: this.VersaForm.labelWidth === "auto",
          },
          {
            default: () => [
              this.label || this.$slots.label
                ? h(
                    "label",
                    {
                      for: this.labelFor,
                      class: "versa-form-item__label",
                      style: this.labelStyle,
                    },
                    [
                      this.$slots.label ||
                        `${this.label || ""}${
                          this.VersaForm.labelSuffix || ""
                        }`,
                    ]
                  )
                : null,
            ],
          }
        )
      );
    }

    const instance = h(
      isCard ? VersaCard : "div",
      {
        ref: "VersaFormItem",
        class: [
          "versa-form-item",
          `versa-form-item--${this.status}`,
          {
            "versa-form-item--feedback": this.VersaForm?.statusIcon,
            "is-error": this.validateState === "error",
            "is-validating": this.validateState === "validating",
            "is-success": this.validateState === "success",
            "is-required": this.isRequired || this.required,
            "is-no-asterisk": this.VersaForm?.hideRequiredAsterisk,
            [`versa-form-item--${this.sizeClass}`]: !!this.sizeClass,
            "versa-form-item--card": isCard,
            "versa-form-item--mb": isCard,
          },
          this.$attrs.class,
        ],
        ...(isCard
          ? {
              ...this.labelConfig,
              title: this.label,
            }
          : {}),
        style: this.$attrs.itemStyle,
      },
      {
        default: () => [elements],
      }
    );

    if (!isCard && this.tips) {
      return h("div", {}, [
        instance,
        !showErrorMsg
          ? h("div", {
              class: [
                "versa-form-item__tips",
                {
                  "versa-form-item--mb": showTips,
                },
              ],
              style: {
                "margin-left":
                  this.labelStyle.width === "auto"
                    ? this.VersaForm?.autoLabelWidth
                    : this.labelStyle.width,
              },
              innerHTML: this.tips,
            })
          : null,
      ]);
    }

    return instance;
  },
};
</script>
