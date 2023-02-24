// 考虑多种数据类型： 基础数据类型、Symbols、Object、Array、Map、WeakMap、Set、 WeakSet、Funtion、Date、RegExp、Error
// 考虑循环引用


function deepClone(data, weakMap = new WeakMap()) {
  if (typeof data !== 'object' && data !== null) {
    return data;
  }
  let res = Array.isArray(data) ? [] : {};
  if (weakMap.has(data)) {
    return weakMap.get(data);
  } else {
    weakMap.set(data, res);
  }
  Reflect.ownKeys(data).forEach(ele => {
    if (typeof data[ele] === 'object' && data !== null) {
      res[ele] = deepClone(data[ele]);
    } else {
      res[ele] = data[ele];
    }
  })
  return res;
}
