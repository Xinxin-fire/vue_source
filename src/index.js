import { initMixin } from "./init"

function Vue(options) {
  // 初始化Vue实例的配置
  this._init(options)
}
// 扩展原型
initMixin(Vue)
export default Vue