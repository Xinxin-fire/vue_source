let id = 1
class Watcher {
  // new Watcher(vm, updateComponent, () => {
  //   console.log('更新视图了')
  // }, true)
  constructor(vm, exprOrFn, cb, options ) {
    this.vm = vm
    this.exprOrFn = exprOrFn
    this.cb = cb
    id++
    this.options = options
    this.getter = exprOrFn
    //  默认执行get方法，调用render函数 
    this.get()
  }
  get() { // 用户更新时，调用get方法即可
    // 由于已经对数据进行了劫持，可以在Object.defineProperty()中的get方法中与watcher进行关联
    // 一个watcher可以监听多个属性，一个属性也可以对应多个watcher 
    this.getter()
  }
}

export default Watcher