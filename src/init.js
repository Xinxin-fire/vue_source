import { initState } from "./state"

// 在vue的基础上做一次混合操作，为vue原型添加方法
export function initMixin(Vue) {
  Vue.prototype._init = function (options) {
    const vm = this
    vm.$options = options //方便对options进行扩展

    // 对数据进行初始化 data watch computed
    initState(vm)
  }
}