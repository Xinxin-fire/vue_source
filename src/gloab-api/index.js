import { mergeOptions } from "../utils"

export function initGloabApi(Vue) {
  // 用来存放全局配置，Vue.component Vue.filter Vue.directive 
  // Vue实例中的每个子组件的options都会和全局的options进行合并
  Vue.options = {}
  Vue.mixin = function(options) {
    this.options = mergeOptions(this.options, options)
    return this
  }
  Vue.options._base = Vue // 无论创建多少个子类都可以通过_base找到Vue
  Vue.options.components = {}
  Vue.component = function(id, definition) {
    // 保证组件的隔离， 每个组件都会产生一个新的类去继承父类
    definition = this.options._base.extend(definition)
    this.options.components[id] = definition
  }

  // 创建一个继承Vue的类，并有父类的所有功能
  Vue.extend = function(options) {
    const Super = this
    const Sub = function VueComponent() {
      this._init()
    }
    // 原型继承
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub
    Sub.options = mergeOptions(Super.options, options)
    return Sub
  }
}