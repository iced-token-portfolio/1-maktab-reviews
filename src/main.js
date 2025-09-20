import { createApp } from 'vue'
import App from './App.vue'
import router from './lib/router'

import './main.css'
import i18n from './lib/i18n'

const app = createApp(App)

app.use(i18n)
app.use(router)

app.mount('#app')
