import type { App } from "vue";
import { VersaPage } from "./VersaPage";
import { FormValues, VersaForm } from "./VersaForm";
import { VersaTable } from "./VersaTable";
import { VersaButton } from "./VersaButton";
import { VersaFilter } from "./VersaFilter";
import { VersaCard } from "./VersaCard";
import { VersaModal } from "./VersaModal";
import { VersaRepeater } from "./VersaRepeater";
import { VersaCheckboxGroup } from "./VersaCheckboxGroup";
import { VersaDropdown } from "./VersaDropdown";
import { VersaImageUpload } from "./VersaImageUpload";
import { VersaRadioGroup } from "./VersaRadioGroup";
import { VersaSelect } from "./VersaSelect";
import { VersaMessageBox } from "./VersaMessageBox";

declare module "vue" {
  export interface GlobalComponents {
    VersaPage: VersaPage<FormValues, FormValues, FormValues>;
    VersaForm: VersaForm<FormValues>;
    VersaTable: VersaTable<FormValues, FormValues>;
    VersaButton: VersaButton;
    VersaFilter: VersaFilter;
    VersaCard: VersaCard;
    VersaModal: VersaModal<FormValues, FormValues>;
    VersaRepeater: VersaRepeater<FormValues>;
    VersaCheckboxGroup: VersaCheckboxGroup;
    VersaDropdown: VersaDropdown;
    VersaImageUpload: VersaImageUpload;
    VersaRadioGroup: VersaRadioGroup;
    VersaSelect: VersaSelect;
    VersaMessageBox: VersaMessageBox;
  }
}

declare const installer: {
  install: (app: App) => void;
};

export {
  VersaPage,
  VersaForm,
  VersaTable,
  VersaButton,
  VersaFilter,
  VersaCard,
  VersaModal,
  VersaRepeater,
  VersaCheckboxGroup,
  VersaDropdown,
  VersaImageUpload,
  VersaRadioGroup,
  VersaSelect,
  VersaMessageBox,
};

export default installer;
