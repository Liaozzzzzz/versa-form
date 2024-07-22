<template>
  <VersaCard class="versa-table" v-loading="loading" :title="headline">
    <template #headerRight>
      <ElSpace
        :class="[
          'versa-table__tools',
          'versa-table__tools--header',
          {
            'versa-table__tools--empty': !tools.length && !$slots.tools,
          },
        ]"
        :size="20"
      >
        <template v-for="tool in tools">
          <component
            v-if="tool.is"
            v-bind="tool"
            :is="tool.is"
            v-on="tool.on || {}"
          />
          <VersaButton
            v-else
            v-bind="tool"
            @click="(e, instance) => onToolAction(tool, instance)"
          >
            {{ tool.actionName }}
          </VersaButton>
        </template>
        <slot
          name="tools"
          v-bind="proxyPageCore({ multipleSelection, clearRowSelection })"
        >
        </slot>
      </ElSpace>
    </template>
    <ElTable
      style="width: 100%"
      ref="table"
      v-bind="extraTableProps"
      :data="dataSource"
      :row-key="rowKey"
      @selection-change="handleSelectionChange"
    >
      <template v-if="$slots.empty" #empty>
        <slot name="empty"> </slot>
      </template>
      <template v-else #empty>
        <ElEmpty description="暂无数据"></ElEmpty>
      </template>
      <VersaNestedTable
        v-for="item in options"
        :option="item"
        :rowKey="rowKey"
        :fillNull="fillNull"
      >
        <template
          v-for="slotName in Object.keys($slots).filter(
            (item) => item !== 'empty'
          )"
          v-slot:[slotName]="attrs"
        >
          <slot :name="slotName" v-bind="attrs"></slot>
        </template>
      </VersaNestedTable>
    </ElTable>
    <ElPagination
      v-if="needPagination && innerParams.total > 0"
      background
      class="versa-table__pagination"
      v-bind="paginationConfigs"
      :total="innerParams.total"
      :current-page="innerParams.pageNum"
      :page-sizes="[10, 20, 30]"
      :page-size="innerParams.pageSize"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <slot name="footer"></slot>
  </VersaCard>
</template>

<script>
import omit from "lodash/omit";
import get from "lodash/get";
import isFunction from "lodash/isFunction";
import upperCase from "lodash/upperCase";
import { ElTable, ElEmpty, ElPagination, ElSpace } from "element-plus";
import "element-plus/es/components/table/style/css";
import "element-plus/es/components/empty/style/css";
import "element-plus/es/components/pagination/style/css";
import "element-plus/es/components/space/style/css";
import VersaCard from "./card.vue";
import VersaNestedTable from "./nested-table.vue";
import VersaButton from "./button.vue";
import { tablePropsMixins } from "./mixins/props";
import { formEmitter } from "./mixins/methods";
import { instanceProxy } from "./mixins/proxy";
import { isObject, hasOwnProperty } from "./utils";

