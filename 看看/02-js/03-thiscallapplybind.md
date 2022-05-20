## 03-this/call/apply/bind

### 一、this

this的用法

1. 在全局作用域中指向window
2. 函数中，在严格模式下指向undefined，非严格模式下指向window
3. 作为对象的方法里，this指向对象本身
4. 在构造函数里，this指向构造函数创建的实例对象
5. 箭头函数没有自己的this，它会捕获离他最近的this。
6. 在DOM事件处理函数中，this指向触发事件的DOM元素
7. 由call或apply、bind调用：绑定到指定的对象

### 二、手写call

```
var foo = {
    value: 1
};

function bar() {
    console.log(this.value);
}

bar.call(foo); // 1
```

首先看看call实现了哪些功能：1.将函数设为对象的属性 2.执行改函数 3.删除改函数,4.若指定的上下文为null，这将this指向window，5.返回函数执行的结果

```javascript
Function.prototype._call = function(context) {
    context = context ? Object(context) : window;
    var fn = Symbol();
    context[fn] = this; //this指向调用call的函数
    let args = Array.prototype.slice.call(arguments,1);
    if (args == undefined) {
        let result = context.fn(...args); //指向函数
    } else {
        let result = context.fn();
    }
    delete context.fn; //删除对象的fn属性
    return result;
}
```

```
Function.prototype._apply = function(context) {
    context = context ? Object(context) : window;
    var fn = Symbol();
    context[fn] = this; //this指向调用call的函数
    let args = arguments[1]; 
    if (args == undefined) {
        let result = context.fn(...args); //指向函数
    } else {
        let result = context.fn();
    }
    delete context.fn; //删除对象的fn属性
    return result;
}
```

```javascript
Funtion.prototype._bind = function(thisArg) {
    if(this !== 'Function') {
        return;
    }
    let self = this;
    let args = [].slice.call(arguments,1);
    function bound() {
        let boundArgs = [].slice.call(arguments);
        return self.apply(thisArg, args.contact(boundArgs))
    }
}
```



