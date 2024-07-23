<template>
  <component
    :is="component"
    :class="[
      'versa-form',
      {
        'versa-form--inline': inline,
        [`versa-form--label-${labelPosition}`]: !!labelPosition,
      },
    ]"
  >
    <ElRow v-if="layout" :gutter="20">
      <ElSpace
        v-for="item in deployOptions"
        :key="item.prop"
        :span="item.colSpan"
      >
        <VersaFormItem
          v-bind="bindFormItemProps(item)"
          :prop="item.prop"
          :label="item.label || ''"
          :rules="item.rules"
          :status="item.status"
        >
          <slot
            v-if="item.slotName"
            :name="item.slotName"
            v-bind:data="model"
            v-bind="item"
          ></slot>
          <component
            v-else
            :is="item.element"
            v-on="bindEvent(item)"
            v-bind="bindProps(item)"
            v-model="model[item.prop]"
          ></component>
        </VersaFormItem>
      </ElSpace>
    </ElRow>
    <VersaFormItem
      v-else
      v-for="item in deployOptions"
      v-bind="bindFormItemProps(item)"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label || ''"
      :rules="item.rules"
      :status="item.status"
    >
      <slot
        v-if="item.slotName"
        :name="item.slotName"
        v-bind:data="model"
        v-bind="item"
      ></slot>
      <component
        v-else
        :is="item.element"
        v-on="bindEvent(item)"
        v-bind="bindProps(item)"
        v-model="model[item.prop]"
      ></component>
    </VersaFormItem>
    <slot name="footer" v-bind="{ model, actionType }"></slot>
  </component>
</template>

<script>
import { defineAsyncComponent } from "vue";
import TinyEmitter from "tiny-emitter";
import omit from "lodash/omit";
import cloneDeep from "lodash/cloneDeep";
import { ElSpace, ElRow } from "element-plus";
import "element-plus/es/components/space/style/css";
import "element-plus/es/components/row/style/css";
import VersaSelect from "./select.vue";
import VersaFormItem from "./item.vue";
import VersaRadioGroup from "./radio-group.vue";
import VersaImageUpload from "./image-upload.vue";
import VersaCheckboxGroup from "./checkbox-group.vue";
import { formPropsMixins } from "./mixins/props";
import { formEmitter } from "./mixins/methods";
import { hasOwnProperty, isObject } from "./utils";
import { datePickerFormat } from "./config";

const ElementMap = {
  "versa-select": "versa-select",
  "versa-checkbox-group": "versa-checkbox-group",
  "versa-radio-group": "versa-radio-group",
  "versa-form": "versa-form",
  "versa-repeater": "versa-repeater",
  "versa-image-upload": "versa-image-upload",
  "versa-repeater": "versa-repeater",
};

