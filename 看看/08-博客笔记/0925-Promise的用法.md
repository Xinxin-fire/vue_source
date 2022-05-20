### 0925-Promise的用法

在上期给大家介绍了，前后端是怎样交互的，以及调接口的三种方式：XMLHttpRequest、ajax和axios。

今天给大家介绍一下Promise，我们都知道，这三种调用接口的方式都是异步调用，但是如果异步调用的数据之间有很多依赖的话，很容易形成回调地狱，非常不利于代码的开发和维护。而Promise的出现解决了这个难题，它可以让我们实现链式调用，写出更优雅的异步编程。

##### 一、什么是Promise？

Pormise是JS的异步编程的一种解决方案，在本质上 Promise 是一个函数返回的对象，它代表了一个异步操作的最终完成或者失败。在ES6中，已经将其写入了编程规范。

##### 二、Promise的状态

- pending: 初始状态，既不是成功，也不是失败状态。
- fulfilled: 意味着操作成功完成。
- rejected: 意味着操作失败。

##### 三、Promise的方法

1.then()方法

```
var p1 = new Promise((resolve, reject) => {
 resolve('成功！');
 // or
 // reject(new Error("出错了！"));
});

p1.then(value => {
 console.log(value); // 成功！
}, reason => {
 console.error(reason); // 出错了！
});
```

then方法最多需要两个参数，resolve和reject，这两个参数都为回调函数，当Promise变为fulfilled状态时调用resolve函数，当Promise变为rejected状态时调用reject函数，then方法会返回一个新的Promise对象，因此它可以进行链式调用，这也是Promise最核心的用法。

2.catch()方法

可以接受一个参数onRejected，当Promise 被rejected时,调用onRejected函数。catch也会返回一个新的Promise对象，和then方法不同的地方在于catch在链式调用时，只会在调用失败的时候执行。

3.finally()方法

为当前Promise对象添加一个事件回调，无论当前Promise的状态为成功还是失败都会执行此回调函数。

4.all()方法

all()方法用于将多个 Promise 对象，包装成一个新的 Promise 对象，该promise对象只有在所有的promise对象都成功的时候才会触发成功。

5.race()方法

race()方法也是用于将多个 Promise 对象，包装成一个新的 Promise 对象，该promise对象只要有一个promise对象为成功状态就会触发成功。