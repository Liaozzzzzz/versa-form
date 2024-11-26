import type { DefineComponent } from "vue";
import type { Action, BaseAction, ComponentAction } from "./VersaButton";
import type { FormValues, FormOption } from "./VersaForm";
import { OneOf } from "./common";

export type FilterAction<R extends FormValues> = OneOf<
    Omit<BaseAction, "action" | "disabled"> & {
        action?: (
            formValues: R,
            instance: Parameters<NonNullable<Action["aciton"]>>[1],
            option: FilterAction<R>
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
> & {
    [k: string]: any
};

export type FilterBaseProps<T extends FormValues> = {
    /** 默认筛选项 */
    defaultFilters?: T;
    /**
     * 提交按钮项，多个用逗号分隔（search,reset,create）
     * @default 'search,reset'
     */
    actions?:
    | (FilterAction<T> | string | undefined | null)[]
    | ((formValues: T) => (FilterAction<T> | string | undefined | null)[]);
    /**
     * 表头宽度
     * @default '90'
     */
    labelWidth?: number | string;
    /** 是否需要折叠（分割） */
    isSplit?: boolean;
    /**
     * 固定展示数量
     * @default 8
     */
    firstCount?: number;
    /**
     * 是否移除文本空格
     * @default true
     */
    trim?: boolean;
    /** 搜索条件头部标题 */
    filterTitle?: string;
    labelSuffix?: string;
};

export type VersaFilterProps<T extends FormValues> = FilterBaseProps<T> & {
    options: FormOption<T>[];
};

export type VersaFilter = DefineComponent<VersaFilterProps<FormValues>>;

export declare const VersaFilter: VersaFilter;
