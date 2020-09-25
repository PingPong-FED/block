import Vue from 'vue'
import Store from './core/store'

export { BlockGetters } from './decorator/vuex'

declare module 'vue/types/vue' {
  interface Vue {
    $block: Store
  }
}
