import { noop } from '../utils';

/** form组件props */
export const formPropsMixins = {
    props: {
        /** 表头宽度 */
        labelWidth: {
            type: [Number, String],
            default: '90'
        },
        /** 表头位置 */
        labelPosition: {
            type: String
        },
        /** 表单配置项 */
        options: {
            type: Array,
            default: () => []
        },
        /** 默认值 */
        defaultValues: {
            type: Object,
            default: () => ({})
        },
        /** 一行多列 */
        columns: {
            type: Number,
            required: false,
            default: 1
        },
        /** 表单状态：编辑-edit; 预览-preview; 禁用-disabled */
        status: {
            type: [String, Function],
            default: 'edit'
        },
        /** 操作类型 */
        actionType: {
            type: String,
            default: 'edit'
        },
        labelSuffix: {
            type: String,
            default: ''
        },
        /** 是否隐藏必填标志 */
        hideRequiredAsterisk: {
            type: Boolean,
            default: false,
        },
    }
}

/** filter组件通用props */
export const filterPropsMixins = {
    props: {
        /** 默认筛选项 */
        defaultFilters: {
            type: Object,
            default: () => ({})
        },
        /** 提交按钮项，多个用逗号分隔（search,reset,create） */
        actions: {
            type: [String, Array, Function],
            default() {
                return 'search,reset';
            }
        },
        /** 表头宽度 */
        labelWidth: {
            type: [Number, String],
            default: '90'
        },
        /** 是否需要折叠（分割） */
        isSplit: {
            type: Boolean,
            default: false
        },
        /** 固定展示数量 */
        firstCount: {
            type: Number,
            default: 8
        },
        /** 是否移除文本空格 */
        trim: {
            type: Boolean,
            default: true
        },
        /** 搜索条件头部标题 */
        filterTitle: {
            type: String
        },
        labelSuffix: {
            type: String,
            default: ''
        }
    }
}

/** table组件通用props */
export const tablePropsMixins = {
    props: {
        /** 是否需要分页 */
        needPagination: {
            type: Boolean,
            default: true
        },
        /** 列表查询接口或方法 */
        api: {
            type: [String, Function],
            required: false
        },
        apiMethod: {
            type: String,
            default: 'get',
        },
        // 格式化请求结果
        formatResults: {
            type: Function,
            default: noop
        },
        /** 格式化筛选框数据 */
        formatFilter: {
            type: Function,
            default: noop
        },
        /** 行数据的 Key */
        rowKey: {
            type: [Function, String],
            default: 'id'
        },
        /** 远程数据获取路径 */
        listKey: {
            type: String,
            default: ''
        },
        /** 获取总数路径 */
        totalKey: {
            type: String,
            default: ''
        },
        /** 操作栏配置 */
        toolOptions: {
            type: Array,
            default: () => []
        },
        /** 列表title */
        headline: {
            type: String,
            default: ''
        },
        /** 列表的其他属性配置 */
        extraTableProps: {
            type: Object,
            default: () => ({})
        },
        /** 列表单元格无数据时需要展示的数据 */
        fillNull: {
            type: String,
            required: false
        }
    }
}