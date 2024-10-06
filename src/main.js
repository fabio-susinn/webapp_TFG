import './assets/main.css'
import App from './App.vue'

import { createApp } from 'vue'

import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.js'

import { createI18n } from 'vue-i18n'

const i18n = createI18n({
  locale: 'es',
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        hello: 'hello world'
      }
    },
    es: {
      message: {
        hello: 'hola mundo'
      }
    }
  }
})

createApp(App).use(bootstrap).use(i18n).mount('#app')
