<template>
  <div class="default">
    <versa-page
      ref="VersaPageRef"
      rowKey="id"
      listKey="data.list11"
      totalKey="data.total11"
      headline="查询列表"
      toolPosition="header"
      :actions="actions"
      :filterOptions="filterOptions"
      :tableOptions="tableOptions"
      :detailProps="detailProps"
      :api="queryFunc"
      :toolOptions="toolOptions"
      :onCreate="onCreate"
      :onRemove="onRemove"
      :onUpdate="onUpdate"
      @onFilterChange="onFilterChange"
      @onSelectChange="onSelectChange"
      filterTitle="查询条件"
      fillNull=""
    >
      <template #itemLevel="{ row, $index }">
        <div>这是插槽{{ $index }}</div>
      </template>
      <template #modal-default="{ model, actionType }">
        <template v-if="actionType === 'detail21212'">
          <versa-table
            :options="[
              {
                label: '手机号',
                prop: 'telphone',
                sensitive: true,
              },
            ]"
            :autoLoad="false"
            :tableData="model.list"
          >
          </versa-table>
        </template>
        <template v-if="actionType === 'nestPage'">
          <versa-page
            rowKey="id"
            listKey="data.list11"
            totalKey="data.total11"
            headline="查询列表"
            :filterOptions="filterOptions"
            :tableOptions="tableOptions"
            :detailProps="detailProps"
            api="/"
          >
            <template #itemLevel="{ row, $index }">
              <div>这是插槽{{ $index }}h</div>
            </template>
          </versa-page>
        </template>
      </template>
      <template #modal-inputslot="{ row, $index }">
        <div>这是输入插槽</div>
      </template>
      <template #filter-btns>
        <el-button>插槽按钮</el-button>
      </template>
    </versa-page>
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
        title: '提示',
      }"
      @click="onClickWithLoading"
      @cancel="onCancel"
    >
      MessageBox按钮
    </VersaButton>
    <versa-button @click="onClickWithLoading">带loading状态</versa-button>
  </div>
  <versa-image-upload :maxSize="10 * 1024" accept=".svg"></versa-image-upload>
</template>
<script lang="ts">
import {
  detailProps,
  tableOptions,
  filterOptions,
  toolOptions,
} from "./config";

