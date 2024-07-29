# 表单配置化系统

## 快速入门

`npm i versa-form@lastest`

```javascript
import { createApp } from "vue";
// 引入需要的组件
import * as Versa from "versa-form";
// 引入样式
import "versa-form/lib/style.css";

const app = createApp(App);
app.use(Versa);
```

## versa-page

> 页面增删查改组件。

### 使用示例

#### 基础用法

快捷开启增删查改配置。

```javascript
<versa-page
    actions="reset,search,create"
    :filterOptions="filterOptions"
    :tableOptions="tableOptions"
    :detailProps="detailProps"
    :queryFunc="queryFunc"
>
</versa-page>

<script>
  export default {
    data() {
      return {
        filterOptions: [
            {
                label: '启用状态',
                prop: 'status',
                element: 'versa-select'
            },
        ],
        tableOptions: [
            {
                prop: 'itemCode',
                label: '明细代码',
            },
            {
                prop: 'itemCode1',
                label: '明细代码1',
            },
            {
                actions: ['edit', 'detail', 'remove'],
                label: '操作',
                align: 'center',
                fixed: 'right',
                width: 250
            }
        ],
        detailProps: {
            options: [
                {
                    label: '规则id',
                    prop: 'id',
                    element: 'el-input',
                    placeholder: '请选择',
                }
            ]
        }
      };
    },
    methods: {
        queryFunc(values) {
            const count = Math.floor(Math.random() * 10);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        resultCode: '1000',
                        data: {
                            total: count,
                            list: Array.from({ length: count }, () => {
                                itemCode: '字典key',
                                itemValue: '字典value',
                            })
                        }
                    });
                }, 1000);
            });
        }
    }
  };
</script>
```

#### 表单联动

filterOptions、detailProps 均渲染为`versa-form`，支持表单项动态渲染（`when`）及校验规则动态配置(`rules`)

```javascript
<versa-page
    actions="reset,search,create"
    :filterOptions="filterOptions"
    :tableOptions="tableOptions"
    :detailProps="detailProps"
    :queryFunc="queryFunc"
>
</versa-page>

<script>
  export default {
    data() {
      return {
        filterOptions: [],
        tableOptions: [],
        detailProps: {
            options: [
                {
                    label: '规则id',
                    prop: 'id',
                    element: 'el-input',
                    placeholder: '请选择',
                },
                {
                    label: '动态渲染',
                    prop: 'dynamicRender',
                    element: 'el-input',
                    placeholder: '请选择',
                    when: (formValues) => formValues.id === '1'
                },
                {
                    label: '动态校验',
                    prop: 'dynamicRules',
                    element: 'el-input',
                    placeholder: '请选择',
                    rules: (formValues) => [{required: formValues.id === '1'}]
                }
            ]
        }
      };
    },
    methods: {
        queryFunc(values) {
            const count = Math.floor(Math.random() * 10);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        resultCode: '1000',
                        data: {
                            total: count,
                            list: Array.from({ length: count }, () => {
                                itemCode: '字典key',
                                itemValue: '字典value',
                            })
                        }
                    });
                }, 1000);
            });
        }
    }
  };
</script>
```

#### 嵌套表单

`versa-form`支持嵌套表单使用，通过配置 element 为`versa-form`可支持嵌套表单。

```javascript
<versa-page
    actions="reset,search,create"
    :filterOptions="filterOptions"
    :tableOptions="tableOptions"
    :detailProps="detailProps"
    :queryFunc="queryFunc"
>
</versa-page>

<script>
  export default {
    data() {
      return {
        filterOptions: [],
        tableOptions: [],
        detailProps: {
            options: [
                {
                    label: 'Switch 开关',
                    prop: 'el-switch',
                    element: 'el-switch'
                },
                {
                    label: '嵌套表单',
                    prop: 'nest-form',
                    inline: true,
                    element: 'versa-form',
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
                },
            ]
        }
      };
    },
    methods: {
        queryFunc(values) {
            const count = Math.floor(Math.random() * 10);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        resultCode: '1000',
                        data: {
                            total: count,
                            list: Array.from({ length: count }, () => {
                                itemCode: '字典key',
                                itemValue: '字典value',
                            })
                        }
                    });
                }, 1000);
            });
        }
    }
  };
</script>
```

#### 自定义 filter 操作按钮

通过配置 actions 属性，进行自定义 filter 操作按钮，支持通过`btns`插槽在末尾增加自定义操作按钮。

