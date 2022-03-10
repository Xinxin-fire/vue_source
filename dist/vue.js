(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

  function genProps(attrs) {
    return attrs.reduce(function (pre, cur, index) {
      if (cur.name === 'style') {
        var styleObj = {};
        cur.value.replace(/([^;:]+)\:([^;:]+)/g, function () {
          styleObj[arguments[1]] = arguments[2];
        });
        cur.value = styleObj;
      }

      if (index === attrs.length - 1) {
        pre += "".concat(cur.name, ":").concat(JSON.stringify(cur.value), "}");
      } else {
        pre += "".concat(cur.name, ":").concat(JSON.stringify(cur.value), ",");
      }

      return pre;
    }, '{');
  }

  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 匹配{{}}

  function gen(el) {
    if (el.type === 1) {
      return generate(el);
    } else {
      var text = el.text;

      if (!defaultTagRE.test(text)) {
        return "_v('".concat(text, "')");
      } else {
        var tokens = [],
            match,
            lastIndex = defaultTagRE.lastIndex = 0;

        while (match = defaultTagRE.exec(text)) {
          var index = match.index;

          if (index > lastIndex) {
            tokens.push(JSON.stringify(text.slice(lastIndex, index)));
          }

          tokens.push("_s(".concat(match[1].trim(), ")"));
          lastIndex = index + match[0].length;
        }

        if (lastIndex < text.length) {
          tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return "_v(".concat(tokens.join('+'), ")");
      }
    }
  }

  function genChildren(el) {
    var children = el.children;

    if (children) {
      return children.map(function (item) {
        return gen(item);
      }).join(',');
    }

    return false;
  }

  function generate(el) {
    var children = genChildren(el);
    var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? genProps(el.attrs) : 'undefined').concat(children ? ",".concat(children) : '', ")");
    return code;
  }

  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 标签名

  var qnameCapture = "((?:".concat(ncname, "\\:)?").concat(ncname, ")"); // 获取标签名

  var startTagOpen = new RegExp("^<".concat(qnameCapture)); //开始标签

  var endTag = new RegExp("^<\\/".concat(qnameCapture, "[^>]*>")); //结束标签

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 标签属性

  var startTagClose = /^\s*(\/?)>/; // 标签闭合
  // 通过栈将解析的结果组装成一个树结构

  function createAstElement(tagName, attrs) {
    return {
      tag: tagName,
      type: 1,
      children: [],
      parent: null,
      attrs: attrs
    };
  }

  var root = null,
      stack = []; // 开始标签

  function start(tagName, attributes) {
    var element = createAstElement(tagName, attributes);

    if (stack.length > 0) {
      var parent = stack[stack.length - 1];
      element.parent = parent;
      parent.children.push(element);
    }

    if (!root) {
      root = element;
    }

    stack.push(element);
  } // 结束标签


  function end(tagName) {
    var last = stack.pop();

    if (last.tag !== tagName) {
      throw new Error('标签有误！');
    }
  } // 文本内容


  function chars(text) {
    text = text.replace('/\s/g', '');
    var parent = stack[stack.length - 1];

    if (text) {
      parent.children.push({
        type: 3,
        text: text
      });
    }
  } // 将html解析成对应的脚本来触发tokens


  function parseHTML(html) {
    function advance(len) {
      html = html.substring(len);
    }

    function parseStartTag() {
      var start = html.match(startTagOpen);

      if (start) {
        var match = {
          tagName: start[1],
          attrs: []
        };
        advance(start[0].length);

        var _end, attr; // 如果没有遇到闭合标签则不停的解析


        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          // 将匹配到属性标签删除
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          });
          advance(attr[0].length);
        }

        if (_end) {
          advance(_end[0].length);
        } // 返回匹配到的属性和标签名


        return match;
      }

      return false;
    }

    while (html) {
      var textEnd = html.indexOf('<');

      if (textEnd === 0) {
        // 解析开始标签
        var startTagMatch = parseStartTag();

        if (startTagMatch) {
          start(startTagMatch.tagName, startTagMatch.attrs);
          continue;
        } // 解析结束标签


        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          end(endTagMatch[1]);
          advance(endTagMatch[0].length);
          continue;
        }
      }

      var text = void 0;

      if (textEnd > 0) {
        text = html.substring(0, textEnd);
      }

      if (text) {
        chars(text);
        advance(text.length);
      }
    }

    return root;
  }

  function compileToFunction(template) {
    var root = parseHTML(template);
    var code = generate(root);
    var render = new Function("with(this){return ".concat(code, "}"));
    return render;
  }

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function () {};
  }
  function mountComponent(vm, el) {
    // 更新函数，数据变化后会再次调用此函数
    var updateComponent = function updateComponent() {
      // 调用render函数，生成虚拟dom
      // 用虚拟dom生成真实dom
      vm._update(vm._render());
    };

    updateComponent();
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", {
      writable: false
    });
    return Constructor;
  }

  function isFunction(val) {
    return typeof val === 'function';
  }
  function isObject(val) {
    return Object.prototype.toString.call(val) === '[object Object]' || val === null;
  }

  var oldArrayPrototype = Array.prototype;
  var arrayMethods = Object.create(oldArrayPrototype);
  var methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'reverse', 'sort'];
  methods.forEach(function (method) {
    // 重写数组上的方法
    arrayMethods[method] = function () {
      var _oldArrayPrototype$me;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      (_oldArrayPrototype$me = oldArrayPrototype[method]).call.apply(_oldArrayPrototype$me, [this].concat(args));

      var insert;
      var ob = this.__ob__;

      switch (method) {
        case 'unshift':
          insert = args;
          break;

        case 'push':
          insert = args;
          break;

        case 'splice':
          insert = args.slice(2);
      }

      if (insert) {
        ob.observeArray(insert);
      }
    };
  });

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      // 对对象中的所有属性进行劫持
      // 将Observer实例赋值给data的ob属性，方便对数组劫持的时候调用Observe，同时可以判断如果一个数据有ob属性，说明它已经被劫持过了
      Object.defineProperty(data, ' __ob__', {
        value: this,
        enumerable: false
      });

      if (Array.isArray(data)) {
        data.__proto__ = arrayMethods; // 如果数组的的子元素为对象需要对该子元素进行劫持

        this.observeArray(data);
      } else {
        this.walk(data);
      }
    }

    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(data) {
        data.forEach(function (ele) {
          observe(ele);
        });
      }
    }, {
      key: "walk",
      value: function walk(data) {
        Object.keys(data).forEach(function (key) {
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }(); // 对对象的属性进行遍历，用defineProperty对对象的数据进行劫持


  function defineReactive(data, key, value) {
    // 如果对象中的属性还是对象则需要递归调用监测方法
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newV) {
        observe(newV); // 如果给对象的属性复制的是一个新对象，则需要对新对象重新劫持

        value = newV;
      }
    });
  }

  function observe(data) {
    if (!isObject(data)) {
      return;
    }

    if (data.__ob__) {
      return;
    }

    new Observer(data);
  }

  function initState(vm) {
    // 状态初始化
    var opts = vm.$options;

    if (opts.data) {
      initData(vm);
    }
  }

  function proxy(vm, source, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[source][key];
      },
      set: function set(newV) {
        vm[source][key] = newV;
      }
    });
  }

  function initData(vm) {
    var data = vm.$options.data; // 将劫持的数据放在实例的_data上

    data = vm._data = isFunction(data) ? data.call(vm) : data; // 对数据做一层代理

    for (var key in data) {
      proxy(vm, '_data', key);
    }

    observe(data);
  }

  function initMixin(Vue) {
    Vue.prototype._init = function (options) {
      var vm = this;
      vm.$options = options; //方便对options进行扩展
      // 对数据进行初始化 data watch computed

      initState(vm);

      if (vm.$options.el) {
        vm.$mounted(vm.$options.el);
      }
    };

    Vue.prototype.$mounted = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el); // 优先级：render > template > el

      if (!options.render) {
        var template = options.template; // 如果用户没有传template则取el的内容作为模板

        if (!template && el) {
          template = el.outerHTML;
          var render = compileToFunction(template); // 将render函数添加到options上

          options.render = render;
          console.log(options.render); // 组件挂载流程

          mountComponent(vm);
        }
      }
    };
  }

  function creatElement(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
      children[_key - 3] = arguments[_key];
    }

    return vnode(vm, tag, data, data.key, children, undefined);
  }
  function creatTextElement(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  function vnode(vm, tag, data, key, children, text) {
    return {
      vm: vm,
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function (tag, data) {
      for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
      }

      return creatElement.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    };

    Vue.prototype._v = function (text) {
      return creatTextElement(this, text);
    };

    Vue.prototype._s = function (val) {
      return JSON.stringify(val);
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render;
      var vnode = render.call(vm);
      console.log(vnode);
      return vnode;
    };
  }

  function Vue(options) {
    // 初始化Vue实例的配置
    this._init(options);
  } // 扩展原型


  initMixin(Vue);
  renderMixin(Vue); // _render

  lifecycleMixin(Vue); // _update

  return Vue;

}));
//# sourceMappingURL=vue.js.map
