import { VersaFilterProps } from "@root/types/VersaFilter";
import { FormStatus, FormValues } from "@root/types/VersaForm";
import { VersaModalProps } from "@root/types/VersaModal";
import { VersaTableProps } from "@root/types/VersaTable";

export const statusMap = {
    T: "启用",
    F: "停用",
};

export const filterOptions: () => VersaFilterProps<{
    typeCode: number;
    status: string;
    date: string;
    year: string;
    month: number;
    monthrange: string[];
    dates: string[];
    daterange: string[];
    datetime: string;
    datetimerange: string;
}>["options"] = () => [
    {
        label: "配置项代码",
        prop: "typeCode",
        element: "el-input",
        initValue: "12312",
        rules: [
            {
                required: true,
            },
        ],
        on: {
            input: (e, val) => {
                console.log("e, val:---", e, val);
                if (!e) {
                    val.model.year = "2023";
                } else {
                    val.model.year = "2015";
                }
            },
        },
    },
    {
        label: "启用状态",
        prop: "status",
        element: "versa-select",
        mapSource: statusMap,
        // initValue: 'T'
    },
    {
        label: "日期选择",
        prop: "date",
        element: "el-date-picker",
        type: "date",
    },
    {
        label: "选择年",
        prop: "year",
        element: "el-date-picker",
        type: "year",
    },
    {
        label: "选择月",
        prop: "month",
        element: "el-date-picker",
        type: "month",
    },
    {
        label: "选择月区间",
        prop: "monthrange",
        element: "el-date-picker",
        type: "monthrange",
    },
    {
        label: "日期多选",
        prop: "dates",
        element: "el-date-picker",
        type: "dates",
    },
    {
        label: "日期范围",
        prop: "daterange",
        element: "el-date-picker",
        type: "daterange",
    },
    {
        label: "时间点",
        prop: "datetime",
        element: "el-date-picker",
        type: "datetime",
    },
    {
        label: "时间点范围",
        prop: "datetimerange",
        element: "el-date-picker",
        type: "datetimerange",
    },
];

type AA = {
    a: string;
};

// const aa: AA[] = [
//     {
//         a: '',
//     },
//     () => { }
// ]

export const actions: VersaFilterProps<FormValues>["actions"] = (filterValues) => {
    return [
        filterValues.typeCode ? "reset" : null,
        "search",
        // 1,
        // () => {
        //     // return ;
        // },
        {
            actionType: "create",
            actionName: "新建",
            disabled: (formValues, instance) => {
                return true;
            },
            actions: (values) => {
                console.error(values);
                return [values["el-switch"] ? "confirm" : null, "cancel"];
            },
        },
        {
            is: "el-rate",
            value: 2,
        },
        {
            actionType: "测试",
            popconfirm: "测试",
            actionName: "测试",
            action: (formValues, instance) => {
                instance.isLoading = true;
                setTimeout(() => {
                    instance.isLoading = false;
                }, 3000);
            },
            disabled: (values, instance) => {
                return values.status === "T" || !instance.selectionValues.length;
            },
        },
    ];
};

export const toolOptions: VersaTableProps<{ a: 1 }, { b: 1 }>["toolOptions"] = [
    {
        actionType: "create",
        actionName: "新建",
        disabled: (selection, instance) => {
            console.log(instance.isLoading);
            return false;
            // return !instance.filterValues.typeCode;
        },
    },
    {
        actionType: "test",
        actionName: "使用内置弹窗",
        usePageModal: true,
    },
    {
        actionType: "delete",
        actionName: "选择删除",
        popconfirm: "真的是事逼啊，还批量删除？",
        action: (selection, instance, { clearRowSelection }) => {
            console.log(selection, instance.filterValues, instance, {
                ...instance,
            });
            instance.isLoading = true;
            instance.text = "进行中";
            setTimeout(() => {
                instance.text = "";
                instance.isLoading = false;
                clearRowSelection(selection);
            }, 3000);
        },
        disabled: (list) => {
            return !list.length;
        },
    },
    {
        is: "el-rate",
        value: 2,
    },
];

// VersaTableProps<
//     {
//         typeCode1: string;
//         typeCode: string;
//         status: string;
//         telphone: string;
//         itemCode: string;
//         actions: string;
//         test10086: string;
//         itemLevel: string;
//         itemSort: number;
//     },
//     { b: 1 }
// >["options"]

