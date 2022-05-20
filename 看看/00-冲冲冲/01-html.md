## 01-html

### 1. 对 HTML 语义化的理解

语义化是指：根据内容的结构化，选择合适的标签，即用正确的标签做正确的事情

语义化的优点：

1.有利于SEO

2.对开发者友好，增强了代码的可读性

常见的语义化标签：<header></header>头部、<nav></nav>导航栏 、<section></section>区块 <main></main>主要内容、<article></article>主要内容、 <aside></aside>侧边栏、<footer></footer>底部

### 2.src 和 href 的区别

src和href都是用来引入外部资源的

src：表示对资源的引用，它指向的内容会嵌入到当前标签所在的位置，src会将其指向的资源下载并应用到文档内，当浏览器解析到该元素时会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕。

应用场景：script、img、iframe、vidio、audio、embed

href：表示超文本引用，它指向一些网络资源。建立和当前元素或本文档的链接关系，当浏览器识别到它指向的文件时，就会并⾏下载资源，不会停⽌对当前⽂档的处理。

应用场景：a、link

### 3.DOCTYPE(⽂档类型) 的作⽤

DOCTYPE 是 HTML5 中一种标准通用标记语言的文档类型声明，它的目的是**告诉浏览器（解析器）应该以什么样（html 或 xhtml）的文档类型定义**来解析文档，不同的渲染模式会影响浏览器对 CSS 代码甚⾄ JavaScript 脚本的解析。它必须声明在 HTML ⽂档的第⼀⾏

浏览器渲染页面的两种模式（可通过 document.compatMode 获取）：CSS1Compat（标准模式）和BackCompat（怪异模式(混杂模式)）

### 4. script 标签中 defer 和 async 的区别

**defer 和 async 属性都是去异步加载外部的 JS 脚本文件，它们都不会阻塞页面的解析**

区别：

- 多个带 async 属性的标签，不能保证加载的顺序；多个带 defer 属性的标签，按照加载顺序执行
- async 属性，表示后续文档的加载和执行与 js 脚本的加载和执行是并行进行的，即异步执行，defer属性是加载后续文档的过程和 js 脚本的加载是并行进行的，而js脚本的执行需要等到文档所有元素解析完成之后才执行

#### 5.常⽤的 meta 标签有哪些

常用的 meta 标签：

（1）`charset`，用来描述 HTML 文档的编码类型：

```
<meta charset="UTF-8" >
```

（2） `keywords`，页面关键词：

```
<meta name="keywords" content="关键词" />
```

（3）`description`，页面描述：

```
<meta name="description" content="页面描述内容" />
```

（4）`refresh`，页面重定向和刷新：

```
<meta http-equiv="refresh" content="0;url=" />
```

（5）`viewport`，适配移动端，可以控制视口的大小和比例：

```
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
```

#### 6.HTML5 有哪些更新

（1）新增语义化标签：nav、header、footer、aside、section、article

（2）音频、视频标签：audio、video

（3）数据存储：localStorage、sessionStorage

（4）canvas（画布）、Geolocation（地理定位）、websocket（通信协议）

（5）input 标签新增属性：placeholder、autocomplete、autofocus、required

（6）history API：go、forward、back、pushstate

#### 7.img 的 srcset 属性的作⽤？

srcset 属性用于设置不同屏幕密度下，img 会自动加载不同的图片

#### 8. 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

- 行内元素有：`a b span img input select strong`；
- 块级元素有：`div ul ol li dl dt dd h1 h2 h3 h4 h5 h6 p`；

空元素，即没有内容的 HTML 元素。空元素是在开始标签中关闭的，也就是空元素没有闭合标签：

- 常见的有：\<br>\<hr>\<img>\<input>\<link>\<meta>

#### 9. 说一下 web worker

web worker 是运行在后台的 js，独立于其他脚本，不会影响页面的性能。 并且通过 postMessage 将结果回传到主线程。这样在进行复杂操作的时候，就不会阻塞主线程了

