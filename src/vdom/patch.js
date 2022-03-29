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
  } else {
    let el = vnode.el = oldVnode.el // 此时新节点上还没有el属性,由于新节点和老节点的el属性一样,所有直接复用老节点的
    // 如果标签名不一样,则用新的直接替换老的
    if (oldVnode.tag !== vnode.tag) {
      return oldVnode.el.parentNode.replaceChild(creatElm(vnode), oldVnode.el)
    }
    // 两个虚拟节点是文本节点,比较文本内容
    if (vnode.tag === undefined) {
      if (oldVnode.text !== vnode.text) {
        el.textContent = vnode.text
      }
      return
    }
    // 标签名一样只需要替换对应属性即可
    patchProps(vnode, oldVnode.data)
    let oldChildren = oldVnode.children || []
    let newChildren = vnode.children || []
    // 双方都有子元素
    if (oldChildren.length > 0 && newChildren.length > 0) {
      // 采用双指针的方法进行比较
      patchChildren(el, oldChildren, newChildren)
    } else if (newChildren.length > 0) { //新节点有子元素
      for (let i = 0; i < newChildren.length; i++) {
        let child = creatElm(newChildren[i])
        el.appendChild(child)
      }
    } else if (oldChildren.length > 0) { //老节点有子元素
      el.innerHTML = ''
    }
    return el
  }
}
function isSameVnode(oldVnode, newVnode) {
  return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key)
}
function patchChildren(el, oldChildren, newChildren) {
  let oldStartIndex = 0
  let oldStartVnode = oldChildren[oldStartIndex]
  let oldEndIndex = oldChildren.length - 1
  let oldEndVnode = oldChildren[oldEndIndex]

  let newStartIndex = 0
  let newStartVnode = newChildren[newStartIndex]
  let newEndIndex = newChildren.length - 1
  let newEndVnode = newChildren[newEndIndex]
  // 生成映射表
  const makeIndexByKey = (children) => {
    return children.reduce((memo, current,index) => {
      if (current.key) {
        memo[current.key] = index
      }
      return memo
    }, {})
  }
  const keysMap = makeIndexByKey(oldChildren)
  // 同时循环新节点和老节点,有一方循环完毕就结束了
  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    // 优化操作 头头比较 尾尾比较 头尾比较 尾头比较
    if (!oldStartVnode) { // 老节点已经被移动走了
      oldStartVnode = oldChildren[++oldStartIndex]
    } else if (!oldEndVnode) {
      oldEndVnode = oldChildren[--oldEndIndex]
    }
    if (isSameVnode(oldStartVnode, newStartVnode)) {
      // 递归比较子元素,指针向前移动一位
      patch(oldStartVnode, newStartVnode)
      oldStartVnode = oldChildren[++oldStartIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else if (isSameVnode(oldEndVnode, newEndVnode)) { // 从尾部开始比较
      patch(oldEndVnode, newEndVnode)
      oldEndVnode = oldChildren[--oldEndIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if (isSameVnode(oldStartVnode, newEndVnode)) { // 头尾比较 => reverse
      patch(oldStartVnode, newEndVnode)
      el.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling) //将老节点的头部元素移动到末尾
      oldStartVnode = oldChildren[++oldStartIndex]
      newEndVnode = newChildren[--newEndIndex]
    } else if (isSameVnode(oldEndVnode, newStartVnode)) { // 尾头比较 => reverse
      patch(oldEndVnode, newStartVnode)
      el.insertBefore(oldEndVnode.el, oldStartVnode.el) //将老节点的尾部元素移动到头部
      oldEndVnode = oldChildren[--oldEndIndex]
      newStartVnode = newChildren[++newStartIndex]
    } else {
      // 乱序对比 核心diff
      // 需要根据key和对应的索引将老的内容生成映射表
      let moveIndex = keysMap[newStartVnode.key] //用新的去老的中查找对应的索引
      if (moveIndex === undefined) { //如果不能复用直接创建新的插入到老的节点
        el.insertBefore(creatElm(newStartVnode), oldStartVnode.el)
      } else {
        let moveNode = oldChildren[moveIndex]
        oldChildren[moveIndex] = null // 此节点被移走,将其置为null
        el.insertBefore(moveNode.el, oldStartVnode.el) //在老节点开始的位置之前插入匹配的元素
        patch(moveNode, newStartVnode)
      }
      newStartVnode = newChildren[++newStartIndex]
    }
  }
  // 新节点的元素比老节点多,需要插入
  if(newStartIndex <= newEndIndex) {
    for (let i = newStartIndex; i < newChildren.length; i++) {
      // el.appendChild(creatElm(newChildren[i]))
      let anchor = newChildren[newEndIndex + 1] == null ? null : newChildren[newEndIndex + 1].el
      el.insertBefore(creatElm(newChildren[i]), anchor)
    }
  }
  // 新节点的元素比老节点少,需要删除
  if(oldStartIndex <= oldEndIndex) {
    for (let i = oldStartIndex; i <= oldEndIndex; i++) {
      if (oldChildren[i] !== null) {
        el.removeChild(oldChildren[i].el)
      }
    }
  }
}
function patchProps(vnode, oldProps) {
  let newProps = vnode.data || {}
  let el = vnode.el
  for(let key in oldProps) {
    if (!newProps[key]) {
      el.removeAttribute(key)
    }
  }
  for (let key in newProps) {
    if (key === 'style') {
      for (let styleName in newProps.style) {
        el.style[styleName] = newProps.style[styleName]
      }
    } else {
      el.setAttribute(key, newProps[key])
    }
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

export function creatElm(vnode) {
  let { tag, data, children, text, vm } = vnode
  if (typeof tag === 'string') {
    // 返回组件的真实节点
    if (createComponent(vnode)) {
      return vnode.componentInstance.$el
    }
    // 将创建的元素添加到vnode的el属性上
    vnode.el = document.createElement(tag)
    patchProps(vnode)
    children.forEach(child => {
      vnode.el.appendChild(creatElm(child))
    });
  } else {
    vnode.el = document.createTextNode(text)
  }
  return vnode.el 
}