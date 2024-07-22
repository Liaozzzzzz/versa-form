<template>
    <div>
        <oms-form
            ref="omsForm"
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
        </oms-form>
        <el-button @click="onChangeFormStatus('preview')">切换到预览</el-button>
        <el-button @click="onChangeFormStatus('edit')">切换到编辑</el-button>
        <el-button @click="onChangeFormStatus('disabled')">切换到禁用</el-button>
        <el-button @click="onReset">重置</el-button>
        <el-button @click="onClearValidate">清除校验结果</el-button>
        <el-button @click="onValidateAll">校验全部</el-button>
        <el-button @click="onValidateAllCallback">Callback模式校验全部</el-button>
        <el-button @click="onValidatePartial">校验局部</el-button>
        <el-button @click="onValidatePartialCallback">Callback模式校验局部</el-button>
        <el-button @click="onPrintFormValues">打印表单值</el-button>
    </div>
</template>
<script>
import { formOptions } from './config';

export default {
    data() {
        return {
            formOptions,
            formValue: {},
            defaultValues: {
                'el-input-textarea': '1312',
                'nest-form': {
                    // date: '2023-07-12',
                    year: '2022'
                },
                omsRepeater: [
                    {
                        'radio-group': 'test2',
                        telphone: 15527137531
                    }
                ]
            },
            status: 'edit',
            test: {}
        };
    },
    watch: {
        formValue: {
            handler() {
                console.log('watch::formValue', this.formValue);
            },
            deep: true
        },
        test: {
            handler() {
                console.log('watch::test', this.test);
            },
            deep: true
        }
    },
    methods: {
        onChangeFormStatus(status) {
            this.status = status;
        },
        onValidated(...args) {
            // console.log('onValidated', args);
        },
        onReset() {
            this.$refs.omsForm.resetField();
        },
        onClearValidate() {
            this.$refs.omsForm.clearValidate();
        },
        onValidateAll() {
            this.$refs.omsForm.validate();
        },
        onValidateAllCallback() {
            this.$refs.omsForm.validate((errors, ...reset) => {
                console.log(errors, reset);
            });
        },
        async onValidatePartial() {
            this.$refs.omsForm.validateField(['telphone1', 'radio-group']);
        },
        onValidatePartialCallback() {
            this.$refs.omsForm.validateField(['telphone1', 'nest-form'], (errors, ...reset) => {
                console.log(errors, reset);
            });
        },
        onPrintFormValues() {
            console.log('onPrintFormValues', this.formValue);
        }
    }
};
</script>

<style lang="scss">
</style>
