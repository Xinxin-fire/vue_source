import Dep from "./observer/dep"
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
  // 初始化computed
  if (opts.computed) {
    initComputed(vm, opts.computed)
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
  for (let key in watch) {
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

function initComputed(vm, computed) {
  const watches = vm._computedWatchers = {}
  for(let key in computed) {
    const userDef = computed[key]
    let getter = typeof userDef === 'function' ? userDef : userDef.get
    // 每个计算属性的本质就是watcher
    watches[key] = new Watcher(vm, getter, () => {}, { lazy: true})

    // 将key定义在vm上便于对属性进行劫持
    defineComputed(vm, key, userDef)
  }
}
function creatComputedGetter(key) {
  return function computedGetter() {
    // 拿到计算属性对应的watcher
    let watcher = this._computedWatchers[key]
    if (watcher.dirty) {
      watcher.evaluate()
    }
    if (Dep.target) {
      watcher.depend() // watcher 对应了多个dep
    }
    return watcher.value
  }
}
function defineComputed(vm, key, userDef) {
  let sharedProperty = {}
  if (typeof userDef === 'function') {
    sharedProperty.get = userDef
  } else {
    sharedProperty.get = creatComputedGetter(key)
    sharedProperty.set = userDef.set
  }
  Object.defineProperty(vm, key, sharedProperty)
}