```javascript
<versa-page
    :actions="filterActions"
    :filterOptions="filterOptions"
    :tableOptions="tableOptions"
    :detailProps="detailProps"
    :queryFunc="queryFunc"
>
    <template #btns>
        <button>插槽按钮</button>
    </template>
</versa-page>

<script>
  export default {
    data() {
      return {
        filterActions: [
            'search',
            { actionName: '重置', actionType: 'reset', type: 'normal' },
            {
                actionName: '模板下载',
                actionType: 'templateKey',
                type: 'primary',
                action: () => {
                    console.log('模板下载')
                }
            }
        ],
        filterOptions: [
            {
                label: '启用状态',
                prop: 'status',
                element: 'el-select',
                placeholder: '请选择',
            },
        ],
        tableOptions: [
            {
                prop: 'itemCode',
                label: '明细代码',
            },
        ],
        detailProps: {
            options: [
                {
                    label: '规则id',
                    prop: 'id',
                    element: 'el-input',
                    placeholder: '请选择',
                }
            ]
        }
      };
    },
    methods: {
        queryFunc(values) {
            const count = Math.floor(Math.random() * 10);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        resultCode: '1000',
                        data: {
                            total: count,
                            list: Array.from({ length: count }, () => {
                                itemCode: '字典key',
                                itemValue: '字典value',
                            })
                        }
                    });
                }, 1000);
            });
        }
    }
  };
</script>
```

#### 自定义 filter 校验规则

`filterOptions`每一个配置项支持自定义 rules 来做表单校验，校验不通过初始或者重置的调用接口逻辑均不会触发。

```javascript
<versa-page
    :filterOptions="filterOptions"
    :tableOptions="tableOptions"
    :detailProps="detailProps"
    :queryFunc="queryFunc"
>
</versa-page>

<script>
  export default {
    data() {
      return {
        filterOptions: [
            {
                label: '启用状态',
                prop: 'status',
                element: 'el-select',
                placeholder: '请选择',
                rules: [{
                    required: true
                }]
            },
        ],
        tableOptions: [
            {
                prop: 'itemCode',
                label: '明细代码',
            },
        ],
        detailProps: {
            options: [
                {
                    label: '规则id',
                    prop: 'id',
                    element: 'el-input',
                    placeholder: '请选择',
                }
            ]
        }
      };
    },
    methods: {
        queryFunc(values) {
            const count = Math.floor(Math.random() * 10);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        resultCode: '1000',
                        data: {
                            total: count,
                            list: Array.from({ length: count }, () => {
                                itemCode: '字典key',
                                itemValue: '字典value',
                            })
                        }
                    });
                }, 1000);
            });
        }
    }
  };
</script>
```

#### 列表动态插槽使用

`tableOptions`通过扩展`slotName`来自定义单元格展示

```javascript
<versa-page
    :filterOptions="filterOptions"
    :tableOptions="tableOptions"
    :detailProps="detailProps"
    :queryFunc="queryFunc"
>
    <template #itemLevel="{ row, index }">
        <div>这是单元格插槽{{ index }}</div>
    </template>
</versa-page>

<script>
  export default {
    data() {
      return {
        filterOptions: [
            {
                label: '启用状态',
                prop: 'status',
                element: 'el-select',
                placeholder: '请选择',
            },
        ],
        tableOptions: [
            {
                prop: 'itemCode',
                label: '明细代码',
            },
        ],
        detailProps: {
            options: [
                {
                    label: '规则id',
                    prop: 'id',
                    element: 'el-input',
                    placeholder: '请选择',
                }
            ]
        }
      };
    },
    methods: {
        queryFunc(values) {
            const count = Math.floor(Math.random() * 10);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        resultCode: '1000',
                        data: {
                            total: count,
                            list: Array.from({ length: count }, () => {
                                itemCode: '字典key',
                                itemValue: '字典value',
                            })
                        }
                    });
                }, 1000);
            });
        }
    }
  };
</script>
```

#### 修改默认弹窗配置

`create`、`detail`、`edit`操作均使用内置弹窗，可以通过覆盖配置修改弹窗或者表单熟悉。

```javascript
<versa-page
    :filterOptions="filterOptions"
    :tableOptions="tableOptions"
    :detailProps="detailProps"
    :queryFunc="queryFunc"
>
</versa-page>

<script>
  export default {
    data() {
      return {
        filterOptions: [
            {
                label: '启用状态',
                prop: 'status',
                element: 'el-select',
                placeholder: '请选择',
                rules: [{
                    required: true
                }]
            },
        ],
        tableOptions: [
            {
                prop: 'itemCode',
                label: '明细代码',
            },
            {
                prop: 'itemDesc1',
                label: '覆盖默认弹窗配置',
                width: 200,
                actions: (...rest) => {
                    return [
                        {
                            actionName: "信息变更",
                            actionType: "detail",
                            options: [
                                {
                                    label: "所属企业",
                                    prop: "itemDesc",
                                    element: "el-input",
                                },
                            ],
                            actions: [
                                {
                                    actionType: 'cancel',
                                    actionName: '取消'
                                },
                            ],
                        },
                    ]
                },
            },
        ],
        detailProps: {
            options: [
                {
                    label: '规则id',
                    prop: 'id',
                    element: 'el-input',
                    placeholder: '请选择',
                }
            ]
        }
      };
    },
    methods: {
        queryFunc(values) {
            const count = Math.floor(Math.random() * 10);
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        resultCode: '1000',
                        data: {
                            total: count,
                            list: Array.from({ length: count }, () => {
                                itemCode: '字典key',
                                itemValue: '字典value',
                            })
                        }
                    });
                }, 1000);
            });
        }
    }
  };
</script>
```

#### 各种插槽嵌套

