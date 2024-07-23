import { unref } from 'vue';
import { ProvideInjectionKey } from "../config";

/** 全局配置 */
export const injectedConfig = {
    inject: {
        injectedProvide: {
            from: ProvideInjectionKey,
            default: {}
        },
    },
    computed: {
        globalConfig() {
            return unref(this.injectedProvide);
        }
    },
}            