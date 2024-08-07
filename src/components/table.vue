<script>
import { h, resolveComponent, withDirectives } from "vue";
import omit from "lodash/omit";
import get from "lodash/get";
import pick from "lodash/pick";
import isFunction from "lodash/isFunction";
import upperCase from "lodash/upperCase";
import {
  ElTable,
  ElEmpty,
  ElPagination,
  ElSpace,
  ElLoading,
  ElTableColumn,
} from "element-plus";
import "element-plus/es/components/table/style/css";
import "element-plus/es/components/table-column/style/css";
import "element-plus/es/components/empty/style/css";
import "element-plus/es/components/pagination/style/css";
import "element-plus/es/components/space/style/css";
import "element-plus/es/components/loading/style/css";
import VersaCard from "./card.vue";
import VersaButton from "./button.vue";
import VersaSensitive from "./sensitive.vue";
import { tablePropsMixins } from "./mixins/props";
import { formEmitter } from "./mixins/methods";
import { instanceProxy } from "./mixins/proxy";
import { injectedConfig } from "./mixins/config";
import { isObject, isEmpty, hasOwnProperty, formatEventName } from "./utils";
import { presetActions } from "./config";

const tablePresetAction = pick(presetActions, ["remove", "edit", "detail"]);

export default {
  name: "versa-table",
  mixins: [tablePropsMixins, formEmitter, instanceProxy, injectedConfig],
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
              on: formatEventName(action.on),
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
    renderOptions() {
      return (
        this.options?.map((option) => {
          const copyOption = { ...option };
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
        }) ?? []
      );
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
          res = await this.globalConfig?.$$axios({
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
          this.$refs.table?.toggleRowSelection(row);
        });
      } else {
        this.$refs.table?.clearSelection();
      }
    },
    /** 操作栏回调 */
    onAction(action, data, instance) {
      const options = omit(action, [
        "actionType",
        "actionName",
        "actionIcon",
        "action",
        "usePageModal",
      ]);
      // 使用内置的弹窗
      if (action.usePageModal) {
        this.dispatch("versa-page", "VersaFormPageUsePageModal", data, {
          ...options,
          actionType: action.actionType,
        });
        return;
      }
      switch (action.actionType) {
        case "create":
          this.dispatch("versa-page", "VersaFormPageOnCreate", {}, options);
          break;
        case "remove":
          this.dispatch(
            "versa-page",
            "VersaFormPageOnRemove",
            data[this.rowKey],
            data
          );
          break;
        case "edit":
          this.dispatch("versa-page", "VersaFormPageOnUpdate", data, options);
          break;
        case "detail":
          this.dispatch("versa-page", "VersaFormPageOnDetail", data, options);
          break;
        default:
          action.action?.(data, instance, {
            ...action,
            clearRowSelection: this.clearRowSelection,
          });
          break;
      }
    },
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
              on: formatEventName(action.on),
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
  },
  render() {
    // 递归渲染列表组件
    const renderColumns = (columns) => {
      return columns.map((currentColumn) => {
        // 自定义插槽
        if (currentColumn.slotName) {
          return h(
            ElTableColumn,
            {
              "show-overflow-tooltip": true,
              ...currentColumn,
            },
            {
              default: ({ row, column, $index }) =>
                this.$slots[currentColumn.slotName]?.(
                  this.proxyPageCore({ row, column, $index })
                ),
            }
          );
        }

        // 选中框
        if (currentColumn.type === "selection") {
          return h(ElTableColumn, {
            "reserve-selection": true,
            ...currentColumn,
          });
        }

        // 操作栏
        if (currentColumn.actions) {
          return h(ElTableColumn, currentColumn, {
            default: ({ row, column, $index }) => {
              return h(
                ElSpace,
                {},
                {
                  default: () =>
                    this.filterActions(
                      currentColumn.actions,
                      row,
                      column,
                      $index
                    ).map((tool) => {
                      return tool.is
                        ? h(resolveComponent(tool.is), {
                            ...tool,
                            ...tool.on,
                          })
                        : h(
                            VersaButton,
                            {
                              type: "primary",
                              link: true,
                              ...tool,
                              onClick: (e, instance) =>
                                this.onAction(tool, row, instance),
                            },
                            { default: () => tool.actionName }
                          );
                    }),
                }
              );
            },
          });
        }

        // 嵌套表头
        if (currentColumn.children?.length > 0) {
          return h(ElTableColumn, ...omit(currentColumn, ["children"]), {
            default: () => renderColumns(currentColumn.children),
          });
        }

        // 加密展示
        if (currentColumn.sensitive) {
          return h(ElTableColumn, currentColumn, {
            default: ({ row, column }) =>
              h(VersaSensitive, {
                value: row[column.property],
                sensitiveType:
                  typeof currentColumn.sensitiveType === "function"
                    ? currentColumn.sensitiveType(row)
                    : currentColumn.sensitiveType,
              }),
          });
        }

        // 默认渲染
        return h(ElTableColumn, {
          "show-overflow-tooltip": true,
          ...currentColumn,
        });
      });
    };

    return withDirectives(
      h(
        VersaCard,
        {
          class: "versa-table",
          title: this.headline,
        },
        {
          headerRight: () => [
            h(
              ElSpace,
              {
                class: [
                  "versa-table__tools",
                  "versa-table__tools--header",
                  {
                    "versa-table__tools--empty":
                      !this.tools.length && !this.$slots.tools,
                  },
                ],
                size: 20,
              },
              {
                default: () => [
                  ...this.tools.map((tool) => {
                    return tool.is
                      ? h(resolveComponent(tool.is), {
                          ...tool,
                          ...tool.on,
                        })
                      : h(
                          VersaButton,
                          {
                            ...tool,
                            onClick: (e, instance) =>
                              this.onAction(
                                tool,
                                this.multipleSelection,
                                instance
                              ),
                          },
                          { default: () => tool.actionName }
                        );
                  }),
                  this.$slots.tools?.(
                    this.proxyPageCore({
                      multipleSelection: this.multipleSelection,
                      clearRowSelection: this.clearRowSelection,
                    })
                  ),
                ],
              }
            ),
          ],
          default: () => [
            h(
              ElTable,
              {
                style: { width: "100%" },
                ...this.extraTableProps,
                data: this.dataSource,
                "row-key": this.rowKey,
                onSelectionChange: this.handleSelectionChange,
                ref: "table",
              },
              {
                empty: () =>
                  this.$slots.empty?.(
                    this.proxyPageCore({
                      multipleSelection: this.multipleSelection,
                      clearRowSelection: this.clearRowSelection,
                    })
                  ) ?? h(ElEmpty, { description: "暂无数据" }),
                default: () => renderColumns(this.renderOptions),
              }
            ),
            this.needPagination && this.innerParams.total > 0
              ? h(ElPagination, {
                  class: "versa-table__pagination",
                  background: true,
                  ...this.paginationConfigs,
                  total: this.innerParams.total,
                  "current-page": this.innerParams.pageNum,
                  "page-sizes": [10, 20, 30],
                  "page-size": this.innerParams.pageSize,
                  onSizeChange: this.handleSizeChange,
                  onCurrentChange: this.handleCurrentChange,
                })
              : null,
            this.$slots.footer?.(
              this.proxyPageCore({
                multipleSelection: this.multipleSelection,
                clearRowSelection: this.clearRowSelection,
              })
            ),
          ],
        }
      ),
      [[ElLoading.directive, this.loading]]
    );
  },
};
</script>

<style lang="scss">
.versa-table {
  position: relative;
  background: #fff;
  border: 0 solid #e0efff;

  // fix: 修复列fixed定位后出现垂直滚动条导致页面滚动失效的问题
  .el-table__body-wrapper
    tr
    td.el-table-fixed-column--right.is-first-column:before {
    bottom: 0;
  }

  .el-table__body-wrapper
    tr
    td.el-table-fixed-column--left.is-first-column:before {
    bottom: 0;
  }

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
