<template>
    <OmsRepeater
        v-bind="repeatProps"
        type="sync"
        hasMoveUp
        hasMoveDown
        v-model="formValues"
        :asyncHandler="asyncHandler"
        :fixedMode="9"
    ></OmsRepeater>
</template>

<script>
import { repeatProps } from './config';
export default {
    data() {
        return {
            repeatProps,
            formValues: [
                { id: 1, 'radio-group': 'test1', telphone: 15527137531 },
                {
                    'radio-group': 'test2',
                    telphone: 15527137531
                }
            ],
            asyncHandler: {
                save: (...args) => {
                    console.log('asyncHandler.save', args);
                    return true;
                    // return {
                    //     success: true,
                    //     results: {}
                    // };
                }
            }
        };
    },
    watch: {
        formValues: {
            handler() {
                console.log('[demo]repeater::watch::formValues', this.formValues);
            },
            deep: true
        }
    }
};
</script>

<style lang="scss">
</style>
