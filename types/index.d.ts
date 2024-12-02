import type { App } from "vue";

export { VersaPage, VersaPageProps } from "./VersaPage";
export { VersaForm, VersaFormProps, FormValues, FormStatus, ActionType, FormOption } from "./VersaForm";
export { VersaTable, VersaTableProps, TableOption } from "./VersaTable";
export { VersaButton, VersaButtonProps } from "./VersaButton";
export { VersaFilter, VersaFilterProps } from "./VersaFilter";
export { VersaCard, VersaCardProps } from "./VersaCard";
export { VersaModal, VersaModalProps } from "./VersaModal";
export { VersaRepeater, VersaRepeaterProps } from "./VersaRepeater";
export { VersaCheckboxGroup, VersaCheckboxGroupProps } from "./VersaCheckboxGroup";
export { VersaDropdown, VersaDropdownProps } from "./VersaDropdown";
export { VersaImageUpload, VersaImageUploadProps } from "./VersaImageUpload";
export { VersaRadioGroup, VersaRadioGroupProps } from "./VersaRadioGroup";
export { VersaSelect, VersaSelectProps } from "./VersaSelect";
export { VersaMessageBox, VersaMessageBoxProps } from "./VersaMessageBox";
export { BaseOptions } from './common'

declare const installer: {
    install: (app: App) => void;
};

export default installer;