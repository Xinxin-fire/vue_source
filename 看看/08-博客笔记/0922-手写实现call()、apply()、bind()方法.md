### 0922-手写实现call()、apply()、bind()方法

在上一篇文章中，我们介绍了javaScript的this属性，今天我们详细讲解下改变this的指向方法，其实除了上一篇文章介绍的call()、apply()、bind()三种方法外，还有两种方法可以改变this的指向。

##### 一、箭头函数

箭头函数中没有 this 绑定，箭头函数的 this 始终指向函数定义时的 this，而非执行时。必须通过查找作用域链来决定其值，如果箭头函数被非箭头函数包含，则 this 绑定的是最近一层非箭头函数的 this，否则，this 为 undefined。

##### 二、通过定义一个标志位来保存this的指向

```
var a = {
   name : "fire",
       func1: function () {
       var that = this
           func2: function () {
               console.log(that.name)
          }
           func2() 
      },
}
a.func1()    //fire
```

除了这两种方法外call，apply，bind也是改变this指向的常用方法。

##### 三、手写实现 call()、apply()、bind()方法

1.call()

```
Function.prototype.myCall = function(context) {
  context = context ? Object(context) : window
  context.fn = this
  let args = [...arguments].slice(1)
  let r = context.fn(args)
  delete context.fn
  return r
}
```

2.apply()

```
Function.prototype.myApply = function(context) {
context = context ? Object(context) : window
  context.fn = this
  let args = [...arguments][1]
  if (!args) {
      return context.fn()
  }
  let r = context.fn(args)
  delete context.fn;
  return r
}
```

3.bind()

```
Function.prototype.bind = function(context) {
  let _me = this
  let bindArgs = [].slice.call(arguments, 1)
  function Fn() {}
  let fBound = function() {
      let fnArgs = [].slice.call(arguments)
      return _me.apply(this instanceof fBound ? this : context, bindArgs.concat(fnArgs))
  }
  Fn.prototype = this.prototype
  fBound.prototype = new Fn();
  return fBound
}
```

以上就是本期的内容啦，如果对你有所帮助的话，请点个大大的赞吧！