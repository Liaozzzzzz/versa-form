export type TableBaseProps = {
    /** 表头宽度 */
    labelWidth?: string | number;
    /** 表头位置 */
    labelPosition?: string;
    /** 表单配置项 */
    options: any[];
    /** 默认值 */
    defaultValues?: Record<string, any>;
    /** 一行多列 */
    columns?: number,
    /** 表单状态：编辑-edit; 预览-preview; 禁用-disabled */
    status?: string | Function,
    /** 操作类型 */
    actionType?: string;
    labelSuffix?: string;
    /** 是否隐藏必填标志 */
    hideRequiredAsterisk?: boolean;
}