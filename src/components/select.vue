<script>
import pick from "lodash/pick";
import mapKeys from "lodash/mapKeys";
import { h, resolveComponent } from "vue";
import { ElOption, ElOptionGroup, ElSelect } from "element-plus";
import "element-plus/es/components/select/style/css";
import "element-plus/es/components/option/style/css";
import "element-plus/es/components/option-group/style/css";
import { isEmpty, toArray, isObject } from "./utils";

export default {
  inheritAttrs: false,
  name: "versa-select",
  props: {
    // 是否有全部
    hasAll: {
      type: Boolean,
      default: false,
    },
    // 全部的value
    valueOfAll: {
      type: String,
      default: "SELECT_ALL_999999",
    },
    // 是否多谢
    multiple: {
      type: Boolean,
      default: false,
    },
    // 表单值
    modelValue: {
      type: [Array, String, Number, Object],
      default() {
        return null;
      },
    },
    // 选项列表
    options: {
      type: Array,
      default() {
        return [];
      },
    },
    // 渲染map对象
    mapSource: {
      type: Object,
    },
    labelInValue: {
      type: [Object, Boolean],
      default: false,
    },
    status: {
      type: String,
      default: "edit",
    },
  },
  emits: ["update:modelValue"],
  computed: {
    mergedHasAll() {
      // 多选和全部不可同时存在
      return this.hasAll && !this.multiple;
    },
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

      // 塞入默认全部选项
      if (this.mergedHasAll) {
        res.unshift({
          label: "全部",
          value: this.valueOfAll,
        });
      }
      return res;
    },
    innerValue: {
      get() {
        const valueAsArr = toArray(this.modelValue);
        const realVal = !this.labelInValue
          ? valueAsArr
          : valueAsArr?.map(
              (item) => item[this.labelInValue?.value ?? "value"]
            ) ?? [];

        if (this.multiple) {
          return realVal;
        }

        return isEmpty(realVal[0]) && this.mergedHasAll
          ? this.valueOfAll
          : realVal[0];
      },
      set(newValue) {
        if (
          !this.labelInValue ||
          newValue === this.valueOfAll ||
          isEmpty(newValue)
        ) {
          this.$emit(
            "update:modelValue",
            newValue === this.valueOfAll ? null : newValue
          );
          return;
        }

        const valueAsArr = toArray(newValue);
        const target =
          this.mergedOptions?.filter((option) =>
            valueAsArr.includes(option.value)
          ) ?? [];
        const emitValue = target.map((item) => {
          let picked = pick(item, ["label", "value"]);
          if (isObject(this.labelInValue)) {
            picked = mapKeys(picked, (_, key) => this.labelInValue[key] || key);
          }
          return picked;
        });
        this.$emit(
          "update:modelValue",
          this.multiple ? emitValue : emitValue[0]
        );
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
      const valueAsArr = toArray(this.innerValue);
      return this.mergedOptions
        ?.filter((option) => valueAsArr.includes(option.value))
        .map((item) => item.label)
        .join("、");
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
        this.previewText
      );
    }

    const children = this.mergedOptions.map((option) => {
      const optionAttribute = {
        label: option.label,
        value: option.value,
        disabled: option.disabled,
      };
      // 分组场景支持
      const hasGroup = option.children?.length > 0;
      const optionChildren =
        option.children?.map((child) => {
          const childAttribute = {
            props: {
              label: child.label,
              value: child.value,
              disabled: child.disabled,
            },
          };
          return h(ElOption, childAttribute);
        }) ?? [];
      return h(hasGroup ? ElOptionGroup : ElOption, optionAttribute, {
        default: () => optionChildren,
      });
    });

    // 合并默认插槽数据
    const mergedSlots = Object.keys(this.$slots).map((slot) => {
      if (slot === "default") {
        return this.$slots[slot]();
      }
      return this.$slots[slot]();
    });
    const mergedChildren = [...children, ...mergedSlots];

    // 根组件属性
    const attribute = {
      teleported: false,
      ...this.$attrs,
      multiple: this.multiple,
      modelValue: this.innerValue,
      "onUpdate:modelValue": (newVal) => (this.innerValue = newVal),
      class: `versa-select ${this.$attrs.class || ""}`,
      ref: "versaSelectRef",
    };

    return h(ElSelect, attribute, {
      default: () => mergedChildren,
    });
  },
};
</script>

<style lang="scss">
.versa-select {
  display: flex;
  align-items: center;

  .el-select__wrapper {
    width: 100%;
  }
}
</style>
