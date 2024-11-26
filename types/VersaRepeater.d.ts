import type { DefineComponent } from "vue";
import type {
    FormValues,
    FormOption,
    FormStatus,
    FormStatusFn
} from "./VersaForm";
import type { OneOf } from "./common";
import type { BaseAction, Action, ComponentAction } from "./VersaButton";

type RepeaterType = "sync" | "inline" | "dialog";

type RepeaterCoreInstance<T> = {
    /** repeater模型 */
    type: RepeaterType;
    /** 实时值 */
    values: T;
    /** 历史值 */
    temporaryValues: T;
    /** 是否为新增 */
    isNew: boolean;
    status: FormStatus;
    /** 挂载回调函数 */
    mounted: (form: RepeaterCoreInstance<T>) => void;
};

export type RepeaterAction<R> = OneOf<
    Omit<BaseAction, "action" | "disabled"> & {
        action?: (
            row: R,
            instance: Parameters<NonNullable<Action["aciton"]>>[1],
            option: RepeaterAction<R> & { clearRowSelection: (rows?: R[]) => void }
        ) => void;
        disabled?:
        | boolean
        | ((
            core: RepeaterCoreInstance<R>,
            instance: Parameters<
                Exclude<NonNullable<Action["disabled"]>, boolean>
            >[0]
        ) => boolean);
    },
    ComponentAction
> & {
    [k: string]: any
};

export type HasActionFn<T extends FormValues> = (
    row: T,
    index: number,
    options: {
        globalStatus: VersaRepeaterProps<T>["status"];
    }
) => boolean;

export type AsyncHandlerResult<T> =
    | boolean
    | { success: boolean; values: T }
    | undefined;

/** 表单全部配置 */
export type VersaRepeaterProps<T extends FormValues> = {
    /**
     * 增删查改模型：sync - 行内编辑； inline - 表格内编辑、保存； dialog - 弹窗类型
     * @default 'sync'
     */
    type?: RepeaterType;
    /** 表单配置项 */
    options?: FormOption<T>[];
    /** v-model的值 */
    modelValue?: T[];
    /** 全局编辑状态: */
    status?: FormStatus;
    /** 单行状态 */
    rowStatus?: FormStatus | FormStatusFn<T>;
    /** 行内唯一key */
    rowKey?: String;
    /** 每一行的默认值 */
    defaultValues?: T;
    /**
     * 新增之前是否要校验其它数据是否校验通过
     * @default true
     */
    validateBeforeAdd?: boolean;
    /** 最长可增加到多少行 */
    maxLength?: number;
    /** 除系统预设的其它按钮 */
    actions?:
    | (RepeaterAction<T> | string | undefined | null)[]
    | ((
        row: T,
        index: number,
        options: {
            globalStatus: VersaRepeaterProps<T>["status"];
        }
    ) => (RepeaterAction<T> | string | undefined | null)[]);
    /**
     * 是否有新增按钮
     * @default true
     */
    hasAdd?: boolean;
    /**
     * 是否有删除操作按钮
     * @default true
     */
    hasDelete?: boolean | HasActionFn<T>;
    /**
     * 是否有编辑操作按钮
     * @default true
     */
    hasUpdate?: boolean | HasActionFn<T>;
    /** 是否有保存操作按钮 */
    hasSave?: boolean | HasActionFn<T>;
    /** 是否有上移操作按钮 */
    hasMoveUp?: boolean | HasActionFn<T>;
    /** 是否有下移操作按钮 */
    hasMoveDown?: boolean | HasActionFn<T>;
    /** 各种异步操作钩子：add-新增；update-从预览态改为编辑态；save-编辑保存；remove-删除 */
    asyncHandler?: {
        add?: (
            row: T,
            index: number
        ) => Promise<AsyncHandlerResult<T>> | AsyncHandlerResult<T>;
        update?: (
            row: T,
            index: number
        ) => Promise<AsyncHandlerResult<T>> | AsyncHandlerResult<T>;
        save?: (
            row: T,
            index: number
        ) => Promise<AsyncHandlerResult<T>> | AsyncHandlerResult<T>;
        remove?: (
            row: T,
            index: number
        ) => Promise<AsyncHandlerResult<T>> | AsyncHandlerResult<T>;
    };
    /**
     * 编号
     * @default (index) => index<9 ? `0${index + 1}` : index + 1
     */
    index?: string | boolean | number | Function;
    /**
     * 对齐方式: left/right/center
     * @default 'left''
     */
    itemAlign?: "left" | "right" | "center";
    /**
     * 固定列模式(转换为二进制使用)： 1(1)-编号左固定；2(10)-编号右固定；4(100)-操作左固定；8(1000)-操作右固定
     * @default 0
     */
    fixedMode?: number;
    /**
     * 新增按钮文本
     * @default '新增'
     */
    addText?: string;
};

export type VersaRepeater<T extends FormValues> = DefineComponent<
    VersaRepeaterProps<T>
>;

export declare const VersaRepeater: VersaRepeater<FormValues>;