```javascript
<versa-page
    actions="reset,search,create"
    rowKey="id"
    headline="查询列表"
    :filterOptions="filterOptions"
    :tableOptions="tableOptions"
    :detailProps="detailProps"
    :query-func="queryFunc"
    :toolOptions="toolOptions"
>
    /* 单元格插槽 */
    <template #itemLevel="{ row, index }">
        <div>r23{{ index }}</div>
    </template>
    /* 弹窗底部插槽，可以嵌套page和table等组件 */
    <template #modalFooter="{ model, actionType }">
        <template v-if="actionType === 'nestPage'">
            <versa-page
                actions="reset,search,create"
                :filterOptions="filterOptions.slice(0, 2)"
                :tableOptions="tableOptions"
                :detailProps="detailProps"
                :query-func="queryFunc"
            >
            </versa-page>
        </template>
        <template v-if="actionType === 'nestTable'">
            <versa-table
                :options="[
                    {
                        label: '手机号',
                        prop: 'telphone',
                        sensitive: true
                    }
                ]"
                :autoLoad="false"
                :tableData="model.list"
            >
            </versa-table>
        </template>
    </template>
    /* 工具栏插槽 */
    <template #tools>
        <div>这是工具栏插槽</div>
    </template>
    /* 列表底部插槽 */
    <template #footer>
        <div>这是列表底部插槽</div>
    </template>
</versa-page>
```

#### 嵌套表单卡片式布局

嵌套表单通过`labelType`属性进行卡片式布局。

```javascript
<versa-form
    ref="VersaForm"
    labelWidth="90px"
    :defaultValues="defaultValues"
    :options="formOptions"
    :status="status"
    v-model="formValue"
>
</versa-form>

<script>
  export default {
    data() {
      return {
        formOptions = [
            {
                label: '基础信息模块',
                prop: 'basic',
                // inline: true,
                element: 'versa-form',
                labelType: {
                    type: 'card',
                    shadow: 'always'
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
                    },
                    {
                        label: '启用状态',
                        prop: 'status',
                        element: 'el-select',
                        mapSource: statusMap,
                        hasAll: true
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
                prop: 'VersaRepeater',
                type: 'inline',
                labelType: {
                    type: 'card',
                    actions: [{
                        actionType: '测试',
                        actionName: '测试',
                    }],
                    toolPosition: 'header',
                },
                element: 'versa-repeater',
                fixedMode: 9,
                options: [
                    {
                        label: '单选框组',
                        prop: 'radio-group',
                        element: 'el-radio-group',
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
                        element: 'el-checkbox-group',
                        mapSource: {
                            test1: '测试1',
                            test2: '测试2',
                            test3: '测试3'
                        },
                        width: 300,
                    }
                ]
            }
        ]
      };
    }
  };
</script>
```

### API

| 属性                | 说明                                                                                    | 类型                 | 默认值   | 是否必填 |
| ------------------- | --------------------------------------------------------------------------------------- | -------------------- | -------- | -------- |
| filterOptions       | 搜索配置项,详见 VersaForm 配置项说明                                                    | `Array<FormOption>`  | []       | 否       |
| tableOptions        | 列表配置项                                                                              | `Array<TableOptions` | []       | 否       |
| toolOptions         | 操作栏配置项                                                                            | `Array<ToolOptions`  | []       | 否       |
| toolPositon         | 操作栏位置，若设置为`header`操作按钮将会放置于 table 模块 header 右侧                   | `String`             | 'tools'  | 否       |
| detailProps         | 增、改、详情弹窗配置项                                                                  | `DetailProps`        | {}       | 否       |
| keyMap              | filter 字段映射配置                                                                     | `Object`             | {}       | 否       |
| disableResetRequest | 是否禁用重置的刷新列表                                                                  | `Boolean`            | false    | 否       |
| autoLoad            | 初始化完成，是否自动查询                                                                | `Boolean`            | true     | 否       |
| onCreate            | 新增弹窗回调函数                                                                        | `Function`           | -        | 否       |
| onUpdate            | 编辑弹窗回调函数                                                                        | `Function`           | -        | 否       |
| onRemove            | 删除回调函数,需要配置`rowKey`                                                           | `Function`           | -        | 否       |
| needPagination      | table 是否需要分页                                                                      | `Boolean`            | true     | 否       |
| queryFunc           | table 查询接口或方法                                                                    | `Function`           | -        | 是       |
| formatResults       | table 格式化请求结果                                                                    | `Function`           | -        | 否       |
| formatFilter        | table 格式化筛选框数据                                                                  | `Function`           | -        | 否       |
| headline            | table 表头                                                                              | `String`             | ''       | 否       |
| filterTitle         | 搜索条件头部标题                                                                        | `String`             | ''       | 否       |
| trim                | 是否移除文本空格                                                                        | `Boolean`            | false    | 否       |
| rowKey              | table 行数据的 Key                                                                      | `Function`、`String` | ''       | 否       |
| listKey             | table 列表获取路径，支持路径: `data.xxList`, 未配置则取 data 下第一个以`list`结尾的数据 | `String`             | ''       | 否       |
| totalKey            | table 总数获取路径, 支持路径: `data.xxTotal`， 未配置则取`data.total`                   | `String`             | ''       | 否       |
| labelWidth          | filter 表头宽度                                                                         | `Number`、`String`   | '90'     | 否       |
| isSplit             | filter 是否需要折叠                                                                     | `Boolean`            | false    | 否       |
| defaultFilters      | filter 默认值                                                                           | `Object`             | {}       | 否       |
| actions             | 提交按钮项，多个用逗号分隔（search,reset,create）                                       | `String`、`Array`    | 'search' | 否       |
| fillNull            | 列表单元格无数据时需要展示的数据                                                        | `String`             | -        | 否       |
| extraTableProps     | 列表的其他属性配置                                                                      | `Object`             | {}       | 否       |

