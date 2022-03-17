export function patch(oldVnode, vnode) {
  if (oldVnode.nodeType === 1) {
    const parentElm = oldVnode.parentNode
    let elm = creatElm(vnode)
    parentElm.insertBefore(elm, oldVnode.nextSibling)
    parentElm.removeChild(oldVnode)
    // 返回新创建的节点用于作为下次更新的老节点
    return elm
  }
}

function creatElm(vnode) {
  let { tag, data, children, text, vm } = vnode
  if (typeof tag === 'string') {
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