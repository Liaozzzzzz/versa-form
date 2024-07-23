import IconReset from '../assets/reset.svg';
import IconSearch from '../assets/search.svg';

export const PageCoreInjectionKey = Symbol('PageCore');

export const ProvideInjectionKey = Symbol('Provide');

/** 内置操作 */
export const presetActions = {
    reset: {
        actionType: 'reset',
        actionName: '重置',
        actionIcon: IconReset
    },
    search: {
        type: 'primary',
        actionType: 'search',
        actionName: '查询',
        actionIcon: IconSearch
    },
    create: {
        actionType: 'create',
        actionName: '新建'
    },
    remove: {
        actionType: 'remove',
        actionName: '删除',
        popconfirm: {
            title: '确定删除吗？',
            confirmType: 'messageBox',
            message: '数据删除后不可恢复'
        }
    },
    edit: {
        actionType: 'edit',
        actionName: '编辑'
    },
    save: {
        actionType: 'save',
        actionName: '保存'
    },
    detail: {
        actionType: 'detail',
        actionName: '详情'
    },
    up: {
        actionType: 'up',
        actionName: '上移'
    },
    down: {
        actionType: 'down',
        actionName: '下移'
    },
    cancel: {
        actionType: 'cancel',
        actionName: '取消'
    }
}

/** date-picker format配置项 */
export const datePickerFormat = {
    date: {
        format: 'YYYY-MM-DD',
        'value-format': 'YYYY-MM-DD'
    },
    dates: {
        format: 'YYYY-MM-DD',
        'value-format': 'YYYY-MM-DD'
    },
    daterange: {
        format: 'YYYY-MM-DD',
        'value-format': 'YYYY-MM-DD'
    },
    datetime: {
        format: 'YYYY-MM-DD HH-mm-ss',
        'value-format': 'YYYY-MM-DD HH-mm-ss',
        'default-time': new Date(2000, 1, 1, 0, 0, 0)
    },
    datetimerange: {
        format: 'YYYY-MM-DD HH-mm-ss',
        'value-format': 'YYYY-MM-DD HH-mm-ss',
        'default-time': [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]
    },
    month: {
        format: 'YYYY-MM',
        'value-format': 'YYYY-MM'
    },
    monthrange: {
        format: 'YYYY-MM',
        'value-format': 'YYYY-MM'
    },
    year: {
        format: 'YYYY',
        'value-format': 'YYYY'
    }
}