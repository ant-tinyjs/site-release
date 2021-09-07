/*!
 * Name: tinyjs-plugin-ui
 * Description: Tiny.js UI plugin
 * Author: yiiqii
 * Version: v0.7.2
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Tiny = global.Tiny || {}, global.Tiny.ui = {})));
}(this, (function (exports) { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var objectWithoutProperties = function (obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var UISettings = function UISettings() {
    classCallCheck(this, UISettings);
    this.width = 0;
    this.height = 0;
    this.active = {};
    this.textStyle = {};
    this.roundRectBase64_black75 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxMzAyZGY2ZS02Y2FmLTQ5YTUtYTVkNS1jM2Q3ZTY1ZGY2YjUiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzQwQzQ1MDRDMDRGMTFFN0FFOEE4Qzg3QzREMDc2RjkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzQwQzQ1MDNDMDRGMTFFN0FFOEE4Qzg3QzREMDc2RjkiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MTMwMmRmNmUtNmNhZi00OWE1LWE1ZDUtYzNkN2U2NWRmNmI1IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjEzMDJkZjZlLTZjYWYtNDlhNS1hNWQ1LWMzZDdlNjVkZjZiNSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PobBPigAAAEFSURBVHjarJXNCgFRGIaP42+j/GysEW6AcBH2UrgyK3EFlNzBhLLAEvlZ2GCPeD99o6HxO99bT02n09M08533uJR9PCDDJEEYnMAOLEAfDHntIS4bWRaUQVS9zxa0WH6P2/KsQQnUQEB9Du0pAB+YgsuzkGRF9XvSwAvGVmEOVNX/IekabDT/gIpyHnJ4NL9dREBIjrzm0ZBKhoQJQWGchEFBYYiEZ0HhbZj3gr4DCZeCwhkJB4LCAQkNbhGnIYehuYIaAkJyHM2zvAF+kPpT1gbd57aZcCX9Oug90LSrL1oYgRWIfdGJVLB10DFlrxrbvAJy3N4xS3nQh59zSxt2V8BVgAEA0AAwNCQbWm0AAAAASUVORK5CYII=';
    this.roundRectBase64_white = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjhBMkZEMEVCQkUxODExRTdBQ0IzRDUwNDhFRTNGQTg4IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjhBMkZEMEVDQkUxODExRTdBQ0IzRDUwNDhFRTNGQTg4Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6OEEyRkQwRTlCRTE4MTFFN0FDQjNENTA0OEVFM0ZBODgiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6OEEyRkQwRUFCRTE4MTFFN0FDQjNENTA0OEVFM0ZBODgiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5j8e8ZAAAA4UlEQVR42qyUXQqCQBRG1cD2UEFQq2gXVtaLq6hd6GstI6j2EQS9RlhQuIXyZfouXGH8K3TuB2cYh7kHZcZrK6WsirjAYyagB1LwBGewB0dey4eEBabgqv6H9syK9fpDB4SqeUKuLQnbyHRpTugr85DDsjHQAdzAwDLLC4wcDAsBGaUPlg5fDal49Ml3TIZCwgcJ35h0hYSpU3nbDULCRNCXkPAiKDyR8CAoPEhf7HF2KGuBt1uBj94cIoP/OKprX5sWsm1d+8qYN2iw/q8Gq+OCAOxADFIm5rWA95RqvwIMAKI2aIgZcds+AAAAAElFTkSuQmCC';
    this.blankBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM3RDMwODAzQUM4RTExRTc4MDNEQTZGQ0E2MjgxNEFEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM3RDMwODA0QUM4RTExRTc4MDNEQTZGQ0E2MjgxNEFEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzdEMzA4MDFBQzhFMTFFNzgwM0RBNkZDQTYyODE0QUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzdEMzA4MDJBQzhFMTFFNzgwM0RBNkZDQTYyODE0QUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Iqam2AAAAEElEQVR42mL4//8/A0CAAQAI/AL+26JNFgAAAABJRU5ErkJggg==';
  };

  var UIBase = function (_Tiny$Container) {
    inherits(UIBase, _Tiny$Container);
    function UIBase(width, height) {
      classCallCheck(this, UIBase);
      var _this = possibleConstructorReturn(this, (UIBase.__proto__ || Object.getPrototypeOf(UIBase)).call(this));
      _this.setting = new UISettings();
      _this.children = [];
      _this.parent = null;
      _this.stage = null;
      _this.initialized = false;
      _this.dragInitialized = false;
      _this.dropInitialized = false;
      _this.dirty = true;
      _this.pixelPerfect = true;
      _this.setting.width = width || 0;
      _this.setting.height = height || 0;
      return _this;
    }
    return UIBase;
  }(Tiny.Container);

  var InputBase = function (_UIBase) {
    inherits(InputBase, _UIBase);
    function InputBase() {
      classCallCheck(this, InputBase);
      var _this = possibleConstructorReturn(this, (InputBase.__proto__ || Object.getPrototypeOf(InputBase)).call(this));
      _this.interactive = true;
      _this.on('pointerdown', function (e) {});
      _this.on('pointerup', function (e) {});
      _this.on('pointermove', function (e) {});
      _this.on('pointerupoutside', function (e) {});
      return _this;
    }
    return InputBase;
  }(UIBase);

  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }
  var isObject_1 = isObject;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  var _freeGlobal = freeGlobal;

  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
  var root = _freeGlobal || freeSelf || Function('return this')();
  var _root = root;

  var now = function() {
    return _root.Date.now();
  };
  var now_1 = now;

  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {}
    return index;
  }
  var _trimmedEndIndex = trimmedEndIndex;

  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string
      ? string.slice(0, _trimmedEndIndex(string) + 1).replace(reTrimStart, '')
      : string;
  }
  var _baseTrim = baseTrim;

  var Symbol$1 = _root.Symbol;
  var _Symbol = Symbol$1;

  var objectProto = Object.prototype;
  var hasOwnProperty = objectProto.hasOwnProperty;
  var nativeObjectToString = objectProto.toString;
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];
    try {
      value[symToStringTag] = undefined;
    } catch (e) {}
    var result = nativeObjectToString.call(value);
    {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  var _getRawTag = getRawTag;

  var objectProto$1 = Object.prototype;
  var nativeObjectToString$1 = objectProto$1.toString;
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }
  var _objectToString = objectToString;

  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }
  var _baseGetTag = baseGetTag;

  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }
  var isObjectLike_1 = isObjectLike;

  var symbolTag = '[object Symbol]';
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
  }
  var isSymbol_1 = isSymbol;

  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol_1(value)) {
      return NAN;
    }
    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject_1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = _baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }
  var toNumber_1 = toNumber;

  var FUNC_ERROR_TEXT = 'Expected a function';
  var nativeMax = Math.max,
      nativeMin = Math.min;
  function debounce(func, wait, options) {
    var lastArgs,
        lastThis,
        maxWait,
        result,
        timerId,
        lastCallTime,
        lastInvokeTime = 0,
        leading = false,
        maxing = false,
        trailing = true;
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber_1(wait) || 0;
    if (isObject_1(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs,
          thisArg = lastThis;
      lastArgs = lastThis = undefined;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime,
          timeWaiting = wait - timeSinceLastCall;
      return maxing
        ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
        : timeWaiting;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime,
          timeSinceLastInvoke = time - lastInvokeTime;
      return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
        (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
    }
    function timerExpired() {
      var time = now_1();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = undefined;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = undefined;
      return result;
    }
    function cancel() {
      if (timerId !== undefined) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = undefined;
    }
    function flush() {
      return timerId === undefined ? result : trailingEdge(now_1());
    }
    function debounced() {
      var time = now_1(),
          isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === undefined) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === undefined) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  var debounce_1 = debounce;

  var FUNC_ERROR_TEXT$1 = 'Expected a function';
  function throttle(func, wait, options) {
    var leading = true,
        trailing = true;
    if (typeof func != 'function') {
      throw new TypeError(FUNC_ERROR_TEXT$1);
    }
    if (isObject_1(options)) {
      leading = 'leading' in options ? !!options.leading : leading;
      trailing = 'trailing' in options ? !!options.trailing : trailing;
    }
    return debounce_1(func, wait, {
      'leading': leading,
      'maxWait': wait,
      'trailing': trailing
    });
  }
  var throttle_1 = throttle;

  var Button = function (_InputBase) {
    inherits(Button, _InputBase);
    function Button(options) {
      classCallCheck(this, Button);
      var _this = possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));
      Object.assign(_this.setting, options);
      var active = _this.setting.active;
      var text = _this.setting.text || '';
      var background = _this.setting.background;
      var activeBackground = active.background;
      var activeBackgroundTexture = void 0;
      if (Tiny.isUndefined(background)) {
        background = _this.setting.blankBase64;
      }
      if (Tiny.isString(background)) {
        var baseTexture = Tiny.BaseTexture.from(background);
        var texture = new Tiny.Texture(baseTexture);
        background = new Tiny.Sprite(texture);
        Tiny.BaseTexture.removeFromCache(baseTexture);
      }
      if (Tiny.isString(activeBackground)) {
        var _baseTexture = Tiny.BaseTexture.from(activeBackground);
        activeBackgroundTexture = new Tiny.Texture(_baseTexture);
        Tiny.BaseTexture.removeFromCache(_baseTexture);
      }
      _this.addChild(background);
      if (Tiny.isString(text)) {
        text = new Tiny.Text(text, _this.setting.textStyle);
      }
      _this.addChild(text);
      _this.text = text;
      _this.background = background;
      _this.buttonMode = true;
      if (background instanceof Tiny.Graphics || background.texture.baseTexture.hasLoaded) {
        _this.updatePosition();
      } else {
        background.texture.on('update', function () {
          _this.updatePosition();
          _this.emit('rendered');
        });
      }
      _this.bindEvent(active, activeBackgroundTexture);
      return _this;
    }
    createClass(Button, [{
      key: 'bindEvent',
      value: function bindEvent(active, activeBackgroundTexture) {
        var _this2 = this;
        var improveScrollExperience = this.setting.improveScrollExperience;
        var background = this.background;
        var backgroundTexture = background.texture;
        var thisOpacity = this.getOpacity();
        var thisScaleX = this.getScale().x;
        var thisScaleY = this.getScale().y;
        var leaveHandler = function leaveHandler() {
          if (activeBackgroundTexture) {
            background.texture = backgroundTexture;
          }
          if (active.opacity) {
            _this2.setOpacity(thisOpacity);
          }
          if (active.scale) {
            _this2.setScale(thisScaleX, thisScaleY);
          }
        };
        this.on('pointerdown', function (e) {
          if (activeBackgroundTexture) {
            background.texture = activeBackgroundTexture;
          }
          if (active.opacity) {
            _this2.setOpacity(active.opacity);
          }
          if (active.scale) {
            var scale = active.scale;
            if (Tiny.isNumber(scale)) {
              scale = {
                scaleX: scale,
                scaleY: scale
              };
            }
            _this2.setScale(scale.scaleX, scale.scaleY);
          }
        });
        this.on('pointerup', leaveHandler);
        this.on('pointermove', function (e) {});
        this.on('pointerupoutside', leaveHandler);
        if (improveScrollExperience) {
          var initialX = null;
          var initialY = null;
          var lastX = null;
          var lastY = null;
          var blockEvent = null;
          var maxDistance = 20;
          var reset = function reset() {
            lastX = null;
            lastY = null;
            initialX = null;
            initialY = null;
            blockEvent = null;
          };
          var startup = function startup(e) {
            var _e$data$global = e.data.global,
                x = _e$data$global.x,
                y = _e$data$global.y;
            initialX = lastX = x;
            initialY = lastY = y;
            blockEvent = false;
          };
          var relay = throttle_1(function (e) {
            var _e$data$global2 = e.data.global,
                x = _e$data$global2.x,
                y = _e$data$global2.y;
            var disFromInitial = Math.sqrt((initialX - x) * (initialX - x) + (initialY - y) * (initialY - y));
            var disFromLast = Math.sqrt((lastX - x) * (lastX - x) + (lastY - y) * (lastY - y));
            lastX = x;
            lastY = y;
            if (disFromInitial > maxDistance || disFromLast > maxDistance) {
              blockEvent = true;
            }
          }, 30);
          var release = function release(callback) {
            if (blockEvent === false) callback();
            reset();
          };
          this.on('pointerdown', startup);
          this.on('pointermove', relay);
          this.on('pointerupoutside', reset);
          this.on('pointerup', function (e) {
            e.data.originalEvent.preventDefault();
            release(function () {
              if (Tiny.isFunction(active.callback)) {
                active.callback(e);
              }
            });
          });
        } else {
          var clickHandler = throttle_1(function (e) {
            e.data.originalEvent.preventDefault();
            if (Tiny.isFunction(active.callback)) {
              active.callback(e);
            }
          }, 500, { trailing: false });
          this.on('pointerup', clickHandler);
        }
      }
    }, {
      key: 'updatePosition',
      value: function updatePosition(textPosition) {
        var x = void 0,
            y = void 0;
        var width = ~~this.setting.width;
        var height = ~~this.setting.height;
        var textPos = textPosition || this.setting.textPosition;
        if (!(this.background instanceof Tiny.Graphics)) {
          this.background.width = width || this.background.texture.width;
          this.background.height = height || this.background.texture.height;
        }
        var offsetW = this.background.width - this.text.width;
        var offsetH = this.background.height - this.text.height;
        switch (textPos) {
          case 1:
            x = 0;
            y = 0;
            break;
          case 2:
            x = offsetW / 2;
            y = 0;
            break;
          case 3:
            x = offsetW;
            y = 0;
            break;
          case 4:
            x = 0;
            y = offsetH / 2;
            break;
          case 6:
            x = offsetW;
            y = offsetH / 2;
            break;
          case 7:
            x = 0;
            y = offsetH;
            break;
          case 8:
            x = offsetW / 2;
            y = offsetH;
            break;
          case 9:
            x = offsetW;
            y = offsetH;
            break;
          default:
            x = offsetW / 2;
            y = offsetH / 2;
        }
        this.text.setPosition(x, y);
      }
    }, {
      key: 'value',
      get: function get$$1() {
        return this.text.text;
      },
      set: function set$$1(val) {
        if (this.text) {
          this.text.text = val;
          this.updatePosition();
        }
      }
    }]);
    return Button;
  }(InputBase);

  var DOM = function (_UIBase) {
    inherits(DOM, _UIBase);
    function DOM(options) {
      classCallCheck(this, DOM);
      var _this = possibleConstructorReturn(this, (DOM.__proto__ || Object.getPrototypeOf(DOM)).call(this));
      Object.assign(_this.setting, options);
      var html = _this.setting.html;
      var defs = _this.setting.defs;
      _this.sprite = null;
      _this._parseHTML(html, defs, false);
      return _this;
    }
    createClass(DOM, [{
      key: 'updateHTML',
      value: function updateHTML(html, defs) {
        this._parseHTML(html, defs, true);
      }
    }, {
      key: '_parseHTML',
      value: function _parseHTML(html) {
        var defs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var isUpdate = arguments[2];
        var self = this;
        var htmlHeightWidth = getHTMLWH(html);
        var width = ~~this.setting.width || htmlHeightWidth.width;
        var height = ~~this.setting.height || htmlHeightWidth.height;
        var data = '\n    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="' + width + '" height="' + height + '">\n      <foreignObject width="100%" height="100%">\n        ' + defs + '\n        <div xmlns="http://www.w3.org/1999/xhtml">' + html + '</div>\n      </foreignObject>\n    </svg>\n    ';
        var svg = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
        var reader = new FileReader();
        reader.onload = function () {
          var texture = Tiny.Texture.fromImage(this.result);
          if (isUpdate) {
            self.sprite.texture = texture;
          } else {
            self.sprite = new Tiny.Sprite(texture);
            self.addChild(self.sprite);
          }
          self.sprite.texture.on('update', function () {
            self.emit('rendered');
          });
        };
        reader.readAsDataURL(svg);
      }
    }]);
    return DOM;
  }(UIBase);
  function getHTMLWH(html) {
    var temp = document.createElement('template');
    var span = document.createElement('span');
    temp.innerHTML = html;
    document.body.appendChild(span);
    if (temp.content) {
      span.appendChild(temp.content, span.lastElementChild);
    } else {
      span.insertAdjacentHTML('beforeend', html);
    }
    span.style.position = 'absolute';
    span.style.zIndex = '-1';
    span.style.display = 'block';
    var whArray = getDomWH(span);
    var result = {
      width: whArray[0],
      height: whArray[1]
    };
    span.parentNode.removeChild(span);
    return result;
  }
  function getDomWH(elem) {
    var d = void 0;
    var dims = [elem.offsetWidth, elem.offsetHeight];
    if (!dims[0]) {
      d = elem.style;
      if (d.display === 'none') {
        d.display = 'block';
        dims = [elem.offsetWidth, elem.offsetHeight];
        d.display = 'none';
      } else if (d.display === '') {
        d.display = 'block';
        dims = [elem.offsetWidth, elem.offsetHeight];
        d.display = '';
      }
    }
    return dims;
  }

  var Label = function (_InputBase) {
    inherits(Label, _InputBase);
    function Label(options) {
      classCallCheck(this, Label);
      var _this = possibleConstructorReturn(this, (Label.__proto__ || Object.getPrototypeOf(Label)).call(this));
      _this.defaultSetting = {
        text: '',
        width: 0,
        height: 0
      };
      _this.settings = Object.assign({}, _this.defaultSetting, options || {});
      _this.render();
      return _this;
    }
    createClass(Label, [{
      key: 'render',
      value: function render() {
        var _settings = this.settings,
            text = _settings.text,
            width = _settings.width,
            height = _settings.height,
            wordWrap = _settings.wordWrap,
            breakWords = _settings.breakWords,
            wordWrapWidth = _settings.wordWrapWidth,
            others = objectWithoutProperties(_settings, ['text', 'width', 'height', 'wordWrap', 'breakWords', 'wordWrapWidth']);
        var opt = _extends({
          wordWrap: width && true || false,
          breakWords: width && true || false,
          wordWrapWidth: width
        }, others);
        this.text = new Tiny.Text(text, opt);
        if (height && width) {
          var mask = new Tiny.Graphics();
          mask.lineStyle(0);
          mask.beginFill(0xFFFFFF);
          mask.drawRect(0, 0, width, height);
          mask.endFill();
          this.mask = mask;
        }
        this.addChild(this.text);
      }
    }]);
    return Label;
  }(InputBase);

  var NinePatch = function (_UIBase) {
    inherits(NinePatch, _UIBase);
    function NinePatch(texture, width, height, scale9Grid) {
      var overlapPadding = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 1;
      classCallCheck(this, NinePatch);
      var _this = possibleConstructorReturn(this, (NinePatch.__proto__ || Object.getPrototypeOf(NinePatch)).call(this));
      _this._gridTexture = texture;
      _this._debugDraw = false;
      _this._textures = [];
      _this._gridSprites = [];
      _this._targetWidth = width || 0;
      _this._targetHeight = height || 0;
      _this._textureOrigFrame = new Tiny.Rectangle(0, 0, _this._gridTexture.width, _this._gridTexture.height);
      _this._scale9Grid = null;
      _this._overlapPadding = overlapPadding;
      _this._inited = false;
      _this.scale9Grid = scale9Grid;
      if (_this._gridTexture.baseTexture.hasLoaded) {
        _this._onGridTextureUpdate();
      } else {
        _this._gridTexture.once('update', _this._onGridTextureUpdate, _this);
      }
      return _this;
    }
    createClass(NinePatch, [{
      key: '_onGridTextureUpdate',
      value: function _onGridTextureUpdate() {
        this._init();
        this._update();
      }
    }, {
      key: '_init',
      value: function _init() {
        if (this._inited) return;
        this._inited = true;
        for (var i = 0; i < 9; i++) {
          var t = new Tiny.Texture(this._gridTexture, this._gridTexture.frame, this._gridTexture.orig, null, 0);
          this._textures.push(t);
          var child = new Tiny.Sprite(t);
          child.visible = false;
          this._gridSprites.push(child);
          this.addChild(child);
        }
      }
    }, {
      key: 'resize',
      value: function resize(width, height) {
        this._targetWidth = width;
        this._targetHeight = height;
        this._update(width, height);
      }
    }, {
      key: 'offsetFrame',
      value: function offsetFrame(index, x, y) {
        var frameX = this._textures[index].frame.x || 0;
        var frameY = this._textures[index].frame.y || 0;
        var offsetX = frameX + x;
        var offsetY = frameY + y;
        return [offsetX, offsetY];
      }
    }, {
      key: '_update',
      value: function _update() {
        if (!this._gridTexture) return;
        if (!this._gridTexture.baseTexture.hasLoaded) return;
        if (!this._inited) return;
        if (this.width < this._gridTexture.width || this.height < this._gridTexture.height) {
          console.warn('九宫格尺寸设置异常，尺寸不能小于素材尺寸');
        }
        var realWidth = Math.max(this.width, this._gridTexture.width);
        var realHeight = Math.max(this.height, this._gridTexture.height);
        var scale9Grid = this._scale9Grid;
        var w1 = scale9Grid[0];
        var w2 = Math.max(0, scale9Grid[2]);
        var w3 = Math.max(0, this._gridTexture.width - w1 - w2);
        var h1 = scale9Grid[1];
        var h2 = Math.max(0, scale9Grid[3]);
        var h3 = Math.max(0, this._gridTexture.height - h1 - h2);
        var wArr = [w1, w2, w3];
        var xArr = [0, w1, w1 + w2];
        var hArr = [h1, h2, h3];
        var yArr = [0, h1, h1 + h2];
        var overlapPadding = this.overlapPadding;
        for (var row = 0; row < 3; row++) {
          for (var col = 0; col < 3; col++) {
            var i = row * 3 + col;
            var child = this._gridSprites[i];
            var frame = new (Function.prototype.bind.apply(Tiny.Rectangle, [null].concat(toConsumableArray(this.offsetFrame(i, xArr[col], yArr[row])), [wArr[col], hArr[row]])))();
            if (frame.width > 0 && frame.height > 0) {
              var w = col === 0 || col === 2 ? wArr[col] : Math.max(0, realWidth - wArr[0] - wArr[2]);
              var h = row === 0 || row === 2 ? hArr[row] : Math.max(0, realHeight - hArr[0] - hArr[2]);
              var x = col === 0 ? 0 : col === 1 ? wArr[0] : Math.max(0, realWidth - wArr[2]);
              var y = row === 0 ? 0 : row === 1 ? hArr[0] : Math.max(0, realHeight - hArr[2]);
              if (w > 0 && h > 0) {
                this._textures[i].frame = frame;
                child.anchor.set(0, 0);
                child.x = x - col * overlapPadding;
                child.y = y - row * overlapPadding;
                child.alpha = this._debugDraw ? 0.1 + i * 0.05 : 1;
                child.width = w;
                child.height = h;
                child.visible = true;
              } else {
                child.visible = false;
              }
            } else {
              child.visible = false;
            }
          }
        }
        this.emit('resize');
      }
    }, {
      key: 'debug',
      get: function get$$1() {
        return this._debugDraw;
      },
      set: function set$$1(value) {
        this._debugDraw = value;
        this._update();
      }
    }, {
      key: 'scale9Grid',
      get: function get$$1() {
        return this._scale9Grid;
      },
      set: function set$$1(value) {
        if (value) {
          var newGrid = typeof value === 'string' ? value.split(',') : value;
          if (newGrid.length !== 4) {
            console.error('error scale9Grid format', value);
            return;
          }
          newGrid = newGrid.map(function (e) {
            return parseFloat(e);
          });
          this._scale9Grid = newGrid;
        } else {
          this._scale9Grid = [0, 0, 0, 0];
        }
        this._update();
      }
    }, {
      key: 'width',
      get: function get$$1() {
        return this._targetWidth || this._gridTexture.width;
      },
      set: function set$$1(value) {
        this._targetWidth = value;
        this._update();
      }
    }, {
      key: 'height',
      get: function get$$1() {
        return this._targetHeight || this._gridTexture.height;
      },
      set: function set$$1(value) {
        this._targetHeight = value;
        this._update();
      }
    }, {
      key: 'overlapPadding',
      get: function get$$1() {
        return this._overlapPadding;
      },
      set: function set$$1(value) {
        this._overlapPadding = +value || 0;
        this._update();
      }
    }]);
    return NinePatch;
  }(UIBase);

  var Alert = function (_InputBase) {
    inherits(Alert, _InputBase);
    function Alert(app, buttonText) {
      classCallCheck(this, Alert);
      var _this = possibleConstructorReturn(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this));
      _this.stage = app && app.stage || null;
      _this.buttonText = buttonText || '关闭';
      _this.DPI = Tiny.config.dpi;
      _this.PADDING = 40 * _this.DPI;
      _this.CONTENT_FONTSIZE = 16 * _this.DPI;
      _this.BTN_FONTSIZE = 14 * _this.DPI;
      _this.MIN_HEIGHT = 50 * _this.DPI;
      _this.MAX_WIDTH = Tiny.WIN_SIZE.width * 0.8;
      return _this;
    }
    createClass(Alert, [{
      key: 'render',
      value: function render(text) {
        this.removeChildren(0, this.children.length);
        this.label = this.drawLabel(text);
        this.roundRect = this.drawRoundRect();
        this.btn = this.drawButton();
        this.updatePosition();
      }
    }, {
      key: 'drawLabel',
      value: function drawLabel(text) {
        var label = new Label({
          text: text,
          fill: '0x333333',
          fontSize: this.CONTENT_FONTSIZE,
          width: this.MAX_WIDTH - this.PADDING
        });
        this.addChild(label);
        return label;
      }
    }, {
      key: 'drawRoundRect',
      value: function drawRoundRect() {
        var _getLocalBounds = this.getLocalBounds(),
            height = _getLocalBounds.height;
        var finalHeight = height > this.MIN_HEIGHT && height + this.PADDING || this.MIN_HEIGHT + this.PADDING;
        var baseTexture = Tiny.BaseTexture.from(this.setting.roundRectBase64_white);
        var texture = new Tiny.Texture(baseTexture);
        var sprite = new NinePatch(texture, this.MAX_WIDTH, finalHeight, [10, 10, 1, 1]);
        Tiny.BaseTexture.removeFromCache(baseTexture);
        this.addChild(sprite);
        return sprite;
      }
    }, {
      key: 'drawButton',
      value: function drawButton() {
        var _this2 = this;
        var btn = new Button({
          text: this.buttonText,
          textStyle: {
            fill: '0x108EE9',
            fontSize: this.BTN_FONTSIZE
          },
          active: {
            opacity: 0.5,
            callback: function callback() {
              _this2.stage && _this2.stage.removeChild(_this2);
              _this2.callback && _this2.callback();
            }
          }
        });
        this.addChild(btn);
        return btn;
      }
    }, {
      key: 'updatePosition',
      value: function updatePosition() {
        var _roundRect = this.roundRect,
            width = _roundRect.width,
            height = _roundRect.height;
        var win = Tiny.WIN_SIZE;
        this.btn.setPosition(this.MAX_WIDTH - this.btn.width, height - this.btn.height);
        this.label.setPosition(this.MAX_WIDTH / 2 - this.label.width / 2, height / 2 - this.label.height / 2 - 5 * this.DPI);
        this.setChildIndex(this.label, 1);
        this.setPosition(win.width / 2 - width / 2, win.height / 2 - height / 2);
      }
    }, {
      key: 'alert',
      value: function alert(text, callback) {
        if (this.stage) {
          this.stage.removeChild(this);
          this.render(text);
          this.stage.addChild(this);
          this.callback = callback;
        }
      }
    }]);
    return Alert;
  }(InputBase);

  var Toast = function (_InputBase) {
    inherits(Toast, _InputBase);
    function Toast(app, autoHideTime) {
      classCallCheck(this, Toast);
      var _this = possibleConstructorReturn(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this));
      _this.stage = app && app.stage || null;
      _this.autoHideTime = autoHideTime || 2000;
      _this.DPI = Tiny.config.dpi;
      _this.PADDING = 20 * _this.DPI;
      _this.CONTENT_FONTSIZE = 16 * _this.DPI;
      _this.MIN_HEIGHT = 20 * _this.DPI;
      _this.MAX_WIDTH = Tiny.WIN_SIZE.width * 0.4;
      _this.MIN_WIDTH = Tiny.WIN_SIZE.width * 0.3;
      _this.bindEvent();
      return _this;
    }
    createClass(Toast, [{
      key: 'bindEvent',
      value: function bindEvent() {
        var _this2 = this;
        this.on('pointerdown', function (e) {
          _this2.stage && _this2.stage.removeChild(_this2);
        });
      }
    }, {
      key: 'render',
      value: function render(text) {
        this.removeChildren(0, this.children.length);
        this.label = this.drawLabel(text);
        this.roundRect = this.drawRoundRect();
        this.updatePosition();
      }
    }, {
      key: 'drawLabel',
      value: function drawLabel(text) {
        var label = new Label({
          text: text,
          fill: '0xffffff',
          fontSize: this.CONTENT_FONTSIZE,
          width: this.MAX_WIDTH
        });
        this.addChild(label);
        return label;
      }
    }, {
      key: 'drawRoundRect',
      value: function drawRoundRect() {
        var _getLocalBounds = this.getLocalBounds(),
            width = _getLocalBounds.width,
            height = _getLocalBounds.height;
        var finalHeight = height > this.MIN_HEIGHT && height + this.PADDING || this.MIN_HEIGHT + this.PADDING;
        var finalWidth = this.PADDING;
        if (width > this.MAX_WIDTH) {
          finalWidth += this.MAX_WIDTH;
        } else if (width < this.MIN_WIDTH) {
          finalWidth += this.MIN_WIDTH;
        } else {
          finalWidth += width;
        }
        var sprite = new NinePatch(Tiny.Sprite.fromImage(this.setting.roundRectBase64_black75).texture, finalWidth, finalHeight, [10, 10, 1, 1], 0);
        this.addChild(sprite);
        return sprite;
      }
    }, {
      key: 'updatePosition',
      value: function updatePosition() {
        var _roundRect = this.roundRect,
            width = _roundRect.width,
            height = _roundRect.height;
        var win = Tiny.WIN_SIZE;
        this.label.setPosition(width / 2 - this.label.width / 2, height / 2 - this.label.height / 2);
        this.setChildIndex(this.label, 1);
        this.setPosition(win.width / 2 - width / 2, win.height / 2 - height / 2);
      }
    }, {
      key: 'show',
      value: function show(text) {
        var _this3 = this;
        if (this.stage) {
          this.stage.removeChild(this);
          this.render(text);
          this.stage.addChild(this);
          var cd = new Tiny.ticker.CountDown({
            duration: this.autoHideTime,
            times: 1
          });
          cd.on('complete', function (t) {
            _this3.stage.children.length && _this3.stage.removeChild(_this3);
            cd.destroy();
          });
          cd.start();
        }
      }
    }]);
    return Toast;
  }(InputBase);

  var ImageNumber = function () {
    function ImageNumber(matchup) {
      classCallCheck(this, ImageNumber);
      this.matchup = matchup;
    }
    createClass(ImageNumber, [{
      key: 'create',
      value: function create() {
        var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Tiny.Container();
        var arr = string.split('');
        var matchup = this.matchup;
        var totalWidth = 0;
        arr.forEach(function (item) {
          var texture = matchup[item];
          if (texture) {
            var sprite = new Tiny.Sprite(matchup[item]);
            var width = texture.width;
            sprite.setPositionX(totalWidth);
            totalWidth += width;
            container.addChild(sprite);
          }
        });
        this.container = container;
        return container;
      }
    }, {
      key: 'update',
      value: function update() {
        var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var container = arguments[1];
        if (!container) {
          if (this.container) {
            container = this.container;
          } else {
            container = new Tiny.Container();
          }
        }
        container.removeChildren();
        this.create.call(this, string, container);
        return container;
      }
    }]);
    return ImageNumber;
  }();

  var TiledText = function () {
    function TiledText(container, style, canvas) {
      var num = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 30;
      classCallCheck(this, TiledText);
      this.texts = Array.apply(null, Array(num)).map(function () {
        return ' ';
      });
      this.container = container;
      this.length = num;
      this.count = 0;
      this.sprites = [];
      this.textInstance = new Tiny.Text(this.texts.join('\n'), style, canvas);
      this.textInstance.setPositionX(Tiny.WIN_SIZE.width);
      this.textInstance.renderable = false;
      container.addChild(this.textInstance);
    }
    createClass(TiledText, [{
      key: 'create',
      value: function create(text) {
        var _this = this;
        var count = this.count,
            length = this.length;
        if (count > length) {
          throw new RangeError('\u4F60\u521B\u5EFA\u7684\u4E2A\u6570\u5DF2\u8D85\u8FC7\u9884\u8BBE\u503C\uFF1A' + length);
        }
        this.count++;
        this.texts[count] = text;
        var texture = this._generateTexture(text, count);
        var sprite = new Tiny.Sprite(texture);
        this.sprites.push(sprite);
        this._update();
        sprite.textIndex = count;
        sprite.updateText = function (text) {
          _this._updateText(text, sprite);
          _this._update();
        };
        return sprite;
      }
    }, {
      key: '_update',
      value: function _update() {
        this.sprites.forEach(function (sprite) {
          sprite.texture._updateUvs();
        });
      }
    }, {
      key: '_generateTexture',
      value: function _generateTexture(text, count) {
        var length = this.length,
            textInstance = this.textInstance;
        textInstance.text = this.texts.join('\n');
        var baseTexture = textInstance.texture.baseTexture;
        var width = textInstance.width,
            height = textInstance.height;
        var lineHeight = height / length;
        var y = lineHeight * count;
        var texture = new Tiny.Texture(baseTexture, new Tiny.Rectangle(0, y, width, lineHeight));
        return texture;
      }
    }, {
      key: '_updateText',
      value: function _updateText(text, sprite) {
        var textIndex = sprite.textIndex;
        this.texts[textIndex] = text;
        var newTexture = this._generateTexture(text, textIndex);
        sprite.texture = newTexture;
      }
    }]);
    return TiledText;
  }();

  var InlineItems = function (_Tiny$Container) {
    inherits(InlineItems, _Tiny$Container);
    function InlineItems(options) {
      classCallCheck(this, InlineItems);
      var _this = possibleConstructorReturn(this, (InlineItems.__proto__ || Object.getPrototypeOf(InlineItems)).call(this));
      options = options || {};
      _this.itemsAlign = options.itemsAlign || 'middle';
      _this.items = [];
      _this.spliceItems(0, 0, options.items);
      return _this;
    }
    createClass(InlineItems, [{
      key: 'layout',
      value: function layout() {
        var _this2 = this;
        var maxHeight = this.maxHeight;
        this.items.reduce(function (preX, curItem) {
          var displayObj = curItem.displayObj;
          var y = 0;
          var x = preX + (Number(curItem.leftMargin) || 0);
          switch (_this2.itemsAlign) {
            case 'top':
              break;
            case 'bottom':
              y = maxHeight - displayObj.height;
              break;
            default:
              y = (maxHeight - displayObj.height) / 2;
              break;
          }
          displayObj.setPosition(x, y);
          return x + displayObj.width + (Number(curItem.rightMargin) || 0);
        }, 0);
      }
    }, {
      key: 'deleteItem',
      value: function deleteItem(displayObj) {
        var index = this.items.findIndex(function (item) {
          return item.displayObj === displayObj;
        });
        if (index !== -1) {
          this.items.splice(index, 1);
          this.removeChild(displayObj);
          this.layout();
        }
      }
    }, {
      key: 'spliceItems',
      value: function spliceItems(index, deleteCount, items) {
        var _this3 = this,
            _items2;
        var _items = (items || []).filter(function (item) {
          var displayObj = item.displayObj;
          if (displayObj instanceof Tiny.DisplayObject) {
            _this3.addChild(displayObj);
            return true;
          } else {
            return false;
          }
        });
        var deleteItems = (_items2 = this.items).splice.apply(_items2, [index, deleteCount].concat(toConsumableArray(_items)));
        deleteItems.forEach(function (item) {
          _this3.removeChild(item.displayObj);
        });
        this.layout();
      }
    }, {
      key: 'maxHeight',
      get: function get$$1() {
        var height = 0;
        this.items.forEach(function (item) {
          if (item.displayObj.height > height) {
            height = item.displayObj.height;
          }
        });
        return height;
      }
    }]);
    return InlineItems;
  }(Tiny.Container);

  /**
   * ui - Tiny.js UI plugin
   *
   * @name        tinyjs-plugin-ui
   * @overview    Tiny.js UI plugin
   * @author      yiiqii
   * @license     MIT
   */

  exports.Button = Button;
  exports.DOM = DOM;
  exports.Label = Label;
  exports.Alert = Alert;
  exports.NinePatch = NinePatch;
  exports.Toast = Toast;
  exports.ImageNumber = ImageNumber;
  exports.TiledText = TiledText;
  exports.InlineItems = InlineItems;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
