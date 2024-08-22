<template>
  <div>
    <versa-form
      ref="VersaFormRef"
      labelWidth="auto"
      :defaultValues="{ ...state.defaultValues, a: 1 }"
      :options="formOptions"
      :status="state.status"
      v-model="state.formValue"
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
    <el-form :model="state.test">
      <el-form-item
        label="测试"
        prop="tests"
        :rules="[
          { required: true, trigger: 'blur' },
          { type: 'string', min: 2, trigger: 'change', message: 'ceil' },
        ]"
      >
        <el-input v-model="state.test.tests"></el-input>
        <el-input v-model="state.test.test212s"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from "vue";
import { formOptions } from "./config";
import type { VersaForm } from "@root/types/VersaForm";

const state = reactive({
  formOptions,
  formValue: {},
  defaultValues: {
    "el-input-textarea": "1312",
    "nest-form": {
      // date: '2023-07-12',
      year: "2022",
    },
    "radio-group": null,
    telphone1: "",
    VersaRepeater: [
      {
        "radio-group": "test2",
        telphone: 15527137531,
      },
    ],
  },
  status: "edit" as const,
  test: {} as any,
});

const VersaFormRef =
  ref<InstanceType<VersaForm<{ aaa: 0 } & typeof state.defaultValues>>>();

watch(
  () => state.formValue,
  () => {
    console.log("form:watch::formValue", state.formValue);
  },
  {
    deep: true,
  }
);

watch(
  () => state.test,
  () => {
    console.log("form:watch::test", state.test);
  },
  {
    deep: true,
  }
);

const onChangeFormStatus = (status) => {
  state.status = status;
};

const onValidated = (...args) => {
  console.log("onValidated", args);
};

const onReset = () => {
  VersaFormRef.value?.resetField();
  VersaFormRef.value?.setStatus("aaa", "edit");
  VersaFormRef.value?.getStatus(["aaa"]);
  VersaFormRef.value?.clearValidate();
  VersaFormRef.value?.clearValidate("aaa");
  VersaFormRef.value?.clearValidate(["aaa"]);
};
const onClearValidate = () => {
  VersaFormRef.value?.clearValidate();
};

const onValidateAll = () => {
  VersaFormRef.value?.validate((valid, errorField) => {
    console.log(valid, errorField);
    // errorField.((item) => item.field === "aaa");
  });
  VersaFormRef.value
    ?.validate()
    .then((valid) => {
      console.log(valid);
    })
    .catch((error) => {
      error;
    });
};

const onValidateAllCallback = () => {
  VersaFormRef.value?.validate((errors, ...reset) => {
    console.log(errors, reset);
  });
};

const onValidatePartial = () => {
  VersaFormRef.value?.validateField(["telphone1", "radio-group"]);
};
const onValidatePartialCallback = () => {
  VersaFormRef.value?.validateField(
    ["telphone1", "nest-form"],
    (errors, ...reset) => {
      console.log(errors, reset);
    }
  );
};
const onPrintFormValues = () => {
  console.log("onPrintFormValues", state.formValue);
};
</script>

<style lang="scss"></style>
