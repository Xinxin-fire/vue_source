import { generate } from "./generate"
import { parseHTML } from "./parse"

// html => ast => render函数 =》 虚拟dom =》 真实dom
export function compileToFunction(template) {
  let root = parseHTML(template)
  let code = generate(root)
  let render = new Function(`with(this){return ${code}}`)
  return render
}
