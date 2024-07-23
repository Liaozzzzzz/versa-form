import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import { VersaPage, VersaTable, VersaButton, VersaDropdown, VersaForm, VersaRepeater, VersaCard } from './components';



const app = createApp(App)

app.config.unwrapInjectedRef = true;

app.use(ElementPlus);
app.component('VersaDropdown', VersaDropdown);
app.component('VersaPage', VersaPage);
app.component('VersaTable', VersaTable);
app.component('VersaButton', VersaButton);
app.component('VersaForm', VersaForm)
app.component('VersaRepeater', VersaRepeater);
app.component('VersaCard', VersaCard)

app.mount('#app');
