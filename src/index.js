import { initGloabApi } from "./gloab-api/index.js"
import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle"
import { renderMixin } from "./render"
import { stateMixin } from "./state"

function Vue(options) {
  // 初始化Vue实例的配置
  this._init(options)
}
// 扩展原型
initMixin(Vue)
stateMixin(Vue)
renderMixin(Vue) // _render
lifecycleMixin(Vue) // _update

// 扩展类 Vue.mixin
initGloabApi(Vue)
export default Vue

// import { compileToFunction } from "./compiler/index.js"
// import { creatElm, patch } from "./vdom/patch.js"
// // diff核心
// let oldTemplate = `<div><li key="c">C</li><li key="a">A</li><li key="b">B</li><li key="d">D</li></div>`
// let vm1 = new Vue({data:{message: 'hahaha'}})
// // 将dom转化为函数
// const render1 = compileToFunction(oldTemplate)
// // 创建虚拟dom
// const oldVnode = render1.call(vm1)
// // 创建真实dom
// document.body.appendChild(creatElm(oldVnode))

// let newTemplate = `<div><li key="b">B</li><li key="c">C</li><li key="d">D</li><li key="a">A</li></div>`
// let vm2 = new Vue({data:{message: 'xixixi'}})
// // 将dom转化为函数
// const render2 = compileToFunction(newTemplate)
// // 创建虚拟dom
// const newVnode = render2.call(vm2)
// // 根据新的虚拟节点,更新老的虚拟节点,能复用的尽量复用
// setTimeout(() => {
//   patch(oldVnode, newVnode)
// }, 1000)
// // document.body.appendChild(creatElm(newVnode))

