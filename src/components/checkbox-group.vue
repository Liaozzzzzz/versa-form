<script>
import pick from "lodash/pick";
import mapKeys from "lodash/mapKeys";
import { h } from "vue";
import { ElCheckboxButton, ElCheckbox, ElCheckboxGroup } from "element-plus";
import "element-plus/es/components/checkbox-button/style/css";
import "element-plus/es/components/checkbox/style/css";
import "element-plus/es/components/checkbox-group/style/css";
import { isObject } from "./utils";

export default {
  name: "versa-checkbox-group",
  inheritAttrs: false,
  props: {
    /** 配置项，{label: '', value: ''} */
    options: {
      type: Array,
      default: () => [],
    },
    // 渲染map对象
    mapSource: {
      type: Object,
    },
    modelValue: {
      type: Array,
    },
    labelInValue: {
      type: [Object, Boolean],
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    button: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: "edit",
    },
  },
  emits: ["update:modelValue"],
  computed: {
    mergedOptions() {
      const res = [];
      // mapSource配置优先级最高
      if (this.mapSource) {
        Object.keys(this.mapSource).forEach((key) => {
          res.push({
            label: this.mapSource[key],
            value: key,
          });
        });
      } else {
        res.push(...this.options);
      }

      return res;
    },
    innerValue: {
      get() {
        if (this.labelInValue) {
          return (
            this.modelValue?.map(
              (item) => item[this.labelInValue?.value ?? "value"]
            ) ?? []
          );
        }
        return this.modelValue || [];
      },
      set(newValue) {
        if (!this.labelInValue) {
          this.$emit("update:modelValue", newValue);
          return;
        }

        const target =
          this.mergedOptions?.filter((option) =>
            newValue.includes(option.value)
          ) ?? [];
        const emitValue = target.map((item) => {
          let picked = pick(item, ["label", "value"]);
          if (isObject(this.labelInValue)) {
            picked = mapKeys(picked, (_, key) => this.labelInValue[key] || key);
          }
          return picked;
        });
        this.$emit("update:modelValue", emitValue);
      },
    },
    /** 是否预览状态 */
    isPreview() {
      return this.status === "preview";
    },
    /** 预览状态的显示内容 */
    previewText() {
      if (!this.isPreview) {
        return "";
      }

      return this.mergedOptions
        ?.filter((option) => this.innerValue.includes(option.value))
        .map((item) => item.label)
        .join("、");
    },
  },
  methods: {
    // 绑定属性
    bindProps(item) {
      const checkboxProps = { ...item, border: this.border };
      // 移除冗余属性
      delete checkboxProps.label;
      delete checkboxProps.value;
      delete checkboxProps.checked;

      return checkboxProps;
    },
  },
  render() {
    if (this.isPreview) {
      return h(
        "div",
        {
          ref: "renderText",
          class: "versa-form__item--preview",
        },
        { default: () => this.previewText }
      );
    }

    const children = this.mergedOptions.map((option) => {
      const optionAttribute = {
        ...this.bindProps(option),
        value: option.value,
      };
      return h(this.button ? ElCheckboxButton : ElCheckbox, optionAttribute, {
        default: () => option.label,
      });
    });

    // 根组件属性
    const attribute = {
      ...this.$attrs,
      modelValue: this.innerValue,
      "onUpdate:modelValue": (newVal) => (this.innerValue = newVal),
      class: `versa-checkbox-group ${this.$attrs.class || ""}`,
      ref: "versaCheckboxGroup",
    };

    return h(ElCheckboxGroup, attribute, {
      default: () => children,
    });
  },
};
</script>

<style lang="scss"></style>
