<template>
  <component
    :is="panelType"
    destroy-on-close
    v-model="dialogVisible"
    v-bind="undefProps"
    :before-close="beforeClose"
    v-if="dialogVisible"
  >
    <div
      v-loading="loading"
      :class="{ 'is-scrollable': !!scrollStyles }"
      :style="scrollStyles"
    >
      <VersaForm
        v-if="useForm"
        v-bind="mergedFormProps"
        class="versa-modal__form"
        ref="formRef"
        :autoInitValue="false"
        v-model="formValues"
      >
        <template
          v-for="slotName in Object.keys($slots).filter(
            (item) => item !== 'modalFooter'
          )"
          v-slot:[slotName]="attrs"
        >
          <slot :name="slotName" v-bind="attrs"></slot>
        </template>
      </VersaForm>
      <slot
        v-bind="{ model: formValues, actionType, loading, refresh: initForm }"
      >
      </slot>
    </div>
    <ElSpace :size="20" class="versa-modal__footer" v-if="dialogActions.length">
      <template v-for="action in dialogActions" :key="action.actionType">
        <component
          v-if="action.is"
          v-bind="action"
          :is="action.is"
          v-on="action.on || {}"
        />
        <VersaButton
          v-bind="action"
          @click="(e, instance) => onAction(action, instance)"
        >
          {{ action.actionName }}
        </VersaButton>
      </template>
    </ElSpace>
  </component>
</template>

<script>
import { mergeProps } from "vue";
import { ElSpace, ElLoading, ElDialog, ElDrawer } from "element-plus";
import "element-plus/theme-chalk/src/space.scss";
import "element-plus/theme-chalk/src/loading.scss";
import "element-plus/theme-chalk/src/dialog.scss";
import "element-plus/theme-chalk/src/drawer.scss";
import VersaForm from "./form.vue";
import VersaButton from "./button.vue";
import { formPropsMixins } from "./mixins/props";
import { hasOwnProperty, isObject, noop } from "./utils";

const presetActions = {
  cancel: {
    actionType: "cancel",
    actionName: "取消",
  },
  confirm: {
    actionType: "confirm",
    actionName: "确认",
    type: "primary",
  },
};

