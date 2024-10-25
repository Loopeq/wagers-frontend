import { createApp } from 'vue'
import App from './AppBase.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import './theme.css' 


// eslint-disable-next-line
const NON_DEV = 'https://wagers-dev.onrender.com'
// eslint-disable-next-line
const DEV = 'http://localhost:8000'
const app = createApp(App)
app.config.globalProperties.$hostname = NON_DEV
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')