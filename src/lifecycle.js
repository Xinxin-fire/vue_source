import Watcher from "./observer/watch"
import { nextTick } from "./utils"
import { patch } from "./vdom/patch"

 export function lifecycleMixin(Vue) {
  //  开始时触发，需要更新时也需要触发
  Vue.prototype._update = function (vnode) {
    const vm = this
    const preVnode = vm._vnode
    if (!preVnode) { //初次渲染
      vm.$el = patch(vm.$el, vnode)
    } else {
      vm.$el = patch(preVnode, vnode)
    }
    vm._vnode = vnode
  }
  Vue.prototype.$nextTick = nextTick
}
// 后续每个组件渲染的时候都会有一个watcher
export function mountComponent(vm, el) {
  // 更新函数，数据变化后会再次调用此函数
  let updateComponent = () => {
    // 调用render函数，生成虚拟dom
    // 用虚拟dom生成真实dom
    vm._update(vm._render())
  }
  // 观察者模式：属性是被观察者，刷新页面：观察者
  // 此处是渲染的watcher
  callHook(vm, 'beforeMount')
  new Watcher(vm, updateComponent, () => {
    console.log('更新视图了')
  }, true)
  callHook(vm, 'mounted')
  // updateComponent()
}
export function callHook(vm, hook) {
  let handlers = vm.$options[hook]
  if (handlers) {
    handlers.forEach(handler => {
      handler.call(vm)
    })
  }
}