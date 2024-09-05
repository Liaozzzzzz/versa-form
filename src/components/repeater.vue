<template>
  <div class="versa-repeater" ref="formRef">
    <div
      ref="scrollRef"
      :class="[
        'versa-repeater__scroll',
        {
          'versa-repeater__scroll-pinged--left': pingedLeft,
          'versa-repeater__scroll-pinged--right': pingedRight,
        },
      ]"
      @scroll="onScroll"
    >
      <table class="versa-repeater__table">
        <colgroup>
          <col v-for="item in deployOptions" :width="item.__width || 'auto'" />
        </colgroup>
        <thead class="versa-repeater__table-header">
          <tr class="versa-repeater__table-row">
            <th
              v-for="item in deployOptions"
              :class="[
                'versa-repeater__table-header--cell',
                `versa-repeater__table-row--${
                  item.itemAlign || item.itemAlign
                }`,
                item.__fixedClass,
              ]"
              :style="item.formItemProps.itemStyle"
            >
              {{ item.__label }}
            </th>
          </tr>
        </thead>
        <tbody class="versa-repeater__table-body">
          <tr>
            <VersaMeasureCell
              v-for="option in deployOptions"
              :key="option.prop"
              :measure="!!option.fixed"
              @onResize="onResize(option, $event)"
            />
          </tr>
          <VersaForm
            v-for="(form, formIndex) in formList"
            component="tr"
            isRepeater
            ref="repeaterRows"
            class="versa-repeater__table-row"
            :options="deployOptions"
            :status="form.status"
            :defaultValues="form.values"
            :key="`${form.values['rowKey'] || ''}-${formIndex}-${
              form.values.__rowKey || ''
            }`"
            :modelValue="form.values"
            @onMounted="
              (value) => onValueChange(form, value, formIndex, 'mounted')
            "
            @input="(value) => onValueChange(form, value, formIndex)"
          >
            <template v-if="hasOperateColumn" #operate>
              <ElSpace>
                <template v-for="action in filterActions(form, formIndex)">
                  <component
                    v-if="action.is"
                    :is="action.is"
                    v-bind="action"
                    v-on="action.on || {}"
                  />
                  <VersaButton
                    v-else
                    type="primary"
                    link
                    v-bind="action"
                    @click="
                      (e, instance) =>
                        onAction(action, form, formIndex, instance)
                    "
                  >
                    {{ action.actionName }}
                  </VersaButton>
                </template>
              </ElSpace>
            </template>
            <template #index v-if="index">
              <span>{{
                typeof index === "function" ? index(formIndex) : index
              }}</span>
            </template>
          </VersaForm>
        </tbody>
      </table>
    </div>
    <VersaButton
      v-if="wheatherShowAddBtn"
      link
      type="primary"
      class="versa-repeater__add"
      :actionIcon="IconPlus"
      @click="onAdd"
    >
      {{ addText }}
    </VersaButton>
    <VersaModal v-bind="modalProps" v-model:visible="visible">
      <template
        v-for="slotName in Object.keys($slots)"
        v-slot:[slotName]="attrs"
      >
        <slot :name="slotName" v-bind="attrs"></slot>
      </template>
    </VersaModal>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import pick from "lodash/pick";
import cloneDeep from "lodash/cloneDeep";
import { ElSpace } from "element-plus";
import "element-plus/theme-chalk/src/space.scss";
import VersaButton from "./button.vue";
import VersaModal from "./modal.vue";
import VersaMeasureCell from "./measure-cell.vue";
import { presetActions } from "./config";
import RepeaterCore from "./utils/repeaterCore";
import { isObject, gen, hasOwnProperty } from "./utils";
import IconPlus from "./assets/plus.svg";

const repeaterPresetActions = pick(presetActions, [
  "save",
  "cancel",
  "edit",
  "up",
  "down",
  "remove",
]);

export default {
  name: "versa-repeater",
  inheritAttrs: false,
  components: {
    VersaForm: defineAsyncComponent(() => import("./form.vue")),
    VersaButton,
    VersaModal,
    VersaMeasureCell,
    ElSpace,
  },
  inject: {
    /** 如果在versa-form下使用，则为嵌套表单 */
    VersaFormItem: {
      default: null,
    },
  },
  props: {
    /** 增删查改模型：sync - 行内编辑； inline - 表格内编辑、保存； dialog - 弹窗类型 */
    type: {
      type: String,
      // 行内编辑
      default: "sync",
    },
    /** 表单配置项 */
    options: {
      type: Array,
      default: () => [],
    },
    /** v-model的值 */
    modelValue: {
      type: Array,
    },
    /** 全局编辑状态: edit,preview,disabled */
    status: {
      type: String,
      default: "edit",
    },
    /** 单行状态 */
    rowStatus: {
      type: [String, Function],
    },
    /** 行内唯一key */
    rowKey: String,
    /** 每一行的默认值 */
    defaultValues: {
      type: Object,
      default: () => ({}),
    },
    /** 新增之前是否要校验其它数据是否校验通过 */
    validateBeforeAdd: {
      type: Boolean,
      default: true,
    },
    /** 最长可增加到多少行 */
    maxLength: Number,
    /** 除系统预设的其它按钮 */
    actions: {
      type: Array,
      default: () => [],
    },
    /** 是否有新增按钮 */
    hasAdd: {
      type: Boolean,
      default: true,
    },
    /** 是否有删除操作按钮 */
    hasDelete: {
      type: [Boolean, Function],
      default: true,
    },
    /** 是否有编辑操作按钮 */
    hasUpdate: {
      type: [Boolean, Function],
      default: true,
    },
    /** 是否有保存操作按钮 */
    hasSave: {
      type: [Boolean, Function],
    },
    /** 是否有上移操作按钮 */
    hasMoveUp: {
      type: [Boolean, Function],
    },
    /** 是否有下移操作按钮 */
    hasMoveDown: {
      type: [Boolean, Function],
    },
    /** 各种异步操作钩子：add-新增；update-从预览态改为编辑态；save-编辑保存；remove-删除 */
    asyncHandler: {
      type: Object,
      default: () => ({}),
    },
    /** 编号 */
    index: {
      type: [String, Boolean, Number, Function],
      default: () => (index) => index < 9 ? `0${index + 1}` : index + 1,
    },
    /** 对齐方式: left/right/center */
    itemAlign: {
      type: String,
      default: "left",
    },
    /** 固定列模式(转换为二进制使用)： 1(1)-编号左固定；2(10)-编号右固定；4(100)-操作左固定；8(1000)-操作右固定 */
    fixedMode: {
      type: Number,
      default: 0,
    },
    addText: {
      type: String,
      default: "新增",
    },
  },
  data() {
    return {
      formList: [],
      visible: false,
      actionParams: {},
      fixedColumnWidth: {},
      pingedLeft: false,
      pingedRight: false,
      IconPlus,
    };
  },
  watch: {
    modelValue: {
      handler(newVal) {
        this.formList =
          newVal?.map((value) => {
            // 通过制定的rowKey或者内置的_rowKey来复用表单状态
            const prevCore = this.formList.find((form) => {
              return (
                form.values === value ||
                form.temporaryValues === value ||
                (value[this.rowKey] &&
                  form.values[this.rowKey] === value[this.rowKey]) ||
                (value.__rowKey && form.values.__rowKey === value.__rowKey)
              );
            });
            return (
              prevCore ||
              new RepeaterCore({
                values: value,
                type: this.type,
                status: this.status || rowStatus,
              })
            );
          }) ?? [];
      },
      immediate: true,
    },
    status: {
      handler(newVal) {
        this.formList?.forEach((form, index) => {
          switch (this.type) {
            // 同步编辑模式，只需要同步全局状态即可
            case "sync":
              form.status = newVal;
              break;
            // 行内编辑模式，需要触发各行的状态切换
            case "inline":
              if (newVal === "disabled") {
                form.status = newVal;
              } else if (newVal === "preview") {
                this.onAction({ actionType: "cancel" }, form, index, {});
              } else if (newVal === "edit") {
                this.onAction({ actionType: "edit" }, form, index, {});
              }
              break;
            // 1、弹窗模式不响应全局状态的变化
            default:
          }
        });
      },
    },
  },
  computed: {
    /** 是否展示新增按钮 */
    wheatherShowAddBtn() {
      return (
        this.status === "edit" &&
        this.hasAdd &&
        (!this.maxLength || this.formList.length < this.maxLength)
      );
    },
    /** 是否受控 */
    isControl() {
      // 判断是否显式传入value一定为受控逻辑
      return typeof this.modelValue !== "undefined";
    },
    /** 表单帮定值 */
    model: {
      get() {
        return (this.isControl ? this.modelValue : this.innerFormValues) || [];
      },
    },
    /** 新增数据时所赋初值 */
    initValue() {
      const obj = { ...this.defaultValues };
      this.options.forEach((v) => {
        const hasProperty = hasOwnProperty(obj, v.prop);
        if (hasProperty && typeof v.initValue !== "undefined") {
          obj[v.prop] = v.initValue;
        } else if (hasProperty && typeof v.initValue === "undefined") {
          // doNothing
        } else if (typeof v.initValue === "undefined") {
          obj[v.prop] = null;
        } else {
          obj[v.prop] = v.initValue;
        }
      });
      return obj;
    },
    /** 是否存在操作列 */
    hasOperateColumn() {
      // 非编辑态不需要操作按钮
      if (this.status !== "edit") {
        return false;
      }

      const rowLength = this.formList.length;
      let disableDeleteCount = 0;
      let disableUpdateCount = 0;

      // 判断是否有自定义某些操作按钮
      this.formList.forEach((form, index) => {
        if (!this.decideHasBtn("hasDelete", form.values, index)) {
          disableDeleteCount += 1;
        }
        if (!this.decideHasBtn("hasUpdate", form.values, index)) {
          disableUpdateCount += 1;
        }
      });

      const hasDelete = rowLength
        ? disableDeleteCount < rowLength
        : this.hasDelete;
      const hasUpdate = rowLength
        ? disableUpdateCount < rowLength
        : this.hasUpdate;

      return this.type === "sync" ? hasDelete : hasDelete || hasUpdate;
    },
    /** 左固定的列 */
    fixedLeftColumn() {
      return this.options.filter(
        (option) => option.fixed && option.fixed !== "right"
      );
    },
    /** 右固定的列 */
    fixedRightColumn() {
      return this.options.filter((option) => option.fixed === "right");
    },
    /** 未固定的列 */
    normalColumn() {
      return this.options.filter((option) => !option.fixed);
    },
    /** 列表实际渲染的组件 */
    deployOptions() {
      const fixedLeftColumn = [...this.fixedLeftColumn];
      const fixedRightColumn = [...this.fixedRightColumn];
      const normalColumn = [...this.normalColumn];

      const hasFixedColumn =
        !!fixedLeftColumn.length || !!fixedRightColumn.length;

      // 处理序号列
      if (this.index) {
        const indexOption = {
          width: 60,
          label: "序号",
          prop: "__index",
          slotName: "index",
          useCustomPreview: true,
          itemAlign: "center",
        };

        if (2 & this.fixedMode) {
          fixedRightColumn.unshift({ ...indexOption, fixed: "right" });
        } else if (hasFixedColumn || 1 & this.fixedMode) {
          fixedLeftColumn.unshift({ ...indexOption, fixed: "left" });
        } else {
          normalColumn.unshift(indexOption);
        }
      }

      // 处理操作列
      if (this.hasOperateColumn) {
        const operateOption = {
          label: "操作",
          slotName: "operate",
          prop: "__operate",
          useCustomPreview: true,
        };

        if (4 & this.fixedMode) {
          fixedLeftColumn.push({ ...operateOption, fixed: "left" });
        } else if (hasFixedColumn || 8 & this.fixedMode) {
          fixedRightColumn.push({ ...operateOption, fixed: "right" });
        } else {
          normalColumn.push(operateOption);
        }
      }

      return []
        .concat(fixedLeftColumn, normalColumn, fixedRightColumn)
        .map((item) => {
          let itemStyle = "";
          let fixedClass = "";

          if (item.fixed) {
            const isRight = item.fixed === "right";
            const cssKey = isRight ? "right" : "left";
            const toTraverse = isRight
              ? [...fixedRightColumn].reverse()
              : fixedLeftColumn;
            let offset = 0;

            toTraverse.some((option) => {
              const isSame = option.prop === item.prop;
              if (!isSame) {
                offset += this.fixedColumnWidth[option.prop] || 0;
              }
              return isSame;
            });

            itemStyle = `position: sticky; ${cssKey}: ${offset}px;z-index: 2`;

            // 左固定的列最后一个、右固定第一个加class
            if (
              (isRight && fixedRightColumn[0]?.prop === item.prop) ||
              (!isRight && fixedLeftColumn.slice(-1)[0]?.prop === item.prop)
            ) {
              fixedClass += ` versa-repeater__table-row-fixed--${cssKey}`;
            }
          }

          return {
            ...item,
            width: undefined,
            label: undefined,
            __width: item.width,
            __label: item.label,
            __fixedClass: fixedClass,
            formItemProps: {
              class:
                `versa-repeater__table-row--cell versa-repeater__table-row--${
                  item.itemAlign || this.itemAlign
                }` + fixedClass,
              itemStyle,
              contentStyle: Object.assign(
                {},
                item.width ? { width: `${item.width - 20}px` } : {}
              ),
            },
          };
        });
    },
    /** 弹窗实际渲染的组件 */
    dialogDeployOptions() {
      return [
        ...this.fixedLeftColumn,
        ...this.normalColumn,
        ...this.fixedRightColumn,
      ].map((item) => ({
        ...item,
        width: undefined,
      }));
    },
    /** 弹窗组件参数 */
    modalProps() {
      return {
        width: "700px",
        options: this.dialogDeployOptions,
        actions: [
          {
            actionType: "cancel",
            actionName: "取消",
          },
          {
            actionType: "repeaterConfirm",
            actionName: "确认",
            type: "primary",
            validate: true,
            action: this.onModalConfirm,
          },
        ],
        ...this.actionParams,
      };
    },
  },
  methods: {
    /** 监听table滚动 */
    onScroll({ currentTarget }) {
      const { scrollLeft, scrollWidth, clientWidth } = currentTarget;
      this.pingedLeft = scrollWidth !== clientWidth && scrollLeft > 0;
      this.pingedRight =
        scrollWidth !== clientWidth &&
        scrollLeft < scrollWidth - clientWidth - 1;
    },
    /** 监听表单值变化 */
    onValueChange(form, values, index, changeTypoe) {
      /** 组件初始化时，需要同步初始值到外部 */
      if (changeTypoe === "mounted") {
        form.values = values;
        !form.isNew && this.$emit("update:modelValue", this.getValues());
        form.mounted?.(form);
        return;
      }
      // 非sync模式，不在此通知外部变化
      if (this.type !== "sync") {
        return;
      }

      this.$emit("onValueChange", form, index);
    },
    /** 获取表单值 */
    getValues() {
      return this.formList?.map((form) => form.values) ?? [];
    },
    /** 弹窗回调 */
    async onModalConfirm(values, _, option) {
      const [success, results] = await this.handleAsyncAction(
        "save",
        values,
        this.formList.length
      );
      if (!success) {
        return;
      }

      const { formCore, dialogType } = this.actionParams;
      formCore.values = results;

      // 新增时，插入一条数据
      if (dialogType === "add") {
        this.formList.push(formCore);
      }

      this.$emit("update:modelValue", this.getValues());
      option.close();
    },
    /** 是否有自定义指定按钮 */
    decideHasBtn(propsName, values, index) {
      const btnProps = this[propsName];

      let result = true;
      if (typeof btnProps === "boolean") {
        result = btnProps;
      } else if (typeof btnProps === "function") {
        result = btnProps(values, index, { globalStatus: this.status });
      }

      return result;
    },
    /** 操作栏编辑 */
    filterActions(form, index) {
      const btns = [];
      const { values } = form;
      const isInlineEditing = "inline" === this.type && form.status === "edit";

      // 保存/取消编辑
      if (isInlineEditing && this.decideHasBtn("hasUpdate", values, index)) {
        btns.push(repeaterPresetActions.save);
        btns.push(repeaterPresetActions.cancel);
      }

      // 编辑
      if (
        ["inline", "dialog"].includes(this.type) &&
        form.status === "preview" &&
        this.decideHasBtn("hasUpdate", values, index)
      ) {
        btns.push(repeaterPresetActions.edit);
      }

      // 上移: 第一行不存在上移
      if (index !== 0 && this.decideHasBtn("hasMoveUp", values, index)) {
        btns.push(repeaterPresetActions.up);
      }

      // 下移：最后一行不存在下移
      if (
        index !== this.formList.length - 1 &&
        this.decideHasBtn("hasMoveDown", values, index)
      ) {
        btns.push(repeaterPresetActions.down);
      }

      // 删除按钮
      if (!isInlineEditing && this.decideHasBtn("hasDelete", values, index)) {
        btns.push(repeaterPresetActions.remove);
      }

      // 其它自定义按钮

      let actionsToArr = Array.isArray(this.actions)
        ? this.actions
        : [this.actions];

      if (typeof this.actions === "function") {
        actionsToArr = this.actions(values, index, {
          globalStatus: this.status,
        });
      }

      const others = actionsToArr
        ?.map((action) => {
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
                  ? action.disabled.bind(this, form)
                  : action.disabled,
            };
          }
          return null;
        })
        .filter(Boolean);
      return [...btns, ...others];
    },
    /** 新增 */
    async onAdd() {
      const len = this.formList.length;
      // 校验最大行数，否则不允许新增
      if (len >= this.maxLength) {
        return;
      }

      // 新增时校验之前数据是否合法
      const valid =
        !this.validateBeforeAdd ||
        (await this.validate().catch((error) => {
          console.warn("[VersaRepeater] 新增校验失败", error);
          return false;
        }));
      if (!valid) {
        return;
      }

      // 异步钩子逻辑
      const [success, results] = await this.handleAsyncAction(
        "add",
        { ...this.initValue, __rowKey: `repeater_${gen()}` },
        len
      );
      if (!success) {
        return;
      }

      // 弹窗模式，通过弹窗新增数据
      if (this.type === "dialog") {
        this.visible = true;
        this.actionParams = {
          title: "新增",
          dialogType: "add",
          formCore: new RepeaterCore({
            values: results,
            type: this.type,
            status: "edit",
          }),
        };
        return;
      }

      const formCore = new RepeaterCore({
        values: results,
        type: this.type,
        status: "edit",
        isNew: this.type === "inline",
        mounted: (form) => {
          if (this.type === "inline") {
            form.temporaryValues = form.values;
            form.values = cloneDeep(form.values);
            form.status = "edit";
          }
        },
      });
      this.formList.push(formCore);
    },
    /** 操作按钮 */
    async onAction(action, form, index, instance) {
      const { values } = form;

      // 使用内置弹窗
      if (action.usePageModal) {
        this.visible = true;
        this.actionParams = {
          formCore: form,
          defaultValues: form.values,
          ...action,
        };
        return;
      }

      switch (action.actionType) {
        case "remove": {
          const [success] = await this.handleAsyncAction(
            "remove",
            this.formList[index].values,
            index
          );
          if (!success) {
            return;
          }
          this.formList.splice(index, 1);
          this.$emit("update:modelValue", this.getValues());
          break;
        }
        case "up": {
          this.formList.splice(index - 1, 0, ...this.formList.splice(index, 1));
          this.$emit("update:modelValue", this.getValues());
          break;
        }
        case "down": {
          this.formList.splice(index + 1, 0, ...this.formList.splice(index, 1));
          this.$emit("update:modelValue", this.getValues());
          break;
        }
        case "edit": {
          const [success, results] = await this.handleAsyncAction(
            "update",
            form.values,
            index
          );
          if (!success) {
            return;
          }
          if (this.type === "dialog") {
            this.visible = true;
            this.actionParams = {
              title: "新增",
              formCore: form,
              defaultValues: results,
            };
          } else if (this.type === "inline") {
            form.temporaryValues = form.values;
            form.values = results;
            form.status = "edit";
          }
          break;
        }
        /** 行内模式保存 */
        case "save": {
          const valid = await this.$refs.repeaterRows?.[index]
            ?.validate()
            .catch((error) => {
              console.warn("[VersaRepeater] 保存校验失败", error);
              return false;
            });
          if (!valid) {
            return;
          }

          const [success, results] = await this.handleAsyncAction(
            "save",
            form.values,
            index
          );
          if (!success) {
            return;
          }

          form.temporaryValues = results;
          form.values = results;
          form.status = "preview";
          form.isNew = false;
          this.$emit("update:modelValue", this.getValues());
          this.$emit("onValueChange", form, index);
          break;
        }
        /** 行内模式取消 */
        case "cancel": {
          if (form.isNew) {
            this.formList.splice(index, 1);
            return;
          }
          form.values = form.temporaryValues;
          form.status = "preview";
          break;
        }
        default: {
          action.action?.(values, instance, { ...action });
          break;
        }
      }
    },
    /** 校验 */
    validate(callback) {
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
      if (!this.$refs.repeaterRows?.length && callback) {
        callback(true);
      }

      const invalidFields = {};
      this.$refs.repeaterRows?.forEach((field, index) => {
        field.validate((isValid, errorField) => {
          if (!isValid) {
            valid = false;
            Object.assign(invalidFields, { [index]: errorField });
          }

          if (
            typeof callback === "function" &&
            ++count === this.$refs.repeaterRows.length
          ) {
            callback(valid, invalidFields);
          }
        });
      });

      if (promise) {
        return promise;
      }
    },
    /** 清除校验 */
    clearValidate() {
      this.$refs.repeaterRows?.forEach((field) => {
        field.clearValidate();
      });
    },
    /** 各内置钩子异步逻辑统一处理 */
    async handleAsyncAction(type, values, index) {
      const clonedValues = cloneDeep(values);
      let results = null;
      let success = true;

      try {
        results =
          (await this.asyncHandler[type]?.(clonedValues, index)) ?? true;
      } catch (e) {
        result = false;
      }

      if (typeof results === "boolean") {
        success = results;
        results = results ? clonedValues : null;
      } else if (results === undefined) {
        success = true;
        results = clonedValues;
      } else if (isObject(results)) {
        const { success: rs, values: rv } = results || {};
        success = rs;
        results = rv;
      }

      return [success, results];
    },
    /** 监听盒子尺寸变化 */
    onResize(option, boxSize) {
      this.fixedColumnWidth[option.prop] = boxSize.width || 0;
    },
  },
  created() {
    if (this.VersaFormItem) {
      this.VersaFormItem.$emitter.emit("addField", this);
    }
  },
  mounted() {
    if (!this.rowKey) {
      console.warn("[VersaRepeater] 未声明每一行的唯一key, 可能造成状态异常!");
    }

    this.$nextTick(() => {
      this.$refs.scrollRef &&
        this.onScroll({ currentTarget: this.$refs.scrollRef });
    });
  },
};
</script>

<style lang="scss">
.versa-repeater {
  padding: 12px;
  background-color: #fff;
  position: relative;
  box-sizing: border-box;
  flex: 1;
  width: calc(100% - 24px);
  max-width: calc(100% - 24px);
  font-size: 14px;
  color: #606266;

  &__add.versa-button {
    height: 14px;
  }

  &__scroll {
    width: 100%;
    overflow-x: scroll;

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

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      margin: 0;
    }

    &-pinged--left {
      .versa-repeater__table-row-fixed--left {
        border-right: none;
        &::after {
          box-shadow: inset 10px 0 8px -8px rgb(0 0 0 / 12%);
        }
      }
    }

    &-pinged--right {
      .versa-repeater__table-row-fixed--right {
        &::after {
          box-shadow: inset -10px 0 8px -8px rgb(0 0 0 / 12%);
        }
      }
    }
  }

  &__table {
    table-layout: auto;
    border-collapse: separate;
    border-spacing: 0;
    width: 100%;
    word-break: break-all;

    &-header {
      &--cell {
        background: #f6f8fd;
        color: #333333;
        font-family: Source Han Sans CN, Source Han Sans CN;
        font-size: 14px;
        font-weight: 400;
        padding: 8px 20px;
        position: relative;
        text-align: left;
        white-space: pre;
      }
    }

    &-row {
      &--cell {
        display: table-cell;
        border-bottom: 1px solid #ebeef5;
        background-color: #fff;
        padding: 14px 20px;
        margin: 0;
        vertical-align: top;
        box-sizing: border-box;
      }

      .baseAfter {
        position: absolute;
        top: 0;
        bottom: 0px;
        width: 30px;
        transition: box-shadow 0.3s;
        content: "";
        pointer-events: none;
      }

      &-fixed--right {
        position: relative;
        &::after {
          @extend .baseAfter;

          transform: translateX(-100%);
          left: 0;
        }
      }

      &-fixed--left {
        position: relative;

        &::after {
          @extend .baseAfter;

          transform: translateX(100%);
          right: 0;
        }
      }

      &--left {
        text-align: left;
      }

      &--right {
        text-align: right;
      }

      &--center {
        text-align: center;
      }

      .versa-form-item {
        &__content {
          display: block;
          min-height: unset;
        }

        .versa-form-item--mb {
          margin-bottom: 0;
        }

        // &__error {
        //   padding-top: 1px;
        // }
      }
    }
  }
}
</style>
