import type { DefineComponent } from "vue";
import type { Action, BaseAction, ComponentAction } from "./VersaButton";
import type { FormValues, SensitiveType, FieldKeys, SensitiveReturnType } from "./VersaForm";
import type { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import type { BaseOptions, OneOf } from "./common";

export type TableToolAction<R> = OneOf<
    Omit<BaseAction, 'action' | 'disabled'> & {
        action?: (
            rows: R[],
            instance: Parameters<NonNullable<Action["aciton"]>>[1],
            option: TableToolAction<R> & { clearRowSelection: (rows?: R[]) => void }
        ) => void;
        disabled?:
        | boolean
        | ((
            rows: R[],
            instance: Parameters<
                Exclude<NonNullable<Action["disabled"]>, boolean>
            >[0]
        ) => boolean);
    },
    ComponentAction
> & {
    [k: string]: any
};

export type TableOptionAction<R> = OneOf<
    Omit<BaseAction, 'action' | 'disabled'> & {
        action?: (
            row: R,
            instance: Parameters<NonNullable<Action["aciton"]>>[1],
            option: TableOptionAction<R> & { clearRowSelection: (rows?: R[]) => void }
        ) => void;
        disabled?:
        | boolean
        | ((
            row: R,
            instance: Parameters<
                Exclude<NonNullable<Action["disabled"]>, boolean>
            >[0]
        ) => boolean);
    },
    ComponentAction
> & {
    [k: string]: any
};

export type TableBaseProps<R extends FormValues> = {
    /**
     * 是否需要分页
     * @default true
     */
    needPagination?: boolean;
    /** 列表查询接口或方法 */
    api?: string | ((value: Record<string, any>) => Promise<any>);
    /**
     * 列表请求方法
     * @default 'get'
     */
    apiMethod?: "get" | "post" | "GET" | "POST";
    /** 格式化请求结果 */
    formatResults?: Function;
    /** 格式化筛选框数据 */
    formatFilter?: Function;
    /**
     * 行数据的唯一标识字段
     * @default 'id'
     */
    rowKey?: Function | string;
    /** 远程数据获取路径 */
    listKey?: string;
    /** 获取总数路径 */
    totalKey?: string;
    /** 操作栏配置 */
    toolOptions?: (TableToolAction<R> | string | undefined | null)[];
    /** 列表title */
    headline?: string;
    /** 列表的其他属性配置 */
    extraTableProps?: Record<string, any>;
    /** 列表单元格无数据时需要展示的数据 */
    fillNull?: string;
};

export type TableOption<R extends FormValues> = Partial<TableColumnCtx<R>> & {
    prop?: FieldKeys<R>,
    /** 预览时是否加密展示 */
    sensitive?: boolean;
    sensitiveType?: ((row: R) => SensitiveReturnType) | SensitiveType;
    /** 枚举映射 */
    mapSource?:
    | Record<string, string | number>
    | BaseOptions[];
    /** 自定义插槽名称 */
    slotName?: string;
    actions?:
    | (TableOptionAction<R> | string | undefined | null)[]
    | ((row: R) => (TableOptionAction<R> | string | undefined | null)[]);
};

export type VersaTableProps<
    R extends FormValues,
    F extends FormValues
> = TableBaseProps<R> & {
    /** 列表配置 */
    options: TableOption<R>[];
    /** 列表自定义数据 */
    tableData?: Array<R>;
    /** 查询条件 */
    queryParams?: F;
    /**
     * 是否自动查询
     * @default true
     */
    autoLoad?: boolean;
};

export type VersaTable<
    R extends FormValues,
    F extends FormValues
> = DefineComponent<VersaTableProps<R, F>>;

export declare const VersaTable: VersaTable<FormValues, FormValues>;
