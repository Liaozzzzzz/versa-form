<script>
import { h } from "vue";
import pick from "lodash/pick";
import mapKeys from "lodash/mapKeys";
import { ElDropdownItem, ElDropdown, ElDropdownMenu } from "element-plus";
import "element-plus/es/components/dropdown/style/css";
import "element-plus/es/components/dropdown-item/style/css";
import "element-plus/es/components/dropdown-menu/style/css";
import VersaButton from "./button.vue";
import { isObject } from "./utils";

export default {
  name: "versa-dropdown",
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
    labelInValue: {
      type: [Object, Boolean],
      default: false,
    },
    /** 操作文案 */
    text: {
      type: [String, Object],
    },
    icon: {
      type: String,
      default: "el-icon-arrow-down el-icon--right",
    },
    /** 外部控制loading */
    loading: {
      type: Boolean,
    },
  },
  data() {
    return {
      isLoading: false,
    };
  },
  watch: {
    /** 允许外部loading状态直接控制内部loading */
    loading: {
      handler() {
        this.isLoading = this.loading;
      },
      immediate: true,
    },
  },
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
  },
  methods: {
    // 绑定属性
    bindProps(item) {
      const dropdownProps = { ...item };

      // 移除冗余属性
      delete dropdownProps.label;
      delete dropdownProps.value;

      return dropdownProps;
    },
    /** 点击回调 */
    onAction(val) {
      if (!this.labelInValue) {
        this.$emit("command", val, this);
        return;
      }
      const target = this.mergedOptions?.find((option) => val === option.value);
      const picked = pick(target, ["label", "value"]);
      const emitValue = mapKeys(
        picked,
        (_, key) => this.labelInValue[key] || key
      );
      this.$emit("command", emitValue, this);
    },
  },
  render() {
    if (
      ((isObject(this.text) && !this.text.text) || !this.text) &&
      !this.$slots.default
    ) {
      return null;
    }
    // 根组件属性
    const attribute = {
      placement: "bottom",
      ...this.$attrs,
      onCommand: this.onAction,
      class: "versa-dropdown",
      ref: "versaDropdown",
    };

    // children处理
    const dropdownItems = this.mergedOptions.map((option) => {
      const optionAttribute = {
        ...this.bindProps(option),
        command: option.value,
        class: "versa-dropdown-item",
      };
      return h(ElDropdownItem, optionAttribute, {
        default: () => option.label,
      });
    });

    const children = [];

    if (this.$attrs["split-button"]) {
      children.push(isObject(this.text) ? this.text.text : this.text);
    } else if (typeof this.text === "string") {
      const subChildren = [this.text];
      if (this.icon) {
        subChildren.push(h("i", { class: this.icon }));
      }
      children.push(
        h(
          VersaButton,
          {
            type: "primary",
            link: true,
            disabled: this.$attrs.disabled,
            loading: this.isLoading,
          },
          { default: () => subChildren }
        )
      );
    } else if (isObject(this.text)) {
      children.push(
        h(
          VersaButton,
          {
            type: "primary",
            link: true,
            ...this.text,
            disabled: this.$attrs.disabled,
            loading: this.isLoading,
          },
          { default: () => this.text.text }
        )
      );
    } else {
      children.push(this.$slots.default?.());
    }

    return h(ElDropdown, attribute, {
      default: () => children,
      dropdown: () =>
        h(
          ElDropdownMenu,
          { slot: "dropdown" },
          { default: () => dropdownItems }
        ),
    });
  },
};
</script>

<style lang="scss">
.versa-dropdown.el-dropdown [disabled]:is(.el-button--text.is-loading) {
  color: #409eff;
}

.versa-dropdown {
  .el-tooltip__trigger {
    outline: none;
  }
}
</style>
