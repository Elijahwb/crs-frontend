import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/tailwind.css'
import './assets/css/main.css'
import './assets/tailwind.css'
import './axios'

createApp(App)
.use(router)
.mount('#app')
