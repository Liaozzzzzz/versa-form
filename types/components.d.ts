import type { VersaPage } from "./VersaPage";
import type { VersaForm } from "./VersaForm";
import type { VersaTable } from "./VersaTable";
import type { VersaButton } from "./VersaButton";
import type { VersaFilter } from './VersaFilter';
import type { VersaCard } from './VersaCard';
import type { VersaModal } from './VersaModal';
import type { VersaRepeater } from './VersaRepeater';
import type { VersaCheckboxGroup } from './VersaCheckboxGroup';
import type { VersaDropdown } from "./VersaDropdown";
import type { VersaImageUpload } from "./VersaImageUpload";
import type { VersaRadioGroup } from "./VersaRadioGroup";
import type { VersaSelect } from "./VersaSelect";

declare module "vue" {
  export interface GlobalComponents {
    VersaPage: VersaPage;
    VersaForm: VersaForm;
    VersaTable: VersaTable;
    VersaButton: VersaButton;
    VersaFilter: VersaFilter;
    VersaCard: VersaCard;
    VersaModal: VersaModal;
    VersaRepeater: VersaRepeater;
    VersaCheckboxGroup: VersaCheckboxGroup;
    VersaDropdown: VersaDropdown;
    VersaImageUpload: VersaImageUpload;
    VersaRadioGroup: VersaRadioGroup;
    VersaSelect: VersaSelect;
  }
}

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
  VersaSelect
};
