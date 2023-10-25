import './assets/main.css'

import { createApp } from 'vue'
import App from './AppBarbu.vue'
import PrimeVue from 'primevue/config'

const app = createApp(App)

// TODO ROUTER
app.use(PrimeVue)

app.mount('#app')
