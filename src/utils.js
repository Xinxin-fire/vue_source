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