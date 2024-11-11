import type {
    ElMessageBoxOptions,
    MessageBoxData,
} from "element-plus/es/components/message-box/src/message-box.type";

type VersaMessageBoxProps = ElMessageBoxOptions & {
    title?: string;
    message?: string;
};

export type VersaMessageBox = (
    props: VersaMessageBoxProps
) => Promise<MessageBoxData>;

export declare const VersaMessageBox: VersaMessageBox;
