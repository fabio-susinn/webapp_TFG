import './assets/main.css'
import App from './App.vue'
import { router } from '@/routes'

import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'

createApp(App).use(bootstrap).use(router).mount('#app')
