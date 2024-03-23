import './assets/main.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-blue/theme.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
App.use(PrimeVue)
