import { createApp } from 'vue'
import { ComponentLibrary } from '@ankorstore/design-system'
import '@ankorstore/design-system/dist/design-system.css'
import './styles/design-tokens.css'
import './styles/responsive-utils.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(ComponentLibrary)
app.use(router)
app.mount('#app')
