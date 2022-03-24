import { popTarget, pushTarget } from "./dep"
import { queueWathcer } from "./scheduler"

let id = 1
class Watcher {
  constructor(vm, exprOrFn, cb, options ) {
    this.vm = vm
    this.user = !!options.user // 用来标识这是一个用户watcher
    this.lazy = !!options.lazy
    this.dirty = !!options.lazy // 计算属性dirty为true，lazy也为true
    this.exprOrFn = exprOrFn
    this.cb = cb
    id++
    // 用来存放dep
    this.deps = []
    this.depsId = new Set()
    this.options = options
    if (typeof exprOrFn === 'string') {
      this.getter = function() {
        return exprOrFn.split('.').reduce((pre, cur) => {
          return  pre[cur]
        }, vm)
      }
    } else {
      this.getter = exprOrFn
    }
    //  默认执行get方法，调用render函数 
    this.value = this.lazy ? undefined : this.get()
  }
  get() { // 用户更新时，调用get方法即可
    // 由于已经对数据进行了劫持，可以在Object.defineProperty()中的get方法中与watcher进行关联
    // 一个watcher可以监听多个属性，一个属性也可以对应多个watcher  
    // 渲染视图时将watch传给dep.target
    pushTarget(this)
    const value = this.getter.call(this.vm)
    // 视图渲染完成将dep.target置空
    popTarget()
    return value
  }
  update() {
    if (this.lazy) {
      // 计算属性watcher变化，将dirty置为true
      this.dirty = true
    } else {
      queueWathcer(this) 
    }
  }
  run() {
    let newValue = this.get()
    let oldValue = this.value
    this.value = newValue //将最新值赋值给当前的值，作为下一次的oldValue
    if (this.user) {
      this.cb.call(this.vm, newValue, oldValue )
    }
  }
  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }
  evaluate() {
    this.dirty = false
    this.value = this.get()
  }
  depend() {
    let i = this.deps.length
    while(i--) {
      this.deps[i].depend()
    }
  }
}

export default Watcher