import type { DefineComponent, Component } from "vue";
import type { OneOf } from "./common";
import type { PageProvide } from "./VersaPage";

export type ButtonProps = {
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
    | { confirmType: "popconfirm" | "messageBox";[extra: string]: any };
    /** 是否禁用 */
    disabled?: boolean | ((instance: InstanceType<VersaButton> & PageProvide) => boolean);
}

export type ComponentAction = {
    is: string | Component;
    [extra: string]: any;
};

export type BaseAction = Omit<ButtonProps, "buttonText"> & {
    actionName: string;
    actionType: string;
    /** 嵌套在VersaPage下时，点击是否使用内置弹窗 */
    usePageModal?: boolean;
    /** 点击回调函数 */
    aciton?: (e: Event, instance: InstanceType<VersaButton>) => void;
    [k: string]: unknown;
};


export type Action = OneOf<ComponentAction, BaseAction>;

export type VersaButton = DefineComponent<
    ButtonProps,
    {},
    { isLoading: boolean; text: string }
>;