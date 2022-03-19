import { popTarget, pushTarget } from "./dep"

let id = 1
class Watcher {
  constructor(vm, exprOrFn, cb, options ) {
    this.vm = vm
    this.exprOrFn = exprOrFn
    this.cb = cb
    id++
    // 用来存放dep
    this.deps = []
    this.depsId = new Set()
    this.options = options
    this.getter = exprOrFn
    //  默认执行get方法，调用render函数 
    this.get()
  }
  get() { // 用户更新时，调用get方法即可
    // 由于已经对数据进行了劫持，可以在Object.defineProperty()中的get方法中与watcher进行关联
    // 一个watcher可以监听多个属性，一个属性也可以对应多个watcher  
    // 渲染视图时将watch传给dep.target
    pushTarget(this)
    this.getter()
    // 视图渲染完成将dep.target置空
    popTarget()
  }
  update() {
    this.get()
  }
  addDep(dep) {
    let id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }
}

export default Watcher