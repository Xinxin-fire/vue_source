let obj = {
  name: 'yuta',
  age: 17
}
let proxy = new Proxy(obj, {
  get: (target, property, receiver) => {
    // target 目标对象 property属性 receiver代理对象
    return Reflect.get(target, property, receiver);
  },
  set: (target, property, value, receiver) => {
    console.log(target, property, value, receiver);
    // target 目标对象 property 属性 value 赋值后的值 receiver 代理对象
    return Reflect.set(target, property, value);
  },
});
proxy.name = 'yule'




