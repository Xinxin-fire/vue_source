// bind 函数实现
Function.prototype.myBind = function(context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  // 获取参数
  var args = [...arguments].slice(1),
      fn = this;
  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(
      this instanceof Fn ? this : context,
      args.concat(...arguments)
    );
  };
};
let a  = {
  name: 'aa',
  b: function() {
    console.log(this.name);
  }
}
let b = {
  name: 'bb1',
}
let c = {
  name: 'cc',
}
a.b()
a.b.myBind(b).myBind(c)()