<script>
import pick from "lodash/pick";
import mapKeys from "lodash/mapKeys";
import { h, resolveComponent } from "vue";
import { ElRadioButton, ElRadio, ElRadioGroup } from "element-plus";
import "element-plus/es/components/radio/style/css";
import "element-plus/es/components/radio-button/style/css";
import "element-plus/es/components/radio-group/style/css";
import { isObject } from "./utils";

export default {
  name: "versa-radio-group",
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
      type: [String, Number, Boolean, Object],
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
          return this.modelValue?.[this.labelInValue?.value ?? "value"];
        }

        return this.modelValue;
      },
      set(newValue) {
        if (!this.labelInValue) {
          this.$emit("update:modelValue", newValue);
          return;
        }

        const target = this.mergedOptions?.find(
          (option) => option.value === newValue
        );
        if (!target) {
          this.$emit("update:modelValue", target);
          return;
        }

        let emitValue = pick(target, ["label", "value"]);
        if (isObject(this.labelInValue)) {
          emitValue = mapKeys(
            emitValue,
            (_, key) => this.labelInValue[key] || key
          );
        }
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

      return (
        this.mergedOptions?.find((option) => option.value === this.innerValue)
          ?.label ?? ""
      );
    },
  },
  methods: {
    // 绑定属性
    bindProps(item) {
      const radioProps = { ...item, border: this.border };
      // 移除冗余属性
      delete radioProps.label;
      delete radioProps.value;

      return radioProps;
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
        {
          default: () => this.previewText,
        }
      );
    }

    const children = this.mergedOptions.map((option) => {
      const optionAttribute = {
        ...this.bindProps(option),
        value: option.value,
      };
      return h(this.button ? ElRadioButton : ElRadio, optionAttribute, {
        default: () => option.label,
      });
    });

    // 根组件属性
    const attribute = {
      ...this.$attrs,
      modelValue: this.innerValue,
      // 拦截el-select的input事件， 外部v-model走自定义逻辑
      "onUpdate:modelValue": (newVal) => (this.innerValue = newVal),
      class: "versa-radio-group",
      ref: "versaRadioGroup",
    };

    return h(ElRadioGroup, attribute, {
      default: () => children,
    });
  },
};
</script>

<style lang="scss"></style>
