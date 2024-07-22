<template>
  <ElTableColumn
    v-if="renderOption.slotName"
    v-bind="renderOption"
    show-overflow-tooltip
  >
    <template #default="{ row, column, $index }">
      <slot
        :name="renderOption.slotName"
        v-bind="proxyPageCore({ row, column, index: $index })"
      ></slot>
    </template>
  </ElTableColumn>
  <ElTableColumn
    v-else-if="renderOption.type === 'selection'"
    v-bind="renderOption"
    reserve-selection
  ></ElTableColumn>
  <ElTableColumn v-else-if="renderOption.actions" v-bind="renderOption">
    <template #default="{ row, column, $index }">
      <ElSpace>
        <template
          v-for="action in filterActions(
            renderOption.actions,
            row,
            column,
            $index
          )"
        >
          <component
            v-if="action.is"
            v-bind="action"
            :is="action.is"
            v-on="action.on || {}"
          />
          <VersaButton
            v-else
            type="primary"
            link
            v-bind="action"
            @click="(e, instance) => onAction(action, row, instance)"
          >
            {{ action.actionName }}
          </VersaButton>
        </template>
      </ElSpace>
    </template>
  </ElTableColumn>
  <ElTableColumn v-else-if="children.length" v-bind="renderOption">
    <template v-for="child in children">
      <versa-nested-table
        :option="child"
        :rowKey="rowKey"
        :fillNull="fillNull"
      />
    </template>
  </ElTableColumn>
  <ElTableColumn
    v-else
    v-bind="renderOption"
    show-overflow-tooltip
  ></ElTableColumn>
</template>

<script>
import omit from "lodash/omit";
import pick from "lodash/pick";
import { ElTableColumn, ElSpace } from "element-plus";
import "element-plus/es/components/table-column/style/css";
import "element-plus/es/components/space/style/css";
import { formEmitter } from "./mixins/methods";
import { instanceProxy } from "./mixins/proxy";
import VersaButton from "./button.vue";
import { isEmpty, isObject, hasOwnProperty } from "./utils";
import { presetActions } from "./config";

const tablePresetAction = pick(presetActions, ["remove", "edit", "detail"]);

export default {
  name: "versa-nested-table",
  mixins: [formEmitter, instanceProxy],
  components: {
    VersaButton,
    ElTableColumn,
    ElSpace,
  },
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
    /** 行数据的 Key */
    rowKey: {
      type: [Function, String],
      default: "",
    },
    /** 列表单元格无数据时需要展示的数据 */
    fillNull: {
      type: String,
      required: false,
    },
  },
  computed: {
    renderOption() {
      const copyOption = { ...this.option };
      if (!copyOption.formatter) {
        copyOption.formatter = (val) => {
          if (isEmpty(val[copyOption.prop])) {
            return copyOption.filterNull || (this.fillNull ?? "");
          }

          if (isObject(copyOption.mapSource)) {
            return copyOption.mapSource[val[copyOption.prop]];
          }
          return val[copyOption.prop];
        };
      }
      if (copyOption.type === "index" && !copyOption.index) {
        copyOption.index = (index) => `${index < 9 ? "0" : ""}${index + 1}`;
      }
      if (copyOption.type === "index" && !copyOption.align) {
        copyOption.align = "center";
      }
      delete copyOption.children;

      return copyOption;
    },
    children() {
      return this.option.children || [];
    },
  },
  methods: {
    /** 操作栏编辑 */
    filterActions(actions, ...rest) {
      let actionsToArr =
        typeof actions === "string" ? actions.split(",") : actions;
      if (typeof actions === "function") {
        actionsToArr = actions(...rest);
      }

      return actionsToArr
        ?.map((action) => {
          if (typeof action === "string") {
            return tablePresetAction[action];
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
                  ? action.disabled.bind(this, rest[0])
                  : action.disabled,
            };
          }
          return null;
        })
        .filter(Boolean);
    },
    /** 操作按钮回调函数 */
    onAction(action, row, instance) {
      const options = omit(action, [
        "actionType",
        "actionName",
        "action",
        "usePageModal",
      ]);
      if (action.usePageModal) {
        this.dispatch("versa-page", "VersaFormPageUsePageModal", row, {
          ...options,
          actionType: action.actionType,
        });
        return;
      }
      switch (action.actionType) {
        case "remove":
          this.dispatch(
            "versa-page",
            "VersaFormPageOnRemove",
            row[this.rowKey],
            row
          );
          break;
        case "edit":
          this.dispatch("versa-page", "VersaFormPageOnUpdate", row, options);
          break;
        case "detail":
          this.dispatch("versa-page", "VersaFormPageOnDetail", row, options);
          break;
        default:
          action.action?.(row, instance, { ...action });
          break;
      }
    },
  },
};
</script>

<style lang="scss"></style>
