import { App } from 'vue'
import Magnify from '../packages/magnify/index.vue'

export default {
  install(Vue: App, options: object) {
    Vue.component(Magnify.name, Magnify)
  }
}