export default {
  name: "versa-table",
  components: {
    VersaCard,
    VersaNestedTable,
    VersaButton,
    ElTable,
    ElEmpty,
    ElPagination,
    ElSpace,
  },
  mixins: [tablePropsMixins, formEmitter, instanceProxy],
  props: {
    /** 列表配置项 */
    options: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    queryParams: {
      type: Object,
      default: () => ({}),
    },
    /** 是否自动查询 */
    autoLoad: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["onSelectChange", "onDataChange"],
  data() {
    return {
      paginationConfigs: {
        layout: "total, sizes, prev, pager, next, jumper",
        prevText: "",
        nextText: "",
      },
      dataSource: this.tableData,
      innerParams: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      loading: false,
      multipleSelection: [],
    };
  },
  mounted() {
    if (this.autoLoad) {
      this.queryTableData();
    }
  },
  computed: {
    tools() {
      return this.toolOptions
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
                  ? action.disabled.bind(this, this.multipleSelection)
                  : action.disabled,
            };
          }
          return null;
        })
        .filter(Boolean);
    },
  },
  watch: {
    queryParams: {
      handler() {
        this.innerParams.pageNum = 1;
        this.innerParams.pageSize = 10;
        // 查询时，需要清空筛选项
        this.clearRowSelection();
        this.queryTableData();
      },
      deep: true,
    },
    tableData: {
      handler(newVal) {
        this.dataSource = newVal;
      },
      deep: true,
    },
  },
  methods: {
    async queryTableData() {
      try {
        const params = this.formatFilter({
          ...omit(this.innerParams, ["total"]),
          ...this.queryParams,
        });

        this.loading = true;
        let res;

        if (isFunction(this.api)) {
          res = await this.api(params);
        } else {
          const isGet = upperCase(this.apiMethod) === "GET";
          res = await this.axios({
            url: this.api,
            method: this.apiMethod,
            [isGet ? "params" : "data"]: params,
          });
        }
        res = await this.formatResults?.(res || {});
        if (this.listKey) {
          // 获取列表数据，如果配置了listKey，则从res上取对应值
          this.dataSource = get(res, this.listKey) || [];
        } else {
          // 未配置，走res.data.*list路径匹配第一个
          const preset = Object.keys(res?.data || {}).find((item) =>
            /list$/i.test(item)
          );
          this.dataSource = get(res, `data.${preset || ""}`) || [];
        }

        // 获取总数，如果配置了totalKey，则从res上取对应值
        this.innerParams.total = get(res, this.totalKey || "data.total") || 0;
      } catch (error) {
        console.log(error);
        this.dataSource = [];
        this.innerParams.total = 0;
      }
      this.$emit("onDataChange", this.dataSource);
      this.loading = false;
    },
    handleSizeChange(val) {
      this.innerParams.pageSize = val;
      this.queryTableData();
    },
    handleCurrentChange(val) {
      this.innerParams.pageNum = val;
      this.queryTableData();
    },
    handleSelectionChange(data) {
      this.multipleSelection = data;
      this.$emit("onSelectChange", data);
    },
    /** 清空选中项 */
    clearRowSelection(rows) {
      if (Array.isArray(rows)) {
        rows.forEach((row) => {
          this.$refs.table.toggleRowSelection(row);
        });
      } else {
        this.$refs.table.clearSelection();
      }
    },
    /** 操作栏回调 */
    onToolAction(tool, instance) {
      const options = omit(tool, [
        "actionType",
        "actionName",
        "action",
        "usePageModal",
      ]);
      // 使用内置的弹窗
      if (tool.usePageModal) {
        this.dispatch(
          "versa-page",
          "VersaFormPageUsePageModal",
          {},
          {
            ...options,
            actionType: tool.actionType,
          }
        );
        return;
      }
      switch (tool.actionType) {
        case "create":
          this.dispatch("versa-page", "VersaFormPageOnCreate", {});
          break;
        default:
          tool.action?.(this.multipleSelection, instance, {
            ...tool,
            clearRowSelection: this.clearRowSelection,
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss">
.versa-table {
  position: relative;
  background: #fff;
  border: 0 solid #e0efff;

  &__tools {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;

    &--empty,
    &--header {
      margin-bottom: 0;
    }
  }

  &__pagination {
    margin-top: 30px;
    justify-content: flex-end;
  }

  .el-table .el-table__header .el-table__cell {
    background: #f6f8fd;
    color: #333333;
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-size: 14px;
    font-weight: 400;
  }

  .el-table .el-table__body .el-table__cell {
    color: #666666;
    font-family: Source Han Sans CN, Source Han Sans CN;
    font-size: 14px;
    font-weight: 400;
    padding-top: 8px;
    padding-bottom: 8px;
    border-bottom-color: #ebebeb;
  }

  .el-button--text {
    padding: 0;
  }

  .el-space > .el-space__item {
    &:last-child {
      margin-right: 0 !important;
    }
  }
}
</style>
