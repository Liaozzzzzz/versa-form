import { RepeaterProps } from "@root/types/VersaRepeater"

export const statusMap = {
    T: '启用',
    F: '停用'
}

export const repeatProps: RepeaterProps<any> = {
    // rowStatus: (formValues) => {
    //     console.error(formValues);
    //     return formValues.id ? 'preview' : 'edit';
    // },
    options: [
        {
            label: '单选框组',
            prop: 'radio-group',
            element: 'versa-radio-group',
            // button: true,
            // labelInValue: {
            //     label: 'name',
            //     value: 'code'
            // },
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
            width: 300,
            rules: [{ required: true }]
        },
        {
            label: '多选框组',
            prop: 'checkbox-group',
            element: 'versa-checkbox-group',
            // button: true,
            // labelInValue: {
            //     label: 'name',
            //     value: 'code'
            // },
            mapSource: {
                test1: '测试1',
                test2: '测试2',
                test3: '测试3'
            },
            width: 300,
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

            fixed: 'left'
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
            width: 240,
            hasAll: true
        },
        {
            label: '输入框',
            prop: 'telphone',
            sensitive: true,
            width: 160,
            element: 'el-input',
            rules: [{ required: true, trigger: 'change', message: '必填噢' }]
        },
        {
            label: '文本域',
            prop: 'el-input-textarea',
            type: 'textarea',
            element: 'el-input',
            width: 240,
        },
        {
            label: '计数器',
            prop: 'el-input-number',
            element: 'el-input-number',
        },
        {
            label: 'Switch 开关',
            prop: 'el-switch',
            element: 'el-switch',
            fixed: 'right'
        }
    ]
}

