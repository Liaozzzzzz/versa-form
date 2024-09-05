<template>
  <div class="versa-page">
    <VersaFilter
      ref="filterRef"
      v-bind="filterProps"
      :options="filterOptions"
      :defaultFilters="defaultFilters"
      @onReset="onReset"
      @onSearch="onSearch"
      @onMounted="onMounted"
      @onFilterChange="onFilterChange"
      v-on="filterListeners"
    >
      <template
        v-for="slotName in parsedSlots.filter"
        v-slot:[slotName.target]="attrs"
      >
        <slot :name="slotName.source" v-bind="attrs"></slot>
      </template>
    </VersaFilter>
    <VersaTable
      v-bind="tableProps"
      :autoLoad="false"
      :options="tableOptions"
      :queryParams="queryParams"
      @onSelectChange="onSelectChange"
      v-on="tableListeners"
    >
      <template
        v-for="slotName in parsedSlots.table"
        v-slot:[slotName.target]="attrs"
      >
        <slot :name="slotName.source" v-bind="attrs"></slot>
      </template>
    </VersaTable>
    <VersaModal v-bind="modalProps" v-model:visible="panelVisible">
      <template
        v-for="slotName in parsedSlots.modal"
        v-slot:[slotName.target]="attrs"
      >
        <slot :name="slotName.source" v-bind="attrs"></slot>
      </template>
    </VersaModal>
  </div>
</template>

<script>
import { computed } from "vue";
import pick from "lodash/pick";
import mapKeys from "lodash/mapKeys";
import TinyEmitter from "tiny-emitter";
import VersaFilter from "./filter.vue";
import VersaTable from "./table.vue";
import VersaModal from "./modal.vue";
import { tablePropsMixins, filterPropsMixins } from "./mixins/props";
import { isObject, noop } from "./utils";
import { PageCoreInjectionKey, presetActions } from "./config";