export default {
  name: "versa-modal",
  components: {
    VersaForm,
    VersaButton,
    ElSpace,
    ElDialog,
    ElDrawer,
  },
  directives: {
    loading: ElLoading.directive,
  },
  mixins: [formPropsMixins],
  props: {
    /** 受控显隐 */
    visible: {
      type: Boolean,
      default: undefined,
    },
    /** 操作按钮 */
    actions: {
      type: [String, Array, Function],
      default: () => "cancel,confirm",
    },
    /** 点击确认回调 */
    onOk: {
      type: Function,
      default: noop,
    },
    /** 弹窗类型：el-dialog | el-drawer */
    panelType: {
      type: String,
      default: "el-dialog",
    },
    /** 弹窗表单展示时格式化 */
    formatBefore: {
      type: Function,
      default: noop,
    },
    /** 表单配置属性 */
    formProps: {
      type: Object,
    },
    maxHeight: {
      type: String,
    },
  },
  emits: ["update:visible"],
  data() {
    return {
      innerVisible: false,
      formValues: {},
      loading: false,
    };
  },
  computed: {
    /** 是否受控 */
    isControl() {
      // 判断是否显式传入visible
      return typeof this.visible !== "undefined";
    },
    /** 是否显示弹窗 */
    dialogVisible: {
      get() {
        return this.isControl ? this.visible : this.innerVisible;
      },
      set(val) {
        if (this.isControl) {
          this.$emit("update:visible", val);
        } else {
          this.innerVisible = val;
        }
      },
    },
    /** 表单通用属性 */
    mergedFormProps() {
      return Object.keys(formPropsMixins.props).reduce(
        (prev, curr) => {
          if (typeof this[curr] !== "undefined") {
            Object.assign(prev, {
              [curr]: this[curr],
            });
          }
          return prev;
        },
        { ...this.formProps }
      );
    },
    /** 弹窗操作栏 */
    dialogActions() {
      let actionsToArr =
        typeof this.actions === "string"
          ? this.actions.split(",")
          : this.actions;

      if (typeof this.actions === "function") {
        actionsToArr = this.actions(this.formValues);
      }

      return actionsToArr
        ?.map((action) => {
          if (typeof action === "string") {
            return presetActions[action];
          }
          if (
            (isObject(action) &&
              hasOwnProperty(action, "actionName") &&
              hasOwnProperty(action, "actionType")) ||
            action?.is
          ) {
            return {
              ...action,
              disabled:
                typeof action.disabled === "function"
                  ? action.disabled.bind(this, this.formValues)
                  : action.disabled,
            };
          }
          return null;
        })
        .filter(Boolean);
    },
    /** 透传的props */
    undefProps() {
      return mergeProps(
        { class: "versa-modal" },
        {
          size: this.$attrs.width,
        },
        this.$attrs
      );
    },
    /** 允许内容区域滚动 */
    scrollStyles() {
      let validValue = null;
      if (/.*vh$/.test(this.maxHeight)) {
        validValue = this.maxHeight;
      } else if (/^\d+(\.\d+)?(px)?$/.test(this.maxHeight)) {
        validValue = `${this.maxHeight}px`.replace(/(px)*$/, "px");
      }

      return validValue
        ? {
            "max-height": validValue,
            "overflow-y": "auto",
          }
        : validValue;
    },
    useForm() {
      return this.mergedFormProps.options?.length > 0;
    },
  },
  watch: {
    dialogVisible: {
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.initForm();
          });
        } else {
          this.formValues = {};
        }
      },
      immediate: true,
    },
  },
  methods: {
    // 初始化表单数据
    async initForm() {
      let results = { ...this.defaultValues };
      if (typeof this.formatBefore === "function") {
        try {
          this.loading = true;
          results = await this.formatBefore(results, this.close);
        } catch (error) {}
      }
      this.loading = false;
      if (this.useForm) {
        this.$refs.formRef?.addInitValue(results);
      } else {
        this.formValues = results;
      }
    },
    /** 操作按钮回调函数 */
    async onAction(action, instance) {
      switch (action.actionType) {
        case "cancel":
          if (typeof this.undefProps["before-close"] === "function") {
            this.undefProps["before-close"](this.close);
          } else {
            this.dialogVisible = false;
          }
          break;
        case "confirm":
          this.onConfirm(instance);
          break;
        default:
          const validated =
            !action.validate ||
            !this.useForm ||
            (await this.$refs.formRef?.validate().catch(() => false));
          if (!validated) {
            return;
          }
          action.action?.(this.formValues, instance, {
            ...action,
            close: this.close,
          });
          break;
      }
    },
    /** 点击确认 */
    async onConfirm(instance) {
      try {
        instance.isLoading = true;
        if (this.useForm) {
          await this.$refs.formRef?.validate();
        }
        await this.onOk?.(this.formValues);
        instance.isLoading = false;
        this.dialogVisible = false;
      } catch (error) {
        instance.isLoading = false;
        // console.error(error);
      }
    },
    /** 关闭弹窗,受控逻辑 */
    beforeClose(...args) {
      if (typeof this.$attrs.beforeClose === "function") {
        this.$attrs.beforeClose(...args);
      } else {
        this.dialogVisible = false;
      }
    },
    /** 关闭弹窗 */
    close() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss">
.versa-modal {
  &.el-dialog {
    padding: 0;
  }

  .el-dialog__header {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 68px;
    background: linear-gradient(to right, #0477fd 0%, #65defd 100%) no-repeat,
      url("./assets/header.svg") center center repeat;
    background-size: 100% 8px, cover;
    text-align: center;
    vertical-align: middle;

    .el-dialog__title {
      margin-top: 8px;
      color: #333333;
      font-weight: bold;
    }

    &.show-close {
      padding-right: 0;
    }
  }

  .el-dialog__body,
  .el-drawer__body {
    display: flex;
    flex-direction: column;
  }

  .el-dialog__body {
    padding: 0 30px 30px;
  }

  .versa-modal__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-shrink: 0;

    .versa-button {
      padding: 10px 30px;
    }
  }

  .versa-repeater {
    padding: 0;
  }

  .is-scrollable {
    margin-bottom: 20px;

    &::-webkit-scrollbar {
      height: 8px;
      width: 8px;
      margin-right: 4px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 9999px;
      background-color: transparent;

      &:hover {
        background-color: rgba(148, 163, 184, 0.25);
      }
    }

    &::-webkit-scrollbar-thumb {
      border: 1px solid transparent;
      border-radius: 9999px;
      background-color: rgba(71, 85, 105, 0.5);
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: rgba(148, 163, 184, 1);
    }

    &::-webkit-scrollbar-thumb {
      visibility: hidden;
    }
    &:hover::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }

  &__form {
    flex: 1;
  }
}
</style>
