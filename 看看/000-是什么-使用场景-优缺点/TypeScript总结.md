### TypeScript总结

typescript主要针对于JavaScript没有类型检测这一缺陷，加入了类型检测机制，可以让代码在编译时就抛出异常，而不是在代码运行时再发现错误

TypeScript是JavaScript的超集，他支持JavaScript所有的特性，除了类型检测外还增加了一些语法的扩展，如：枚举类型、元组类型等

#### Typescript如何进行类型检测

- 给变量、函数参数、函数返回值定义类型，当类型不匹配时编译报错
- 进行函数参数的校验，若参数为空则报错

#### Typescript的数据类型

-   基础类型

  number、string、boolean、undefined、null、symbol、bigInt

- 其他类型
  - Array    let arr: string[] = [];

  ```
  数组中最好存放同一种类型， string[] 表示数组中的元素只能为string类型
  ```

  - any

    ```
    表示可以为任意类型
    ```

  - never

    ```
    表示永远不会触发的类型，用于保证类型穷举完整等
    ```

  - unkonwn

    ```
    表示不知道的类型，与any的区别为，unkonwn类型的变量只能赋值给unknown或any类型
    ```

  - void

    ```
    表示函数无返回值
    ```

  - tuple（元组）

    ```
    const arr: [number, string, string] = [1, 'a', 'b']
    用于定义组合类型，或解构赋值中会用到
    ```

  - 对象类型

    ```
    let a: {x: number, y: number} = { x: 1,  y: 2 };
    ```

  - 可选类型和联合类型

    ```
    function A(a?: number) {
        console.log(a)
    }
    let a:number | string = '123'
    ```

  - 定义类型

    ```
    type defineType = number | string；
    let a:defineType = '123'；
    ```

  - 类型断言

    ```
    通过类型断言可以将类型转换为更具体的类型
    let imgEle = document.getElementById('img') as HTMLImageElement;
    console.log(imgEle.src);
    ```

  - 函数类型

    ```
    type FunctionType = (num1: number, number2: number) => number;
    function add:FunctionType (num1: number, num2: number) {
      return num1 + num2
    }
    ```

  - 枚举类型
  
    ```
    enum Direction {
        LEFT,
        RIGHT,
        TOP,
        BOTTOM
    }
    ```
  
    

#### 接口Interface

- 使用接口来定义对象类型

  ```
  interface IType {
      name: string,
      age: number
  }
  const person:IType =  {
      name: '123',
      age: 1
  }
  ```

#### 泛型

将类型参数化，不在函数定义时决定参数的类型，而是在函数调用时，传入什么类型就是什么类型

```
function A<T, O> (arg1: T, arg2: O) {}
A<number, string>(12, '123')
```

