(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
})(this, (function () { 'use strict';

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
    };
  }

  function Vue(options) {
    // 初始化Vue实例的配置
    this._init(options);
  } // 扩展原型


  initMixin(Vue);

  return Vue;

}));
//# sourceMappingURL=vue.js.map
