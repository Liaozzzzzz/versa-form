import type {
    ComponentOptionsMixin,
    ComputedOptions,
    DefineComponent,
    MethodOptions,
} from "vue";
import type { BaseOptions } from "./common";

export type VersaDropdownProps = {
    /** 配置项，{label: '', value: ''} */
    options?: BaseOptions;
    /** 渲染map对象 */
    mapSource?: Record<BaseOptions["label"], BaseOptions["value"]>;
    /**
     * @default false
     */
    labelInValue?: boolean | { label: string; value: string };
    // modelValue?: Array<BaseOptions['value'] | BaseOptions | Record<string, BaseOptions['value'][]>>;
    /** 操作文案 */
    text: string | { text: string };
    /**
     * 右边icon的class
     * @default 'el-icon-arrow-down el-icon--right'
     */
    icon?: string;
    /** 外部控制loading */
    loading?: boolean;
};

type EmitOptions = {
    command: (
        value:
            | BaseOptions["value"]
            | BaseOptions
            | Record<string, BaseOptions["value"]>,
        instance: InstanceType<VersaDropdown>
    ) => void;
};

export type VersaDropdown = DefineComponent<
    VersaDropdownProps,
    {},
    { isLoading: boolean },
    ComputedOptions,
    MethodOptions,
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    EmitOptions
>;
