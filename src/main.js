import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import * as VersaForm from './components';



const app = createApp(App)

app.config.unwrapInjectedRef = true;

app.use(ElementPlus);
app.use(VersaForm)

app.mount('#app');
