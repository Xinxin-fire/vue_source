//  A instanceof B 用于判断 B的原型 是否在A的原型链上
function myInstanceof(A, B) {
  if ((typeof A !== 'object' && typeof A !== 'function') || typeof B === null ) {
    return false
  }
  let prototype = B.prototype
  let proto = Object.getPrototypeOf(A);
  while(proto) {
    if (proto === prototype) {
      return true;
    } else {
      proto = Object.getPrototypeOf(proto)
    }
  }
  return false;
}