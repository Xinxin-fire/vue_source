import { generate } from "./generate"
import { parseHTML } from "./parse"


export function compileToFunction(template) {
  let root = parseHTML(template)
  let code = generate(root)
  console.log(code)
  // html => ast => render函数 =》 虚拟dom =》 真实dom
}
