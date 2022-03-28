import { isObject, isReservedTag } from "../utils"

export function creatElement(vm, tag, data = {}, ...children) {
  if (isReservedTag(tag)) {
    return vnode(vm, tag, data, data.key, children, undefined)
  } else {
    const Ctor = vm.$options.components[tag]
    return createComponent(vm, tag, data, data.key, children, undefined, Ctor)
  }
}

// 创建组建的虚拟节点 区分组件的虚拟节点data.hook, componentOptions
function createComponent(vm, tag, data, key, children, undefined, Ctor) {
  if (isObject(Ctor)) {
    Ctor = vm.$options._base.extend(Ctor)
  }
  data.hook = { //组件渲染时会调用此初始化方法
    init(vnode) {
      // new SUb会将子类的options和Vue的options进行合并
      let vm = vnode.componentInstance = new Ctor({_isComponent: true})
      vm.$mount()
    }
  }
  return vnode(vm, `vue-component-${tag}`, data, key, undefined, undefined, {Ctor, children})
}
export function creatTextElement(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text)
}
function vnode(vm, tag, data, key, children, text, componentOptions) {
  return {
    vm,
    tag,
    data,
    key,
    children,
    text,
    componentOptions
  }
}
