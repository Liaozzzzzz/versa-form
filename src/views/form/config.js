export const statusMap = {
    T: '启用',
    F: '停用'
}

export const formOptions = [
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
        // options: [{
        //     label: '测试1',
        //     value: 'test1',
        //     disabled: true,
        // }, {
        //     label: '测试2',
        //     value: 'test2'
        // }, {
        //     label: '测试3',
        //     value: 'test3'
        // }],
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
        // options: [{
        //     label: '测试1',
        //     value: 'test1',
        //     disabled: true,
        // }, {
        //     label: '测试2',
        //     value: 'test2'
        // }, {
        //     label: '测试3',
        //     value: 'test3'
        // }]
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
    {
        label: '文本域',
        prop: 'el-input-textarea',
        type: 'textarea',
        element: 'el-input',
        placeholder: '请输入'
    },
    {
        label: '计数器',
        prop: 'el-input-number',
        element: 'el-input-number',
        placeholder: '请输入'
    },
    {
        label: 'Switch 开关',
        prop: 'el-switch',
        element: 'el-switch',
        required: true
    },
    {
        label: '嵌套表单',
        prop: 'nest-form',
        inline: true,
        element: 'versa-form',
        'label-position': 'left',
        // required: true,
        rules: [{ required: true, trigger: 'blur', }],
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
        label: '插槽文本框',
        // slotName: 'telphone1',
        prop: 'telphone1',
        sensitive: true,
        element: 'el-input',
        placeholder: '请输入',
        on: {
            blur: (val) => console.log('blur::', val)
        },
        rules: [{ required: true, trigger: 'blur' }]
    },
    {
        label: '插槽文本框',
        prop: 'VersaRepeater',
        type: 'inline',
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