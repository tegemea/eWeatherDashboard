
import "bootstrap/dist/css/bootstrap.min.css"
import './assets/main.scss'
import "bootstrap"

import { Icon } from '@iconify/vue';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('Icon', Icon)

app.use(createPinia())
app.use(router)

app.mount('#app')
