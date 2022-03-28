import { compileToFunction } from "./compiler/index"
import { callHook, mountComponent } from "./lifecycle"
import { initState } from "./state"
import { mergeOptions } from "./utils"

// 在vue的基础上做一次混合操作，为vue原型添加方法
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = mergeOptions(vm.constructor.options, options) //方便对options进行扩展
    // 对数据进行初始化 data watch computed
    callHook(vm, 'beforeCreate')
    initState(vm)
    callHook(vm, 'created')
    if (vm.$options.el) {
      vm.$mounted(vm.$options.el)
    }
  }

  Vue.prototype.$mounted = function (el) {
    const vm = this
    const options = vm.$options
    el = document.querySelector(el)
    vm.$el = el
    // 优先级：render > template > el
    if (!options.render) {
      let template = options.template
      // 如果用户没有传template则取el的内容作为模板
      if (!template && el) {
        template = el.outerHTML
        let render = compileToFunction(template)
        // 将render函数添加到options上
        options.render = render
        // 组件挂载流程
        mountComponent(vm, el)
      }
    }
  }
}
