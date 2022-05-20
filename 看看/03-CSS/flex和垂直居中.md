## CSS

### 一、flex布局

- flex容器默认存在两条轴，水平轴和垂直轴
- flex容器每个单元快称之为flex item

#### **flex 容器** 

实现flex容器需要先指定一个容器，任何一个容器都可以被指定为flex布局

```html
.container {
    display: flex | inline-flex;       //可以有两种取值
}
```

分别生成一个块状或行内的 flex 容器盒子。简单说来，如果你使用块元素如 div，你就可以使用 flex，而如果你使用行内元素，你可以使用 inline-flex。

**有下面六种属性可以设置在容器上，它们分别是：**

- flex-direction：决定主轴的方向

  - ```
    .container {
        flex-direction: row | row-reverse | column | column-reverse;
    }
    ```

    默认为row，主轴为水平方向起点在左端

- flex-wrap

  - ```css
    .container {
        flex-wrap: nowrap | wrap | wrap-reverse;
    }
    ```

  默认为nowrap不换行，当主轴尺寸固定，空间不足时，项目尺寸会随之调整并不会挤到下一行

- flex-flow：flex-direction 和 flex-wrap 的简写形式

- justify-content：定义flex item在容器中主轴的对齐方式

  - flex-start 左对齐
  - flex-end 右对齐
  - center 居中
  - space-between 两端对齐项目之间间隔相等
  - space-around 每个项目之间的间隔比项目与边缘的间隔大一倍

- align-items 定义flex item在容器中交叉轴的对齐方式 

  - 默认为stretch，即项目为设置高度或者设为auto，将占满整个容器的高度
  - flex-start：交叉轴的起点对齐
  - flex-end：交叉轴的终点对齐
  - center：交叉轴的中点对齐
  - baseline：项目的第一行文字的基线对齐

- align-content：定义了多根轴线对齐的方式，如果项目只有一根轴线，那么该属性将不起作用

#### flex item

有六种属性可运用在 item 项目上：

- order **定义项目在容器中的排列顺序，数值越小，排列越靠前，默认值为 0**
- flex-basis  **定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间**
- flex-grow **定义项目的放大比例**
- flex-shrink **定义了项目的缩小比例**
- flex  **flex-grow, flex-shrink 和 flex-basis的简写**
- align-self  跟 align-items 属性时一样的，只不过 align-self 是对单个项目生效的，而 align-items 则是对容器下的所有项目生效的

### 二、水平居中

- #### 文本/行内元素/行内块级元素

text-align用于设置元素的行内内容居中（文字、行内元素、行内块级元素的），对行内元素无效（对行内块级元素和块级元素等可设置宽度的有效）。

```
#parent{
    text-align: center;
}
```

- #### 单个块级元素

```
#son{
    width: 100px; /*必须定宽*/
    margin: 0 auto;
}
```

- #### 多个块级元素

```
#parent{
    text-align: center;
}
.son{
    display: inline-block; /*改为行内或者行内块级形式，以达到text-align对其生效*/
}
```

- #### 使用绝对定位

```
#parent{
    height: 200px;
    width: 200px;  /*定宽*/
    position: relative;  /*父相*/
    background-color: #f00;
}
#son{
    position: absolute;  /*子绝*/
    left: 50%;  /*父元素宽度一半,这里等同于left:100px*/
    transform: translateX(-50%);  /*自身宽度一半,等同于margin-left: -50px;*/
    width: 100px;  /*定宽*/
    height: 100px;
    background-color: #00ff00;
}

```

- 任意个元素（flex）

```
#parent{
    display: flex;
    justify-content: center;
}
```

### 三、垂直居中

- #### 单行文本/行内元素/行内块级元素

  ```
  #parent{
      height: 150px;
      line-height: 150px;  /*与height等值*/
  }
  ```

- #### 多行文本/行内元素/行内块级元素

  ```
  #parent{  /*或者用span把所有文字包裹起来，设置display：inline-block转换成图片的方式解决*/
      height: 150px;
      line-height: 30px;  /*元素在页面呈现为5行,则line-height的值为height/5*/
  }
  ```

- #### 图片

  ```
  #parent{
      height: 150px;
      line-height: 150px;
      font-size: 0;
  }
  img#son{vertical-align: middle;} /*默认是基线对齐，改为middle*/
  ```

- #### 单个块级元素

  ```
  #parent{
      display: table-cell;
      vertical-align: middle;
  }
  ```

  ```
  #parent{
      height: 150px;
      position: relative;  /*父相*/
  }
  #son{
      position: absolute;  /*子绝*/
      top: 50%;  /*父元素高度一半,这里等同于top:75px;*/
      transform: translateY(-50%);  /*自身高度一半,这里等同于margin-top:-25px;*/
      height: 50px;
  }
  ```

  ```
  #parent{position: relative;}
  #son{
      position: absolute;
      margin: auto 0;
      top: 0;
      bottom: 0;
      height: 50px;
  }
  ```

  ```
  #parent{
      display: flex;
      align-items: center;
  }
  ```

- 任意个元素

  ```
  #parent{
      display: flex;
      align-items: center;
  }
  ```

### 四、水平垂直居中

- #### 行内/行内块级/图片

  `text-align: center;` 控制行内内容相对于块父元素水平居中,然后就是`line-height`和`vertical-align`的基友关系使其垂直居中，`font-size: 0;` 是为了消除近似居中的bug

  ```
  #parent{
      height: 150px;
      line-height: 150px;  /*行高的值与height相等*/
      text-align: center;
      font-size: 0;   /*消除幽灵空白节点的bug*/
  }
  #son{
      /*display: inline-block;*/  /*如果是块级元素需改为行内或行内块级才生效*/
      vertical-align: middle;
  }
  ```

- #### table-cell

  ```
  #parent{
      height: 150px;
      width: 200px;
      display: table-cell;
      vertical-align: middle;
      /*text-align: center;*/   /*如果是行内元素就添加这个*/
  }
  #son{
      /*margin: 0 auto;*/    /*如果是块级元素就添加这个*/
      width: 100px;
      height: 50px;
  }
  ```

- #### button作为父元素

  button的默认样式，再把需要居中的元素表现形式改为行内或行内块级就好

  ```
  button#parent{  /*改掉button默认样式就好了,不需要居中处理*/
      height: 150px;
      width: 200px;
      outline: none;  
      border: none;
  }
  #son{
      display: inline-block; /*button自带text-align: center,改为行内水平居中生效*/
  }
  ```

- #### 绝对定位

  ```
  #parent{
      position: relative;
  }
  #son{
      position: absolute;
      top: 50%;
      left: 50%;
      /*定宽高时等同于margin-left:负自身宽度一半;margin-top:负自身高度一半;*/
      transform: translate(-50%,-50%); 
  }
  ```

- #### 绝对居中

  ```
  #parent{
      position: relative;
  }
  #son{
      position: absolute;
      margin: auto;
      width: 100px;
      height: 50px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
  }
  ```

- #### flex

  ```
  #parent{
      display: flex;
  }
  #son{
      margin: auto;
  }
  
  或
  
  #parent{
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  或
  
  #parent{
      display: flex;
      justify-content: center;
  }
  #son{
      align-self: center;
  }
  ```

- #### 视窗居中

```
#son{
	/*0如果去掉，则会多出滚动条并且上下都是50vh的margin。如果去掉就给body加上overflow:hidden;*/
    margin: 50vh auto 0;  
    transform: translateY(-50%);
}

```

