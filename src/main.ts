import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vueMagnify from './packages/index'

createApp(App)
  .use(router)
  .use(vueMagnify)
  .mount('#app')
