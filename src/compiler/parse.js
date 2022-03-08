const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*` // 标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})` // 获取标签名
const startTagOpen = new RegExp(`^<${qnameCapture}`) //开始标签
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`) //结束标签
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/ // 标签属性
const startTagClose = /^\s*(\/?)>/ // 标签闭合

// 通过栈将解析的结果组装成一个树结构
function createAstElement(tagName, attrs) {
  return {
    tag: tagName,
    type: 1,
    children: [],
    parent: null,
    attrs
  }
}
let root = null, stack = []
// 开始标签
function start(tagName, attributes) {
  let element = createAstElement(tagName, attributes)
  if (stack.length > 0) {
    let parent = stack[stack.length - 1]
    element.parent = parent
    parent.children.push(element)
  }
  if (!root) {
    root = element
  }
  stack.push(element)
}
// 结束标签
function end(tagName) {
  let last = stack.pop()
  if (last.tag !== tagName) {
    throw new Error('标签有误！')
  }
}
// 文本内容
function chars(text) {
  text = text.replace('/\s/g', '')
  let parent = stack[stack.length - 1]
  if (text) {
    parent.children.push({
      type: 3,
      text
    })
  }
}
// 将html解析成对应的脚本来触发tokens
export function parseHTML(html) {
  function advance(len) {
    html = html.substring(len)
  }
  function parseStartTag() {
    const start = html.match(startTagOpen)
    if (start) {
      const match = {
        tagName: start[1],
        attrs: []
      }
      advance(start[0].length)
      let end, attr
      // 如果没有遇到闭合标签则不停的解析
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        // 将匹配到属性标签删除
        match.attrs.push({
          name: attr[1],
          value: attr[3] || attr[4] || attr[5],
        })
        advance(attr[0].length)
      }
      if (end) {
        advance(end[0].length)
      }
      // 返回匹配到的属性和标签名
      return match
    }
    return false
  }
  while (html) {
    let textEnd = html.indexOf('<')
    if (textEnd === 0) {
      // 解析开始标签
      const startTagMatch = parseStartTag(html)
      if (startTagMatch) {
        start(startTagMatch.tagName, startTagMatch.attrs)
        continue
      }
      // 解析结束标签
      const endTagMatch = html.match(endTag)
      if (endTagMatch) {
        end(endTagMatch[1])
        advance(endTagMatch[0].length)
        continue
      }
    }
    let text
    if (textEnd > 0) {
      text = html.substring(0, textEnd)
    }
    if (text) {
      chars(text)
      advance(text.length)
    }
  }
  return root
}