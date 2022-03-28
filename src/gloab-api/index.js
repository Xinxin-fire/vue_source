import { mergeOptions } from "../utils"

export function initGloabApi(Vue) {
  // 用来存放全局配置，Vue.component Vue.filter Vue.directive 
  // Vue实例中的每个子组件的options都会和全局的options进行合并
  Vue.options = {}
  Vue.mixin = function (options) {
    this.options = mergeOptions(this.options, options)
    return this
  }
}