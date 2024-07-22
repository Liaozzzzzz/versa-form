<script>
import debounce from "lodash/debounce";
import omit from "lodash/omit";
import { h } from "vue";
import { ElMessageBox, ElButton, ElPopconfirm } from "element-plus";
import "element-plus/es/components/message-box/style/css";
import "element-plus/es/components/button/style/css";
import "element-plus/es/components/popconfirm/style/css";
import { noop, isEmpty } from "./utils";
import { instanceProxy } from "./mixins/proxy";
import IconWarning from "./assets/warning.svg";
import IconClose from "./assets/close.svg";

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
        confirmType: "popconfirm",
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
          ElMessageBox({
            message: () => {
              return h("div", { class: "versa-message-box__container" }, [
                h("img", {
                  src: IconClose,
                  class: "versa-message-box__close",
                  onClick: () => {
                    ElMessageBox.close();
                  },
                }),
                h(
                  "div",
                  {
                    class: "versa-message-box__content",
                  },
                  [
                    h("img", {
                      src: IconWarning,
                      class: "versa-message-box__icon",
                    }),
                    h("div", { class: "versa-message-box__wrap" }, [
                      isEmpty(this.confirmProps.title)
                        ? undefined
                        : h(
                            "div",
                            {
                              class: "versa-message-box__title",
                            },
                            this.confirmProps.title
                          ),
                      h(
                        "div",
                        {
                          class: "versa-message-box__message",
                        },
                        this.confirmProps.message
                      ),
                    ]),
                  ]
                ),
              ]);
            },
            showCancelButton: true,
            ...omit(this.confirmProps, ["title", "message", "type"]),
            customClass: `versa-message-box ${
              this.confirmProps.customClass || ""
            }`,
          })
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
        // height: unset;
      }
    }
  }

  &__icon {
    width: 20px;
    height: 20px;
    margin-right: 6px;
  }
}

.versa-message-box {
  &.el-message-box {
    min-width: 470px;
    padding: 0;

    &__message {
      width: 100%;
    }

    .el-message-box__btns {
      margin: 0 30px 20px 0;
      & .el-button {
        height: 35px;
        padding: 10px 30px;
      }
    }
  }

  &__close {
    position: absolute;
    top: 23px;
    right: 15px;
    width: 13px;
    height: 13px;
    cursor: pointer;
  }

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
    width: 100%;
    background: url("./assets/header.svg") top center no-repeat;

    &.show-close {
      padding-right: 0;
    }
  }

  &__content {
    display: flex;
    padding: 56px 85px 0;
  }

  &__icon {
    margin-right: 14px;
  }

  &__wrap {
    display: flex;
    flex-direction: column;
  }

  &__title {
    font-size: 20px;
    color: #333333;
    margin-bottom: 12px;
  }

  &__message {
    font-size: 14px;
    color: #999999;
  }
}
</style>
