import { creatElement, creatTextElement } from "./vdom/index"

export function renderMixin(Vue) {
  Vue.prototype._c = function (tag, data, ...children) {
    return creatElement(this, ...arguments)
  }
  Vue.prototype._v = function (text) {
    return creatTextElement(this, text)
  }
  Vue.prototype._s = function (val) {
    return JSON.stringify(val)
  }
  Vue.prototype._render = function () {
    const vm = this
    let render = vm.$options.render
    let vnode = render.call(vm)
    console.log(vnode)
    return vnode
  }
}