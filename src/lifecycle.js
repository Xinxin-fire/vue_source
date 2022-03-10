export function lifecycleMixin(Vue) {
  Vue.prototype._update = function () {
  }
}

export function mountComponent(vm, el) {
  // 更新函数，数据变化后会再次调用此函数
  let updateComponent = () => {
    // 调用render函数，生成虚拟dom
    // 用虚拟dom生成真实dom
    vm._update(vm._render())
  }
  updateComponent()
}