#### Actions 枚举说明

按钮配置项，在各个场景内置如下配置项，可以直接通过内置 actionType 进行匹配，自定义操作按钮 actionType 原则上不允许与内置冲突：

> 内置配置项可以配置完整 actionName、actionType 进行重命名和修改按钮样式

```JavaScript
export const presetActions = {
    reset: {
        actionType: 'reset',
        actionName: '重置'
    },
    search: {
        type: 'primary',
        actionType: 'search',
        actionName: '查询'
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
            confirmType: 'popconfirm'
        }
    },
    edit: {
        actionType: 'edit',
        actionName: '编辑'
    },
    detail: {
        actionType: 'detail',
        actionName: '详情'
    }
}
```

内置操作按钮均渲染为`versa-button`组件，所以基础配置与其一致，额外支持如下属性：

| 属性         | 说明                                       | 类型               | 默认值 | 是否必填 |
| ------------ | ------------------------------------------ | ------------------ | ------ | -------- |
| actionType   | 操作类型，相同模块应当保持唯一             | `String`           | -      | 是       |
| actionName   | 操作名称                                   | `String`           | -      | 是       |
| usePageModal | VersaPage 下使用时，是否使用内置 Modal     | `Boolean`          | false  | 否       |
| action       | 点击回调，在各个模块回调参数如各模块所示   | `Function`         | -      | 否       |
| popconfirm   | 二次确认弹窗文案，若未传入则不进行二次确认 | `String`、`Object` | -      | 否       |

> 当`usePageModal`为`true`或者`actionType`为内置弹窗操作(`edit`、`detail`、`create`)时，action 的配置会传入 Modal 组件进行属性覆盖。

> 若想使用内置的弹窗，强烈建议通过`usePageModal`属性进行配置，不建议修改`edit`、`detail`、`create`配置项，防止出现不可控 bug。

#### FilterActions

筛选组件操作按钮配置，本模块内置按钮支持`reset`、`search`、`create`三种，额外增加的 action 配置下如下：

| 属性     | 说明             | 类型      | 默认值 | 是否必填 |
| -------- | ---------------- | --------- | ------ | -------- |
| validate | 是否校验搜索条件 | `Boolean` | false  | 否       |

> 该模块不支持`popconfirm`配置

> 内置三种操作按钮均强制触发搜索条件校验，自定义操作按钮需要进行单独配置，若自定义按钮`validate`设为`true`且校验不通过，则不会触发按钮点击回调。

action 回调参数如下

| 属性       | 说明         | 类型     | 默认值 | 是否必填 |
| ---------- | ------------ | -------- | ------ | -------- |
| formValues | 当前筛选数据 | `Object` | -      | 是       |
| instance   | 按钮实例     | `Object` | -      | 是       |

```javaScript
action?.(formValues, instance)
```

#### TableOptions

列表配置项，同 el-table 属性，在此基础上新增如下配置：

| 属性          | 说明                 | 类型                | 默认值      | 是否必填 |
| ------------- | -------------------- | ------------------- | ----------- | -------- |
| sensitive     | 当前列是否脱敏展示   | `Boolean`           | false       | 否       |
| sensitiveType | 脱敏数据类型         | `String ｜ Functon` | 'cellphone' | 否       |
| actions       | 当前列是否为操作按钮 | `Function`、`Array` | []          | 否       |

> 列表行模块 actions 内置支持`edit(编辑)`、`detail(详情)`、`remove(删除)`；

1. 数组模式配置

```javascript
actions: [
  {
    actionType: "edit",
    actionName: "编辑1",
    "append-to-body": true,
  },
  "detail",
  "remove",
  {
    actionType: "nestPage",
    actionName: "测试嵌套page",
    title: "测试嵌套page",
    usePageModal: true,
    width: "80%",
    "append-to-body": true,
    options: [
      {
        label: "所属企业",
        prop: "itemDesc",
        element: "el-input",
      },
    ],
  },
];
```

2. 函数模式配置

该模式支持传入当前行、列信息`row`、`column`、`$index`，用于动态的渲染操作按钮

| 属性   | 说明         | 类型     | 默认值 | 是否必填 |
| ------ | ------------ | -------- | ------ | -------- |
| row    | 当前行数据   | `Object` | -      | 是       |
| column | 当前列配置项 | `Object` | -      | 是       |
| $index | 当前行行数   | `Number` | -      | 是       |