#### 10. HTML5 的离线储存怎么使用，它的工作原理是什么

离线存储指的是：在用户没有与因特网连接时，可以正常访问站点或应用，在用户与因特网连接时，更新用户机器上的缓存文件。

**原理：**HTML5 的离线存储是基于一个新建的 `.appcache` 文件的缓存机制(不是存储技术)，通过这个文件上的解析清单离线存储资源，这些资源就会像 cookie 一样被存储了下来。之后当网络在处于离线状态下时，浏览器会通过被离线存储的数据进行页面展示

#### 11. 浏览器是如何对 HTML5 的离线储存资源进行管理和加载？

- **在线的情况下**，浏览器发现 html 头部有 manifest 属性，它会请求 manifest 文件，如果是第一次访问页面 ，那么浏览器就会根据 manifest 文件的内容下载相应的资源并且进行离线存储。如果已经访问过页面并且资源已经进行离线存储了，那么浏览器就会使用离线的资源加载页面，然后浏览器会对比新的 manifest 文件与旧的 manifest 文件，如果文件没有发生改变，就不做任何操作，如果文件改变了，就会重新下载文件中的资源并进行离线存储。
- **离线的情况下**，浏览器会直接使用离线存储的资源

#### 12. **iframe 有那些优点和缺点？**

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。

**优点：**

- 用来加载速度较慢的内容（如广告）
- 可以使脚本可以并行下载
- 可以实现跨子域通信

**缺点：**

- iframe 会阻塞主页面的 onload 事件
- 无法被一些搜索引擎索识别
- 会产生很多页面，不容易管理

#### 13. Canvas 和 SVG 的区别

SVG 可缩放矢量图形（Scalable Vector Graphics）是基于可扩展标记语言 XML 描述的 2D 图形的语言

- 不依赖分辨率
- 支持事件处理器
- 最适合带有大型渲染区域的应用程序（比如谷歌地图）
- 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
- 不适合游戏应用

Canvas 是画布，通过 Javascript 来绘制 2D 图形，是逐像素进行渲染的。其位置发生改变，就会重新进行绘制。

- 依赖分辨率
- 不支持事件处理器
- 弱的文本渲染能力
- 能够以 .png 或 .jpg 格式保存结果图像
- 最适合图像密集型的游戏，其中的许多对象会被频繁重绘

####  14.head 标签有什么作用，其中什么标签必不可少？

标签用于定义文档的头部，它是所有头部元素的容器。 head中的元素可以引用脚本、指示浏览器在哪里找到样式表、提供元信息等。

下面这些标签可用在 head 部分： \<script>, \<style>, \<title>。

其中\<title> 定义文档的标题，它是 head 部分中唯一必需的元素。

#### 15.文档声明（Doctype）和<!Doctype html>有何作用? 严格模式与混杂模式如何区分？它们有何意义?

文档声明是为了告诉浏览器，当前`HTML`文档使用什么版本的`HTML`来写的，这样浏览器才能按照声明的版本来正确的解析。

**<!Doctype html>的作用：****<!Doctype html>的作用就是让浏览器进入标准模式，使用最新的 `HTML5` 标准来解析渲染页面；如果不写，浏览器就会进入混杂模式，我们需要避免此类情况发生。

**严格模式**： 又称为标准模式，指浏览器按照`W3C`标准解析代码；

**混杂模式**： 又称怪异模式、兼容模式，是指浏览器用自己的方式解析代码。混杂模式通常模拟老式浏览器的行为，以防止老站点无法工作；

#### 16. 渐进增强和优雅降级之间的区别

**（1）渐进增强（progressive enhancement）**：主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果、交互等方面的改进和追加功能，以达到更好的用户体验。

**（2）优雅降级 graceful degradation**： 一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

#### 17.请你讲一下对于js中各种位置的理解，比如clientHeight,scrollHeight,offsetHeight ,以及scrollTop, offsetTop,clientTop的各自表示什么，它们的区别是什么？