// 实现new操作符步骤
// 1.判断入参是否为函数
// 2.继承构造函数的原型对象
// 3.让函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）
// 4.如果构造函数返回非空对象，则返回该对象；否则，返回刚创建的新对象
function myNew(fn) {
  if (typeof res !== 'function') {
    throw TypeError('type error')
  }
  let obj = Object.create(fn.prototype);
  let args = [...arguments].slice(1);
  let res = fn.call(obj, ...args);
  if ((typeof res === 'obj' && res !== null) || typeof res === 'function') {
    return res;
  } else {
    return obj;
  }
}