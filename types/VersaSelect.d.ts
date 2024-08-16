import type { DefineComponent } from "vue";
import type { BaseOptions } from "./common";
import type { FormStatus } from "./VersaForm";

export type VersaSelectProps = {
    /** 配置项，{label: '', value: ''} */
    options?: BaseOptions;
    /** 渲染map对象 */
    mapSource?: Record<BaseOptions["label"], BaseOptions["value"]>;
    labelInValue: boolean | { label: string; value: string };
    modelValue?: Array<
        BaseOptions["value"] | BaseOptions | Record<string, BaseOptions["value"][]>
    >;
    /**
     * @default 'edit'
     */
    status?: FormStatus;
    /**
     * @default false
     */
    hasAll?: boolean;
    /**
     * @default 'SELECT_ALL_999999'
     */
    valueOfAll?: string;
    /**
     * 是否多选
     * @defalut false
     */
    multiple?: boolean;
};

export type VersaSelect = DefineComponent<VersaSelectProps>;
