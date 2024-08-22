import type {
    ComputedOptions,
    DefineComponent,
    MethodOptions,
    ComponentOptionsMixin,
    Component,
} from "vue";
import type { RuleItem } from "async-validator";

export type BaseValues = {
    [key: string | number]:
    | string
    | number
    | boolean
    | null
    | undefined
    | BaseValues
    | BaseValues[];
}

/** 表单值 */
export type FormValues<T = BaseValues> = {
    [P in keyof T]: T[P];
};

export type FieldKeys<T> = keyof FormValues<T>;

/** 校验错误信息 */
export type ValidErrors<T = BaseValues> = {
    field: FieldKeys<T>;
    fieldValue: FormValues<T>[FieldKeys<T>];
    message: string;
}

/** 表单基础状态 */
export type FormStatus = "edit" | "preview" | "disabled";

/** 操作类型 */
export type ActionType = "create" | "edit" | "detail";

export type SensitiveType = 'cellphone' | 'identity' | ((value: string | number | null | undefined) => string);

/** 表单项配置 */
export type FormOption<T extends BaseValues> = {
    /** 标签 */
    label?: string;
    /** 标签宽度 */
    labelWidth?: string;
    /** 表单项布局方式，支持卡片布局 */
    labelType?: 'card' | {
        type: 'card';
        [extra: string | number]: any;
    };
    /** 表单field */
    prop: FieldKeys<BaseValues>;
    /** 表单元素 */
    element?: string | Component;
    /** 预览时是否加密展示 */
    sensitive?: boolean;
    sensitiveType?: SensitiveType | ((value: BaseValues) => string);
    /** 末尾弹窗提示 */
    tooltip?: string;
    /** 底部 */
    tips?: string;
    /** 暗文本提示 */
    placeholder?: string;
    rules?: Rule[];
    required?: boolean;
    /** 表单状态 */
    status?: FormStatus | FormStatusFn<T>;
    /** select、radio、checkbox等元素的映射 */
    mapSource?: Record<string, string | number>;
    formItemProps?: {
        [extra: string]: any;
    };
    /** 其它额外属性 */
    [extra: string]: any;
}

/** 表单状态函数 */
export type FormStatusFn<T extends BaseValues> = (
    formValues: T,
    option: FormOption<T>,
    extraConfig: {
        actionType: ActionType;
        globalStatus: FormStatus;
    }
) => FormStatus;

export type Rule = RuleItem & {
    trigger?: string | string[];
}

/** 表单基础配置 */
export type FormBaseProps<T extends BaseValues> = {
    /**
     * 表头宽度
     * @default '90'
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
    options?: FormOption<T>[];
    /** 默认值 */
    defaultValues?: FormValues<T>;
    /**
     * 一行多列
     * @default 1
     */
    columns?: number;
    /**
     * 表单状态
     * @default 'edit'
     */
    status?: FormStatus | FormStatusFn<T>;
    /**
     * 操作类型
     * @default 'edit'
     */
    actionType?: ActionType;
    labelSuffix?: string;
    /** 是否隐藏必填标志 */
    hideRequiredAsterisk?: boolean;
}

/** 表单全部配置 */
export type FormProps<T extends BaseValues> = FormBaseProps<T> & {
    /**
     * 初始化时自动处理初始值
     * @default true
     */
    autoInitValue?: boolean;
    /** v-model的值 */
    modelValue?: FormValues<T>;
    /**
     * container容器
     * @default 'form'
     */
    component?: string;
    /** 全局校验规则 */
    rules?: Record<FieldKeys<T>, Rule[]>;
    /** 是否行内 */
    inline?: boolean;
    /** 报错信息行内展示 */
    inlineMessage?: boolean;
    statusIcon?: boolean;
    /**
     * 是否展示报错信息
     * @default true
     */
    showMessage?: boolean;
    size?: string;
    disabled?: boolean;
    /**
     * 全局校验规则改变时是否触发校验
     * @default true
     */
    validateOnRuleChange?: boolean;
    /** 是否在versa-repeater下使用 */
    isRepeater?: boolean;
}

export type FormMethods<T> = MethodOptions & {
    /**
     * 设置表单项状态
     */
    setStatus(field: FieldKeys<T>, status: FormStatus): void;
    setStatus(fieldsStatus: Record<FieldKeys<T>, FormStatus>): void;

    /**
     * 获取表单项目状态
     */
    getStatus(field: FieldKeys<T>): FormStatus;
    getStatus(fields: FieldKeys<T>[]): Record<FieldKeys<T>, FormStatus>;

    /**
     * 重置表单到初始状态
     * @returns void
     */
    resetField(): void;

    /**
     * 清除校验结果
     */
    clearValidate(): void;
    clearValidate(field: FieldKeys<T>): void;
    clearValidate(fields: FieldKeys<T>[]): void;

    /**
     * 校验
     */
    validate(): Promise<boolean>;
    validate(
        callback: (
            valid: boolean,
            errorFields: { [key in FieldKeys<T>]: ValidErrors<T>[] }
        ) => void
    ): void;

    /**
     * 校验某些字段
     */
    validateField(fields: FieldKeys<T>[]): Promise<boolean>;
    validateField(
        fields: FieldKeys<T>[],
        callback: (
            valid: boolean,
            errorFields: { [key in FieldKeys<T>]: ValidErrors<T>[] }
        ) => void
    ): void;
}

type EmitOptions<T> = {
    "update:modelValue": (formValues: T) => void;
    validate: (field: FieldKeys<T>, valid: boolean, message: string) => void;
    onMounted: (formValues: T) => void;
}

export type VersaForm<T extends BaseValues> = DefineComponent<
    FormProps<T>,
    {},
    {},
    ComputedOptions,
    FormMethods<T>,
    ComponentOptionsMixin,
    ComponentOptionsMixin,
    // @ts-ignore
    EmitOptions<T>
>;
