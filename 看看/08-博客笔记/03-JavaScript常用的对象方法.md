### 03-JavaScript常用的对象方法

JavaScript中为我们提供了很多方法，但是与数组和字符串不同的是，他们大部分都是对象上的静态方法，因此只能通过Object构造器来调用，不能通过对象实例调用，接下来就让我们一起学习一下吧！

#### 一、对象上的静态方法

**1.Object.defineProperty()**：此方法可以直接在一个对象上定义一个新属性，或修改一个对象的现有属性，在定义对象属性的同时，可以修改对象的属性描述符，来确定此方法是否可修改、可枚举等。返回值：**返回此对象**。

**参数**：1.要操作的对象

​            2.要定义或修改的对象的属性

​            3.要定义或修改对象的属性描述符

​                 1）configurable：仅当此键值为true，该属性的描述符才可被改变，同时该属性也能从对应的对象上被删除，默认为false

​                  2）enumerable：当此键值为true时，该属性才可枚举，默认false

​                  3）value：该属性对应的值，默认为undefined

​                  4）writable：当此键值为true时，该属性才可被赋值

​                  5）get：属性的getter函数，当访问该属性时，会调用此函数，该函数的返回值会被用作属性的值，默认为undefined

​                  6）set：属性的 setter 函数，该方法接受一个参数（也就是被赋予的新值），默认为undefined

```javascript
var obj = {}
var newValue = 1;
Object.defineProperty(obj, "a", {
  get() { return bValue; },
  set(newValue) { bValue = newValue; },
  enumerable : true,
  configurable : true,
});
console.log(obj.a);//1
obj.a = 2;
console.log(bValue);//2
//注意：get，set这种存取描述符与value和writable不能同时存在，否则会报错
```

```javascript
//使用点运算符和使用Object.defineProperty()方法的区别
var obj = {};
obj.a = 1;
// 等同于：
Object.defineProperty(obj, "a", {
  value: 1,
  writable: true,
  configurable: true,
  enumerable: true
});


// 另一方面，
Object.defineProperty(obj, "a", { value : 1 });
// 等同于：
Object.defineProperty(obj, "a", {
  value: 1,
  writable: false,
  configurable: false,
  enumerable: false
});
```

**2.Object.defineProperties()**：此方法和Object.defineProperty()方法功能类似，不同的是此方法可以定义或修改多个对象的属性，返回值：**返回该对象**

```javascript
var obj = {};
Object.defineProperties(obj, {
  'a': {
    value: 1,
    writable: true
  },
  'b': {
    value: 2,
    writable: false
  }
});
console.log(obj.a) //1
console.log(obj.b) //2
```

**3.Object.assign()**：对一个对象进行浅拷贝,返回值：返回拷贝后的对象

**参数**：1.target：目标对象

​           2.sources：源对象

```javascript
let  o = {}
let obj1 = { a: 1 };
letlet obj2 = {b : 2}
let copy = Object.assign(o, obj1, obj2);
console.log(copy); // { a: 1, b: 2 }
console.log(o); // { a: 1, b: 2 }
//注意只有可枚举的对象才可被拷贝。
```

**4.Object.create()**：创建一个新对象，并指定该对象的原型。返回值：**以指定对象为原型的新对象**

**参数**：1.新创建对象的原型对象

​            2.传入一个对象，定义对象的属性，及属性描述符

```javascript
let obj = {a:1}
let o = Object.create(obj)
console.log(o.__proto__ == obj) //true
```

**5.Object.getOwnPropertypeOf()**：返回**一个由指定对象的所有自身属性的属性名组成的数组**（包括不可枚举属性，但不包括Symbol值作为名称的属性）

参数：指定的对象

```javascript
var obj = { 0: "a", 1: "b", 2: "c"};
console.log(Object.getOwnPropertyNames(obj)) //["0", "1", "2"]
```

**6.Object.getOwnPropertySymbols()**：返回返回一个由一个给定对象的自身可枚举属性组成的数组。

参数：指定的对象

```javascript
var obj = {};
var a = Symbol("a");
obj[a] = 1;
console.log(Object.getOwnPropertySymbols(obj);) //[Symbol(a)]
```

**7.Object.keys()**：返回**一个由一个给定对象的自身可枚举属性组成的数组**

**8.Object.values()**：返回**一个给定对象自身的所有可枚举属性值的数组**

**9.Object.entries()**：返回**一个给定对象自身可枚举属性的键值对数组（二维数组）**

#### 二、对象原型上的方法

**1.hasOwnProperty()**：用来判断对象上是包含指定属性，**不包括原型上的属性**，返回**一个布尔值**

**参数**：要检测的属性，string类型或Symbol类型

```javascript
let obj = { a: 1 };
console.log(obj.hasOwnProperty('a')) //true
console.log(obj.hasOwnProperty('b')) //false
```

**2.isPrototypeOf()**：用于测试一个对象是否存在于另一个对象的原型链上，返回**一个布尔值**

**参数**：指定的对象，在该对象的原型链进行搜索

```javascript
let obj  ={ a: 1 };
let o = Object.create(obj);
console.log(obj.isPrototypeOf(o)) // true
```



好了，以上就是本期内容啦，如果对你有帮助的话，帮忙点个赞，感谢！！！