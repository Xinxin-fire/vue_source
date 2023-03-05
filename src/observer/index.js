import { isObject } from "../utils"
import { arrayMethods } from "./array"
import Dep from "./dep"

// 通过类来检测数据，类有类型
class Observer {
  constructor(data) { // 对对象中的所有属性进行劫持
    this.dep = new Dep() //给对象或者数组添加dep属性用于收集watcher更新视图
    // 将Observer实例赋值给data的ob属性，方便对数组劫持的时候调用Observe，同时可以判断如果一个数据有ob属性，说明它已经被劫持过了
    Object.defineProperty(data,'__ob__', {
      value: this,
      enumerable: false
    })
    if (Array.isArray(data)) {
      data.__proto__ = arrayMethods
      // 如果数组的的子元素为对象需要对该子元素进行劫持
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }
  observeArray(data) {
    data.forEach(ele => {
      observe(ele)
    })
  }
  walk(data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key])
    })
  }
}
function dependArray(value) {
  value.forEach(ele => {
    ele.__ob__ && ele.__ob__.dep.depend()
    if(Array.isArray(ele)) {
      dependArray(ele)
    }
  })
}
// 对对象的属性进行遍历，用defineProperty对对象的数据进行劫持
function defineReactive(data, key, value) {
  // 如果对象中的属性的值还是对象则需要递归调用监测方法
  const childOb = observe(value)
  let dep = new Dep()
  Object.defineProperty(data, key, {
    get() {
      // Dep.target的用于判断视图是否需要更新，只有在视图需要更新的时候才需要收集watcher
      if (Dep.target) {
        // 取值时让dep和watcher对应起来
        dep.depend()
        if (childOb) {
          // 如果当前属性的值是一个对象，将对象的dep也要收集watcher
          childOb.dep.depend()
          // 对数组进行递归收集
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      return value
    },
    set(newV) {
      if (value !== newV) {
        observe(newV) // 如果给对象的属性复制的是一个新对象，则需要对新对象重新劫持
        value = newV
        // 调用更新方法
        dep.notify()
      }
    }
  })
}
export function observe(data) {
  if (!isObject(data) && !Array.isArray(data)) {
    return
  }
  if (data.__ob__) {
    return data.__ob__
  }
  return new Observer(data)
}