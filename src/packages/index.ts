import { App } from 'vue'
import Magnify from '../packages/magnify/index'

export default {
  install(Vue: App, options: object) {
    console.log(options)
    Vue.component(Magnify.name, Magnify)
  }
}
