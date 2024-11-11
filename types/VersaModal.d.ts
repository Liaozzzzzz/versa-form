import type { DefineComponent } from "vue";
import type {
    FormBaseProps,
    VersaFormProps,
    FormValues,
} from "./VersaForm";
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

export type VersaModalProps<
    R extends FormValues,
    D extends FormValues
> = FormBaseProps<D> & {
    /** 受控显隐 */
    visible?: boolean;
    /**
     * 操作按钮
     * @default 'cancel,confirm'
     */
    actions?:
    | (ModalAction<D> | string | undefined | null)[]
    | ((formValues: D) => (ModalAction<D> | string | undefined | null)[]);

    /** 点击确认回调 */
    onOk?: (
        formValues: D,
        instance: Parameters<NonNullable<Action["aciton"]>>[1],
        options: ModalAction<D> & { close: () => void }
    ) => void;
    /**
     * 弹窗类型：el-dialog | el-drawer
     * @default 'el-dialog'
     */
    panelType?: "el-dialog" | "el-drawer";
    /** 弹窗表单展示时格式化 */
    formatBefore?: (
        defaultValues: R,
        done: () => void
    ) => Promise<D | unknown>;
    /** 表单配置属性 */
    formProps?: Partial<VersaFormProps<D>>;
    /** 指定内容区域是否滚动 */
    maxHeight?: number | string;
    [extra: string]: unknown;
};

export type VersaModal<
    R extends FormValues,
    D extends FormValues
> = DefineComponent<VersaModalProps<R, D>>;

export declare const VersaModal: VersaModal<FormValues, FormValues>;
