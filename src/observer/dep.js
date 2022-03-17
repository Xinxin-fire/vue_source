let id = 0
// 每个属性都分配一个dep,dep可以存放watcher,watcher也要存放这个dep
class Dep {
  constructor() {
    this.id = id++
  }
}