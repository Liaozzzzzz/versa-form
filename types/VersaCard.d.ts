import type { DefineComponent } from "vue";
import type { Action } from "./VersaButton";

export type CardProps = {
    title?: string;
    /** 操作列表 */
    actions?: (string | Action)[];
}

export type VersaCard = DefineComponent<CardProps>;
