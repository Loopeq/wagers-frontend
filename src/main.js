import { createApp } from 'vue'
import { createPinia } from 'pinia'
import AppBase from './AppBase.vue'
import router from './router'
import './theme.css'
import dateUtils from '@/plugins/dateUtils';
import betUtils from '@/plugins/betUtils'
const req = require.context(
    '@/assets/icons', 
    true,             
    /\.svg$/          
  )
  
  req.keys().forEach(req)
createApp(AppBase).use(createPinia()).use(router).use(dateUtils).use(betUtils).mount('#app')
