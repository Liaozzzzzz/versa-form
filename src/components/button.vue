<script>
import debounce from "lodash/debounce";
import omit from "lodash/omit";
import { h } from "vue";
import { ElButton, ElPopconfirm } from "element-plus";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/popconfirm/style/css";
import { noop } from "./utils";
import { instanceProxy } from "./mixins/proxy";
import VersaMessageBox from "./message-box";

export default {
  name: "versa-button",
  inheritAttrs: false,
  mixins: [instanceProxy],
  props: {
    debounce: {
      type: Number,
      default: 200,
    },
    leading: {
      type: Boolean,
      default: true,
    },
    trailing: {
      type: Boolean,
      default: false,
    },
    /** 外部控制loading */
    loading: {
      type: Boolean,
    },
    /** 按钮文案 */
    buttonText: {
      type: String,
    },
    /** 二次弹窗校验 */
    popconfirm: {
      type: [String, Object],
    },
    /** 是否禁用 */
    disabled: {
      type: [Boolean, Function],
    },
  },
  emits: ["click"],
  data() {
    return {
      isLoading: false,
      text: "",
    };
  },
  computed: {
    /** 二次确认弹窗参数 */
    confirmProps() {
      return {
        confirmType: "messageBox",
        ...(typeof this.popconfirm === "string"
          ? { title: this.popconfirm }
          : this.popconfirm),
      };
    },
    /** 二次弹窗是否为popconfirm */
    isPopconfirm() {
      return this.popconfirm && this.confirmProps.confirmType === "popconfirm";
    },
    /** 二次弹窗是否为messageBox */
    isMessageBox() {
      return this.popconfirm && this.confirmProps.confirmType === "messageBox";
    },
    /** 按钮防抖 */
    debouncedClick() {
      return debounce(
        (e) => {
          if (!this.isMessageBox) {
            return this.$emit("click", e, this.proxyPageCore(this));
          }
          VersaMessageBox(this.confirmProps)
            .then(() => {
              this.$emit("click", e, this.proxyPageCore(this));
            })
            .catch(() => {
              this.$attrs.onCancel?.();
            });
        },
        this.debounce,
        {
          leading: this.leading,
          trailing: this.trailing,
        }
      );
    },
    /** 是否禁用 */
    isDisabled() {
      return typeof this.disabled === "function"
        ? this.disabled(this.proxyPageCore(this))
        : this.disabled;
    },
  },
  watch: {
    /** 允许外部loading状态直接控制内部loading */
    loading: {
      handler() {
        this.isLoading = this.loading;
      },
      immediate: true,
    },
    /** 外部文案联动 */
    buttonText: {
      handler() {
        this.text = this.buttonText;
      },
      immediate: true,
    },
  },
  render() {
    // 根组件属性
    const attribute = {
      ...omit(this.$attrs, [
        "actionType",
        "actionName",
        "actions",
        "actionIcon",
      ]),
      loading: this.isLoading,
      onClick: this.isPopconfirm ? noop : this.debouncedClick,
      disabled: this.isDisabled,
      class: ["versa-button", this.$attrs.class],
      ref: "versaButton",
    };

    const buttonELement = h(ElButton, attribute, {
      default: () => [
        this.$attrs.actionIcon
          ? h("span", {
              class: "versa-button__icon",
              style: `background:url(${this.$attrs.actionIcon}) center center no-repeat;`,
            })
          : null,
        this.text || this.$slots.default?.(),
      ],
    });

    return this.isPopconfirm
      ? h(
          ElPopconfirm,
          {
            ...this.confirmProps,
            onCancel: this.$attrs.onCancel || noop,
            onConfirm: this.debouncedClick,
          },
          {
            reference: () => buttonELement,
          }
        )
      : buttonELement;
  },
};
</script>

<style lang="scss">
.versa-button {
  &.el-button {
    height: 35px;
    line-height: normal;

    &.el-button--small {
      height: 30px;
    }

    &--primary:not(.is-disabled) {
      background-color: #2f88ff;

      &.is-link {
        color: #2f88ff;
        background-color: unset;
      }
    }

    &--primary:is(.is-disabled) {
      &.is-link {
        color: #b8b8b8;
      }
    }
  }

  &__icon {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
}
</style>
