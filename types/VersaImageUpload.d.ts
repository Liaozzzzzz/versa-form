import type { DefineComponent } from "vue";
import type { FormStatus } from "./VersaForm";

export type VersaImageUploadProps = {
    modelValue?: string | File;
    /**
     * 最大可上传的尺寸
     * @default 5 * 1024 * 1024 'b'
     */
    maxSize?: number;
    status?: FormStatus;
    /**
     * 可上传的图片格式
     * @default '.png;.jpg;.jpeg'
     */
    accept?: string;
    /** 上传回调 */
    onUpload?: Function;
};

export type VersaImageUpload = DefineComponent<VersaImageUploadProps>;

export declare const VersaImageUpload: VersaImageUpload;
