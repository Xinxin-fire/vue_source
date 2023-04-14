function transform() {
  let args = arguments;
  let arr = [...arguments]
  arr = Array.from(arguments)
  arr = Array.prototype.slice.call(arguments)
  arr = [].slice.call(arguments)
  // [].slice.call(arguments) 写法等价于 [].__propto__.slice.call(arguments)
}
transform(1,2,3)