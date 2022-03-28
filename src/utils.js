export function isFunction(val) {
  return typeof val === 'function'
}

export function isObject(val) {
  return Object.prototype.toString.call(val) === '[object Object]' || val === null
}

const callbacks = []
let waiting = false
function flushCallbacks() {
  callbacks.forEach(cb => cb())
  waiting = false
}
// 视图更新时会调用nextTick（在前）,用户也可以手动调用nextTick（在后），
export function nextTick(cb) {
  callbacks.push(cb)
  if (!waiting) {
    // vue3的写法
    // vue2考虑了兼容性的问题，从Promise =》MutationObserver => setImmediate => setTimeout依次降级
    Promise.resolve().then(flushCallbacks)
    waiting = true
  }
}

let lifecycleHooks = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
]
// 存放策略
let strats = {}
lifecycleHooks.forEach(hook => {
  strats[hook] = mergeHook
})
function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal)
    } else {
      return [childVal]
    }
  } else {
    return parentVal
  }
}
export function mergeOptions(parent, child) {
  // 合并后的结果
  const options = {}
  for (let key in parent) {
    mergeField(key)
  }
  for (let key in child) {
    if (parent.hasOwnProperty(key)) {
      continue
    }
    mergeField(key)
  }
  function mergeField(key) {
    let parentVal = parent[key]
    let childVal = child[key]
    // 策略模式，如果有对应的策略就执行对应的策略否则执行默认的
    if(strats[key]) {
      options[key] = strats[key](parentVal, childVal)
    } else {
      if (isObject(parentVal) && isObject(childVal)) {
        options[key] = {...parentVal, ...childVal}
      } else {
        options[key] = childVal
      }
    }
  }
  return options
}
