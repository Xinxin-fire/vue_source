## 03-JavaScript-数据类型

### 一、数据类型

#### 1.JavaScript有哪些数据类型，它们的区别？

JavaScript共有八种数据类型，分别是 Undefined、Null、Boolean、Number、String、Object、Symbol、BigInt。

- Symbol 代表创建后独一无二且不可变的数据类型，Symbol() 函数每次都会返回新的一个 symbol,它主要是为了解决可能出现的全局变量冲突的问题。

  ```
  Symbol('foo') === Symbol('foo') //false
  Symbol.for(key) //方法会根据给定的键 key，来从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中
  Symbol.for("bar") === Symbol.for("bar") //true
  Symbol.keyFor(sym) 方法用来获取全局symbol 注册表中与某个 symbol 关联的键。
  var globalSym = Symbol.for("foo");
  Symbol.keyFor(globalSym); // "foo"
  ```

- BigInt 是一种数字类型的数据，它可以表示任意精度格式的整数，使用 BigInt 可以安全地存储和操作大整数，即使这个数已经超出了 Number 能够表示的安全整数范围。在一个数字后面加上n即表示大数，10与10n相等但不全等。

这些数据可以分为原始数据类型和引用数据类型：

- 栈：原始数据类型（Undefined、Null、Boolean、Number、String）
- 堆：引用数据类型（对象、数组和函数）

堆和栈的概念存在于数据结构和操作系统内存中，在数据结构中：

- 在数据结构中，栈中数据的存取方式为先进后出。
- 堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。

在操作系统中，内存被分为栈区和堆区：

- 栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。
- 堆区内存一般由开发着分配释放，若开发者不释放，程序结束时可能由垃圾回收机制回收。

#### 2. 数据类型检测的方式有哪些

- typeof用来判断基础数据类型: 值有number、boolean、null、undefined、string、symbol、bigint、object、function

- instanceof，判断在其原型链上能否找到该类型的原型

  适用于判断引用数据类型，不适用于判断基础数据类型，且Object在所有的引用类型的原型上

- `constructor`有两个作用，一是判断数据的类型，二是对象实例通过 `constrcutor` 对象访问它的构造函数。需要注意，如果创建一个对象来改变它的原型，`constructor`就不能用来判断数据类型了

- Object.prototype.toString.call()，可以判断所有的数据类型

  ```
  Object.prototype.toString.call(/a/) //'[object RegExp]'
  ```

#### 3. 判断数组的方式有哪些

1. Object.prototype.toString.call()
2. constructor
3. instanceof
4. Array.isArray()
5. 通过原型链判断 obj.__proto__ === Array.prototype;
6. Array.prototype.isPrototypeOf([]) //true

#### 4. null和undefined区别

undefined 代表的含义是**未定义**，null 代表的含义是**空对象**。一般变量声明了但还没有定义的时候会返回 undefined，null主要用于赋值给一些可能会返回对象的变量，作为初始化。

#### 5. typeof null 的结果是什么，为什么？

计算机在存储变量时，会在变量的机器码的低位1-3位存储其类型信息

- 000：对象
- 010：浮点数
- 100：字符串
- 110：布尔
- 1：整数

对于 `undefined` 和 `null` 来说，这两个值的信息存储是有点特殊的。

- `null`：所有机器码均为0
- `undefined`：用 −2^30 整数来表示

也就是说null的类型标签也是000，和Object的类型标签一样，所以会被判定为Object

#### 6. intanceof 操作符的实现原理及实现

instanceof运算符用于检测构造函数的 `prototype` 属性是否出现在某个实例对象的原型链上。

```
function myInstanceof(left, right) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left)
  // 获取构造函数的 prototype 对象
  let prototype = right.prototype; 
 
  // 判断构造函数的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;
    if (proto === prototype) return true;
    // 如果没有找到，就继续从其原型上找，Object.getPrototypeOf方法用来获取指定对象的原型
    proto = Object.getPrototypeOf(proto);
  }
}
```

#### 7. 为什么0.1+0.2 ! == 0.3，如何让其相等

因为计算机是通过二进制来存储数据的，0.1和0.2换算成二进制为无限循环的二进制小数

JavaScript存储数据类型时遵循IEEE 754标准，将数字存储为双精度浮点数，使用64位固定长度来表示，也就是标准的double双精度浮点数。这种格式以 64 位存储数字，其中数字（分数）存储在位 0 到 51 中，指数存储在位 52 到 62 中，符号存储在位 63 中。

符号位用 0表示负数，1表示正数

指数位，由于IEEE固定**双精度数的偏移量为1023**，所以用指数位+偏移量再转换为2进制即为指数位的大小

小数位，通过科学计数法去掉前面的零之后的数字即为小数位。

**如何实现0.1+0.2=0.3呢？**

对于这个问题，一个直接的解决方法就是设置一个误差范围，通常称为“机器精度”。对JavaScript来说，这个值通常为2-52，在ES6中，提供了`Number.EPSILON`属性，而它的值就是2-52，只要判断`0.1+0.2-0.3`是否小于`Number.EPSILON`，如果小于，就可以判断为0.1+0.2 ===0.3

```
function numberepsilon(arg1,arg2){                   
  return Math.abs(arg1 - arg2) < Number.EPSILON;        
}        
```

