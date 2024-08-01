import camelCase from 'lodash/camelCase';
import upperFirst from 'lodash/upperFirst';
import VersaPage  from './page.vue';
import VersaFilter  from './filter.vue';
import VersaTable  from './table.vue';
import VersaForm  from './form.vue';
import VersaModal  from './modal.vue';
import VersaButton  from './button.vue';
import VersaCheckboxGroup  from './checkbox-group.vue';
import VersaRadioGroup  from './radio-group.vue';
import VersaDropdown  from './dropdown.vue';
import VersaSelect  from './select.vue';
import VersaRepeater  from './repeater.vue';
import VersaCard  from './card.vue';
import VersaProvide  from './provide.vue';
import VersaImageUpload from './image-upload.vue';
import VersaMessageBox from './message-box';

const components = [
    VersaPage,
    VersaFilter,
    VersaTable,
    VersaForm,
    VersaModal,
    VersaButton,
    VersaCheckboxGroup,
    VersaRadioGroup,
    VersaDropdown,
    VersaSelect,
    VersaRepeater,
    VersaCard,
    VersaProvide,
    VersaImageUpload
]

const install = (app) => {
    components.forEach(element => {
        app.component(upperFirst(camelCase(element.name)), element)
    });
}

export {
    VersaPage,
    VersaFilter,
    VersaTable,
    VersaForm,
    VersaModal,
    VersaButton,
    VersaCheckboxGroup,
    VersaRadioGroup,
    VersaDropdown,
    VersaSelect,
    VersaRepeater,
    VersaCard,
    VersaProvide,
    VersaMessageBox,
    install
}