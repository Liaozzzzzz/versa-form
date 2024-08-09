import type { ComputedOptions, DefineComponent, MethodOptions } from "vue";

// type BaseValues = Record<string, string | number | boolean | null | undefined>;

interface BaseValues {
    [key: string]: string | number | boolean | null | undefined | BaseValues | BaseValues[]
}


/**
 * 表单值
 */
export type FormValues<T = BaseValues> = {
    [P in keyof T]: T[P];
};

/**
 * 表单状态
 */
export type FormStatus = "edit" | "preview" | "disabled";

export type FormStatusFn = () => FormStatus;

export interface FormOption {
    /**
     * 标签
     * @optional
     */
    label?: string;
}

export interface FormBaseProps {
    /**
     * 表头宽度
     * @default '90'
     * @optional
     */
    labelWidth?: string | number;
    /**
     * 表头位置
     * @optional
     */
    labelPosition?: "top" | "left";
    /**
     * 表单配置项
     *
     */
    options: FormOption[];
    /** 默认值 */
    defaultValues?: FormValues;
    /** 一行多列 */
    columns?: number;
    /** 表单状态：编辑-edit; 预览-preview; 禁用-disabled */
    status?: FormStatus | FormStatusFn;
    /** 操作类型 */
    actionType?: string;
    labelSuffix?: string;
    /** 是否隐藏必填标志 */
    hideRequiredAsterisk?: boolean;
}

export interface FormProps extends FormBaseProps { }

export interface FormMethods<T> extends MethodOptions {
    /**
     * 设置表单项状态
     */
    setStatus(field: Exclude<keyof FormValues<T>, "number">, status: FormStatus): void;
    setStatus(
        fieldsStatus: Record<Exclude<keyof FormValues<T>, number>, FormStatus>
    ): void;

    /**
     * 获取表单项目状态
     */
    getStatus(keys: Exclude<keyof FormValues<T>, "number">): FormStatus;
    getStatus(keys: Exclude<keyof FormValues<T>, "number">[]): Record<Exclude<keyof FormValues<T>, "number">, FormStatus>;


    /**
     * 重置表单到初始状态
     * @returns void
     */
    resetField(): void;

    /**
     * 清除校验结果
     */
    clearValidate(): void;
    clearValidate(field: Exclude<keyof FormValues<T>, "number">): void;
    clearValidate(field: Exclude<keyof FormValues<T>, "number">[]): void;

    /**
     * 校验
     */
    validate(callback: (valid: boolean, errorField: any) => void): void;
}

export type VersaForm<T = FormValues> = DefineComponent<
    FormProps,
    {},
    {},
    ComputedOptions,
    FormMethods<T>
>;
