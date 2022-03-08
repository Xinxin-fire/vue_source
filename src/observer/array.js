let oldArrayPrototype = Array.prototype
export let arrayMethods = Object.create(oldArrayPrototype)
let methods = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'reverse',
  'sort'
]
methods.forEach(method => {
  // 重写数组上的方法
  arrayMethods[method] = function(...args) {
    oldArrayPrototype[method].call(this, ...args)
    let insert
    let ob = this.__ob__
    switch(method) {
      case 'unshift':
        insert = args
        break
      case 'push':
        insert = args
        break
      case 'splice':
        insert = args.slice(2)
    }
    if (insert) {
      ob.observeArray(insert)
    }
  }
})