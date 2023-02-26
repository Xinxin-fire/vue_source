// call
function myCall(context) {
  if (typeof this !== 'function') {
    throw Error('type error')
  }
  let args = [...arguments].slice(1);
  context = context || window;
  context.fn = this;
  let res = context.fn(...args);
  delete context.fn;
  return res;
}
// apply
function myApply(context) {
  if (typeof this !== 'function') {
    throw Error('type error')
  }
  let args = [...arguments].slice(1, 2);
  context = context || window;
  context.fn = this;
  let res = arguments[1] ? context.fn(...arguments[1]) : context.fn();
  delete context.fn;
  return res;
}
// bind
Function.prototype.myBind =  function (context) {
  if (typeof this !== 'function') {
    throw Error('type error')
  }
  let args = [...arguments].slice(1);
  let fn = this;
  console.log('this:', this)
  return function Fn() {
    console.log('fn', fn)
    return fn.apply(this instanceof Fn ? this: context, args.concat(...arguments));
  }
}
function fn(a) {
  console.log(a);
}
let b = {};
let d = {};
let c = fn.myBind(b, 1);
let e = c.myBind(d, 1)
e()