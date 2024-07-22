export const statusMap = {
    T: '启用',
    F: '停用'
}

export const formOptions = [
    {
        label: '基础信息模块',
        prop: 'basic',
        // inline: true,
        element: 'versa-form',
        labelType: {
            type: 'card',
            toolPosition: 'header',
            actions: [{
                actionType: 'preview',
                actionName: '预览',
                action: (_, instance) => {
                    if (instance.formCore.getStatus('basic') === 'edit') {
                        instance.formCore.setStatus?.({ 'basic': 'preview' });
                        instance.text = '修改'
                    } else {
                        instance.formCore.setStatus?.('basic', 'edit');
                        instance.text = '预览'
                    }

                }
            }],
        },
        options: [
            {
                label: '单选框组',
                prop: 'radio-group',
                element: 'versa-radio-group',
                // button: true,
                labelInValue: {
                    label: 'name',
                    value: 'code'
                },
                mapSource: {
                    test1: '测试1',
                    test2: '测试2',
                    test3: '测试3'
                },
                rules: [{ required: true }]
            },
            {
                label: '多选框组',
                prop: 'checkbox-group',
                element: 'versa-checkbox-group',
                // button: true,
                labelInValue: {
                    label: 'name',
                    value: 'code'
                },
                mapSource: {
                    test1: '测试1',
                    test2: '测试2',
                    test3: '测试3'
                }
            },
            {
                label: '启用状态',
                prop: 'status',
                element: 'versa-select',
                mapSource: statusMap,
                // multiple: true,
                // labelInValue: {
                //     label: 'name',
                //     value: 'code'
                // },
                hasAll: true
            },
            {
                label: '输入框',
                prop: 'telphone',
                sensitive: true,
                element: 'el-input',
                placeholder: '请输入',
                on: {
                    // change: (val) => console.log('change::', val),
                    blur: (val) => console.log('blur::', val)
                },
                rules: [{ required: true }]
            },
        ]
    },
    {
        label: '日期模块',
        prop: 'nest-form',
        element: 'versa-form',
        labelType: 'card',
        options: [
            {
                label: '日期选择',
                prop: 'date',
                element: 'el-date-picker',
                type: 'date',
                placeholder: '请输入',
                rules: [{ required: true }],
            },
            {
                label: '选择年',
                prop: 'year',
                placeholder: '请输入',
                element: 'el-date-picker',
                type: 'year'
            }
        ]
    },
    {
        label: 'repeater',
        prop: 'omsRepeater',
        type: 'inline',
        labelType: {
            type: 'card',
            actions: [{
                actionType: 'preview',
                actionName: '预览',
                action: (_, instance) => {
                    if (instance.formCore.getStatus('omsRepeater') === 'edit') {
                        instance.formCore.setStatus?.({ 'omsRepeater': 'preview' });
                        instance.text = '修改'
                    } else {
                        instance.formCore.setStatus?.('omsRepeater', 'edit');
                        instance.text = '预览'
                    }

                }
            }],
            toolPosition: 'header',
        },
        element: 'versa-repeater',
        fixedMode: 9,
        options: [
            {
                label: '单选框组',
                prop: 'radio-group',
                element: 'versa-radio-group',
                mapSource: {
                    test1: '测试1',
                    test2: '测试2',
                    test3: '测试3'
                },
                width: 300,
                rules: [{ required: true }]
            },
            {
                label: '多选框组',
                prop: 'checkbox-group',
                element: 'versa-checkbox-group',
                mapSource: {
                    test1: '测试1',
                    test2: '测试2',
                    test3: '测试3'
                },
                width: 300,
            },
            {
                label: '启用状态',
                prop: 'status',
                element: 'versa-select',
                mapSource: statusMap,
                width: 240,
                hasAll: true
            },
            {
                label: '输入框',
                prop: 'telphone',
                sensitive: true,
                width: 160,
                element: 'el-input',
                placeholder: '请输入',
                rules: [{ required: true, trigger: 'change', message: '必填噢' }]
            },
            {
                label: '文本域',
                prop: 'el-input-textarea',
                type: 'textarea',
                element: 'el-input',
                placeholder: '请输入',
                width: 240,
            },
            {
                label: '计数器',
                prop: 'el-input-number',
                element: 'el-input-number',
                placeholder: '请输入',
                width: 240,
            },
            {
                label: 'Switch 开关',
                prop: 'el-switch',
                element: 'el-switch',
                width: 240,
            }
        ]
    },
    // {
    //     label: '日期选择',
    //     prop: 'date',
    //     element: 'el-date-picker',
    //     type: 'date'
    // },
    // {
    //     label: '选择年',
    //     prop: 'year',
    //     element: 'el-date-picker',
    //     type: 'year'
    // },
    // {
    //     label: '选择月',
    //     prop: 'month',
    //     element: 'el-date-picker',
    //     type: 'month'
    // },
    // {
    //     label: '日期多选',
    //     prop: 'dates',
    //     element: 'el-date-picker',
    //     type: 'dates'
    // },
    // {
    //     label: '日期范围',
    //     prop: 'daterange',
    //     element: 'el-date-picker',
    //     type: 'daterange'
    // },
    // {
    //     label: '时间点',
    //     prop: 'datetime',
    //     element: 'el-date-picker',
    //     type: 'datetime'
    // },
    // {
    //     label: '时间点范围',
    //     prop: 'datetimerange',
    //     element: 'el-date-picker',
    //     type: 'datetimerange'
    // }
]