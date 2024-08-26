import type {
    ElMessageBoxOptions,
    MessageBoxData,
} from "element-plus/es/components/message-box/src/message-box.type";

type MessageBoxPorps = ElMessageBoxOptions & {
    title?: string;
    message?: string;
};

export type VersaMessageBox = (
    props: MessageBoxPorps
) => Promise<MessageBoxData>;

export declare const VersaMessageBox: VersaMessageBox;