#### 8. 如何获取安全的 undefined 值？

因为 undefined 是一个标识符，所以可以被当作变量来使用和赋值，但是这样会影响 undefined 的正常判断。表达式 void ___ 没有返回值，因此返回结果是 undefined。void 并不改变表达式的结果，只是让表达式不返回值。因此可以用 void 0 来获得 undefined。

#### 9. typeof NaN 的结果是什么？

NaN 指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。

```
typeof NaN; // "number"
```

NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN !== NaN 为 true。

#### 10. isNaN 和 Number.isNaN 函数的区别？

- 函数 isNaN 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
- 函数 Number.isNaN 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，不会进行数据类型的转换，这种方法对于 NaN 的判断更为准确。

#### 11. Object.is() 与比较操作符 “===”、“==” 的区别？

- 使用双等号（==）进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
- 使用三等号（===）进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
- 使用 Object.is 来进行相等判断时，一般情况下和三等号的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 是相等的。

#### 12.隐式类型的转换规则

**隐式转换主要分为三种方式**

- 将值转化为原始值 => toPrimitive
- 将值转化为String => ToString
- 将值转化为Number => ToNumber

**通过ToPrimitive将值转换为基础数据类型**

- ToPrimitive通过参数PreferredType，来进行不同的转换
- 如果PreferredType被标记为Number，则会进行如下操作进行转化
  1. 如果输入的值已经是一个原始值，则直接返回该值
  2. 否则如果是一个对象，则调用对象的valueOf()方法，如果valueOf()返回的是一个原始值，则直接返回得到的值
  3. 否则调用这个对象的toString()方法，如果toString()返回的是一个原始值，则直接返回该值
  4. 否则抛出TypeError异常
- 如果PreferredType被标记为String，则会进行如下操作转化
  1. 如果输入的值是一个原始值，则直接返回该值
  2. 否则如果是一个对象，则调用对象的toString()方法，如果toString()方法返回的是一个原始值，则直接返回该值
  3. 否则调用这个对象的valueOf()方法，如果valueOf()返回的是一个原始值，则直接返回该值
  4. 否则抛出TypeError异常
- 当转化的值为Date对象时遵循String的转化，其他遵循Number转化

**valueOf()函数的转化结果**

- 对于基础数据类型会转化为其原始值

  Boolean、Number、String、Symbol、BigInt等；Undefined和Null没有valueOf方法

- 对于引用数据类型，除了Date()会返回毫秒外，其他对象都会返回其本身的引用，即this

**toString()函数的转化结果**

Number、Boolean、String、Array、Date、RegExp、Function这几种构造函数生成的对象，通过toString转换后会变成相应的字符串的形式，因为这些构造函数上封装了自己的toString方法

```
var num = new Number(123)
num.toString() // '123'

var boolean = new Boolean('xxx')
boolean.toString() // 'true'

var string = new String('abc123')
string.toString() // 'abc123'

var array = new Array(1,2,3,4)
array.toString() // '1,2,3,4'

var date = new Date()
date.toString() // "Wed Mar 03 2021 00:15:57 GMT+0800 (中国标准时间)"

var RegExp = new RegExp(/\w/g)
RegExp.toString() // '/\w/g'

var fun = new Function('console.log(1)')
fun.toString() // "function anonymous() {console.log(1)}"
```

除了上述对象以外，其他的对象都是返回的该对象的类型，调用了原型链上的Object.prototype.toString()方法

```
var obj = {}
obj.toString() // '[Object object]'
Math.toString() // '[Object Math]'
```

**通过ToNumber将值转换为数字**

```javascript
undefined => NaN
null => +0
boolean => false: 0, true: 1 
string => '' : 0, 有字符串数字解析为数字，e.g. '12.3': 12.3,'xxx': NaN
number => number 无需转换
object => 先ToPrimivetive(obj, preferredType=Number)，然后再进行     ToNumber
```

##### 通过ToString将值转化为字符串

```javascript
undefined => 'undefined'
null => 'null'
boolean => false: 'false', true: 'true'
string => string 无需转化
number => 123: '123'
object => 先ToPrimitive(obj, preferredType=String), 然后进行Tostring
```

**== 操作符的强制类型转换规则**

- 先判断类型是否相同，相同则比较两者的大小，不同则进行类型转换
- 再判断是否在对比 null 和 undefined，是的话就会返回 `true`，null只会等于undefined，undefined也只等于null
- 判断两者类型是否为 `string` 和 `number`，是的话就会将字符串转换为 `number`
- 判断其中一方是否为 `boolean`，是的话就会把 `boolean` 转为 `number` 再进行判断
- 判断其中一方是否为 `object` 且另一方为 `string`、`number` 或者 `symbol`，是的话就会把 `object` 转为原始类型再进行判断

**+操作符的强制类型转换规则**

+操作符`+`操作符的两边有至少一个`string`类型变量时，两边的变量都会被隐式转换为字符串；其他情况下两边的变量都会被转换为数字。

**-、*、\的强制类型转换规则**

会将变量都转换为数字再进行比较

**对于`<`和`>`比较符**

如果两边都是字符串，则比较字母表顺序，其他情况下，转换为数字再比较