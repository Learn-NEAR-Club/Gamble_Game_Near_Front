import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import { Buffer } from "buffer"; 
global.Buffer = Buffer;

createApp(App).use(store).mount('#app')