export const tableOptions = [
    {
        type: "selection",
        fixed: "left",
    },
    {
        label: "序号",
        type: "index",
        width: 60,
        fixed: "left",
    },
    // {
    //     prop: 'typeCode',
    //     label: '配置项代码',
    //     children: [
    //         // {
    //         //     prop: 'typeCode1',
    //         //     width: 200,
    //         //     label: '配置项代码1',
    //         // },
    //         // {
    //         //     prop: 'typeCode2',
    //         //     label: '配置项代码2',
    //         // }
    //     ]
    // },
    {
        prop: "typeCode1",
        width: 200,
        label: "配置项代码1",
        mapSource: {
            a: 1,
        },
    },
    {
        prop: "typeCode",
        label: "配置项代码2",
        mapSource: [{ label: "aa", value: 1 }],
        sensitiveType: (row) => () => "",
    },
    {
        label: "手机号",
        prop: "telphone",
        sensitive: true,
        sensitiveType: (row) => (row.itemCode === "1" ? "cellphone" : "identity"),
        width: 150,
    },
    {
        prop: "itemCode",
        label: "明细代码",
    },
    {
        prop: "actions",
        label: "操作",
        width: "160",
        showOverflowTooltip: true,
        fixed: "right",
        actions: (row: { a: number }) => {
            return [
                {
                    actionName: "信息变更",
                    actionType: "detail21212",
                    usePageModal: true,
                    title: "信息变更马里奥",
                    options: [],
                    disabled: () => {
                        return false;
                    },
                    action: (row, instance, option) => {
                        // instance.loading
                    },
                },
                {
                    is: "el-rate",
                    value: 2,
                },
            ];
        },
    },
    {
        prop: "test10086",
        label: "测试自定义按钮",
        width: 160,
        actions: [
            {
                is: "versa-dropdown",
                // labelInValue: {
                //     label: 'name',
                //     value: 'code'
                // },
                // mapSource: {
                //     test1: '测试1',
                //     test2: '测试2',
                //     test3: '测试3'
                // },
                text: "下拉菜单",
                on: {
                    command: (val, instance) => {
                        console.log(val);
                        instance.isLoading = true;
                        setTimeout(() => {
                            instance.isLoading = false;
                        }, 3000);
                    },
                },
                options: [
                    {
                        label: "测试1",
                        value: "test1",
                        disabled: true,
                    },
                    {
                        label: "测试2",
                        value: "test2",
                    },
                    {
                        label: "测试3",
                        value: "test3",
                    },
                ],
            },
        ],
    },
    {
        prop: "itemLevel",
        label: "明细层级",
        width: 200,
        slotName: "itemLevel",
    },
    {
        prop: "itemSort",
        label: "明细顺序",
        // width: 200
    },
    {
        prop: "status",
        label: "启用状态",
        // width: 200,
        mapSource: statusMap,
        // formatter: (row, column, cellValue) => statusMap[cellValue]
    },
    {
        actions: [
            {
                actionType: "edit",
                actionName: "编辑1",
                "append-to-body": true,
                disabled: () => false,
                actions: (values) => {
                    return [
                        values["el-switch"] ? "cancel" : undefined,
                        "confirm",
                        {
                            actionType: "edit111",
                            actionName: "测试按钮",
                            popconfirm: { title: "测试", confirmType: "popconfirm" },
                            action: (formValues, instance, { close }) => {
                                instance.isLoading = true;
                                setTimeout(() => {
                                    instance.isLoading = false;
                                    close();
                                }, 3000);
                            },
                        },
                    ];
                },
            },
            "detail",
            // () => ({}),
            "remove",
            {
                actionType: "nestPage",
                actionName: "测试嵌套page",
                title: "测试嵌套page",
                usePageModal: true,
                width: "80%",
                "max-height": "400px",
                "append-to-body": true,
                options: [
                    {
                        label: "所属企业",
                        prop: "itemDesc",
                        element: "el-input",
                    },
                ],
            },
            {
                actionType: "edit111",
                actionName: "测试按钮",
                popconfirm: { title: "测试", confirmType: "popconfirm" as const },
                // disabled: (row, instance) => !instance.selectionValues.length,
                action: (formValues, instance, options) => {
                    instance.isLoading = true;
                    setTimeout(() => {
                        instance.isLoading = false;
                    }, 3000);
                },
            },
            {
                title: "测试formatBefore",
                actionType: "createSecondary",
                actionName: "测试formatBefore",
                status: "edit",
                disabled: true,
                formatBefore: (row) => {
                    console.log(row);
                    return {
                        "checkbox-group": row["checkbox-group"],
                        parentId: row.menuId,
                    };
                },
                usePageModal: true,
                actions: [
                    "cancel",
                    {
                        actionType: "confirm",
                        actionName: "确认",
                        action: console.log,
                    },
                ],
            },
        ],
        label: "操作",
        align: "center",
        fixed: "right",
        width: 400,
    },
];
// VersaModalProps
type Row = {
    a: string;
    b: number;
};
export const detailProps: VersaModalProps<Row, any> = {
    // columns: 2,
    formatBefore: (row) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ ...row, cc: 1 });
            }, 1000);
        });
    },
    "align-center": true,
    maxHeight: "300",
    actions: () => {
        return [
            {
                actionType: "1",
                actionName: "0",
                disabled(formValues, instance) {
                    return true;
                },
            },
        ];
    },
    width: "750px",
    formProps: {
        // 'label-position': 'top',
        // inline: true,
    },
    options: [
        {
            label: "菜单级别",
            prop: "menuLevel",
            element: "versa-radio-group",
            // status: (
            //     formValues,
            //     _: unknown,
            //     { actionType }: { actionType: string }
            // ) => {
            //     if (actionType !== "detail") {
            //         return formValues.children?.length > 0 ? "disabled" : "edit";
            //     }
            //     return "preview";
            // },

            status: (
                _row,
                _option,
                { actionType, globalStatus }: { actionType: string, globalStatus: FormStatus }
            ) => (actionType === 'auth' ? 'edit' : globalStatus),
            button: true,
            rules: [{ required: true, message: "请选择菜单级别" }],
        },
        {
            label: "单选框组",
            prop: "radio-group",
            element: "versa-radio-group",
            // button: true,
            labelInValue: {
                label: "name",
                value: "code",
            },
            mapSource: {
                test1: "测试1",
                test2: "测试2",
                test3: "测试3",
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
            // rules: [{ required: true }]
            rules: [
                {
                    required: true,
                    type: "url",
                    message: "请输入'http(s)://'开头的合法url",
                },
            ],
        },
        {
            label: "多选框组",
            prop: "checkbox-group",
            element: "versa-checkbox-group",
            // button: true,
            labelInValue: {
                label: "name",
                value: "code",
            },
            mapSource: {
                test1: "测试1",
                test2: "测试2",
                test3: "测试3",
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
            // }]
        },
        {
            label: "启用状态",
            prop: "status",
            element: "versa-select",
            mapSource: statusMap,
            // multiple: true,
            // labelInValue: {
            //     label: 'name',
            //     value: 'code'
            // },
            hasAll: true,
        },
        {
            label: "输入框",
            prop: "telphone",
            sensitive: true,
            element: "el-input",
        },
        {
            label: "文本域",
            prop: "el-input-textarea",
            type: "textarea",
            element: "el-input",
            tooltip: "嘻嘻嘻",
        },
        {
            label: "排序",
            prop: "el-input-number",
            element: "el-input-number",
            style: { width: "180px" },
            tooltip: "嘻嘻嘻",
        },
        {
            label: "Switch 开关",
            prop: "el-switch",
            element: "el-switch",
            sensitive: true,
        },
        {
            label: "嵌套表单",
            prop: "nest-form",
            inline: true,
            element: "versa-form",
            "label-position": "right",
            options: [
                {
                    // label: '日期选择',
                    prop: "date",
                    element: "el-date-picker",
                    type: "date",
                    placeholder: "请输入",
                    rules: [{ required: true }],
                },
                {
                    // label: '选择年',
                    prop: "year",
                    placeholder: "请输入",
                    element: "el-date-picker",
                    type: "year",
                },
            ],
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
        // },
        {
            label: "输入框插槽",
            prop: "inputSlot",
            slotName: 'inputslot',
            sensitive: true,
            element: "el-input",
        },
    ],
};
