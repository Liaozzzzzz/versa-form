export const statusMap = {
    T: '启用',
    F: '停用'
}

export const filterOptions = () => [
    {
        label: '配置项代码',
        prop: 'typeCode',
        element: 'el-input',
        placeholder: '请选择',
        initValue: '12312',
        rules: [{
            required: true
        }],
        on: {
            input: (e, val) => {
                console.log('e, val:---', e, val);
                if (!e) {
                    val.model.year = '2023';
                } else {
                    val.model.year = '2015';
                }
            }
        }
    },
    {
        label: '启用状态',
        prop: 'status',
        element: 'el-select',
        placeholder: '请选择',
        mapSource: statusMap,
        initValue: 'T'
    },
    {
        label: '日期选择',
        prop: 'date',
        element: 'el-date-picker',
        placeholder: '请选择',
        type: 'date'
    },
    {
        label: '选择年',
        prop: 'year',
        element: 'el-date-picker',
        placeholder: '请选择',
        type: 'year'
    },
    {
        label: '选择月',
        prop: 'month',
        element: 'el-date-picker',
        placeholder: '请选择',
        type: 'month'
    },
    {
        label: '选择月区间',
        prop: 'monthrange',
        element: 'el-date-picker',
        placeholder: '请选择',
        type: 'monthrange'
    },
    {
        label: '日期多选',
        prop: 'dates',
        element: 'el-date-picker',
        placeholder: '请选择',
        type: 'dates'
    },
    {
        label: '日期范围',
        prop: 'daterange',
        element: 'el-date-picker',
        placeholder: '请选择',
        type: 'daterange'
    },
    {
        label: '时间点',
        prop: 'datetime',
        element: 'el-date-picker',
        placeholder: '请选择',
        type: 'datetime'
    },
    {
        label: '时间点范围',
        prop: 'datetimerange',
        element: 'el-date-picker',
        placeholder: '请选择',
        type: 'datetimerange'
    }
];

export const tableOptions = [
    {
        type: 'selection',
        fixed: 'left',
    },
    {
        label: '序号',
        type: 'index',
        width: 60,
        fixed: 'left',
    },
    {
        prop: 'typeCode',
        label: '配置项代码',
        children: [
            {
                prop: 'typeCode1',
                label: '配置项代码1',
            },
            {
                prop: 'typeCode2',
                label: '配置项代码2',
            }
        ]
    },
    {
        label: '手机号',
        prop: 'telphone',
        sensitive: true,
        sensitiveType: (row) => row.type,
        width: 130
    },
    {
        prop: 'itemCode',
        label: '明细代码',
    },
    {
        prop: 'itemDesc',
        label: '明细描述',
        width: 200,
        actions: (...rest) => {
            return [
                {
                    actionName: "信息变更",
                    actionType: "detail21212",
                    usePageModal: true,
                    title: '信息变更马里奥',
                    options: []
                },
            ]
        },
    },
    {
        prop: 'test10086',
        label: '测试自定义按钮',
        width: 160,
        actions: [{
            is: 'oms-dropdown',
            // labelInValue: {
            //     label: 'name',
            //     value: 'code'
            // },
            // mapSource: {
            //     test1: '测试1',
            //     test2: '测试2',
            //     test3: '测试3'
            // },
            text: '下拉菜单',
            on: {
                command: (val, instance) => {
                    console.log(val)
                    instance.isLoading = true;
                    setTimeout(() => {
                        instance.isLoading = false;
                    }, 3000);
                }
            },
            options: [{
                label: '测试1',
                value: 'test1',
                disabled: true,
            }, {
                label: '测试2',
                value: 'test2'
            }, {
                label: '测试3',
                value: 'test3'
            }]
        }]
    },
    {
        prop: 'itemLevel',
        label: '明细层级',
        width: 200,
        slotName: 'itemLevel'
    },
    {
        prop: 'itemSort',
        label: '明细顺序',
        width: 200
    },
    {
        prop: 'status',
        label: '启用状态',
        width: 200,
        formatter: (row, column, cellValue) => statusMap[cellValue]
    },
    {
        actions: [{
            actionType: 'edit',
            actionName: '编辑1',
            'append-to-body': true,
            actions: (values) => {
                return [values['el-switch'] ? 'cancel' : undefined, 'confirm', {
                    actionType: 'edit111',
                    actionName: '测试按钮',
                    popconfirm: { title: '测试', confirmType: 'popconfirm' },
                    action: (formValues, instance, { close }) => {
                        instance.isLoading = true;
                        setTimeout(() => {
                            instance.isLoading = false;
                            close();
                        }, 3000);
                    }
                }]
            },
        }, 'detail', 'remove', {
            actionType: 'nestPage',
            actionName: '测试嵌套page',
            title: '测试嵌套page',
            usePageModal: true,
            width: '80%',
            'append-to-body': true,
            options: [
                {
                    label: "所属企业",
                    prop: "itemDesc",
                    element: "el-input",
                },
            ],
        }, {
            actionType: 'edit111',
            actionName: '测试按钮',
            popconfirm: { title: '测试', confirmType: 'popconfirm' },
            // disabled: (row, instance) => !instance.selectionValues.length,
            action: (formValues, instance, options) => {
                instance.isLoading = true;
                setTimeout(() => {
                    instance.isLoading = false;
                }, 3000);
            }
        }],
        label: '操作',
        align: 'center',
        fixed: 'right',
        width: 300
    }
];

export const detailProps = {
    // columns: 2,
    formatBefore: (row, done) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ ...row });
            }, 1000);
        });
    },
    width: '750px',
    formProps: {
        // 'label-position': 'top',
        // inline: true,
    },
    options: [
        {
            label: '单选框组',
            prop: 'radio-group',
            element: 'el-radio-group',
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
            element: 'el-checkbox-group',
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
            element: 'el-select',
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
            placeholder: '请输入'
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
            element: 'el-switch'
        },
        {
            label: '嵌套表单',
            prop: 'nest-form',
            inline: true,
            element: 'oms-form',
            'label-position': 'right',
            options: [
                {
                    // label: '日期选择',
                    prop: 'date',
                    element: 'el-date-picker',
                    type: 'date',
                    placeholder: '请输入',
                    rules: [{ required: true }],
                },
                {
                    // label: '选择年',
                    prop: 'year',
                    placeholder: '请输入',
                    element: 'el-date-picker',
                    type: 'year'
                }
            ]
        }
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
}

