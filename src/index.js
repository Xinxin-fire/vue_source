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
export default Vue