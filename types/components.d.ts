import type { VersaPage } from "./VersaPage";
import type { VersaForm } from "./VersaForm";
import type { VersaTable } from "./VersaTable";
import type { VersaButton } from "./VersaButton";
import type { VersaFilter } from './VersaFilter';
import type { VersaCard } from './VersaCard';
import type { VersaModal } from './VersaModal';

declare module "vue" {
  export interface GlobalComponents {
    VersaPage: VersaPage;
    VersaForm: VersaForm;
    VersaTable: VersaTable;
    VersaButton: VersaButton;
    VersaFilter: VersaFilter;
    VersaCard: VersaCard;
    VersaModal: VersaModal;
  }
}

export { };
