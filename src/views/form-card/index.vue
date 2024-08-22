<template>
  <div>
    <versa-form
      ref="VersaForm"
      labelWidth="90px"
      :defaultValues="defaultValues"
      :options="formOptions"
      :status="status"
      v-model="formValue"
      @validate="onValidated"
    >
      <template #telphone1="{ data, prop }">
        <el-input v-model="data[prop]" />
      </template>
    </versa-form>
    <el-button @click="onChangeFormStatus('preview')">切换到预览</el-button>
    <el-button @click="onChangeFormStatus('edit')">切换到编辑</el-button>
    <el-button @click="onChangeFormStatus('disabled')">切换到禁用</el-button>
    <el-button @click="onReset">重置</el-button>
    <el-button @click="onClearValidate">清除校验结果</el-button>
    <el-button @click="onValidateAll">校验全部</el-button>
    <el-button @click="onValidateAllCallback">Callback模式校验全部</el-button>
    <el-button @click="onValidatePartial">校验局部</el-button>
    <el-button @click="onValidatePartialCallback"
      >Callback模式校验局部</el-button
    >
    <el-button @click="onPrintFormValues">打印表单值</el-button>
  </div>
</template>
<script lang="ts">
import { VersaForm } from "@/components";
import { formOptions } from "./config";

export default {
  data() {
    return {
      formOptions: [
        {
          label: "基础信息模块",
          prop: "basic",
          // inline: true,
          element: "versa-form",
          labelType: {
            type: "card" as const,
            toolPosition: "header",
            actions: [
              {
                actionType: "preview",
                actionName: "预览",
                action: (_, instance) => {
                  if (instance.formCore.getStatus("basic") === "edit") {
                    instance.formCore.setStatus?.({ basic: "preview" });
                    instance.text = "修改";
                  } else {
                    instance.formCore.setStatus?.("basic", "edit");
                    instance.text = "预览";
                  }
                },
              },
            ],
          },
          options: [
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
              rules: [{ required: true }],
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
              tips: "测试",
              tooltip: "我我我我我我嚄嚄嚄嚄嚄嚄嚄嚄嚄嚄嚄",
            },
            {
              label: "启用状态",
              prop: "status",
              element: "versa-select",
              // mapSource: statusMap,
              // multiple: true,
              // labelInValue: {
              //     label: 'name',
              //     value: 'code'
              // },
              hasAll: true,
              tooltip: "我我我我我我嚄嚄嚄嚄嚄嚄嚄嚄嚄嚄嚄",
            },
            {
              label: "输入框",
              prop: "telphone",
              sensitive: true,
              element: "el-input",
              placeholder: "请输入",
              on: {
                // change: (val) => console.log('change::', val),
                blur: (val) => console.log("blur::", val),
              },
              rules: [{ required: true }],
            },
          ],
        },
        {
          label: "日期模块",
          prop: "nest-form",
          element: "versa-form",
          labelType: "card" as const,
          options: [
            {
              label: "日期选择",
              prop: "date",
              element: "el-date-picker",
              type: "date",
              placeholder: "请输入",
              rules: [{ required: true }],
            },
            {
              label: "选择年",
              prop: "year",
              placeholder: "请输入",
              element: "el-date-picker",
              type: "year",
            },
          ],
        },
        // {
        //   label: "repeater",
        //   prop: "VersaRepeater",
        //   type: "inline",
        //   labelType: {
        //     type: "card",
        //     actions: [
        //       {
        //         actionType: "preview",
        //         actionName: "预览",
        //         action: (_, instance) => {
        //           if (instance.formCore.getStatus("VersaRepeater") === "edit") {
        //             instance.formCore.setStatus?.({ VersaRepeater: "preview" });
        //             instance.text = "修改";
        //           } else {
        //             instance.formCore.setStatus?.("VersaRepeater", "edit");
        //             instance.text = "预览";
        //           }
        //         },
        //       },
        //     ],
        //     toolPosition: "header",
        //   },
        //   element: "versa-repeater",
        //   fixedMode: 9,
        //   options: [
        //     {
        //       label: "单选框组",
        //       prop: "radio-group",
        //       element: "versa-radio-group",
        //       mapSource: {
        //         test1: "测试1",
        //         test2: "测试2",
        //         test3: "测试3",
        //       },
        //       width: 300,
        //       rules: [{ required: true }],
        //     },
        //     {
        //       label: "多选框组",
        //       prop: "checkbox-group",
        //       element: "versa-checkbox-group",
        //       mapSource: {
        //         test1: "测试1",
        //         test2: "测试2",
        //         test3: "测试3",
        //       },
        //       width: 300,
        //     },
        //     {
        //       label: "启用状态",
        //       prop: "status",
        //       element: "versa-select",
        //       // mapSource: statusMap,
        //       width: 240,
        //       hasAll: true,
        //     },
        //     {
        //       label: "输入框",
        //       prop: "telphone",
        //       sensitive: true,
        //       width: 160,
        //       element: "el-input",
        //       placeholder: "请输入",
        //       rules: [{ required: true, trigger: "change", message: "必填噢" }],
        //     },
        //     {
        //       label: "文本域",
        //       prop: "el-input-textarea",
        //       type: "textarea",
        //       element: "el-input",
        //       placeholder: "请输入",
        //       width: 240,
        //     },
        //     {
        //       label: "计数器",
        //       prop: "el-input-number",
        //       element: "el-input-number",
        //       placeholder: "请输入",
        //       width: 240,
        //     },
        //     {
        //       label: "Switch 开关",
        //       prop: "el-switch",
        //       element: "el-switch",
        //       width: 240,
        //     },
        //   ],
        // },
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
      ],
      formValue: {},
      defaultValues: {
        "el-input-textarea": "1312",
        "nest-form": {
          // date: '2023-07-12',
          year: "2022",
        },
        VersaRepeater: [
          {
            "radio-group": "test2",
            telphone: 15527137531,
          },
        ],
      },
      status: "edit" as const,
      test: {},
    };
  },
  watch: {
    formValue: {
      handler() {
        console.log("watch::formValue", this.formValue);
      },
      deep: true,
    },
    test: {
      handler() {
        console.log("watch::test", this.test);
      },
      deep: true,
    },
  },
  methods: {
    onChangeFormStatus(status) {
      this.status = status;
    },
    onValidated(...args) {
      // console.log('onValidated', args);
    },
    onReset() {
      (this.$refs.VersaForm as InstanceType<typeof VersaForm>).resetField();
    },
    onClearValidate() {
      (this.$refs.VersaForm as InstanceType<typeof VersaForm>).clearValidate();
    },
    onValidateAll() {
      (this.$refs.VersaForm as InstanceType<typeof VersaForm>).validate();
    },
    onValidateAllCallback() {
      (this.$refs.VersaForm as InstanceType<typeof VersaForm>).validate(
        (errors, ...reset) => {
          console.log(errors, reset);
        }
      );
    },
    async onValidatePartial() {
      (this.$refs.VersaForm as InstanceType<typeof VersaForm>).validateField([
        "telphone1",
        "radio-group",
      ]);
    },
    onValidatePartialCallback() {
      (this.$refs.VersaForm as InstanceType<typeof VersaForm>).validateField(
        ["telphone1", "nest-form"],
        (errors, ...reset) => {
          console.log(errors, reset);
        }
      );
    },
    onPrintFormValues() {
      console.log("onPrintFormValues", this.formValue);
    },
  },
};
</script>

<style lang="scss"></style>
