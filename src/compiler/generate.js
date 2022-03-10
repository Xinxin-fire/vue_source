function genProps(attrs) {
  return attrs.reduce((pre, cur, index) => {
    if (cur.name === 'style') {
      let styleObj = {};
      cur.value.replace(/([^;:]+)\:([^;:]+)/g, function() {
        styleObj[arguments[1]] = arguments[2]
      })
      cur.value = styleObj
    }
    if (index === attrs.length - 1) {
      pre += `${cur.name}:${JSON.stringify(cur.value)}}`
    } else {
      pre += `${cur.name}:${JSON.stringify(cur.value)},`
    }
    return pre
  }, '{')
}
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g // 匹配{{}}
function gen(el) {
  if (el.type === 1) {
    return generate(el)
  } else {
    let text = el.text
    if (!defaultTagRE.test(text)) {
      return `_v('${text}')`
    } else {
      let tokens = [], match, lastIndex = defaultTagRE.lastIndex =  0
      while (match = defaultTagRE.exec(text)) {
        let index = match.index
        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)))
        }
        tokens.push(`_s(${match[1].trim()})`)
        lastIndex = index + match[0].length
      }
      if (lastIndex < text.length) {
        tokens.push(JSON.stringify(text.slice(lastIndex)))
      }
      return `_v(${tokens.join('+')})`
    }
  }
}
function genChildren(el) {
  let children = el.children
  if (children) {
    return children.map(item => gen(item)).join(',')
  }
  return false
}
export function generate(el) {
  let children = genChildren(el)
  let code = `_c('${el.tag}',${
    el.attrs.length ? genProps(el.attrs) : 'undefined'
  }${
    children ? `,${children}` : ''
  })`
  return code
}