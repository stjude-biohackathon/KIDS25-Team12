import App from './App.vue'
import {createApp} from 'vue'
import {registerPlugins} from '@/plugins'
import router from './router.ts'

import '../node_modules/roboto-fontface/css/roboto/roboto-fontface.css'

const app = createApp(App)

app.use(router)

registerPlugins(app)

app.mount('#app')