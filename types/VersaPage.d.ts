import type { DefineComponent } from "vue";
import type { TableBaseProps, TableProps } from "./VersaTable";
import type { FilterBaseProps, FilterProps } from "./VersaFilter";
import type { BaseValues, FormValues } from "./VersaForm";
import type { ModalProps } from "./VersaModal";

export type PageProvide<Q = FormValues, F = FormValues, R = FormValues> = {
    queryParams: Q;
    filterValues: F,
    selectionValues: R[]
}

export type PageProps<R extends BaseValues, F extends BaseValues, D extends BaseValues> = FilterBaseProps & TableBaseProps & {
    /** 搜索配置项 */
    filterOptions?: FilterProps['options'];
    /** 列表配置项 */
    tableOptions?: TableProps<R, F>['options'];
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
    onCreate?: Function,
    /** 编辑回调 */
    onUpdate?: Function,
    /** 删除 */
    onRemove?: Function,
}

export type VersaPage = DefineComponent<PageProps<any, any, any>>