export default {
  name: "versa-form",
  components: {
    ElRow,
    ElSpace,
    VersaSelect,
    VersaFormItem,
    VersaRadioGroup,
    VersaCheckboxGroup,
    VersaImageUpload,
    VersaRepeater: defineAsyncComponent(() => import("./repeater.vue")),
  },
  mixins: [formPropsMixins, formEmitter],
  props: {
    /** 初始化时自动处理初始值 */
    autoInitValue: {
      type: Boolean,
      default: true,
    },
    /** v-model的值 */
    modelValue: {
      type: Object,
    },
    /** container容器 */
    component: {
      type: String,
      default: "form",
    },
    /** 全局校验规则 */
    rules: Object,
    /** 是否行内 */
    inline: Boolean,
    /** 报错信息行内展示 */
    inlineMessage: Boolean,
    statusIcon: Boolean,
    /** 是否展示报错信息 */
    showMessage: {
      type: Boolean,
      default: true,
    },
    size: String,
    disabled: Boolean,
    /** 全局校验规则改变时是否触发校验 */
    validateOnRuleChange: {
      type: Boolean,
      default: true,
    },
    /** 是否是repeater */
    isRepeater: Boolean,
  },
  provide() {
    return {
      VersaForm: this,
    };
  },
  inject: {
    /** 如果在versa-form下使用，则为嵌套表单 */
    VersaFormItem: {
      default: null,
    },
    /** 如果在versa-form下使用，则为嵌套表单 */
    VersaForm: {
      default: null,
    },
  },
  emits: ["update:modelValue", "onMounted", "validate"],
  data() {
    return {
      innerFormValues: {},
      fields: [],
      potentialLabelWidthArr: [],
      innerStatusMap: {},
      isMounted: false,
    };
  },
  computed: {
    autoLabelWidth() {
      if (!this.potentialLabelWidthArr.length) return 0;
      const max = Math.max(...this.potentialLabelWidthArr);
      return max ? `${max}px` : "";
    },
    /** 是否受控 */
    isControl() {
      // 判断是否显式传入value & 嵌套表单一定为受控逻辑
      return typeof this.modelValue !== "undefined" || !!this.VersaFormItem;
    },
    /** 表单帮定值 */
    model: {
      get() {
        return (this.isControl ? this.modelValue : this.innerFormValues) || {};
      },
      set(val) {
        if (this.isControl) {
          this.$emit("update:modelValue", val);
        } else {
          this.innerFormValues = val;
        }
      },
    },
    /** 是否需要布局 */
    layout() {
      return this.columns > 1 && !this.$attrs.inline;
    },
    /** form全局状态 */
    globalStatus() {
      return typeof this.status === "function"
        ? this.status(this.model, { actionType: this.actionType })
        : this.status;
    },
    /** 实际渲染的组件 */
    deployOptions() {
      return this.options
        ?.filter((item) => {
          if (typeof item.when === "function") {
            return item.when(this.model, item, {
              actionType: this.actionType,
              status: this.globalStatus,
            });
          }
          return item.when === undefined ? true : item.when;
        })
        .map((item) => ({
          ...item,
          element: ElementMap[item.element] || item.element,
          useCustomPreview:
            typeof item.useCustomPreview === "boolean"
              ? item.useCustomPreview
              : !!ElementMap[item.element],
          rules:
            typeof item.rules === "function"
              ? item.rules(this.model, item, { actionType: this.actionType })
              : item.rules,
          colSpan: item.single ? 24 : ~~(24 / this.columns),
          status:
            typeof item.status === "function"
              ? item.status(this.model, item, { actionType: this.actionType })
              : item.status ||
                this.innerStatusMap[item.prop] ||
                this.globalStatus,
        }));
    },
  },
  watch: {
    rules() {
      if (this.validateOnRuleChange) {
        this.validate(() => {});
      }
    },
    /** 全局状态变化时，清空内置缓存的状态 */
    status() {
      this.innerStatusMap = {};
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
      this.fields.splice(this.fields.indexOf(field), 1);
    });

    if (this.VersaFormItem && !this.isRepeater) {
      this.VersaFormItem.$emitter.emit("addField", this);

      if (this.VersaForm.isMounted) {
        // 动态表单且父组件已经初始化,自己进行本身的初始化
        this.autoInitValue && this.addInitValue(this.modelValue);
      } else {
        // 非repeater嵌套表单时，监听父级form onMounted以后再初始值
        this.VersaForm.$emitter?.on("onMounted", () => {
          this.autoInitValue && this.addInitValue(this.modelValue);
        });
      }
    } else {
      this.autoInitValue && this.addInitValue();
    }
  },
  beforeUnmount() {
    this.VersaFormItem?.$emitter.emit("removeField", this);
  },
  methods: {
    /** 设置表单状态 */
    setStatus(...args) {
      const toLoopObj = isObject(args[0]) ? args[0] : { [args[0]]: args[1] };

      for (const key in toLoopObj) {
        if (hasOwnProperty(toLoopObj, key)) {
          this.innerStatusMap[key] = toLoopObj[key];
        }
      }
    },
    /** 获取表单状态 */
    getStatus(keys) {
      if (typeof keys === "string") {
        return this.deployOptions.find((option) => option.prop === keys)
          ?.status;
      }

      if (Array.isArray(keys)) {
        return this.deployOptions.reduce((pre, curr) => {
          return keys.includes(curr.prop)
            ? { ...pre, [curr.prop]: curr.status }
            : pre;
        }, {});
      }

      console.warn("[VersaForm::getStatus] 未知数据类型的key");
      return undefined;
    },
    /** 重置表单 */
    resetField() {
      this.fields.forEach((field) => {
        // 仅仅清空表单项校验规则
        field.clearValidate?.();
      });
      this.addInitValue();
    },
    clearValidate(props = []) {
      const fields = props.length
        ? typeof props === "string"
          ? this.fields.filter((field) => props === field.prop)
          : this.fields.filter((field) => props.indexOf(field.prop) > -1)
        : this.fields;
      fields.forEach((field) => {
        field.clearValidate?.();
      });
    },
    /** 校验全部 */
    validate(callback) {
      return this.innerValidate(this.fields, callback);
    },
    /** 校验某些字段 */
    validateField(props, callback) {
      props = [].concat(props);
      const fields = this.fields.filter(
        (field) => props.indexOf(field.prop) !== -1
      );
      if (!fields.length) {
        console.warn("[VersaForm Warn] please pass correct props!");
        return;
      }

      return this.innerValidate(fields, callback);
    },
    /** 内部基础校验函数 */
    innerValidate(fields, callback) {
      let promise;
      // 若没有指定callback，则返回promise
      if (typeof callback !== "function") {
        promise = new Promise((resolve, reject) => {
          callback = function (valid, invalidFields) {
            valid ? resolve(valid) : reject(invalidFields);
          };
        });
      }

      let valid = true;
      let count = 0;

      // 如果需要验证的fields为空，调用验证时立刻返回callback
      if (fields.length === 0 && callback) {
        callback(true);
      }

      const invalidFields = {};
      fields.forEach((field) => {
        field.validate("", (isValid, errorField) => {
          if (!isValid) {
            valid = false;
          }
          Object.assign(invalidFields, errorField);
          if (typeof callback === "function" && ++count === fields.length) {
            callback(valid, invalidFields);
          }
        });
      });

      if (promise) {
        return promise;
      }
    },
    // 添加初始值
    addInitValue(params) {
      const obj = params || { ...this.defaultValues };
      this.options.forEach((v) => {
        obj[v.prop] = cloneDeep(this.getInitValueByKey(v.prop, obj, v));
      });

      this.model = {
        ...this.model,
        ...obj,
      };

      this.$nextTick(() => {
        this.$emit("onMounted", this.model);
        this.$emitter?.emit("onMounted");
        this.isMounted = true;
      });
    },
    /** 获取初始值 */
    getInitValueByKey(prop, params, customOption) {
      const obj = params || { ...this.defaultValues };
      const option =
        customOption || this.options.find((item) => item.prop === prop);
      if (!option) {
        console.warn("[VersaForm Warn][Form]unknow prop.");
        return undefined;
      }

      const hasProperty = hasOwnProperty(obj, prop);
      if (hasProperty && typeof option.initValue !== "undefined") {
        return option.initValue;
      }

      if (hasProperty && typeof option.initValue === "undefined") {
        return obj[prop];
      }

      return option.initValue;
    },
    /** item组件props */
    bindFormItemProps(item) {
      const results = Object.keys(VersaFormItem.props).reduce((prev, curr) => {
        return {
          ...prev,
          [curr]: item[curr],
        };
      }, {});

      return {
        ...results,
        optionConfig: { ...item },
        ...(item.formItemProps || {}),
      };
    },
    // 绑定属性
    bindProps(item) {
      const obj = {
        disabled: item.status === "disabled",
      };

      if (item.element === "el-date-picker") {
        Object.assign(obj, {
          "start-placeholder": "开始日期",
          "range-separator": "至",
          "end-placeholder": "结束日期",
          ...datePickerFormat[item.type || "date"],
        });
      }

      Object.assign(obj, {
        ...item,
        class: `versa-form-item-element ${item.class || ""}`,
      });

      // 移除冗余属性
      return omit(obj, [
        "label",
        "prop",
        "element",
        "initValue",
        "rules",
        "events",
        "single",
        "colSpan",
        "useCustomPreview",
        "on",
        "formItemProps",
        /** 卡片式布局属性 */
        "labelType",
        /** repeater属性 */
        "__label",
        "__width",
        "__fixedClass",
      ]);
    },
    // 事件绑定处理
    bindEvent(item) {
      const events = item.on || {};
      // 拦截
      return events;
    },
    getLabelWidthIndex(width) {
      const index = this.potentialLabelWidthArr.indexOf(width);
      // it's impossible
      if (index === -1) {
        throw new Error("[ElementForm]unpected width ", width);
      }
      return index;
    },
    registerLabelWidth(val, oldVal) {
      if (val && oldVal) {
        const index = this.getLabelWidthIndex(oldVal);
        this.potentialLabelWidthArr.splice(index, 1, val);
      } else if (val) {
        this.potentialLabelWidthArr.push(val);
      }
    },
    deregisterLabelWidth(val) {
      const index = this.getLabelWidthIndex(val);
      this.potentialLabelWidthArr.splice(index, 1);
    },
  },
};
</script>

