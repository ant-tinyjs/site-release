/*!
 * Name: tinyjs-plugin-spine
 * Description: Spine implementation for TinyJS
 * Author: yiiqii
 * Version: v1.0.2
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Tiny = global.Tiny || {}, global.Tiny.spine = {})));
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

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
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

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var Color = function () {
    function Color() {
      var r = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var g = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var b = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var a = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      classCallCheck(this, Color);
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a;
    }
    createClass(Color, [{
      key: 'set',
      value: function set$$1(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
        this.clamp();
        return this;
      }
    }, {
      key: 'setFromColor',
      value: function setFromColor(c) {
        this.r = c.r;
        this.g = c.g;
        this.b = c.b;
        this.a = c.a;
        return this;
      }
    }, {
      key: 'setFromString',
      value: function setFromString(hex) {
        hex = hex.charAt(0) === '#' ? hex.substr(1) : hex;
        this.r = parseInt(hex.substr(0, 2), 16) / 255.0;
        this.g = parseInt(hex.substr(2, 2), 16) / 255.0;
        this.b = parseInt(hex.substr(4, 2), 16) / 255.0;
        this.a = (hex.length !== 8 ? 255 : parseInt(hex.substr(6, 2), 16)) / 255.0;
        return this;
      }
    }, {
      key: 'add',
      value: function add(r, g, b, a) {
        this.r += r;
        this.g += g;
        this.b += b;
        this.a += a;
        this.clamp();
        return this;
      }
    }, {
      key: 'clamp',
      value: function clamp() {
        if (this.r < 0) this.r = 0;else if (this.r > 1) this.r = 1;
        if (this.g < 0) this.g = 0;else if (this.g > 1) this.g = 1;
        if (this.b < 0) this.b = 0;else if (this.b > 1) this.b = 1;
        if (this.a < 0) this.a = 0;else if (this.a > 1) this.a = 1;
        return this;
      }
    }], [{
      key: 'rgba8888ToColor',
      value: function rgba8888ToColor(color, value) {
        color.r = ((value & 0xff000000) >>> 24) / 255;
        color.g = ((value & 0x00ff0000) >>> 16) / 255;
        color.b = ((value & 0x0000ff00) >>> 8) / 255;
        color.a = (value & 0x000000ff) / 255;
      }
    }, {
      key: 'rgb888ToColor',
      value: function rgb888ToColor(color, value) {
        color.r = ((value & 0x00ff0000) >>> 16) / 255;
        color.g = ((value & 0x0000ff00) >>> 8) / 255;
        color.b = (value & 0x000000ff) / 255;
      }
    }]);
    return Color;
  }();
  Color.WHITE = new Color(1, 1, 1, 1);
  Color.RED = new Color(1, 0, 0, 1);
  Color.GREEN = new Color(0, 1, 0, 1);
  Color.BLUE = new Color(0, 0, 1, 1);
  Color.MAGENTA = new Color(1, 0, 1, 1);

  var PI = 3.1415927;
  var PI2 = PI * 2;
  var radians2Degrees = 180 / PI;
  var radDeg = radians2Degrees;
  var degrees2Radians = PI / 180;
  var degRad = degrees2Radians;
  Math.fround = Math.fround || function (array) {
    return function (x) {
      array[0] = x;
      return array[0];
    };
  }(new Float32Array(1));
  function clamp(value, min, max) {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  }
  function cosDeg(degrees) {
    return Math.cos(degrees * degRad);
  }
  function sinDeg(degrees) {
    return Math.sin(degrees * degRad);
  }
  function signum(value) {
    return value > 0 ? 1 : value < 0 ? -1 : 0;
  }
  function toInt(x) {
    return x > 0 ? Math.floor(x) : Math.ceil(x);
  }
  function cbrt(x) {
    var y = Math.pow(Math.abs(x), 1 / 3);
    return x < 0 ? -y : y;
  }
  function randomTriangular(min, max) {
    return randomTriangularWith(min, max, (min + max) * 0.5);
  }
  function randomTriangularWith(min, max, mode) {
    var u = Math.random();
    var d = max - min;
    if (u <= (mode - min) / d) {
      return min + Math.sqrt(u * d * (mode - min));
    }
    return max - Math.sqrt((1 - u) * d * (max - mode));
  }

  var Vector2 = function () {
    function Vector2() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      classCallCheck(this, Vector2);
      this.x = x;
      this.y = y;
    }
    createClass(Vector2, [{
      key: "set",
      value: function set$$1(x, y) {
        this.x = x;
        this.y = y;
        return this;
      }
    }, {
      key: "length",
      value: function length() {
        var x = this.x;
        var y = this.y;
        return Math.sqrt(x * x + y * y);
      }
    }, {
      key: "normalize",
      value: function normalize() {
        var len = this.length();
        if (len !== 0) {
          this.x /= len;
          this.y /= len;
        }
        return this;
      }
    }]);
    return Vector2;
  }();

  var Vector3 = function () {
    function Vector3() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var z = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      classCallCheck(this, Vector3);
      this.x = x;
      this.y = y;
      this.z = z;
    }
    createClass(Vector3, [{
      key: "setFrom",
      value: function setFrom(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
        return this;
      }
    }, {
      key: "set",
      value: function set$$1(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
      }
    }, {
      key: "add",
      value: function add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        return this;
      }
    }, {
      key: "sub",
      value: function sub(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        return this;
      }
    }, {
      key: "scale",
      value: function scale(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
      }
    }, {
      key: "normalize",
      value: function normalize() {
        var len = this.length();
        if (len === 0) return this;
        len = 1 / len;
        this.x *= len;
        this.y *= len;
        this.z *= len;
        return this;
      }
    }, {
      key: "cross",
      value: function cross(v) {
        return this.set(this.y * v.z - this.z * v.y, this.z * v.x - this.x * v.z, this.x * v.y - this.y * v.x);
      }
    }, {
      key: "dot",
      value: function dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
      }
    }, {
      key: "length",
      value: function length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
      }
    }, {
      key: "distance",
      value: function distance(v) {
        var a = v.x - this.x;
        var b = v.y - this.y;
        var c = v.z - this.z;
        return Math.sqrt(a * a + b * b + c * c);
      }
    }]);
    return Vector3;
  }();

  var Pool = function () {
    function Pool(instantiator) {
      classCallCheck(this, Pool);
      this.items = [];
      this.instantiator = instantiator;
    }
    createClass(Pool, [{
      key: "obtain",
      value: function obtain() {
        return this.items.length > 0 ? this.items.pop() : this.instantiator();
      }
    }, {
      key: "free",
      value: function free(item) {
        if (item.reset) {
          item.reset();
        }
        this.items.push(item);
      }
    }, {
      key: "freeAll",
      value: function freeAll(items) {
        for (var i = 0; i < items.length; i++) {
          if (items[i].reset) {
            items[i].reset();
          }
          this.items[i] = items[i];
        }
      }
    }, {
      key: "clear",
      value: function clear() {
        this.items.length = 0;
      }
    }]);
    return Pool;
  }();

  var IntSet = function () {
    function IntSet() {
      classCallCheck(this, IntSet);
      this.array = [];
    }
    createClass(IntSet, [{
      key: "add",
      value: function add(value) {
        var contains = this.contains(value);
        this.array[value | 0] = value | 0;
        return !contains;
      }
    }, {
      key: "contains",
      value: function contains(value) {
        return this.array[value | 0] !== undefined;
      }
    }, {
      key: "remove",
      value: function remove(value) {
        this.array[value | 0] = undefined;
      }
    }, {
      key: "clear",
      value: function clear() {
        this.array.length = 0;
      }
    }]);
    return IntSet;
  }();

  var Interpolation = function () {
    function Interpolation() {
      classCallCheck(this, Interpolation);
    }
    createClass(Interpolation, [{
      key: "apply",
      value: function apply(start, end, a) {
        return start + (end - start) * this.applyInternal(a);
      }
    }]);
    return Interpolation;
  }();
  var Pow = function (_Interpolation) {
    inherits(Pow, _Interpolation);
    function Pow() {
      var power = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;
      classCallCheck(this, Pow);
      var _this = possibleConstructorReturn(this, (Pow.__proto__ || Object.getPrototypeOf(Pow)).call(this));
      _this.power = power;
      return _this;
    }
    createClass(Pow, [{
      key: "applyInternal",
      value: function applyInternal(a) {
        if (a <= 0.5) {
          return Math.pow(a * 2, this.power) / 2;
        }
        return Math.pow((a - 1) * 2, this.power) / (this.power % 2 === 0 ? -2 : 2) + 1;
      }
    }]);
    return Pow;
  }(Interpolation);
  var PowOut = function (_Pow) {
    inherits(PowOut, _Pow);
    function PowOut() {
      classCallCheck(this, PowOut);
      return possibleConstructorReturn(this, (PowOut.__proto__ || Object.getPrototypeOf(PowOut)).apply(this, arguments));
    }
    createClass(PowOut, [{
      key: "applyInternal",
      value: function applyInternal(a) {
        return Math.pow(a - 1, this.power) * (this.power % 2 === 0 ? -1 : 1) + 1;
      }
    }]);
    return PowOut;
  }(Pow);

  var SUPPORTS_TYPED_ARRAYS = typeof Float32Array !== 'undefined';
  function arrayCopy(source, sourceStart, dest, destStart, numElements) {
    for (var i = sourceStart, j = destStart; i < sourceStart + numElements; i++, j++) {
      dest[j] = source[i];
    }
  }
  function setArraySize(array, size) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var oldSize = array.length;
    if (oldSize === size) {
      return array;
    }
    array.length = size;
    if (oldSize < size) {
      for (var i = oldSize; i < size; i++) {
        array[i] = value;
      }
    }
    return array;
  }
  function ensureArrayCapacity(array, size) {
    var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    if (array.length >= size) {
      return array;
    }
    return setArraySize(array, size, value);
  }
  function newArray(size, defaultValue) {
    var array = new Array(size);
    for (var i = 0; i < size; i++) {
      array[i] = defaultValue;
    }
    return array;
  }
  function newFloatArray(size) {
    if (SUPPORTS_TYPED_ARRAYS) {
      return new Float32Array(size);
    } else {
      var array = new Array(size);
      for (var i = 0; i < array.length; i++) {
        array[i] = 0;
      }
      return array;
    }
  }
  function newShortArray(size) {
    if (SUPPORTS_TYPED_ARRAYS) {
      return new Int16Array(size);
    } else {
      var array = new Array(size);
      for (var i = 0; i < array.length; i++) {
        array[i] = 0;
      }
      return array;
    }
  }
  function toFloatArray(array) {
    return SUPPORTS_TYPED_ARRAYS ? new Float32Array(array) : array;
  }
  function toSinglePrecision(value) {
    return SUPPORTS_TYPED_ARRAYS ? Math.fround(value) : value;
  }
  function webkit602BugfixHelper(alpha, blend) {}
  function contains(array, element) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === element) {
        return true;
      }
    }
    return false;
  }

  var AttachmentType = {
    Region: 0,
    BoundingBox: 1,
    Mesh: 2,
    LinkedMesh: 3,
    Path: 4,
    Point: 5,
    Clipping: 6
  };
  var Attachment = function Attachment(name) {
    classCallCheck(this, Attachment);
    if (name == null) {
      throw new Error('name cannot be null.');
    }
    this.name = name;
  };
  var VertexAttachment = function (_Attachment) {
    inherits(VertexAttachment, _Attachment);
    function VertexAttachment(name) {
      classCallCheck(this, VertexAttachment);
      var _this = possibleConstructorReturn(this, (VertexAttachment.__proto__ || Object.getPrototypeOf(VertexAttachment)).call(this, name));
      _this.id = (VertexAttachment.nextID++ & 65535) << 11;
      _this.worldVerticesLength = 0;
      _this.deformAttachment = _this;
      return _this;
    }
    createClass(VertexAttachment, [{
      key: 'computeWorldVerticesOld',
      value: function computeWorldVerticesOld(slot, worldVertices) {
        this.computeWorldVertices(slot, 0, this.worldVerticesLength, worldVertices, 0, 2);
      }
    }, {
      key: 'computeWorldVertices',
      value: function computeWorldVertices(slot, start, count, worldVertices, offset, stride) {
        count = offset + (count >> 1) * stride;
        var skeleton = slot.bone.skeleton;
        var deformArray = slot.deform;
        var vertices = this.vertices;
        var bones = this.bones;
        if (bones == null) {
          if (deformArray.length > 0) {
            vertices = deformArray;
          }
          var mat = slot.bone.matrix;
          var x = mat.tx;
          var y = mat.ty;
          var a = mat.a;
          var b = mat.c;
          var c = mat.b;
          var d = mat.d;
          for (var _v = start, w = offset; w < count; _v += 2, w += stride) {
            var vx = vertices[_v];
            var vy = vertices[_v + 1];
            worldVertices[w] = vx * a + vy * b + x;
            worldVertices[w + 1] = vx * c + vy * d + y;
          }
          return;
        }
        var v = 0;
        var skip = 0;
        for (var i = 0; i < start; i += 2) {
          var n = bones[v];
          v += n + 1;
          skip += n;
        }
        var skeletonBones = skeleton.bones;
        if (deformArray.length === 0) {
          for (var _w = offset, _b = skip * 3; _w < count; _w += stride) {
            var wx = 0;
            var wy = 0;
            var _n = bones[v++];
            _n += v;
            for (; v < _n; v++, _b += 3) {
              var _mat = skeletonBones[bones[v]].matrix;
              var _vx = vertices[_b];
              var _vy = vertices[_b + 1];
              var weight = vertices[_b + 2];
              wx += (_vx * _mat.a + _vy * _mat.c + _mat.tx) * weight;
              wy += (_vx * _mat.b + _vy * _mat.d + _mat.ty) * weight;
            }
            worldVertices[_w] = wx;
            worldVertices[_w + 1] = wy;
          }
        } else {
          var deform = deformArray;
          for (var _w2 = offset, _b2 = skip * 3, f = skip << 1; _w2 < count; _w2 += stride) {
            var _wx = 0;
            var _wy = 0;
            var _n2 = bones[v++];
            _n2 += v;
            for (; v < _n2; v++, _b2 += 3, f += 2) {
              var _mat2 = skeletonBones[bones[v]].matrix;
              var _vx2 = vertices[_b2] + deform[f];
              var _vy2 = vertices[_b2 + 1] + deform[f + 1];
              var _weight = vertices[_b2 + 2];
              _wx += (_vx2 * _mat2.a + _vy2 * _mat2.c + _mat2.tx) * _weight;
              _wy += (_vx2 * _mat2.b + _vy2 * _mat2.d + _mat2.ty) * _weight;
            }
            worldVertices[_w2] = _wx;
            worldVertices[_w2 + 1] = _wy;
          }
        }
      }
    }, {
      key: 'copyTo',
      value: function copyTo(attachment) {
        if (this.bones != null) {
          attachment.bones = new Array(this.bones.length);
          arrayCopy(this.bones, 0, attachment.bones, 0, this.bones.length);
        } else {
          attachment.bones = null;
        }
        if (this.vertices != null) {
          attachment.vertices = newFloatArray(this.vertices.length);
          arrayCopy(this.vertices, 0, attachment.vertices, 0, this.vertices.length);
        } else {
          attachment.vertices = null;
        }
        attachment.worldVerticesLength = this.worldVerticesLength;
        attachment.deformAttachment = this.deformAttachment;
      }
    }]);
    return VertexAttachment;
  }(Attachment);
  VertexAttachment.nextID = 0;

  var MixBlend = {
    setup: 0,
    first: 1,
    replace: 2,
    add: 3
  };
  var MixDirection = {
    mixIn: 0,
    mixOut: 1
  };
  var TimelineType = {
    rotate: 0,
    translate: 1,
    scale: 2,
    shear: 3,
    attachment: 4,
    color: 5,
    deform: 6,
    event: 7,
    drawOrder: 8,
    ikConstraint: 9,
    transformConstraint: 10,
    pathConstraintPosition: 11,
    pathConstraintSpacing: 12,
    pathConstraintMix: 13,
    twoColor: 14
  };
  var Animation = function () {
    function Animation(name, timelines, duration) {
      classCallCheck(this, Animation);
      if (name == null) {
        throw new Error('name cannot be null.');
      }
      if (timelines == null) {
        throw new Error('timelines cannot be null.');
      }
      this.name = name;
      this.timelines = timelines;
      this.timelineIds = [];
      for (var i = 0; i < timelines.length; i++) {
        this.timelineIds[timelines[i].getPropertyId()] = true;
      }
      this.duration = duration;
    }
    createClass(Animation, [{
      key: 'hasTimeline',
      value: function hasTimeline(id) {
        return this.timelineIds[id] === true;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, loop, events, alpha, blend, direction) {
        if (skeleton == null) {
          throw new Error('skeleton cannot be null.');
        }
        if (loop && this.duration !== 0) {
          time %= this.duration;
          if (lastTime > 0) {
            lastTime %= this.duration;
          }
        }
        var timelines = this.timelines;
        for (var i = 0, n = timelines.length; i < n; i++) {
          timelines[i].apply(skeleton, lastTime, time, events, alpha, blend, direction);
        }
      }
    }], [{
      key: 'binarySearch',
      value: function binarySearch(values, target) {
        var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
        var low = 0;
        var high = values.length / step - 2;
        if (high === 0) {
          return step;
        }
        var current = high >>> 1;
        while (true) {
          if (values[(current + 1) * step] <= target) {
            low = current + 1;
          } else {
            high = current;
          }
          if (low === high) {
            return (low + 1) * step;
          }
          current = low + high >>> 1;
        }
      }
    }, {
      key: 'linearSearch',
      value: function linearSearch(values, target, step) {
        for (var i = 0, last = values.length - step; i <= last; i += step) {
          if (values[i] > target) {
            return i;
          }
        }
        return -1;
      }
    }]);
    return Animation;
  }();
  var CurveTimeline = function () {
    function CurveTimeline(frameCount) {
      classCallCheck(this, CurveTimeline);
      if (frameCount <= 0) {
        throw new Error('frameCount must be > 0: ' + frameCount);
      }
      this.curves = newFloatArray((frameCount - 1) * CurveTimeline.BEZIER_SIZE);
    }
    createClass(CurveTimeline, [{
      key: 'getFrameCount',
      value: function getFrameCount() {
        return this.curves.length / CurveTimeline.BEZIER_SIZE + 1;
      }
    }, {
      key: 'setLinear',
      value: function setLinear(frameIndex) {
        this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.LINEAR;
      }
    }, {
      key: 'setStepped',
      value: function setStepped(frameIndex) {
        this.curves[frameIndex * CurveTimeline.BEZIER_SIZE] = CurveTimeline.STEPPED;
      }
    }, {
      key: 'getCurveType',
      value: function getCurveType(frameIndex) {
        var index = frameIndex * CurveTimeline.BEZIER_SIZE;
        if (index === this.curves.length) return CurveTimeline.LINEAR;
        var type = this.curves[index];
        if (type === CurveTimeline.LINEAR) return CurveTimeline.LINEAR;
        if (type === CurveTimeline.STEPPED) return CurveTimeline.STEPPED;
        return CurveTimeline.BEZIER;
      }
    }, {
      key: 'setCurve',
      value: function setCurve(frameIndex, cx1, cy1, cx2, cy2) {
        var tmpx = (-cx1 * 2 + cx2) * 0.03;
        var tmpy = (-cy1 * 2 + cy2) * 0.03;
        var dddfx = ((cx1 - cx2) * 3 + 1) * 0.006;
        var dddfy = ((cy1 - cy2) * 3 + 1) * 0.006;
        var ddfx = tmpx * 2 + dddfx;
        var ddfy = tmpy * 2 + dddfy;
        var dfx = cx1 * 0.3 + tmpx + dddfx * 0.16666667;
        var dfy = cy1 * 0.3 + tmpy + dddfy * 0.16666667;
        var i = frameIndex * CurveTimeline.BEZIER_SIZE;
        var curves = this.curves;
        curves[i++] = CurveTimeline.BEZIER;
        var x = dfx;
        var y = dfy;
        for (var n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
          curves[i] = x;
          curves[i + 1] = y;
          dfx += ddfx;
          dfy += ddfy;
          ddfx += dddfx;
          ddfy += dddfy;
          x += dfx;
          y += dfy;
        }
      }
    }, {
      key: 'getCurvePercent',
      value: function getCurvePercent(frameIndex, percent) {
        percent = clamp(percent, 0, 1);
        var curves = this.curves;
        var i = frameIndex * CurveTimeline.BEZIER_SIZE;
        var type = curves[i];
        if (type === CurveTimeline.LINEAR) return percent;
        if (type === CurveTimeline.STEPPED) return 0;
        i++;
        var x = 0;
        for (var start = i, n = i + CurveTimeline.BEZIER_SIZE - 1; i < n; i += 2) {
          x = curves[i];
          if (x >= percent) {
            var prevX = void 0;
            var prevY = void 0;
            if (i === start) {
              prevX = 0;
              prevY = 0;
            } else {
              prevX = curves[i - 2];
              prevY = curves[i - 1];
            }
            return prevY + (curves[i + 1] - prevY) * (percent - prevX) / (x - prevX);
          }
        }
        var y = curves[i - 1];
        return y + (1 - y) * (percent - x) / (1 - x);
      }
    }]);
    return CurveTimeline;
  }();
  CurveTimeline.LINEAR = 0;
  CurveTimeline.STEPPED = 1;
  CurveTimeline.BEZIER = 2;
  CurveTimeline.BEZIER_SIZE = 10 * 2 - 1;
  var RotateTimeline = function (_CurveTimeline) {
    inherits(RotateTimeline, _CurveTimeline);
    function RotateTimeline(frameCount) {
      classCallCheck(this, RotateTimeline);
      var _this = possibleConstructorReturn(this, (RotateTimeline.__proto__ || Object.getPrototypeOf(RotateTimeline)).call(this, frameCount));
      _this.frames = newFloatArray(frameCount << 1);
      return _this;
    }
    createClass(RotateTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.rotate << 24) + this.boneIndex;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, time, degrees) {
        frameIndex <<= 1;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + RotateTimeline.ROTATION] = degrees;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, events, alpha, blend, direction) {
        var frames = this.frames;
        var bone = skeleton.bones[this.boneIndex];
        if (!bone.active) {
          return;
        }
        if (time < frames[0]) {
          switch (blend) {
            case MixBlend.setup:
              bone.rotation = bone.data.rotation;
              return;
            case MixBlend.first:
              var _r = bone.data.rotation - bone.rotation;
              bone.rotation += (_r - (16384 - (16384.499999999996 - _r / 360 | 0)) * 360) * alpha;
          }
          return;
        }
        if (time >= frames[frames.length - RotateTimeline.ENTRIES]) {
          var _r2 = frames[frames.length + RotateTimeline.PREV_ROTATION];
          switch (blend) {
            case MixBlend.setup:
              bone.rotation = bone.data.rotation + _r2 * alpha;
              break;
            case MixBlend.first:
            case MixBlend.replace:
              _r2 += bone.data.rotation - bone.rotation;
              _r2 -= (16384 - (16384.499999999996 - _r2 / 360 | 0)) * 360;
            case MixBlend.add:
              bone.rotation += _r2 * alpha;
          }
          return;
        }
        var frame = Animation.binarySearch(frames, time, RotateTimeline.ENTRIES);
        var prevRotation = frames[frame + RotateTimeline.PREV_ROTATION];
        var frameTime = frames[frame];
        var denominator = frames[frame + RotateTimeline.PREV_TIME] - frameTime;
        var percent = this.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / denominator);
        var r = frames[frame + RotateTimeline.ROTATION] - prevRotation;
        r = prevRotation + (r - (16384 - (16384.499999999996 - r / 360 | 0)) * 360) * percent;
        switch (blend) {
          case MixBlend.setup:
            bone.rotation = bone.data.rotation + (r - (16384 - (16384.499999999996 - r / 360 | 0)) * 360) * alpha;
            break;
          case MixBlend.first:
          case MixBlend.replace:
            r += bone.data.rotation - bone.rotation;
          case MixBlend.add:
            bone.rotation += (r - (16384 - (16384.499999999996 - r / 360 | 0)) * 360) * alpha;
        }
      }
    }]);
    return RotateTimeline;
  }(CurveTimeline);
  RotateTimeline.ENTRIES = 2;
  RotateTimeline.PREV_TIME = -2;
  RotateTimeline.PREV_ROTATION = -1;
  RotateTimeline.ROTATION = 1;
  var TranslateTimeline = function (_CurveTimeline2) {
    inherits(TranslateTimeline, _CurveTimeline2);
    function TranslateTimeline(frameCount) {
      classCallCheck(this, TranslateTimeline);
      var _this2 = possibleConstructorReturn(this, (TranslateTimeline.__proto__ || Object.getPrototypeOf(TranslateTimeline)).call(this, frameCount));
      _this2.frames = newFloatArray(frameCount * TranslateTimeline.ENTRIES);
      return _this2;
    }
    createClass(TranslateTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.translate << 24) + this.boneIndex;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, time, x, y) {
        frameIndex *= TranslateTimeline.ENTRIES;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + TranslateTimeline.X] = x;
        this.frames[frameIndex + TranslateTimeline.Y] = y;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, events, alpha, blend, direction) {
        var frames = this.frames;
        var bone = skeleton.bones[this.boneIndex];
        if (!bone.active) {
          return;
        }
        if (time < frames[0]) {
          switch (blend) {
            case MixBlend.setup:
              bone.x = bone.data.x;
              bone.y = bone.data.y;
              return;
            case MixBlend.first:
              bone.x += (bone.data.x - bone.x) * alpha;
              bone.y += (bone.data.y - bone.y) * alpha;
          }
          return;
        }
        var x = 0;
        var y = 0;
        if (time >= frames[frames.length - TranslateTimeline.ENTRIES]) {
          x = frames[frames.length + TranslateTimeline.PREV_X];
          y = frames[frames.length + TranslateTimeline.PREV_Y];
        } else {
          var frame = Animation.binarySearch(frames, time, TranslateTimeline.ENTRIES);
          x = frames[frame + TranslateTimeline.PREV_X];
          y = frames[frame + TranslateTimeline.PREV_Y];
          var frameTime = frames[frame];
          var denominator = frames[frame + TranslateTimeline.PREV_TIME] - frameTime;
          var percent = this.getCurvePercent(frame / TranslateTimeline.ENTRIES - 1, 1 - (time - frameTime) / denominator);
          x += (frames[frame + TranslateTimeline.X] - x) * percent;
          y += (frames[frame + TranslateTimeline.Y] - y) * percent;
        }
        switch (blend) {
          case MixBlend.setup:
            bone.x = bone.data.x + x * alpha;
            bone.y = bone.data.y + y * alpha;
            break;
          case MixBlend.first:
          case MixBlend.replace:
            bone.x += (bone.data.x + x - bone.x) * alpha;
            bone.y += (bone.data.y + y - bone.y) * alpha;
            break;
          case MixBlend.add:
            bone.x += x * alpha;
            bone.y += y * alpha;
        }
      }
    }]);
    return TranslateTimeline;
  }(CurveTimeline);
  TranslateTimeline.ENTRIES = 3;
  TranslateTimeline.PREV_TIME = -3;
  TranslateTimeline.PREV_X = -2;
  TranslateTimeline.PREV_Y = -1;
  TranslateTimeline.X = 1;
  TranslateTimeline.Y = 2;
  var ScaleTimeline = function (_TranslateTimeline) {
    inherits(ScaleTimeline, _TranslateTimeline);
    function ScaleTimeline(frameCount) {
      classCallCheck(this, ScaleTimeline);
      return possibleConstructorReturn(this, (ScaleTimeline.__proto__ || Object.getPrototypeOf(ScaleTimeline)).call(this, frameCount));
    }
    createClass(ScaleTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.scale << 24) + this.boneIndex;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, events, alpha, blend, direction) {
        var frames = this.frames;
        var bone = skeleton.bones[this.boneIndex];
        if (!bone.active) {
          return;
        }
        if (time < frames[0]) {
          switch (blend) {
            case MixBlend.setup:
              bone.scaleX = bone.data.scaleX;
              bone.scaleY = bone.data.scaleY;
              return;
            case MixBlend.first:
              bone.scaleX += (bone.data.scaleX - bone.scaleX) * alpha;
              bone.scaleY += (bone.data.scaleY - bone.scaleY) * alpha;
          }
          return;
        }
        var x = 0;
        var y = 0;
        if (time >= frames[frames.length - ScaleTimeline.ENTRIES]) {
          x = frames[frames.length + ScaleTimeline.PREV_X] * bone.data.scaleX;
          y = frames[frames.length + ScaleTimeline.PREV_Y] * bone.data.scaleY;
        } else {
          var frame = Animation.binarySearch(frames, time, ScaleTimeline.ENTRIES);
          x = frames[frame + ScaleTimeline.PREV_X];
          y = frames[frame + ScaleTimeline.PREV_Y];
          var frameTime = frames[frame];
          var denominator = frames[frame + ScaleTimeline.PREV_TIME] - frameTime;
          var percent = this.getCurvePercent(frame / ScaleTimeline.ENTRIES - 1, 1 - (time - frameTime) / denominator);
          x = (x + (frames[frame + ScaleTimeline.X] - x) * percent) * bone.data.scaleX;
          y = (y + (frames[frame + ScaleTimeline.Y] - y) * percent) * bone.data.scaleY;
        }
        if (alpha === 1) {
          if (blend === MixBlend.add) {
            bone.scaleX += x - bone.data.scaleX;
            bone.scaleY += y - bone.data.scaleY;
          } else {
            bone.scaleX = x;
            bone.scaleY = y;
          }
        } else {
          var bx = 0;
          var by = 0;
          if (direction === MixDirection.mixOut) {
            switch (blend) {
              case MixBlend.setup:
                bx = bone.data.scaleX;
                by = bone.data.scaleY;
                bone.scaleX = bx + (Math.abs(x) * signum(bx) - bx) * alpha;
                bone.scaleY = by + (Math.abs(y) * signum(by) - by) * alpha;
                break;
              case MixBlend.first:
              case MixBlend.replace:
                bx = bone.scaleX;
                by = bone.scaleY;
                bone.scaleX = bx + (Math.abs(x) * signum(bx) - bx) * alpha;
                bone.scaleY = by + (Math.abs(y) * signum(by) - by) * alpha;
                break;
              case MixBlend.add:
                bx = bone.scaleX;
                by = bone.scaleY;
                bone.scaleX = bx + (Math.abs(x) * signum(bx) - bone.data.scaleX) * alpha;
                bone.scaleY = by + (Math.abs(y) * signum(by) - bone.data.scaleY) * alpha;
            }
          } else {
            switch (blend) {
              case MixBlend.setup:
                bx = Math.abs(bone.data.scaleX) * signum(x);
                by = Math.abs(bone.data.scaleY) * signum(y);
                bone.scaleX = bx + (x - bx) * alpha;
                bone.scaleY = by + (y - by) * alpha;
                break;
              case MixBlend.first:
              case MixBlend.replace:
                bx = Math.abs(bone.scaleX) * signum(x);
                by = Math.abs(bone.scaleY) * signum(y);
                bone.scaleX = bx + (x - bx) * alpha;
                bone.scaleY = by + (y - by) * alpha;
                break;
              case MixBlend.add:
                bx = signum(x);
                by = signum(y);
                bone.scaleX = Math.abs(bone.scaleX) * bx + (x - Math.abs(bone.data.scaleX) * bx) * alpha;
                bone.scaleY = Math.abs(bone.scaleY) * by + (y - Math.abs(bone.data.scaleY) * by) * alpha;
            }
          }
        }
      }
    }]);
    return ScaleTimeline;
  }(TranslateTimeline);
  var ShearTimeline = function (_TranslateTimeline2) {
    inherits(ShearTimeline, _TranslateTimeline2);
    function ShearTimeline(frameCount) {
      classCallCheck(this, ShearTimeline);
      return possibleConstructorReturn(this, (ShearTimeline.__proto__ || Object.getPrototypeOf(ShearTimeline)).call(this, frameCount));
    }
    createClass(ShearTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.shear << 24) + this.boneIndex;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, events, alpha, blend, direction) {
        var frames = this.frames;
        var bone = skeleton.bones[this.boneIndex];
        if (!bone.active) {
          return;
        }
        if (time < frames[0]) {
          switch (blend) {
            case MixBlend.setup:
              bone.shearX = bone.data.shearX;
              bone.shearY = bone.data.shearY;
              return;
            case MixBlend.first:
              bone.shearX += (bone.data.shearX - bone.shearX) * alpha;
              bone.shearY += (bone.data.shearY - bone.shearY) * alpha;
          }
          return;
        }
        var x = 0;
        var y = 0;
        if (time >= frames[frames.length - ShearTimeline.ENTRIES]) {
          x = frames[frames.length + ShearTimeline.PREV_X];
          y = frames[frames.length + ShearTimeline.PREV_Y];
        } else {
          var frame = Animation.binarySearch(frames, time, ShearTimeline.ENTRIES);
          x = frames[frame + ShearTimeline.PREV_X];
          y = frames[frame + ShearTimeline.PREV_Y];
          var frameTime = frames[frame];
          var denominator = frames[frame + ShearTimeline.PREV_TIME] - frameTime;
          var percent = this.getCurvePercent(frame / ShearTimeline.ENTRIES - 1, 1 - (time - frameTime) / denominator);
          x = x + (frames[frame + ShearTimeline.X] - x) * percent;
          y = y + (frames[frame + ShearTimeline.Y] - y) * percent;
        }
        switch (blend) {
          case MixBlend.setup:
            bone.shearX = bone.data.shearX + x * alpha;
            bone.shearY = bone.data.shearY + y * alpha;
            break;
          case MixBlend.first:
          case MixBlend.replace:
            bone.shearX += (bone.data.shearX + x - bone.shearX) * alpha;
            bone.shearY += (bone.data.shearY + y - bone.shearY) * alpha;
            break;
          case MixBlend.add:
            bone.shearX += x * alpha;
            bone.shearY += y * alpha;
        }
      }
    }]);
    return ShearTimeline;
  }(TranslateTimeline);
  var ColorTimeline = function (_CurveTimeline3) {
    inherits(ColorTimeline, _CurveTimeline3);
    function ColorTimeline(frameCount) {
      classCallCheck(this, ColorTimeline);
      var _this5 = possibleConstructorReturn(this, (ColorTimeline.__proto__ || Object.getPrototypeOf(ColorTimeline)).call(this, frameCount));
      _this5.frames = newFloatArray(frameCount * ColorTimeline.ENTRIES);
      return _this5;
    }
    createClass(ColorTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.color << 24) + this.slotIndex;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, time, r, g, b, a) {
        frameIndex *= ColorTimeline.ENTRIES;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + ColorTimeline.R] = r;
        this.frames[frameIndex + ColorTimeline.G] = g;
        this.frames[frameIndex + ColorTimeline.B] = b;
        this.frames[frameIndex + ColorTimeline.A] = a;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, events, alpha, blend, direction) {
        var slot = skeleton.slots[this.slotIndex];
        if (!slot.bone.active) {
          return;
        }
        var frames = this.frames;
        if (time < frames[0]) {
          switch (blend) {
            case MixBlend.setup:
              slot.color.setFromColor(slot.data.color);
              return;
            case MixBlend.first:
              var color = slot.color;
              var setup = slot.data.color;
              color.add((setup.r - color.r) * alpha, (setup.g - color.g) * alpha, (setup.b - color.b) * alpha, (setup.a - color.a) * alpha);
          }
          return;
        }
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        if (time >= frames[frames.length - ColorTimeline.ENTRIES]) {
          var i = frames.length;
          r = frames[i + ColorTimeline.PREV_R];
          g = frames[i + ColorTimeline.PREV_G];
          b = frames[i + ColorTimeline.PREV_B];
          a = frames[i + ColorTimeline.PREV_A];
        } else {
          var frame = Animation.binarySearch(frames, time, ColorTimeline.ENTRIES);
          r = frames[frame + ColorTimeline.PREV_R];
          g = frames[frame + ColorTimeline.PREV_G];
          b = frames[frame + ColorTimeline.PREV_B];
          a = frames[frame + ColorTimeline.PREV_A];
          var frameTime = frames[frame];
          var denominator = frames[frame + ColorTimeline.PREV_TIME] - frameTime;
          var percent = this.getCurvePercent(frame / ColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / denominator);
          r += (frames[frame + ColorTimeline.R] - r) * percent;
          g += (frames[frame + ColorTimeline.G] - g) * percent;
          b += (frames[frame + ColorTimeline.B] - b) * percent;
          a += (frames[frame + ColorTimeline.A] - a) * percent;
        }
        if (alpha === 1) {
          slot.color.set(r, g, b, a);
        } else {
          var _color = slot.color;
          if (blend === MixBlend.setup) {
            _color.setFromColor(slot.data.color);
          }
          _color.add((r - _color.r) * alpha, (g - _color.g) * alpha, (b - _color.b) * alpha, (a - _color.a) * alpha);
        }
      }
    }]);
    return ColorTimeline;
  }(CurveTimeline);
  ColorTimeline.ENTRIES = 5;
  ColorTimeline.PREV_TIME = -5;
  ColorTimeline.PREV_R = -4;
  ColorTimeline.PREV_G = -3;
  ColorTimeline.PREV_B = -2;
  ColorTimeline.PREV_A = -1;
  ColorTimeline.R = 1;
  ColorTimeline.G = 2;
  ColorTimeline.B = 3;
  ColorTimeline.A = 4;
  var TwoColorTimeline = function (_CurveTimeline4) {
    inherits(TwoColorTimeline, _CurveTimeline4);
    function TwoColorTimeline(frameCount) {
      classCallCheck(this, TwoColorTimeline);
      var _this6 = possibleConstructorReturn(this, (TwoColorTimeline.__proto__ || Object.getPrototypeOf(TwoColorTimeline)).call(this, frameCount));
      _this6.frames = newFloatArray(frameCount * TwoColorTimeline.ENTRIES);
      return _this6;
    }
    createClass(TwoColorTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.twoColor << 24) + this.slotIndex;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, time, r, g, b, a, r2, g2, b2) {
        frameIndex *= TwoColorTimeline.ENTRIES;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + TwoColorTimeline.R] = r;
        this.frames[frameIndex + TwoColorTimeline.G] = g;
        this.frames[frameIndex + TwoColorTimeline.B] = b;
        this.frames[frameIndex + TwoColorTimeline.A] = a;
        this.frames[frameIndex + TwoColorTimeline.R2] = r2;
        this.frames[frameIndex + TwoColorTimeline.G2] = g2;
        this.frames[frameIndex + TwoColorTimeline.B2] = b2;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, events, alpha, blend, direction) {
        var slot = skeleton.slots[this.slotIndex];
        if (!slot.bone.active) {
          return;
        }
        var frames = this.frames;
        if (time < frames[0]) {
          switch (blend) {
            case MixBlend.setup:
              slot.color.setFromColor(slot.data.color);
              slot.darkColor.setFromColor(slot.data.darkColor);
              return;
            case MixBlend.first:
              var light = slot.color;
              var dark = slot.darkColor;
              var setupLight = slot.data.color;
              var setupDark = slot.data.darkColor;
              light.add((setupLight.r - light.r) * alpha, (setupLight.g - light.g) * alpha, (setupLight.b - light.b) * alpha, (setupLight.a - light.a) * alpha);
              dark.add((setupDark.r - dark.r) * alpha, (setupDark.g - dark.g) * alpha, (setupDark.b - dark.b) * alpha, 0);
          }
          return;
        }
        var r = 0;
        var g = 0;
        var b = 0;
        var a = 0;
        var r2 = 0;
        var g2 = 0;
        var b2 = 0;
        if (time >= frames[frames.length - TwoColorTimeline.ENTRIES]) {
          var i = frames.length;
          r = frames[i + TwoColorTimeline.PREV_R];
          g = frames[i + TwoColorTimeline.PREV_G];
          b = frames[i + TwoColorTimeline.PREV_B];
          a = frames[i + TwoColorTimeline.PREV_A];
          r2 = frames[i + TwoColorTimeline.PREV_R2];
          g2 = frames[i + TwoColorTimeline.PREV_G2];
          b2 = frames[i + TwoColorTimeline.PREV_B2];
        } else {
          var frame = Animation.binarySearch(frames, time, TwoColorTimeline.ENTRIES);
          r = frames[frame + TwoColorTimeline.PREV_R];
          g = frames[frame + TwoColorTimeline.PREV_G];
          b = frames[frame + TwoColorTimeline.PREV_B];
          a = frames[frame + TwoColorTimeline.PREV_A];
          r2 = frames[frame + TwoColorTimeline.PREV_R2];
          g2 = frames[frame + TwoColorTimeline.PREV_G2];
          b2 = frames[frame + TwoColorTimeline.PREV_B2];
          var frameTime = frames[frame];
          var denominator = frames[frame + TwoColorTimeline.PREV_TIME] - frameTime;
          var percent = this.getCurvePercent(frame / TwoColorTimeline.ENTRIES - 1, 1 - (time - frameTime) / denominator);
          r += (frames[frame + TwoColorTimeline.R] - r) * percent;
          g += (frames[frame + TwoColorTimeline.G] - g) * percent;
          b += (frames[frame + TwoColorTimeline.B] - b) * percent;
          a += (frames[frame + TwoColorTimeline.A] - a) * percent;
          r2 += (frames[frame + TwoColorTimeline.R2] - r2) * percent;
          g2 += (frames[frame + TwoColorTimeline.G2] - g2) * percent;
          b2 += (frames[frame + TwoColorTimeline.B2] - b2) * percent;
        }
        if (alpha === 1) {
          slot.color.set(r, g, b, a);
          slot.darkColor.set(r2, g2, b2, 1);
        } else {
          var _light = slot.color;
          var _dark = slot.darkColor;
          if (blend === MixBlend.setup) {
            _light.setFromColor(slot.data.color);
            _dark.setFromColor(slot.data.darkColor);
          }
          _light.add((r - _light.r) * alpha, (g - _light.g) * alpha, (b - _light.b) * alpha, (a - _light.a) * alpha);
          _dark.add((r2 - _dark.r) * alpha, (g2 - _dark.g) * alpha, (b2 - _dark.b) * alpha, 0);
        }
      }
    }]);
    return TwoColorTimeline;
  }(CurveTimeline);
  TwoColorTimeline.ENTRIES = 8;
  TwoColorTimeline.PREV_TIME = -8;
  TwoColorTimeline.PREV_R = -7;
  TwoColorTimeline.PREV_G = -6;
  TwoColorTimeline.PREV_B = -5;
  TwoColorTimeline.PREV_A = -4;
  TwoColorTimeline.PREV_R2 = -3;
  TwoColorTimeline.PREV_G2 = -2;
  TwoColorTimeline.PREV_B2 = -1;
  TwoColorTimeline.R = 1;
  TwoColorTimeline.G = 2;
  TwoColorTimeline.B = 3;
  TwoColorTimeline.A = 4;
  TwoColorTimeline.R2 = 5;
  TwoColorTimeline.G2 = 6;
  TwoColorTimeline.B2 = 7;
  var AttachmentTimeline = function () {
    function AttachmentTimeline(frameCount) {
      classCallCheck(this, AttachmentTimeline);
      this.frames = newFloatArray(frameCount);
      this.attachmentNames = new Array(frameCount);
    }
    createClass(AttachmentTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.attachment << 24) + this.slotIndex;
      }
    }, {
      key: 'getFrameCount',
      value: function getFrameCount() {
        return this.frames.length;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, time, attachmentName) {
        this.frames[frameIndex] = time;
        this.attachmentNames[frameIndex] = attachmentName;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, events, alpha, blend, direction) {
        var slot = skeleton.slots[this.slotIndex];
        if (!slot.bone.active) {
          return;
        }
        if (direction === MixDirection.mixOut && blend === MixBlend.setup) {
          var _attachmentName = slot.data.attachmentName;
          slot.setAttachment(_attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, _attachmentName));
          return;
        }
        var frames = this.frames;
        if (time < frames[0]) {
          if (blend === MixBlend.setup || blend === MixBlend.first) {
            var _attachmentName2 = slot.data.attachmentName;
            slot.setAttachment(_attachmentName2 == null ? null : skeleton.getAttachment(this.slotIndex, _attachmentName2));
          }
          return;
        }
        var frameIndex = 0;
        if (time >= frames[frames.length - 1]) {
          frameIndex = frames.length - 1;
        } else {
          frameIndex = Animation.binarySearch(frames, time, 1) - 1;
        }
        var attachmentName = this.attachmentNames[frameIndex];
        skeleton.slots[this.slotIndex].setAttachment(attachmentName == null ? null : skeleton.getAttachment(this.slotIndex, attachmentName));
      }
    }]);
    return AttachmentTimeline;
  }();
  var zeros = null;
  var DeformTimeline = function (_CurveTimeline5) {
    inherits(DeformTimeline, _CurveTimeline5);
    function DeformTimeline(frameCount) {
      classCallCheck(this, DeformTimeline);
      var _this7 = possibleConstructorReturn(this, (DeformTimeline.__proto__ || Object.getPrototypeOf(DeformTimeline)).call(this, frameCount));
      _this7.frames = newFloatArray(frameCount);
      _this7.frameVertices = new Array(frameCount);
      if (zeros == null) {
        zeros = newFloatArray(64);
      }
      return _this7;
    }
    createClass(DeformTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.deform << 27) + +this.attachment.id + this.slotIndex;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, time, vertices) {
        this.frames[frameIndex] = time;
        this.frameVertices[frameIndex] = vertices;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
        var slot = skeleton.slots[this.slotIndex];
        if (!slot.bone.active) {
          return;
        }
        var slotAttachment = slot.getAttachment();
        if (!(slotAttachment instanceof VertexAttachment) || !(slotAttachment.deformAttachment === this.attachment)) {
          return;
        }
        var deformArray = slot.deform;
        if (deformArray.length === 0) {
          blend = MixBlend.setup;
        }
        var frameVertices = this.frameVertices;
        var vertexCount = frameVertices[0].length;
        var frames = this.frames;
        if (time < frames[0]) {
          var vertexAttachment = slotAttachment;
          switch (blend) {
            case MixBlend.setup:
              deformArray.length = 0;
              return;
            case MixBlend.first:
              if (alpha === 1) {
                deformArray.length = 0;
                break;
              }
              var _deform = setArraySize(deformArray, vertexCount);
              if (vertexAttachment.bones == null) {
                var setupVertices = vertexAttachment.vertices;
                for (var i = 0; i < vertexCount; i++) {
                  _deform[i] += (setupVertices[i] - _deform[i]) * alpha;
                }
              } else {
                alpha = 1 - alpha;
                for (var _i = 0; _i < vertexCount; _i++) {
                  _deform[_i] *= alpha;
                }
              }
          }
          return;
        }
        var deform = setArraySize(deformArray, vertexCount);
        if (time >= frames[frames.length - 1]) {
          var lastVertices = frameVertices[frames.length - 1];
          if (alpha === 1) {
            if (blend === MixBlend.add) {
              var _vertexAttachment = slotAttachment;
              if (_vertexAttachment.bones == null) {
                var _setupVertices = _vertexAttachment.vertices;
                for (var _i2 = 0; _i2 < vertexCount; _i2++) {
                  deform[_i2] += lastVertices[_i2] - _setupVertices[_i2];
                }
              } else {
                for (var _i3 = 0; _i3 < vertexCount; _i3++) {
                  deform[_i3] += lastVertices[_i3];
                }
              }
            } else {
              arrayCopy(lastVertices, 0, deform, 0, vertexCount);
            }
          } else {
            switch (blend) {
              case MixBlend.setup:
                {
                  var _vertexAttachment3 = slotAttachment;
                  if (_vertexAttachment3.bones == null) {
                    var _setupVertices2 = _vertexAttachment3.vertices;
                    for (var _i4 = 0; _i4 < vertexCount; _i4++) {
                      var setup = _setupVertices2[_i4];
                      deform[_i4] = setup + (lastVertices[_i4] - setup) * alpha;
                    }
                  } else {
                    for (var _i5 = 0; _i5 < vertexCount; _i5++) {
                      deform[_i5] = lastVertices[_i5] * alpha;
                    }
                  }
                  break;
                }
              case MixBlend.first:
              case MixBlend.replace:
                for (var _i6 = 0; _i6 < vertexCount; _i6++) {
                  deform[_i6] += (lastVertices[_i6] - deform[_i6]) * alpha;
                }
                break;
              case MixBlend.add:
                var _vertexAttachment2 = slotAttachment;
                if (_vertexAttachment2.bones == null) {
                  var _setupVertices3 = _vertexAttachment2.vertices;
                  for (var _i7 = 0; _i7 < vertexCount; _i7++) {
                    deform[_i7] += (lastVertices[_i7] - _setupVertices3[_i7]) * alpha;
                  }
                } else {
                  for (var _i8 = 0; _i8 < vertexCount; _i8++) {
                    deform[_i8] += lastVertices[_i8] * alpha;
                  }
                }
            }
          }
          return;
        }
        var frame = Animation.binarySearch(frames, time);
        var prevVertices = frameVertices[frame - 1];
        var nextVertices = frameVertices[frame];
        var frameTime = frames[frame];
        var percent = this.getCurvePercent(frame - 1, 1 - (time - frameTime) / (frames[frame - 1] - frameTime));
        if (alpha === 1) {
          if (blend === MixBlend.add) {
            var _vertexAttachment4 = slotAttachment;
            if (_vertexAttachment4.bones == null) {
              var _setupVertices4 = _vertexAttachment4.vertices;
              for (var _i9 = 0; _i9 < vertexCount; _i9++) {
                var prev = prevVertices[_i9];
                deform[_i9] += prev + (nextVertices[_i9] - prev) * percent - _setupVertices4[_i9];
              }
            } else {
              for (var _i10 = 0; _i10 < vertexCount; _i10++) {
                var _prev = prevVertices[_i10];
                deform[_i10] += _prev + (nextVertices[_i10] - _prev) * percent;
              }
            }
          } else {
            for (var _i11 = 0; _i11 < vertexCount; _i11++) {
              var _prev2 = prevVertices[_i11];
              deform[_i11] = _prev2 + (nextVertices[_i11] - _prev2) * percent;
            }
          }
        } else {
          switch (blend) {
            case MixBlend.setup:
              {
                var _vertexAttachment6 = slotAttachment;
                if (_vertexAttachment6.bones == null) {
                  var _setupVertices5 = _vertexAttachment6.vertices;
                  for (var _i12 = 0; _i12 < vertexCount; _i12++) {
                    var _prev3 = prevVertices[_i12];
                    var _setup = _setupVertices5[_i12];
                    deform[_i12] = _setup + (_prev3 + (nextVertices[_i12] - _prev3) * percent - _setup) * alpha;
                  }
                } else {
                  for (var _i13 = 0; _i13 < vertexCount; _i13++) {
                    var _prev4 = prevVertices[_i13];
                    deform[_i13] = (_prev4 + (nextVertices[_i13] - _prev4) * percent) * alpha;
                  }
                }
                break;
              }
            case MixBlend.first:
            case MixBlend.replace:
              for (var _i14 = 0; _i14 < vertexCount; _i14++) {
                var _prev5 = prevVertices[_i14];
                deform[_i14] += (_prev5 + (nextVertices[_i14] - _prev5) * percent - deform[_i14]) * alpha;
              }
              break;
            case MixBlend.add:
              var _vertexAttachment5 = slotAttachment;
              if (_vertexAttachment5.bones == null) {
                var _setupVertices6 = _vertexAttachment5.vertices;
                for (var _i15 = 0; _i15 < vertexCount; _i15++) {
                  var _prev6 = prevVertices[_i15];
                  deform[_i15] += (_prev6 + (nextVertices[_i15] - _prev6) * percent - _setupVertices6[_i15]) * alpha;
                }
              } else {
                for (var _i16 = 0; _i16 < vertexCount; _i16++) {
                  var _prev7 = prevVertices[_i16];
                  deform[_i16] += (_prev7 + (nextVertices[_i16] - _prev7) * percent) * alpha;
                }
              }
          }
        }
      }
    }]);
    return DeformTimeline;
  }(CurveTimeline);
  var EventTimeline = function () {
    function EventTimeline(frameCount) {
      classCallCheck(this, EventTimeline);
      this.frames = newFloatArray(frameCount);
      this.events = new Array(frameCount);
    }
    createClass(EventTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return TimelineType.event << 24;
      }
    }, {
      key: 'getFrameCount',
      value: function getFrameCount() {
        return this.frames.length;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, event) {
        this.frames[frameIndex] = event.time;
        this.events[frameIndex] = event;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
        if (firedEvents == null) {
          return;
        }
        var frames = this.frames;
        var frameCount = this.frames.length;
        if (lastTime > time) {
          this.apply(skeleton, lastTime, Number.MAX_VALUE, firedEvents, alpha, blend, direction);
          lastTime = -1;
        } else if (lastTime >= frames[frameCount - 1]) {
          return;
        }
        if (time < frames[0]) {
          return;
        }
        var frame = 0;
        if (lastTime < frames[0]) {
          frame = 0;
        } else {
          frame = Animation.binarySearch(frames, lastTime);
          var frameTime = frames[frame];
          while (frame > 0) {
            if (frames[frame - 1] !== frameTime) {
              break;
            }
            frame--;
          }
        }
        for (; frame < frameCount && time >= frames[frame]; frame++) {
          firedEvents.push(this.events[frame]);
        }
      }
    }]);
    return EventTimeline;
  }();
  var DrawOrderTimeline = function () {
    function DrawOrderTimeline(frameCount) {
      classCallCheck(this, DrawOrderTimeline);
      this.frames = newFloatArray(frameCount);
      this.drawOrders = new Array(frameCount);
    }
    createClass(DrawOrderTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return TimelineType.drawOrder << 24;
      }
    }, {
      key: 'getFrameCount',
      value: function getFrameCount() {
        return this.frames.length;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, time, drawOrder) {
        this.frames[frameIndex] = time;
        this.drawOrders[frameIndex] = drawOrder;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
        var drawOrder = skeleton.drawOrder;
        var slots = skeleton.slots;
        if (direction === MixDirection.mixOut && blend === MixBlend.setup) {
          arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
          return;
        }
        var frames = this.frames;
        if (time < frames[0]) {
          if (blend === MixBlend.setup || blend === MixBlend.first) {
            arrayCopy(skeleton.slots, 0, skeleton.drawOrder, 0, skeleton.slots.length);
          }
          return;
        }
        var frame = 0;
        if (time >= frames[frames.length - 1]) {
          frame = frames.length - 1;
        } else {
          frame = Animation.binarySearch(frames, time) - 1;
        }
        var drawOrderToSetupIndex = this.drawOrders[frame];
        if (drawOrderToSetupIndex == null) {
          arrayCopy(slots, 0, drawOrder, 0, slots.length);
        } else {
          for (var i = 0, n = drawOrderToSetupIndex.length; i < n; i++) {
            drawOrder[i] = slots[drawOrderToSetupIndex[i]];
          }
        }
      }
    }]);
    return DrawOrderTimeline;
  }();
  var IKConstraintTimeline = function (_CurveTimeline6) {
    inherits(IKConstraintTimeline, _CurveTimeline6);
    function IKConstraintTimeline(frameCount) {
      classCallCheck(this, IKConstraintTimeline);
      var _this8 = possibleConstructorReturn(this, (IKConstraintTimeline.__proto__ || Object.getPrototypeOf(IKConstraintTimeline)).call(this, frameCount));
      _this8.frames = newFloatArray(frameCount * IKConstraintTimeline.ENTRIES);
      return _this8;
    }
    createClass(IKConstraintTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.ikConstraint << 24) + this.ikConstraintIndex;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, time, mix, softness, bendDirection, compress, stretch) {
        frameIndex *= IKConstraintTimeline.ENTRIES;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + IKConstraintTimeline.MIX] = mix;
        this.frames[frameIndex + IKConstraintTimeline.SOFTNESS] = softness;
        this.frames[frameIndex + IKConstraintTimeline.BEND_DIRECTION] = bendDirection;
        this.frames[frameIndex + IKConstraintTimeline.COMPRESS] = compress ? 1 : 0;
        this.frames[frameIndex + IKConstraintTimeline.STRETCH] = stretch ? 1 : 0;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
        var frames = this.frames;
        var constraint = skeleton.ikConstraints[this.ikConstraintIndex];
        if (!constraint.active) {
          return;
        }
        if (time < frames[0]) {
          switch (blend) {
            case MixBlend.setup:
              constraint.mix = constraint.data.mix;
              constraint.softness = constraint.data.softness;
              constraint.bendDirection = constraint.data.bendDirection;
              constraint.compress = constraint.data.compress;
              constraint.stretch = constraint.data.stretch;
              return;
            case MixBlend.first:
              constraint.mix += (constraint.data.mix - constraint.mix) * alpha;
              constraint.softness += (constraint.data.softness - constraint.softness) * alpha;
              constraint.bendDirection = constraint.data.bendDirection;
              constraint.compress = constraint.data.compress;
              constraint.stretch = constraint.data.stretch;
          }
          return;
        }
        if (time >= frames[frames.length - IKConstraintTimeline.ENTRIES]) {
          if (blend === MixBlend.setup) {
            constraint.mix = constraint.data.mix + (frames[frames.length + IKConstraintTimeline.PREV_MIX] - constraint.data.mix) * alpha;
            constraint.softness = constraint.data.softness + (frames[frames.length + IKConstraintTimeline.PREV_SOFTNESS] - constraint.data.softness) * alpha;
            if (direction === MixDirection.mixOut) {
              constraint.bendDirection = constraint.data.bendDirection;
              constraint.compress = constraint.data.compress;
              constraint.stretch = constraint.data.stretch;
            } else {
              constraint.bendDirection = frames[frames.length + IKConstraintTimeline.PREV_BEND_DIRECTION];
              constraint.compress = frames[frames.length + IKConstraintTimeline.PREV_COMPRESS] !== 0;
              constraint.stretch = frames[frames.length + IKConstraintTimeline.PREV_STRETCH] !== 0;
            }
          } else {
            constraint.mix += (frames[frames.length + IKConstraintTimeline.PREV_MIX] - constraint.mix) * alpha;
            constraint.softness += (frames[frames.length + IKConstraintTimeline.PREV_SOFTNESS] - constraint.softness) * alpha;
            if (direction === MixDirection.mixIn) {
              constraint.bendDirection = frames[frames.length + IKConstraintTimeline.PREV_BEND_DIRECTION];
              constraint.compress = frames[frames.length + IKConstraintTimeline.PREV_COMPRESS] !== 0;
              constraint.stretch = frames[frames.length + IKConstraintTimeline.PREV_STRETCH] !== 0;
            }
          }
          return;
        }
        var frame = Animation.binarySearch(frames, time, IKConstraintTimeline.ENTRIES);
        var mix = frames[frame + IKConstraintTimeline.PREV_MIX];
        var softness = frames[frame + IKConstraintTimeline.PREV_SOFTNESS];
        var frameTime = frames[frame];
        var denominator = frames[frame + IKConstraintTimeline.PREV_TIME] - frameTime;
        var percent = this.getCurvePercent(frame / IKConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / denominator);
        if (blend === MixBlend.setup) {
          constraint.mix = constraint.data.mix + (mix + (frames[frame + IKConstraintTimeline.MIX] - mix) * percent - constraint.data.mix) * alpha;
          constraint.softness = constraint.data.softness + (softness + (frames[frame + IKConstraintTimeline.SOFTNESS] - softness) * percent - constraint.data.softness) * alpha;
          if (direction === MixDirection.mixOut) {
            constraint.bendDirection = constraint.data.bendDirection;
            constraint.compress = constraint.data.compress;
            constraint.stretch = constraint.data.stretch;
          } else {
            constraint.bendDirection = frames[frame + IKConstraintTimeline.PREV_BEND_DIRECTION];
            constraint.compress = frames[frame + IKConstraintTimeline.PREV_COMPRESS] !== 0;
            constraint.stretch = frames[frame + IKConstraintTimeline.PREV_STRETCH] !== 0;
          }
        } else {
          constraint.mix += (mix + (frames[frame + IKConstraintTimeline.MIX] - mix) * percent - constraint.mix) * alpha;
          constraint.softness += (softness + (frames[frame + IKConstraintTimeline.SOFTNESS] - softness) * percent - constraint.softness) * alpha;
          if (direction === MixDirection.mixIn) {
            constraint.bendDirection = frames[frame + IKConstraintTimeline.PREV_BEND_DIRECTION];
            constraint.compress = frames[frame + IKConstraintTimeline.PREV_COMPRESS] !== 0;
            constraint.stretch = frames[frame + IKConstraintTimeline.PREV_STRETCH] !== 0;
          }
        }
      }
    }]);
    return IKConstraintTimeline;
  }(CurveTimeline);
  IKConstraintTimeline.ENTRIES = 6;
  IKConstraintTimeline.PREV_TIME = -6;
  IKConstraintTimeline.PREV_MIX = -5;
  IKConstraintTimeline.PREV_SOFTNESS = -4;
  IKConstraintTimeline.PREV_BEND_DIRECTION = -3;
  IKConstraintTimeline.PREV_COMPRESS = -2;
  IKConstraintTimeline.PREV_STRETCH = -1;
  IKConstraintTimeline.MIX = 1;
  IKConstraintTimeline.SOFTNESS = 2;
  IKConstraintTimeline.BEND_DIRECTION = 3;
  IKConstraintTimeline.COMPRESS = 4;
  IKConstraintTimeline.STRETCH = 5;
  var TransformConstraintTimeline = function (_CurveTimeline7) {
    inherits(TransformConstraintTimeline, _CurveTimeline7);
    function TransformConstraintTimeline(frameCount) {
      classCallCheck(this, TransformConstraintTimeline);
      var _this9 = possibleConstructorReturn(this, (TransformConstraintTimeline.__proto__ || Object.getPrototypeOf(TransformConstraintTimeline)).call(this, frameCount));
      _this9.frames = newFloatArray(frameCount * TransformConstraintTimeline.ENTRIES);
      return _this9;
    }
    createClass(TransformConstraintTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.transformConstraint << 24) + this.transformConstraintIndex;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, time, rotateMix, translateMix, scaleMix, shearMix) {
        frameIndex *= TransformConstraintTimeline.ENTRIES;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + TransformConstraintTimeline.ROTATE] = rotateMix;
        this.frames[frameIndex + TransformConstraintTimeline.TRANSLATE] = translateMix;
        this.frames[frameIndex + TransformConstraintTimeline.SCALE] = scaleMix;
        this.frames[frameIndex + TransformConstraintTimeline.SHEAR] = shearMix;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
        var frames = this.frames;
        var constraint = skeleton.transformConstraints[this.transformConstraintIndex];
        if (!constraint.active) {
          return;
        }
        if (time < frames[0]) {
          var data = constraint.data;
          switch (blend) {
            case MixBlend.setup:
              constraint.rotateMix = data.rotateMix;
              constraint.translateMix = data.translateMix;
              constraint.scaleMix = data.scaleMix;
              constraint.shearMix = data.shearMix;
              return;
            case MixBlend.first:
              constraint.rotateMix += (data.rotateMix - constraint.rotateMix) * alpha;
              constraint.translateMix += (data.translateMix - constraint.translateMix) * alpha;
              constraint.scaleMix += (data.scaleMix - constraint.scaleMix) * alpha;
              constraint.shearMix += (data.shearMix - constraint.shearMix) * alpha;
          }
          return;
        }
        var rotate = 0;
        var translate = 0;
        var scale = 0;
        var shear = 0;
        if (time >= frames[frames.length - TransformConstraintTimeline.ENTRIES]) {
          var i = frames.length;
          rotate = frames[i + TransformConstraintTimeline.PREV_ROTATE];
          translate = frames[i + TransformConstraintTimeline.PREV_TRANSLATE];
          scale = frames[i + TransformConstraintTimeline.PREV_SCALE];
          shear = frames[i + TransformConstraintTimeline.PREV_SHEAR];
        } else {
          var frame = Animation.binarySearch(frames, time, TransformConstraintTimeline.ENTRIES);
          rotate = frames[frame + TransformConstraintTimeline.PREV_ROTATE];
          translate = frames[frame + TransformConstraintTimeline.PREV_TRANSLATE];
          scale = frames[frame + TransformConstraintTimeline.PREV_SCALE];
          shear = frames[frame + TransformConstraintTimeline.PREV_SHEAR];
          var frameTime = frames[frame];
          var denominator = frames[frame + TransformConstraintTimeline.PREV_TIME] - frameTime;
          var percent = this.getCurvePercent(frame / TransformConstraintTimeline.ENTRIES - 1, 1 - (time - frameTime) / denominator);
          rotate += (frames[frame + TransformConstraintTimeline.ROTATE] - rotate) * percent;
          translate += (frames[frame + TransformConstraintTimeline.TRANSLATE] - translate) * percent;
          scale += (frames[frame + TransformConstraintTimeline.SCALE] - scale) * percent;
          shear += (frames[frame + TransformConstraintTimeline.SHEAR] - shear) * percent;
        }
        if (blend === MixBlend.setup) {
          var _data = constraint.data;
          constraint.rotateMix = _data.rotateMix + (rotate - _data.rotateMix) * alpha;
          constraint.translateMix = _data.translateMix + (translate - _data.translateMix) * alpha;
          constraint.scaleMix = _data.scaleMix + (scale - _data.scaleMix) * alpha;
          constraint.shearMix = _data.shearMix + (shear - _data.shearMix) * alpha;
        } else {
          constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
          constraint.translateMix += (translate - constraint.translateMix) * alpha;
          constraint.scaleMix += (scale - constraint.scaleMix) * alpha;
          constraint.shearMix += (shear - constraint.shearMix) * alpha;
        }
      }
    }]);
    return TransformConstraintTimeline;
  }(CurveTimeline);
  TransformConstraintTimeline.ENTRIES = 5;
  TransformConstraintTimeline.PREV_TIME = -5;
  TransformConstraintTimeline.PREV_ROTATE = -4;
  TransformConstraintTimeline.PREV_TRANSLATE = -3;
  TransformConstraintTimeline.PREV_SCALE = -2;
  TransformConstraintTimeline.PREV_SHEAR = -1;
  TransformConstraintTimeline.ROTATE = 1;
  TransformConstraintTimeline.TRANSLATE = 2;
  TransformConstraintTimeline.SCALE = 3;
  TransformConstraintTimeline.SHEAR = 4;
  var PathConstraintPositionTimeline = function (_CurveTimeline8) {
    inherits(PathConstraintPositionTimeline, _CurveTimeline8);
    function PathConstraintPositionTimeline(frameCount) {
      classCallCheck(this, PathConstraintPositionTimeline);
      var _this10 = possibleConstructorReturn(this, (PathConstraintPositionTimeline.__proto__ || Object.getPrototypeOf(PathConstraintPositionTimeline)).call(this, frameCount));
      _this10.frames = newFloatArray(frameCount * PathConstraintPositionTimeline.ENTRIES);
      return _this10;
    }
    createClass(PathConstraintPositionTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.pathConstraintPosition << 24) + this.pathConstraintIndex;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, time, value) {
        frameIndex *= PathConstraintPositionTimeline.ENTRIES;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + PathConstraintPositionTimeline.VALUE] = value;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
        var frames = this.frames;
        var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
        if (!constraint.active) {
          return;
        }
        if (time < frames[0]) {
          switch (blend) {
            case MixBlend.setup:
              constraint.position = constraint.data.position;
              return;
            case MixBlend.first:
              constraint.position += (constraint.data.position - constraint.position) * alpha;
          }
          return;
        }
        var position = 0;
        if (time >= frames[frames.length - PathConstraintPositionTimeline.ENTRIES]) {
          position = frames[frames.length + PathConstraintPositionTimeline.PREV_VALUE];
        } else {
          var frame = Animation.binarySearch(frames, time, PathConstraintPositionTimeline.ENTRIES);
          position = frames[frame + PathConstraintPositionTimeline.PREV_VALUE];
          var frameTime = frames[frame];
          var denominator = frames[frame + PathConstraintPositionTimeline.PREV_TIME] - frameTime;
          var percent = this.getCurvePercent(frame / PathConstraintPositionTimeline.ENTRIES - 1, 1 - (time - frameTime) / denominator);
          position += (frames[frame + PathConstraintPositionTimeline.VALUE] - position) * percent;
        }
        if (blend === MixBlend.setup) {
          constraint.position = constraint.data.position + (position - constraint.data.position) * alpha;
        } else {
          constraint.position += (position - constraint.position) * alpha;
        }
      }
    }]);
    return PathConstraintPositionTimeline;
  }(CurveTimeline);
  PathConstraintPositionTimeline.ENTRIES = 2;
  PathConstraintPositionTimeline.PREV_TIME = -2;
  PathConstraintPositionTimeline.PREV_VALUE = -1;
  PathConstraintPositionTimeline.VALUE = 1;
  var PathConstraintSpacingTimeline = function (_PathConstraintPositi) {
    inherits(PathConstraintSpacingTimeline, _PathConstraintPositi);
    function PathConstraintSpacingTimeline(frameCount) {
      classCallCheck(this, PathConstraintSpacingTimeline);
      return possibleConstructorReturn(this, (PathConstraintSpacingTimeline.__proto__ || Object.getPrototypeOf(PathConstraintSpacingTimeline)).call(this, frameCount));
    }
    createClass(PathConstraintSpacingTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.pathConstraintSpacing << 24) + this.pathConstraintIndex;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
        var frames = this.frames;
        var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
        if (!constraint.active) {
          return;
        }
        if (time < frames[0]) {
          switch (blend) {
            case MixBlend.setup:
              constraint.spacing = constraint.data.spacing;
              return;
            case MixBlend.first:
              constraint.spacing += (constraint.data.spacing - constraint.spacing) * alpha;
          }
          return;
        }
        var spacing = 0;
        if (time >= frames[frames.length - PathConstraintSpacingTimeline.ENTRIES]) {
          spacing = frames[frames.length + PathConstraintSpacingTimeline.PREV_VALUE];
        } else {
          var frame = Animation.binarySearch(frames, time, PathConstraintSpacingTimeline.ENTRIES);
          spacing = frames[frame + PathConstraintSpacingTimeline.PREV_VALUE];
          var frameTime = frames[frame];
          var denominator = frames[frame + PathConstraintSpacingTimeline.PREV_TIME] - frameTime;
          var percent = this.getCurvePercent(frame / PathConstraintSpacingTimeline.ENTRIES - 1, 1 - (time - frameTime) / denominator);
          spacing += (frames[frame + PathConstraintSpacingTimeline.VALUE] - spacing) * percent;
        }
        if (blend === MixBlend.setup) {
          constraint.spacing = constraint.data.spacing + (spacing - constraint.data.spacing) * alpha;
        } else {
          constraint.spacing += (spacing - constraint.spacing) * alpha;
        }
      }
    }]);
    return PathConstraintSpacingTimeline;
  }(PathConstraintPositionTimeline);
  var PathConstraintMixTimeline = function (_CurveTimeline9) {
    inherits(PathConstraintMixTimeline, _CurveTimeline9);
    function PathConstraintMixTimeline(frameCount) {
      classCallCheck(this, PathConstraintMixTimeline);
      var _this12 = possibleConstructorReturn(this, (PathConstraintMixTimeline.__proto__ || Object.getPrototypeOf(PathConstraintMixTimeline)).call(this, frameCount));
      _this12.frames = newFloatArray(frameCount * PathConstraintMixTimeline.ENTRIES);
      return _this12;
    }
    createClass(PathConstraintMixTimeline, [{
      key: 'getPropertyId',
      value: function getPropertyId() {
        return (TimelineType.pathConstraintMix << 24) + this.pathConstraintIndex;
      }
    }, {
      key: 'setFrame',
      value: function setFrame(frameIndex, time, rotateMix, translateMix) {
        frameIndex *= PathConstraintMixTimeline.ENTRIES;
        this.frames[frameIndex] = time;
        this.frames[frameIndex + PathConstraintMixTimeline.ROTATE] = rotateMix;
        this.frames[frameIndex + PathConstraintMixTimeline.TRANSLATE] = translateMix;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton, lastTime, time, firedEvents, alpha, blend, direction) {
        var frames = this.frames;
        var constraint = skeleton.pathConstraints[this.pathConstraintIndex];
        if (!constraint.active) {
          return;
        }
        if (time < frames[0]) {
          switch (blend) {
            case MixBlend.setup:
              constraint.rotateMix = constraint.data.rotateMix;
              constraint.translateMix = constraint.data.translateMix;
              return;
            case MixBlend.first:
              constraint.rotateMix += (constraint.data.rotateMix - constraint.rotateMix) * alpha;
              constraint.translateMix += (constraint.data.translateMix - constraint.translateMix) * alpha;
          }
          return;
        }
        var rotate = 0;
        var translate = 0;
        if (time >= frames[frames.length - PathConstraintMixTimeline.ENTRIES]) {
          rotate = frames[frames.length + PathConstraintMixTimeline.PREV_ROTATE];
          translate = frames[frames.length + PathConstraintMixTimeline.PREV_TRANSLATE];
        } else {
          var frame = Animation.binarySearch(frames, time, PathConstraintMixTimeline.ENTRIES);
          rotate = frames[frame + PathConstraintMixTimeline.PREV_ROTATE];
          translate = frames[frame + PathConstraintMixTimeline.PREV_TRANSLATE];
          var frameTime = frames[frame];
          var denominator = frames[frame + PathConstraintMixTimeline.PREV_TIME] - frameTime;
          var percent = this.getCurvePercent(frame / PathConstraintMixTimeline.ENTRIES - 1, 1 - (time - frameTime) / denominator);
          rotate += (frames[frame + PathConstraintMixTimeline.ROTATE] - rotate) * percent;
          translate += (frames[frame + PathConstraintMixTimeline.TRANSLATE] - translate) * percent;
        }
        if (blend === MixBlend.setup) {
          constraint.rotateMix = constraint.data.rotateMix + (rotate - constraint.data.rotateMix) * alpha;
          constraint.translateMix = constraint.data.translateMix + (translate - constraint.data.translateMix) * alpha;
        } else {
          constraint.rotateMix += (rotate - constraint.rotateMix) * alpha;
          constraint.translateMix += (translate - constraint.translateMix) * alpha;
        }
      }
    }]);
    return PathConstraintMixTimeline;
  }(CurveTimeline);
  PathConstraintMixTimeline.ENTRIES = 3;
  PathConstraintMixTimeline.PREV_TIME = -3;
  PathConstraintMixTimeline.PREV_ROTATE = -2;
  PathConstraintMixTimeline.PREV_TRANSLATE = -1;
  PathConstraintMixTimeline.ROTATE = 1;
  PathConstraintMixTimeline.TRANSLATE = 2;

  var EventType = {
    start: 0,
    interrupt: 1,
    end: 2,
    dispose: 3,
    complete: 4,
    event: 5
  };
  var AnimationState = function () {
    function AnimationState(data) {
      classCallCheck(this, AnimationState);
      this.tracks = [];
      this.timeScale = 1;
      this.events = [];
      this.listeners = [];
      this.queue = new EventQueue(this);
      this.propertyIDs = new IntSet();
      this.animationsChanged = false;
      this.trackEntryPool = new Pool(function () {
        return new TrackEntry();
      });
      this.data = data;
    }
    createClass(AnimationState, [{
      key: 'update',
      value: function update(delta) {
        delta *= this.timeScale;
        var tracks = this.tracks;
        for (var i = 0, n = tracks.length; i < n; i++) {
          var current = tracks[i];
          if (current == null) {
            continue;
          }
          current.animationLast = current.nextAnimationLast;
          current.trackLast = current.nextTrackLast;
          var currentDelta = delta * current.timeScale;
          if (current.delay > 0) {
            current.delay -= currentDelta;
            if (current.delay > 0) {
              continue;
            }
            currentDelta = -current.delay;
            current.delay = 0;
          }
          var next = current.next;
          if (next != null) {
            var nextTime = current.trackLast - next.delay;
            if (nextTime >= 0) {
              next.delay = 0;
              next.trackTime += current.timeScale === 0 ? 0 : (nextTime / current.timeScale + delta) * next.timeScale;
              current.trackTime += currentDelta;
              this.setCurrent(i, next, true);
              while (next.mixingFrom != null) {
                next.mixTime += delta;
                next = next.mixingFrom;
              }
              continue;
            }
          } else if (current.trackLast >= current.trackEnd && current.mixingFrom == null) {
            tracks[i] = null;
            this.queue.end(current);
            this.disposeNext(current);
            continue;
          }
          if (current.mixingFrom != null && this.updateMixingFrom(current, delta)) {
            var from = current.mixingFrom;
            current.mixingFrom = null;
            if (from != null) {
              from.mixingTo = null;
            }
            while (from != null) {
              this.queue.end(from);
              from = from.mixingFrom;
            }
          }
          current.trackTime += currentDelta;
        }
        this.queue.drain();
      }
    }, {
      key: 'updateMixingFrom',
      value: function updateMixingFrom(to, delta) {
        var from = to.mixingFrom;
        if (from == null) {
          return true;
        }
        var finished = this.updateMixingFrom(from, delta);
        from.animationLast = from.nextAnimationLast;
        from.trackLast = from.nextTrackLast;
        if (to.mixTime > 0 && to.mixTime >= to.mixDuration) {
          if (from.totalAlpha === 0 || to.mixDuration === 0) {
            to.mixingFrom = from.mixingFrom;
            if (from.mixingFrom != null) {
              from.mixingFrom.mixingTo = to;
            }
            to.interruptAlpha = from.interruptAlpha;
            this.queue.end(from);
          }
          return finished;
        }
        from.trackTime += delta * from.timeScale;
        to.mixTime += delta;
        return false;
      }
    }, {
      key: 'apply',
      value: function apply(skeleton) {
        if (skeleton == null) {
          throw new Error('skeleton cannot be null.');
        }
        if (this.animationsChanged) {
          this._animationsChanged();
        }
        var events = this.events;
        var tracks = this.tracks;
        var applied = false;
        for (var i = 0, n = tracks.length; i < n; i++) {
          var current = tracks[i];
          if (current == null || current.delay > 0) {
            continue;
          }
          applied = true;
          var blend = i === 0 ? MixBlend.first : current.mixBlend;
          var mix = current.alpha;
          if (current.mixingFrom != null) {
            mix *= this.applyMixingFrom(current, skeleton, blend);
          } else if (current.trackTime >= current.trackEnd && current.next == null) {
            mix = 0;
          }
          var animationLast = current.animationLast;
          var animationTime = current.getAnimationTime();
          var timelineCount = current.animation.timelines.length;
          var timelines = current.animation.timelines;
          if (i === 0 && mix === 1 || blend === MixBlend.add) {
            for (var ii = 0; ii < timelineCount; ii++) {
              timelines[ii].apply(skeleton, animationLast, animationTime, events, mix, blend, MixDirection.mixIn);
            }
          } else {
            var timelineMode = current.timelineMode;
            var firstFrame = current.timelinesRotation.length === 0;
            if (firstFrame) {
              setArraySize(current.timelinesRotation, timelineCount << 1, null);
            }
            var timelinesRotation = current.timelinesRotation;
            for (var _ii = 0; _ii < timelineCount; _ii++) {
              var timeline = timelines[_ii];
              var timelineBlend = (timelineMode[_ii] & AnimationState.NOT_LAST - 1) === AnimationState.SUBSEQUENT ? blend : MixBlend.setup;
              if (timeline instanceof RotateTimeline) {
                this.applyRotateTimeline(timeline, skeleton, animationTime, mix, timelineBlend, timelinesRotation, _ii << 1, firstFrame);
              } else {
                timeline.apply(skeleton, animationLast, animationTime, events, mix, timelineBlend, MixDirection.mixIn);
              }
            }
          }
          this.queueEvents(current, animationTime);
          events.length = 0;
          current.nextAnimationLast = animationTime;
          current.nextTrackLast = current.trackTime;
        }
        this.queue.drain();
        return applied;
      }
    }, {
      key: 'applyMixingFrom',
      value: function applyMixingFrom(to, skeleton, blend) {
        var from = to.mixingFrom;
        if (from.mixingFrom != null) {
          this.applyMixingFrom(from, skeleton, blend);
        }
        var mix = 0;
        if (to.mixDuration === 0) {
          mix = 1;
          if (blend === MixBlend.first) {
            blend = MixBlend.setup;
          }
        } else {
          mix = to.mixTime / to.mixDuration;
          if (mix > 1) {
            mix = 1;
          }
          if (blend !== MixBlend.first) {
            blend = from.mixBlend;
          }
        }
        var events = mix < from.eventThreshold ? this.events : null;
        var attachments = mix < from.attachmentThreshold;
        var drawOrder = mix < from.drawOrderThreshold;
        var animationLast = from.animationLast;
        var animationTime = from.getAnimationTime();
        var timelineCount = from.animation.timelines.length;
        var timelines = from.animation.timelines;
        var alphaHold = from.alpha * to.interruptAlpha;
        var alphaMix = alphaHold * (1 - mix);
        if (blend === MixBlend.add) {
          for (var i = 0; i < timelineCount; i++) {
            timelines[i].apply(skeleton, animationLast, animationTime, events, alphaMix, blend, MixDirection.mixOut);
          }
        } else {
          var timelineMode = from.timelineMode;
          var timelineHoldMix = from.timelineHoldMix;
          var firstFrame = from.timelinesRotation.length === 0;
          if (firstFrame) {
            setArraySize(from.timelinesRotation, timelineCount << 1, null);
          }
          var timelinesRotation = from.timelinesRotation;
          from.totalAlpha = 0;
          for (var _i = 0; _i < timelineCount; _i++) {
            var timeline = timelines[_i];
            var direction = MixDirection.mixOut;
            var timelineBlend = void 0;
            var alpha = 0;
            switch (timelineMode[_i] & AnimationState.NOT_LAST - 1) {
              case AnimationState.SUBSEQUENT:
                timelineBlend = blend;
                if (!attachments && timeline instanceof AttachmentTimeline) {
                  if ((timelineMode[_i] & AnimationState.NOT_LAST) === AnimationState.NOT_LAST) {
                    continue;
                  }
                  timelineBlend = MixBlend.setup;
                }
                if (!drawOrder && timeline instanceof DrawOrderTimeline) {
                  continue;
                }
                alpha = alphaMix;
                break;
              case AnimationState.FIRST:
                timelineBlend = MixBlend.setup;
                alpha = alphaMix;
                break;
              case AnimationState.HOLD:
                timelineBlend = MixBlend.setup;
                alpha = alphaHold;
                break;
              default:
                timelineBlend = MixBlend.setup;
                var holdMix = timelineHoldMix[_i];
                alpha = alphaHold * Math.max(0, 1 - holdMix.mixTime / holdMix.mixDuration);
                break;
            }
            from.totalAlpha += alpha;
            if (timeline instanceof RotateTimeline) {
              this.applyRotateTimeline(timeline, skeleton, animationTime, alpha, timelineBlend, timelinesRotation, _i << 1, firstFrame);
            } else {
              if (timelineBlend === MixBlend.setup) {
                if (timeline instanceof AttachmentTimeline) {
                  if (attachments || (timelineMode[_i] & AnimationState.NOT_LAST) === AnimationState.NOT_LAST) {
                    direction = MixDirection.mixIn;
                  }
                } else if (timeline instanceof DrawOrderTimeline) {
                  if (drawOrder) {
                    direction = MixDirection.mixIn;
                  }
                }
              }
              timeline.apply(skeleton, animationLast, animationTime, events, alpha, timelineBlend, direction);
            }
          }
        }
        if (to.mixDuration > 0) {
          this.queueEvents(from, animationTime);
        }
        this.events.length = 0;
        from.nextAnimationLast = animationTime;
        from.nextTrackLast = from.trackTime;
        return mix;
      }
    }, {
      key: 'applyRotateTimeline',
      value: function applyRotateTimeline(timeline, skeleton, time, alpha, blend, timelinesRotation, i, firstFrame) {
        if (firstFrame) {
          timelinesRotation[i] = 0;
        }
        if (alpha === 1) {
          timeline.apply(skeleton, 0, time, null, 1, blend, MixDirection.mixIn);
          return;
        }
        var rotateTimeline = timeline;
        var frames = rotateTimeline.frames;
        var bone = skeleton.bones[rotateTimeline.boneIndex];
        if (!bone.active) {
          return;
        }
        var r1 = 0;
        var r2 = 0;
        if (time < frames[0]) {
          switch (blend) {
            case MixBlend.setup:
              bone.rotation = bone.data.rotation;
            default:
              return;
            case MixBlend.first:
              r1 = bone.rotation;
              r2 = bone.data.rotation;
          }
        } else {
          r1 = blend === MixBlend.setup ? bone.data.rotation : bone.rotation;
          if (time >= frames[frames.length - RotateTimeline.ENTRIES]) {
            r2 = bone.data.rotation + frames[frames.length + RotateTimeline.PREV_ROTATION];
          } else {
            var frame = Animation.binarySearch(frames, time, RotateTimeline.ENTRIES);
            var prevRotation = frames[frame + RotateTimeline.PREV_ROTATION];
            var frameTime = frames[frame];
            var denominator = frames[frame + RotateTimeline.PREV_TIME] - frameTime;
            var percent = rotateTimeline.getCurvePercent((frame >> 1) - 1, 1 - (time - frameTime) / denominator);
            r2 = frames[frame + RotateTimeline.ROTATION] - prevRotation;
            r2 -= (16384 - (16384.499999999996 - r2 / 360 | 0)) * 360;
            r2 = prevRotation + r2 * percent + bone.data.rotation;
            r2 -= (16384 - (16384.499999999996 - r2 / 360 | 0)) * 360;
          }
        }
        var total = 0;
        var diff = r2 - r1;
        diff -= (16384 - (16384.499999999996 - diff / 360 | 0)) * 360;
        if (diff === 0) {
          total = timelinesRotation[i];
        } else {
          var lastTotal = 0;
          var lastDiff = 0;
          if (firstFrame) {
            lastTotal = 0;
            lastDiff = diff;
          } else {
            lastTotal = timelinesRotation[i];
            lastDiff = timelinesRotation[i + 1];
          }
          var current = diff > 0;
          var dir = lastTotal >= 0;
          if (signum(lastDiff) !== signum(diff) && Math.abs(lastDiff) <= 90) {
            if (Math.abs(lastTotal) > 180) {
              lastTotal += 360 * signum(lastTotal);
            }
            dir = current;
          }
          total = diff + lastTotal - lastTotal % 360;
          if (dir !== current) {
            total += 360 * signum(lastTotal);
          }
          timelinesRotation[i] = total;
        }
        timelinesRotation[i + 1] = diff;
        r1 += total * alpha;
        bone.rotation = r1 - (16384 - (16384.499999999996 - r1 / 360 | 0)) * 360;
      }
    }, {
      key: 'queueEvents',
      value: function queueEvents(entry, animationTime) {
        var animationStart = entry.animationStart;
        var animationEnd = entry.animationEnd;
        var duration = animationEnd - animationStart;
        var trackLastWrapped = entry.trackLast % duration;
        var events = this.events;
        var i = 0;
        var n = events.length;
        for (; i < n; i++) {
          var event = events[i];
          if (event.time < trackLastWrapped) {
            break;
          }
          if (event.time > animationEnd) {
            continue;
          }
          this.queue.event(entry, event);
        }
        var complete = false;
        if (entry.loop) {
          complete = duration === 0 || trackLastWrapped > entry.trackTime % duration;
        } else {
          complete = animationTime >= animationEnd && entry.animationLast < animationEnd;
        }
        if (complete) {
          this.queue.complete(entry);
        }
        for (; i < n; i++) {
          var _event = events[i];
          if (_event.time < animationStart) {
            continue;
          }
          this.queue.event(entry, events[i]);
        }
      }
    }, {
      key: 'clearTracks',
      value: function clearTracks() {
        var oldDrainDisabled = this.queue.drainDisabled;
        this.queue.drainDisabled = true;
        for (var i = 0, n = this.tracks.length; i < n; i++) {
          this.clearTrack(i);
        }
        this.tracks.length = 0;
        this.queue.drainDisabled = oldDrainDisabled;
        this.queue.drain();
      }
    }, {
      key: 'clearTrack',
      value: function clearTrack(trackIndex) {
        if (trackIndex >= this.tracks.length) {
          return;
        }
        var current = this.tracks[trackIndex];
        if (current == null) {
          return;
        }
        this.queue.end(current);
        this.disposeNext(current);
        var entry = current;
        while (true) {
          var from = entry.mixingFrom;
          if (from == null) {
            break;
          }
          this.queue.end(from);
          entry.mixingFrom = null;
          entry.mixingTo = null;
          entry = from;
        }
        this.tracks[current.trackIndex] = null;
        this.queue.drain();
      }
    }, {
      key: 'setCurrent',
      value: function setCurrent(index, current, interrupt) {
        var from = this.expandToIndex(index);
        this.tracks[index] = current;
        if (from != null) {
          if (interrupt) {
            this.queue.interrupt(from);
          }
          current.mixingFrom = from;
          from.mixingTo = current;
          current.mixTime = 0;
          if (from.mixingFrom != null && from.mixDuration > 0) {
            current.interruptAlpha *= Math.min(1, from.mixTime / from.mixDuration);
          }
          from.timelinesRotation.length = 0;
        }
        this.queue.start(current);
      }
    }, {
      key: 'setAnimation',
      value: function setAnimation(trackIndex, animationName, loop) {
        var animation = this.data.skeletonData.findAnimation(animationName);
        if (animation == null) {
          throw new Error('Animation not found: ' + animationName);
        }
        return this.setAnimationWith(trackIndex, animation, loop);
      }
    }, {
      key: 'setAnimationWith',
      value: function setAnimationWith(trackIndex, animation, loop) {
        if (animation == null) {
          throw new Error('animation cannot be null.');
        }
        var interrupt = true;
        var current = this.expandToIndex(trackIndex);
        if (current != null) {
          if (current.nextTrackLast === -1) {
            this.tracks[trackIndex] = current.mixingFrom;
            this.queue.interrupt(current);
            this.queue.end(current);
            this.disposeNext(current);
            current = current.mixingFrom;
            interrupt = false;
          } else {
            this.disposeNext(current);
          }
        }
        var entry = this.trackEntry(trackIndex, animation, loop, current);
        this.setCurrent(trackIndex, entry, interrupt);
        this.queue.drain();
        return entry;
      }
    }, {
      key: 'addAnimation',
      value: function addAnimation(trackIndex, animationName, loop, delay) {
        var animation = this.data.skeletonData.findAnimation(animationName);
        if (animation == null) {
          throw new Error('Animation not found: ' + animationName);
        }
        return this.addAnimationWith(trackIndex, animation, loop, delay);
      }
    }, {
      key: 'addAnimationWith',
      value: function addAnimationWith(trackIndex, animation, loop, delay) {
        if (animation == null) {
          throw new Error('animation cannot be null.');
        }
        var last = this.expandToIndex(trackIndex);
        if (last != null) {
          while (last.next != null) {
            last = last.next;
          }
        }
        var entry = this.trackEntry(trackIndex, animation, loop, last);
        if (last == null) {
          this.setCurrent(trackIndex, entry, true);
          this.queue.drain();
        } else {
          last.next = entry;
          if (delay <= 0) {
            var duration = last.animationEnd - last.animationStart;
            if (duration !== 0) {
              if (last.loop) {
                delay += duration * (1 + (last.trackTime / duration | 0));
              } else {
                delay += Math.max(duration, last.trackTime);
              }
              delay -= this.data.getMix(last.animation, animation);
            } else {
              delay = last.trackTime;
            }
          }
        }
        entry.delay = delay;
        return entry;
      }
    }, {
      key: 'setEmptyAnimation',
      value: function setEmptyAnimation(trackIndex, mixDuration) {
        var entry = this.setAnimationWith(trackIndex, AnimationState.emptyAnimation, false);
        entry.mixDuration = mixDuration;
        entry.trackEnd = mixDuration;
        return entry;
      }
    }, {
      key: 'addEmptyAnimation',
      value: function addEmptyAnimation(trackIndex, mixDuration, delay) {
        if (delay <= 0) {
          delay -= mixDuration;
        }
        var entry = this.addAnimationWith(trackIndex, AnimationState.emptyAnimation, false, delay);
        entry.mixDuration = mixDuration;
        entry.trackEnd = mixDuration;
        return entry;
      }
    }, {
      key: 'setEmptyAnimations',
      value: function setEmptyAnimations(mixDuration) {
        var oldDrainDisabled = this.queue.drainDisabled;
        this.queue.drainDisabled = true;
        for (var i = 0, n = this.tracks.length; i < n; i++) {
          var current = this.tracks[i];
          if (current != null) {
            this.setEmptyAnimation(current.trackIndex, mixDuration);
          }
        }
        this.queue.drainDisabled = oldDrainDisabled;
        this.queue.drain();
      }
    }, {
      key: 'expandToIndex',
      value: function expandToIndex(index) {
        if (index < this.tracks.length) {
          return this.tracks[index];
        }
        ensureArrayCapacity(this.tracks, index + 1, null);
        this.tracks.length = index + 1;
        return null;
      }
    }, {
      key: 'trackEntry',
      value: function trackEntry(trackIndex, animation, loop, last) {
        var entry = this.trackEntryPool.obtain();
        entry.trackIndex = trackIndex;
        entry.animation = animation;
        entry.loop = loop;
        entry.holdPrevious = false;
        entry.eventThreshold = 0;
        entry.attachmentThreshold = 0;
        entry.drawOrderThreshold = 0;
        entry.animationStart = 0;
        entry.animationEnd = animation.duration;
        entry.animationLast = -1;
        entry.nextAnimationLast = -1;
        entry.delay = 0;
        entry.trackTime = 0;
        entry.trackLast = -1;
        entry.nextTrackLast = -1;
        entry.trackEnd = Number.MAX_VALUE;
        entry.timeScale = 1;
        entry.alpha = 1;
        entry.interruptAlpha = 1;
        entry.mixTime = 0;
        entry.mixDuration = last == null ? 0 : this.data.getMix(last.animation, animation);
        entry.mixBlend = MixBlend.replace;
        return entry;
      }
    }, {
      key: 'disposeNext',
      value: function disposeNext(entry) {
        var next = entry.next;
        while (next != null) {
          this.queue.dispose(next);
          next = next.next;
        }
        entry.next = null;
      }
    }, {
      key: '_animationsChanged',
      value: function _animationsChanged() {
        this.animationsChanged = false;
        this.propertyIDs.clear();
        for (var i = 0, n = this.tracks.length; i < n; i++) {
          var entry = this.tracks[i];
          if (entry == null) {
            continue;
          }
          while (entry.mixingFrom != null) {
            entry = entry.mixingFrom;
          }
          do {
            if (entry.mixingFrom == null || entry.mixBlend !== MixBlend.add) {
              this.computeHold(entry);
            }
            entry = entry.mixingTo;
          } while (entry != null);
        }
        this.propertyIDs.clear();
        for (var _i2 = this.tracks.length - 1; _i2 >= 0; _i2--) {
          var _entry = this.tracks[_i2];
          while (_entry != null) {
            this.computeNotLast(_entry);
            _entry = _entry.mixingFrom;
          }
        }
      }
    }, {
      key: 'computeHold',
      value: function computeHold(entry) {
        var to = entry.mixingTo;
        var timelines = entry.animation.timelines;
        var timelinesCount = entry.animation.timelines.length;
        var timelineMode = setArraySize(entry.timelineMode, timelinesCount);
        entry.timelineHoldMix.length = 0;
        var timelineDipMix = setArraySize(entry.timelineHoldMix, timelinesCount);
        var propertyIDs = this.propertyIDs;
        if (to != null && to.holdPrevious) {
          for (var i = 0; i < timelinesCount; i++) {
            propertyIDs.add(timelines[i].getPropertyId());
            timelineMode[i] = AnimationState.HOLD;
          }
          return;
        }
        outer: for (var _i3 = 0; _i3 < timelinesCount; _i3++) {
          var timeline = timelines[_i3];
          var id = timeline.getPropertyId();
          if (!propertyIDs.add(id)) {
            timelineMode[_i3] = AnimationState.SUBSEQUENT;
          } else if (to == null || timeline instanceof AttachmentTimeline || timeline instanceof DrawOrderTimeline || timeline instanceof EventTimeline || !to.animation.hasTimeline(id)) {
            timelineMode[_i3] = AnimationState.FIRST;
          } else {
            for (var next = to.mixingTo; next != null; next = next.mixingTo) {
              if (next.animation.hasTimeline(id)) {
                continue;
              }
              if (entry.mixDuration > 0) {
                timelineMode[_i3] = AnimationState.HOLD_MIX;
                timelineDipMix[_i3] = next;
                continue outer;
              }
              break;
            }
            timelineMode[_i3] = AnimationState.HOLD;
          }
        }
      }
    }, {
      key: 'computeNotLast',
      value: function computeNotLast(entry) {
        var timelines = entry.animation.timelines;
        var timelinesCount = entry.animation.timelines.length;
        var timelineMode = entry.timelineMode;
        var propertyIDs = this.propertyIDs;
        for (var i = 0; i < timelinesCount; i++) {
          if (timelines[i] instanceof AttachmentTimeline) {
            var timeline = timelines[i];
            if (!propertyIDs.add(timeline.slotIndex)) {
              timelineMode[i] |= AnimationState.NOT_LAST;
            }
          }
        }
      }
    }, {
      key: 'getCurrent',
      value: function getCurrent(trackIndex) {
        if (trackIndex >= this.tracks.length) {
          return null;
        }
        return this.tracks[trackIndex];
      }
    }, {
      key: 'addListener',
      value: function addListener(listener) {
        if (listener == null) {
          throw new Error('listener cannot be null.');
        }
        this.listeners.push(listener);
      }
    }, {
      key: 'removeListener',
      value: function removeListener(listener) {
        var index = this.listeners.indexOf(listener);
        if (index >= 0) {
          this.listeners.splice(index, 1);
        }
      }
    }, {
      key: 'clearListeners',
      value: function clearListeners() {
        this.listeners.length = 0;
      }
    }, {
      key: 'clearListenerNotifications',
      value: function clearListenerNotifications() {
        this.queue.clear();
      }
    }, {
      key: 'hasAnimation',
      value: function hasAnimation(animationName) {
        var animation = this.data.skeletonData.findAnimation(animationName);
        return animation !== null;
      }
    }]);
    return AnimationState;
  }();
  AnimationState.emptyAnimation = new Animation('<empty>', [], 0);
  AnimationState.SUBSEQUENT = 0;
  AnimationState.FIRST = 1;
  AnimationState.HOLD = 2;
  AnimationState.HOLD_MIX = 3;
  AnimationState.NOT_LAST = 4;
  var TrackEntry = function () {
    function TrackEntry() {
      classCallCheck(this, TrackEntry);
      this.mixBlend = MixBlend.replace;
      this.timelineMode = [];
      this.timelineHoldMix = [];
      this.timelinesRotation = [];
    }
    createClass(TrackEntry, [{
      key: 'reset',
      value: function reset() {
        this.next = null;
        this.mixingFrom = null;
        this.mixingTo = null;
        this.animation = null;
        this.listener = null;
        this.timelineMode.length = 0;
        this.timelineHoldMix.length = 0;
        this.timelinesRotation.length = 0;
      }
    }, {
      key: 'getAnimationTime',
      value: function getAnimationTime() {
        if (this.loop) {
          var duration = this.animationEnd - this.animationStart;
          if (duration === 0) {
            return this.animationStart;
          }
          return this.trackTime % duration + this.animationStart;
        }
        return Math.min(this.trackTime + this.animationStart, this.animationEnd);
      }
    }, {
      key: 'setAnimationLast',
      value: function setAnimationLast(animationLast) {
        this.animationLast = animationLast;
        this.nextAnimationLast = animationLast;
      }
    }, {
      key: 'isComplete',
      value: function isComplete() {
        return this.trackTime >= this.animationEnd - this.animationStart;
      }
    }, {
      key: 'resetRotationDirections',
      value: function resetRotationDirections() {
        this.timelinesRotation.length = 0;
      }
    }, {
      key: 'loopsCount',
      value: function loopsCount() {
        return Math.floor(this.trackTime / this.trackEnd);
      }
    }]);
    return TrackEntry;
  }();
  var EventQueue = function () {
    function EventQueue(animState) {
      classCallCheck(this, EventQueue);
      this.objects = [];
      this.drainDisabled = false;
      this.animState = animState;
    }
    createClass(EventQueue, [{
      key: 'start',
      value: function start(entry) {
        this.objects.push(EventType.start);
        this.objects.push(entry);
        this.animState.animationsChanged = true;
      }
    }, {
      key: 'interrupt',
      value: function interrupt(entry) {
        this.objects.push(EventType.interrupt);
        this.objects.push(entry);
      }
    }, {
      key: 'end',
      value: function end(entry) {
        this.objects.push(EventType.end);
        this.objects.push(entry);
        this.animState.animationsChanged = true;
      }
    }, {
      key: 'dispose',
      value: function dispose(entry) {
        this.objects.push(EventType.dispose);
        this.objects.push(entry);
      }
    }, {
      key: 'complete',
      value: function complete(entry) {
        this.objects.push(EventType.complete);
        this.objects.push(entry);
      }
    }, {
      key: 'event',
      value: function event(entry, _event2) {
        this.objects.push(EventType.event);
        this.objects.push(entry);
        this.objects.push(_event2);
      }
    }, {
      key: 'drain',
      value: function drain() {
        if (this.drainDisabled) {
          return;
        }
        this.drainDisabled = true;
        var objects = this.objects;
        var listeners = this.animState.listeners;
        for (var i = 0; i < objects.length; i += 2) {
          var type = objects[i];
          var entry = objects[i + 1];
          switch (type) {
            case EventType.start:
              if (entry.listener != null && entry.listener.start) {
                entry.listener.start(entry);
              }
              for (var ii = 0; ii < listeners.length; ii++) {
                if (listeners[ii].start) {
                  listeners[ii].start(entry);
                }
              }
              break;
            case EventType.interrupt:
              if (entry.listener != null && entry.listener.interrupt) {
                entry.listener.interrupt(entry);
              }
              for (var _ii2 = 0; _ii2 < listeners.length; _ii2++) {
                if (listeners[_ii2].interrupt) {
                  listeners[_ii2].interrupt(entry);
                }
              }
              break;
            case EventType.end:
              if (entry.listener != null && entry.listener.end) {
                entry.listener.end(entry);
              }
              for (var _ii3 = 0; _ii3 < listeners.length; _ii3++) {
                if (listeners[_ii3].end) listeners[_ii3].end(entry);
              }
            case EventType.dispose:
              if (entry.listener != null && entry.listener.dispose) {
                entry.listener.dispose(entry);
              }
              for (var _ii4 = 0; _ii4 < listeners.length; _ii4++) {
                if (listeners[_ii4].dispose) {
                  listeners[_ii4].dispose(entry);
                }
              }
              this.animState.trackEntryPool.free(entry);
              break;
            case EventType.complete:
              if (entry.listener != null && entry.listener.complete) {
                entry.listener.complete(entry);
              }
              for (var _ii5 = 0; _ii5 < listeners.length; _ii5++) {
                if (listeners[_ii5].complete) {
                  listeners[_ii5].complete(entry);
                }
              }
              break;
            case EventType.event:
              var event = objects[i++ + 2];
              if (entry.listener != null && entry.listener.event) {
                entry.listener.event(entry, event);
              }
              for (var _ii6 = 0; _ii6 < listeners.length; _ii6++) {
                if (listeners[_ii6].event) {
                  listeners[_ii6].event(entry, event);
                }
              }
              break;
          }
        }
        this.clear();
        this.drainDisabled = false;
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.objects.length = 0;
      }
    }]);
    return EventQueue;
  }();

  var AnimationStateData = function () {
    function AnimationStateData(skeletonData) {
      classCallCheck(this, AnimationStateData);
      this.animationToMixTime = {};
      this.defaultMix = 0;
      if (skeletonData == null) {
        throw new Error('skeletonData cannot be null.');
      }
      this.skeletonData = skeletonData;
    }
    createClass(AnimationStateData, [{
      key: 'setMix',
      value: function setMix(fromName, toName, duration) {
        var from = this.skeletonData.findAnimation(fromName);
        if (from == null) {
          throw new Error('Animation not found: ' + fromName);
        }
        var to = this.skeletonData.findAnimation(toName);
        if (to == null) {
          throw new Error('Animation not found: ' + toName);
        }
        this.setMixWith(from, to, duration);
      }
    }, {
      key: 'setMixWith',
      value: function setMixWith(from, to, duration) {
        if (from == null) {
          throw new Error('from cannot be null.');
        }
        if (to == null) {
          throw new Error('to cannot be null.');
        }
        var key = from.name + '.' + to.name;
        this.animationToMixTime[key] = duration;
      }
    }, {
      key: 'getMix',
      value: function getMix(from, to) {
        var key = from.name + '.' + to.name;
        var value = this.animationToMixTime[key];
        return value === undefined ? this.defaultMix : value;
      }
    }]);
    return AnimationStateData;
  }();

  var RegionAttachment = function (_Attachment) {
    inherits(RegionAttachment, _Attachment);
    function RegionAttachment(name) {
      classCallCheck(this, RegionAttachment);
      var _this = possibleConstructorReturn(this, (RegionAttachment.__proto__ || Object.getPrototypeOf(RegionAttachment)).call(this, name));
      _this.x = 0;
      _this.y = 0;
      _this.scaleX = 1;
      _this.scaleY = 1;
      _this.rotation = 0;
      _this.width = 0;
      _this.height = 0;
      _this.color = new Color(1, 1, 1, 1);
      _this.offset = newFloatArray(8);
      _this.uvs = newFloatArray(8);
      _this.tempColor = new Color(1, 1, 1, 1);
      return _this;
    }
    createClass(RegionAttachment, [{
      key: 'updateOffset',
      value: function updateOffset() {
        var regionScaleX = this.width / this.region.originalWidth * this.scaleX;
        var regionScaleY = this.height / this.region.originalHeight * this.scaleY;
        var localX = -this.width / 2 * this.scaleX + this.region.offsetX * regionScaleX;
        var localY = -this.height / 2 * this.scaleY + this.region.offsetY * regionScaleY;
        var localX2 = localX + this.region.width * regionScaleX;
        var localY2 = localY + this.region.height * regionScaleY;
        var radians = this.rotation * Math.PI / 180;
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        var localXCos = localX * cos + this.x;
        var localXSin = localX * sin;
        var localYCos = localY * cos + this.y;
        var localYSin = localY * sin;
        var localX2Cos = localX2 * cos + this.x;
        var localX2Sin = localX2 * sin;
        var localY2Cos = localY2 * cos + this.y;
        var localY2Sin = localY2 * sin;
        var offset = this.offset;
        offset[RegionAttachment.OX1] = localXCos - localYSin;
        offset[RegionAttachment.OY1] = localYCos + localXSin;
        offset[RegionAttachment.OX2] = localXCos - localY2Sin;
        offset[RegionAttachment.OY2] = localY2Cos + localXSin;
        offset[RegionAttachment.OX3] = localX2Cos - localY2Sin;
        offset[RegionAttachment.OY3] = localY2Cos + localX2Sin;
        offset[RegionAttachment.OX4] = localX2Cos - localYSin;
        offset[RegionAttachment.OY4] = localYCos + localX2Sin;
      }
    }, {
      key: 'setRegion',
      value: function setRegion(region) {
        this.region = region;
        var uvs = this.uvs;
        if (region.rotate) {
          uvs[2] = region.u;
          uvs[3] = region.v2;
          uvs[4] = region.u;
          uvs[5] = region.v;
          uvs[6] = region.u2;
          uvs[7] = region.v;
          uvs[0] = region.u2;
          uvs[1] = region.v2;
        } else {
          uvs[0] = region.u;
          uvs[1] = region.v2;
          uvs[2] = region.u;
          uvs[3] = region.v;
          uvs[4] = region.u2;
          uvs[5] = region.v;
          uvs[6] = region.u2;
          uvs[7] = region.v2;
        }
      }
    }, {
      key: 'computeWorldVertices',
      value: function computeWorldVertices(bone, worldVertices, offset, stride) {
        var vertexOffset = this.offset;
        var mat = bone.matrix;
        var x = mat.tx;
        var y = mat.ty;
        var a = mat.a;
        var b = mat.c;
        var c = mat.b;
        var d = mat.d;
        var offsetX = 0;
        var offsetY = 0;
        offsetX = vertexOffset[RegionAttachment.OX1];
        offsetY = vertexOffset[RegionAttachment.OY1];
        worldVertices[offset] = offsetX * a + offsetY * b + x;
        worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
        offset += stride;
        offsetX = vertexOffset[RegionAttachment.OX2];
        offsetY = vertexOffset[RegionAttachment.OY2];
        worldVertices[offset] = offsetX * a + offsetY * b + x;
        worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
        offset += stride;
        offsetX = vertexOffset[RegionAttachment.OX3];
        offsetY = vertexOffset[RegionAttachment.OY3];
        worldVertices[offset] = offsetX * a + offsetY * b + x;
        worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
        offset += stride;
        offsetX = vertexOffset[RegionAttachment.OX4];
        offsetY = vertexOffset[RegionAttachment.OY4];
        worldVertices[offset] = offsetX * a + offsetY * b + x;
        worldVertices[offset + 1] = offsetX * c + offsetY * d + y;
      }
    }, {
      key: 'copy',
      value: function copy() {
        var copy = new RegionAttachment(name);
        copy.region = this.region;
        copy.rendererObject = this.rendererObject;
        copy.path = this.path;
        copy.x = this.x;
        copy.y = this.y;
        copy.scaleX = this.scaleX;
        copy.scaleY = this.scaleY;
        copy.rotation = this.rotation;
        copy.width = this.width;
        copy.height = this.height;
        arrayCopy(this.uvs, 0, copy.uvs, 0, 8);
        arrayCopy(this.offset, 0, copy.offset, 0, 8);
        copy.color.setFromColor(this.color);
        return copy;
      }
    }]);
    return RegionAttachment;
  }(Attachment);
  RegionAttachment.OX1 = 0;
  RegionAttachment.OY1 = 1;
  RegionAttachment.OX2 = 2;
  RegionAttachment.OY2 = 3;
  RegionAttachment.OX3 = 4;
  RegionAttachment.OY3 = 5;
  RegionAttachment.OX4 = 6;
  RegionAttachment.OY4 = 7;
  RegionAttachment.X1 = 0;
  RegionAttachment.Y1 = 1;
  RegionAttachment.C1R = 2;
  RegionAttachment.C1G = 3;
  RegionAttachment.C1B = 4;
  RegionAttachment.C1A = 5;
  RegionAttachment.U1 = 6;
  RegionAttachment.V1 = 7;
  RegionAttachment.X2 = 8;
  RegionAttachment.Y2 = 9;
  RegionAttachment.C2R = 10;
  RegionAttachment.C2G = 11;
  RegionAttachment.C2B = 12;
  RegionAttachment.C2A = 13;
  RegionAttachment.U2 = 14;
  RegionAttachment.V2 = 15;
  RegionAttachment.X3 = 16;
  RegionAttachment.Y3 = 17;
  RegionAttachment.C3R = 18;
  RegionAttachment.C3G = 19;
  RegionAttachment.C3B = 20;
  RegionAttachment.C3A = 21;
  RegionAttachment.U3 = 22;
  RegionAttachment.V3 = 23;
  RegionAttachment.X4 = 24;
  RegionAttachment.Y4 = 25;
  RegionAttachment.C4R = 26;
  RegionAttachment.C4G = 27;
  RegionAttachment.C4B = 28;
  RegionAttachment.C4A = 29;
  RegionAttachment.U4 = 30;
  RegionAttachment.V4 = 31;

  var MeshAttachment = function (_VertexAttachment) {
    inherits(MeshAttachment, _VertexAttachment);
    function MeshAttachment(name) {
      classCallCheck(this, MeshAttachment);
      var _this = possibleConstructorReturn(this, (MeshAttachment.__proto__ || Object.getPrototypeOf(MeshAttachment)).call(this, name));
      _this.color = new Color(1, 1, 1, 1);
      _this.tempColor = new Color(0, 0, 0, 0);
      return _this;
    }
    createClass(MeshAttachment, [{
      key: 'updateUVs',
      value: function updateUVs(region, uvs) {
        var regionUVs = this.regionUVs;
        var n = regionUVs.length;
        if (!uvs || uvs.length !== n) {
          uvs = newFloatArray(n);
        }
        if (region == null) {
          return;
        }
        var texture = region.texture;
        var r = texture._uvs;
        var w1 = region.width;
        var h1 = region.height;
        var w2 = region.originalWidth;
        var h2 = region.originalHeight;
        var x = region.offsetX;
        var y = region.tinyOffsetY;
        for (var i = 0; i < n; i += 2) {
          var u = this.regionUVs[i];
          var v = this.regionUVs[i + 1];
          u = (u * w2 - x) / w1;
          v = (v * h2 - y) / h1;
          uvs[i] = (r.x0 * (1 - u) + r.x1 * u) * (1 - v) + (r.x3 * (1 - u) + r.x2 * u) * v;
          uvs[i + 1] = (r.y0 * (1 - u) + r.y1 * u) * (1 - v) + (r.y3 * (1 - u) + r.y2 * u) * v;
        }
        return uvs;
      }
    }, {
      key: 'getParentMesh',
      value: function getParentMesh() {
        return this.parentMesh;
      }
    }, {
      key: 'setParentMesh',
      value: function setParentMesh(parentMesh) {
        this.parentMesh = parentMesh;
        if (parentMesh != null) {
          this.bones = parentMesh.bones;
          this.vertices = parentMesh.vertices;
          this.regionUVs = parentMesh.regionUVs;
          this.triangles = parentMesh.triangles;
          this.hullLength = parentMesh.hullLength;
          this.worldVerticesLength = parentMesh.worldVerticesLength;
        }
      }
    }, {
      key: 'copy',
      value: function copy() {
        if (this.parentMesh != null) {
          return this.newLinkedMesh();
        }
        var copy = new MeshAttachment(this.name);
        copy.region = this.region;
        copy.path = this.path;
        copy.color.setFromColor(this.color);
        this.copyTo(copy);
        copy.regionUVs = new Float32Array(this.regionUVs.length);
        arrayCopy(this.regionUVs, 0, copy.regionUVs, 0, this.regionUVs.length);
        copy.uvs = new Array(this.uvs.length);
        arrayCopy(this.uvs, 0, copy.uvs, 0, this.uvs.length);
        copy.triangles = new Array(this.triangles.length);
        arrayCopy(this.triangles, 0, copy.triangles, 0, this.triangles.length);
        copy.hullLength = this.hullLength;
        if (this.edges != null) {
          copy.edges = new Array(this.edges.length);
          arrayCopy(this.edges, 0, copy.edges, 0, this.edges.length);
        }
        copy.width = this.width;
        copy.height = this.height;
        return copy;
      }
    }, {
      key: 'newLinkedMesh',
      value: function newLinkedMesh() {
        var copy = new MeshAttachment(this.name);
        copy.region = this.region;
        copy.path = this.path;
        copy.color.setFromColor(this.color);
        copy.deformAttachment = this.deformAttachment;
        copy.setParentMesh(this.parentMesh != null ? this.parentMesh : this);
        return copy;
      }
    }]);
    return MeshAttachment;
  }(VertexAttachment);

  var BoundingBoxAttachment = function (_VertexAttachment) {
    inherits(BoundingBoxAttachment, _VertexAttachment);
    function BoundingBoxAttachment(name) {
      classCallCheck(this, BoundingBoxAttachment);
      var _this = possibleConstructorReturn(this, (BoundingBoxAttachment.__proto__ || Object.getPrototypeOf(BoundingBoxAttachment)).call(this, name));
      _this.color = new Color(1, 1, 1, 1);
      return _this;
    }
    createClass(BoundingBoxAttachment, [{
      key: 'copy',
      value: function copy() {
        var copy = new BoundingBoxAttachment(name);
        this.copyTo(copy);
        copy.color.setFromColor(this.color);
        return copy;
      }
    }]);
    return BoundingBoxAttachment;
  }(VertexAttachment);

  var PathAttachment = function (_VertexAttachment) {
    inherits(PathAttachment, _VertexAttachment);
    function PathAttachment(name) {
      classCallCheck(this, PathAttachment);
      var _this = possibleConstructorReturn(this, (PathAttachment.__proto__ || Object.getPrototypeOf(PathAttachment)).call(this, name));
      _this.closed = false;
      _this.constantSpeed = false;
      _this.color = new Color(1, 1, 1, 1);
      return _this;
    }
    createClass(PathAttachment, [{
      key: 'copy',
      value: function copy() {
        var copy = new PathAttachment(name);
        this.copyTo(copy);
        copy.lengths = new Array(this.lengths.length);
        arrayCopy(this.lengths, 0, copy.lengths, 0, this.lengths.length);
        copy.closed = closed;
        copy.constantSpeed = this.constantSpeed;
        copy.color.setFromColor(this.color);
        return copy;
      }
    }]);
    return PathAttachment;
  }(VertexAttachment);

  var PointAttachment = function (_VertexAttachment) {
    inherits(PointAttachment, _VertexAttachment);
    function PointAttachment(name) {
      classCallCheck(this, PointAttachment);
      var _this = possibleConstructorReturn(this, (PointAttachment.__proto__ || Object.getPrototypeOf(PointAttachment)).call(this, name));
      _this.color = new Color(0.38, 0.94, 0, 1);
      return _this;
    }
    createClass(PointAttachment, [{
      key: 'computeWorldPosition',
      value: function computeWorldPosition(bone, point) {
        var mat = bone.matrix;
        point.x = this.x * mat.a + this.y * mat.c + bone.worldX;
        point.y = this.x * mat.b + this.y * mat.d + bone.worldY;
        return point;
      }
    }, {
      key: 'computeWorldRotation',
      value: function computeWorldRotation(bone) {
        var mat = bone.matrix;
        var cos = cosDeg(this.rotation);
        var sin = sinDeg(this.rotation);
        var x = cos * mat.a + sin * mat.c;
        var y = cos * mat.b + sin * mat.d;
        return Math.atan2(y, x) * radDeg;
      }
    }, {
      key: 'copy',
      value: function copy() {
        var copy = new PointAttachment(name);
        copy.x = this.x;
        copy.y = this.y;
        copy.rotation = this.rotation;
        copy.color.setFromColor(this.color);
        return copy;
      }
    }]);
    return PointAttachment;
  }(VertexAttachment);

  var ClippingAttachment = function (_VertexAttachment) {
    inherits(ClippingAttachment, _VertexAttachment);
    function ClippingAttachment(name) {
      classCallCheck(this, ClippingAttachment);
      var _this = possibleConstructorReturn(this, (ClippingAttachment.__proto__ || Object.getPrototypeOf(ClippingAttachment)).call(this, name));
      _this.color = new Color(0.2275, 0.2275, 0.8078, 1);return _this;
    }
    createClass(ClippingAttachment, [{
      key: 'copy',
      value: function copy() {
        var copy = new ClippingAttachment(name);
        this.copyTo(copy);
        copy.endSlot = this.endSlot;
        copy.color.setFromColor(this.color);
        return copy;
      }
    }]);
    return ClippingAttachment;
  }(VertexAttachment);

  var AtlasAttachmentLoader = function () {
    function AtlasAttachmentLoader(atlas) {
      classCallCheck(this, AtlasAttachmentLoader);
      this.atlas = atlas;
    }
    createClass(AtlasAttachmentLoader, [{
      key: 'newRegionAttachment',
      value: function newRegionAttachment(skin, name, path) {
        var region = this.atlas.findRegion(path);
        if (region == null) {
          throw new Error('Region not found in atlas: ' + path + ' (region attachment: ' + name + ')');
        }
        var attachment = new RegionAttachment(name);
        attachment.region = region;
        return attachment;
      }
    }, {
      key: 'newMeshAttachment',
      value: function newMeshAttachment(skin, name, path) {
        var region = this.atlas.findRegion(path);
        if (region == null) {
          throw new Error('Region not found in atlas: ' + path + ' (mesh attachment: ' + name + ')');
        }
        var attachment = new MeshAttachment(name);
        attachment.region = region;
        return attachment;
      }
    }, {
      key: 'newBoundingBoxAttachment',
      value: function newBoundingBoxAttachment(skin, name) {
        return new BoundingBoxAttachment(name);
      }
    }, {
      key: 'newPathAttachment',
      value: function newPathAttachment(skin, name) {
        return new PathAttachment(name);
      }
    }, {
      key: 'newPointAttachment',
      value: function newPointAttachment(skin, name) {
        return new PointAttachment(name);
      }
    }, {
      key: 'newClippingAttachment',
      value: function newClippingAttachment(skin, name) {
        return new ClippingAttachment(name);
      }
    }]);
    return AtlasAttachmentLoader;
  }();

  var BlendMode = {
    Normal: 0,
    Additive: 1,
    Multiply: 2,
    Screen: 3
  };

  var TransformMode = {
    Normal: 0,
    OnlyTranslation: 1,
    NoRotationOrReflection: 2,
    NoScale: 3,
    NoScaleOrReflection: 4
  };
  var BoneData = function BoneData(index, name, parent) {
    classCallCheck(this, BoneData);
    this.x = 0;
    this.y = 0;
    this.rotation = 0;
    this.scaleX = 1;
    this.scaleY = 1;
    this.shearX = 0;
    this.shearY = 0;
    this.transformMode = TransformMode.Normal;
    this.skinRequired = false;
    this.color = new Color();
    if (index < 0) {
      throw new Error('index must be >= 0.');
    }
    if (name == null) {
      throw new Error('name cannot be null.');
    }
    this.index = index;
    this.name = name;
    this.parent = parent;
  };

  var Bone = function () {
    function Bone(data, skeleton, parent) {
      classCallCheck(this, Bone);
      this.matrix = new Tiny.Matrix();
      this.children = [];
      this.x = 0;
      this.y = 0;
      this.rotation = 0;
      this.scaleX = 0;
      this.scaleY = 0;
      this.shearX = 0;
      this.shearY = 0;
      this.ax = 0;
      this.ay = 0;
      this.arotation = 0;
      this.ascaleX = 0;
      this.ascaleY = 0;
      this.ashearX = 0;
      this.ashearY = 0;
      this.appliedValid = false;
      this.sorted = false;
      this.active = false;
      if (data == null) {
        throw new Error('data cannot be null.');
      }
      if (skeleton == null) {
        throw new Error('skeleton cannot be null.');
      }
      this.data = data;
      this.skeleton = skeleton;
      this.parent = parent;
      this.setToSetupPose();
    }
    createClass(Bone, [{
      key: 'isActive',
      value: function isActive() {
        return this.active;
      }
    }, {
      key: 'update',
      value: function update() {
        this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
      }
    }, {
      key: 'updateWorldTransform',
      value: function updateWorldTransform() {
        this.updateWorldTransformWith(this.x, this.y, this.rotation, this.scaleX, this.scaleY, this.shearX, this.shearY);
      }
    }, {
      key: 'updateWorldTransformWith',
      value: function updateWorldTransformWith(x, y, rotation, scaleX, scaleY, shearX, shearY) {
        this.ax = x;
        this.ay = y;
        this.arotation = rotation;
        this.ascaleX = scaleX;
        this.ascaleY = scaleY;
        this.ashearX = shearX;
        this.ashearY = shearY;
        this.appliedValid = true;
        var parent = this.parent;
        var m = this.matrix;
        var sx = this.skeleton.scaleX;
        var sy = Bone.yDown ? -this.skeleton.scaleY : this.skeleton.scaleY;
        if (parent == null) {
          var skeleton = this.skeleton;
          var rotationY = rotation + 90 + shearY;
          m.a = cosDeg(rotation + shearX) * scaleX * sx;
          m.c = cosDeg(rotationY) * scaleY * sx;
          m.b = sinDeg(rotation + shearX) * scaleX * sy;
          m.d = sinDeg(rotationY) * scaleY * sy;
          m.tx = x * sx + skeleton.x;
          m.ty = y * sy + skeleton.y;
          return;
        }
        var pa = parent.matrix.a;
        var pb = parent.matrix.c;
        var pc = parent.matrix.b;
        var pd = parent.matrix.d;
        m.tx = pa * x + pb * y + parent.matrix.tx;
        m.ty = pc * x + pd * y + parent.matrix.ty;
        switch (this.data.transformMode) {
          case TransformMode.Normal:
            {
              var _rotationY = rotation + 90 + shearY;
              var la = cosDeg(rotation + shearX) * scaleX;
              var lb = cosDeg(_rotationY) * scaleY;
              var lc = sinDeg(rotation + shearX) * scaleX;
              var ld = sinDeg(_rotationY) * scaleY;
              m.a = pa * la + pb * lc;
              m.c = pa * lb + pb * ld;
              m.b = pc * la + pd * lc;
              m.d = pc * lb + pd * ld;
              return;
            }
          case TransformMode.OnlyTranslation:
            {
              var _rotationY2 = rotation + 90 + shearY;
              m.a = cosDeg(rotation + shearX) * scaleX;
              m.c = cosDeg(_rotationY2) * scaleY;
              m.b = sinDeg(rotation + shearX) * scaleX;
              m.d = sinDeg(_rotationY2) * scaleY;
              break;
            }
          case TransformMode.NoRotationOrReflection:
            {
              var s = pa * pa + pc * pc;
              var prx = 0;
              if (s > 0.0001) {
                s = Math.abs(pa * pd - pb * pc) / s;
                pb = pc * s;
                pd = pa * s;
                prx = Math.atan2(pc, pa) * radDeg;
              } else {
                pa = 0;
                pc = 0;
                prx = 90 - Math.atan2(pd, pb) * radDeg;
              }
              var rx = rotation + shearX - prx;
              var ry = rotation + shearY - prx + 90;
              var _la = cosDeg(rx) * scaleX;
              var _lb = cosDeg(ry) * scaleY;
              var _lc = sinDeg(rx) * scaleX;
              var _ld = sinDeg(ry) * scaleY;
              m.a = pa * _la - pb * _lc;
              m.c = pa * _lb - pb * _ld;
              m.b = pc * _la + pd * _lc;
              m.d = pc * _lb + pd * _ld;
              break;
            }
          case TransformMode.NoScale:
          case TransformMode.NoScaleOrReflection:
            {
              var cos = cosDeg(rotation);
              var sin = sinDeg(rotation);
              var za = (pa * cos + pb * sin) / sx;
              var zc = (pc * cos + pd * sin) / sy;
              var _s = Math.sqrt(za * za + zc * zc);
              if (_s > 0.00001) {
                _s = 1 / _s;
              }
              za *= _s;
              zc *= _s;
              _s = Math.sqrt(za * za + zc * zc);
              if (this.data.transformMode === TransformMode.NoScale && pa * pd - pb * pc < 0 !== (Bone.yDown ? this.skeleton.scaleX < 0 !== this.skeleton.scaleY > 0 : this.skeleton.scaleX < 0 !== this.skeleton.scaleY < 0)) {
                _s = -_s;
              }
              var r = Math.PI / 2 + Math.atan2(zc, za);
              var zb = Math.cos(r) * _s;
              var zd = Math.sin(r) * _s;
              var _la2 = cosDeg(shearX) * scaleX;
              var _lb2 = cosDeg(90 + shearY) * scaleY;
              var _lc2 = sinDeg(shearX) * scaleX;
              var _ld2 = sinDeg(90 + shearY) * scaleY;
              m.a = za * _la2 + zb * _lc2;
              m.c = za * _lb2 + zb * _ld2;
              m.b = zc * _la2 + zd * _lc2;
              m.d = zc * _lb2 + zd * _ld2;
              break;
            }
        }
        m.a *= sx;
        m.c *= sx;
        m.b *= sy;
        m.d *= sy;
      }
    }, {
      key: 'setToSetupPose',
      value: function setToSetupPose() {
        var data = this.data;
        this.x = data.x;
        this.y = data.y;
        this.rotation = data.rotation;
        this.scaleX = data.scaleX;
        this.scaleY = data.scaleY;
        this.shearX = data.shearX;
        this.shearY = data.shearY;
      }
    }, {
      key: 'getWorldRotationX',
      value: function getWorldRotationX() {
        return Math.atan2(this.matrix.b, this.matrix.a) * radDeg;
      }
    }, {
      key: 'getWorldRotationY',
      value: function getWorldRotationY() {
        return Math.atan2(this.matrix.d, this.matrix.c) * radDeg;
      }
    }, {
      key: 'getWorldScaleX',
      value: function getWorldScaleX() {
        var m = this.matrix;
        return Math.sqrt(m.a * m.a + m.c * m.c);
      }
    }, {
      key: 'getWorldScaleY',
      value: function getWorldScaleY() {
        var m = this.matrix;
        return Math.sqrt(m.b * m.b + m.d * m.d);
      }
    }, {
      key: 'updateAppliedTransform',
      value: function updateAppliedTransform() {
        this.appliedValid = true;
        var parent = this.parent;
        var m = this.matrix;
        if (parent == null) {
          this.ax = m.tx;
          this.ay = m.ty;
          this.arotation = Math.atan2(m.b, m.a) * radDeg;
          this.ascaleX = Math.sqrt(m.a * m.a + m.b * m.b);
          this.ascaleY = Math.sqrt(m.c * m.c + m.d * m.d);
          this.ashearX = 0;
          this.ashearY = Math.atan2(m.a * m.c + m.b * m.d, m.a * m.d - m.b * m.c) * radDeg;
          return;
        }
        var pm = parent.matrix;
        var pid = 1 / (pm.a * pm.d - pm.b * pm.c);
        var dx = m.tx - pm.tx;
        var dy = m.ty - pm.ty;
        this.ax = dx * pm.d * pid - dy * pm.c * pid;
        this.ay = dy * pm.a * pid - dx * pm.b * pid;
        var ia = pid * pm.d;
        var id = pid * pm.a;
        var ib = pid * pm.c;
        var ic = pid * pm.b;
        var ra = ia * m.a - ib * m.b;
        var rb = ia * m.c - ib * m.d;
        var rc = id * m.b - ic * m.a;
        var rd = id * m.d - ic * m.c;
        this.ashearX = 0;
        this.ascaleX = Math.sqrt(ra * ra + rc * rc);
        if (this.ascaleX > 0.0001) {
          var det = ra * rd - rb * rc;
          this.ascaleY = det / this.ascaleX;
          this.ashearY = Math.atan2(ra * rb + rc * rd, det) * radDeg;
          this.arotation = Math.atan2(rc, ra) * radDeg;
        } else {
          this.ascaleX = 0;
          this.ascaleY = Math.sqrt(rb * rb + rd * rd);
          this.ashearY = 0;
          this.arotation = 90 - Math.atan2(rd, rb) * radDeg;
        }
      }
    }, {
      key: 'worldToLocal',
      value: function worldToLocal(world) {
        var m = this.matrix;
        var a = m.a;
        var b = m.c;
        var c = m.b;
        var d = m.d;
        var invDet = 1 / (a * d - b * c);
        var x = world.x - m.tx;
        var y = world.y - m.ty;
        world.x = x * d * invDet - y * b * invDet;
        world.y = y * a * invDet - x * c * invDet;
        return world;
      }
    }, {
      key: 'localToWorld',
      value: function localToWorld(local) {
        var m = this.matrix;
        var x = local.x;
        var y = local.y;
        local.x = x * m.a + y * m.c + m.tx;
        local.y = x * m.b + y * m.d + m.ty;
        return local;
      }
    }, {
      key: 'worldToLocalRotation',
      value: function worldToLocalRotation(worldRotation) {
        var sin = sinDeg(worldRotation);
        var cos = cosDeg(worldRotation);
        var mat = this.matrix;
        return Math.atan2(mat.a * sin - mat.b * cos, mat.d * cos - mat.c * sin) * radDeg + this.rotation - this.shearX;
      }
    }, {
      key: 'localToWorldRotation',
      value: function localToWorldRotation(localRotation) {
        var sin = sinDeg(localRotation);
        var cos = cosDeg(localRotation);
        var mat = this.matrix;
        return Math.atan2(cos * mat.b + sin * mat.d, cos * mat.a + sin * mat.c) * radDeg;
      }
    }, {
      key: 'rotateWorld',
      value: function rotateWorld(degrees) {
        var mat = this.matrix;
        var a = mat.a;
        var b = mat.c;
        var c = mat.b;
        var d = mat.d;
        var cos = cosDeg(degrees);
        var sin = sinDeg(degrees);
        mat.a = cos * a - sin * c;
        mat.c = cos * b - sin * d;
        mat.b = sin * a + cos * c;
        mat.d = sin * b + cos * d;
        this.appliedValid = false;
      }
    }, {
      key: 'worldX',
      get: function get$$1() {
        return this.matrix.tx;
      }
    }, {
      key: 'worldY',
      get: function get$$1() {
        return this.matrix.ty;
      }
    }]);
    return Bone;
  }();
  Bone.yDown = false;

  var ConstraintData = function ConstraintData(name, order, skinRequired) {
    classCallCheck(this, ConstraintData);
    this.name = name;
    this.order = order;
    this.skinRequired = skinRequired;
  };

  var Event = function Event(time, data) {
    classCallCheck(this, Event);
    if (data == null) {
      throw new Error('data cannot be null.');
    }
    this.time = time;
    this.data = data;
  };

  var EventData = function EventData(name) {
    classCallCheck(this, EventData);
    this.name = name;
  };

  var IKConstraint = function () {
    function IKConstraint(data, skeleton) {
      classCallCheck(this, IKConstraint);
      this.bendDirection = 0;
      this.compress = false;
      this.stretch = false;
      this.mix = 1;
      this.softness = 0;
      this.active = false;
      if (data == null) {
        throw new Error('data cannot be null.');
      }
      if (skeleton == null) {
        throw new Error('skeleton cannot be null.');
      }
      this.data = data;
      this.mix = data.mix;
      this.softness = data.softness;
      this.bendDirection = data.bendDirection;
      this.compress = data.compress;
      this.stretch = data.stretch;
      this.bones = [];
      for (var i = 0; i < data.bones.length; i++) {
        this.bones.push(skeleton.findBone(data.bones[i].name));
      }
      this.target = skeleton.findBone(data.target.name);
    }
    createClass(IKConstraint, [{
      key: 'isActive',
      value: function isActive() {
        return this.active;
      }
    }, {
      key: 'apply',
      value: function apply() {
        this.update();
      }
    }, {
      key: 'update',
      value: function update() {
        var target = this.target;
        var bones = this.bones;
        switch (bones.length) {
          case 1:
            this.apply1(bones[0], target.worldX, target.worldY, this.compress, this.stretch, this.data.uniform, this.mix);
            break;
          case 2:
            this.apply2(bones[0], bones[1], target.worldX, target.worldY, this.bendDirection, this.stretch, this.softness, this.mix);
            break;
        }
      }
    }, {
      key: 'apply1',
      value: function apply1(bone, targetX, targetY, compress, stretch, uniform, alpha) {
        if (!bone.appliedValid) {
          bone.updateAppliedTransform();
        }
        var p = bone.parent.matrix;
        var pa = p.a;
        var pb = p.c;
        var pc = p.b;
        var pd = p.d;
        var rotationIK = -bone.ashearX - bone.arotation;
        var tx = 0;
        var ty = 0;
        switch (bone.data.transformMode) {
          case TransformMode.OnlyTranslation:
            tx = targetX - bone.worldX;
            ty = targetY - bone.worldY;
            break;
          case TransformMode.NoRotationOrReflection:
            rotationIK += Math.atan2(pc, pa) * radDeg;
            var ps = Math.abs(pa * pd - pb * pc) / (pa * pa + pc * pc);
            pb = -pc * ps;
            pd = pa * ps;
          default:
            var x = targetX - p.tx;
            var y = targetY - p.ty;
            var d = pa * pd - pb * pc;
            tx = (x * pd - y * pb) / d - bone.ax;
            ty = (y * pa - x * pc) / d - bone.ay;
        }
        rotationIK += Math.atan2(ty, tx) * radDeg;
        if (bone.ascaleX < 0) {
          rotationIK += 180;
        }
        if (rotationIK > 180) {
          rotationIK -= 360;
        } else if (rotationIK < -180) {
          rotationIK += 360;
        }
        var sx = bone.ascaleX;
        var sy = bone.ascaleY;
        if (compress || stretch) {
          switch (bone.data.transformMode) {
            case TransformMode.NoScale:
            case TransformMode.NoScaleOrReflection:
              tx = targetX - bone.worldX;
              ty = targetY - bone.worldY;
          }
          var b = bone.data.length * sx;
          var dd = Math.sqrt(tx * tx + ty * ty);
          if (compress && dd < b || stretch && dd > b && b > 0.0001) {
            var s = (dd / b - 1) * alpha + 1;
            sx *= s;
            if (uniform) {
              sy *= s;
            }
          }
        }
        bone.updateWorldTransformWith(bone.ax, bone.ay, bone.arotation + rotationIK * alpha, sx, sy, bone.ashearX, bone.ashearY);
      }
    }, {
      key: 'apply2',
      value: function apply2(parent, child, targetX, targetY, bendDir, stretch, softness, alpha) {
        if (alpha === 0) {
          child.updateWorldTransform();
          return;
        }
        if (!parent.appliedValid) {
          parent.updateAppliedTransform();
        }
        if (!child.appliedValid) {
          child.updateAppliedTransform();
        }
        var px = parent.ax;
        var py = parent.ay;
        var psx = parent.ascaleX;
        var sx = psx;
        var psy = parent.ascaleY;
        var csx = child.ascaleX;
        var pmat = parent.matrix;
        var os1 = 0;
        var os2 = 0;
        var s2 = 0;
        if (psx < 0) {
          psx = -psx;
          os1 = 180;
          s2 = -1;
        } else {
          os1 = 0;
          s2 = 1;
        }
        if (psy < 0) {
          psy = -psy;
          s2 = -s2;
        }
        if (csx < 0) {
          csx = -csx;
          os2 = 180;
        } else {
          os2 = 0;
        }
        var cx = child.ax;
        var cy = 0;
        var cwx = 0;
        var cwy = 0;
        var a = pmat.a;
        var b = pmat.c;
        var c = pmat.b;
        var d = pmat.d;
        var u = Math.abs(psx - psy) <= 0.0001;
        if (!u) {
          cy = 0;
          cwx = a * cx + pmat.tx;
          cwy = c * cx + pmat.ty;
        } else {
          cy = child.ay;
          cwx = a * cx + b * cy + pmat.tx;
          cwy = c * cx + d * cy + pmat.ty;
        }
        var pp = parent.parent.matrix;
        a = pp.a;
        b = pp.c;
        c = pp.b;
        d = pp.d;
        var id = 1 / (a * d - b * c);
        var x = cwx - pp.tx;
        var y = cwy - pp.ty;
        var dx = (x * d - y * b) * id - px;
        var dy = (y * a - x * c) * id - py;
        var l1 = Math.sqrt(dx * dx + dy * dy);
        var l2 = child.data.length * csx;
        var a1 = void 0;
        var a2 = void 0;
        if (l1 < 0.0001) {
          this.apply1(parent, targetX, targetY, false, stretch, false, alpha);
          child.updateWorldTransformWith(cx, cy, 0, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
          return;
        }
        x = targetX - pp.tx;
        y = targetY - pp.ty;
        var tx = (x * d - y * b) * id - px;
        var ty = (y * a - x * c) * id - py;
        var dd = tx * tx + ty * ty;
        if (softness !== 0) {
          softness *= psx * (csx + 1) / 2;
          var td = Math.sqrt(dd);
          var sd = td - l1 - l2 * psx + softness;
          if (sd > 0) {
            var p = Math.min(1, sd / (softness * 2)) - 1;
            p = (sd - softness * (1 - p * p)) / td;
            tx -= p * tx;
            ty -= p * ty;
            dd = tx * tx + ty * ty;
          }
        }
        outer: if (u) {
          l2 *= psx;
          var cos = (dd - l1 * l1 - l2 * l2) / (2 * l1 * l2);
          if (cos < -1) {
            cos = -1;
          } else if (cos > 1) {
            cos = 1;
            if (stretch) {
              sx *= (Math.sqrt(dd) / (l1 + l2) - 1) * alpha + 1;
            }
          }
          a2 = Math.acos(cos) * bendDir;
          a = l1 + l2 * cos;
          b = l2 * Math.sin(a2);
          a1 = Math.atan2(ty * a - tx * b, tx * a + ty * b);
        } else {
          a = psx * l2;
          b = psy * l2;
          var aa = a * a;
          var bb = b * b;
          var ta = Math.atan2(ty, tx);
          c = bb * l1 * l1 + aa * dd - aa * bb;
          var c1 = -2 * bb * l1;
          var c2 = bb - aa;
          d = c1 * c1 - 4 * c2 * c;
          if (d >= 0) {
            var q = Math.sqrt(d);
            if (c1 < 0) {
              q = -q;
            }
            q = -(c1 + q) / 2;
            var r0 = q / c2;
            var r1 = c / q;
            var r = Math.abs(r0) < Math.abs(r1) ? r0 : r1;
            if (r * r <= dd) {
              y = Math.sqrt(dd - r * r) * bendDir;
              a1 = ta - Math.atan2(y, r);
              a2 = Math.atan2(y / psy, (r - l1) / psx);
              break outer;
            }
          }
          var minAngle = PI;
          var minX = l1 - a;
          var minDist = minX * minX;
          var minY = 0;
          var maxAngle = 0;
          var maxX = l1 + a;
          var maxDist = maxX * maxX;
          var maxY = 0;
          c = -a * l1 / (aa - bb);
          if (c >= -1 && c <= 1) {
            c = Math.acos(c);
            x = a * Math.cos(c) + l1;
            y = b * Math.sin(c);
            d = x * x + y * y;
            if (d < minDist) {
              minAngle = c;
              minDist = d;
              minX = x;
              minY = y;
            }
            if (d > maxDist) {
              maxAngle = c;
              maxDist = d;
              maxX = x;
              maxY = y;
            }
          }
          if (dd <= (minDist + maxDist) / 2) {
            a1 = ta - Math.atan2(minY * bendDir, minX);
            a2 = minAngle * bendDir;
          } else {
            a1 = ta - Math.atan2(maxY * bendDir, maxX);
            a2 = maxAngle * bendDir;
          }
        }
        var os = Math.atan2(cy, cx) * s2;
        var rotation = parent.arotation;
        a1 = (a1 - os) * radDeg + os1 - rotation;
        if (a1 > 180) {
          a1 -= 360;
        } else if (a1 < -180) {
          a1 += 360;
        }
        parent.updateWorldTransformWith(px, py, rotation + a1 * alpha, sx, parent.ascaleY, 0, 0);
        rotation = child.arotation;
        a2 = ((a2 + os) * radDeg - child.ashearX) * s2 + os2 - rotation;
        if (a2 > 180) {
          a2 -= 360;
        } else if (a2 < -180) {
          a2 += 360;
        }
        child.updateWorldTransformWith(cx, cy, rotation + a2 * alpha, child.ascaleX, child.ascaleY, child.ashearX, child.ashearY);
      }
    }]);
    return IKConstraint;
  }();

  var IKConstraintData = function (_ConstraintData) {
    inherits(IKConstraintData, _ConstraintData);
    function IKConstraintData(name) {
      classCallCheck(this, IKConstraintData);
      var _this = possibleConstructorReturn(this, (IKConstraintData.__proto__ || Object.getPrototypeOf(IKConstraintData)).call(this, name, 0, false));
      _this.bones = [];
      _this.bendDirection = 1;
      _this.compress = false;
      _this.stretch = false;
      _this.uniform = false;
      _this.mix = 1;
      _this.softness = 0;
      return _this;
    }
    return IKConstraintData;
  }(ConstraintData);

  var PathConstraintData = function (_ConstraintData) {
    inherits(PathConstraintData, _ConstraintData);
    function PathConstraintData(name) {
      classCallCheck(this, PathConstraintData);
      var _this = possibleConstructorReturn(this, (PathConstraintData.__proto__ || Object.getPrototypeOf(PathConstraintData)).call(this, name, 0, false));
      _this.bones = [];
      return _this;
    }
    return PathConstraintData;
  }(ConstraintData);
  var PositionMode = {
    Fixed: 0,
    Percent: 1
  };
  var SpacingMode = {
    Length: 0,
    Fixed: 1,
    Percent: 2
  };
  var RotateMode = {
    Tangent: 0,
    Chain: 1,
    ChainScale: 2
  };

  var PathConstraint = function () {
    function PathConstraint(data, skeleton) {
      classCallCheck(this, PathConstraint);
      this.position = 0;
      this.spacing = 0;
      this.rotateMix = 0;
      this.translateMix = 0;
      this.spaces = [];
      this.positions = [];
      this.world = [];
      this.curves = [];
      this.lengths = [];
      this.segments = [];
      this.active = false;
      if (data == null) {
        throw new Error('data cannot be null.');
      }
      if (skeleton == null) {
        throw new Error('skeleton cannot be null.');
      }
      this.data = data;
      this.bones = [];
      for (var i = 0, n = data.bones.length; i < n; i++) {
        this.bones.push(skeleton.findBone(data.bones[i].name));
      }
      this.target = skeleton.findSlot(data.target.name);
      this.position = data.position;
      this.spacing = data.spacing;
      this.rotateMix = data.rotateMix;
      this.translateMix = data.translateMix;
    }
    createClass(PathConstraint, [{
      key: 'isActive',
      value: function isActive() {
        return this.active;
      }
    }, {
      key: 'apply',
      value: function apply() {
        this.update();
      }
    }, {
      key: 'update',
      value: function update() {
        var attachment = this.target.getAttachment();
        if (!(attachment instanceof PathAttachment)) {
          return;
        }
        var rotateMix = this.rotateMix;
        var translateMix = this.translateMix;
        var translate = translateMix > 0;
        var rotate = rotateMix > 0;
        if (!translate && !rotate) {
          return;
        }
        var data = this.data;
        var spacingMode = data.spacingMode;
        var lengthSpacing = spacingMode === SpacingMode.Length;
        var rotateMode = data.rotateMode;
        var tangents = rotateMode === RotateMode.Tangent;
        var scale = rotateMode === RotateMode.ChainScale;
        var boneCount = this.bones.length;
        var spacesCount = tangents ? boneCount : boneCount + 1;
        var bones = this.bones;
        var spaces = setArraySize(this.spaces, spacesCount);
        var lengths = null;
        var spacing = this.spacing;
        if (scale || lengthSpacing) {
          if (scale) {
            lengths = setArraySize(this.lengths, boneCount);
          }
          for (var i = 0, n = spacesCount - 1; i < n;) {
            var bone = bones[i];
            var setupLength = bone.data.length;
            if (setupLength < PathConstraint.epsilon) {
              if (scale) {
                lengths[i] = 0;
              }
              spaces[++i] = 0;
            } else {
              var x = setupLength * bone.matrix.a;
              var y = setupLength * bone.matrix.b;
              var length = Math.sqrt(x * x + y * y);
              if (scale) {
                lengths[i] = length;
              }
              spaces[++i] = (lengthSpacing ? setupLength + spacing : spacing) * length / setupLength;
            }
          }
        } else {
          for (var _i = 1; _i < spacesCount; _i++) {
            spaces[_i] = spacing;
          }
        }
        var positions = this.computeWorldPositions(attachment, spacesCount, tangents, data.positionMode === PositionMode.Percent, spacingMode === SpacingMode.Percent);
        var boneX = positions[0];
        var boneY = positions[1];
        var offsetRotation = data.offsetRotation;
        var tip = false;
        if (offsetRotation === 0) {
          tip = rotateMode === RotateMode.Chain;
        } else {
          tip = false;
          var p = this.target.bone.matrix;
          offsetRotation *= p.a * p.d - p.b * p.c > 0 ? degRad : -degRad;
        }
        for (var _i2 = 0, _p = 3; _i2 < boneCount; _i2++, _p += 3) {
          var _bone = bones[_i2];
          var mat = _bone.matrix;
          mat.tx += (boneX - mat.tx) * translateMix;
          mat.ty += (boneY - mat.ty) * translateMix;
          var _x = positions[_p];
          var _y = positions[_p + 1];
          var dx = _x - boneX;
          var dy = _y - boneY;
          if (scale) {
            var _length = lengths[_i2];
            if (_length !== 0) {
              var s = (Math.sqrt(dx * dx + dy * dy) / _length - 1) * rotateMix + 1;
              mat.a *= s;
              mat.b *= s;
            }
          }
          boneX = _x;
          boneY = _y;
          if (rotate) {
            var a = mat.a;
            var b = mat.c;
            var c = mat.b;
            var d = mat.d;
            var r = 0;
            var cos = 0;
            var sin = 0;
            if (tangents) {
              r = positions[_p - 1];
            } else if (spaces[_i2 + 1] === 0) {
              r = positions[_p + 2];
            } else {
              r = Math.atan2(dy, dx);
            }
            r -= Math.atan2(c, a);
            if (tip) {
              cos = Math.cos(r);
              sin = Math.sin(r);
              var _length2 = _bone.data.length;
              boneX += (_length2 * (cos * a - sin * c) - dx) * rotateMix;
              boneY += (_length2 * (sin * a + cos * c) - dy) * rotateMix;
            } else {
              r += offsetRotation;
            }
            if (r > PI) {
              r -= PI2;
            } else if (r < -PI) {
              r += PI2;
            }
            r *= rotateMix;
            cos = Math.cos(r);
            sin = Math.sin(r);
            mat.a = cos * a - sin * c;
            mat.c = cos * b - sin * d;
            mat.b = sin * a + cos * c;
            mat.d = sin * b + cos * d;
          }
          _bone.appliedValid = false;
        }
      }
    }, {
      key: 'computeWorldPositions',
      value: function computeWorldPositions(path, spacesCount, tangents, percentPosition, percentSpacing) {
        var target = this.target;
        var position = this.position;
        var spaces = this.spaces;
        var out = setArraySize(this.positions, spacesCount * 3 + 2);
        var world = null;
        var closed = path.closed;
        var verticesLength = path.worldVerticesLength;
        var curveCount = verticesLength / 6;
        var prevCurve = PathConstraint.NONE;
        if (!path.constantSpeed) {
          var lengths = path.lengths;
          curveCount -= closed ? 1 : 2;
          var _pathLength = lengths[curveCount];
          if (percentPosition) {
            position *= _pathLength;
          }
          if (percentSpacing) {
            for (var i = 0; i < spacesCount; i++) {
              spaces[i] *= _pathLength;
            }
          }
          world = setArraySize(this.world, 8);
          for (var _i3 = 0, o = 0, curve = 0; _i3 < spacesCount; _i3++, o += 3) {
            var space = spaces[_i3];
            position += space;
            var p = position;
            if (closed) {
              p %= _pathLength;
              if (p < 0) {
                p += _pathLength;
              }
              curve = 0;
            } else if (p < 0) {
              if (prevCurve !== PathConstraint.BEFORE) {
                prevCurve = PathConstraint.BEFORE;
                path.computeWorldVertices(target, 2, 4, world, 0, 2);
              }
              this.addBeforePosition(p, world, 0, out, o);
              continue;
            } else if (p > _pathLength) {
              if (prevCurve !== PathConstraint.AFTER) {
                prevCurve = PathConstraint.AFTER;
                path.computeWorldVertices(target, verticesLength - 6, 4, world, 0, 2);
              }
              this.addAfterPosition(p - _pathLength, world, 0, out, o);
              continue;
            }
            for (;; curve++) {
              var length = lengths[curve];
              if (p > length) {
                continue;
              }
              if (curve === 0) {
                p /= length;
              } else {
                var prev = lengths[curve - 1];
                p = (p - prev) / (length - prev);
              }
              break;
            }
            if (curve !== prevCurve) {
              prevCurve = curve;
              if (closed && curve === curveCount) {
                path.computeWorldVertices(target, verticesLength - 4, 4, world, 0, 2);
                path.computeWorldVertices(target, 0, 4, world, 4, 2);
              } else {
                path.computeWorldVertices(target, curve * 6 + 2, 8, world, 0, 2);
              }
            }
            this.addCurvePosition(p, world[0], world[1], world[2], world[3], world[4], world[5], world[6], world[7], out, o, tangents || _i3 > 0 && space === 0);
          }
          return out;
        }
        if (closed) {
          verticesLength += 2;
          world = setArraySize(this.world, verticesLength);
          path.computeWorldVertices(target, 2, verticesLength - 4, world, 0, 2);
          path.computeWorldVertices(target, 0, 2, world, verticesLength - 4, 2);
          world[verticesLength - 2] = world[0];
          world[verticesLength - 1] = world[1];
        } else {
          curveCount--;
          verticesLength -= 4;
          world = setArraySize(this.world, verticesLength);
          path.computeWorldVertices(target, 2, verticesLength, world, 0, 2);
        }
        var curves = setArraySize(this.curves, curveCount);
        var pathLength = 0;
        var x1 = world[0];
        var y1 = world[1];
        var cx1 = 0;
        var cy1 = 0;
        var cx2 = 0;
        var cy2 = 0;
        var x2 = 0;
        var y2 = 0;
        var tmpx = 0;
        var tmpy = 0;
        var dddfx = 0;
        var dddfy = 0;
        var ddfx = 0;
        var ddfy = 0;
        var dfx = 0;
        var dfy = 0;
        for (var _i4 = 0, w = 2; _i4 < curveCount; _i4++, w += 6) {
          cx1 = world[w];
          cy1 = world[w + 1];
          cx2 = world[w + 2];
          cy2 = world[w + 3];
          x2 = world[w + 4];
          y2 = world[w + 5];
          tmpx = (x1 - cx1 * 2 + cx2) * 0.1875;
          tmpy = (y1 - cy1 * 2 + cy2) * 0.1875;
          dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.09375;
          dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.09375;
          ddfx = tmpx * 2 + dddfx;
          ddfy = tmpy * 2 + dddfy;
          dfx = (cx1 - x1) * 0.75 + tmpx + dddfx * 0.16666667;
          dfy = (cy1 - y1) * 0.75 + tmpy + dddfy * 0.16666667;
          pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
          dfx += ddfx;
          dfy += ddfy;
          ddfx += dddfx;
          ddfy += dddfy;
          pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
          dfx += ddfx;
          dfy += ddfy;
          pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
          dfx += ddfx + dddfx;
          dfy += ddfy + dddfy;
          pathLength += Math.sqrt(dfx * dfx + dfy * dfy);
          curves[_i4] = pathLength;
          x1 = x2;
          y1 = y2;
        }
        if (percentPosition) {
          position *= pathLength;
        }
        if (percentSpacing) {
          for (var _i5 = 0; _i5 < spacesCount; _i5++) {
            spaces[_i5] *= pathLength;
          }
        }
        var segments = this.segments;
        var curveLength = 0;
        for (var _i6 = 0, _o = 0, _curve = 0, segment = 0; _i6 < spacesCount; _i6++, _o += 3) {
          var _space = spaces[_i6];
          position += _space;
          var _p2 = position;
          if (closed) {
            _p2 %= pathLength;
            if (_p2 < 0) {
              _p2 += pathLength;
            }
            _curve = 0;
          } else if (_p2 < 0) {
            this.addBeforePosition(_p2, world, 0, out, _o);
            continue;
          } else if (_p2 > pathLength) {
            this.addAfterPosition(_p2 - pathLength, world, verticesLength - 4, out, _o);
            continue;
          }
          for (;; _curve++) {
            var _length3 = curves[_curve];
            if (_p2 > _length3) {
              continue;
            }
            if (_curve === 0) {
              _p2 /= _length3;
            } else {
              var _prev = curves[_curve - 1];
              _p2 = (_p2 - _prev) / (_length3 - _prev);
            }
            break;
          }
          if (_curve !== prevCurve) {
            prevCurve = _curve;
            var ii = _curve * 6;
            x1 = world[ii];
            y1 = world[ii + 1];
            cx1 = world[ii + 2];
            cy1 = world[ii + 3];
            cx2 = world[ii + 4];
            cy2 = world[ii + 5];
            x2 = world[ii + 6];
            y2 = world[ii + 7];
            tmpx = (x1 - cx1 * 2 + cx2) * 0.03;
            tmpy = (y1 - cy1 * 2 + cy2) * 0.03;
            dddfx = ((cx1 - cx2) * 3 - x1 + x2) * 0.006;
            dddfy = ((cy1 - cy2) * 3 - y1 + y2) * 0.006;
            ddfx = tmpx * 2 + dddfx;
            ddfy = tmpy * 2 + dddfy;
            dfx = (cx1 - x1) * 0.3 + tmpx + dddfx * 0.16666667;
            dfy = (cy1 - y1) * 0.3 + tmpy + dddfy * 0.16666667;
            curveLength = Math.sqrt(dfx * dfx + dfy * dfy);
            segments[0] = curveLength;
            for (ii = 1; ii < 8; ii++) {
              dfx += ddfx;
              dfy += ddfy;
              ddfx += dddfx;
              ddfy += dddfy;
              curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
              segments[ii] = curveLength;
            }
            dfx += ddfx;
            dfy += ddfy;
            curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
            segments[8] = curveLength;
            dfx += ddfx + dddfx;
            dfy += ddfy + dddfy;
            curveLength += Math.sqrt(dfx * dfx + dfy * dfy);
            segments[9] = curveLength;
            segment = 0;
          }
          _p2 *= curveLength;
          for (;; segment++) {
            var _length4 = segments[segment];
            if (_p2 > _length4) {
              continue;
            }
            if (segment === 0) {
              _p2 /= _length4;
            } else {
              var _prev2 = segments[segment - 1];
              _p2 = segment + (_p2 - _prev2) / (_length4 - _prev2);
            }
            break;
          }
          this.addCurvePosition(_p2 * 0.1, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, _o, tangents || _i6 > 0 && _space === 0);
        }
        return out;
      }
    }, {
      key: 'addBeforePosition',
      value: function addBeforePosition(p, temp, i, out, o) {
        var x1 = temp[i];
        var y1 = temp[i + 1];
        var dx = temp[i + 2] - x1;
        var dy = temp[i + 3] - y1;
        var r = Math.atan2(dy, dx);
        out[o] = x1 + p * Math.cos(r);
        out[o + 1] = y1 + p * Math.sin(r);
        out[o + 2] = r;
      }
    }, {
      key: 'addAfterPosition',
      value: function addAfterPosition(p, temp, i, out, o) {
        var x1 = temp[i + 2];
        var y1 = temp[i + 3];
        var dx = x1 - temp[i];
        var dy = y1 - temp[i + 1];
        var r = Math.atan2(dy, dx);
        out[o] = x1 + p * Math.cos(r);
        out[o + 1] = y1 + p * Math.sin(r);
        out[o + 2] = r;
      }
    }, {
      key: 'addCurvePosition',
      value: function addCurvePosition(p, x1, y1, cx1, cy1, cx2, cy2, x2, y2, out, o, tangents) {
        if (p === 0 || isNaN(p)) {
          p = 0.0001;
        }
        var tt = p * p;
        var ttt = tt * p;
        var u = 1 - p;
        var uu = u * u;
        var uuu = uu * u;
        var ut = u * p;
        var ut3 = ut * 3;
        var uut3 = u * ut3;
        var utt3 = ut3 * p;
        var x = x1 * uuu + cx1 * uut3 + cx2 * utt3 + x2 * ttt;
        var y = y1 * uuu + cy1 * uut3 + cy2 * utt3 + y2 * ttt;
        out[o] = x;
        out[o + 1] = y;
        if (tangents) {
          out[o + 2] = Math.atan2(y - (y1 * uu + cy1 * ut * 2 + cy2 * tt), x - (x1 * uu + cx1 * ut * 2 + cx2 * tt));
        }
      }
    }]);
    return PathConstraint;
  }();
  PathConstraint.NONE = -1;
  PathConstraint.BEFORE = -2;
  PathConstraint.AFTER = -3;
  PathConstraint.epsilon = 0.00001;

  var Slot = function () {
    function Slot(data, bone) {
      classCallCheck(this, Slot);
      this.deform = [];
      if (data == null) {
        throw new Error('data cannot be null.');
      }
      if (bone == null) {
        throw new Error('bone cannot be null.');
      }
      this.data = data;
      this.bone = bone;
      this.color = new Color();
      this.darkColor = data.darkColor == null ? null : new Color();
      this.setToSetupPose();
      this.blendMode = this.data.blendMode;
    }
    createClass(Slot, [{
      key: 'getAttachment',
      value: function getAttachment() {
        return this.attachment;
      }
    }, {
      key: 'setAttachment',
      value: function setAttachment(attachment) {
        if (this.attachment === attachment) {
          return;
        }
        this.attachment = attachment;
        this.attachmentTime = this.bone.skeleton.time;
        this.deform.length = 0;
      }
    }, {
      key: 'setAttachmentTime',
      value: function setAttachmentTime(time) {
        this.attachmentTime = this.bone.skeleton.time - time;
      }
    }, {
      key: 'getAttachmentTime',
      value: function getAttachmentTime() {
        return this.bone.skeleton.time - this.attachmentTime;
      }
    }, {
      key: 'setToSetupPose',
      value: function setToSetupPose() {
        this.color.setFromColor(this.data.color);
        if (this.darkColor != null) {
          this.darkColor.setFromColor(this.data.darkColor);
        }
        if (this.data.attachmentName == null) {
          this.attachment = null;
        } else {
          this.attachment = null;
          this.setAttachment(this.bone.skeleton.getAttachment(this.data.index, this.data.attachmentName));
        }
      }
    }]);
    return Slot;
  }();

  var TransformConstraint = function () {
    function TransformConstraint(data, skeleton) {
      classCallCheck(this, TransformConstraint);
      this.rotateMix = 0;
      this.translateMix = 0;
      this.scaleMix = 0;
      this.shearMix = 0;
      this.temp = new Vector2();
      this.active = false;
      if (data == null) {
        throw new Error('data cannot be null.');
      }
      if (skeleton == null) {
        throw new Error('skeleton cannot be null.');
      }
      this.data = data;
      this.rotateMix = data.rotateMix;
      this.translateMix = data.translateMix;
      this.scaleMix = data.scaleMix;
      this.shearMix = data.shearMix;
      this.bones = [];
      for (var i = 0; i < data.bones.length; i++) {
        this.bones.push(skeleton.findBone(data.bones[i].name));
      }
      this.target = skeleton.findBone(data.target.name);
    }
    createClass(TransformConstraint, [{
      key: 'isActive',
      value: function isActive() {
        return this.active;
      }
    }, {
      key: 'apply',
      value: function apply() {
        this.update();
      }
    }, {
      key: 'update',
      value: function update() {
        if (this.data.local) {
          if (this.data.relative) {
            this.applyRelativeLocal();
          } else {
            this.applyAbsoluteLocal();
          }
        } else {
          if (this.data.relative) {
            this.applyRelativeWorld();
          } else {
            this.applyAbsoluteWorld();
          }
        }
      }
    }, {
      key: 'applyAbsoluteWorld',
      value: function applyAbsoluteWorld() {
        var rotateMix = this.rotateMix;
        var translateMix = this.translateMix;
        var scaleMix = this.scaleMix;
        var shearMix = this.shearMix;
        var target = this.target;
        var targetMat = target.matrix;
        var ta = targetMat.a;
        var tb = targetMat.c;
        var tc = targetMat.b;
        var td = targetMat.d;
        var degRadReflect = ta * td - tb * tc > 0 ? degRad : -degRad;
        var offsetRotation = this.data.offsetRotation * degRadReflect;
        var offsetShearY = this.data.offsetShearY * degRadReflect;
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++) {
          var bone = bones[i];
          var modified = false;
          var mat = bone.matrix;
          if (rotateMix !== 0) {
            var a = mat.a;
            var b = mat.c;
            var c = mat.b;
            var d = mat.d;
            var r = Math.atan2(tc, ta) - Math.atan2(c, a) + offsetRotation;
            if (r > PI) {
              r -= PI2;
            } else if (r < -PI) {
              r += PI2;
            }
            r *= rotateMix;
            var cos = Math.cos(r);
            var sin = Math.sin(r);
            mat.a = cos * a - sin * c;
            mat.c = cos * b - sin * d;
            mat.b = sin * a + cos * c;
            mat.d = sin * b + cos * d;
            modified = true;
          }
          if (translateMix !== 0) {
            var temp = this.temp;
            target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
            mat.tx += (temp.x - mat.tx) * translateMix;
            mat.ty += (temp.y - mat.ty) * translateMix;
            modified = true;
          }
          if (scaleMix > 0) {
            var s = Math.sqrt(mat.a * mat.a + mat.b * mat.b);
            var ts = Math.sqrt(ta * ta + tc * tc);
            if (s > 0.00001) {
              s = (s + (ts - s + this.data.offsetScaleX) * scaleMix) / s;
            }
            mat.a *= s;
            mat.b *= s;
            s = Math.sqrt(mat.c * mat.c + mat.d * mat.d);
            ts = Math.sqrt(tb * tb + td * td);
            if (s > 0.00001) {
              s = (s + (ts - s + this.data.offsetScaleY) * scaleMix) / s;
            }
            mat.c *= s;
            mat.d *= s;
            modified = true;
          }
          if (shearMix > 0) {
            var _b = mat.c;
            var _d = mat.d;
            var by = Math.atan2(_d, _b);
            var _r = Math.atan2(td, tb) - Math.atan2(tc, ta) - (by - Math.atan2(mat.b, mat.a));
            if (_r > PI) {
              _r -= PI2;
            } else if (_r < -PI) {
              _r += PI2;
            }
            _r = by + (_r + offsetShearY) * shearMix;
            var _s = Math.sqrt(_b * _b + _d * _d);
            mat.c = Math.cos(_r) * _s;
            mat.d = Math.sin(_r) * _s;
            modified = true;
          }
          if (modified) {
            bone.appliedValid = false;
          }
        }
      }
    }, {
      key: 'applyRelativeWorld',
      value: function applyRelativeWorld() {
        var rotateMix = this.rotateMix;
        var translateMix = this.translateMix;
        var scaleMix = this.scaleMix;
        var shearMix = this.shearMix;
        var target = this.target;
        var targetMat = target.matrix;
        var ta = targetMat.a;
        var tb = targetMat.c;
        var tc = targetMat.b;
        var td = targetMat.d;
        var degRadReflect = ta * td - tb * tc > 0 ? degRad : -degRad;
        var offsetRotation = this.data.offsetRotation * degRadReflect;
        var offsetShearY = this.data.offsetShearY * degRadReflect;
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++) {
          var bone = bones[i];
          var modified = false;
          var mat = bone.matrix;
          if (rotateMix !== 0) {
            var a = mat.a;
            var b = mat.c;
            var c = mat.b;
            var d = mat.d;
            var r = Math.atan2(tc, ta) + offsetRotation;
            if (r > PI) {
              r -= PI2;
            } else if (r < -PI) {
              r += PI2;
            }
            r *= rotateMix;
            var cos = Math.cos(r);
            var sin = Math.sin(r);
            mat.a = cos * a - sin * c;
            mat.c = cos * b - sin * d;
            mat.b = sin * a + cos * c;
            mat.d = sin * b + cos * d;
            modified = true;
          }
          if (translateMix !== 0) {
            var temp = this.temp;
            target.localToWorld(temp.set(this.data.offsetX, this.data.offsetY));
            mat.tx += temp.x * translateMix;
            mat.ty += temp.y * translateMix;
            modified = true;
          }
          if (scaleMix > 0) {
            var s = (Math.sqrt(ta * ta + tc * tc) - 1 + this.data.offsetScaleX) * scaleMix + 1;
            mat.a *= s;
            mat.b *= s;
            s = (Math.sqrt(tb * tb + td * td) - 1 + this.data.offsetScaleY) * scaleMix + 1;
            mat.c *= s;
            mat.d *= s;
            modified = true;
          }
          if (shearMix > 0) {
            var _r2 = Math.atan2(td, tb) - Math.atan2(tc, ta);
            if (_r2 > PI) {
              _r2 -= PI2;
            } else if (_r2 < -PI) {
              _r2 += PI2;
            }
            var _b2 = mat.c;
            var _d2 = mat.d;
            _r2 = Math.atan2(_d2, _b2) + (_r2 - PI / 2 + offsetShearY) * shearMix;
            var _s2 = Math.sqrt(_b2 * _b2 + _d2 * _d2);
            mat.c = Math.cos(_r2) * _s2;
            mat.d = Math.sin(_r2) * _s2;
            modified = true;
          }
          if (modified) {
            bone.appliedValid = false;
          }
        }
      }
    }, {
      key: 'applyAbsoluteLocal',
      value: function applyAbsoluteLocal() {
        var rotateMix = this.rotateMix;
        var translateMix = this.translateMix;
        var scaleMix = this.scaleMix;
        var shearMix = this.shearMix;
        var target = this.target;
        if (!target.appliedValid) {
          target.updateAppliedTransform();
        }
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++) {
          var bone = bones[i];
          if (!bone.appliedValid) {
            bone.updateAppliedTransform();
          }
          var rotation = bone.arotation;
          if (rotateMix !== 0) {
            var r = target.arotation - rotation + this.data.offsetRotation;
            r -= (16384 - (16384.499999999996 - r / 360 | 0)) * 360;
            rotation += r * rotateMix;
          }
          var x = bone.ax;
          var y = bone.ay;
          if (translateMix !== 0) {
            x += (target.ax - x + this.data.offsetX) * translateMix;
            y += (target.ay - y + this.data.offsetY) * translateMix;
          }
          var scaleX = bone.ascaleX;
          var scaleY = bone.ascaleY;
          if (scaleMix > 0) {
            if (scaleX > 0.00001) {
              scaleX = (scaleX + (target.ascaleX - scaleX + this.data.offsetScaleX) * scaleMix) / scaleX;
            }
            if (scaleY > 0.00001) {
              scaleY = (scaleY + (target.ascaleY - scaleY + this.data.offsetScaleY) * scaleMix) / scaleY;
            }
          }
          var shearY = bone.ashearY;
          if (shearMix > 0) {
            var _r3 = target.ashearY - shearY + this.data.offsetShearY;
            _r3 -= (16384 - (16384.499999999996 - _r3 / 360 | 0)) * 360;
            bone.shearY += _r3 * shearMix;
          }
          bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
        }
      }
    }, {
      key: 'applyRelativeLocal',
      value: function applyRelativeLocal() {
        var rotateMix = this.rotateMix;
        var translateMix = this.translateMix;
        var scaleMix = this.scaleMix;
        var shearMix = this.shearMix;
        var target = this.target;
        if (!target.appliedValid) {
          target.updateAppliedTransform();
        }
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++) {
          var bone = bones[i];
          if (!bone.appliedValid) {
            bone.updateAppliedTransform();
          }
          var rotation = bone.arotation;
          if (rotateMix !== 0) {
            rotation += (target.arotation + this.data.offsetRotation) * rotateMix;
          }
          var x = bone.ax;
          var y = bone.ay;
          if (translateMix !== 0) {
            x += (target.ax + this.data.offsetX) * translateMix;
            y += (target.ay + this.data.offsetY) * translateMix;
          }
          var scaleX = bone.ascaleX;
          var scaleY = bone.ascaleY;
          if (scaleMix > 0) {
            if (scaleX > 0.00001) {
              scaleX *= (target.ascaleX - 1 + this.data.offsetScaleX) * scaleMix + 1;
            }
            if (scaleY > 0.00001) {
              scaleY *= (target.ascaleY - 1 + this.data.offsetScaleY) * scaleMix + 1;
            }
          }
          var shearY = bone.ashearY;
          if (shearMix > 0) {
            shearY += (target.ashearY + this.data.offsetShearY) * shearMix;
          }
          bone.updateWorldTransformWith(x, y, rotation, scaleX, scaleY, bone.ashearX, shearY);
        }
      }
    }]);
    return TransformConstraint;
  }();

  var Skeleton = function () {
    function Skeleton(data) {
      classCallCheck(this, Skeleton);
      this._updateCache = [];
      this.updateCacheReset = [];
      this.time = 0;
      this.scaleX = 1;
      this.scaleY = 1;
      this.x = 0;
      this.y = 0;
      if (data == null) {
        throw new Error('data cannot be null.');
      }
      this.data = data;
      this.bones = [];
      for (var i = 0; i < data.bones.length; i++) {
        var boneData = data.bones[i];
        var bone = void 0;
        if (boneData.parent == null) {
          bone = new Bone(boneData, this, null);
        } else {
          var parent = this.bones[boneData.parent.index];
          bone = new Bone(boneData, this, parent);
          parent.children.push(bone);
        }
        this.bones.push(bone);
      }
      this.slots = [];
      this.drawOrder = [];
      for (var _i = 0; _i < data.slots.length; _i++) {
        var slotData = data.slots[_i];
        var _bone = this.bones[slotData.boneData.index];
        var slot = new Slot(slotData, _bone);
        this.slots.push(slot);
        this.drawOrder.push(slot);
      }
      this.ikConstraints = [];
      for (var _i2 = 0; _i2 < data.ikConstraints.length; _i2++) {
        var ikConstraintData = data.ikConstraints[_i2];
        this.ikConstraints.push(new IKConstraint(ikConstraintData, this));
      }
      this.transformConstraints = [];
      for (var _i3 = 0; _i3 < data.transformConstraints.length; _i3++) {
        var transformConstraintData = data.transformConstraints[_i3];
        this.transformConstraints.push(new TransformConstraint(transformConstraintData, this));
      }
      this.pathConstraints = [];
      for (var _i4 = 0; _i4 < data.pathConstraints.length; _i4++) {
        var pathConstraintData = data.pathConstraints[_i4];
        this.pathConstraints.push(new PathConstraint(pathConstraintData, this));
      }
      this.color = new Color(1, 1, 1, 1);
      this.updateCache();
    }
    createClass(Skeleton, [{
      key: 'updateCache',
      value: function updateCache() {
        var updateCache = this._updateCache;
        updateCache.length = 0;
        this.updateCacheReset.length = 0;
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++) {
          var bone = bones[i];
          bone.sorted = bone.data.skinRequired;
          bone.active = !bone.sorted;
        }
        if (this.skin != null) {
          var skinBones = this.skin.bones;
          for (var _i5 = 0, _n = this.skin.bones.length; _i5 < _n; _i5++) {
            var _bone2 = this.bones[skinBones[_i5].index];
            do {
              _bone2.sorted = false;
              _bone2.active = true;
              _bone2 = _bone2.parent;
            } while (_bone2 != null);
          }
        }
        var ikConstraints = this.ikConstraints;
        var transformConstraints = this.transformConstraints;
        var pathConstraints = this.pathConstraints;
        var ikCount = ikConstraints.length;
        var transformCount = transformConstraints.length;
        var pathCount = pathConstraints.length;
        var constraintCount = ikCount + transformCount + pathCount;
        outer: for (var _i6 = 0; _i6 < constraintCount; _i6++) {
          for (var ii = 0; ii < ikCount; ii++) {
            var constraint = ikConstraints[ii];
            if (constraint.data.order === _i6) {
              this.sortIKConstraint(constraint);
              continue outer;
            }
          }
          for (var _ii = 0; _ii < transformCount; _ii++) {
            var _constraint = transformConstraints[_ii];
            if (_constraint.data.order === _i6) {
              this.sortTransformConstraint(_constraint);
              continue outer;
            }
          }
          for (var _ii2 = 0; _ii2 < pathCount; _ii2++) {
            var _constraint2 = pathConstraints[_ii2];
            if (_constraint2.data.order === _i6) {
              this.sortPathConstraint(_constraint2);
              continue outer;
            }
          }
        }
        for (var _i7 = 0, _n2 = bones.length; _i7 < _n2; _i7++) {
          this.sortBone(bones[_i7]);
        }
      }
    }, {
      key: 'sortIKConstraint',
      value: function sortIKConstraint(constraint) {
        constraint.active = constraint.target.isActive() && (!constraint.data.skinRequired || this.skin != null && contains(this.skin.constraints, constraint.data, true));
        if (!constraint.active) {
          return;
        }
        var target = constraint.target;
        this.sortBone(target);
        var constrained = constraint.bones;
        var parent = constrained[0];
        this.sortBone(parent);
        if (constrained.length > 1) {
          var child = constrained[constrained.length - 1];
          if (!(this._updateCache.indexOf(child) > -1)) {
            this.updateCacheReset.push(child);
          }
        }
        this._updateCache.push(constraint);
        this.sortReset(parent.children);
        constrained[constrained.length - 1].sorted = true;
      }
    }, {
      key: 'sortPathConstraint',
      value: function sortPathConstraint(constraint) {
        constraint.active = constraint.target.bone.isActive() && (!constraint.data.skinRequired || this.skin != null && contains(this.skin.constraints, constraint.data, true));
        if (!constraint.active) {
          return;
        }
        var slot = constraint.target;
        var slotIndex = slot.data.index;
        var slotBone = slot.bone;
        if (this.skin != null) {
          this.sortPathConstraintAttachment(this.skin, slotIndex, slotBone);
        }
        if (this.data.defaultSkin != null && this.data.defaultSkin !== this.skin) {
          this.sortPathConstraintAttachment(this.data.defaultSkin, slotIndex, slotBone);
        }
        for (var i = 0, n = this.data.skins.length; i < n; i++) {
          this.sortPathConstraintAttachment(this.data.skins[i], slotIndex, slotBone);
        }
        var attachment = slot.getAttachment();
        if (attachment instanceof PathAttachment) {
          this.sortPathConstraintAttachmentWith(attachment, slotBone);
        }
        var constrained = constraint.bones;
        var boneCount = constrained.length;
        for (var _i8 = 0; _i8 < boneCount; _i8++) {
          this.sortBone(constrained[_i8]);
        }
        this._updateCache.push(constraint);
        for (var _i9 = 0; _i9 < boneCount; _i9++) {
          this.sortReset(constrained[_i9].children);
        }
        for (var _i10 = 0; _i10 < boneCount; _i10++) {
          constrained[_i10].sorted = true;
        }
      }
    }, {
      key: 'sortTransformConstraint',
      value: function sortTransformConstraint(constraint) {
        constraint.active = constraint.target.isActive() && (!constraint.data.skinRequired || this.skin != null && contains(this.skin.constraints, constraint.data, true));
        if (!constraint.active) {
          return;
        }
        this.sortBone(constraint.target);
        var constrained = constraint.bones;
        var boneCount = constrained.length;
        if (constraint.data.local) {
          for (var i = 0; i < boneCount; i++) {
            var child = constrained[i];
            this.sortBone(child.parent);
            if (!(this._updateCache.indexOf(child) > -1)) {
              this.updateCacheReset.push(child);
            }
          }
        } else {
          for (var _i11 = 0; _i11 < boneCount; _i11++) {
            this.sortBone(constrained[_i11]);
          }
        }
        this._updateCache.push(constraint);
        for (var ii = 0; ii < boneCount; ii++) {
          this.sortReset(constrained[ii].children);
        }
        for (var _ii3 = 0; _ii3 < boneCount; _ii3++) {
          constrained[_ii3].sorted = true;
        }
      }
    }, {
      key: 'sortPathConstraintAttachment',
      value: function sortPathConstraintAttachment(skin, slotIndex, slotBone) {
        var attachments = skin.attachments[slotIndex];
        if (!attachments) {
          return;
        }
        for (var key in attachments) {
          this.sortPathConstraintAttachmentWith(attachments[key], slotBone);
        }
      }
    }, {
      key: 'sortPathConstraintAttachmentWith',
      value: function sortPathConstraintAttachmentWith(attachment, slotBone) {
        if (!(attachment instanceof PathAttachment)) {
          return;
        }
        var pathBones = attachment.bones;
        if (pathBones == null) {
          this.sortBone(slotBone);
        } else {
          var bones = this.bones;
          var i = 0;
          while (i < pathBones.length) {
            var boneCount = pathBones[i++];
            for (var n = i + boneCount; i < n; i++) {
              var boneIndex = pathBones[i];
              this.sortBone(bones[boneIndex]);
            }
          }
        }
      }
    }, {
      key: 'sortBone',
      value: function sortBone(bone) {
        if (bone.sorted) {
          return;
        }
        var parent = bone.parent;
        if (parent != null) {
          this.sortBone(parent);
        }
        bone.sorted = true;
        this._updateCache.push(bone);
      }
    }, {
      key: 'sortReset',
      value: function sortReset(bones) {
        for (var i = 0, n = bones.length; i < n; i++) {
          var bone = bones[i];
          if (!bone.active) {
            continue;
          }
          if (bone.sorted) {
            this.sortReset(bone.children);
          }
          bone.sorted = false;
        }
      }
    }, {
      key: 'updateWorldTransform',
      value: function updateWorldTransform() {
        var updateCacheReset = this.updateCacheReset;
        for (var i = 0, n = updateCacheReset.length; i < n; i++) {
          var bone = updateCacheReset[i];
          bone.ax = bone.x;
          bone.ay = bone.y;
          bone.arotation = bone.rotation;
          bone.ascaleX = bone.scaleX;
          bone.ascaleY = bone.scaleY;
          bone.ashearX = bone.shearX;
          bone.ashearY = bone.shearY;
          bone.appliedValid = true;
        }
        var updateCache = this._updateCache;
        for (var _i12 = 0, _n3 = updateCache.length; _i12 < _n3; _i12++) {
          updateCache[_i12].update();
        }
      }
    }, {
      key: 'setToSetupPose',
      value: function setToSetupPose() {
        this.setBonesToSetupPose();
        this.setSlotsToSetupPose();
      }
    }, {
      key: 'setBonesToSetupPose',
      value: function setBonesToSetupPose() {
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++) {
          bones[i].setToSetupPose();
        }
        var ikConstraints = this.ikConstraints;
        for (var _i13 = 0, _n4 = ikConstraints.length; _i13 < _n4; _i13++) {
          var constraint = ikConstraints[_i13];
          constraint.mix = constraint.data.mix;
          constraint.softness = constraint.data.softness;
          constraint.bendDirection = constraint.data.bendDirection;
          constraint.compress = constraint.data.compress;
          constraint.stretch = constraint.data.stretch;
        }
        var transformConstraints = this.transformConstraints;
        for (var _i14 = 0, _n5 = transformConstraints.length; _i14 < _n5; _i14++) {
          var _constraint3 = transformConstraints[_i14];
          var data = _constraint3.data;
          _constraint3.rotateMix = data.rotateMix;
          _constraint3.translateMix = data.translateMix;
          _constraint3.scaleMix = data.scaleMix;
          _constraint3.shearMix = data.shearMix;
        }
        var pathConstraints = this.pathConstraints;
        for (var _i15 = 0, _n6 = pathConstraints.length; _i15 < _n6; _i15++) {
          var _constraint4 = pathConstraints[_i15];
          var _data = _constraint4.data;
          _constraint4.position = _data.position;
          _constraint4.spacing = _data.spacing;
          _constraint4.rotateMix = _data.rotateMix;
          _constraint4.translateMix = _data.translateMix;
        }
      }
    }, {
      key: 'setSlotsToSetupPose',
      value: function setSlotsToSetupPose() {
        var slots = this.slots;
        arrayCopy(slots, 0, this.drawOrder, 0, slots.length);
        for (var i = 0, n = slots.length; i < n; i++) {
          slots[i].setToSetupPose();
        }
      }
    }, {
      key: 'getRootBone',
      value: function getRootBone() {
        if (this.bones.length === 0) {
          return null;
        }
        return this.bones[0];
      }
    }, {
      key: 'findBone',
      value: function findBone(boneName) {
        if (boneName == null) {
          throw new Error('boneName cannot be null.');
        }
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++) {
          var bone = bones[i];
          if (bone.data.name === boneName) {
            return bone;
          }
        }
        return null;
      }
    }, {
      key: 'findBoneIndex',
      value: function findBoneIndex(boneName) {
        if (boneName == null) {
          throw new Error('boneName cannot be null.');
        }
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++) {
          if (bones[i].data.name === boneName) {
            return i;
          }
        }
        return -1;
      }
    }, {
      key: 'findSlot',
      value: function findSlot(slotName) {
        if (slotName == null) {
          throw new Error('slotName cannot be null.');
        }
        var slots = this.slots;
        for (var i = 0, n = slots.length; i < n; i++) {
          var slot = slots[i];
          if (slot.data.name === slotName) {
            return slot;
          }
        }
        return null;
      }
    }, {
      key: 'findSlotIndex',
      value: function findSlotIndex(slotName) {
        if (slotName == null) {
          throw new Error('slotName cannot be null.');
        }
        var slots = this.slots;
        for (var i = 0, n = slots.length; i < n; i++) {
          if (slots[i].data.name === slotName) {
            return i;
          }
        }
        return -1;
      }
    }, {
      key: 'setSkinByName',
      value: function setSkinByName(skinName) {
        var skin = this.data.findSkin(skinName);
        if (skin == null) {
          throw new Error('Skin not found: ' + skinName);
        }
        this.setSkin(skin);
      }
    }, {
      key: 'setSkin',
      value: function setSkin(newSkin) {
        if (newSkin === this.skin) {
          return;
        }
        if (newSkin != null) {
          if (this.skin != null) {
            newSkin.attachAll(this, this.skin);
          } else {
            var slots = this.slots;
            for (var i = 0, n = slots.length; i < n; i++) {
              var slot = slots[i];
              var name = slot.data.attachmentName;
              if (name != null) {
                var attachment = newSkin.getAttachment(i, name);
                if (attachment != null) {
                  slot.setAttachment(attachment);
                }
              }
            }
          }
        }
        this.skin = newSkin;
        this.updateCache();
      }
    }, {
      key: 'getAttachmentByName',
      value: function getAttachmentByName(slotName, attachmentName) {
        return this.getAttachment(this.data.findSlotIndex(slotName), attachmentName);
      }
    }, {
      key: 'getAttachment',
      value: function getAttachment(slotIndex, attachmentName) {
        if (attachmentName == null) {
          throw new Error('attachmentName cannot be null.');
        }
        if (this.skin != null) {
          var attachment = this.skin.getAttachment(slotIndex, attachmentName);
          if (attachment != null) {
            return attachment;
          }
        }
        if (this.data.defaultSkin != null) {
          return this.data.defaultSkin.getAttachment(slotIndex, attachmentName);
        }
        return null;
      }
    }, {
      key: 'setAttachment',
      value: function setAttachment(slotName, attachmentName) {
        if (slotName == null) {
          throw new Error('slotName cannot be null.');
        }
        var slots = this.slots;
        for (var i = 0, n = slots.length; i < n; i++) {
          var slot = slots[i];
          if (slot.data.name === slotName) {
            var attachment = null;
            if (attachmentName != null) {
              attachment = this.getAttachment(i, attachmentName);
              if (attachment == null) {
                throw new Error('Attachment not found: ' + attachmentName + ', for slot: ' + slotName);
              }
            }
            slot.setAttachment(attachment);
            return;
          }
        }
        throw new Error('Slot not found: ' + slotName);
      }
    }, {
      key: 'findIKConstraint',
      value: function findIKConstraint(constraintName) {
        if (constraintName == null) {
          throw new Error('constraintName cannot be null.');
        }
        var ikConstraints = this.ikConstraints;
        for (var i = 0, n = ikConstraints.length; i < n; i++) {
          var ikConstraint = ikConstraints[i];
          if (ikConstraint.data.name === constraintName) {
            return ikConstraint;
          }
        }
        return null;
      }
    }, {
      key: 'findTransformConstraint',
      value: function findTransformConstraint(constraintName) {
        if (constraintName == null) {
          throw new Error('constraintName cannot be null.');
        }
        var transformConstraints = this.transformConstraints;
        for (var i = 0, n = transformConstraints.length; i < n; i++) {
          var constraint = transformConstraints[i];
          if (constraint.data.name === constraintName) {
            return constraint;
          }
        }
        return null;
      }
    }, {
      key: 'findPathConstraint',
      value: function findPathConstraint(constraintName) {
        if (constraintName == null) {
          throw new Error('constraintName cannot be null.');
        }
        var pathConstraints = this.pathConstraints;
        for (var i = 0, n = pathConstraints.length; i < n; i++) {
          var constraint = pathConstraints[i];
          if (constraint.data.name === constraintName) {
            return constraint;
          }
        }
        return null;
      }
    }, {
      key: 'getBounds',
      value: function getBounds(offset, size) {
        var temp = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Array(2);
        if (offset == null) {
          throw new Error('offset cannot be null.');
        }
        if (size == null) {
          throw new Error('size cannot be null.');
        }
        var drawOrder = this.drawOrder;
        var minX = Number.POSITIVE_INFINITY;
        var minY = Number.POSITIVE_INFINITY;
        var maxX = Number.NEGATIVE_INFINITY;
        var maxY = Number.NEGATIVE_INFINITY;
        for (var i = 0, n = drawOrder.length; i < n; i++) {
          var slot = drawOrder[i];
          if (!slot.bone.active) {
            continue;
          }
          var verticesLength = 0;
          var vertices = null;
          var attachment = slot.getAttachment();
          if (attachment instanceof RegionAttachment) {
            verticesLength = 8;
            vertices = setArraySize(temp, verticesLength, 0);
            attachment.computeWorldVertices(slot.bone, vertices, 0, 2);
          } else if (attachment instanceof MeshAttachment) {
            var mesh = attachment;
            verticesLength = mesh.worldVerticesLength;
            vertices = setArraySize(temp, verticesLength, 0);
            mesh.computeWorldVertices(slot, 0, verticesLength, vertices, 0, 2);
          }
          if (vertices != null) {
            for (var ii = 0, nn = vertices.length; ii < nn; ii += 2) {
              var x = vertices[ii];
              var y = vertices[ii + 1];
              minX = Math.min(minX, x);
              minY = Math.min(minY, y);
              maxX = Math.max(maxX, x);
              maxY = Math.max(maxY, y);
            }
          }
        }
        offset.set(minX, minY);
        size.set(maxX - minX, maxY - minY);
      }
    }, {
      key: 'update',
      value: function update(delta) {
        this.time += delta;
      }
    }]);
    return Skeleton;
  }();

  var TransformConstraintData = function (_ConstraintData) {
    inherits(TransformConstraintData, _ConstraintData);
    function TransformConstraintData(name) {
      classCallCheck(this, TransformConstraintData);
      var _this = possibleConstructorReturn(this, (TransformConstraintData.__proto__ || Object.getPrototypeOf(TransformConstraintData)).call(this, name, 0, false));
      _this.bones = [];
      _this.rotateMix = 0;
      _this.translateMix = 0;
      _this.scaleMix = 0;
      _this.shearMix = 0;
      _this.offsetRotation = 0;
      _this.offsetX = 0;
      _this.offsetY = 0;
      _this.offsetScaleX = 0;
      _this.offsetScaleY = 0;
      _this.offsetShearY = 0;
      _this.relative = false;
      _this.local = false;
      return _this;
    }
    return TransformConstraintData;
  }(ConstraintData);

  var SkeletonData = function () {
    function SkeletonData() {
      classCallCheck(this, SkeletonData);
      this.bones = [];
      this.slots = [];
      this.skins = [];
      this.events = [];
      this.animations = [];
      this.ikConstraints = [];
      this.transformConstraints = [];
      this.pathConstraints = [];
      this.fps = 0;
    }
    createClass(SkeletonData, [{
      key: 'findBone',
      value: function findBone(boneName) {
        if (boneName == null) {
          throw new Error('boneName cannot be null.');
        }
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++) {
          var bone = bones[i];
          if (bone.name === boneName) {
            return bone;
          }
        }
        return null;
      }
    }, {
      key: 'findBoneIndex',
      value: function findBoneIndex(boneName) {
        if (boneName == null) {
          throw new Error('boneName cannot be null.');
        }
        var bones = this.bones;
        for (var i = 0, n = bones.length; i < n; i++) {
          if (bones[i].name === boneName) {
            return i;
          }
        }
        return -1;
      }
    }, {
      key: 'findSlot',
      value: function findSlot(slotName) {
        if (slotName == null) {
          throw new Error('slotName cannot be null.');
        }
        var slots = this.slots;
        for (var i = 0, n = slots.length; i < n; i++) {
          var slot = slots[i];
          if (slot.name === slotName) {
            return slot;
          }
        }
        return null;
      }
    }, {
      key: 'findSlotIndex',
      value: function findSlotIndex(slotName) {
        if (slotName == null) {
          throw new Error('slotName cannot be null.');
        }
        var slots = this.slots;
        for (var i = 0, n = slots.length; i < n; i++) {
          if (slots[i].name === slotName) {
            return i;
          }
        }
        return -1;
      }
    }, {
      key: 'findSkin',
      value: function findSkin(skinName) {
        if (skinName == null) {
          throw new Error('skinName cannot be null.');
        }
        var skins = this.skins;
        for (var i = 0, n = skins.length; i < n; i++) {
          var skin = skins[i];
          if (skin.name === skinName) {
            return skin;
          }
        }
        return null;
      }
    }, {
      key: 'findEvent',
      value: function findEvent(eventDataName) {
        if (eventDataName == null) {
          throw new Error('eventDataName cannot be null.');
        }
        var events = this.events;
        for (var i = 0, n = events.length; i < n; i++) {
          var event = events[i];
          if (event.name === eventDataName) {
            return event;
          }
        }
        return null;
      }
    }, {
      key: 'findAnimation',
      value: function findAnimation(animationName) {
        if (animationName == null) {
          throw new Error('animationName cannot be null.');
        }
        var animations = this.animations;
        for (var i = 0, n = animations.length; i < n; i++) {
          var animation = animations[i];
          if (animation.name === animationName) {
            return animation;
          }
        }
        return null;
      }
    }, {
      key: 'findIKConstraint',
      value: function findIKConstraint(constraintName) {
        if (constraintName == null) {
          throw new Error('constraintName cannot be null.');
        }
        var ikConstraints = this.ikConstraints;
        for (var i = 0, n = ikConstraints.length; i < n; i++) {
          var constraint = ikConstraints[i];
          if (constraint.name === constraintName) {
            return constraint;
          }
        }
        return null;
      }
    }, {
      key: 'findTransformConstraint',
      value: function findTransformConstraint(constraintName) {
        if (constraintName == null) {
          throw new Error('constraintName cannot be null.');
        }
        var transformConstraints = this.transformConstraints;
        for (var i = 0, n = transformConstraints.length; i < n; i++) {
          var constraint = transformConstraints[i];
          if (constraint.name === constraintName) {
            return constraint;
          }
        }
        return null;
      }
    }, {
      key: 'findPathConstraint',
      value: function findPathConstraint(constraintName) {
        if (constraintName == null) {
          throw new Error('constraintName cannot be null.');
        }
        var pathConstraints = this.pathConstraints;
        for (var i = 0, n = pathConstraints.length; i < n; i++) {
          var constraint = pathConstraints[i];
          if (constraint.name === constraintName) {
            return constraint;
          }
        }
        return null;
      }
    }, {
      key: 'findPathConstraintIndex',
      value: function findPathConstraintIndex(pathConstraintName) {
        if (pathConstraintName == null) {
          throw new Error('pathConstraintName cannot be null.');
        }
        var pathConstraints = this.pathConstraints;
        for (var i = 0, n = pathConstraints.length; i < n; i++) {
          if (pathConstraints[i].name === pathConstraintName) {
            return i;
          }
        }
        return -1;
      }
    }]);
    return SkeletonData;
  }();

  var SlotData = function SlotData(index, name, boneData) {
    classCallCheck(this, SlotData);
    this.color = new Color(1, 1, 1, 1);
    if (index < 0) {
      throw new Error('index must be >= 0.');
    }
    if (name == null) {
      throw new Error('name cannot be null.');
    }
    if (boneData == null) {
      throw new Error('boneData cannot be null.');
    }
    this.index = index;
    this.name = name;
    this.boneData = boneData;
  };

  var SkinEntry = function SkinEntry(slotIndex, name, attachment) {
    classCallCheck(this, SkinEntry);
    this.slotIndex = slotIndex;
    this.name = name;
    this.attachment = attachment;
  };
  var Skin = function () {
    function Skin(name) {
      classCallCheck(this, Skin);
      if (name == null) {
        throw new Error('name cannot be null.');
      }
      this.name = name;
      this.attachments = [];
      this.bones = [];
      this.constraints = [];
    }
    createClass(Skin, [{
      key: 'setAttachment',
      value: function setAttachment(slotIndex, name, attachment) {
        if (attachment == null) {
          throw new Error('attachment cannot be null.');
        }
        var attachments = this.attachments;
        if (slotIndex >= attachments.length) {
          attachments.length = slotIndex + 1;
        }
        if (!attachments[slotIndex]) {
          attachments[slotIndex] = {};
        }
        attachments[slotIndex][name] = attachment;
      }
    }, {
      key: 'addSkin',
      value: function addSkin(skin) {
        for (var i = 0; i < skin.bones.length; i++) {
          var bone = skin.bones[i];
          var contained = false;
          for (var j = 0; j < this.bones.length; j++) {
            if (this.bones[j] === bone) {
              contained = true;
              break;
            }
          }
          if (!contained) {
            this.bones.push(bone);
          }
        }
        for (var _i = 0; _i < skin.constraints.length; _i++) {
          var constraint = skin.constraints[_i];
          var _contained = false;
          for (var _j = 0; _j < this.constraints.length; _j++) {
            if (this.constraints[_j] === constraint) {
              _contained = true;
              break;
            }
          }
          if (!_contained) {
            this.constraints.push(constraint);
          }
        }
        var attachments = skin.getAttachments();
        for (var _i2 = 0; _i2 < attachments.length; _i2++) {
          var attachment = attachments[_i2];
          this.setAttachment(attachment.slotIndex, attachment.name, attachment.attachment);
        }
      }
    }, {
      key: 'copySkin',
      value: function copySkin(skin) {
        for (var i = 0; i < skin.bones.length; i++) {
          var bone = skin.bones[i];
          var contained = false;
          for (var j = 0; j < this.bones.length; j++) {
            if (this.bones[j] === bone) {
              contained = true;
              break;
            }
          }
          if (!contained) {
            this.bones.push(bone);
          }
        }
        for (var _i3 = 0; _i3 < skin.constraints.length; _i3++) {
          var constraint = skin.constraints[_i3];
          var _contained2 = false;
          for (var _j2 = 0; _j2 < this.constraints.length; _j2++) {
            if (this.constraints[_j2] === constraint) {
              _contained2 = true;
              break;
            }
          }
          if (!_contained2) {
            this.constraints.push(constraint);
          }
        }
        var attachments = skin.getAttachments();
        for (var _i4 = 0; _i4 < attachments.length; _i4++) {
          var attachment = attachments[_i4];
          if (attachment.attachment == null) {
            continue;
          }
          if (attachment.attachment instanceof MeshAttachment) {
            attachment.attachment = attachment.attachment.newLinkedMesh();
            this.setAttachment(attachment.slotIndex, attachment.name, attachment.attachment);
          } else {
            attachment.attachment = attachment.attachment.copy();
            this.setAttachment(attachment.slotIndex, attachment.name, attachment.attachment);
          }
        }
      }
    }, {
      key: 'getAttachment',
      value: function getAttachment(slotIndex, name) {
        var dictionary = this.attachments[slotIndex];
        return dictionary ? dictionary[name] : null;
      }
    }, {
      key: 'removeAttachment',
      value: function removeAttachment(slotIndex, name) {
        var dictionary = this.attachments[slotIndex];
        if (dictionary) {
          dictionary[name] = null;
        }
      }
    }, {
      key: 'getAttachments',
      value: function getAttachments() {
        var entries = [];
        for (var i = 0; i < this.attachments.length; i++) {
          var slotAttachments = this.attachments[i];
          if (slotAttachments) {
            for (var name in slotAttachments) {
              var attachment = slotAttachments[name];
              if (attachment) {
                entries.push(new SkinEntry(i, name, attachment));
              }
            }
          }
        }
        return entries;
      }
    }, {
      key: 'getAttachmentsForSlot',
      value: function getAttachmentsForSlot(slotIndex, attachments) {
        var slotAttachments = this.attachments[slotIndex];
        if (slotAttachments) {
          for (var name in slotAttachments) {
            var attachment = slotAttachments[name];
            if (attachment) {
              attachments.push(new SkinEntry(slotIndex, name, attachment));
            }
          }
        }
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.attachments.length = 0;
        this.bones.length = 0;
        this.constraints.length = 0;
      }
    }, {
      key: 'attachAll',
      value: function attachAll(skeleton, oldSkin) {
        var slotIndex = 0;
        for (var i = 0; i < skeleton.slots.length; i++) {
          var slot = skeleton.slots[i];
          var slotAttachment = slot.getAttachment();
          if (slotAttachment && slotIndex < oldSkin.attachments.length) {
            var dictionary = oldSkin.attachments[slotIndex];
            for (var key in dictionary) {
              var skinAttachment = dictionary[key];
              if (slotAttachment === skinAttachment) {
                var attachment = this.getAttachment(slotIndex, key);
                if (attachment != null) {
                  slot.setAttachment(attachment);
                }
                break;
              }
            }
          }
          slotIndex++;
        }
      }
    }]);
    return Skin;
  }();

  var SkeletonBinary = function () {
    function SkeletonBinary(attachmentLoader) {
      classCallCheck(this, SkeletonBinary);
      this.scale = 1;
      this.linkedMeshes = [];
      this.attachmentLoader = attachmentLoader;
    }
    createClass(SkeletonBinary, [{
      key: 'readSkeletonData',
      value: function readSkeletonData(binary) {
        var scale = this.scale;
        var skeletonData = new SkeletonData();
        skeletonData.name = '';
        var input = new BinaryInput(binary);
        skeletonData.hash = input.readString();
        skeletonData.version = input.readString();
        if (skeletonData.version === '3.8.75') {
          console.error('Unsupported skeleton data, 3.8.75 is deprecated, please export with a newer version of Spine.');
        }
        skeletonData.x = input.readFloat();
        skeletonData.y = input.readFloat();
        skeletonData.width = input.readFloat();
        skeletonData.height = input.readFloat();
        var nonessential = input.readBoolean();
        if (nonessential) {
          skeletonData.fps = input.readFloat();
          skeletonData.imagesPath = input.readString();
          skeletonData.audioPath = input.readString();
        }
        var n = 0;
        n = input.readInt(true);
        for (var i = 0; i < n; i++) {
          input.strings.push(input.readString());
        }
        n = input.readInt(true);
        for (var _i = 0; _i < n; _i++) {
          var name = input.readString();
          var parent = _i === 0 ? null : skeletonData.bones[input.readInt(true)];
          var data = new BoneData(_i, name, parent);
          data.rotation = input.readFloat();
          data.x = input.readFloat() * scale;
          data.y = input.readFloat() * scale;
          data.scaleX = input.readFloat();
          data.scaleY = input.readFloat();
          data.shearX = input.readFloat();
          data.shearY = input.readFloat();
          data.length = input.readFloat() * scale;
          data.transformMode = SkeletonBinary.TransformModeValues[input.readInt(true)];
          data.skinRequired = input.readBoolean();
          if (nonessential) {
            Color.rgba8888ToColor(data.color, input.readInt32());
          }
          skeletonData.bones.push(data);
        }
        n = input.readInt(true);
        for (var _i2 = 0; _i2 < n; _i2++) {
          var slotName = input.readString();
          var boneData = skeletonData.bones[input.readInt(true)];
          var _data = new SlotData(_i2, slotName, boneData);
          Color.rgba8888ToColor(_data.color, input.readInt32());
          var darkColor = input.readInt32();
          if (darkColor !== -1) {
            Color.rgb888ToColor(_data.darkColor = new Color(), darkColor);
          }
          _data.attachmentName = input.readStringRef();
          _data.blendMode = SkeletonBinary.BlendModeValues[input.readInt(true)];
          skeletonData.slots.push(_data);
        }
        n = input.readInt(true);
        for (var _i3 = 0, nn; _i3 < n; _i3++) {
          var _data2 = new IKConstraintData(input.readString());
          _data2.order = input.readInt(true);
          _data2.skinRequired = input.readBoolean();
          nn = input.readInt(true);
          for (var ii = 0; ii < nn; ii++) {
            _data2.bones.push(skeletonData.bones[input.readInt(true)]);
          }
          _data2.target = skeletonData.bones[input.readInt(true)];
          _data2.mix = input.readFloat();
          _data2.softness = input.readFloat() * scale;
          _data2.bendDirection = input.readByte();
          _data2.compress = input.readBoolean();
          _data2.stretch = input.readBoolean();
          _data2.uniform = input.readBoolean();
          skeletonData.ikConstraints.push(_data2);
        }
        n = input.readInt(true);
        for (var _i4 = 0, _nn; _i4 < n; _i4++) {
          var _data3 = new TransformConstraintData(input.readString());
          _data3.order = input.readInt(true);
          _data3.skinRequired = input.readBoolean();
          _nn = input.readInt(true);
          for (var _ii = 0; _ii < _nn; _ii++) {
            _data3.bones.push(skeletonData.bones[input.readInt(true)]);
          }
          _data3.target = skeletonData.bones[input.readInt(true)];
          _data3.local = input.readBoolean();
          _data3.relative = input.readBoolean();
          _data3.offsetRotation = input.readFloat();
          _data3.offsetX = input.readFloat() * scale;
          _data3.offsetY = input.readFloat() * scale;
          _data3.offsetScaleX = input.readFloat();
          _data3.offsetScaleY = input.readFloat();
          _data3.offsetShearY = input.readFloat();
          _data3.rotateMix = input.readFloat();
          _data3.translateMix = input.readFloat();
          _data3.scaleMix = input.readFloat();
          _data3.shearMix = input.readFloat();
          skeletonData.transformConstraints.push(_data3);
        }
        n = input.readInt(true);
        for (var _i5 = 0, _nn2; _i5 < n; _i5++) {
          var _data4 = new PathConstraintData(input.readString());
          _data4.order = input.readInt(true);
          _data4.skinRequired = input.readBoolean();
          _nn2 = input.readInt(true);
          for (var _ii2 = 0; _ii2 < _nn2; _ii2++) {
            _data4.bones.push(skeletonData.bones[input.readInt(true)]);
          }
          _data4.target = skeletonData.slots[input.readInt(true)];
          _data4.positionMode = SkeletonBinary.PositionModeValues[input.readInt(true)];
          _data4.spacingMode = SkeletonBinary.SpacingModeValues[input.readInt(true)];
          _data4.rotateMode = SkeletonBinary.RotateModeValues[input.readInt(true)];
          _data4.offsetRotation = input.readFloat();
          _data4.position = input.readFloat();
          if (_data4.positionMode === PositionMode.Fixed) {
            _data4.position *= scale;
          }
          _data4.spacing = input.readFloat();
          if (_data4.spacingMode === SpacingMode.Length || _data4.spacingMode === SpacingMode.Fixed) {
            _data4.spacing *= scale;
          }
          _data4.rotateMix = input.readFloat();
          _data4.translateMix = input.readFloat();
          skeletonData.pathConstraints.push(_data4);
        }
        var defaultSkin = this.readSkin(input, skeletonData, true, nonessential);
        if (defaultSkin != null) {
          skeletonData.defaultSkin = defaultSkin;
          skeletonData.skins.push(defaultSkin);
        }
        {
          var _i6 = skeletonData.skins.length;
          setArraySize(skeletonData.skins, n = _i6 + input.readInt(true));
          for (; _i6 < n; _i6++) {
            skeletonData.skins[_i6] = this.readSkin(input, skeletonData, false, nonessential);
          }
        }
        n = this.linkedMeshes.length;
        for (var _i7 = 0; _i7 < n; _i7++) {
          var linkedMesh = this.linkedMeshes[_i7];
          var skin = linkedMesh.skin == null ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
          if (skin == null) {
            throw new Error('Skin not found: ' + linkedMesh.skin);
          }
          var _parent = skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
          if (_parent == null) {
            throw new Error('Parent mesh not found: ' + linkedMesh.parent);
          }
          linkedMesh.mesh.deformAttachment = linkedMesh.inheritDeform ? _parent : linkedMesh.mesh;
          linkedMesh.mesh.setParentMesh(_parent);
        }
        this.linkedMeshes.length = 0;
        n = input.readInt(true);
        for (var _i8 = 0; _i8 < n; _i8++) {
          var _data5 = new EventData(input.readStringRef());
          _data5.intValue = input.readInt(false);
          _data5.floatValue = input.readFloat();
          _data5.stringValue = input.readString();
          _data5.audioPath = input.readString();
          if (_data5.audioPath != null) {
            _data5.volume = input.readFloat();
            _data5.balance = input.readFloat();
          }
          skeletonData.events.push(_data5);
        }
        n = input.readInt(true);
        for (var _i9 = 0; _i9 < n; _i9++) {
          skeletonData.animations.push(this.readAnimation(input, input.readString(), skeletonData));
        }
        return skeletonData;
      }
    }, {
      key: 'readSkin',
      value: function readSkin(input, skeletonData, defaultSkin, nonessential) {
        var skin = null;
        var slotCount = 0;
        if (defaultSkin) {
          slotCount = input.readInt(true);
          if (slotCount === 0) {
            return null;
          }
          skin = new Skin('default');
        } else {
          skin = new Skin(input.readStringRef());
          skin.bones.length = input.readInt(true);
          for (var i = 0, n = skin.bones.length; i < n; i++) {
            skin.bones[i] = skeletonData.bones[input.readInt(true)];
          }
          for (var _i10 = 0, _n = input.readInt(true); _i10 < _n; _i10++) {
            skin.constraints.push(skeletonData.ikConstraints[input.readInt(true)]);
          }
          for (var _i11 = 0, _n2 = input.readInt(true); _i11 < _n2; _i11++) {
            skin.constraints.push(skeletonData.transformConstraints[input.readInt(true)]);
          }
          for (var _i12 = 0, _n3 = input.readInt(true); _i12 < _n3; _i12++) {
            skin.constraints.push(skeletonData.pathConstraints[input.readInt(true)]);
          }
          slotCount = input.readInt(true);
        }
        for (var _i13 = 0; _i13 < slotCount; _i13++) {
          var slotIndex = input.readInt(true);
          for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
            var name = input.readStringRef();
            var attachment = this.readAttachment(input, skeletonData, skin, slotIndex, name, nonessential);
            if (attachment != null) {
              skin.setAttachment(slotIndex, name, attachment);
            }
          }
        }
        return skin;
      }
    }, {
      key: 'readAttachment',
      value: function readAttachment(input, skeletonData, skin, slotIndex, attachmentName, nonessential) {
        var scale = this.scale;
        var name = input.readStringRef();
        if (name == null) {
          name = attachmentName;
        }
        var typeIndex = input.readByte();
        var type = SkeletonBinary.AttachmentTypeValues[typeIndex];
        switch (type) {
          case AttachmentType.Region:
            {
              var path = input.readStringRef();
              var rotation = input.readFloat();
              var x = input.readFloat();
              var y = input.readFloat();
              var scaleX = input.readFloat();
              var scaleY = input.readFloat();
              var width = input.readFloat();
              var height = input.readFloat();
              var color = input.readInt32();
              if (path == null) {
                path = name;
              }
              var region = this.attachmentLoader.newRegionAttachment(skin, name, path);
              if (region == null) {
                return null;
              }
              region.path = path;
              region.x = x * scale;
              region.y = y * scale;
              region.scaleX = scaleX;
              region.scaleY = scaleY;
              region.rotation = rotation;
              region.width = width * scale;
              region.height = height * scale;
              Color.rgba8888ToColor(region.color, color);
              region.updateOffset();
              return region;
            }
          case AttachmentType.BoundingBox:
            {
              var vertexCount = input.readInt(true);
              var vertices = this.readVertices(input, vertexCount);
              var _color = nonessential ? input.readInt32() : 0;
              var box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
              if (box == null) {
                return null;
              }
              box.worldVerticesLength = vertexCount << 1;
              box.vertices = vertices.vertices;
              box.bones = vertices.bones;
              if (nonessential) {
                Color.rgba8888ToColor(box.color, _color);
              }
              return box;
            }
          case AttachmentType.Mesh:
            {
              var _path = input.readStringRef();
              var _color2 = input.readInt32();
              var _vertexCount = input.readInt(true);
              var uvs = this.readFloatArray(input, _vertexCount << 1, 1);
              var triangles = this.readShortArray(input);
              var _vertices = this.readVertices(input, _vertexCount);
              var hullLength = input.readInt(true);
              var edges = null;
              var _width = 0;
              var _height = 0;
              if (nonessential) {
                edges = this.readShortArray(input);
                _width = input.readFloat();
                _height = input.readFloat();
              }
              if (_path == null) {
                _path = name;
              }
              var mesh = this.attachmentLoader.newMeshAttachment(skin, name, _path);
              if (mesh == null) {
                return null;
              }
              mesh.path = _path;
              Color.rgba8888ToColor(mesh.color, _color2);
              mesh.bones = _vertices.bones;
              mesh.vertices = _vertices.vertices;
              mesh.worldVerticesLength = _vertexCount << 1;
              mesh.triangles = triangles;
              mesh.regionUVs = new Float32Array(uvs);
              mesh.hullLength = hullLength << 1;
              if (nonessential) {
                mesh.edges = edges;
                mesh.width = _width * scale;
                mesh.height = _height * scale;
              }
              return mesh;
            }
          case AttachmentType.LinkedMesh:
            {
              var _path2 = input.readStringRef();
              var _color3 = input.readInt32();
              var skinName = input.readStringRef();
              var parent = input.readStringRef();
              var inheritDeform = input.readBoolean();
              var _width2 = 0;
              var _height2 = 0;
              if (nonessential) {
                _width2 = input.readFloat();
                _height2 = input.readFloat();
              }
              if (_path2 == null) {
                _path2 = name;
              }
              var _mesh = this.attachmentLoader.newMeshAttachment(skin, name, _path2);
              if (_mesh == null) {
                return null;
              }
              _mesh.path = _path2;
              Color.rgba8888ToColor(_mesh.color, _color3);
              if (nonessential) {
                _mesh.width = _width2 * scale;
                _mesh.height = _height2 * scale;
              }
              this.linkedMeshes.push(new LinkedMesh(_mesh, skinName, slotIndex, parent, inheritDeform));
              return _mesh;
            }
          case AttachmentType.Path:
            {
              var closed = input.readBoolean();
              var constantSpeed = input.readBoolean();
              var _vertexCount2 = input.readInt(true);
              var _vertices2 = this.readVertices(input, _vertexCount2);
              var lengths = newArray(_vertexCount2 / 3, 0);
              for (var i = 0, n = lengths.length; i < n; i++) {
                lengths[i] = input.readFloat() * scale;
              }
              var _color4 = nonessential ? input.readInt32() : 0;
              var _path3 = this.attachmentLoader.newPathAttachment(skin, name);
              if (_path3 == null) {
                return null;
              }
              _path3.closed = closed;
              _path3.constantSpeed = constantSpeed;
              _path3.worldVerticesLength = _vertexCount2 << 1;
              _path3.vertices = _vertices2.vertices;
              _path3.bones = _vertices2.bones;
              _path3.lengths = lengths;
              if (nonessential) {
                Color.rgba8888ToColor(_path3.color, _color4);
              }
              return _path3;
            }
          case AttachmentType.Point:
            {
              var _rotation = input.readFloat();
              var _x = input.readFloat();
              var _y = input.readFloat();
              var _color5 = nonessential ? input.readInt32() : 0;
              var point = this.attachmentLoader.newPointAttachment(skin, name);
              if (point == null) {
                return null;
              }
              point.x = _x * scale;
              point.y = _y * scale;
              point.rotation = _rotation;
              if (nonessential) {
                Color.rgba8888ToColor(point.color, _color5);
              }
              return point;
            }
          case AttachmentType.Clipping:
            {
              var endSlotIndex = input.readInt(true);
              var _vertexCount3 = input.readInt(true);
              var _vertices3 = this.readVertices(input, _vertexCount3);
              var _color6 = nonessential ? input.readInt32() : 0;
              var clip = this.attachmentLoader.newClippingAttachment(skin, name);
              if (clip == null) {
                return null;
              }
              clip.endSlot = skeletonData.slots[endSlotIndex];
              clip.worldVerticesLength = _vertexCount3 << 1;
              clip.vertices = _vertices3.vertices;
              clip.bones = _vertices3.bones;
              if (nonessential) {
                Color.rgba8888ToColor(clip.color, _color6);
              }
              return clip;
            }
        }
        return null;
      }
    }, {
      key: 'readVertices',
      value: function readVertices(input, vertexCount) {
        var verticesLength = vertexCount << 1;
        var vertices = new Vertices();
        var scale = this.scale;
        if (!input.readBoolean()) {
          vertices.vertices = this.readFloatArray(input, verticesLength, scale);
          return vertices;
        }
        var weights = [];
        var bonesArray = [];
        for (var i = 0; i < vertexCount; i++) {
          var boneCount = input.readInt(true);
          bonesArray.push(boneCount);
          for (var ii = 0; ii < boneCount; ii++) {
            bonesArray.push(input.readInt(true));
            weights.push(input.readFloat() * scale);
            weights.push(input.readFloat() * scale);
            weights.push(input.readFloat());
          }
        }
        vertices.vertices = toFloatArray(weights);
        vertices.bones = bonesArray;
        return vertices;
      }
    }, {
      key: 'readFloatArray',
      value: function readFloatArray(input, n, scale) {
        var array = new Array(n);
        if (scale === 1) {
          for (var i = 0; i < n; i++) {
            array[i] = input.readFloat();
          }
        } else {
          for (var _i14 = 0; _i14 < n; _i14++) {
            array[_i14] = input.readFloat() * scale;
          }
        }
        return array;
      }
    }, {
      key: 'readShortArray',
      value: function readShortArray(input) {
        var n = input.readInt(true);
        var array = new Array(n);
        for (var i = 0; i < n; i++) {
          array[i] = input.readShort();
        }
        return array;
      }
    }, {
      key: 'readAnimation',
      value: function readAnimation(input, name, skeletonData) {
        var timelines = [];
        var scale = this.scale;
        var duration = 0;
        var tempColor1 = new Color();
        var tempColor2 = new Color();
        for (var i = 0, n = input.readInt(true); i < n; i++) {
          var slotIndex = input.readInt(true);
          for (var ii = 0, nn = input.readInt(true); ii < nn; ii++) {
            var timelineType = input.readByte();
            var frameCount = input.readInt(true);
            switch (timelineType) {
              case SkeletonBinary.SLOT_ATTACHMENT:
                {
                  var timeline = new AttachmentTimeline(frameCount);
                  timeline.slotIndex = slotIndex;
                  for (var frameIndex = 0; frameIndex < frameCount; frameIndex++) {
                    timeline.setFrame(frameIndex, input.readFloat(), input.readStringRef());
                  }
                  timelines.push(timeline);
                  duration = Math.max(duration, timeline.frames[frameCount - 1]);
                  break;
                }
              case SkeletonBinary.SLOT_COLOR:
                {
                  var _timeline = new ColorTimeline(frameCount);
                  _timeline.slotIndex = slotIndex;
                  for (var _frameIndex = 0; _frameIndex < frameCount; _frameIndex++) {
                    var time = input.readFloat();
                    Color.rgba8888ToColor(tempColor1, input.readInt32());
                    _timeline.setFrame(_frameIndex, time, tempColor1.r, tempColor1.g, tempColor1.b, tempColor1.a);
                    if (_frameIndex < frameCount - 1) {
                      this.readCurve(input, _frameIndex, _timeline);
                    }
                  }
                  timelines.push(_timeline);
                  duration = Math.max(duration, _timeline.frames[(frameCount - 1) * ColorTimeline.ENTRIES]);
                  break;
                }
              case SkeletonBinary.SLOT_TWO_COLOR:
                {
                  var _timeline2 = new TwoColorTimeline(frameCount);
                  _timeline2.slotIndex = slotIndex;
                  for (var _frameIndex2 = 0; _frameIndex2 < frameCount; _frameIndex2++) {
                    var _time = input.readFloat();
                    Color.rgba8888ToColor(tempColor1, input.readInt32());
                    Color.rgb888ToColor(tempColor2, input.readInt32());
                    _timeline2.setFrame(_frameIndex2, _time, tempColor1.r, tempColor1.g, tempColor1.b, tempColor1.a, tempColor2.r, tempColor2.g, tempColor2.b);
                    if (_frameIndex2 < frameCount - 1) {
                      this.readCurve(input, _frameIndex2, _timeline2);
                    }
                  }
                  timelines.push(_timeline2);
                  duration = Math.max(duration, _timeline2.frames[(frameCount - 1) * TwoColorTimeline.ENTRIES]);
                  break;
                }
            }
          }
        }
        for (var _i15 = 0, _n4 = input.readInt(true); _i15 < _n4; _i15++) {
          var boneIndex = input.readInt(true);
          for (var _ii3 = 0, _nn3 = input.readInt(true); _ii3 < _nn3; _ii3++) {
            var _timelineType = input.readByte();
            var _frameCount = input.readInt(true);
            switch (_timelineType) {
              case SkeletonBinary.BONE_ROTATE:
                {
                  var _timeline3 = new RotateTimeline(_frameCount);
                  _timeline3.boneIndex = boneIndex;
                  for (var _frameIndex3 = 0; _frameIndex3 < _frameCount; _frameIndex3++) {
                    _timeline3.setFrame(_frameIndex3, input.readFloat(), input.readFloat());
                    if (_frameIndex3 < _frameCount - 1) {
                      this.readCurve(input, _frameIndex3, _timeline3);
                    }
                  }
                  timelines.push(_timeline3);
                  duration = Math.max(duration, _timeline3.frames[(_frameCount - 1) * RotateTimeline.ENTRIES]);
                  break;
                }
              case SkeletonBinary.BONE_TRANSLATE:
              case SkeletonBinary.BONE_SCALE:
              case SkeletonBinary.BONE_SHEAR:
                {
                  var _timeline4 = void 0;
                  var timelineScale = 1;
                  if (_timelineType === SkeletonBinary.BONE_SCALE) {
                    _timeline4 = new ScaleTimeline(_frameCount);
                  } else if (_timelineType === SkeletonBinary.BONE_SHEAR) {
                    _timeline4 = new ShearTimeline(_frameCount);
                  } else {
                    _timeline4 = new TranslateTimeline(_frameCount);
                    timelineScale = scale;
                  }
                  _timeline4.boneIndex = boneIndex;
                  for (var _frameIndex4 = 0; _frameIndex4 < _frameCount; _frameIndex4++) {
                    _timeline4.setFrame(_frameIndex4, input.readFloat(), input.readFloat() * timelineScale, input.readFloat() * timelineScale);
                    if (_frameIndex4 < _frameCount - 1) {
                      this.readCurve(input, _frameIndex4, _timeline4);
                    }
                  }
                  timelines.push(_timeline4);
                  duration = Math.max(duration, _timeline4.frames[(_frameCount - 1) * TranslateTimeline.ENTRIES]);
                  break;
                }
            }
          }
        }
        for (var _i16 = 0, _n5 = input.readInt(true); _i16 < _n5; _i16++) {
          var index = input.readInt(true);
          var _frameCount2 = input.readInt(true);
          var _timeline5 = new IKConstraintTimeline(_frameCount2);
          _timeline5.ikConstraintIndex = index;
          for (var _frameIndex5 = 0; _frameIndex5 < _frameCount2; _frameIndex5++) {
            _timeline5.setFrame(_frameIndex5, input.readFloat(), input.readFloat(), input.readFloat() * scale, input.readByte(), input.readBoolean(), input.readBoolean());
            if (_frameIndex5 < _frameCount2 - 1) {
              this.readCurve(input, _frameIndex5, _timeline5);
            }
          }
          timelines.push(_timeline5);
          duration = Math.max(duration, _timeline5.frames[(_frameCount2 - 1) * IKConstraintTimeline.ENTRIES]);
        }
        for (var _i17 = 0, _n6 = input.readInt(true); _i17 < _n6; _i17++) {
          var _index = input.readInt(true);
          var _frameCount3 = input.readInt(true);
          var _timeline6 = new TransformConstraintTimeline(_frameCount3);
          _timeline6.transformConstraintIndex = _index;
          for (var _frameIndex6 = 0; _frameIndex6 < _frameCount3; _frameIndex6++) {
            _timeline6.setFrame(_frameIndex6, input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat());
            if (_frameIndex6 < _frameCount3 - 1) {
              this.readCurve(input, _frameIndex6, _timeline6);
            }
          }
          timelines.push(_timeline6);
          duration = Math.max(duration, _timeline6.frames[(_frameCount3 - 1) * TransformConstraintTimeline.ENTRIES]);
        }
        for (var _i18 = 0, _n7 = input.readInt(true); _i18 < _n7; _i18++) {
          var _index2 = input.readInt(true);
          var data = skeletonData.pathConstraints[_index2];
          for (var _ii4 = 0, _nn4 = input.readInt(true); _ii4 < _nn4; _ii4++) {
            var _timelineType2 = input.readByte();
            var _frameCount4 = input.readInt(true);
            switch (_timelineType2) {
              case SkeletonBinary.PATH_POSITION:
              case SkeletonBinary.PATH_SPACING:
                {
                  var _timeline7 = void 0;
                  var _timelineScale = 1;
                  if (_timelineType2 === SkeletonBinary.PATH_SPACING) {
                    _timeline7 = new PathConstraintSpacingTimeline(_frameCount4);
                    if (data.spacingMode === SpacingMode.Length || data.spacingMode === SpacingMode.Fixed) {
                      _timelineScale = scale;
                    }
                  } else {
                    _timeline7 = new PathConstraintPositionTimeline(_frameCount4);
                    if (data.positionMode === PositionMode.Fixed) {
                      _timelineScale = scale;
                    }
                  }
                  _timeline7.pathConstraintIndex = _index2;
                  for (var _frameIndex7 = 0; _frameIndex7 < _frameCount4; _frameIndex7++) {
                    _timeline7.setFrame(_frameIndex7, input.readFloat(), input.readFloat() * _timelineScale);
                    if (_frameIndex7 < _frameCount4 - 1) {
                      this.readCurve(input, _frameIndex7, _timeline7);
                    }
                  }
                  timelines.push(_timeline7);
                  duration = Math.max(duration, _timeline7.frames[(_frameCount4 - 1) * PathConstraintPositionTimeline.ENTRIES]);
                  break;
                }
              case SkeletonBinary.PATH_MIX:
                {
                  var _timeline8 = new PathConstraintMixTimeline(_frameCount4);
                  _timeline8.pathConstraintIndex = _index2;
                  for (var _frameIndex8 = 0; _frameIndex8 < _frameCount4; _frameIndex8++) {
                    _timeline8.setFrame(_frameIndex8, input.readFloat(), input.readFloat(), input.readFloat());
                    if (_frameIndex8 < _frameCount4 - 1) {
                      this.readCurve(input, _frameIndex8, _timeline8);
                    }
                  }
                  timelines.push(_timeline8);
                  duration = Math.max(duration, _timeline8.frames[(_frameCount4 - 1) * PathConstraintMixTimeline.ENTRIES]);
                  break;
                }
            }
          }
        }
        for (var _i19 = 0, _n8 = input.readInt(true); _i19 < _n8; _i19++) {
          var skin = skeletonData.skins[input.readInt(true)];
          for (var _ii5 = 0, _nn5 = input.readInt(true); _ii5 < _nn5; _ii5++) {
            var _slotIndex = input.readInt(true);
            for (var iii = 0, nnn = input.readInt(true); iii < nnn; iii++) {
              var attachment = skin.getAttachment(_slotIndex, input.readStringRef());
              var weighted = attachment.bones != null;
              var vertices = attachment.vertices;
              var deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
              var _frameCount5 = input.readInt(true);
              var _timeline9 = new DeformTimeline(_frameCount5);
              _timeline9.slotIndex = _slotIndex;
              _timeline9.attachment = attachment;
              for (var _frameIndex9 = 0; _frameIndex9 < _frameCount5; _frameIndex9++) {
                var _time2 = input.readFloat();
                var deform = void 0;
                var end = input.readInt(true);
                if (end === 0) {
                  deform = weighted ? newFloatArray(deformLength) : vertices;
                } else {
                  deform = newFloatArray(deformLength);
                  var start = input.readInt(true);
                  end += start;
                  if (scale === 1) {
                    for (var v = start; v < end; v++) {
                      deform[v] = input.readFloat();
                    }
                  } else {
                    for (var _v = start; _v < end; _v++) {
                      deform[_v] = input.readFloat() * scale;
                    }
                  }
                  if (!weighted) {
                    for (var _v2 = 0, vn = deform.length; _v2 < vn; _v2++) {
                      deform[_v2] += vertices[_v2];
                    }
                  }
                }
                _timeline9.setFrame(_frameIndex9, _time2, deform);
                if (_frameIndex9 < _frameCount5 - 1) {
                  this.readCurve(input, _frameIndex9, _timeline9);
                }
              }
              timelines.push(_timeline9);
              duration = Math.max(duration, _timeline9.frames[_frameCount5 - 1]);
            }
          }
        }
        var drawOrderCount = input.readInt(true);
        if (drawOrderCount > 0) {
          var _timeline10 = new DrawOrderTimeline(drawOrderCount);
          var slotCount = skeletonData.slots.length;
          for (var _i20 = 0; _i20 < drawOrderCount; _i20++) {
            var _time3 = input.readFloat();
            var offsetCount = input.readInt(true);
            var drawOrder = newArray(slotCount, 0);
            for (var _ii6 = slotCount - 1; _ii6 >= 0; _ii6--) {
              drawOrder[_ii6] = -1;
            }
            var unchanged = newArray(slotCount - offsetCount, 0);
            var originalIndex = 0;
            var unchangedIndex = 0;
            for (var _ii7 = 0; _ii7 < offsetCount; _ii7++) {
              var _slotIndex2 = input.readInt(true);
              while (originalIndex !== _slotIndex2) {
                unchanged[unchangedIndex++] = originalIndex++;
              }
              drawOrder[originalIndex + input.readInt(true)] = originalIndex++;
            }
            while (originalIndex < slotCount) {
              unchanged[unchangedIndex++] = originalIndex++;
            }
            for (var _ii8 = slotCount - 1; _ii8 >= 0; _ii8--) {
              if (drawOrder[_ii8] === -1) {
                drawOrder[_ii8] = unchanged[--unchangedIndex];
              }
            }
            _timeline10.setFrame(_i20, _time3, drawOrder);
          }
          timelines.push(_timeline10);
          duration = Math.max(duration, _timeline10.frames[drawOrderCount - 1]);
        }
        var eventCount = input.readInt(true);
        if (eventCount > 0) {
          var _timeline11 = new EventTimeline(eventCount);
          for (var _i21 = 0; _i21 < eventCount; _i21++) {
            var _time4 = input.readFloat();
            var eventData = skeletonData.events[input.readInt(true)];
            var event = new Event(_time4, eventData);
            event.intValue = input.readInt(false);
            event.floatValue = input.readFloat();
            event.stringValue = input.readBoolean() ? input.readString() : eventData.stringValue;
            if (event.data.audioPath != null) {
              event.volume = input.readFloat();
              event.balance = input.readFloat();
            }
            _timeline11.setFrame(_i21, event);
          }
          timelines.push(_timeline11);
          duration = Math.max(duration, _timeline11.frames[eventCount - 1]);
        }
        return new Animation(name, timelines, duration);
      }
    }, {
      key: 'readCurve',
      value: function readCurve(input, frameIndex, timeline) {
        switch (input.readByte()) {
          case SkeletonBinary.CURVE_STEPPED:
            timeline.setStepped(frameIndex);
            break;
          case SkeletonBinary.CURVE_BEZIER:
            this.setCurve(timeline, frameIndex, input.readFloat(), input.readFloat(), input.readFloat(), input.readFloat());
            break;
        }
      }
    }, {
      key: 'setCurve',
      value: function setCurve(timeline, frameIndex, cx1, cy1, cx2, cy2) {
        timeline.setCurve(frameIndex, cx1, cy1, cx2, cy2);
      }
    }]);
    return SkeletonBinary;
  }();
  SkeletonBinary.AttachmentTypeValues = [0, 1, 2, 3, 4, 5, 6];
  SkeletonBinary.TransformModeValues = [TransformMode.Normal, TransformMode.OnlyTranslation, TransformMode.NoRotationOrReflection, TransformMode.NoScale, TransformMode.NoScaleOrReflection];
  SkeletonBinary.PositionModeValues = [PositionMode.Fixed, PositionMode.Percent];
  SkeletonBinary.SpacingModeValues = [SpacingMode.Length, SpacingMode.Fixed, SpacingMode.Percent];
  SkeletonBinary.RotateModeValues = [RotateMode.Tangent, RotateMode.Chain, RotateMode.ChainScale];
  SkeletonBinary.BlendModeValues = [BlendMode.Normal, BlendMode.Additive, BlendMode.Multiply, BlendMode.Screen];
  SkeletonBinary.BONE_ROTATE = 0;
  SkeletonBinary.BONE_TRANSLATE = 1;
  SkeletonBinary.BONE_SCALE = 2;
  SkeletonBinary.BONE_SHEAR = 3;
  SkeletonBinary.SLOT_ATTACHMENT = 0;
  SkeletonBinary.SLOT_COLOR = 1;
  SkeletonBinary.SLOT_TWO_COLOR = 2;
  SkeletonBinary.PATH_POSITION = 0;
  SkeletonBinary.PATH_SPACING = 1;
  SkeletonBinary.PATH_MIX = 2;
  SkeletonBinary.CURVE_LINEAR = 0;
  SkeletonBinary.CURVE_STEPPED = 1;
  SkeletonBinary.CURVE_BEZIER = 2;
  var BinaryInput = function () {
    function BinaryInput(data) {
      var strings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var buffer = arguments[3];
      classCallCheck(this, BinaryInput);
      this.strings = strings;
      this.index = index;
      this.buffer = buffer || new DataView(data.buffer);
    }
    createClass(BinaryInput, [{
      key: 'readByte',
      value: function readByte() {
        return this.buffer.getInt8(this.index++);
      }
    }, {
      key: 'readShort',
      value: function readShort() {
        var value = this.buffer.getInt16(this.index);
        this.index += 2;
        return value;
      }
    }, {
      key: 'readInt32',
      value: function readInt32() {
        var value = this.buffer.getInt32(this.index);
        this.index += 4;
        return value;
      }
    }, {
      key: 'readInt',
      value: function readInt(optimizePositive) {
        var b = this.readByte();
        var result = b & 0x7F;
        if ((b & 0x80) !== 0) {
          b = this.readByte();
          result |= (b & 0x7F) << 7;
          if ((b & 0x80) !== 0) {
            b = this.readByte();
            result |= (b & 0x7F) << 14;
            if ((b & 0x80) !== 0) {
              b = this.readByte();
              result |= (b & 0x7F) << 21;
              if ((b & 0x80) !== 0) {
                b = this.readByte();
                result |= (b & 0x7F) << 28;
              }
            }
          }
        }
        return optimizePositive ? result : result >>> 1 ^ -(result & 1);
      }
    }, {
      key: 'readStringRef',
      value: function readStringRef() {
        var index = this.readInt(true);
        return index === 0 ? null : this.strings[index - 1];
      }
    }, {
      key: 'readString',
      value: function readString() {
        var byteCount = this.readInt(true);
        switch (byteCount) {
          case 0:
            return null;
          case 1:
            return '';
        }
        byteCount--;
        var chars = '';
        for (var i = 0; i < byteCount;) {
          var b = this.readByte();
          switch (b >> 4) {
            case 12:
            case 13:
              chars += String.fromCharCode((b & 0x1F) << 6 | this.readByte() & 0x3F);
              i += 2;
              break;
            case 14:
              chars += String.fromCharCode((b & 0x0F) << 12 | (this.readByte() & 0x3F) << 6 | this.readByte() & 0x3F);
              i += 3;
              break;
            default:
              chars += String.fromCharCode(b);
              i++;
          }
        }
        return chars;
      }
    }, {
      key: 'readFloat',
      value: function readFloat() {
        var value = this.buffer.getFloat32(this.index);
        this.index += 4;
        return value;
      }
    }, {
      key: 'readBoolean',
      value: function readBoolean() {
        return this.readByte() !== 0;
      }
    }]);
    return BinaryInput;
  }();
  var LinkedMesh = function LinkedMesh(mesh, skin, slotIndex, parent, inheritDeform) {
    classCallCheck(this, LinkedMesh);
    this.mesh = mesh;
    this.skin = skin;
    this.slotIndex = slotIndex;
    this.parent = parent;
    this.inheritDeform = inheritDeform;
  };
  var Vertices = function Vertices() {
    var bones = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var vertices = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    classCallCheck(this, Vertices);
    this.bones = bones;
    this.vertices = vertices;
  };

  var SkeletonBounds = function () {
    function SkeletonBounds() {
      classCallCheck(this, SkeletonBounds);
      this.minX = 0;
      this.minY = 0;
      this.maxX = 0;
      this.maxY = 0;
      this.boundingBoxes = [];
      this.polygons = [[]];
      this.polygonPool = new Pool(function () {
        return newFloatArray(16);
      });
    }
    createClass(SkeletonBounds, [{
      key: 'update',
      value: function update(skeleton, updateAabb) {
        if (skeleton == null) {
          throw new Error('skeleton cannot be null.');
        }
        var boundingBoxes = this.boundingBoxes;
        var polygons = this.polygons;
        var polygonPool = this.polygonPool;
        var slots = skeleton.slots;
        var slotCount = slots.length;
        boundingBoxes.length = 0;
        polygonPool.freeAll(polygons);
        polygons.length = 0;
        for (var i = 0; i < slotCount; i++) {
          var slot = slots[i];
          if (!slot.bone.active) {
            continue;
          }
          var attachment = slot.getAttachment();
          if (attachment instanceof BoundingBoxAttachment) {
            var boundingBox = attachment;
            boundingBoxes.push(boundingBox);
            var polygon = polygonPool.obtain();
            if (polygon.length !== boundingBox.worldVerticesLength) {
              polygon = newFloatArray(boundingBox.worldVerticesLength);
            }
            polygons.push(polygon);
            boundingBox.computeWorldVertices(slot, 0, boundingBox.worldVerticesLength, polygon, 0, 2);
          }
        }
        if (updateAabb) {
          this.aabbCompute();
        } else {
          this.minX = Number.POSITIVE_INFINITY;
          this.minY = Number.POSITIVE_INFINITY;
          this.maxX = Number.NEGATIVE_INFINITY;
          this.maxY = Number.NEGATIVE_INFINITY;
        }
      }
    }, {
      key: 'aabbCompute',
      value: function aabbCompute() {
        var minX = Number.POSITIVE_INFINITY;
        var minY = Number.POSITIVE_INFINITY;
        var maxX = Number.NEGATIVE_INFINITY;
        var maxY = Number.NEGATIVE_INFINITY;
        var polygons = this.polygons;
        for (var i = 0, n = polygons.length; i < n; i++) {
          var polygon = polygons[i];
          var vertices = polygon;
          for (var ii = 0, nn = polygon.length; ii < nn; ii += 2) {
            var x = vertices[ii];
            var y = vertices[ii + 1];
            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x);
            maxY = Math.max(maxY, y);
          }
        }
        this.minX = minX;
        this.minY = minY;
        this.maxX = maxX;
        this.maxY = maxY;
      }
    }, {
      key: 'aabbContainsPoint',
      value: function aabbContainsPoint(x, y) {
        return x >= this.minX && x <= this.maxX && y >= this.minY && y <= this.maxY;
      }
    }, {
      key: 'aabbIntersectsSegment',
      value: function aabbIntersectsSegment(x1, y1, x2, y2) {
        var minX = this.minX;
        var minY = this.minY;
        var maxX = this.maxX;
        var maxY = this.maxY;
        if (x1 <= minX && x2 <= minX || y1 <= minY && y2 <= minY || x1 >= maxX && x2 >= maxX || y1 >= maxY && y2 >= maxY) {
          return false;
        }
        var m = (y2 - y1) / (x2 - x1);
        var y = m * (minX - x1) + y1;
        if (y > minY && y < maxY) return true;
        y = m * (maxX - x1) + y1;
        if (y > minY && y < maxY) return true;
        var x = (minY - y1) / m + x1;
        if (x > minX && x < maxX) return true;
        x = (maxY - y1) / m + x1;
        if (x > minX && x < maxX) return true;
        return false;
      }
    }, {
      key: 'aabbIntersectsSkeleton',
      value: function aabbIntersectsSkeleton(bounds) {
        return this.minX < bounds.maxX && this.maxX > bounds.minX && this.minY < bounds.maxY && this.maxY > bounds.minY;
      }
    }, {
      key: 'containsPoint',
      value: function containsPoint(x, y) {
        var polygons = this.polygons;
        for (var i = 0, n = polygons.length; i < n; i++) {
          if (this.containsPointPolygon(polygons[i], x, y)) {
            return this.boundingBoxes[i];
          }
        }
        return null;
      }
    }, {
      key: 'containsPointPolygon',
      value: function containsPointPolygon(polygon, x, y) {
        var vertices = polygon;
        var nn = polygon.length;
        var prevIndex = nn - 2;
        var inside = false;
        for (var ii = 0; ii < nn; ii += 2) {
          var vertexY = vertices[ii + 1];
          var prevY = vertices[prevIndex + 1];
          if (vertexY < y && prevY >= y || prevY < y && vertexY >= y) {
            var vertexX = vertices[ii];
            if (vertexX + (y - vertexY) / (prevY - vertexY) * (vertices[prevIndex] - vertexX) < x) {
              inside = !inside;
            }
          }
          prevIndex = ii;
        }
        return inside;
      }
    }, {
      key: 'intersectsSegment',
      value: function intersectsSegment(x1, y1, x2, y2) {
        var polygons = this.polygons;
        for (var i = 0, n = polygons.length; i < n; i++) {
          if (this.intersectsSegmentPolygon(polygons[i], x1, y1, x2, y2)) {
            return this.boundingBoxes[i];
          }
        }
        return null;
      }
    }, {
      key: 'intersectsSegmentPolygon',
      value: function intersectsSegmentPolygon(polygon, x1, y1, x2, y2) {
        var vertices = polygon;
        var nn = polygon.length;
        var width12 = x1 - x2;
        var height12 = y1 - y2;
        var det1 = x1 * y2 - y1 * x2;
        var x3 = vertices[nn - 2];
        var y3 = vertices[nn - 1];
        for (var ii = 0; ii < nn; ii += 2) {
          var x4 = vertices[ii];
          var y4 = vertices[ii + 1];
          var det2 = x3 * y4 - y3 * x4;
          var width34 = x3 - x4;
          var height34 = y3 - y4;
          var det3 = width12 * height34 - height12 * width34;
          var x = (det1 * width34 - width12 * det2) / det3;
          if ((x >= x3 && x <= x4 || x >= x4 && x <= x3) && (x >= x1 && x <= x2 || x >= x2 && x <= x1)) {
            var y = (det1 * height34 - height12 * det2) / det3;
            if ((y >= y3 && y <= y4 || y >= y4 && y <= y3) && (y >= y1 && y <= y2 || y >= y2 && y <= y1)) {
              return true;
            }
          }
          x3 = x4;
          y3 = y4;
        }
        return false;
      }
    }, {
      key: 'getPolygon',
      value: function getPolygon(boundingBox) {
        if (boundingBox == null) {
          throw new Error('boundingBox cannot be null.');
        }
        var index = this.boundingBoxes.indexOf(boundingBox);
        return index === -1 ? null : this.polygons[index];
      }
    }, {
      key: 'getWidth',
      value: function getWidth() {
        return this.maxX - this.minX;
      }
    }, {
      key: 'getHeight',
      value: function getHeight() {
        return this.maxY - this.minY;
      }
    }]);
    return SkeletonBounds;
  }();

  var Triangulator = function () {
    function Triangulator() {
      classCallCheck(this, Triangulator);
      this.convexPolygons = [[]];
      this.convexPolygonsIndices = [[]];
      this.indicesArray = [];
      this.isConcaveArray = [];
      this.triangles = [];
      this.polygonPool = new Pool(function () {
        return [];
      });
      this.polygonIndicesPool = new Pool(function () {
        return [];
      });
    }
    createClass(Triangulator, [{
      key: 'triangulate',
      value: function triangulate(verticesArray) {
        var vertices = verticesArray;
        var vertexCount = verticesArray.length >> 1;
        var indices = this.indicesArray;
        indices.length = 0;
        for (var i = 0; i < vertexCount; i++) {
          indices[i] = i;
        }
        var isConcave = this.isConcaveArray;
        isConcave.length = 0;
        for (var _i = 0, n = vertexCount; _i < n; ++_i) {
          isConcave[_i] = Triangulator.isConcave(_i, vertexCount, vertices, indices);
        }
        var triangles = this.triangles;
        triangles.length = 0;
        while (vertexCount > 3) {
          var previous = vertexCount - 1;
          var _i2 = 0;
          var next = 1;
          while (true) {
            outer: if (!isConcave[_i2]) {
              var p1 = indices[previous] << 1;
              var p2 = indices[_i2] << 1;
              var p3 = indices[next] << 1;
              var p1x = vertices[p1];
              var p1y = vertices[p1 + 1];
              var p2x = vertices[p2];
              var p2y = vertices[p2 + 1];
              var p3x = vertices[p3];
              var p3y = vertices[p3 + 1];
              for (var ii = (next + 1) % vertexCount; ii !== previous; ii = (ii + 1) % vertexCount) {
                if (!isConcave[ii]) {
                  continue;
                }
                var v = indices[ii] << 1;
                var vx = vertices[v];
                var vy = vertices[v + 1];
                if (Triangulator.positiveArea(p3x, p3y, p1x, p1y, vx, vy)) {
                  if (Triangulator.positiveArea(p1x, p1y, p2x, p2y, vx, vy)) {
                    if (Triangulator.positiveArea(p2x, p2y, p3x, p3y, vx, vy)) break outer;
                  }
                }
              }
              break;
            }
            if (next === 0) {
              do {
                if (!isConcave[_i2]) {
                  break;
                }
                _i2--;
              } while (_i2 > 0);
              break;
            }
            previous = _i2;
            _i2 = next;
            next = (next + 1) % vertexCount;
          }
          triangles.push(indices[(vertexCount + _i2 - 1) % vertexCount]);
          triangles.push(indices[_i2]);
          triangles.push(indices[(_i2 + 1) % vertexCount]);
          indices.splice(_i2, 1);
          isConcave.splice(_i2, 1);
          vertexCount--;
          var previousIndex = (vertexCount + _i2 - 1) % vertexCount;
          var nextIndex = _i2 === vertexCount ? 0 : _i2;
          isConcave[previousIndex] = Triangulator.isConcave(previousIndex, vertexCount, vertices, indices);
          isConcave[nextIndex] = Triangulator.isConcave(nextIndex, vertexCount, vertices, indices);
        }
        if (vertexCount === 3) {
          triangles.push(indices[2]);
          triangles.push(indices[0]);
          triangles.push(indices[1]);
        }
        return triangles;
      }
    }, {
      key: 'decompose',
      value: function decompose(verticesArray, triangles) {
        var vertices = verticesArray;
        var convexPolygons = this.convexPolygons;
        this.polygonPool.freeAll(convexPolygons);
        convexPolygons.length = 0;
        var convexPolygonsIndices = this.convexPolygonsIndices;
        this.polygonIndicesPool.freeAll(convexPolygonsIndices);
        convexPolygonsIndices.length = 0;
        var polygonIndices = this.polygonIndicesPool.obtain();
        polygonIndices.length = 0;
        var polygon = this.polygonPool.obtain();
        polygon.length = 0;
        var fanBaseIndex = -1;
        var lastWinding = 0;
        for (var i = 0, n = triangles.length; i < n; i += 3) {
          var t1 = triangles[i] << 1;
          var t2 = triangles[i + 1] << 1;
          var t3 = triangles[i + 2] << 1;
          var x1 = vertices[t1];
          var y1 = vertices[t1 + 1];
          var x2 = vertices[t2];
          var y2 = vertices[t2 + 1];
          var x3 = vertices[t3];
          var y3 = vertices[t3 + 1];
          var merged = false;
          if (fanBaseIndex === t1) {
            var o = polygon.length - 4;
            var winding1 = Triangulator.winding(polygon[o], polygon[o + 1], polygon[o + 2], polygon[o + 3], x3, y3);
            var winding2 = Triangulator.winding(x3, y3, polygon[0], polygon[1], polygon[2], polygon[3]);
            if (winding1 === lastWinding && winding2 === lastWinding) {
              polygon.push(x3);
              polygon.push(y3);
              polygonIndices.push(t3);
              merged = true;
            }
          }
          if (!merged) {
            if (polygon.length > 0) {
              convexPolygons.push(polygon);
              convexPolygonsIndices.push(polygonIndices);
            } else {
              this.polygonPool.free(polygon);
              this.polygonIndicesPool.free(polygonIndices);
            }
            polygon = this.polygonPool.obtain();
            polygon.length = 0;
            polygon.push(x1);
            polygon.push(y1);
            polygon.push(x2);
            polygon.push(y2);
            polygon.push(x3);
            polygon.push(y3);
            polygonIndices = this.polygonIndicesPool.obtain();
            polygonIndices.length = 0;
            polygonIndices.push(t1);
            polygonIndices.push(t2);
            polygonIndices.push(t3);
            lastWinding = Triangulator.winding(x1, y1, x2, y2, x3, y3);
            fanBaseIndex = t1;
          }
        }
        if (polygon.length > 0) {
          convexPolygons.push(polygon);
          convexPolygonsIndices.push(polygonIndices);
        }
        for (var _i3 = 0, _n = convexPolygons.length; _i3 < _n; _i3++) {
          polygonIndices = convexPolygonsIndices[_i3];
          if (polygonIndices.length === 0) {
            continue;
          }
          var firstIndex = polygonIndices[0];
          var lastIndex = polygonIndices[polygonIndices.length - 1];
          polygon = convexPolygons[_i3];
          var _o = polygon.length - 4;
          var prevPrevX = polygon[_o];
          var prevPrevY = polygon[_o + 1];
          var prevX = polygon[_o + 2];
          var prevY = polygon[_o + 3];
          var firstX = polygon[0];
          var firstY = polygon[1];
          var secondX = polygon[2];
          var secondY = polygon[3];
          var winding = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, firstX, firstY);
          for (var ii = 0; ii < _n; ii++) {
            if (ii === _i3) {
              continue;
            }
            var otherIndices = convexPolygonsIndices[ii];
            if (otherIndices.length !== 3) {
              continue;
            }
            var otherFirstIndex = otherIndices[0];
            var otherSecondIndex = otherIndices[1];
            var otherLastIndex = otherIndices[2];
            var otherPoly = convexPolygons[ii];
            var _x = otherPoly[otherPoly.length - 2];
            var _y = otherPoly[otherPoly.length - 1];
            if (otherFirstIndex !== firstIndex || otherSecondIndex !== lastIndex) {
              continue;
            }
            var _winding = Triangulator.winding(prevPrevX, prevPrevY, prevX, prevY, _x, _y);
            var _winding2 = Triangulator.winding(_x, _y, firstX, firstY, secondX, secondY);
            if (_winding === winding && _winding2 === winding) {
              otherPoly.length = 0;
              otherIndices.length = 0;
              polygon.push(_x);
              polygon.push(_y);
              polygonIndices.push(otherLastIndex);
              prevPrevX = prevX;
              prevPrevY = prevY;
              prevX = _x;
              prevY = _y;
              ii = 0;
            }
          }
        }
        for (var _i4 = convexPolygons.length - 1; _i4 >= 0; _i4--) {
          polygon = convexPolygons[_i4];
          if (polygon.length === 0) {
            convexPolygons.splice(_i4, 1);
            this.polygonPool.free(polygon);
            polygonIndices = convexPolygonsIndices[_i4];
            convexPolygonsIndices.splice(_i4, 1);
            this.polygonIndicesPool.free(polygonIndices);
          }
        }
        return convexPolygons;
      }
    }], [{
      key: 'isConcave',
      value: function isConcave(index, vertexCount, vertices, indices) {
        var previous = indices[(vertexCount + index - 1) % vertexCount] << 1;
        var current = indices[index] << 1;
        var next = indices[(index + 1) % vertexCount] << 1;
        return !this.positiveArea(vertices[previous], vertices[previous + 1], vertices[current], vertices[current + 1], vertices[next], vertices[next + 1]);
      }
    }, {
      key: 'positiveArea',
      value: function positiveArea(p1x, p1y, p2x, p2y, p3x, p3y) {
        return p1x * (p3y - p2y) + p2x * (p1y - p3y) + p3x * (p2y - p1y) >= 0;
      }
    }, {
      key: 'winding',
      value: function winding(p1x, p1y, p2x, p2y, p3x, p3y) {
        var px = p2x - p1x;
        var py = p2y - p1y;
        return p3x * py - p3y * px + px * p1y - p1x * py >= 0 ? 1 : -1;
      }
    }]);
    return Triangulator;
  }();

  var SkeletonClipping = function () {
    function SkeletonClipping() {
      classCallCheck(this, SkeletonClipping);
      this.triangulator = new Triangulator();
      this.clippingPolygon = [];
      this.clipOutput = [];
      this.clippedVertices = [];
      this.clippedTriangles = [];
      this.scratch = [];
      this.clippingPolygons = [[]];
    }
    createClass(SkeletonClipping, [{
      key: 'clipStart',
      value: function clipStart(slot, clip) {
        if (this.clipAttachment != null) {
          return 0;
        }
        this.clipAttachment = clip;
        var n = clip.worldVerticesLength;
        var vertices = setArraySize(this.clippingPolygon, n);
        clip.computeWorldVertices(slot, 0, n, vertices, 0, 2);
        var clippingPolygon = this.clippingPolygon;
        SkeletonClipping.makeClockwise(clippingPolygon);
        var clippingPolygons = this.clippingPolygons = this.triangulator.decompose(clippingPolygon, this.triangulator.triangulate(clippingPolygon));
        for (var i = 0, _n = clippingPolygons.length; i < _n; i++) {
          var polygon = clippingPolygons[i];
          SkeletonClipping.makeClockwise(polygon);
          polygon.push(polygon[0]);
          polygon.push(polygon[1]);
        }
        return clippingPolygons.length;
      }
    }, {
      key: 'clipEndWithSlot',
      value: function clipEndWithSlot(slot) {
        if (this.clipAttachment != null && this.clipAttachment.endSlot === slot.data) {
          this.clipEnd();
        }
      }
    }, {
      key: 'clipEnd',
      value: function clipEnd() {
        if (this.clipAttachment == null) {
          return;
        }
        this.clipAttachment = null;
        this.clippingPolygons = null;
        this.clippedVertices.length = 0;
        this.clippedTriangles.length = 0;
        this.clippingPolygon.length = 0;
      }
    }, {
      key: 'isClipping',
      value: function isClipping() {
        return this.clipAttachment != null;
      }
    }, {
      key: 'clipTriangles',
      value: function clipTriangles(vertices, verticesLength, triangles, trianglesLength, uvs, light, dark, twoColor) {
        var clipOutput = this.clipOutput;
        var clippedVertices = this.clippedVertices;
        var clippedTriangles = this.clippedTriangles;
        var polygons = this.clippingPolygons;
        var polygonsCount = this.clippingPolygons.length;
        var vertexSize = twoColor ? 12 : 8;
        var index = 0;
        clippedVertices.length = 0;
        clippedTriangles.length = 0;
        outer: for (var i = 0; i < trianglesLength; i += 3) {
          var vertexOffset = triangles[i] << 1;
          var x1 = vertices[vertexOffset];
          var y1 = vertices[vertexOffset + 1];
          var u1 = uvs[vertexOffset];
          var v1 = uvs[vertexOffset + 1];
          vertexOffset = triangles[i + 1] << 1;
          var x2 = vertices[vertexOffset];
          var y2 = vertices[vertexOffset + 1];
          var u2 = uvs[vertexOffset];
          var v2 = uvs[vertexOffset + 1];
          vertexOffset = triangles[i + 2] << 1;
          var x3 = vertices[vertexOffset];
          var y3 = vertices[vertexOffset + 1];
          var u3 = uvs[vertexOffset];
          var v3 = uvs[vertexOffset + 1];
          for (var p = 0; p < polygonsCount; p++) {
            var s = clippedVertices.length;
            if (this.clip(x1, y1, x2, y2, x3, y3, polygons[p], clipOutput)) {
              var clipOutputLength = clipOutput.length;
              if (clipOutputLength === 0) {
                continue;
              }
              var d0 = y2 - y3;
              var d1 = x3 - x2;
              var d2 = x1 - x3;
              var d4 = y3 - y1;
              var d = 1 / (d0 * d2 + d1 * (y1 - y3));
              var clipOutputCount = clipOutputLength >> 1;
              var clipOutputItems = this.clipOutput;
              var clippedVerticesItems = setArraySize(clippedVertices, s + clipOutputCount * vertexSize);
              for (var ii = 0; ii < clipOutputLength; ii += 2) {
                var x = clipOutputItems[ii];
                var y = clipOutputItems[ii + 1];
                clippedVerticesItems[s] = x;
                clippedVerticesItems[s + 1] = y;
                clippedVerticesItems[s + 2] = light.r;
                clippedVerticesItems[s + 3] = light.g;
                clippedVerticesItems[s + 4] = light.b;
                clippedVerticesItems[s + 5] = light.a;
                var c0 = x - x3;
                var c1 = y - y3;
                var a = (d0 * c0 + d1 * c1) * d;
                var b = (d4 * c0 + d2 * c1) * d;
                var c = 1 - a - b;
                clippedVerticesItems[s + 6] = u1 * a + u2 * b + u3 * c;
                clippedVerticesItems[s + 7] = v1 * a + v2 * b + v3 * c;
                if (twoColor) {
                  clippedVerticesItems[s + 8] = dark.r;
                  clippedVerticesItems[s + 9] = dark.g;
                  clippedVerticesItems[s + 10] = dark.b;
                  clippedVerticesItems[s + 11] = dark.a;
                }
                s += vertexSize;
              }
              s = clippedTriangles.length;
              var clippedTrianglesItems = setArraySize(clippedTriangles, s + 3 * (clipOutputCount - 2));
              clipOutputCount--;
              for (var _ii = 1; _ii < clipOutputCount; _ii++) {
                clippedTrianglesItems[s] = index;
                clippedTrianglesItems[s + 1] = index + _ii;
                clippedTrianglesItems[s + 2] = index + _ii + 1;
                s += 3;
              }
              index += clipOutputCount + 1;
            } else {
              var _clippedVerticesItems = setArraySize(clippedVertices, s + 3 * vertexSize);
              _clippedVerticesItems[s] = x1;
              _clippedVerticesItems[s + 1] = y1;
              _clippedVerticesItems[s + 2] = light.r;
              _clippedVerticesItems[s + 3] = light.g;
              _clippedVerticesItems[s + 4] = light.b;
              _clippedVerticesItems[s + 5] = light.a;
              if (!twoColor) {
                _clippedVerticesItems[s + 6] = u1;
                _clippedVerticesItems[s + 7] = v1;
                _clippedVerticesItems[s + 8] = x2;
                _clippedVerticesItems[s + 9] = y2;
                _clippedVerticesItems[s + 10] = light.r;
                _clippedVerticesItems[s + 11] = light.g;
                _clippedVerticesItems[s + 12] = light.b;
                _clippedVerticesItems[s + 13] = light.a;
                _clippedVerticesItems[s + 14] = u2;
                _clippedVerticesItems[s + 15] = v2;
                _clippedVerticesItems[s + 16] = x3;
                _clippedVerticesItems[s + 17] = y3;
                _clippedVerticesItems[s + 18] = light.r;
                _clippedVerticesItems[s + 19] = light.g;
                _clippedVerticesItems[s + 20] = light.b;
                _clippedVerticesItems[s + 21] = light.a;
                _clippedVerticesItems[s + 22] = u3;
                _clippedVerticesItems[s + 23] = v3;
              } else {
                _clippedVerticesItems[s + 6] = u1;
                _clippedVerticesItems[s + 7] = v1;
                _clippedVerticesItems[s + 8] = dark.r;
                _clippedVerticesItems[s + 9] = dark.g;
                _clippedVerticesItems[s + 10] = dark.b;
                _clippedVerticesItems[s + 11] = dark.a;
                _clippedVerticesItems[s + 12] = x2;
                _clippedVerticesItems[s + 13] = y2;
                _clippedVerticesItems[s + 14] = light.r;
                _clippedVerticesItems[s + 15] = light.g;
                _clippedVerticesItems[s + 16] = light.b;
                _clippedVerticesItems[s + 17] = light.a;
                _clippedVerticesItems[s + 18] = u2;
                _clippedVerticesItems[s + 19] = v2;
                _clippedVerticesItems[s + 20] = dark.r;
                _clippedVerticesItems[s + 21] = dark.g;
                _clippedVerticesItems[s + 22] = dark.b;
                _clippedVerticesItems[s + 23] = dark.a;
                _clippedVerticesItems[s + 24] = x3;
                _clippedVerticesItems[s + 25] = y3;
                _clippedVerticesItems[s + 26] = light.r;
                _clippedVerticesItems[s + 27] = light.g;
                _clippedVerticesItems[s + 28] = light.b;
                _clippedVerticesItems[s + 29] = light.a;
                _clippedVerticesItems[s + 30] = u3;
                _clippedVerticesItems[s + 31] = v3;
                _clippedVerticesItems[s + 32] = dark.r;
                _clippedVerticesItems[s + 33] = dark.g;
                _clippedVerticesItems[s + 34] = dark.b;
                _clippedVerticesItems[s + 35] = dark.a;
              }
              s = clippedTriangles.length;
              var _clippedTrianglesItems = setArraySize(clippedTriangles, s + 3);
              _clippedTrianglesItems[s] = index;
              _clippedTrianglesItems[s + 1] = index + 1;
              _clippedTrianglesItems[s + 2] = index + 2;
              index += 3;
              continue outer;
            }
          }
        }
      }
    }, {
      key: 'clip',
      value: function clip(x1, y1, x2, y2, x3, y3, clippingArea, output) {
        var originalOutput = output;
        var clipped = false;
        var input = null;
        if (clippingArea.length % 4 >= 2) {
          input = output;
          output = this.scratch;
        } else {
          input = this.scratch;
        }
        input.length = 0;
        input.push(x1);
        input.push(y1);
        input.push(x2);
        input.push(y2);
        input.push(x3);
        input.push(y3);
        input.push(x1);
        input.push(y1);
        output.length = 0;
        var clippingVertices = clippingArea;
        var clippingVerticesLast = clippingArea.length - 4;
        for (var i = 0;; i += 2) {
          var edgeX = clippingVertices[i];
          var edgeY = clippingVertices[i + 1];
          var edgeX2 = clippingVertices[i + 2];
          var edgeY2 = clippingVertices[i + 3];
          var deltaX = edgeX - edgeX2;
          var deltaY = edgeY - edgeY2;
          var inputVertices = input;
          var inputVerticesLength = input.length - 2;
          var outputStart = output.length;
          for (var ii = 0; ii < inputVerticesLength; ii += 2) {
            var inputX = inputVertices[ii];
            var inputY = inputVertices[ii + 1];
            var inputX2 = inputVertices[ii + 2];
            var inputY2 = inputVertices[ii + 3];
            var side2 = deltaX * (inputY2 - edgeY2) - deltaY * (inputX2 - edgeX2) > 0;
            if (deltaX * (inputY - edgeY2) - deltaY * (inputX - edgeX2) > 0) {
              if (side2) {
                output.push(inputX2);
                output.push(inputY2);
                continue;
              }
              var c0 = inputY2 - inputY;
              var c2 = inputX2 - inputX;
              var ua = (c2 * (edgeY - inputY) - c0 * (edgeX - inputX)) / (c0 * (edgeX2 - edgeX) - c2 * (edgeY2 - edgeY));
              output.push(edgeX + (edgeX2 - edgeX) * ua);
              output.push(edgeY + (edgeY2 - edgeY) * ua);
            } else if (side2) {
              var _c = inputY2 - inputY;
              var _c2 = inputX2 - inputX;
              var _ua = (_c2 * (edgeY - inputY) - _c * (edgeX - inputX)) / (_c * (edgeX2 - edgeX) - _c2 * (edgeY2 - edgeY));
              output.push(edgeX + (edgeX2 - edgeX) * _ua);
              output.push(edgeY + (edgeY2 - edgeY) * _ua);
              output.push(inputX2);
              output.push(inputY2);
            }
            clipped = true;
          }
          if (outputStart === output.length) {
            originalOutput.length = 0;
            return true;
          }
          output.push(output[0]);
          output.push(output[1]);
          if (i === clippingVerticesLast) {
            break;
          }
          var temp = output;
          output = input;
          output.length = 0;
          input = temp;
        }
        if (originalOutput !== output) {
          originalOutput.length = 0;
          for (var _i = 0, n = output.length - 2; _i < n; _i++) {
            originalOutput[_i] = output[_i];
          }
        } else {
          originalOutput.length = originalOutput.length - 2;
        }
        return clipped;
      }
    }], [{
      key: 'makeClockwise',
      value: function makeClockwise(polygon) {
        var vertices = polygon;
        var verticeslength = polygon.length;
        var area = vertices[verticeslength - 2] * vertices[1] - vertices[0] * vertices[verticeslength - 1];
        var p1x = 0;
        var p1y = 0;
        var p2x = 0;
        var p2y = 0;
        for (var i = 0, n = verticeslength - 3; i < n; i += 2) {
          p1x = vertices[i];
          p1y = vertices[i + 1];
          p2x = vertices[i + 2];
          p2y = vertices[i + 3];
          area += p1x * p2y - p2x * p1y;
        }
        if (area < 0) {
          return;
        }
        for (var _i2 = 0, lastX = verticeslength - 2, _n2 = verticeslength >> 1; _i2 < _n2; _i2 += 2) {
          var x = vertices[_i2];
          var y = vertices[_i2 + 1];
          var other = lastX - _i2;
          vertices[_i2] = vertices[other];
          vertices[_i2 + 1] = vertices[other + 1];
          vertices[other] = x;
          vertices[other + 1] = y;
        }
      }
    }]);
    return SkeletonClipping;
  }();

  var FAIL_ON_NON_EXISTING_SKIN = false;
  var SkeletonJSON = function () {
    function SkeletonJSON(attachmentLoader) {
      classCallCheck(this, SkeletonJSON);
      this.scale = 1;
      this.linkedMeshes = [];
      this.attachmentLoader = attachmentLoader;
    }
    createClass(SkeletonJSON, [{
      key: 'readSkeletonData',
      value: function readSkeletonData(json) {
        var scale = this.scale;
        var skeletonData = new SkeletonData();
        var root = typeof json === 'string' ? JSON.parse(json) : json;
        var skeletonMap = root.skeleton;
        if (skeletonMap != null) {
          skeletonData.hash = skeletonMap.hash;
          skeletonData.version = skeletonMap.spine;
          if (skeletonData.version.substr(0, 3) !== '3.8') {
            console.error('TinyJS Spine plugin supports only format for Spine 3.8. Your model has version ' + skeletonMap.spine + '.');
          }
          if (skeletonData.version === '3.8.75') {
            console.error('Unsupported skeleton data, 3.8.75 is deprecated, please export with a newer version of Spine.');
          }
          skeletonData.x = skeletonMap.x;
          skeletonData.y = skeletonMap.y;
          skeletonData.width = skeletonMap.width;
          skeletonData.height = skeletonMap.height;
          skeletonData.fps = skeletonMap.fps;
          skeletonData.imagesPath = skeletonMap.images;
        }
        if (root.bones) {
          for (var i = 0; i < root.bones.length; i++) {
            var boneMap = root.bones[i];
            var parent = null;
            var parentName = this.getValue(boneMap, 'parent', null);
            if (parentName != null) {
              parent = skeletonData.findBone(parentName);
              if (parent == null) {
                throw new Error('Parent bone not found: ' + parentName);
              }
            }
            var data = new BoneData(skeletonData.bones.length, boneMap.name, parent);
            data.length = this.getValue(boneMap, 'length', 0) * scale;
            data.x = this.getValue(boneMap, 'x', 0) * scale;
            data.y = this.getValue(boneMap, 'y', 0) * scale;
            data.rotation = this.getValue(boneMap, 'rotation', 0);
            data.scaleX = this.getValue(boneMap, 'scaleX', 1);
            data.scaleY = this.getValue(boneMap, 'scaleY', 1);
            data.shearX = this.getValue(boneMap, 'shearX', 0);
            data.shearY = this.getValue(boneMap, 'shearY', 0);
            data.transformMode = SkeletonJSON.transformModeFromString(this.getValue(boneMap, 'transform', 'normal'));
            data.skinRequired = this.getValue(boneMap, 'skin', false);
            skeletonData.bones.push(data);
          }
        }
        if (root.slots) {
          for (var _i = 0; _i < root.slots.length; _i++) {
            var slotMap = root.slots[_i];
            var slotName = slotMap.name;
            var boneName = slotMap.bone;
            var boneData = skeletonData.findBone(boneName);
            if (boneData == null) {
              throw new Error('Slot bone not found: ' + boneName);
            }
            var _data = new SlotData(skeletonData.slots.length, slotName, boneData);
            var color = this.getValue(slotMap, 'color', null);
            if (color != null) {
              _data.color.setFromString(color);
            }
            var dark = this.getValue(slotMap, 'dark', null);
            if (dark != null) {
              _data.darkColor = new Color(1, 1, 1, 1);
              _data.darkColor.setFromString(dark);
            }
            _data.attachmentName = this.getValue(slotMap, 'attachment', null);
            _data.blendMode = SkeletonJSON.blendModeFromString(this.getValue(slotMap, 'blend', 'normal'));
            skeletonData.slots.push(_data);
          }
        }
        if (root.ik) {
          for (var _i2 = 0; _i2 < root.ik.length; _i2++) {
            var constraintMap = root.ik[_i2];
            var _data2 = new IKConstraintData(constraintMap.name);
            _data2.order = this.getValue(constraintMap, 'order', 0);
            _data2.skinRequired = this.getValue(constraintMap, 'skin', false);
            for (var j = 0; j < constraintMap.bones.length; j++) {
              var _boneName = constraintMap.bones[j];
              var bone = skeletonData.findBone(_boneName);
              if (bone == null) {
                throw new Error('IK bone not found: ' + _boneName);
              }
              _data2.bones.push(bone);
            }
            var targetName = constraintMap.target;
            _data2.target = skeletonData.findBone(targetName);
            if (_data2.target == null) {
              throw new Error('IK target bone not found: ' + targetName);
            }
            _data2.mix = this.getValue(constraintMap, 'mix', 1);
            _data2.softness = this.getValue(constraintMap, 'softness', 0) * scale;
            _data2.bendDirection = this.getValue(constraintMap, 'bendPositive', true) ? 1 : -1;
            _data2.compress = this.getValue(constraintMap, 'compress', false);
            _data2.stretch = this.getValue(constraintMap, 'stretch', false);
            _data2.uniform = this.getValue(constraintMap, 'uniform', false);
            skeletonData.ikConstraints.push(_data2);
          }
        }
        if (root.transform) {
          for (var _i3 = 0; _i3 < root.transform.length; _i3++) {
            var _constraintMap = root.transform[_i3];
            var _data3 = new TransformConstraintData(_constraintMap.name);
            _data3.order = this.getValue(_constraintMap, 'order', 0);
            _data3.skinRequired = this.getValue(_constraintMap, 'skin', false);
            for (var _j = 0; _j < _constraintMap.bones.length; _j++) {
              var _boneName2 = _constraintMap.bones[_j];
              var _bone = skeletonData.findBone(_boneName2);
              if (_bone == null) {
                throw new Error('Transform constraint bone not found: ' + _boneName2);
              }
              _data3.bones.push(_bone);
            }
            var _targetName = _constraintMap.target;
            _data3.target = skeletonData.findBone(_targetName);
            if (_data3.target == null) {
              throw new Error('Transform constraint target bone not found: ' + _targetName);
            }
            _data3.local = this.getValue(_constraintMap, 'local', false);
            _data3.relative = this.getValue(_constraintMap, 'relative', false);
            _data3.offsetRotation = this.getValue(_constraintMap, 'rotation', 0);
            _data3.offsetX = this.getValue(_constraintMap, 'x', 0) * scale;
            _data3.offsetY = this.getValue(_constraintMap, 'y', 0) * scale;
            _data3.offsetScaleX = this.getValue(_constraintMap, 'scaleX', 0);
            _data3.offsetScaleY = this.getValue(_constraintMap, 'scaleY', 0);
            _data3.offsetShearY = this.getValue(_constraintMap, 'shearY', 0);
            _data3.rotateMix = this.getValue(_constraintMap, 'rotateMix', 1);
            _data3.translateMix = this.getValue(_constraintMap, 'translateMix', 1);
            _data3.scaleMix = this.getValue(_constraintMap, 'scaleMix', 1);
            _data3.shearMix = this.getValue(_constraintMap, 'shearMix', 1);
            skeletonData.transformConstraints.push(_data3);
          }
        }
        if (root.path) {
          for (var _i4 = 0; _i4 < root.path.length; _i4++) {
            var _constraintMap2 = root.path[_i4];
            var _data4 = new PathConstraintData(_constraintMap2.name);
            _data4.order = this.getValue(_constraintMap2, 'order', 0);
            _data4.skinRequired = this.getValue(_constraintMap2, 'skin', false);
            for (var _j2 = 0; _j2 < _constraintMap2.bones.length; _j2++) {
              var _boneName3 = _constraintMap2.bones[_j2];
              var _bone2 = skeletonData.findBone(_boneName3);
              if (_bone2 == null) {
                throw new Error('Transform constraint bone not found: ' + _boneName3);
              }
              _data4.bones.push(_bone2);
            }
            var _targetName2 = _constraintMap2.target;
            _data4.target = skeletonData.findSlot(_targetName2);
            if (_data4.target == null) {
              throw new Error('Path target slot not found: ' + _targetName2);
            }
            _data4.positionMode = SkeletonJSON.positionModeFromString(this.getValue(_constraintMap2, 'positionMode', 'percent'));
            _data4.spacingMode = SkeletonJSON.spacingModeFromString(this.getValue(_constraintMap2, 'spacingMode', 'length'));
            _data4.rotateMode = SkeletonJSON.rotateModeFromString(this.getValue(_constraintMap2, 'rotateMode', 'tangent'));
            _data4.offsetRotation = this.getValue(_constraintMap2, 'rotation', 0);
            _data4.position = this.getValue(_constraintMap2, 'position', 0);
            if (_data4.positionMode === PositionMode.Fixed) {
              _data4.position *= scale;
            }
            _data4.spacing = this.getValue(_constraintMap2, 'spacing', 0);
            if (_data4.spacingMode === SpacingMode.Length || _data4.spacingMode === SpacingMode.Fixed) {
              _data4.spacing *= scale;
            }
            _data4.rotateMix = this.getValue(_constraintMap2, 'rotateMix', 1);
            _data4.translateMix = this.getValue(_constraintMap2, 'translateMix', 1);
            skeletonData.pathConstraints.push(_data4);
          }
        }
        if (root.skins) {
          for (var _i5 = 0; _i5 < root.skins.length; _i5++) {
            var skinMap = root.skins[_i5];
            var skin = new Skin(skinMap.name);
            if (skinMap.bones) {
              for (var ii = 0; ii < skinMap.bones.length; ii++) {
                var _bone3 = skeletonData.findBone(skinMap.bones[ii]);
                if (_bone3 == null) {
                  throw new Error('Skin bone not found: ' + skinMap.bones[_i5]);
                }
                skin.bones.push(_bone3);
              }
            }
            if (skinMap.ik) {
              for (var _ii = 0; _ii < skinMap.ik.length; _ii++) {
                var constraint = skeletonData.findIKConstraint(skinMap.ik[_ii]);
                if (constraint == null) {
                  throw new Error('Skin IK constraint not found: ' + skinMap.ik[_i5]);
                }
                skin.constraints.push(constraint);
              }
            }
            if (skinMap.transform) {
              for (var _ii2 = 0; _ii2 < skinMap.transform.length; _ii2++) {
                var _constraint = skeletonData.findTransformConstraint(skinMap.transform[_ii2]);
                if (_constraint == null) {
                  throw new Error('Skin transform constraint not found: ' + skinMap.transform[_i5]);
                }
                skin.constraints.push(_constraint);
              }
            }
            if (skinMap.path) {
              for (var _ii3 = 0; _ii3 < skinMap.path.length; _ii3++) {
                var _constraint2 = skeletonData.findPathConstraint(skinMap.path[_ii3]);
                if (_constraint2 == null) {
                  throw new Error('Skin path constraint not found: ' + skinMap.path[_i5]);
                }
                skin.constraints.push(_constraint2);
              }
            }
            for (var _slotName in skinMap.attachments) {
              var slot = skeletonData.findSlot(_slotName);
              if (slot == null) {
                throw new Error('Slot not found: ' + _slotName);
              }
              var _slotMap = skinMap.attachments[_slotName];
              for (var entryName in _slotMap) {
                var attachment = this.readAttachment(_slotMap[entryName], skin, slot.index, entryName, skeletonData);
                if (attachment != null) {
                  skin.setAttachment(slot.index, entryName, attachment);
                }
              }
            }
            skeletonData.skins.push(skin);
            if (skin.name === 'default') {
              skeletonData.defaultSkin = skin;
            }
          }
        }
        for (var _i6 = 0, n = this.linkedMeshes.length; _i6 < n; _i6++) {
          var linkedMesh = this.linkedMeshes[_i6];
          var _skin = linkedMesh.skin == null ? skeletonData.defaultSkin : skeletonData.findSkin(linkedMesh.skin);
          if (_skin == null) {
            throw new Error('Skin not found: ' + linkedMesh.skin);
          }
          var _parent = _skin.getAttachment(linkedMesh.slotIndex, linkedMesh.parent);
          if (_parent == null) {
            throw new Error('Parent mesh not found: ' + linkedMesh.parent);
          }
          linkedMesh.mesh.deformAttachment = linkedMesh.inheritDeform ? _parent : linkedMesh.mesh;
          linkedMesh.mesh.setParentMesh(_parent);
        }
        this.linkedMeshes.length = 0;
        if (root.events) {
          for (var eventName in root.events) {
            var eventMap = root.events[eventName];
            var _data5 = new EventData(eventName);
            _data5.intValue = this.getValue(eventMap, 'int', 0);
            _data5.floatValue = this.getValue(eventMap, 'float', 0);
            _data5.stringValue = this.getValue(eventMap, 'string', '');
            _data5.audioPath = this.getValue(eventMap, 'audio', null);
            if (_data5.audioPath != null) {
              _data5.volume = this.getValue(eventMap, 'volume', 1);
              _data5.balance = this.getValue(eventMap, 'balance', 0);
            }
            skeletonData.events.push(_data5);
          }
        }
        if (root.animations) {
          for (var animationName in root.animations) {
            var animationMap = root.animations[animationName];
            this.readAnimation(animationMap, animationName, skeletonData);
          }
        }
        return skeletonData;
      }
    }, {
      key: 'readAttachment',
      value: function readAttachment(map, skin, slotIndex, name, skeletonData) {
        var scale = this.scale;
        name = this.getValue(map, 'name', name);
        var type = this.getValue(map, 'type', 'region');
        switch (type) {
          case 'region':
            {
              var path = this.getValue(map, 'path', name);
              var region = this.attachmentLoader.newRegionAttachment(skin, name, path);
              if (region == null) {
                return null;
              }
              region.path = path;
              region.x = this.getValue(map, 'x', 0) * scale;
              region.y = this.getValue(map, 'y', 0) * scale;
              region.scaleX = this.getValue(map, 'scaleX', 1);
              region.scaleY = this.getValue(map, 'scaleY', 1);
              region.rotation = this.getValue(map, 'rotation', 0);
              region.width = map.width * scale;
              region.height = map.height * scale;
              var color = this.getValue(map, 'color', null);
              if (color != null) {
                region.color.setFromString(color);
              }
              region.updateOffset();
              return region;
            }
          case 'boundingbox':
            {
              var box = this.attachmentLoader.newBoundingBoxAttachment(skin, name);
              if (box == null) {
                return null;
              }
              this.readVertices(map, box, map.vertexCount << 1);
              var _color = this.getValue(map, 'color', null);
              if (_color != null) {
                box.color.setFromString(_color);
              }
              return box;
            }
          case 'mesh':
          case 'linkedmesh':
            {
              var _path = this.getValue(map, 'path', name);
              var mesh = this.attachmentLoader.newMeshAttachment(skin, name, _path);
              if (mesh == null) {
                return null;
              }
              mesh.path = _path;
              var _color2 = this.getValue(map, 'color', null);
              if (_color2 != null) {
                mesh.color.setFromString(_color2);
              }
              mesh.width = this.getValue(map, 'width', 0) * scale;
              mesh.height = this.getValue(map, 'height', 0) * scale;
              var parent = this.getValue(map, 'parent', null);
              if (parent != null) {
                this.linkedMeshes.push(new LinkedMesh$1(mesh, this.getValue(map, 'skin', null), slotIndex, parent, this.getValue(map, 'deform', true)));
                return mesh;
              }
              var uvs = map.uvs;
              this.readVertices(map, mesh, uvs.length);
              mesh.triangles = map.triangles;
              mesh.regionUVs = new Float32Array(uvs);
              mesh.edges = this.getValue(map, 'edges', null);
              mesh.hullLength = this.getValue(map, 'hull', 0) * 2;
              return mesh;
            }
          case 'path':
            {
              var _path2 = this.attachmentLoader.newPathAttachment(skin, name);
              if (_path2 == null) {
                return null;
              }
              _path2.closed = this.getValue(map, 'closed', false);
              _path2.constantSpeed = this.getValue(map, 'constantSpeed', true);
              var vertexCount = map.vertexCount;
              this.readVertices(map, _path2, vertexCount << 1);
              var lengths = newArray(vertexCount / 3, 0);
              for (var i = 0; i < map.lengths.length; i++) {
                lengths[i] = map.lengths[i] * scale;
              }
              _path2.lengths = lengths;
              var _color3 = this.getValue(map, 'color', null);
              if (_color3 != null) {
                _path2.color.setFromString(_color3);
              }
              return _path2;
            }
          case 'point':
            {
              var point = this.attachmentLoader.newPointAttachment(skin, name);
              if (point == null) {
                return null;
              }
              point.x = this.getValue(map, 'x', 0) * scale;
              point.y = this.getValue(map, 'y', 0) * scale;
              point.rotation = this.getValue(map, 'rotation', 0);
              var _color4 = this.getValue(map, 'color', null);
              if (_color4 != null) {
                point.color.setFromString(_color4);
              }
              return point;
            }
          case 'clipping':
            {
              var clip = this.attachmentLoader.newClippingAttachment(skin, name);
              if (clip == null) {
                return null;
              }
              var end = this.getValue(map, 'end', null);
              if (end != null) {
                var slot = skeletonData.findSlot(end);
                if (slot == null) {
                  throw new Error('Clipping end slot not found: ' + end);
                }
                clip.endSlot = slot;
              }
              var _vertexCount = map.vertexCount;
              this.readVertices(map, clip, _vertexCount << 1);
              var _color5 = this.getValue(map, 'color', null);
              if (_color5 != null) {
                clip.color.setFromString(_color5);
              }
              return clip;
            }
        }
        return null;
      }
    }, {
      key: 'readVertices',
      value: function readVertices(map, attachment, verticesLength) {
        var scale = this.scale;
        attachment.worldVerticesLength = verticesLength;
        var vertices = map.vertices;
        if (verticesLength === vertices.length) {
          var scaledVertices = toFloatArray(vertices);
          if (scale !== 1) {
            for (var i = 0, n = vertices.length; i < n; i++) {
              scaledVertices[i] *= scale;
            }
          }
          attachment.vertices = scaledVertices;
          return;
        }
        var weights = [];
        var bones = [];
        for (var _i7 = 0, _n = vertices.length; _i7 < _n;) {
          var boneCount = vertices[_i7++];
          bones.push(boneCount);
          for (var nn = _i7 + boneCount * 4; _i7 < nn; _i7 += 4) {
            bones.push(vertices[_i7]);
            weights.push(vertices[_i7 + 1] * scale);
            weights.push(vertices[_i7 + 2] * scale);
            weights.push(vertices[_i7 + 3]);
          }
        }
        attachment.bones = bones;
        attachment.vertices = toFloatArray(weights);
      }
    }, {
      key: 'readAnimation',
      value: function readAnimation(map, name, skeletonData) {
        var scale = this.scale;
        var timelines = [];
        var duration = 0;
        if (map.slots) {
          for (var slotName in map.slots) {
            var slotMap = map.slots[slotName];
            var slotIndex = skeletonData.findSlotIndex(slotName);
            if (slotIndex === -1) {
              throw new Error('Slot not found: ' + slotName);
            }
            for (var timelineName in slotMap) {
              var timelineMap = slotMap[timelineName];
              if (timelineName === 'attachment') {
                var timeline = new AttachmentTimeline(timelineMap.length);
                timeline.slotIndex = slotIndex;
                var frameIndex = 0;
                for (var i = 0; i < timelineMap.length; i++) {
                  var valueMap = timelineMap[i];
                  timeline.setFrame(frameIndex++, this.getValue(valueMap, 'time', 0), valueMap.name);
                }
                timelines.push(timeline);
                duration = Math.max(duration, timeline.frames[timeline.getFrameCount() - 1]);
              } else if (timelineName === 'color') {
                var _timeline = new ColorTimeline(timelineMap.length);
                _timeline.slotIndex = slotIndex;
                var _frameIndex = 0;
                for (var _i8 = 0; _i8 < timelineMap.length; _i8++) {
                  var _valueMap = timelineMap[_i8];
                  var color = new Color();
                  color.setFromString(_valueMap.color || 'ffffffff');
                  _timeline.setFrame(_frameIndex, this.getValue(_valueMap, 'time', 0), color.r, color.g, color.b, color.a);
                  this.readCurve(_valueMap, _timeline, _frameIndex);
                  _frameIndex++;
                }
                timelines.push(_timeline);
                duration = Math.max(duration, _timeline.frames[(_timeline.getFrameCount() - 1) * ColorTimeline.ENTRIES]);
              } else if (timelineName === 'twoColor') {
                var _timeline2 = new TwoColorTimeline(timelineMap.length);
                _timeline2.slotIndex = slotIndex;
                var _frameIndex2 = 0;
                for (var _i9 = 0; _i9 < timelineMap.length; _i9++) {
                  var _valueMap2 = timelineMap[_i9];
                  var light = new Color();
                  var dark = new Color();
                  light.setFromString(_valueMap2.light);
                  dark.setFromString(_valueMap2.dark);
                  _timeline2.setFrame(_frameIndex2, this.getValue(_valueMap2, 'time', 0), light.r, light.g, light.b, light.a, dark.r, dark.g, dark.b);
                  this.readCurve(_valueMap2, _timeline2, _frameIndex2);
                  _frameIndex2++;
                }
                timelines.push(_timeline2);
                duration = Math.max(duration, _timeline2.frames[(_timeline2.getFrameCount() - 1) * TwoColorTimeline.ENTRIES]);
              } else {
                throw new Error('Invalid timeline type for a slot: ' + timelineName + ' (' + slotName + ')');
              }
            }
          }
        }
        if (map.bones) {
          for (var boneName in map.bones) {
            var boneMap = map.bones[boneName];
            var boneIndex = skeletonData.findBoneIndex(boneName);
            if (boneIndex === -1) {
              throw new Error('Bone not found: ' + boneName);
            }
            for (var _timelineName in boneMap) {
              var _timelineMap = boneMap[_timelineName];
              if (_timelineName === 'rotate') {
                var _timeline3 = new RotateTimeline(_timelineMap.length);
                _timeline3.boneIndex = boneIndex;
                var _frameIndex3 = 0;
                for (var _i10 = 0; _i10 < _timelineMap.length; _i10++) {
                  var _valueMap3 = _timelineMap[_i10];
                  _timeline3.setFrame(_frameIndex3, this.getValue(_valueMap3, 'time', 0), this.getValue(_valueMap3, 'angle', 0));
                  this.readCurve(_valueMap3, _timeline3, _frameIndex3);
                  _frameIndex3++;
                }
                timelines.push(_timeline3);
                duration = Math.max(duration, _timeline3.frames[(_timeline3.getFrameCount() - 1) * RotateTimeline.ENTRIES]);
              } else if (_timelineName === 'translate' || _timelineName === 'scale' || _timelineName === 'shear') {
                var _timeline4 = null;
                var timelineScale = 1;
                var defaultValue = 0;
                if (_timelineName === 'scale') {
                  _timeline4 = new ScaleTimeline(_timelineMap.length);
                  defaultValue = 1;
                } else if (_timelineName === 'shear') {
                  _timeline4 = new ShearTimeline(_timelineMap.length);
                } else {
                  _timeline4 = new TranslateTimeline(_timelineMap.length);
                  timelineScale = scale;
                }
                _timeline4.boneIndex = boneIndex;
                var _frameIndex4 = 0;
                for (var _i11 = 0; _i11 < _timelineMap.length; _i11++) {
                  var _valueMap4 = _timelineMap[_i11];
                  var x = this.getValue(_valueMap4, 'x', defaultValue);
                  var y = this.getValue(_valueMap4, 'y', defaultValue);
                  _timeline4.setFrame(_frameIndex4, this.getValue(_valueMap4, 'time', 0), x * timelineScale, y * timelineScale);
                  this.readCurve(_valueMap4, _timeline4, _frameIndex4);
                  _frameIndex4++;
                }
                timelines.push(_timeline4);
                duration = Math.max(duration, _timeline4.frames[(_timeline4.getFrameCount() - 1) * TranslateTimeline.ENTRIES]);
              } else {
                throw new Error('Invalid timeline type for a bone: ' + _timelineName + ' (' + boneName + ')');
              }
            }
          }
        }
        if (map.ik) {
          for (var constraintName in map.ik) {
            var constraintMap = map.ik[constraintName];
            var constraint = skeletonData.findIKConstraint(constraintName);
            var _timeline5 = new IKConstraintTimeline(constraintMap.length);
            _timeline5.ikConstraintIndex = skeletonData.ikConstraints.indexOf(constraint);
            var _frameIndex5 = 0;
            for (var _i12 = 0; _i12 < constraintMap.length; _i12++) {
              var _valueMap5 = constraintMap[_i12];
              _timeline5.setFrame(_frameIndex5, this.getValue(_valueMap5, 'time', 0), this.getValue(_valueMap5, 'mix', 1), this.getValue(_valueMap5, 'softness', 0) * scale, this.getValue(_valueMap5, 'bendPositive', true) ? 1 : -1, this.getValue(_valueMap5, 'compress', false), this.getValue(_valueMap5, 'stretch', false));
              this.readCurve(_valueMap5, _timeline5, _frameIndex5);
              _frameIndex5++;
            }
            timelines.push(_timeline5);
            duration = Math.max(duration, _timeline5.frames[(_timeline5.getFrameCount() - 1) * IKConstraintTimeline.ENTRIES]);
          }
        }
        if (map.transform) {
          for (var _constraintName in map.transform) {
            var _constraintMap3 = map.transform[_constraintName];
            var _constraint3 = skeletonData.findTransformConstraint(_constraintName);
            var _timeline6 = new TransformConstraintTimeline(_constraintMap3.length);
            _timeline6.transformConstraintIndex = skeletonData.transformConstraints.indexOf(_constraint3);
            var _frameIndex6 = 0;
            for (var _i13 = 0; _i13 < _constraintMap3.length; _i13++) {
              var _valueMap6 = _constraintMap3[_i13];
              _timeline6.setFrame(_frameIndex6, this.getValue(_valueMap6, 'time', 0), this.getValue(_valueMap6, 'rotateMix', 1), this.getValue(_valueMap6, 'translateMix', 1), this.getValue(_valueMap6, 'scaleMix', 1), this.getValue(_valueMap6, 'shearMix', 1));
              this.readCurve(_valueMap6, _timeline6, _frameIndex6);
              _frameIndex6++;
            }
            timelines.push(_timeline6);
            duration = Math.max(duration, _timeline6.frames[(_timeline6.getFrameCount() - 1) * TransformConstraintTimeline.ENTRIES]);
          }
        }
        if (map.path) {
          for (var _constraintName2 in map.path) {
            var _constraintMap4 = map.path[_constraintName2];
            var index = skeletonData.findPathConstraintIndex(_constraintName2);
            if (index === -1) {
              throw new Error('Path constraint not found: ' + _constraintName2);
            }
            var data = skeletonData.pathConstraints[index];
            for (var _timelineName2 in _constraintMap4) {
              var _timelineMap2 = _constraintMap4[_timelineName2];
              if (_timelineName2 === 'position' || _timelineName2 === 'spacing') {
                var _timeline7 = null;
                var _timelineScale = 1;
                if (_timelineName2 === 'spacing') {
                  _timeline7 = new PathConstraintSpacingTimeline(_timelineMap2.length);
                  if (data.spacingMode === SpacingMode.Length || data.spacingMode === SpacingMode.Fixed) {
                    _timelineScale = scale;
                  }
                } else {
                  _timeline7 = new PathConstraintPositionTimeline(_timelineMap2.length);
                  if (data.positionMode === PositionMode.Fixed) {
                    _timelineScale = scale;
                  }
                }
                _timeline7.pathConstraintIndex = index;
                var _frameIndex7 = 0;
                for (var _i14 = 0; _i14 < _timelineMap2.length; _i14++) {
                  var _valueMap7 = _timelineMap2[_i14];
                  _timeline7.setFrame(_frameIndex7, this.getValue(_valueMap7, 'time', 0), this.getValue(_valueMap7, _timelineName2, 0) * _timelineScale);
                  this.readCurve(_valueMap7, _timeline7, _frameIndex7);
                  _frameIndex7++;
                }
                timelines.push(_timeline7);
                duration = Math.max(duration, _timeline7.frames[(_timeline7.getFrameCount() - 1) * PathConstraintPositionTimeline.ENTRIES]);
              } else if (_timelineName2 === 'mix') {
                var _timeline8 = new PathConstraintMixTimeline(_timelineMap2.length);
                _timeline8.pathConstraintIndex = index;
                var _frameIndex8 = 0;
                for (var _i15 = 0; _i15 < _timelineMap2.length; _i15++) {
                  var _valueMap8 = _timelineMap2[_i15];
                  _timeline8.setFrame(_frameIndex8, this.getValue(_valueMap8, 'time', 0), this.getValue(_valueMap8, 'rotateMix', 1), this.getValue(_valueMap8, 'translateMix', 1));
                  this.readCurve(_valueMap8, _timeline8, _frameIndex8);
                  _frameIndex8++;
                }
                timelines.push(_timeline8);
                duration = Math.max(duration, _timeline8.frames[(_timeline8.getFrameCount() - 1) * PathConstraintMixTimeline.ENTRIES]);
              }
            }
          }
        }
        if (map.deform) {
          for (var deformName in map.deform) {
            var deformMap = map.deform[deformName];
            var skin = skeletonData.findSkin(deformName);
            if (skin == null) {
              {
                continue;
              }
            }
            for (var _slotName2 in deformMap) {
              var _slotMap2 = deformMap[_slotName2];
              var _slotIndex = skeletonData.findSlotIndex(_slotName2);
              if (_slotIndex === -1) {
                throw new Error('Slot not found: ' + _slotMap2.name);
              }
              for (var _timelineName3 in _slotMap2) {
                var _timelineMap3 = _slotMap2[_timelineName3];
                var attachment = skin.getAttachment(_slotIndex, _timelineName3);
                if (attachment == null) {
                  throw new Error('Deform attachment not found: ' + _timelineMap3.name);
                }
                var weighted = attachment.bones != null;
                var vertices = attachment.vertices;
                var deformLength = weighted ? vertices.length / 3 * 2 : vertices.length;
                var _timeline9 = new DeformTimeline(_timelineMap3.length);
                _timeline9.slotIndex = _slotIndex;
                _timeline9.attachment = attachment;
                var _frameIndex9 = 0;
                for (var j = 0; j < _timelineMap3.length; j++) {
                  var _valueMap9 = _timelineMap3[j];
                  var deform = void 0;
                  var verticesValue = this.getValue(_valueMap9, 'vertices', null);
                  if (verticesValue == null) {
                    deform = weighted ? newFloatArray(deformLength) : vertices;
                  } else {
                    deform = newFloatArray(deformLength);
                    var start = this.getValue(_valueMap9, 'offset', 0);
                    arrayCopy(verticesValue, 0, deform, start, verticesValue.length);
                    if (scale !== 1) {
                      for (var _i16 = start, n = _i16 + verticesValue.length; _i16 < n; _i16++) {
                        deform[_i16] *= scale;
                      }
                    }
                    if (!weighted) {
                      for (var _i17 = 0; _i17 < deformLength; _i17++) {
                        deform[_i17] += vertices[_i17];
                      }
                    }
                  }
                  _timeline9.setFrame(_frameIndex9, this.getValue(_valueMap9, 'time', 0), deform);
                  this.readCurve(_valueMap9, _timeline9, _frameIndex9);
                  _frameIndex9++;
                }
                timelines.push(_timeline9);
                duration = Math.max(duration, _timeline9.frames[_timeline9.getFrameCount() - 1]);
              }
            }
          }
        }
        var drawOrderNode = map.drawOrder;
        if (drawOrderNode == null) {
          drawOrderNode = map.draworder;
        }
        if (drawOrderNode != null) {
          var _timeline10 = new DrawOrderTimeline(drawOrderNode.length);
          var slotCount = skeletonData.slots.length;
          var _frameIndex10 = 0;
          for (var _j3 = 0; _j3 < drawOrderNode.length; _j3++) {
            var drawOrderMap = drawOrderNode[_j3];
            var drawOrder = null;
            var offsets = this.getValue(drawOrderMap, 'offsets', null);
            if (offsets != null) {
              drawOrder = newArray(slotCount, -1);
              var unchanged = newArray(slotCount - offsets.length, 0);
              var originalIndex = 0;
              var unchangedIndex = 0;
              for (var _i18 = 0; _i18 < offsets.length; _i18++) {
                var offsetMap = offsets[_i18];
                var _slotIndex2 = skeletonData.findSlotIndex(offsetMap.slot);
                if (_slotIndex2 === -1) {
                  throw new Error('Slot not found: ' + offsetMap.slot);
                }
                while (originalIndex !== _slotIndex2) {
                  unchanged[unchangedIndex++] = originalIndex++;
                }
                drawOrder[originalIndex + offsetMap.offset] = originalIndex++;
              }
              while (originalIndex < slotCount) {
                unchanged[unchangedIndex++] = originalIndex++;
              }
              for (var _i19 = slotCount - 1; _i19 >= 0; _i19--) {
                if (drawOrder[_i19] === -1) {
                  drawOrder[_i19] = unchanged[--unchangedIndex];
                }
              }
            }
            _timeline10.setFrame(_frameIndex10++, this.getValue(drawOrderMap, 'time', 0), drawOrder);
          }
          timelines.push(_timeline10);
          duration = Math.max(duration, _timeline10.frames[_timeline10.getFrameCount() - 1]);
        }
        if (map.events) {
          var _timeline11 = new EventTimeline(map.events.length);
          var _frameIndex11 = 0;
          for (var _i20 = 0; _i20 < map.events.length; _i20++) {
            var eventMap = map.events[_i20];
            var eventData = skeletonData.findEvent(eventMap.name);
            if (eventData == null) {
              throw new Error('Event not found: ' + eventMap.name);
            }
            var event = new Event(toSinglePrecision(this.getValue(eventMap, 'time', 0)), eventData);
            event.intValue = this.getValue(eventMap, 'int', eventData.intValue);
            event.floatValue = this.getValue(eventMap, 'float', eventData.floatValue);
            event.stringValue = this.getValue(eventMap, 'string', eventData.stringValue);
            if (event.data.audioPath != null) {
              event.volume = this.getValue(eventMap, 'volume', 1);
              event.balance = this.getValue(eventMap, 'balance', 0);
            }
            _timeline11.setFrame(_frameIndex11++, event);
          }
          timelines.push(_timeline11);
          duration = Math.max(duration, _timeline11.frames[_timeline11.getFrameCount() - 1]);
        }
        if (isNaN(duration)) {
          throw new Error('Error while parsing animation, duration is NaN');
        }
        skeletonData.animations.push(new Animation(name, timelines, duration));
      }
    }, {
      key: 'readCurve',
      value: function readCurve(map, timeline, frameIndex) {
        if (!map.hasOwnProperty('curve')) {
          return;
        }
        if (map.curve === 'stepped') {
          timeline.setStepped(frameIndex);
        } else {
          var curve = map.curve;
          timeline.setCurve(frameIndex, curve, this.getValue(map, 'c2', 0), this.getValue(map, 'c3', 1), this.getValue(map, 'c4', 1));
        }
      }
    }, {
      key: 'getValue',
      value: function getValue(map, prop, defaultValue) {
        return map[prop] !== undefined ? map[prop] : defaultValue;
      }
    }], [{
      key: 'blendModeFromString',
      value: function blendModeFromString(str) {
        str = str.toLowerCase();
        if (str === 'normal') return BlendMode.Normal;
        if (str === 'additive') return BlendMode.Additive;
        if (str === 'multiply') return BlendMode.Multiply;
        if (str === 'screen') return BlendMode.Screen;
        throw new Error('Unknown blend mode: ' + str);
      }
    }, {
      key: 'positionModeFromString',
      value: function positionModeFromString(str) {
        str = str.toLowerCase();
        if (str === 'fixed') return PositionMode.Fixed;
        if (str === 'percent') return PositionMode.Percent;
        throw new Error('Unknown position mode: ' + str);
      }
    }, {
      key: 'spacingModeFromString',
      value: function spacingModeFromString(str) {
        str = str.toLowerCase();
        if (str === 'length') return SpacingMode.Length;
        if (str === 'fixed') return SpacingMode.Fixed;
        if (str === 'percent') return SpacingMode.Percent;
        throw new Error('Unknown position mode: ' + str);
      }
    }, {
      key: 'rotateModeFromString',
      value: function rotateModeFromString(str) {
        str = str.toLowerCase();
        if (str === 'tangent') return RotateMode.Tangent;
        if (str === 'chain') return RotateMode.Chain;
        if (str === 'chainscale') return RotateMode.ChainScale;
        throw new Error('Unknown rotate mode: ' + str);
      }
    }, {
      key: 'transformModeFromString',
      value: function transformModeFromString(str) {
        str = str.toLowerCase();
        if (str === 'normal') return TransformMode.Normal;
        if (str === 'onlytranslation') return TransformMode.OnlyTranslation;
        if (str === 'norotationorreflection') return TransformMode.NoRotationOrReflection;
        if (str === 'noscale') return TransformMode.NoScale;
        if (str === 'noscaleorreflection') return TransformMode.NoScaleOrReflection;
        throw new Error('Unknown transform mode: ' + str);
      }
    }]);
    return SkeletonJSON;
  }();
  var LinkedMesh$1 = function LinkedMesh(mesh, skin, slotIndex, parent, inheritDeform) {
    classCallCheck(this, LinkedMesh);
    this.mesh = mesh;
    this.skin = skin;
    this.slotIndex = slotIndex;
    this.parent = parent;
    this.inheritDeform = inheritDeform;
  };

  var TextureFilter = {
    Nearest: 9728,
    Linear: 9729,
    MipMap: 9987,
    MipMapNearestNearest: 9984,
    MipMapLinearNearest: 9985,
    MipMapNearestLinear: 9986,
    MipMapLinearLinear: 9987 };
  var TextureWrap = {
    MirroredRepeat: 33648,
    ClampToEdge: 33071,
    Repeat: 10497 };
  var Texture = function () {
    function Texture(image) {
      classCallCheck(this, Texture);
      this._image = image;
    }
    createClass(Texture, [{
      key: 'getImage',
      value: function getImage() {
        return this._image;
      }
    }], [{
      key: 'filterFromString',
      value: function filterFromString(text) {
        switch (text.toLowerCase()) {
          case 'nearest':
            return TextureFilter.Nearest;
          case 'linear':
            return TextureFilter.Linear;
          case 'mipmap':
            return TextureFilter.MipMap;
          case 'mipmapnearestnearest':
            return TextureFilter.MipMapNearestNearest;
          case 'mipmaplinearnearest':
            return TextureFilter.MipMapLinearNearest;
          case 'mipmapnearestlinear':
            return TextureFilter.MipMapNearestLinear;
          case 'mipmaplinearlinear':
            return TextureFilter.MipMapLinearLinear;
          default:
            throw new Error('Unknown texture filter ' + text);
        }
      }
    }, {
      key: 'wrapFromString',
      value: function wrapFromString(text) {
        switch (text.toLowerCase()) {
          case 'mirroredtepeat':
            return TextureWrap.MirroredRepeat;
          case 'clamptoedge':
            return TextureWrap.ClampToEdge;
          case 'repeat':
            return TextureWrap.Repeat;
          default:
            throw new Error('Unknown texture wrap ' + text);
        }
      }
    }]);
    return Texture;
  }();
  var TextureRegion = function () {
    function TextureRegion() {
      classCallCheck(this, TextureRegion);
      this.size = null;
    }
    createClass(TextureRegion, [{
      key: 'width',
      get: function get$$1() {
        var tex = this.texture;
        if (tex.trim) {
          return tex.trim.width;
        }
        return tex.orig.width;
      }
    }, {
      key: 'height',
      get: function get$$1() {
        var tex = this.texture;
        if (tex.trim) {
          return tex.trim.height;
        }
        return tex.orig.height;
      }
    }, {
      key: 'u',
      get: function get$$1() {
        return this.texture._uvs.x0;
      }
    }, {
      key: 'v',
      get: function get$$1() {
        return this.texture._uvs.y0;
      }
    }, {
      key: 'u2',
      get: function get$$1() {
        return this.texture._uvs.x2;
      }
    }, {
      key: 'v2',
      get: function get$$1() {
        return this.texture._uvs.y2;
      }
    }, {
      key: 'offsetX',
      get: function get$$1() {
        var tex = this.texture;
        return tex.trim ? tex.trim.x : 0;
      }
    }, {
      key: 'offsetY',
      get: function get$$1() {
        return this.spineOffsetY;
      }
    }, {
      key: 'tinyOffsetY',
      get: function get$$1() {
        var tex = this.texture;
        return tex.trim ? tex.trim.y : 0;
      }
    }, {
      key: 'spineOffsetY',
      get: function get$$1() {
        var tex = this.texture;
        return this.originalHeight - this.height - (tex.trim ? tex.trim.y : 0);
      }
    }, {
      key: 'originalWidth',
      get: function get$$1() {
        return this.texture.orig.width;
      }
    }, {
      key: 'originalHeight',
      get: function get$$1() {
        return this.texture.orig.height;
      }
    }, {
      key: 'x',
      get: function get$$1() {
        return this.texture.frame.x;
      }
    }, {
      key: 'y',
      get: function get$$1() {
        return this.texture.frame.y;
      }
    }, {
      key: 'rotate',
      get: function get$$1() {
        return this.texture.rotate !== 0;
      }
    }]);
    return TextureRegion;
  }();

  var TextureAtlas = function () {
    function TextureAtlas(atlasText, textureLoader, callback) {
      classCallCheck(this, TextureAtlas);
      this.pages = [];
      this.regions = [];
      if (atlasText) {
        this.addSpineAtlas(atlasText, textureLoader, callback);
      }
    }
    createClass(TextureAtlas, [{
      key: 'addTexture',
      value: function addTexture(name, texture) {
        var pages = this.pages;
        var page = null;
        for (var i = 0; i < pages.length; i++) {
          if (pages[i].baseTexture === texture.baseTexture) {
            page = pages[i];
            break;
          }
        }
        if (page === null) {
          page = new TextureAtlasPage();
          page.name = 'texturePage';
          var baseTexture = texture.baseTexture;
          page.width = baseTexture.realWidth;
          page.height = baseTexture.realHeight;
          page.baseTexture = baseTexture;
          page.minFilter = page.magFilter = TextureFilter.Nearest;
          page.uWrap = TextureWrap.ClampToEdge;
          page.vWrap = TextureWrap.ClampToEdge;
          pages.push(page);
        }
        var region = new TextureAtlasRegion();
        region.name = name;
        region.page = page;
        region.texture = texture;
        region.index = -1;
        this.regions.push(region);
        return region;
      }
    }, {
      key: 'addTextureHash',
      value: function addTextureHash(textures, stripExtension) {
        for (var key in textures) {
          if (textures.hasOwnProperty(key)) {
            this.addTexture(stripExtension && key.indexOf('.') !== -1 ? key.substr(0, key.lastIndexOf('.')) : key, textures[key]);
          }
        }
      }
    }, {
      key: 'addSpineAtlas',
      value: function addSpineAtlas(atlasText, textureLoader, callback) {
        return this.load(atlasText, textureLoader, callback);
      }
    }, {
      key: 'load',
      value: function load(atlasText, textureLoader, callback) {
        var _this = this;
        if (textureLoader == null) {
          throw new Error('textureLoader cannot be null.');
        }
        var reader = new TextureAtlasReader(atlasText);
        var tuple = new Array(4);
        var page = null;
        var iterateParser = function iterateParser() {
          while (true) {
            var self = _this;
            var line = reader.readLine();
            if (line == null) {
              return callback && callback(self);
            }
            line = line.trim();
            if (line.length === 0) {
              page = null;
            } else if (!page) {
              page = new TextureAtlasPage();
              page.name = line;
              if (reader.readTuple(tuple) === 2) {
                page.width = parseInt(tuple[0]);
                page.height = parseInt(tuple[1]);
                reader.readTuple(tuple);
              }
              reader.readTuple(tuple);
              page.minFilter = Texture.filterFromString(tuple[0]);
              page.magFilter = Texture.filterFromString(tuple[1]);
              var direction = reader.readValue();
              page.uWrap = TextureWrap.ClampToEdge;
              page.vWrap = TextureWrap.ClampToEdge;
              if (direction === 'x') {
                page.uWrap = TextureWrap.Repeat;
              } else if (direction === 'y') {
                page.vWrap = TextureWrap.Repeat;
              } else if (direction === 'xy') {
                page.uWrap = page.vWrap = TextureWrap.Repeat;
              }
              textureLoader(line, function (texture) {
                if (texture === null) {
                  _this.pages.splice(_this.pages.indexOf(page), 1);
                  return callback && callback(null);
                }
                page.baseTexture = texture;
                if (!texture.hasLoaded) {
                  texture.width = page.width;
                  texture.height = page.height;
                }
                _this.pages.push(page);
                page.setFilters();
                if (!page.width || !page.height) {
                  page.width = texture.realWidth;
                  page.height = texture.realHeight;
                  if (!page.width || !page.height) {
                    console.log('ERROR spine atlas page ' + page.name + ': meshes wont work if you dont specify size in atlas (http://www.html5gamedevs.com/topic/18888-pixi-spines-and-meshes/?p=107121)');
                  }
                }
                iterateParser();
              });
              _this.pages.push(page);
              break;
            } else {
              var region = new TextureAtlasRegion();
              region.name = line;
              region.page = page;
              var rotateValue = reader.readValue();
              var rotate = 0;
              if (rotateValue.toLocaleLowerCase() === 'true') {
                rotate = 6;
              } else if (rotateValue.toLocaleLowerCase() === 'false') {
                rotate = 0;
              } else {
                rotate = (720 - parseFloat(rotateValue)) % 360 / 45;
              }
              reader.readTuple(tuple);
              var x = parseInt(tuple[0]);
              var y = parseInt(tuple[1]);
              reader.readTuple(tuple);
              var width = parseInt(tuple[0]);
              var height = parseInt(tuple[1]);
              var resolution = page.baseTexture.resolution;
              x /= resolution;
              y /= resolution;
              width /= resolution;
              height /= resolution;
              var swapWH = rotate % 4 !== 0;
              var frame = new Tiny.Rectangle(x, y, swapWH ? height : width, swapWH ? width : height);
              if (reader.readTuple(tuple) === 4) {
                if (reader.readTuple(tuple) === 4) {
                  reader.readTuple(tuple);
                }
              }
              var originalWidth = parseInt(tuple[0]) / resolution;
              var originalHeight = parseInt(tuple[1]) / resolution;
              reader.readTuple(tuple);
              var offsetX = parseInt(tuple[0]) / resolution;
              var offsetY = parseInt(tuple[1]) / resolution;
              var orig = new Tiny.Rectangle(0, 0, originalWidth, originalHeight);
              var trim = new Tiny.Rectangle(offsetX, originalHeight - height - offsetY, width, height);
              region.texture = new Tiny.Texture(region.page.baseTexture, frame, orig, trim, rotate);
              region.index = parseInt(reader.readValue());
              region.texture._updateUvs();
              _this.regions.push(region);
            }
          }
        };
        iterateParser();
      }
    }, {
      key: 'findRegion',
      value: function findRegion(name) {
        for (var i = 0; i < this.regions.length; i++) {
          if (this.regions[i].name === name) {
            return this.regions[i];
          }
        }
        return null;
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        for (var i = 0; i < this.pages.length; i++) {
          this.pages[i].baseTexture.dispose();
        }
      }
    }]);
    return TextureAtlas;
  }();
  var TextureAtlasPage = function () {
    function TextureAtlasPage() {
      classCallCheck(this, TextureAtlasPage);
      this._ = null;
    }
    createClass(TextureAtlasPage, [{
      key: 'setFilters',
      value: function setFilters() {
        var tex = this.baseTexture;
        var filter = this.minFilter;
        if (filter === TextureFilter.Linear) {
          tex.scaleMode = Tiny.SCALE_MODES.LINEAR;
        } else if (this.minFilter === TextureFilter.Nearest) {
          tex.scaleMode = Tiny.SCALE_MODES.NEAREST;
        } else {
          tex.mipmap = true;
          if (filter === TextureFilter.MipMapNearestNearest) {
            tex.scaleMode = Tiny.SCALE_MODES.NEAREST;
          } else {
            tex.scaleMode = Tiny.SCALE_MODES.LINEAR;
          }
        }
      }
    }]);
    return TextureAtlasPage;
  }();
  var TextureAtlasRegion = function (_TextureRegion) {
    inherits(TextureAtlasRegion, _TextureRegion);
    function TextureAtlasRegion() {
      classCallCheck(this, TextureAtlasRegion);
      return possibleConstructorReturn(this, (TextureAtlasRegion.__proto__ || Object.getPrototypeOf(TextureAtlasRegion)).call(this));
    }
    return TextureAtlasRegion;
  }(TextureRegion);
  var TextureAtlasReader = function () {
    function TextureAtlasReader(text) {
      classCallCheck(this, TextureAtlasReader);
      this.index = 0;
      this.lines = text.split(/\r\n|\r|\n/);
    }
    createClass(TextureAtlasReader, [{
      key: 'readLine',
      value: function readLine() {
        if (this.index >= this.lines.length) {
          return null;
        }
        return this.lines[this.index++];
      }
    }, {
      key: 'readValue',
      value: function readValue() {
        var line = this.readLine();
        var colon = line.indexOf(':');
        if (colon === -1) {
          throw new Error('Invalid line: ' + line);
        }
        return line.substring(colon + 1).trim();
      }
    }, {
      key: 'readTuple',
      value: function readTuple(tuple) {
        var line = this.readLine();
        var colon = line.indexOf(':');
        if (colon === -1) {
          throw new Error('Invalid line: ' + line);
        }
        var i = 0;
        var lastMatch = colon + 1;
        for (; i < 3; i++) {
          var comma = line.indexOf(',', lastMatch);
          if (comma === -1) break;
          tuple[i] = line.substr(lastMatch, comma - lastMatch).trim();
          lastMatch = comma + 1;
        }
        tuple[i] = line.substring(lastMatch).trim();
        return i + 1;
      }
    }]);
    return TextureAtlasReader;
  }();

  var JitterEffect = function () {
    function JitterEffect() {
      var jitterX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var jitterY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      classCallCheck(this, JitterEffect);
      this.jitterX = jitterX;
      this.jitterY = jitterY;
    }
    createClass(JitterEffect, [{
      key: 'begin',
      value: function begin(skeleton) {}
    }, {
      key: 'transform',
      value: function transform(position, uv, light, dark) {
        position.x += randomTriangular(-this.jitterX, this.jitterY);
        position.y += randomTriangular(-this.jitterX, this.jitterY);
      }
    }, {
      key: 'end',
      value: function end() {}
    }]);
    return JitterEffect;
  }();

  var SwirlEffect = function () {
    function SwirlEffect(radius) {
      classCallCheck(this, SwirlEffect);
      this.radius = radius;
      this.centerX = 0;
      this.centerY = 0;
      this.radius = 0;
      this.angle = 0;
      this.worldX = 0;
      this.worldY = 0;
    }
    createClass(SwirlEffect, [{
      key: 'begin',
      value: function begin(skeleton) {
        this.worldX = skeleton.x + this.centerX;
        this.worldY = skeleton.y + this.centerY;
      }
    }, {
      key: 'transform',
      value: function transform(position, uv, light, dark) {
        var radAngle = this.angle * degrees2Radians;
        var x = position.x - this.worldX;
        var y = position.y - this.worldY;
        var dist = Math.sqrt(x * x + y * y);
        if (dist < this.radius) {
          var theta = SwirlEffect.interpolation.apply(0, radAngle, (this.radius - dist) / this.radius);
          var cos = Math.cos(theta);
          var sin = Math.sin(theta);
          position.x = cos * x - sin * y + this.worldX;
          position.y = sin * x + cos * y + this.worldY;
        }
      }
    }, {
      key: 'end',
      value: function end() {}
    }]);
    return SwirlEffect;
  }();
  SwirlEffect.interpolation = new PowOut(2);

  function atlasParser() {
    var Resource = Tiny.loaders.Resource;
    return function atlasParser(resource, next) {
      if (!resource.data) {
        return next();
      }
      var isJSONSpineModel = isJSON(resource) && resource.data.bones;
      var isBinarySpineModel = isBuffer(resource) && (resource.extension === 'skel' || resource.metadata.spineMetadata);
      if (!isJSONSpineModel && !isBinarySpineModel) {
        return next();
      }
      var parser = null;
      var dataToParse = resource.data;
      if (isJSONSpineModel) {
        parser = new SkeletonJSON(null);
      } else {
        parser = new SkeletonBinary(null);
        if (resource.data instanceof ArrayBuffer) {
          dataToParse = new Uint8Array(resource.data);
        }
      }
      var metadata = resource.metadata || {};
      var metadataSkeletonScale = metadata ? resource.metadata.spineSkeletonScale : null;
      if (metadataSkeletonScale) {
        parser.scale = metadataSkeletonScale;
      }
      var metadataAtlas = metadata ? resource.metadata.spineAtlas : null;
      if (metadataAtlas === false) {
        return next();
      }
      if (metadataAtlas && metadataAtlas.pages) {
        parser.attachmentLoader = new AtlasAttachmentLoader(metadataAtlas);
        resource.spineData = parser.readSkeletonData(dataToParse);
        resource.spineAtlas = metadataAtlas;
        return next();
      }
      var metadataAtlasSuffix = metadata.spineAtlasSuffix || '.atlas';
      var atlasPath = resource.url;
      var queryStringPos = atlasPath.indexOf('?');
      if (queryStringPos > 0) {
        atlasPath = atlasPath.substr(0, queryStringPos);
      }
      atlasPath = atlasPath.substr(0, atlasPath.lastIndexOf('.')) + metadataAtlasSuffix;
      if (resource.metadata && resource.metadata.spineAtlasFile) {
        atlasPath = resource.metadata.spineAtlasFile;
      }
      atlasPath = atlasPath.replace(this.baseUrl, '');
      var atlasOptions = {
        crossOrigin: resource.crossOrigin,
        xhrType: Resource.XHR_RESPONSE_TYPE.TEXT,
        metadata: metadata.spineMetadata || null,
        parentResource: resource
      };
      var imageOptions = {
        crossOrigin: resource.crossOrigin,
        metadata: metadata.imageMetadata || null,
        parentResource: resource
      };
      var baseUrl = resource.url.substr(0, resource.url.lastIndexOf('/') + 1);
      baseUrl = baseUrl.replace(this.baseUrl, '');
      var namePrefix = metadata.imageNamePrefix || resource.name + '_atlas_page_';
      var adapter = metadata.images ? staticImageLoader(metadata.images) : metadata.image ? staticImageLoader({ 'default': metadata.image }) : metadata.imageLoader ? metadata.imageLoader(this, namePrefix, baseUrl, imageOptions) : imageLoaderAdapter(this, namePrefix, baseUrl, imageOptions);
      var createSkeletonWithRawAtlas = function createSkeletonWithRawAtlas(rawData) {
        return new TextureAtlas(rawData, adapter, function (spineAtlas) {
          if (spineAtlas) {
            parser.attachmentLoader = new AtlasAttachmentLoader(spineAtlas);
            resource.spineData = parser.readSkeletonData(dataToParse);
            resource.spineAtlas = spineAtlas;
          }
          next();
        });
      };
      if (resource.metadata && resource.metadata.atlasRawData) {
        createSkeletonWithRawAtlas(resource.metadata.atlasRawData);
      } else {
        this.add(resource.name + '_atlas', atlasPath, atlasOptions, function (atlasResource) {
          if (!atlasResource.error) {
            createSkeletonWithRawAtlas(atlasResource.data);
          } else {
            next();
          }
        });
      }
    };
  }
  function imageLoaderAdapter(loader, namePrefix, baseUrl, imageOptions) {
    if (baseUrl && baseUrl.lastIndexOf('/') !== baseUrl.length - 1) {
      baseUrl += '/';
    }
    return function (line, callback) {
      var name = namePrefix + line;
      var url = baseUrl + line;
      var cachedResource = loader.resources[name];
      function done() {
        callback(cachedResource.texture.baseTexture);
      }
      if (cachedResource) {
        if (cachedResource.texture) {
          done();
        } else {
          cachedResource.onAfterMiddleware.add(done);
        }
      } else {
        loader.add(name, url, imageOptions, function (resource) {
          if (!resource.error) {
            callback(resource.texture.baseTexture);
          } else {
            callback(null);
          }
        });
      }
    };
  }
  function staticImageLoader(pages) {
    return function (line, callback) {
      var page = pages[line] || pages['default'];
      if (page && page.baseTexture) {
        callback(page.baseTexture);
      } else {
        callback(page);
      }
    };
  }
  function isJSON(resource) {
    return resource.type === Tiny.loaders.Resource.TYPE.JSON;
  }
  function isBuffer(resource) {
    return resource.xhrType === Tiny.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER;
  }
  if (Tiny.loaders.Loader) {
    Tiny.loaders.Loader.addTinyMiddleware(atlasParser);
    Tiny.loaders.Resource.setExtensionXhrType('skel', Tiny.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER);
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var index_debug = createCommonjsModule(function (module, exports) {
  /*!
   * Name: tinyjs-plugin-mesh
   * Description: The Tiny.js plugin of mesh
   * Author: yiiqii
   * Version: v1.3.1
   */
  (function (global, factory) {
    factory(exports);
  }(commonjsGlobal, (function (exports) {  var classCallCheck = function (instance, Constructor) {
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
    var get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
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
    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };
    var tempPoint = new Tiny.Point();
    var tempPolygon = new Tiny.Polygon();
    var Mesh = function (_Tiny$Container) {
      inherits(Mesh, _Tiny$Container);
      function Mesh(texture, vertices, uvs, indices, drawMode) {
        classCallCheck(this, Mesh);
        var _this = possibleConstructorReturn(this, (Mesh.__proto__ || Object.getPrototypeOf(Mesh)).call(this));
        _this._texture = texture || Tiny.Texture.EMPTY;
        _this.uvs = uvs || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
        _this.vertices = vertices || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]);
        _this.indices = indices || new Uint16Array([0, 1, 3, 2]);
        _this.dirty = 0;
        _this.indexDirty = 0;
        _this.vertexDirty = 0;
        _this.autoUpdate = true;
        _this.blendMode = Tiny.BLEND_MODES.NORMAL;
        _this.canvasPadding = Mesh.defaults.canvasPadding;
        _this.drawMode = drawMode || Mesh.DRAW_MODES.TRIANGLE_MESH;
        _this.shader = null;
        _this.tintRgb = new Float32Array([1, 1, 1]);
        _this._glDatas = {};
        _this._uvTransform = new Tiny.TextureTransform(_this._texture);
        _this.uploadUvTransform = false;
        _this.pluginName = 'mesh';
        _this._canvasDrawTimes = 1;
        return _this;
      }
      createClass(Mesh, [{
        key: '_renderWebGL',
        value: function _renderWebGL(renderer) {
          this.refresh();
          renderer.setObjectRenderer(renderer.plugins[this.pluginName]);
          renderer.plugins[this.pluginName].render(this);
        }
      }, {
        key: '_renderCanvas',
        value: function _renderCanvas(renderer) {
          this.refresh();
          renderer.plugins[this.pluginName].render(this);
        }
      }, {
        key: '_onTextureUpdate',
        value: function _onTextureUpdate() {
          this._uvTransform.texture = this._texture;
          this.refresh();
        }
      }, {
        key: 'multiplyUvs',
        value: function multiplyUvs() {
          if (!this.uploadUvTransform) {
            this._uvTransform.multiplyUvs(this.uvs);
          }
        }
      }, {
        key: 'refresh',
        value: function refresh(forceUpdate) {
          if (this.autoUpdate) {
            this.vertexDirty++;
          }
          if (this._uvTransform.update(forceUpdate)) {
            this._refresh();
          }
        }
      }, {
        key: '_refresh',
        value: function _refresh() {}
      }, {
        key: '_calculateBounds',
        value: function _calculateBounds() {
          this._bounds.addVertices(this.transform, this.vertices, 0, this.vertices.length);
        }
      }, {
        key: 'containsPoint',
        value: function containsPoint(point) {
          if (!this.getBounds().contains(point.x, point.y)) {
            return false;
          }
          this.worldTransform.applyInverse(point, tempPoint);
          var vertices = this.vertices;
          var points = tempPolygon.points;
          var indices = this.indices;
          var len = this.indices.length;
          var step = this.drawMode === Mesh.DRAW_MODES.TRIANGLES ? 3 : 1;
          for (var i = 0; i + 2 < len; i += step) {
            var ind0 = indices[i] * 2;
            var ind1 = indices[i + 1] * 2;
            var ind2 = indices[i + 2] * 2;
            points[0] = vertices[ind0];
            points[1] = vertices[ind0 + 1];
            points[2] = vertices[ind1];
            points[3] = vertices[ind1 + 1];
            points[4] = vertices[ind2];
            points[5] = vertices[ind2 + 1];
            if (tempPolygon.contains(tempPoint.x, tempPoint.y)) {
              return true;
            }
          }
          return false;
        }
      }, {
        key: 'destroy',
        value: function destroy(options) {
          for (var id in this._glDatas) {
            var data = this._glDatas[id];
            if (data.destroy) {
              data.destroy();
            } else {
              if (data.vertexBuffer) {
                data.vertexBuffer.destroy();
                data.vertexBuffer = null;
              }
              if (data.indexBuffer) {
                data.indexBuffer.destroy();
                data.indexBuffer = null;
              }
              if (data.uvBuffer) {
                data.uvBuffer.destroy();
                data.uvBuffer = null;
              }
              if (data.vao) {
                data.vao.destroy();
                data.vao = null;
              }
            }
          }
          this._glDatas = null;
          get(Mesh.prototype.__proto__ || Object.getPrototypeOf(Mesh.prototype), 'destroy', this).call(this, options);
        }
      }, {
        key: 'texture',
        get: function get$$1() {
          return this._texture;
        },
        set: function set$$1(value) {
          if (this._texture === value) {
            return;
          }
          this._texture = value;
          if (value) {
            if (value.baseTexture.hasLoaded) {
              this._onTextureUpdate();
            } else {
              value.once('update', this._onTextureUpdate, this);
            }
          }
        }
      }, {
        key: 'tint',
        get: function get$$1() {
          return Tiny.rgb2hex(this.tintRgb);
        },
        set: function set$$1(value) {
          this.tintRgb = Tiny.hex2rgb(value, this.tintRgb);
        }
      }, {
        key: 'canvasDrawTimes',
        get: function get$$1() {
          return this._canvasDrawTimes || 1;
        },
        set: function set$$1(times) {
          this._canvasDrawTimes = times > 10 ? 10 : (times < 0 ? 1 : times | 0) || 1;
        }
      }]);
      return Mesh;
    }(Tiny.Container);
    Mesh.DRAW_MODES = {
      TRIANGLE_MESH: 0,
      TRIANGLES: 1
    };
    Mesh.defaults = {
      canvasPadding: 0
    };
    var glCore = Tiny.glCore;
    var matrixIdentity = Tiny.Matrix.IDENTITY;
    var MeshRenderer = function (_Tiny$ObjectRenderer) {
      inherits(MeshRenderer, _Tiny$ObjectRenderer);
      function MeshRenderer(renderer) {
        classCallCheck(this, MeshRenderer);
        var _this = possibleConstructorReturn(this, (MeshRenderer.__proto__ || Object.getPrototypeOf(MeshRenderer)).call(this, renderer));
        _this.shader = null;
        return _this;
      }
      createClass(MeshRenderer, [{
        key: 'onContextChange',
        value: function onContextChange() {
          var gl = this.renderer.gl;
          this.shader = new Tiny.Shader(gl, 'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}', 'varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void) {\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}');
        }
      }, {
        key: 'render',
        value: function render(mesh) {
          var renderer = this.renderer;
          var gl = renderer.gl;
          var texture = mesh._texture;
          if (!texture.valid) {
            return;
          }
          var glData = mesh._glDatas[renderer.CONTEXT_UID];
          if (!glData) {
            renderer.bindVao(null);
            glData = {
              shader: this.shader,
              vertexBuffer: glCore.GLBuffer.createVertexBuffer(gl, mesh.vertices, gl.STREAM_DRAW),
              uvBuffer: glCore.GLBuffer.createVertexBuffer(gl, mesh.uvs, gl.STREAM_DRAW),
              indexBuffer: glCore.GLBuffer.createIndexBuffer(gl, mesh.indices, gl.STATIC_DRAW),
              vao: null,
              dirty: mesh.dirty,
              indexDirty: mesh.indexDirty,
              vertexDirty: mesh.vertexDirty
            };
            glData.vao = new glCore.VertexArrayObject(gl).addIndex(glData.indexBuffer).addAttribute(glData.vertexBuffer, glData.shader.attributes.aVertexPosition, gl.FLOAT, false, 2 * 4, 0).addAttribute(glData.uvBuffer, glData.shader.attributes.aTextureCoord, gl.FLOAT, false, 2 * 4, 0);
            mesh._glDatas[renderer.CONTEXT_UID] = glData;
          }
          renderer.bindVao(glData.vao);
          if (mesh.dirty !== glData.dirty) {
            glData.dirty = mesh.dirty;
            glData.uvBuffer.upload(mesh.uvs);
          }
          if (mesh.indexDirty !== glData.indexDirty) {
            glData.indexDirty = mesh.indexDirty;
            glData.indexBuffer.upload(mesh.indices);
          }
          if (mesh.vertexDirty !== glData.vertexDirty) {
            glData.vertexDirty = mesh.vertexDirty;
            glData.vertexBuffer.upload(mesh.vertices);
          }
          renderer.bindShader(glData.shader);
          glData.shader.uniforms.uSampler = renderer.bindTexture(texture);
          renderer.state.setBlendMode(Tiny.correctBlendMode(mesh.blendMode, texture.baseTexture.premultipliedAlpha));
          if (glData.shader.uniforms.uTransform) {
            if (mesh.uploadUvTransform) {
              glData.shader.uniforms.uTransform = mesh._uvTransform.mapCoord.toArray(true);
            } else {
              glData.shader.uniforms.uTransform = matrixIdentity.toArray(true);
            }
          }
          glData.shader.uniforms.translationMatrix = mesh.worldTransform.toArray(true);
          glData.shader.uniforms.uColor = Tiny.premultiplyRgba(mesh.tintRgb, mesh.worldAlpha, glData.shader.uniforms.uColor, texture.baseTexture.premultipliedAlpha);
          var drawMode = mesh.drawMode === Mesh.DRAW_MODES.TRIANGLE_MESH ? gl.TRIANGLE_STRIP : gl.TRIANGLES;
          glData.vao.draw(drawMode, mesh.indices.length, 0);
        }
      }]);
      return MeshRenderer;
    }(Tiny.ObjectRenderer);
    Tiny.WebGLRenderer.registerPlugin('mesh', MeshRenderer);
    var MeshSpriteRenderer = function () {
      function MeshSpriteRenderer(renderer) {
        classCallCheck(this, MeshSpriteRenderer);
        this.renderer = renderer;
      }
      createClass(MeshSpriteRenderer, [{
        key: 'render',
        value: function render(mesh) {
          var renderer = this.renderer;
          var context = renderer.context;
          var transform = mesh.worldTransform;
          var res = renderer.resolution;
          if (renderer.roundPixels) {
            context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res | 0, transform.ty * res | 0);
          } else {
            context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res, transform.ty * res);
          }
          renderer.context.globalAlpha = mesh.worldAlpha;
          renderer.setBlendMode(mesh.blendMode);
          if (mesh.drawMode === Mesh.DRAW_MODES.TRIANGLE_MESH) {
            this._renderTriangleMesh(mesh);
          } else {
            this._renderTriangles(mesh);
          }
        }
      }, {
        key: '_renderTriangleMesh',
        value: function _renderTriangleMesh(mesh) {
          var length = mesh.vertices.length / 2;
          for (var i = 0; i < length - 2; i++) {
            var index = i * 2;
            this._renderDrawTriangle(mesh, index, index + 2, index + 4);
          }
        }
      }, {
        key: '_renderTriangles',
        value: function _renderTriangles(mesh) {
          var indices = mesh.indices;
          var length = indices.length;
          for (var i = 0; i < length; i += 3) {
            var index0 = indices[i] * 2;
            var index1 = indices[i + 1] * 2;
            var index2 = indices[i + 2] * 2;
            this._renderDrawTriangle(mesh, index0, index1, index2);
          }
        }
      }, {
        key: '_renderDrawTriangle',
        value: function _renderDrawTriangle(mesh, index0, index1, index2) {
          var context = this.renderer.context;
          var uvs = mesh.uvs;
          var vertices = mesh.vertices;
          var texture = mesh._texture;
          if (!texture.valid) {
            return;
          }
          var base = texture.baseTexture;
          var textureWidth = base.width;
          var textureHeight = base.height;
          var textureSource = base.source;
          var u0 = void 0;
          var u1 = void 0;
          var u2 = void 0;
          var v0 = void 0;
          var v1 = void 0;
          var v2 = void 0;
          if (mesh.uploadUvTransform) {
            var ut = mesh._uvTransform.mapCoord;
            u0 = (uvs[index0] * ut.a + uvs[index0 + 1] * ut.c + ut.tx) * base.width;
            u1 = (uvs[index1] * ut.a + uvs[index1 + 1] * ut.c + ut.tx) * base.width;
            u2 = (uvs[index2] * ut.a + uvs[index2 + 1] * ut.c + ut.tx) * base.width;
            v0 = (uvs[index0] * ut.b + uvs[index0 + 1] * ut.d + ut.ty) * base.height;
            v1 = (uvs[index1] * ut.b + uvs[index1 + 1] * ut.d + ut.ty) * base.height;
            v2 = (uvs[index2] * ut.b + uvs[index2 + 1] * ut.d + ut.ty) * base.height;
          } else {
            u0 = uvs[index0] * base.width;
            u1 = uvs[index1] * base.width;
            u2 = uvs[index2] * base.width;
            v0 = uvs[index0 + 1] * base.height;
            v1 = uvs[index1 + 1] * base.height;
            v2 = uvs[index2 + 1] * base.height;
          }
          var x0 = vertices[index0];
          var x1 = vertices[index1];
          var x2 = vertices[index2];
          var y0 = vertices[index0 + 1];
          var y1 = vertices[index1 + 1];
          var y2 = vertices[index2 + 1];
          var canvasPadding = mesh.canvasPadding / this.renderer.resolution;
          if (canvasPadding > 0) {
            var paddingX = canvasPadding / Math.abs(mesh.worldTransform.a);
            var paddingY = canvasPadding / Math.abs(mesh.worldTransform.d);
            var centerX = (x0 + x1 + x2) / 3;
            var centerY = (y0 + y1 + y2) / 3;
            var normX = x0 - centerX;
            var normY = y0 - centerY;
            var dist = Math.sqrt(normX * normX + normY * normY);
            x0 = centerX + normX / dist * (dist + paddingX);
            y0 = centerY + normY / dist * (dist + paddingY);
            normX = x1 - centerX;
            normY = y1 - centerY;
            dist = Math.sqrt(normX * normX + normY * normY);
            x1 = centerX + normX / dist * (dist + paddingX);
            y1 = centerY + normY / dist * (dist + paddingY);
            normX = x2 - centerX;
            normY = y2 - centerY;
            dist = Math.sqrt(normX * normX + normY * normY);
            x2 = centerX + normX / dist * (dist + paddingX);
            y2 = centerY + normY / dist * (dist + paddingY);
          }
          context.save();
          context.beginPath();
          context.moveTo(x0, y0);
          context.lineTo(x1, y1);
          context.lineTo(x2, y2);
          context.closePath();
          context.clip();
          var delta = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2;
          var deltaA = x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2;
          var deltaB = u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2;
          var deltaC = u0 * v1 * x2 + v0 * x1 * u2 + x0 * u1 * v2 - x0 * v1 * u2 - v0 * u1 * x2 - u0 * x1 * v2;
          var deltaD = y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2;
          var deltaE = u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2;
          var deltaF = u0 * v1 * y2 + v0 * y1 * u2 + y0 * u1 * v2 - y0 * v1 * u2 - v0 * u1 * y2 - u0 * y1 * v2;
          context.transform(deltaA / delta, deltaD / delta, deltaB / delta, deltaE / delta, deltaC / delta, deltaF / delta);
          if (window.navigator.isAppXCanvasPlus) {
            if (textureSource.tagName === 'IMAGE') {
              textureSource = window.navigator.canUseBinding ? textureSource.$realImage : textureSource.src;
            }
          }
          for (var i = mesh.canvasDrawTimes; i > 0; i--) {
            context.drawImage(textureSource, 0, 0, textureWidth * base.resolution, textureHeight * base.resolution, 0, 0, textureWidth, textureHeight);
          }
          context.restore();
          this.renderer.invalidateBlendMode();
        }
      }, {
        key: 'renderMeshFlat',
        value: function renderMeshFlat(mesh) {
          var context = this.renderer.context;
          var vertices = mesh.vertices;
          var length = vertices.length / 2;
          context.beginPath();
          for (var i = 1; i < length - 2; ++i) {
            var index = i * 2;
            var x0 = vertices[index];
            var y0 = vertices[index + 1];
            var x1 = vertices[index + 2];
            var y1 = vertices[index + 3];
            var x2 = vertices[index + 4];
            var y2 = vertices[index + 5];
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.lineTo(x2, y2);
          }
          context.fillStyle = '#FF0000';
          context.fill();
          context.closePath();
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.renderer = null;
        }
      }]);
      return MeshSpriteRenderer;
    }();
    Tiny.CanvasRenderer.registerPlugin('mesh', MeshSpriteRenderer);
    var Plane = function (_Mesh) {
      inherits(Plane, _Mesh);
      function Plane(texture, verticesX, verticesY) {
        classCallCheck(this, Plane);
        var _this = possibleConstructorReturn(this, (Plane.__proto__ || Object.getPrototypeOf(Plane)).call(this, texture));
        _this._ready = true;
        _this.verticesX = verticesX || 10;
        _this.verticesY = verticesY || 10;
        _this.drawMode = Mesh.DRAW_MODES.TRIANGLES;
        _this.refresh();
        return _this;
      }
      createClass(Plane, [{
        key: '_refresh',
        value: function _refresh() {
          var texture = this._texture;
          var total = this.verticesX * this.verticesY;
          var verts = [];
          var colors = [];
          var uvs = [];
          var indices = [];
          var segmentsX = this.verticesX - 1;
          var segmentsY = this.verticesY - 1;
          var sizeX = texture.width / segmentsX;
          var sizeY = texture.height / segmentsY;
          for (var i = 0; i < total; i++) {
            var x = i % this.verticesX;
            var y = i / this.verticesX | 0;
            verts.push(x * sizeX, y * sizeY);
            uvs.push(x / segmentsX, y / segmentsY);
          }
          var totalSub = segmentsX * segmentsY;
          for (var _i = 0; _i < totalSub; _i++) {
            var xpos = _i % segmentsX;
            var ypos = _i / segmentsX | 0;
            var value = ypos * this.verticesX + xpos;
            var value2 = ypos * this.verticesX + xpos + 1;
            var value3 = (ypos + 1) * this.verticesX + xpos;
            var value4 = (ypos + 1) * this.verticesX + xpos + 1;
            indices.push(value, value2, value3);
            indices.push(value2, value4, value3);
          }
          this.vertices = new Float32Array(verts);
          this.uvs = new Float32Array(uvs);
          this.colors = new Float32Array(colors);
          this.indices = new Uint16Array(indices);
          this.dirty++;
          this.indexDirty++;
          this.multiplyUvs();
        }
      }, {
        key: '_onTextureUpdate',
        value: function _onTextureUpdate() {
          Mesh.prototype._onTextureUpdate.call(this);
          if (this._ready) {
            this.refresh();
          }
        }
      }]);
      return Plane;
    }(Mesh);
    var DEFAULT_BORDER_SIZE = 10;
    var NineSlicePlane = function (_Plane) {
      inherits(NineSlicePlane, _Plane);
      function NineSlicePlane(texture, leftWidth, topHeight, rightWidth, bottomHeight) {
        classCallCheck(this, NineSlicePlane);
        var _this = possibleConstructorReturn(this, (NineSlicePlane.__proto__ || Object.getPrototypeOf(NineSlicePlane)).call(this, texture, 4, 4));
        _this._origWidth = texture.orig.width;
        _this._origHeight = texture.orig.height;
        _this._width = _this._origWidth;
        _this._height = _this._origHeight;
        _this._leftWidth = typeof leftWidth !== 'undefined' ? leftWidth : DEFAULT_BORDER_SIZE;
        _this._rightWidth = typeof rightWidth !== 'undefined' ? rightWidth : DEFAULT_BORDER_SIZE;
        _this._topHeight = typeof topHeight !== 'undefined' ? topHeight : DEFAULT_BORDER_SIZE;
        _this._bottomHeight = typeof bottomHeight !== 'undefined' ? bottomHeight : DEFAULT_BORDER_SIZE;
        _this._cachedTint = 0xFFFFFF;
        _this._tintedTexture = null;
        _this._canvasUvs = null;
        _this.refresh(true);
        return _this;
      }
      createClass(NineSlicePlane, [{
        key: 'updateHorizontalVertices',
        value: function updateHorizontalVertices() {
          var vertices = this.vertices;
          var h = this._topHeight + this._bottomHeight;
          var scale = this._height > h ? 1.0 : this._height / h;
          vertices[9] = vertices[11] = vertices[13] = vertices[15] = this._topHeight * scale;
          vertices[17] = vertices[19] = vertices[21] = vertices[23] = this._height - this._bottomHeight * scale;
          vertices[25] = vertices[27] = vertices[29] = vertices[31] = this._height;
        }
      }, {
        key: 'updateVerticalVertices',
        value: function updateVerticalVertices() {
          var vertices = this.vertices;
          var w = this._leftWidth + this._rightWidth;
          var scale = this._width > w ? 1.0 : this._width / w;
          vertices[2] = vertices[10] = vertices[18] = vertices[26] = this._leftWidth * scale;
          vertices[4] = vertices[12] = vertices[20] = vertices[28] = this._width - this._rightWidth * scale;
          vertices[6] = vertices[14] = vertices[22] = vertices[30] = this._width;
        }
      }, {
        key: '_renderCanvas',
        value: function _renderCanvas(renderer) {
          var context = renderer.context;
          var transform = this.worldTransform;
          var res = renderer.resolution;
          var isTinted = this.tint !== 0xFFFFFF;
          var texture = this._texture;
          if (isTinted) {
            if (this._cachedTint !== this.tint) {
              this._cachedTint = this.tint;
              this._tintedTexture = Tiny.CanvasTinter.getTintedTexture(this, this.tint);
            }
          }
          var textureSource = !isTinted ? texture.baseTexture.source : this._tintedTexture;
          if (window.navigator.isAppXCanvasPlus) {
            if (textureSource.tagName === 'IMAGE') {
              textureSource = window.navigator.canUseBinding ? textureSource.$realImage : textureSource.src;
            }
          }
          if (!this._canvasUvs) {
            this._canvasUvs = [0, 0, 0, 0, 0, 0, 0, 0];
          }
          var vertices = this.vertices;
          var uvs = this._canvasUvs;
          var u0 = isTinted ? 0 : texture.frame.x;
          var v0 = isTinted ? 0 : texture.frame.y;
          var u1 = u0 + texture.frame.width;
          var v1 = v0 + texture.frame.height;
          uvs[0] = u0;
          uvs[1] = u0 + this._leftWidth;
          uvs[2] = u1 - this._rightWidth;
          uvs[3] = u1;
          uvs[4] = v0;
          uvs[5] = v0 + this._topHeight;
          uvs[6] = v1 - this._bottomHeight;
          uvs[7] = v1;
          for (var i = 0; i < 8; i++) {
            uvs[i] *= texture.baseTexture.resolution;
          }
          context.globalAlpha = this.worldAlpha;
          renderer.setBlendMode(this.blendMode);
          if (renderer.roundPixels) {
            context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res | 0, transform.ty * res | 0);
          } else {
            context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res, transform.ty * res);
          }
          for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
              var ind = col * 2 + row * 8;
              var sw = Math.max(1, uvs[col + 1] - uvs[col]);
              var sh = Math.max(1, uvs[row + 5] - uvs[row + 4]);
              var dw = Math.max(1, vertices[ind + 10] - vertices[ind]);
              var dh = Math.max(1, vertices[ind + 11] - vertices[ind + 1]);
              context.drawImage(textureSource, uvs[col], uvs[row + 4], sw, sh, vertices[ind], vertices[ind + 1], dw, dh);
            }
          }
        }
      }, {
        key: '_refresh',
        value: function _refresh() {
          get(NineSlicePlane.prototype.__proto__ || Object.getPrototypeOf(NineSlicePlane.prototype), '_refresh', this).call(this);
          var uvs = this.uvs;
          var texture = this._texture;
          this._origWidth = texture.orig.width;
          this._origHeight = texture.orig.height;
          var _uvw = 1.0 / this._origWidth;
          var _uvh = 1.0 / this._origHeight;
          uvs[0] = uvs[8] = uvs[16] = uvs[24] = 0;
          uvs[1] = uvs[3] = uvs[5] = uvs[7] = 0;
          uvs[6] = uvs[14] = uvs[22] = uvs[30] = 1;
          uvs[25] = uvs[27] = uvs[29] = uvs[31] = 1;
          uvs[2] = uvs[10] = uvs[18] = uvs[26] = _uvw * this._leftWidth;
          uvs[4] = uvs[12] = uvs[20] = uvs[28] = 1 - _uvw * this._rightWidth;
          uvs[9] = uvs[11] = uvs[13] = uvs[15] = _uvh * this._topHeight;
          uvs[17] = uvs[19] = uvs[21] = uvs[23] = 1 - _uvh * this._bottomHeight;
          this.updateHorizontalVertices();
          this.updateVerticalVertices();
          this.dirty++;
          this.multiplyUvs();
        }
      }, {
        key: 'width',
        get: function get$$1() {
          return this._width;
        },
        set: function set$$1(value) {
          this._width = value;
          this._refresh();
        }
      }, {
        key: 'height',
        get: function get$$1() {
          return this._height;
        },
        set: function set$$1(value) {
          this._height = value;
          this._refresh();
        }
      }, {
        key: 'leftWidth',
        get: function get$$1() {
          return this._leftWidth;
        },
        set: function set$$1(value) {
          this._leftWidth = value;
          this._refresh();
        }
      }, {
        key: 'rightWidth',
        get: function get$$1() {
          return this._rightWidth;
        },
        set: function set$$1(value) {
          this._rightWidth = value;
          this._refresh();
        }
      }, {
        key: 'topHeight',
        get: function get$$1() {
          return this._topHeight;
        },
        set: function set$$1(value) {
          this._topHeight = value;
          this._refresh();
        }
      }, {
        key: 'bottomHeight',
        get: function get$$1() {
          return this._bottomHeight;
        },
        set: function set$$1(value) {
          this._bottomHeight = value;
          this._refresh();
        }
      }]);
      return NineSlicePlane;
    }(Plane);
    var Rope = function (_Mesh) {
      inherits(Rope, _Mesh);
      function Rope(texture, points) {
        classCallCheck(this, Rope);
        var _this = possibleConstructorReturn(this, (Rope.__proto__ || Object.getPrototypeOf(Rope)).call(this, texture));
        _this.points = points;
        _this.vertices = new Float32Array(points.length * 4);
        _this.uvs = new Float32Array(points.length * 4);
        _this.colors = new Float32Array(points.length * 2);
        _this.indices = new Uint16Array(points.length * 2);
        _this.autoUpdate = true;
        _this.refresh();
        return _this;
      }
      createClass(Rope, [{
        key: '_refresh',
        value: function _refresh() {
          var points = this.points;
          if (points.length < 1 || !this._texture._uvs) {
            return;
          }
          if (this.vertices.length / 4 !== points.length) {
            this.vertices = new Float32Array(points.length * 4);
            this.uvs = new Float32Array(points.length * 4);
            this.colors = new Float32Array(points.length * 2);
            this.indices = new Uint16Array(points.length * 2);
          }
          var uvs = this.uvs;
          var indices = this.indices;
          var colors = this.colors;
          uvs[0] = 0;
          uvs[1] = 0;
          uvs[2] = 0;
          uvs[3] = 1;
          colors[0] = 1;
          colors[1] = 1;
          indices[0] = 0;
          indices[1] = 1;
          var total = points.length;
          for (var i = 1; i < total; i++) {
            var index = i * 4;
            var amount = i / (total - 1);
            uvs[index] = amount;
            uvs[index + 1] = 0;
            uvs[index + 2] = amount;
            uvs[index + 3] = 1;
            index = i * 2;
            colors[index] = 1;
            colors[index + 1] = 1;
            index = i * 2;
            indices[index] = index;
            indices[index + 1] = index + 1;
          }
          this.dirty++;
          this.indexDirty++;
          this.multiplyUvs();
          this.refreshVertices();
        }
      }, {
        key: 'refreshVertices',
        value: function refreshVertices() {
          var points = this.points;
          if (points.length < 1) {
            return;
          }
          var lastPoint = points[0];
          var nextPoint = void 0;
          var perpX = 0;
          var perpY = 0;
          var vertices = this.vertices;
          var total = points.length;
          for (var i = 0; i < total; i++) {
            var point = points[i];
            var index = i * 4;
            if (i < points.length - 1) {
              nextPoint = points[i + 1];
            } else {
              nextPoint = point;
            }
            perpY = -(nextPoint.x - lastPoint.x);
            perpX = nextPoint.y - lastPoint.y;
            var perpLength = Math.sqrt(perpX * perpX + perpY * perpY);
            var num = this._texture.height / 2;
            perpX /= perpLength;
            perpY /= perpLength;
            perpX *= num;
            perpY *= num;
            vertices[index] = point.x + perpX;
            vertices[index + 1] = point.y + perpY;
            vertices[index + 2] = point.x - perpX;
            vertices[index + 3] = point.y - perpY;
            lastPoint = point;
          }
        }
      }, {
        key: 'updateTransform',
        value: function updateTransform() {
          if (this.autoUpdate) {
            this.refreshVertices();
          }
          this.containerUpdateTransform();
        }
      }]);
      return Rope;
    }(Mesh);
    /**
     * Mesh - The TinyJS plugin
     *
     * Copy to https://github.com/pixijs/pixi.js/tree/v4.8.9/src/mesh
     * Some code (c) 2013-2017 Mathew Groves, Chad Engler and other contributors.
     * See https://github.com/pixijs/pixi.js/graphs/contributors for the full list of contributors.
     *
     * @name        tinyjs-plugin-mesh
     * @overview    The Tiny.js plugin of mesh
     * @author      yiiqii
     * @license     MIT
     */
    exports.Mesh = Mesh;
    exports.MeshRenderer = MeshRenderer;
    exports.CanvasMeshRenderer = MeshSpriteRenderer;
    exports.Plane = Plane;
    exports.NineSlicePlane = NineSlicePlane;
    exports.Rope = Rope;
    Object.defineProperty(exports, '__esModule', { value: true });
  })));
  });
  var mesh = unwrapExports(index_debug);

  Bone.yDown = true;
  var tempRgb = [0, 0, 0];
  var SpineSprite = function (_Tiny$Sprite) {
    inherits(SpineSprite, _Tiny$Sprite);
    function SpineSprite(texture) {
      classCallCheck(this, SpineSprite);
      var _this = possibleConstructorReturn(this, (SpineSprite.__proto__ || Object.getPrototypeOf(SpineSprite)).call(this, texture));
      _this.region = null;
      return _this;
    }
    return SpineSprite;
  }(Tiny.Sprite);
  var SpineMesh = function (_mesh$Mesh) {
    inherits(SpineMesh, _mesh$Mesh);
    function SpineMesh(texture, vertices, uvs, indices, drawMode) {
      classCallCheck(this, SpineMesh);
      return possibleConstructorReturn(this, (SpineMesh.__proto__ || Object.getPrototypeOf(SpineMesh)).call(this, texture, vertices, uvs, indices, drawMode));
    }
    return SpineMesh;
  }(mesh.Mesh);
  var Spine = function (_Tiny$Container) {
    inherits(Spine, _Tiny$Container);
    function Spine(spineData) {
      classCallCheck(this, Spine);
      var _this3 = possibleConstructorReturn(this, (Spine.__proto__ || Object.getPrototypeOf(Spine)).call(this));
      if (!spineData) {
        throw new Error('The spineData param is required.');
      }
      if (typeof spineData === 'string') {
        throw new Error('spineData param cant be string. Please use spine.Spine.fromAtlas("YOUR_RESOURCE_NAME") from now on.');
      }
      _this3.spineData = spineData;
      _this3.skeleton = new Skeleton(spineData);
      _this3.skeleton.updateWorldTransform();
      _this3.stateData = new AnimationStateData(spineData);
      _this3.state = new AnimationState(_this3.stateData);
      _this3.slotContainers = [];
      _this3.tempClipContainers = [];
      for (var i = 0, n = _this3.skeleton.slots.length; i < n; i++) {
        var slot = _this3.skeleton.slots[i];
        var attachment = slot.getAttachment();
        var slotContainer = _this3.newContainer();
        slotContainer.name = slot.data.name;
        _this3.slotContainers.push(slotContainer);
        _this3.addChild(slotContainer);
        _this3.tempClipContainers.push(null);
        if (attachment instanceof RegionAttachment) {
          var spriteName = attachment.region.name;
          var sprite = _this3.createSprite(slot, attachment, spriteName);
          slot.currentSprite = sprite;
          slot.currentSpriteName = spriteName;
          slotContainer.addChild(sprite);
        } else if (attachment instanceof MeshAttachment) {
          var _mesh = _this3.createMesh(slot, attachment);
          slot.currentMesh = _mesh;
          slot.currentMeshName = attachment.name;
          slotContainer.addChild(_mesh);
        } else if (attachment instanceof ClippingAttachment) {
          _this3.createGraphics(slot, attachment);
          slotContainer.addChild(slot.clippingContainer);
          slotContainer.addChild(slot.currentGraphics);
        } else {
          continue;
        }
      }
      _this3.autoUpdate = true;
      _this3.tintRgb = new Float32Array([1, 1, 1]);
      return _this3;
    }
    createClass(Spine, [{
      key: 'update',
      value: function update(dt) {
        var delayLimit = this.delayLimit;
        if (dt > delayLimit) {
          dt = delayLimit;
        }
        this.state.update(dt);
        this.state.apply(this.skeleton);
        if (!this.skeleton) {
          return;
        }
        this.skeleton.updateWorldTransform();
        var slots = this.skeleton.slots;
        var globalClr = this.color;
        var light = null;
        var dark = null;
        if (globalClr) {
          light = globalClr.light;
          dark = globalClr.dark;
        } else {
          light = this.tintRgb;
        }
        var thack = Tiny.TransformBase && this.transformHack() === 1;
        for (var i = 0, n = slots.length; i < n; i++) {
          var slot = slots[i];
          var attachment = slot.getAttachment();
          var slotContainer = this.slotContainers[i];
          if (!attachment) {
            slotContainer.visible = false;
            continue;
          }
          var spriteColor = null;
          var attColor = attachment.color;
          if (attachment instanceof RegionAttachment) {
            var region = attachment.region;
            if (region) {
              if (slot.currentMesh) {
                slot.currentMesh.visible = false;
                slot.currentMesh = null;
                slot.currentMeshName = undefined;
              }
              var ar = region;
              if (!slot.currentSpriteName || slot.currentSpriteName !== ar.name) {
                var spriteName = ar.name;
                if (slot.currentSprite) {
                  slot.currentSprite.visible = false;
                }
                slot.sprites = slot.sprites || {};
                if (slot.sprites[spriteName] !== undefined) {
                  slot.sprites[spriteName].visible = true;
                } else {
                  var sprite = this.createSprite(slot, attachment, spriteName);
                  slotContainer.addChild(sprite);
                }
                slot.currentSprite = slot.sprites[spriteName];
                slot.currentSpriteName = spriteName;
              }
            }
            if (slotContainer.transform) {
              var transform = slotContainer.transform;
              var transAny = transform;
              var lt = null;
              if (transAny.matrix2d) {
                lt = transAny.matrix2d;
                transAny._dirtyVersion++;
                transAny.version = transAny._dirtyVersion;
                transAny.isStatic = true;
                transAny.operMode = 0;
              } else {
                if (thack) {
                  if (transAny.position) {
                    transform = new Tiny.TransformBase();
                    transform._parentID = -1;
                    transform._worldID = slotContainer.transform._worldID;
                    slotContainer.transform = transform;
                  }
                  lt = transform.localTransform;
                } else {
                  transAny.setFromMatrix(slot.bone.matrix);
                }
              }
              if (lt) {
                slot.bone.matrix.copy(lt);
              }
            }
            if (slot.currentSprite.color) {
              spriteColor = slot.currentSprite.color;
            } else {
              tempRgb[0] = light[0] * slot.color.r * attColor.r;
              tempRgb[1] = light[1] * slot.color.g * attColor.g;
              tempRgb[2] = light[2] * slot.color.b * attColor.b;
              slot.currentSprite.tint = Tiny.rgb2hex(tempRgb);
            }
            slot.currentSprite.blendMode = slot.blendMode;
          } else if (attachment instanceof MeshAttachment) {
            if (slot.currentSprite) {
              slot.currentSprite.visible = false;
              slot.currentSprite = null;
              slot.currentSpriteName = undefined;
              if (slotContainer.transform) {
                var _transform = new Tiny.TransformStatic();
                _transform._parentID = -1;
                _transform._worldID = slotContainer.transform._worldID;
                slotContainer.transform = _transform;
              } else {
                slotContainer.localTransform = new Tiny.Matrix();
                slotContainer.displayObjectUpdateTransform = Tiny.DisplayObject.prototype.updateTransform;
              }
            }
            if (!slot.currentMeshName || slot.currentMeshName !== attachment.name) {
              var meshName = attachment.name;
              if (slot.currentMesh) {
                slot.currentMesh.visible = false;
              }
              slot.meshes = slot.meshes || {};
              if (slot.meshes[meshName] !== undefined) {
                slot.meshes[meshName].visible = true;
              } else {
                var _mesh2 = this.createMesh(slot, attachment);
                slotContainer.addChild(_mesh2);
              }
              slot.currentMesh = slot.meshes[meshName];
              slot.currentMeshName = meshName;
            }
            attachment.computeWorldVerticesOld(slot, slot.currentMesh.vertices);
            if (slot.currentMesh.color) {
              spriteColor = slot.currentMesh.color;
            }
            var tintRgb = slot.currentMesh.tintRgb;
            tintRgb[0] = light[0] * slot.color.r * attColor.r;
            tintRgb[1] = light[1] * slot.color.g * attColor.g;
            tintRgb[2] = light[2] * slot.color.b * attColor.b;
            slot.currentMesh.blendMode = slot.blendMode;
          } else if (attachment instanceof ClippingAttachment) {
            if (!slot.currentGraphics) {
              this.createGraphics(slot, attachment);
              slotContainer.addChild(slot.clippingContainer);
              slotContainer.addChild(slot.currentGraphics);
            }
            this.updateGraphics(slot, attachment);
          } else {
            slotContainer.visible = false;
            continue;
          }
          slotContainer.visible = true;
          if (spriteColor) {
            var r0 = slot.color.r * attColor.r;
            var g0 = slot.color.g * attColor.g;
            var b0 = slot.color.b * attColor.b;
            spriteColor.setLight(light[0] * r0 + dark[0] * (1.0 - r0), light[1] * g0 + dark[1] * (1.0 - g0), light[2] * b0 + dark[2] * (1.0 - b0));
            if (slot.darkColor) {
              r0 = slot.darkColor.r;
              g0 = slot.darkColor.g;
              b0 = slot.darkColor.b;
            } else {
              r0 = 0.0;
              g0 = 0.0;
              b0 = 0.0;
            }
            spriteColor.setDark(light[0] * r0 + dark[0] * (1 - r0), light[1] * g0 + dark[1] * (1 - g0), light[2] * b0 + dark[2] * (1 - b0));
          }
          slotContainer.alpha = slot.color.a;
        }
        var drawOrder = this.skeleton.drawOrder;
        var clippingAttachment = null;
        var clippingContainer = null;
        for (var _i = 0, _n = drawOrder.length; _i < _n; _i++) {
          var _slot = slots[drawOrder[_i].data.index];
          var _slotContainer = this.slotContainers[drawOrder[_i].data.index];
          if (!clippingContainer) {
            if (_slotContainer.parent !== null && _slotContainer.parent !== this) {
              _slotContainer.parent.removeChild(_slotContainer);
              _slotContainer.parent = this;
            }
          }
          if (_slot.currentGraphics && _slot.getAttachment()) {
            clippingContainer = _slot.clippingContainer;
            clippingAttachment = _slot.getAttachment();
            clippingContainer.children.length = 0;
            this.children[_i] = _slotContainer;
            if (clippingAttachment.endSlot === _slot.data) {
              clippingAttachment.endSlot = null;
            }
          } else {
            if (clippingContainer) {
              var c = this.tempClipContainers[_i];
              if (!c) {
                c = this.tempClipContainers[_i] = this.newContainer();
                c.visible = false;
              }
              this.children[_i] = c;
              _slotContainer.parent = null;
              clippingContainer.addChild(_slotContainer);
              if (clippingAttachment.endSlot === _slot.data) {
                clippingContainer.renderable = true;
                clippingContainer = null;
                clippingAttachment = null;
              }
            } else {
              this.children[_i] = _slotContainer;
            }
          }
        }
      }
    }, {
      key: 'setSpriteRegion',
      value: function setSpriteRegion(attachment, sprite, region) {
        sprite.region = region;
        sprite.texture = region.texture;
        if (!region.size) {
          sprite.scale.x = attachment.scaleX * attachment.width / region.originalWidth;
          sprite.scale.y = -attachment.scaleY * attachment.height / region.originalHeight;
        } else {
          sprite.scale.x = region.size.width / region.originalWidth;
          sprite.scale.y = -region.size.height / region.originalHeight;
        }
      }
    }, {
      key: 'setMeshRegion',
      value: function setMeshRegion(attachment, mesh$$1, region) {
        mesh$$1.region = region;
        mesh$$1.texture = region.texture;
        region.texture._updateUvs();
        attachment.updateUVs(region, mesh$$1.uvs);
        mesh$$1.dirty++;
      }
    }, {
      key: 'autoUpdateTransform',
      value: function autoUpdateTransform() {
        if (Spine.globalAutoUpdate) {
          this.lastTime = this.lastTime || Date.now();
          var timeDelta = (Date.now() - this.lastTime) * 0.001;
          this.lastTime = Date.now();
          this.update(timeDelta);
        } else {
          this.lastTime = 0;
        }
        this.containerUpdateTransform();
      }
    }, {
      key: 'createSprite',
      value: function createSprite(slot, attachment, defName) {
        var region = attachment.region;
        if (slot.hackAttachment === attachment) {
          region = slot.hackRegion;
        }
        var texture = region.texture;
        var sprite = this.newSprite(texture);
        sprite.rotation = attachment.rotation * degRad;
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        sprite.position.x = attachment.x;
        sprite.position.y = attachment.y;
        sprite.alpha = attachment.color.a;
        sprite.name = defName;
        sprite.region = attachment.region;
        this.setSpriteRegion(attachment, sprite, attachment.region);
        slot.sprites = slot.sprites || {};
        slot.sprites[defName] = sprite;
        return sprite;
      }
    }, {
      key: 'createMesh',
      value: function createMesh(slot, attachment) {
        var region = attachment.region;
        if (slot.hackAttachment === attachment) {
          region = slot.hackRegion;
          slot.hackAttachment = null;
          slot.hackRegion = null;
        }
        var strip = this.newMesh(region.texture, new Float32Array(attachment.regionUVs.length), new Float32Array(attachment.regionUVs.length), new Uint16Array(attachment.triangles), mesh.Mesh.DRAW_MODES.TRIANGLES);
        strip.canvasPadding = 1.5;
        strip.alpha = attachment.color.a;
        strip.region = attachment.region;
        strip.name = attachment.name;
        this.setMeshRegion(attachment, strip, region);
        slot.meshes = slot.meshes || {};
        slot.meshes[attachment.name] = strip;
        return strip;
      }
    }, {
      key: 'createGraphics',
      value: function createGraphics(slot, clip) {
        var graphics = this.newGraphics();
        var poly = new Tiny.Polygon([]);
        graphics.clear();
        graphics.beginFill(0xffffff, 1);
        graphics.drawPolygon(poly);
        graphics.renderable = false;
        slot.currentGraphics = graphics;
        slot.clippingContainer = this.newContainer();
        slot.clippingContainer.mask = slot.currentGraphics;
        return graphics;
      }
    }, {
      key: 'updateGraphics',
      value: function updateGraphics(slot, clip) {
        var vertices = slot.currentGraphics.graphicsData[0].shape.points;
        var n = clip.worldVerticesLength;
        vertices.length = n;
        clip.computeWorldVertices(slot, 0, n, vertices, 0, 2);
        slot.currentGraphics.dirty++;
        slot.currentGraphics.clearDirty++;
      }
    }, {
      key: 'hackTextureBySlotIndex',
      value: function hackTextureBySlotIndex(slotIndex) {
        var texture = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var slot = this.skeleton.slots[slotIndex];
        if (!slot) {
          return false;
        }
        var attachment = slot.getAttachment();
        var region = attachment.region;
        if (texture) {
          region = new TextureRegion();
          region.texture = texture;
          region.size = size;
          slot.hackRegion = region;
          slot.hackAttachment = attachment;
        } else {
          slot.hackRegion = null;
          slot.hackAttachment = null;
        }
        if (slot.currentSprite && slot.currentSprite.region !== region) {
          this.setSpriteRegion(attachment, slot.currentSprite, region);
          slot.currentSprite.region = region;
        } else if (slot.currentMesh && slot.currentMesh.region !== region) {
          this.setMeshRegion(attachment, slot.currentMesh, region);
        }
        return true;
      }
    }, {
      key: 'hackTextureBySlotName',
      value: function hackTextureBySlotName(slotName) {
        var texture = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
        var size = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
        var index = this.skeleton.findSlotIndex(slotName);
        if (index === -1) {
          return false;
        }
        return this.hackTextureBySlotIndex(index, texture, size);
      }
    }, {
      key: 'newContainer',
      value: function newContainer() {
        return new Tiny.Container();
      }
    }, {
      key: 'newSprite',
      value: function newSprite(tex) {
        return new SpineSprite(tex);
      }
    }, {
      key: 'newGraphics',
      value: function newGraphics() {
        return new Tiny.Graphics();
      }
    }, {
      key: 'newMesh',
      value: function newMesh(texture, vertices, uvs, indices, drawMode) {
        return new SpineMesh(texture, vertices, uvs, indices, drawMode);
      }
    }, {
      key: 'transformHack',
      value: function transformHack() {
        return 1;
      }
    }, {
      key: 'hackAttachmentGroups',
      value: function hackAttachmentGroups(nameSuffix, group, outGroup) {
        if (!nameSuffix) {
          return;
        }
        var listd = [];
        var listn = [];
        for (var i = 0, len = this.skeleton.slots.length; i < len; i++) {
          var slot = this.skeleton.slots[i];
          var name = slot.currentSpriteName || slot.currentMeshName || '';
          var target = slot.currentSprite || slot.currentMesh;
          if (name.endsWith(nameSuffix)) {
            target.parentGroup = group;
            listn.push(target);
          } else if (outGroup && target) {
            target.parentGroup = outGroup;
            listd.push(target);
          }
        }
        return [listd, listn];
      }
    }, {
      key: 'destroy',
      value: function destroy(options) {
        for (var i = 0, n = this.skeleton.slots.length; i < n; i++) {
          var slot = this.skeleton.slots[i];
          for (var name in slot.meshes) {
            slot.meshes[name].destroy(options);
          }
          slot.meshes = null;
          for (var _name in slot.sprites) {
            slot.sprites[_name].destroy(options);
          }
          slot.sprites = null;
        }
        for (var _i2 = 0, _n2 = this.slotContainers.length; _i2 < _n2; _i2++) {
          this.slotContainers[_i2].destroy(options);
        }
        this.spineData = null;
        this.skeleton = null;
        this.slotContainers = null;
        this.stateData = null;
        this.state = null;
        this.tempClipContainers = null;
        get(Spine.prototype.__proto__ || Object.getPrototypeOf(Spine.prototype), 'destroy', this).call(this, options);
      }
    }, {
      key: 'autoUpdate',
      get: function get$$1() {
        return this.updateTransform === Spine.prototype.autoUpdateTransform;
      },
      set: function set$$1(value) {
        this.updateTransform = value ? Spine.prototype.autoUpdateTransform : Tiny.Container.prototype.updateTransform;
      }
    }, {
      key: 'visible',
      get: function get$$1() {
        return this._visible;
      },
      set: function set$$1(value) {
        if (value !== this._visible) {
          this._visible = value;
          if (value) {
            this.lastTime = 0;
          }
        }
      }
    }, {
      key: 'tint',
      get: function get$$1() {
        return Tiny.rgb2hex(this.tintRgb);
      },
      set: function set$$1(value) {
        this.tintRgb = Tiny.hex2rgb(value, this.tintRgb);
      }
    }, {
      key: 'delayLimit',
      get: function get$$1() {
        var limit = typeof this.localDelayLimit !== 'undefined' ? this.localDelayLimit : Spine.globalDelayLimit;
        return limit || Number.MAX_VALUE;
      }
    }]);
    return Spine;
  }(Tiny.Container);
  Spine.globalAutoUpdate = true;
  Spine.globalDelayLimit = 0;
  Spine.clippingPolygon = [];

  var COLOR_GRAY = Tiny.rgb2hex([192 / 255, 192 / 255, 192 / 255]);
  var COLOR_CONTROL_BONES = Tiny.rgb2hex([0.8, 0, 0]);
  var COLOR_BONE_LINE = Tiny.rgb2hex([1, 0, 0]);
  var COLOR_BONE_ORIGIN = Tiny.rgb2hex([0, 1, 0]);
  var COLOR_TRIANGLE_LINE = Tiny.rgb2hex([1, 0.64, 0]);
  var COLOR_ATTACHMENT_LINE = Tiny.rgb2hex([0, 0, 1]);
  var COLOR_PATH = 0xff7f00;
  var COLOR_CLIP_LINE = Tiny.rgb2hex([0.8, 0, 0]);
  var Debugger = function () {
    function Debugger(spine) {
      var _this = this;
      var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, Debugger);
      this.controlBones = opt.controlBones || [];
      this.drawBones = opt.drawBones || false;
      this.drawSkeletonXY = opt.drawSkeletonXY || false;
      this.drawPaths = opt.drawPaths || false;
      this.drawMeshHull = opt.drawMeshHull || false;
      this.drawMeshTriangles = opt.drawMeshTriangles || false;
      this.drawRegionAttachments = opt.drawRegionAttachments || false;
      this.drawClipping = opt.drawClipping || false;
      this.skeleton = spine.skeleton;
      this.container = new Tiny.Container();
      this.controlBonesContainer = new Tiny.Container();
      this.temp = [];
      this.vertices = newFloatArray(2 * 1024);
      if (this.controlBones.length) {
        this.controlBones.forEach(function (name) {
          var g = new Tiny.Graphics();
          g.name = name + '-graphics';
          _this.controlBonesContainer.addChild(g);
        });
      }
      if (this.drawBones) {
        this.bonesGraphics = new Tiny.Graphics();
        this.container.addChild(this.bonesGraphics);
      }
      if (this.drawPaths) {
        this.pathsGraphics = new Tiny.Graphics();
        this.container.addChild(this.pathsGraphics);
      }
      if (this.drawMeshHull || this.drawMeshTriangles) {
        this.meshsGraphics = new Tiny.Graphics();
        this.container.addChild(this.meshsGraphics);
      }
      if (this.drawRegionAttachments) {
        this.regionAttachmentsGraphics = new Tiny.Graphics();
        this.container.addChild(this.regionAttachmentsGraphics);
      }
      if (this.drawClipping) {
        this.clippingGraphics = new Tiny.Graphics();
        this.container.addChild(this.clippingGraphics);
      }
      spine.addChild(this.container);
      spine.addChild(this.controlBonesContainer);
      var self = this;
      this.container.updateTransform = function () {
        self.drawBones && self._drawBones(self.controlBones);
        self.drawPaths && self._drawPaths();
        (self.drawMeshHull || self.drawMeshTriangles) && self._drawMeshs();
        self.drawRegionAttachments && self._drawRegionAttachments();
        self.drawClipping && self._drawClipping();
        self.controlBones.length && self._drawControlBones(self.controlBones);
        this.containerUpdateTransform();
      };
    }
    createClass(Debugger, [{
      key: '_drawControlBones',
      value: function _drawControlBones(bones) {
        var skeleton = this.skeleton,
            controlBonesContainer = this.controlBonesContainer;
        var skeletonX = skeleton.x,
            skeletonY = skeleton.y;
        bones.forEach(function (name) {
          var g = controlBonesContainer.getChildByName(name + '-graphics');
          var bone = skeleton.findBone(name);
          var worldX = bone.worldX,
              worldY = bone.worldY;
          g.clear();
          g.lineStyle(1, COLOR_CONTROL_BONES, 0.8);
          g.beginFill(COLOR_CONTROL_BONES, 0.5);
          g.drawCircle(skeletonX + worldX, skeletonY + worldY, 10);
          g.endFill();
        });
      }
    }, {
      key: '_drawBones',
      value: function _drawBones(ignoredBones) {
        var g = this.bonesGraphics,
            skeleton = this.skeleton;
        var skeletonX = skeleton.x,
            skeletonY = skeleton.y,
            bones = skeleton.bones;
        var ponits = [];
        for (var i = 0, n = bones.length; i < n; i++) {
          var bone = bones[i];
          var worldX = bone.worldX,
              worldY = bone.worldY;
          if (ignoredBones && ignoredBones.indexOf(bone.data.name) > -1) {
            continue;
          }
          if (bone.parent == null) {
            continue;
          }
          var dx = skeletonX + bone.data.length * bone.matrix.a + worldX;
          var dy = skeletonY + bone.data.length * bone.matrix.b + worldY;
          ponits.push([skeletonX + worldX, skeletonY + worldY, dx, dy]);
        }
        g.clear();
        g.lineStyle(1, COLOR_BONE_LINE, 1);
        ponits.forEach(function (_ref, i) {
          var _ref2 = slicedToArray(_ref, 4),
              x = _ref2[0],
              y = _ref2[1],
              dx = _ref2[2],
              dy = _ref2[3];
          g.moveTo(x, y);
          g.lineTo(dx, dy);
        });
        g.beginFill(COLOR_BONE_ORIGIN, 1);
        g.lineStyle(0);
        ponits.forEach(function (_ref3) {
          var _ref4 = slicedToArray(_ref3, 2),
              x = _ref4[0],
              y = _ref4[1];
          g.drawCircle(x, y, 2);
        });
        if (this.drawSkeletonXY) {
          g.beginFill(COLOR_BONE_LINE);
          g.drawStar(skeletonX, skeletonY, 4, 1, 5);
        }
        g.endFill();
      }
    }, {
      key: '_drawPaths',
      value: function _drawPaths() {
        var g = this.pathsGraphics,
            skeleton = this.skeleton;
        var slots = skeleton.slots;
        g.clear();
        g.moveTo(0, 0);
        for (var i = 0, n = slots.length; i < n; i++) {
          var slot = slots[i];
          if (!slot.bone.active) {
            continue;
          }
          var attachment = slot.getAttachment();
          if (!(attachment instanceof PathAttachment)) {
            continue;
          }
          var path = attachment;
          var nn = path.worldVerticesLength;
          var world = this.temp = setArraySize(this.temp, nn, 0);
          path.computeWorldVertices(slot, 0, nn, world, 0, 2);
          var x1 = world[2];
          var y1 = world[3];
          var x2 = 0;
          var y2 = 0;
          if (path.closed) {
            var cx1 = world[0];
            var cy1 = world[1];
            var cx2 = world[nn - 2];
            var cy2 = world[nn - 1];
            x2 = world[nn - 4];
            y2 = world[nn - 3];
            g.lineStyle(1, COLOR_PATH, 1);
            g.moveTo(x1, y1);
            g.bezierCurveTo(cx1, cy1, cx2, cy2, x2, y2);
            g.lineStyle(1, COLOR_GRAY, 1);
            g.moveTo(x1, y1);
            g.lineTo(cx1, cy1);
            g.moveTo(x2, y2);
            g.lineTo(cx2, cy2);
            g.moveTo(x2, y2);
          }
          nn -= 4;
          for (var ii = 4; ii < nn; ii += 6) {
            var _cx = world[ii];
            var _cy = world[ii + 1];
            var _cx2 = world[ii + 2];
            var _cy2 = world[ii + 3];
            x2 = world[ii + 4];
            y2 = world[ii + 5];
            g.lineStyle(1, COLOR_PATH, 1);
            g.moveTo(x1, y1);
            g.bezierCurveTo(_cx, _cy, _cx2, _cy2, x2, y2);
            g.lineStyle(1, COLOR_GRAY, 1);
            g.moveTo(x1, y1);
            g.lineTo(_cx, _cy);
            g.moveTo(x2, y2);
            g.lineTo(_cx2, _cy2);
            g.moveTo(x2, y2);
            x1 = x2;
            y1 = y2;
          }
        }
      }
    }, {
      key: '_drawMeshs',
      value: function _drawMeshs() {
        var g = this.meshsGraphics,
            skeleton = this.skeleton;
        var slots = skeleton.slots;
        g.clear();
        for (var i = 0, n = slots.length; i < n; i++) {
          var slot = slots[i];
          if (!slot.bone.active) {
            continue;
          }
          var attachment = slot.getAttachment();
          if (!(attachment instanceof MeshAttachment)) {
            continue;
          }
          var mesh = attachment;
          var vertices = this.vertices;
          mesh.computeWorldVertices(slot, 0, mesh.worldVerticesLength, vertices, 0, 2);
          var triangles = mesh.triangles,
              hullLength = mesh.hullLength;
          if (this.drawMeshTriangles) {
            g.lineStyle(1, COLOR_TRIANGLE_LINE, 0.5);
            for (var ii = 0, nn = triangles.length; ii < nn; ii += 3) {
              var v1 = triangles[ii] * 2;
              var v2 = triangles[ii + 1] * 2;
              var v3 = triangles[ii + 2] * 2;
              g.moveTo(vertices[v1], vertices[v1 + 1]);
              g.lineTo(vertices[v2], vertices[v2 + 1]);
              g.lineTo(vertices[v3], vertices[v3 + 1]);
            }
          }
          if (this.drawMeshHull && hullLength > 0) {
            hullLength = (hullLength >> 1) * 2;
            var lastX = vertices[hullLength - 2];
            var lastY = vertices[hullLength - 1];
            g.lineStyle(1, COLOR_ATTACHMENT_LINE, 0.5);
            for (var _ii = 0, _nn = hullLength; _ii < _nn; _ii += 2) {
              var x = vertices[_ii];
              var y = vertices[_ii + 1];
              g.moveTo(x, y);
              g.lineTo(lastX, lastY);
              lastX = x;
              lastY = y;
            }
          }
        }
      }
    }, {
      key: '_drawRegionAttachments',
      value: function _drawRegionAttachments() {
        var g = this.regionAttachmentsGraphics,
            skeleton = this.skeleton;
        var slots = skeleton.slots;
        g.clear();
        g.lineStyle(1, COLOR_ATTACHMENT_LINE, 0.5);
        for (var i = 0, n = slots.length; i < n; i++) {
          var slot = slots[i];
          var attachment = slot.getAttachment();
          if (attachment instanceof RegionAttachment) {
            var regionAttachment = attachment;
            var vertices = this.vertices;
            regionAttachment.computeWorldVertices(slot.bone, vertices, 0, 2);
            g.moveTo(vertices[0], vertices[1]);
            g.lineTo(vertices[2], vertices[3]);
            g.lineTo(vertices[4], vertices[5]);
            g.lineTo(vertices[6], vertices[7]);
            g.lineTo(vertices[0], vertices[1]);
          }
        }
      }
    }, {
      key: '_drawClipping',
      value: function _drawClipping() {
        var g = this.clippingGraphics,
            skeleton = this.skeleton;
        var slots = skeleton.slots;
        g.clear();
        g.lineStyle(1, COLOR_CLIP_LINE, 1);
        for (var i = 0, n = slots.length; i < n; i++) {
          var slot = slots[i];
          if (!slot.bone.active) {
            continue;
          }
          var attachment = slot.getAttachment();
          if (!(attachment instanceof ClippingAttachment)) {
            continue;
          }
          var clip = attachment;
          var nn = clip.worldVerticesLength;
          var world = setArraySize(this.temp, nn, 0);
          clip.computeWorldVertices(slot, 0, nn, world, 0, 2);
          for (var _i = 0, _n = world.length; _i < _n; _i += 2) {
            var x = world[_i];
            var y = world[_i + 1];
            var x2 = world[(_i + 2) % world.length];
            var y2 = world[(_i + 3) % world.length];
            g.moveTo(x, y);
            g.lineTo(x2, y2);
          }
        }
      }
    }, {
      key: 'clear',
      value: function clear(clearContainer) {
        this.bonesGraphics && this.bonesGraphics.clear();
        this.pathsGraphics && this.pathsGraphics.clear();
        this.meshsGraphics && this.meshsGraphics.clear();
        this.regionAttachmentsGraphics && this.regionAttachmentsGraphics.clear();
        this.clippingGraphics && this.clippingGraphics.clear();
        if (clearContainer) {
          this.container.removeChildren();
          this.controlBonesContainer.removeChildren();
        }
      }
    }]);
    return Debugger;
  }();

  /**
   * Spine - The TinyJS plugin
   *
   * Some pieces taken from https://github.com/EsotericSoftware/spine-runtimes/tree/3.8/spine-ts
   * Some code taken from https://github.com/pixijs/pixi-spine
   *
   * @name        tinyjs-plugin-spine
   * @overview    Spine implementation for TinyJS
   * @author      yiiqii
   * @license     MIT
   */

  exports.Debugger = Debugger;
  exports.atlasParser = atlasParser;
  exports.imageLoaderAdapter = imageLoaderAdapter;
  exports.staticImageLoader = staticImageLoader;
  exports.SpineSprite = SpineSprite;
  exports.SpineMesh = SpineMesh;
  exports.Spine = Spine;
  exports.AnimationStateData = AnimationStateData;
  exports.BlendMode = BlendMode;
  exports.Bone = Bone;
  exports.ConstraintData = ConstraintData;
  exports.Event = Event;
  exports.EventData = EventData;
  exports.IKConstraint = IKConstraint;
  exports.IKConstraintData = IKConstraintData;
  exports.PathConstraint = PathConstraint;
  exports.Skeleton = Skeleton;
  exports.SkeletonBounds = SkeletonBounds;
  exports.SkeletonData = SkeletonData;
  exports.Slot = Slot;
  exports.SlotData = SlotData;
  exports.TransformConstraint = TransformConstraint;
  exports.TransformConstraintData = TransformConstraintData;
  exports.Triangulator = Triangulator;
  exports.BoundingBoxAttachment = BoundingBoxAttachment;
  exports.ClippingAttachment = ClippingAttachment;
  exports.MeshAttachment = MeshAttachment;
  exports.PathAttachment = PathAttachment;
  exports.PointAttachment = PointAttachment;
  exports.RegionAttachment = RegionAttachment;
  exports.JitterEffect = JitterEffect;
  exports.SwirlEffect = SwirlEffect;
  exports.SUPPORTS_TYPED_ARRAYS = SUPPORTS_TYPED_ARRAYS;
  exports.arrayCopy = arrayCopy;
  exports.setArraySize = setArraySize;
  exports.ensureArrayCapacity = ensureArrayCapacity;
  exports.newArray = newArray;
  exports.newFloatArray = newFloatArray;
  exports.newShortArray = newShortArray;
  exports.toFloatArray = toFloatArray;
  exports.toSinglePrecision = toSinglePrecision;
  exports.webkit602BugfixHelper = webkit602BugfixHelper;
  exports.contains = contains;
  exports.Color = Color;
  exports.PI = PI;
  exports.PI2 = PI2;
  exports.radians2Degrees = radians2Degrees;
  exports.radDeg = radDeg;
  exports.degrees2Radians = degrees2Radians;
  exports.degRad = degRad;
  exports.clamp = clamp;
  exports.cosDeg = cosDeg;
  exports.sinDeg = sinDeg;
  exports.signum = signum;
  exports.toInt = toInt;
  exports.cbrt = cbrt;
  exports.randomTriangular = randomTriangular;
  exports.randomTriangularWith = randomTriangularWith;
  exports.Vector2 = Vector2;
  exports.Vector3 = Vector3;
  exports.Pool = Pool;
  exports.IntSet = IntSet;
  exports.Pow = Pow;
  exports.PowOut = PowOut;
  exports.MixDirection = MixDirection;
  exports.TimelineType = TimelineType;
  exports.MixBlend = MixBlend;
  exports.Animation = Animation;
  exports.CurveTimeline = CurveTimeline;
  exports.RotateTimeline = RotateTimeline;
  exports.TranslateTimeline = TranslateTimeline;
  exports.ScaleTimeline = ScaleTimeline;
  exports.ShearTimeline = ShearTimeline;
  exports.ColorTimeline = ColorTimeline;
  exports.TwoColorTimeline = TwoColorTimeline;
  exports.AttachmentTimeline = AttachmentTimeline;
  exports.DeformTimeline = DeformTimeline;
  exports.EventTimeline = EventTimeline;
  exports.DrawOrderTimeline = DrawOrderTimeline;
  exports.IKConstraintTimeline = IKConstraintTimeline;
  exports.TransformConstraintTimeline = TransformConstraintTimeline;
  exports.PathConstraintPositionTimeline = PathConstraintPositionTimeline;
  exports.PathConstraintSpacingTimeline = PathConstraintSpacingTimeline;
  exports.PathConstraintMixTimeline = PathConstraintMixTimeline;
  exports.EventType = EventType;
  exports.AnimationState = AnimationState;
  exports.TrackEntry = TrackEntry;
  exports.EventQueue = EventQueue;
  exports.AtlasAttachmentLoader = AtlasAttachmentLoader;
  exports.TransformMode = TransformMode;
  exports.BoneData = BoneData;
  exports.PathConstraintData = PathConstraintData;
  exports.PositionMode = PositionMode;
  exports.SpacingMode = SpacingMode;
  exports.RotateMode = RotateMode;
  exports.SkeletonBinary = SkeletonBinary;
  exports.SkeletonClipping = SkeletonClipping;
  exports.FAIL_ON_NON_EXISTING_SKIN = FAIL_ON_NON_EXISTING_SKIN;
  exports.SkeletonJSON = SkeletonJSON;
  exports.Skin = Skin;
  exports.SkinEntry = SkinEntry;
  exports.TextureFilter = TextureFilter;
  exports.TextureWrap = TextureWrap;
  exports.Texture = Texture;
  exports.TextureRegion = TextureRegion;
  exports.TextureAtlas = TextureAtlas;
  exports.TextureAtlasPage = TextureAtlasPage;
  exports.TextureAtlasRegion = TextureAtlasRegion;
  exports.Attachment = Attachment;
  exports.VertexAttachment = VertexAttachment;
  exports.AttachmentType = AttachmentType;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
