import './assets/main.css'
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/aura-light-blue/theme.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()

createApp(App).use(pinia).use(PrimeVue).mount('#app')
