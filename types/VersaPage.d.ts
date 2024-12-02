import type {
    ComputedOptions,
    DefineComponent,
    MethodOptions,
} from "vue";
import type { TableBaseProps, VersaTableProps } from "./VersaTable";
import type { FilterBaseProps, VersaFilterProps } from "./VersaFilter";
import type { FormValues } from "./VersaForm";
import type { VersaModalProps } from "./VersaModal";

export type PageProvide<
    Q extends FormValues,
    F extends FormValues,
    R extends FormValues
> = {
    queryParams: Q;
    filterValues: F;
    selectionValues: R[];
};

export type VersaPageProps<
    R extends FormValues,
    F extends FormValues,
    D extends FormValues
> = FilterBaseProps<F> &
    TableBaseProps<R> & {
        /** 搜索配置项 */
        filterOptions?: VersaFilterProps<F>["options"];
        /** 列表配置项 */
        tableOptions?: VersaTableProps<R, F>["options"];
        /** 弹窗配置项 */
        detailProps?: VersaModalProps<R, R & D>;
        /** filter 字段映射 */
        keyMap?: Record<string, any>;
        /**
         * 是否禁用重置的刷新列表
         * @default false
         */
        disableResetRequest?: boolean;
        /**
         * 是否自动查询
         * @default true
         */
        autoLoad?: boolean;
        /** 新增回调 */
        onCreate?: Function;
        /** 编辑回调 */
        onUpdate?: Function;
        /** 删除 */
        onRemove?: Function;
    };

export type PageMethods<R extends FormValues,
    F extends FormValues,
    D extends FormValues> = MethodOptions & {
        /** 刷新列表 */
        refresh: (params?: F) => void;
        /** 手动触发操作者 */
        onAction: (action: string, options: VersaPageProps<R, F, D>['detailProps']) => void;
    };

export type VersaPage<
    R extends FormValues,
    F extends FormValues,
    D extends FormValues
> = DefineComponent<
    VersaPageProps<R, F, D>,
    {},
    {},
    ComputedOptions,
    PageMethods<R, F, D>
>;

export declare const VersaPage: VersaPage<FormValues, FormValues, FormValues>;
