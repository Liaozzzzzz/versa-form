import type { DefineComponent } from "vue";
import type { BaseOptions } from "./common";
import type { FormStatus } from "./VersaForm";

export type VersaCheckboxGroupProps = {
    /** 配置项，{label: '', value: ''} */
    options?: BaseOptions;
    /** 渲染map对象 */
    mapSource?: Record<BaseOptions["label"], BaseOptions["value"]>;
    labelInValue: boolean | { label: string; value: string };
    modelValue?: Array<
        BaseOptions["value"] | BaseOptions | Record<string, BaseOptions["value"][]>
    >;
    /**
     * @default false
     */
    border?: boolean;
    /**
     * @default false
     */
    button?: boolean;
    /**
     * @default 'edit'
     */
    status?: FormStatus;
};

export type VersaCheckboxGroup = DefineComponent<VersaCheckboxGroupProps>;

export declare const VersaCheckboxGroup: VersaCheckboxGroup;
