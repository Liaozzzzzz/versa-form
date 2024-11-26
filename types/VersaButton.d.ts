import type { DefineComponent, Component } from "vue";
import type { OneOf } from "./common";
import type { PageProvide } from "./VersaPage";
import type { FormValues } from "./VersaForm";

export type VersaButtonProps = {
    /**
     * 防抖时间
     * @default 200
     */
    debounce?: number;
    /**
     * @default true
     */
    leading?: boolean;
    /**
     * @default: false
     */
    trailing?: boolean;
    /** 外部控制loading */
    loading?: boolean;
    /** 按钮文案 */
    buttonText?: string;
    /** 二次弹窗校验, 参考 el-popconfirm和el-messageBox详细配置 */
    popconfirm?:
    | string
    | { confirmType?: "popconfirm" | "messageBox";[extra: string]: any };
    /** 是否禁用 */
    disabled?:
    | boolean
    | ((instance: InstanceType<VersaButton> & PageProvide<FormValues, FormValues, FormValues>, ...args: any[]) => boolean);
};

export type ComponentAction = {
    is: string | Component;
};

export type BaseAction = Omit<VersaButtonProps, "buttonText"> & {
    actionName: string;
    actionType: string;
    /** 嵌套在VersaPage下时，点击是否使用内置弹窗 */
    usePageModal?: boolean;
    /** 点击回调函数 */
    aciton?: (e: Event, instance: InstanceType<VersaButton>) => void;
};

export type Action = OneOf<ComponentAction, BaseAction> & {
    [k: string]: any
};

export type VersaButton = DefineComponent<
    VersaButtonProps,
    {},
    { isLoading: boolean; text: string }
>;

export declare const VersaButton: VersaButton;