```
actions: (row, column, $index) => {
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
```

3. action 回调参数

| 属性     | 说明         | 类型     | 默认值 | 是否必填 |
| -------- | ------------ | -------- | ------ | -------- |
| row      | 当前行数据   | `Object` | -      | 是       |
| instance | 按钮实例     | `Object` | -      | 是       |
| options  | 当前按钮配置 | `Object` | -      | 是       |

```javaScript
action?.(row, instance, options)
```

4. sensitiveTypel 枚举

- `cellphone` 大陆手机号
- `identity` 身份证
- `Function` 若为函数时候，将拿到当前行数据作为入参返回上述类型，也可以返回函数用于自定义，即： `(formValues) => (value) => 'custom rules'`

#### ToolOptions

table 顶部操作栏按钮配置，本模块内置按钮支持`create`一种，无额外配置。action 回调参数如下所示：

| 属性              | 说明                                                    | 类型     | 默认值 | 是否必填 |
| ----------------- | ------------------------------------------------------- | -------- | ------ | -------- |
| multipleSelection | table 选中行数据                                        | `Object` | -      | 是       |
| instance          | 按钮实例                                                | `Object` | -      | 是       |
| options           | 当前按钮配置，并透传`clearRowSelection`用于清空选中数据 | `Object` | -      | 是       |

```javaScript
action?.(multipleSelection, options, options)
```

#### DetailProps

内置弹窗配置项, `edit`、`detail`、`create`三种弹窗复用相同弹窗，弹窗支持 dialog 和 drawer 模式且弹窗内置 form 表单。

| 属性          | 说明                                                 | 类型                | 默认值           | 是否必填 |
| ------------- | ---------------------------------------------------- | ------------------- | ---------------- | -------- |
| visible       | 弹窗受控显隐                                         | `Boolean`           | false            | 否       |
| actions       | 地步操作按钮                                         | `String`、`Array`   | 'cancel,confirm' | 否       |
| onOk          | 确认回调函数                                         | `Function`          | -                | 否       |
| panelType     | 弹窗类型：`el-dialog`、 `el-drawer`                  | `String`            | el-dialog        | 否       |
| formatBefore  | 弹窗表单展示时格式化表单初始入参, 用于异步获取数据等 | `Function`          | -                | 否       |
| options       | 表单配置项                                           | `Array<FormOption>` | []               | 否       |
| labelWidth    | 表头宽度                                             | `Number`、`String`  | '90'             | 否       |
| defaultValues | 表单默认值                                           | `Object`            | {}               | 否       |
| columns       | 一行多列                                             | `Number`            | 1                | 否       |
| status        | 表单状态：编辑-edit; 预览-preview; 禁用-disabled     | `String`            | 'edit'           | 否       |
| actionType    | 触发弹窗的按钮操作类型                               | `String`            | 'edit'           | 否       |

> 除了上述所列的属性，其余配置会自动透传到`el-dialog`、 `el-drawer`上。

`actions`操作按钮配置，本模块内置按钮支持`cancel`、`confirm`两种，额外增加的 action 配置下如下：

| 属性     | 说明             | 类型      | 默认值 | 是否必填 |
| -------- | ---------------- | --------- | ------ | -------- |
| validate | 是否校验搜索条件 | `Boolean` | false  | 否       |

> 该模块不支持`popconfirm`配置

> 内置三种操作按钮均强制触发搜索条件校验，自定义操作按钮需要进行单独配置，若自定义按钮`validate`设为`true`且校验不通过，则不会触发按钮点击回调。

action 回调参数如下

| 属性       | 说明                                    | 类型     | 默认值 | 是否必填 |
| ---------- | --------------------------------------- | -------- | ------ | -------- |
| formValues | 当前表单数据                            | `Object` | -      | 是       |
| instance   | 按钮实例                                | `Object` | -      | 是       |
| options    | 当前按钮配置，并透传`close`用于关闭弹窗 | `Object` | -      | 是       |

```javaScript
action?.(formValues, done)
```

#### FormOption

表单配置项。`filter`、`modal`模块均存在表单功能，配置保持一致，均使用`versa-form`功能，`FormOption`为表单每一项的配置，兼容`el-form`所支持功能，扩展属性如下：

| 属性      | 说明                                                                                                                                                                             | 类型                 | 默认值 | 是否必填 |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------ | -------- |
| element   | 表单组件元素, eg: `el-input`                                                                                                                                                     | `String`             | -      | 是       |
| initValue | 初始值                                                                                                                                                                           | `Any`                | -      | 否       |
| when      | 用于动态控制表单项是否渲染，入参如下：</br>1. model 当前表单数据;</br>2. item 当前表单项配置项; </br>3. options.actionType 表单操作类型，弹窗类适用; options.status 表单全局状态 | `Function`           | -      | 否       |
| single    | 是否独占一行                                                                                                                                                                     | `Boolean`            | false  | 否       |
| status    | 表单状态，支持单独设置当前项目预览或者编辑状态, 可设置为字符串的`编辑:edit`、`预览:preview`; `禁用:disabled`或者函数返回该值。</br>函数入参同`when`                              | `Function`、`String` | -      | 否       |
| labelType | 布局配置，若为`card`则表示当前项为卡片布局，也可通过对象形式覆盖`versa-card`配置                                                                                                 | `Object`、`String`   | -      | 否       |

