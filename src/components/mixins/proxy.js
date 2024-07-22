import { unref } from 'vue';
import { PageCoreInjectionKey } from '../config';
import { hasOwnProperty } from '../utils';

/** 全局状态代理 */
export const instanceProxy = {
    inject: {
        injectedPageCore: {
            from: PageCoreInjectionKey,
            default: {}
        },
        formCore: {
            from: 'VersaForm',
            default: () => ({})
        }
    },
    computed: {
        pageCore() {
            return unref(this.injectedPageCore);
        }
    },
    methods: {
        proxyPageCore(instance) {
            // vue3 没办法判断是否为vue实例
            return new Proxy(instance?.$ ? instance : { ...instance, ...this.pageCore }, {
                get: (target, propKey) => {
                    // page和form核心优先获取
                    if (['formCore', 'pageCore'].includes(propKey)) {
                        return this[propKey];
                    }

                    if (hasOwnProperty(this.pageCore, propKey)) {
                        return Reflect.get(this.pageCore, propKey);
                    }

                    return Reflect.get(target, propKey);
                },
                set(target, propKey, value) {
                    return Reflect.set(target, propKey, value)
                }
            });
        }
    }
}