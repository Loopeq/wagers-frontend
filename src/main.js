import { createApp } from 'vue'
import App from './AppBase.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'
import './theme.css' 

const app = createApp(App)
console.log(process.env.VUE_APP_API_URL)
app.config.globalProperties.$hostname = process.env.VUE_APP_API_URL
axios.defaults.baseURL = app.config.globalProperties.$hostname
app.use(VueAxios, axios)
app.use(router)
app.mount('#app')