#### 插槽

| name        | 说明                      | 参数                                                                                                             |
| ----------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| tools       | table 自定义操作栏插槽    | `multipleSelection`: 当前选中的列表数据；</br> `clearRowSelection`: 清除选中数据，若存在入参则清空传入的行       |
| footer      | table 底部自定义插槽      | -                                                                                                                |
| empty       | table 无数据时插槽        | -                                                                                                                |
| btns        | filter 按钮自定义插槽     | -                                                                                                                |
| modalFooter | 内置 Modal 底部自定义插槽 | `loading`: Modal 是否获取完数据;</br> `model`: Modal 表单数据; </br> `actionType`: 当前 Modal 对应的按钮操作类型 |
| [dynamic]   | table 单元格动态插槽      | `row`: 当前行数据;</br>`column`: 当前列配置项;</br>`$index`: 当前行行数                                          |

#### 表单配置项

`filter`和`modal`配置项均内置表单行为，通过传入对应的表单配置项则可以拥有完整的表单功能。

## versa-button

> 按钮组件，基于`el-button`增加防抖等功能

### 使用示例

```javascript
<VersaButton
    popconfirm="有了这些知识，我们现在可以完成我们最开始想实现的组件"
    @click="onClickWithLoading"
    @cancel="onCancel"
>
    popConfirm按钮
</VersaButton>
<VersaButton
    :popconfirm="{
        confirmType: 'messageBox',
        message: '有了这些知识，我们现在可以完成我们最开始想实现的组件',
        type: 'warning',
        title: '提示'
    }"
    @click="onClickWithLoading"
    @cancel="onCancel"
>
    MessageBox按钮
</VersaButton>
<VersaButton @click="onClickWithLoading">带loading状态</VersaButton>

onClickWithLoading(e, instance) {
    instance.isLoading = true;
    instance.text = '在做了，别催';
    setTimeout(() => {
        instance.isLoading = false;
        instance.text = '';
    }, 3000);
}

onCancel(...rest) {
    console.log('onCancel', rest);
},
```

### API

| 属性       | 说明                                                                               | 类型                  | 默认值 | 是否必填 |
| ---------- | ---------------------------------------------------------------------------------- | --------------------- | ------ | -------- |
| debounce   | 防抖时长                                                                           | `Number`              | 200    | 否       |
| leading    | 指定在延迟开始前调用                                                               | `Boolean`             | true   | 否       |
| trailing   | 指定在延迟结束后调用                                                               | `Boolean`             | false  | 否       |
| loading    | 受控 loading 状态                                                                  | `Boolean`             | false  | 否       |
| buttonText | 受控按钮文案，优先级高于`default`插槽                                              | `String`              | ''     | 否       |
| popconfirm | 是否禁用重置的刷新列表                                                             | `String`、`Object`    | false  | 否       |
| disabled   | 是否禁用，若为函数，则可动态修改，入参为各自模块自行传入，且第二个参数同`instance` | `Boolean`、`Function` | -      | 否       |

popconfirm 用于整合`MessageBox` 和 `Popconfirm`两种二次确认弹窗，默认映射为，`MessageBox`，如需要改变任何属性可通过对象形式进行覆盖。

> `Page`任何内置部位的按钮若为`cancel`操作类型，默认映射为`Popconfirm`。

### 事件

| 属性   | 说明                                 | 类型       | 默认值 | 是否必填 |
| ------ | ------------------------------------ | ---------- | ------ | -------- |
| click  | 点击回调                             | `Function` | -      | 否       |
| cancel | 取消回调, 仅在`popconfirm`存在时生效 | `Function` | -      | 否       |

click 存在两个参数：

- `e` 事件
- `instance` 组件实例，可以通过其直接修改组件 loading 状态(`isLoading`)、文案(`text`)

当在`versa-page`子孙组件中使用按钮组件时，`instance`支持响应式的获取如下全局参数：

| 属性            | 说明               | 类型     | 默认值 | 是否必填 |
| --------------- | ------------------ | -------- | ------ | -------- |
| queryParams     | 搜索框实时输入值   | `Object` | -      | 否       |
| filterValues    | table 当前查询条件 | `Object` | -      | 否       |
| selectionValues | table 已选中数据   | `Array`  | -      | 否       |

## versa-dropdown

> 下拉菜单组件，基于`el-dropdown`增加防抖、配置化等功能

### 使用示例

```javascript
// 在配置actions中使用
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
];
```

### API

| 属性         | 说明                                                  | 类型               | 默认值 | 是否必填 |
| ------------ | ----------------------------------------------------- | ------------------ | ------ | -------- |
| options      | 下拉选项配置                                          | `Array`            | []     | 否       |
| mapSource    | 下拉选项配置                                          | `Object`           | -      | 否       |
| labelInValue | 点击下拉选项回调是否影射为对象形式                    | `Boolean`          | false  | 否       |
| text         | 触发文案，基于`el-button`，可通过对象形式覆盖默认配置 | `String`、`Object` | -      | 否       |
| icon         | 文案后 icon，自行用 class 实现                        | `String`           | ''     | 否       |
| loading      | 外部控制 loading                                      | `Boolean`          | -      | 否       |