export default {
  data() {
    return {
      visible: true,
      filterOptions: filterOptions(),
      detailProps: detailProps,
      tableOptions: tableOptions,
      toolOptions,
      actions: (filterValues) => {
        return [
          filterValues.typeCode ? "reset" : null,
          "search",
          // () => {
          //   return [1];
          // },
          {
            actionType: "create",
            actionName: "新建",
            disabled: (formValues, instance) => {
              return false;
            },
            actions: (values) => {
              console.error(values);
              return [values["el-switch"] ? "confirm" : null, "cancel"];
            },
          },
          // {
          //   is: "el-rate",
          //   value: 2,
          // },
          //   {
          //     actionType: "测试",
          //     popconfirm: "测试",
          //     actionName: "测试",
          //     action: (formValues, instance) => {
          //       instance.isLoading = true;
          //       setTimeout(() => {
          //         instance.isLoading = false;
          //       }, 3000);
          //     },
          //     disabled: (values, instance) => {
          //       return values.status === "T" || !instance.selectionValues.length;
          //     },
          //   },
        ];
      },
    };
  },
  methods: {
    onTTT(a) {
      console.log(a);
    },
    onFilterChange(val) {
      console.log("onFilterChange", val);
      // this.$refs.VersaPageRef?.refresh(val);
    },
    onSelectChange(val) {
      console.log("onSelectChange", val);
    },
    onCreate(rest) {
      console.error(rest);
      return new Promise((r) => setTimeout(r, 3000));
    },
    onRemove(id) {
      console.error("onRemove", id);
    },
    onUpdate() {
      return new Promise((r) => setTimeout(r, 3000));
    },
    onClickWithLoading(e, instance) {
      instance.isLoading = true;
      setTimeout(() => {
        instance.isLoading = false;
      }, 3000);
    },
    onCancel(...rest) {
      console.log("onCancel", rest);
    },
    queryFunc(values) {
      console.log(values);
      const row = {
        id: "position: static: search",
        itemCode: "字典key",
        itemValue: "字典value",
        itemDesc:
          "字典描述超级超级超级长的文本哦字典描述超级超级超级长的文本哦字典描述超级超级超级长的文本哦字典描述超级超级超",
        itemSort: "排序",
        ext: "扩展字段",
        itemLevel: "层级",
        typeCode: "类型代码",
        typeCode1: "类型代码1",
        status: "T",
        telphone: 15527777531,
        // telphone: '0768-8889994',
        list: [
          {
            telphone: 15527777531,
          },
        ],
        "radio-group": {
          name: "测试2",
          code: "test2",
        },
        "el-input-textarea":
          "雨下来已下来 雨丝 断线成诗 每个字 泪流不止 忧郁 想你 暗示 忘词的傻子 我想要写的诗 抛在天空没位置 落到尘世 从此 坚持 心事 为你 保湿",
        "checkbox-group": [
          {
            code: "test2",
          },
          {
            code: "test3",
          },
        ],
        "el-input-number": 100,
        date: "2023-07-12",
        daterange: ["2023-07-20", "2023-08-21"],
        dates: ["2023-07-20", "2023-07-21"],
        month: "2023-06",
        year: "2022",
        datetime: "2023-07-12 00-00-00",
        datetimerange: ["2023-07-14 00-00-00", "2023-08-15 23-59-59"],
        "nest-form": {
          date: "2023-07-12",
          year: "2022",
        },
      };
      const count = Math.floor(Math.random() * 10);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            resultCode: "1000",
            data: {
              total11: count,
              list11: Array.from({ length: count }, () => row).map((item) => ({
                ...item,
                id: Math.floor(Math.random() * 10000),
                type:
                  item.telphone?.toString().indexOf("-") !== -1
                    ? "telephone"
                    : "cellphone",
                children:
                  Math.random() > 0.5
                    ? []
                    : [
                        {
                          id: "position: static: search",
                          itemCode: "字典key",
                          itemValue: "字典value",
                          itemDesc:
                            "字典描述超级超级超级长的文本哦字典描述超级超级超级长的文本哦字典描述超级超级超级长的文本哦字典描述超级超级超",
                          itemSort: "排序",
                          ext: "扩展字段",
                          itemLevel: "层级",
                          typeCode: "类型代码",
                          typeCode1: "类型代码1",
                          status: "T",
                          telphone: 15527777531,
                          // telphone: '0768-8889994',
                          list: [
                            {
                              telphone: 15527777531,
                            },
                          ],
                          "radio-group": {
                            name: "测试2",
                            code: "test2",
                          },
                          "el-input-textarea":
                            "雨下来已下来 雨丝 断线成诗 每个字 泪流不止 忧郁 想你 暗示 忘词的傻子 我想要写的诗 抛在天空没位置 落到尘世 从此 坚持 心事 为你 保湿",
                          "checkbox-group": [
                            {
                              code: "test2",
                            },
                            {
                              code: "test3",
                            },
                          ],
                          "el-input-number": 100,
                          date: "2023-07-12",
                          daterange: ["2023-07-20", "2023-08-21"],
                          dates: ["2023-07-20", "2023-07-21"],
                          month: "2023-06",
                          year: "2022",
                          datetime: "2023-07-12 00-00-00",
                          datetimerange: [
                            "2023-07-14 00-00-00",
                            "2023-08-15 23-59-59",
                          ],
                          "nest-form": {
                            date: "2023-07-12",
                            year: "2022",
                          },
                        },
                      ],
              })),
            },
          });
        }, 1000);
      });
    },
  },
};
</script>

<style lang="scss"></style>
