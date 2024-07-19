import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createVuestic } from "vuestic-ui";
import 'vuestic-ui/styles/essential.css';
import 'vuestic-ui/styles/typography.css';
import { createPinia } from 'pinia';
import router from './core/router/pages'
import Toaster from "@meforma/vue-toaster";

const app = createApp(App);

const pinia = createPinia();

app.use(router);

app.use(Toaster);

app.use(pinia);

app.use(createVuestic());

app.mount("#app");