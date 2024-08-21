import type { DefineComponent } from "vue";
import type { BaseValues, FormBaseProps, FormProps, FormValues } from "./VersaForm";
import type { OneOf } from "./common";
import type { Action, BaseAction, ComponentAction } from "./VersaButton";

export type ModalAction<R> = OneOf<
    Omit<BaseAction, "action" | "disabled"> & {
        action?: (
            formValues: R,
            instance: Parameters<NonNullable<Action["aciton"]>>[1],
            option: ModalAction<R>
        ) => void;
        disabled?:
        | boolean
        | ((
            formValues: R,
            instance: Parameters<
                Exclude<NonNullable<Action["disabled"]>, boolean>
            >[0]
        ) => boolean);
    },
    ComponentAction
>;

export type ModalProps<R = BaseValues> = FormBaseProps<R> & {
    /** 受控显隐 */
    visible?: boolean;
    /**
     * 操作按钮
     * @default 'cancel,confirm'
     */
    actions?:
    | (ModalAction<R> | string | undefined | null)[]
    | ((formValues: R) => (ModalAction<R> | string | undefined | null)[]);

    /** 点击确认回调 */
    onOk?: (
        formValues: R,
        instance: Parameters<NonNullable<Action["aciton"]>>[1],
        options: ModalAction<R> & { close: () => void }
    ) => void;
    /**
     * 弹窗类型：el-dialog | el-drawer
     * @default 'el-dialog'
     */
    panelType?: "el-dialog" | "el-drawer";
    /** 弹窗表单展示时格式化 */
    formatBefore?: (defaultValues: R, done: () => void) => Promise<FormValues>;
    /** 表单配置属性 */
    formProps?: Partial<FormProps<R>>;
    /** 指定内容区域是否滚动 */
    maxHeight?: number | string;
    [extra: string]: unknown;
};

export type VersaModal = DefineComponent<ModalProps>;
