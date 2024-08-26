import type { DefineComponent } from "vue";
import type { TableBaseProps, TableProps } from "./VersaTable";
import type { FilterBaseProps, FilterProps } from "./VersaFilter";
import type { FormValues } from "./VersaForm";
import type { ModalProps } from "./VersaModal";

export type PageProvide<Q extends FormValues, F extends FormValues, R extends FormValues> = {
    queryParams: Q;
    filterValues: F;
    selectionValues: R[];
};

export type PageProps<
    R extends FormValues,
    F extends FormValues,
    D extends FormValues
> = FilterBaseProps<F> &
    TableBaseProps<R> & {
        /** 搜索配置项 */
        filterOptions?: FilterProps<F>["options"];
        /** 列表配置项 */
        tableOptions?: TableProps<R, F>["options"];
        /** 弹窗配置项 */
        detailProps?: ModalProps<R, R & D>;
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

export type VersaPage<
    R extends FormValues,
    F extends FormValues,
    D extends FormValues
> = DefineComponent<PageProps<R, F, D>>;

export declare const VersaPage: VersaPage<FormValues, FormValues, FormValues>;
