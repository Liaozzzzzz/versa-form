<template>
  <VersaProvide :axiosInstance="axiosInstance">
    <el-tabs v-model="activeName" class="app">
      <el-tab-pane lazy label="page" name="page">
        <PageTest />
      </el-tab-pane>
      <el-tab-pane lazy label="form" name="form">
        <PageForm />
      </el-tab-pane>
      <el-tab-pane lazy label="repeater" name="repeater">
        <RepeaterTest />
      </el-tab-pane>
      <el-tab-pane lazy label="FormCard" name="FormCard">
        <FormCard />
      </el-tab-pane>
    </el-tabs>
  </VersaProvide>
</template>
<script>
import PageTest from "./views/page/index.vue";
import PageForm from "./views/form/index.vue";
import RepeaterTest from "./views/repeater/index.vue";
import FormCard from "./views/form-card/index.vue";
import { VersaProvide } from "./components";

export default {
  components: {
    PageTest,
    PageForm,
    RepeaterTest,
    FormCard,
    VersaProvide,
  },
  data() {
    return {
      activeName: "page",
    };
  },
  methods: {
    axiosInstance(values) {
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
        telphone: 155231,
        // telphone: '0768-8889994',
        list: [
          {
            telphone: 15527137531,
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
              })),
            },
          });
        }, 1000);
      });
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  background-color: #eee;
}

.app {
  padding: 0 20px;
}
</style>