### 事件

| 属性    | 说明     | 类型       | 默认值 | 是否必填 |
| ------- | -------- | ---------- | ------ | -------- |
| command | 点击回调 | `Function` | -      | 否       |

command 存在两个参数：

- `val` 点击回调参数
- `instance` 组件实例，可以通过其直接修改组件 loading 状态(`isLoading`)

## versa-checkbox-group

> 配置化的可选组，基于`el-checkbox-group`增加配置化、预览等功能

### 使用示例

```javascript
// 在filter、form配置中使用
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
```

### API

| 属性         | 说明                             | 类型      | 默认值 | 是否必填 |
| ------------ | -------------------------------- | --------- | ------ | -------- |
| options      | 可选组配置                       | `Array`   | []     | 否       |
| mapSource    | 可选组配置                       | `Object`  | -      | 否       |
| labelInValue | 点击可选组回调是否影射为对象形式 | `Boolean` | false  | 否       |
| button       | 是否为按钮模式                   | `Boolean` | -      | 否       |
| status       | 组件状态                         | `String`  | 'edit' | 否       |

## versa-radio-group

> 配置化的单选组，基于`el-radio-group`增加配置化、预览等功能

### 使用示例

```javascript
// 在filter、form配置中使用
{
    label: '单选框组',
    prop: 'radio-group',
    element: '[el|versa]-radio-group',
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
```

### API

| 属性         | 说明                             | 类型      | 默认值 | 是否必填 |
| ------------ | -------------------------------- | --------- | ------ | -------- |
| options      | 可选组配置                       | `Array`   | []     | 否       |
| mapSource    | 可选组配置                       | `Object`  | -      | 否       |
| labelInValue | 点击可选组回调是否影射为对象形式 | `Boolean` | false  | 否       |
| button       | 是否为按钮模式                   | `Boolean` | -      | 否       |
| status       | 组件状态                         | `String`  | 'edit' | 否       |

## versa-repeater

> 增删查改组件, 可以配置到 versa-form 组件使用

### 使用示例

```javascript
<VersaRepeater
    v-bind="repeatProps"
    type="sync"
    hasMoveUp
    hasMoveDown
    v-model="formValues"
    :asyncHandler="asyncHandler"
    :fixedMode="9"
></VersaRepeater>

{
    repeatProps: {
        options: [
            {
                label: '单选框组',
                prop: 'radio-group',
                element: 'el-radio-group',
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
                element: 'el-checkbox-group',
                mapSource: {
                    test1: '测试1',
                    test2: '测试2',
                    test3: '测试3'
                },
                width: 300,
                fixed: 'left'
            },
            {
                label: '启用状态',
                prop: 'status',
                element: 'el-select',
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
            },
            {
                label: 'Switch 开关',
                prop: 'el-switch',
                element: 'el-switch',
                fixed: 'right'
            }
        ]
    },
    formValues: [
        { id: 1, 'radio-group': 'test1', telphone: 15527137531 },
        {
            'radio-group': 'test2',
            telphone: 15527137531
        }
    ],
    asyncHandler: {
        save: (...args) => {
            return true;
        }
    }
}
```

### API

| 属性              | 说明                                                                                                    | 类型                                  | 默认值                                               | 是否必填 |
| ----------------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------- | ---------------------------------------------------- | -------- |
| type              | 表单模型：sync - 行内编辑； inline - 表格内编辑、保存； dialog - 弹窗类型                               | `String`                              | sync                                                 | 否       |
| options           | 表单配置项，列表和弹窗复用                                                                              | `RepeaterOptions`                     | []                                                   | 是       |
| value             | v-model 的值                                                                                            | `Array`                               | false                                                | 否       |
| status            | 全局编辑状态: edit,preview,disabled                                                                     | `String`                              | 'edit'                                               | 否       |
| rowStatus         | 单行状态                                                                                                | `String、Function`                    | -                                                    | 否       |
| rowKey            | 行内唯一 key，原则上必填                                                                                | `String`                              | -                                                    | 否       |
| defaultValues     | 每一行的默认值                                                                                          | `Object`                              | '{}'                                                 | 否       |
| validateBeforeAdd | 新增之前是否要校验其它数据是否校验通过                                                                  | `Boolean`                             | true                                                 | 否       |
| maxLength         | 最长可增加到多少行                                                                                      | `Number`                              | -                                                    | 否       |
| hasAdd            | 是否有新增按钮                                                                                          | `Boolean`                             | 'true'                                               | 否       |
| hasDelete         | 是否有删除操作按钮                                                                                      | `Boolean、Function`                   | 'true'                                               | 否       |
| hasUpdate         | 是否有编辑操作按钮                                                                                      | `Boolean、Function`                   | 'true'                                               | 否       |
| hasSave           | 是否有保存操作按钮                                                                                      | `Boolean、Function`                   | 'true'                                               | 否       |
| hasMoveUp         | 是否有上移操作按钮                                                                                      | `Boolean、Function`                   | -                                                    | 否       |
| hasMoveDown       | 是否有下移操作按钮                                                                                      | `Boolean、Function`                   | -                                                    | 否       |
| asyncHandler      | 各种异步操作钩子：add-新增；update-从预览态改为编辑态；save-编辑保存；remove-删除                       | `Object`                              | '{}'                                                 | 否       |
| index             | 编号                                                                                                    | `String、 Boolean、 Number、 Functio` | '(index) => index < 9 ? `0${index + 1}` : index + 1' | 否       |
| itemAlign         | 对齐方式: left/right/center                                                                             | `String`                              | 'left'                                               | 否       |
| fixedMode         | 固定列模式(转换为二进制使用)： 1(1)-编号左固定；2(10)-编号右固定；4(100)-操作左固定；8(1000)-操作右固定 | `Number`                              | '0'                                                  | 否       |