export default {
  components: {
    VersaFilter,
    VersaTable,
    VersaModal,
  },
  name: "versa-page",
  provide() {
    return {
      [PageCoreInjectionKey]: computed(() => {
        return {
          queryParams: this.queryParams,
          filterValues: this.filterValues,
          selectionValues: this.selectionValues,
        };
      }),
    };
  },
  mixins: [tablePropsMixins, filterPropsMixins],
  props: {
    /** 搜索配置项 */
    filterOptions: {
      type: Array,
      default: () => [],
    },
    /** 列表配置项 */
    tableOptions: {
      type: Array,
      default: () => [],
    },
    /** 新增弹窗配置项 */
    detailProps: {
      type: Object,
      default: () => ({}),
    },
    /** filter 字段映射 */
    keyMap: {
      type: Object,
      default: () => ({}),
    },
    /** 是否禁用重置的刷新列表 */
    disableResetRequest: {
      type: Boolean,
      default: false,
    },
    /** 是否自动查询 */
    autoLoad: {
      type: Boolean,
      default: true,
    },
    /** 新增回调 */
    onCreate: {
      type: Function,
      default: noop,
    },
    /** 编辑回调 */
    onUpdate: {
      type: Function,
      default: noop,
    },
    /** 删除 */
    onRemove: {
      type: Function,
      default: noop,
    },
  },
  data() {
    return {
      // table 查询参数
      queryParams: {},
      // filter 实时输入状态
      filterValues: {},
      // table 选中数据
      selectionValues: [],
      actionParams: {},
      panelVisible: false,
    };
  },
  computed: {
    /** 列表组件通用属性透传 */
    tableProps() {
      const results = Object.keys(tablePropsMixins.props).reduce(
        (prev, curr) => {
          return {
            ...prev,
            [curr]: this[curr],
          };
        },
        {}
      );

      // 入参格式化keyMap
      results.formatFilter = (values) => {
        const formated = { ...values };
        if (isObject(this.keyMap)) {
          for (const key in this.keyMap) {
            if (!Object.hasOwnProperty.call(this.keyMap, key)) {
              continue;
            }
            const ele = this.keyMap[key];
            if (typeof ele === "string") {
              formated[ele] = formated[key];
              delete formated[key];
            }
            if (Array.isArray(ele)) {
              ele.forEach((item, index) => {
                formated[item] = formated[key]?.[index];
              });
              delete formated[key];
            }
          }
        }

        return this.formatFilter(formated);
      };
      return results;
    },
    parsedSlots() {
      const modal = [];
      const table = [];
      const filter = [];
      const modalReg = /^modal-/;
      const filterReg = /^filter-/;
      Object.keys(this.$slots).forEach((item) => {
        if (modalReg.test(item)) {
          modal.push({
            source: item,
            target: item.replace(modalReg, ""),
          });
        } else if (filterReg.test(item)) {
          filter.push({
            source: item,
            target: item.replace(filterReg, ""),
          });
        } else {
          table.push({
            source: item,
            target: item.replace(table, ""),
          });
        }
      });
      return {
        modal,
        table,
        filter,
      };
    },
    /** 列表组件通用属性透传 */
    filterProps() {
      const results = Object.keys(filterPropsMixins.props).reduce(
        (prev, curr) => {
          return {
            ...prev,
            [curr]: this[curr],
          };
        },
        {}
      );
      return results;
    },
    /** 弹窗组件参数 */
    modalProps() {
      return {
        width: "700px",
        ...this.detailProps,
        ...this.actionParams,
      };
    },
    /** filter事件透传 */
    filterListeners() {
      return mapKeys(pick(this.$attrs, []), (_, key) =>
        key.replace("onOn", "on")
      );
    },
    /** table事件透传 */
    tableListeners() {
      return mapKeys(pick(this.$attrs, []), (_, key) =>
        key.replace("onOn", "on")
      );
    },
  },
  created() {
    this.$emitter = new TinyEmitter();
    this.$emitter.on("VersaFormPageOnCreate", (_, options = {}) => {
      this.onAction("create", { defaultValues: {}, ...options });
    });
    this.$emitter.on(
      "VersaFormPageOnUpdate",
      (defaultValues = {}, options = {}) => {
        this.onAction("edit", { defaultValues, ...options });
      }
    );
    this.$emitter.on(
      "VersaFormPageOnDetail",
      async (defaultValues = {}, options = {}) => {
        this.onAction("detail", { defaultValues, ...options });
      }
    );
    this.$emitter.on(
      "VersaFormPageUsePageModal",
      async (defaultValues = {}, options = {}) => {
        this.onAction("usePageModal", { defaultValues, ...options });
      }
    );
    this.$emitter.on("VersaFormPageOnRemove", async (id) => {
      await this.onRemove(id);
      this.refresh();
    });
  },
  methods: {
    /** filter参数变化 */
    onFilterChange(params) {
      this.filterValues = params;
      this.$emit("onFilterChange", params);
    },
    /** table选中 */
    onSelectChange(params) {
      this.selectionValues = params;
      this.$emit("onSelectChange", params);
    },
    /** 重置 */
    onReset(params) {
      if (this.disableResetRequest) {
        return;
      }
      this.$refs.filterRef?.validate((valid) => {
        if (valid) {
          this.queryParams = {
            ...params,
          };
        }
      });
    },
    /** 初始化成 */
    onMounted(params) {
      if (!this.autoLoad) {
        return;
      }
      this.$refs.filterRef?.validate((valid) => {
        if (valid) {
          this.queryParams = {
            ...params,
          };
        } else {
          this.$refs.filterRef.clearValidate();
        }
      });
    },
    /** 搜索 */
    onSearch(params) {
      this.queryParams = {
        ...params,
      };
    },
    /** 内置操作回调 */
    onAction(actionType = "create", options = {}) {
      this.actionParams = {
        title: presetActions[actionType]?.actionName ?? "",
        status: ["detail", "usePageModal"].includes(actionType)
          ? "preview"
          : "edit",
        actions: ["detail", "usePageModal"].includes(actionType)
          ? ""
          : undefined,
        formatBefore:
          actionType === "create" ? null : this.detailProps.formatBefore,
        actionType,
        onOk: async (formValues) => {
          await this[actionType === "create" ? "onCreate" : "onUpdate"]?.(
            formValues
          );
          this.refresh();
        },
        ...options,
      };
      this.panelVisible = true;
    },
    /** 刷新列表 */
    refresh(params) {
      this.queryParams = params || { ...this.queryParams };
    },
  },
};
</script>

<style lang="scss">
.versa-page > .versa-table {
  margin-top: 20px;
}
</style>
