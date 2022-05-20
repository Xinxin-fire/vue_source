## 05-Promise

### 一、什么是Promise

- Promise是异步编程的一种解决方案

- Promise是一个构造函数，它接收一个函数作为参数，并且这个函数需要传递两个参数

  - resolve：异步操作执行成功后的回调函数，
  - reject：异步操作执行失败后的回调函数

- ```javascript
   let p = new Promise((resolve, reject) => {
          //做一些异步操作
        setTimeout(function(){
              var num = Math.ceil(Math.random()*10); //生成1-10的随机数
              if(num<=5){
                  resolve(num);//异步操作执行成功后的回调，等同于then方法的第一个回调
              }
              else{
                  reject('数字太大了');//异步操作执行失败后的回调，等同于then方法的第二个回调
              }
        }, 2000);
      });
      p.then((data) => {
              console.log('resolved',data);//data的值等于num，由resolve中的参数进行传递
          },(err) => {
              console.log('rejected',err);
          }
      ); 
  ```

### 二、Promise的方法

- then方法
  - then方法是promise能够进行链式调用的关键，因为它可以返回一个新的Promise对象
  - then方法里可以接受两个回调函数，reslove（）和reject（）
  - 新建的Promise对象在没有调用then方法之前会一直处于pending状态
  - 当调用then方法后，如果执行resolve()函数则promise对象会变成fulfied状态
  - 如果执行reject()函数，则promise对象会变成rejected状态
- catch方法
  - catch方法用来指定reject的回调和then方法里的第二个参数一样
  - 区别在于，在执行resolve的回调时如果报错了，并不会报错卡死js，而是会进到这个catch方法中

- all方法
  - all方法接受一个数组作为参数，数组里为多个Promise对象
  - 只有当所有的异步都成功调用时才调resolve函数，否则调reject函数
- race方法
  - race方法接受一个数组作为参数，数组里为多个Promise对象
  - 只要有一个异步成功调用，就会调resolve函数，否则调reject函数

### 三、手写基础版本的Promise

- ```javascript
  function Promise(fn) {
      //保存this的值
      let self = this;
      //成功时的值
      this.value = null;
      // 失败时的原因
    this.error = null;
      // 成功时的回调函数
      this.onFullfilled = null;
      // 失败时的回调函数
      this.onRejected = null;
  
      function resolve(value) {
          self.value = value;
          self.onFullfilled(self.value); 
      }
      function reject(error) {
          self.error = error;
          self.onRejected(self.error);
      }
      fn(resolve,reject);
  }
  Promise.prototype.then = function(onFullfilled,onRejected) {
      this.onFullfilled = onFullfilled;
      this.onRejected = onRejected;
  }
  ```
  
- 支持同步

  - ```javascript
    //支持同步版本
    // 使用setTimeout将resolve，reject里面包括，使其到then方法执行之后再去执行
    function resolve() {
        setTimeout(() => {
            self.value = value;
            self.onFullfilled(self.value);
        })
    }
    function reject() {
        setTimeout(() => {
            self.error = error;
            self.onRejected(self.error);
        })
    }
    
    ```

- 支持三种状态

  - promise有三种状态：pending、fulfilled、rejected
  - 只有异步操作的结果才能改变这个状态，且只能从pending变为fulfilled或变成rejected，一旦状态发生改变状态就凝固了
  - 如果改变已经发生，再对promise对象添加回调函数，也会立即得到这个结果

  - ```javascript
    // 支持三种状态
    const PENDING = 'pending';
    const FULLFILLED = 'fullfilled';
    const REJECTED = 'reject';
    function Promise(fn) {
        this.status = PENDING;
        this.value = '';
        this.error = null;
        this.onFullfilled = null;
        this.onRejected = null;
        this = self;
        function resolve(value) {
            setTimeout(() => {
                if(status == PENDING) {
                    self.status = FULLFILLED;
                    self.value = value;
                    self.onFullfilled(self.value)
                }
            });
        }
        function reject(error) {
            setTimeout(() => {
                if(status == PENDING) {
                    self.status = REJECTED;
                    self.error = error;
                    self.onFullfilled(self.error)
                }
            });
        }
        fn(resolve,reject);
    }
    Promise.prototype.then = function(onFullfilled,onRejected) {
        if (status == PENDING) {
            this.onFullfilled = onFullfilled;
            this.onRejected = onRejected;
        } else if (this.status == FULLFILLED) {
            onFullfilled(this.value);
        } else if (this.status == REJECTED) {
            onRejected(this.error);
        }
    }
    ```

  - 支持链式操作

  - 首先将存储回调的改为数组，在执行回调时，改为遍历回调数组执行函数，最后在then方法里面加上return this返回一个Promise对象

  - 