### 表单模型(type)

- `sync`, 行内编辑，即时修改数据并同步到外部表单
  > 内置的操作有：删除、上移(需通过 hasMoveUp 开启)、下移(需通过 hasMoveDown 开启)
- `inline`, 行内编辑，数据编辑保存需要手动切换
  > 内置的操作有：删除、编辑(保存)、上移(需通过 hasMoveUp 开启)、下移(需通过 hasMoveDown 开启)
- `dialog`, 弹窗内编辑，数据编辑保存需要手动切换
  > 内置的操作有：删除、编辑、上移(需通过 hasMoveUp 开启)、下移(需通过 hasMoveDown 开启)

### 表单配置项(options)

与`versa-form`保持一致，增加如下属性:
| 属性 | 说明 | 类型 | 默认值 | 是否必填 |
| - | - | - | - | - |
| width | 表格展示宽度，如果未指定则进行自适应 | `String、Number` | - | 否 |
| fixed | 表格内固定：left、right | `String` | - | 否 |
| itemAlign | 对齐方式: left/right/center | `Array` | false | 否 |
| status | 全局编辑状态: edit,preview,disabled，如果未配置走 Repeater 组件的配置项 | `String` | - | 否 |

### 表单状态的说明

支持从三个维度进行表单状态的控制，满足大多数场景的表单状态需要：

- `Repeater.status` 全局的表单状态
- `Repeater.rowStatus` 单行的表单状态，因为每一行都是一个 form，这个就属于子 form 的全局状态
- `Repeater.options.status` 单个表单项的状态, 同`versa-form`

优先级顺序：`Repeater.options.status > Repeater.rowStatus > Repeater.status`

### 操作按钮(系列 hasXXX 属性)

每一行的操作按钮除开内置的逻辑，还可以通过`actions`属性进行增加，内置按钮逻辑可以通过`hasXXX`属性进行覆盖，如下所示，当存在`id`时候不展示删除按钮:

```javascript
<VersaRepeater
    v-bind="repeatProps"
    :hasDelete="(values) => !values.id"
    v-model="formValues"
></VersaRepeater>

{
    repeatProps: {
        options: [
            {
                label: '单选框组',
                prop: 'radio-group',
                element: 'el-radio-group',
                mapSource: {
                    test1: '测试1',
                    test2: '测试2',
                    test3: '测试3'
                },
                width: 300,
                rules: [{ required: true }]
            },
        ]
    },
}
```

### 各类异步钩子(asyncHandler)

用于各类操作前的数据校准或者衍生逻辑, 每个函数通过返回`Boolean`或者`{success: Boolean;results: Object}`来覆盖内部逻辑。

- `add` 新增
- `update` 从预览态改为编辑态
- `save` 编辑保存
- `remov` 删除

如下所示新增时，调用接口获取详情：

```javascript
<VersaRepeater
    v-bind="repeatProps"
    :hasDelete="(values) => !values.id"
    :asyncHandler="asyncHandler"
    v-model="formValues"
></VersaRepeater>

{
    repeatProps: {
        options: [
            {
                label: '单选框组',
                prop: 'radio-group',
                element: 'el-radio-group',
                mapSource: {
                    test1: '测试1',
                    test2: '测试2',
                    test3: '测试3'
                },
                width: 300,
                rules: [{ required: true }]
            },
        ]
    },
    asyncHandler: {
        update: async () => {
            const results = await requestSomthing();
            return {
                success: true,
                results
            }
        }
    }
}
```

### 编号和操作按钮的固定逻辑(fixedMode)

因为这两列数据为内置逻辑，如果需要调整其表格展示时的固定逻辑，可通过`fixedMode`参数来配置：

- `1(0b1)` 编号左固定
- `2(0b10)` 编号右固定
- `4(0b100)` 操作左固定
- `8(0b1000)` 操作右固定

内部使用二进制的模式来进行管控，所以入参必须按照上面的要求传递，若要通过控制 编号和操作列需要进行二进制加减，如编号左固定且操作右固定，那么 fixedMode=9
