let id = 0
// 每个属性都分配一个dep,dep可以存放watcher,watcher也要存放这个dep
class Dep {
  constructor() {
    this.id = id++
    // 用来存放wathcer
    this.subs = []
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach(watcher => watcher.update())
  }
}
Dep.target = null;
export function pushTarget(watcher) {
  Dep.target = watcher
}
export function popTarget() {
  Dep.target = null
}
export default Dep