### 0928-ES6-Symbol

在ES6之前，JS有6种基本数据类型，分别是：Number、String、Boolean、null、undefined和Object，其中object为引用类型。在ES6中,javaScript又新增了一种基本数据类型Symbol。那么Symbol的有什么特点呢？他的用法是什么？

一、什么是Symbol

symbol是一种基本数据类型 ，Symbol()函数会返回symbol类型的值，每个从Symbol()返回的symbol值都是唯一的。

二、Symbol的用法

Symbol最主要的用法就是作为对象属性的唯一标识符，防止对象属性发生冲突。

语法：Symbol([description])

description仅仅为对Symbol的描述，但不是Symbol的值

例如：

```
Symbol("yule") === Symbol("yule"); // false
```

三、symbol的方法

Symbol.for(key)

使用给定的key搜索现有的symbol，如果找到则返回该symbol。否则将使用给定的key在全局symbol注册表中创建一个新的symbol。此方法可以用来使用或创建相同的Symbol，避免重复创建。

```
Symbol.for("yule") === Symbol.for("yule"); // true
```

Symbol.keyFor()

返回一个已登记的 Symbol 类型值的key(通过Symbol.for(key)创建的Symbol)，如果是通过Symbol()创建的则会返回undefined



```javascript
let s1 = Symbol.for("yule");
Symbol.keyFor(s1) // "yule"
let s2 = Symbol("yule");
Symbol.keyFor(s2) // undefined
```

其实Symbol的方法还有很多种，但由于不是很常见，本文仅介绍比较重要的两个，其他的可以大家可以参考下MDN。

四、Symbols 与 for...in 迭代

Symbols 在 for...in 迭代中不可枚举。通过Object.keys()、Object.getOwnPropertyNames()、JSON.stringify()不会返回 symbol 对象的属性，但是可以通过Object.getOwnPropertySymbols() 获取指定对象的所有 Symbol 属性名。

以上就是本期的全部内容啦，其实Symbol在日常开发者并不常见，主要还是应用在声明常量和作为对象属性的唯一标识符这方面。如果你觉得对你有帮助的话，请点个大大的赞吧！