<style lang="scss">
.versa-form {
  align-items: flex-start;

  &--inline {
    .versa-form-item {
      display: inline-flex;
      flex-direction: row;
      margin-right: 10px;
    }
  }

  .versa-form-item--preview {
    & .versa-form-item__label {
      color: #999999;
    }
  }

  &.versa-form--label-top {
    .versa-form-item {
      flex-direction: column;
    }
  }

  &.versa-form--label-left {
    .versa-form-item {
      flex-direction: row;
    }

    .versa-form-item__label {
      justify-content: flex-start;
    }
  }
}

.versa-form-item {
  display: flex;
  align-items: flex-start;
  margin-right: 0;

  .el-input__validateIcon {
    display: none;
  }

  &--mb {
    margin-bottom: 20px;
  }

  &--card {
    display: block;
    padding-bottom: 0;

    .versa-repeater {
      padding: 0;
      &__add.versa-button {
        margin: 16px 0;
      }
    }
  }

  &--mini,
  &--small {
    margin-bottom: 18px;
  }

  &--medium {
    .versa-form-item__content,
    .versa-form-item__label {
      line-height: 36px;
    }
  }

  &--small {
    .versa-form-item__content,
    .versa-form-item__label {
      line-height: 32px;
    }

    .versa-form-item__error {
      padding-top: 2px;
    }
  }

  &--mini {
    .versa-form-item__content,
    .versa-form-item__label {
      line-height: 28px;
    }

    .versa-form-item__error {
      padding-top: 1px;
    }
  }

  &__label {
    display: inline-flex;
    align-items: center;
    justify-content: flex-end;
    min-height: 35px;
    color: #333333;
    font-size: 14px;
    flex-shrink: 0;
    font-family: PingFangSC-Regular;
    text-align: right;
    line-height: 1.3;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }

  &__content {
    display: inline-flex;
    align-items: center;
    flex: 1;
    min-height: 35px;
    margin-left: unset;
    font-size: 14px;
    position: relative;
    width: 100%;

    &--preview {
      color: #333333;
      word-break: break-all;
    }
  }

  &__tips {
    color: #b8b8b8;
    font-size: 12px;
    line-height: 1.2;
    flex-shrink: 0;
  }

  &__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 0px;
    position: absolute;
    top: 100%;
    left: 0;

    &--inline {
      position: relative;
      top: auto;
      left: auto;
      display: inline-block;
      margin-left: 10px;
    }
  }
}

.versa-form-item.is-required:not(.is-no-asterisk)
  > .versa-form-item__label-wrap
  > .versa-form-item__label:before,
.versa-form-item.is-required:not(.is-no-asterisk)
  > .versa-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
.versa-form-item.is-error .el-input__inner,
.versa-form-item.is-error .el-input__inner:focus,
.versa-form-item.is-error .el-textarea__inner,
.versa-form-item.is-error .el-textarea__inner:focus {
  border-color: #f56c6c;
}
.versa-form-item.is-error .el-input-group__append .el-input__inner,
.versa-form-item.is-error .el-input-group__prepend .el-input__inner {
  border-color: transparent;
}
.versa-form-item.is-error .el-input__validateIcon {
  color: #f56c6c;
}
.versa-form-item--feedback .el-input__validateIcon {
  display: inline-block;
}
</style>
