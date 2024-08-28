import type { App } from "vue";

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
} from './types/global';

export default installer;