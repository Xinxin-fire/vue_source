import { observe } from "./observer/index"
import { isFunction } from "./utils"

export function initState(vm) { // 状态初始化
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
}
function proxy(vm, source, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[source][key]
    },
    set(newV) {
      vm[source][key] = newV
    }
  })
}
function initData(vm) {
  let data = vm.$options.data
  // 将劫持的数据放在实例的_data上
  data = vm._data = isFunction(data) ? data.call(vm) : data;
  // 对数据做一层代理
  for (let key in data) {
    proxy(vm, '_data', key)
  }
  observe(data)
}