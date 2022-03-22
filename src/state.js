import { observe } from "./observer/index"
import Watcher from "./observer/watch"
import { isFunction } from "./utils"

export function stateMixin(Vue) {
  Vue.prototype.$watch = function(key, handler, options={}) {
    // 一个标识，标记为用户watcher而非渲染watcher
    options.user = true
    new Watcher(this, key, handler, options)
  }
}
export function initState(vm) { // 状态初始化
  const opts = vm.$options
  // 初始化data
  if (opts.data) {
    initData(vm)
  }
  // 初始化watch
  if (opts.watch) {
    initWatch(vm, opts.watch)
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

function initWatch(vm, watch) {
  for(let key in watch) {
    let handler = watch[key];
    if (Array.isArray(handler)) {
      handler.forEach(func => {
        creatWatcher(vm, key, func)
      })
    } else {
      creatWatcher(vm, key, handler)
    }
  }
}
function creatWatcher(vm, key, handler) {
  return vm.$watch(key, handler)
}