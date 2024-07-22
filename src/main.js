import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import { OmsPage, OmsTable, OmsButton, OmsDropdown, OmsForm, OmsRepeater, OmsCard } from './components';



const app = createApp(App)

app.config.unwrapInjectedRef = true;

app.use(ElementPlus);
app.component('OmsDropdown', OmsDropdown);
app.component('OmsPage', OmsPage);
app.component('OmsTable', OmsTable);
app.component('OmsButton', OmsButton);
app.component('OmsForm', OmsForm)
app.component('OmsRepeater', OmsRepeater);
app.component('OmsCard', OmsCard)

app.mount('#app');
