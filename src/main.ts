import './assets/main.css'

import { createApp } from 'vue'
import App from './AppBarbu.vue'
import PrimeVue from 'primevue/config'
import { createRouter, createWebHashHistory } from 'vue-router'

import AppBarbuVue from './AppBarbu.vue'
import GamePageVue from './components/game/GamePage.vue'

import './style.css'
import 'primevue/resources/primevue.min.css'
import 'primevue/resources/themes/aura-dark-green/theme.css'
import TestFileVue from './components/TestFile.vue'
import MainMenuVue from './components/MainMenu.vue'
//import 'primevue/resources/themes/aura-light-blue/theme.css'

const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: GamePageVue },
    { path: '/menu', component: MainMenuVue },
    { path: '/game', component: GamePageVue },
    { path: '/test', component: TestFileVue }
  ]
})

const app = createApp(App)

app.use(PrimeVue)
app.use(router)

app.mount('#app')
