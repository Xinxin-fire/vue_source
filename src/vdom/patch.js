export function patch(oldVnode, vnode) {
  if (!oldVnode) {
    // 如果没有el元素直接根据虚拟节点返回真实节点
    return creatElm(vnode)
  }
  if (oldVnode.nodeType === 1) {
    const parentElm = oldVnode.parentNode
    let elm = creatElm(vnode)
    parentElm.insertBefore(elm, oldVnode.nextSibling)
    parentElm.removeChild(oldVnode)
    // 返回新创建的节点用于作为下次更新的老节点
    return elm
  }
}
function createComponent(vnode) {
  let i = vnode.data
  if((i = i.hook) && (i = i.init)) {
    i(vnode)
  }
  if (vnode.componentInstance) {
    return true
  }
}

function creatElm(vnode) {
  let { tag, data, children, text, vm } = vnode
  if (typeof tag === 'string') {
    // 返回组件的真实节点
    if (createComponent(vnode)) {
      return vnode.componentInstance.$el
    }
    // 将创建的元素添加到vnode的el属性上
    vnode.el = document.createElement(tag)
    children.forEach(child => {
      vnode.el.appendChild(creatElm(child))
    });
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el 
}