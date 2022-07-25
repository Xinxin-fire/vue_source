grid 网格布局

#### 容器属性

##### 1.开启grid布局

display：grid

##### 2.网格轨道

一个网格轨道就是网格中任意两条线之间的空间，两条横线中间的区域为行轨道，两条竖线中间的区域为列轨道

通过 **grid-template-columns** 和 **grid-template-rows** 属性来定义网格中的行和列

```
grid-template-columns: 1fr 1fr 1fr;
```

如上表示将表格等分为3列， fr表示弹性尺寸

##### 3.网格间距

```
 column-gap: 10px; // 列间距
 row-gap: 10px; // 行间距
 gap: 10px 10px;
```

##### 4.网格区域

网格布局允许指定"区域"（area），一个区域由单个或多个单元格组成。

```
grid-template-areas: "header header header"
                     "main main sidebar"
                     "footer footer footer";
```

##### 5.对齐

```
justify-items: start | end | center | stretch; 属性设置单元格内容的水平位置（左中右），
align-items: start | end | center | stretch;属性设置单元格内容的垂直位置（上中下）。
place-items属性是align-items属性和justify-items属性的合并简写形式。
justify-content属性是整个内容区域在容器里面的水平位置（左中右），
align-content属性是整个内容区域的垂直位置（上中下）。
```

##### 6.子元素的排列方式

这个顺序由`grid-auto-flow`属性决定，默认值是`row`，即"先行后列"。也可以将它设成`column`，变成"先列后行"。

```
grid-auto-flow: column
```



#### 项目属性

```
grid-column-start属性：左边框所在的垂直网格线
grid-column-end属性：右边框所在的垂直网格线
grid-row-start属性：上边框所在的水平网格线
grid-row-end属性：下边框所在的水平网格线
grid-column: 1 / 3;属性是grid-column-start和grid-column-end的合并简写形式，
grid-row: 1 / 2;属性是grid-row-start属性和grid-row-end的合并简写形式。
grid-area属性指定项目放在哪一个区域。
```

