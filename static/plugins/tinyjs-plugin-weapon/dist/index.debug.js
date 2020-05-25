/*!
 * Tiny.Weapon
 * Description:Tinyjs 的武器系统
 * Author: 清扬陌客
 * Version: v0.1.1
 * Github: https://github.com/qingyangmoke/tinyjs-plugin-weapon.git
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Weapon"] = factory();
	else
		root["Tiny"] = root["Tiny"] || {}, root["Tiny"]["Weapon"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/Users/yiqi/git/tiny/site/.tiny_plugins/tinyjs-plugin-weapon/dist";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.killTypes = exports.Emitter = exports.Bullet = exports.Rectangle = exports.Point = exports.Math = undefined;

	var _Point = __webpack_require__(2);

	var _Point2 = _interopRequireDefault(_Point);

	var _Rectangle = __webpack_require__(4);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	var _Bullet = __webpack_require__(5);

	var _Bullet2 = _interopRequireDefault(_Bullet);

	var _math = __webpack_require__(3);

	var Math = _interopRequireWildcard(_math);

	var _Emitter = __webpack_require__(7);

	var _Emitter2 = _interopRequireDefault(_Emitter);

	var _killTypes = __webpack_require__(6);

	var killTypes = _interopRequireWildcard(_killTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * @file        tinyjs-plugin-weapon
	 * @author      采东
	 */

	/**
	* Tiny.js
	* @external Tiny
	* @see {@link http://tinyjs.net/}
	*/

	/**
	 * @namespace Weapon
	 * @memberof Tiny
	 */

	exports.Math = Math;
	exports.Point = _Point2.default;
	exports.Rectangle = _Rectangle2.default;
	exports.Bullet = _Bullet2.default;
	exports.Emitter = _Emitter2.default;
	exports.killTypes = killTypes;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _math = __webpack_require__(3);

	var TinyMath = _interopRequireWildcard(_math);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Point
	 * @class Point
	 * @constructor
	 * @memberof Tiny.Weapon
	 * @extends Tiny.Point
	 */
	var Point = function (_Tiny$Point) {
	  _inherits(Point, _Tiny$Point);

	  /**
	   * @constructor
	   * @param {number} x
	   * @param {number} y
	   */
	  function Point() {
	    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

	    _classCallCheck(this, Point);

	    return _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, x, y));
	  }

	  /**
	  * x,y坐标翻转 x=y ,y=x
	  *
	  * @method Tiny.Weapon.Point#invert
	  * @return {Tiny.Weapon.Point} 当前Point对象 方便链式调用
	  */


	  _createClass(Point, [{
	    key: 'invert',
	    value: function invert() {
	      this.setTo(this.y, this.x);
	      return this;
	    }

	    /**
	     * 重新设置x,y坐标
	     * @method Tiny.Weapon.Point#setTo
	     * @param {number} x - x 坐标
	     * @param {number} y - y 坐标
	     * @return {Tiny.Weapon.Point} 当前Point对象 方便链式调用
	     */

	  }, {
	    key: 'setTo',
	    value: function setTo(x, y) {
	      this.set(x, y);
	      return this;
	    }

	    /**
	     * 计算目标点的位置
	     * @method Tiny.Weapon.Point#distance
	     * @param {Point|Sprite|object} dest - 具有x,y坐标的对象
	     * @param {boolean} round - 是否使用Math.round计算
	     * @return {number} distance距离目标的距离
	     */

	  }, {
	    key: 'distance',
	    value: function distance(dest, round) {
	      // return Phaser.Point.distance(this, dest, round);
	      var a = this;
	      var b = dest;
	      var distance = TinyMath.distance(a.x, a.y, b.x, b.y);
	      return round ? Math.round(distance) : distance;
	    }

	    /**
	     * 判断点是否 0,0.
	     *
	     * @method Tiny.Weapon.Point#isZero
	     * @return {boolean} True 点坐标是 0,0, 否则 false.
	     */

	  }, {
	    key: 'isZero',
	    value: function isZero() {
	      return this.x === 0 && this.y === 0;
	    }

	    /**
	    * 减法操作 x-=x,y-=y
	    *
	    * @method Tiny.Weapon.Point#subtract
	    * @param {number} x - 要减去的 x 坐标.
	    * @param {number} y - 要减去的 y 坐标.
	    * @return {Tiny.Weapon.Point} 当前Point对象 ，方便去做链式调用.
	    */

	  }, {
	    key: 'subtract',
	    value: function subtract(x, y) {
	      this.x -= x;
	      this.y -= y;
	      return this;
	    }

	    /**
	    * 把这个点按照给定的(x,y)坐标为锚点 旋转指定角度angle
	    *
	    * @method Point#rotate
	    * @param {number} x - 锚点 x 坐标.
	    * @param {number} y - 锚点 y 坐标.
	    * @param {number} angle - 角度
	    * @param {boolean} [asDegrees=false] -radians计算单位 如果asDegrees是true 以360度degree作为计量单位 否则弧度radians为计量单位
	    * @param {number} [distance] - An optional distance constraint between the Point and the anchor.
	    * @return {Phaser.Point} 修改后的Point对象.
	    */

	  }, {
	    key: 'rotate',
	    value: function rotate(x, y, angle, asDegrees, distance) {
	      var a = this;
	      if (asDegrees) {
	        angle = TinyMath.degToRad(angle);
	      }

	      if (distance === undefined) {
	        a.subtract(x, y);

	        var s = Math.sin(angle);
	        var c = Math.cos(angle);

	        var tx = c * a.x - s * a.y;
	        var ty = s * a.x + c * a.y;

	        a.x = tx + x;
	        a.y = ty + y;
	      } else {
	        var t = angle + Math.atan2(a.y - y, a.x - x);
	        a.x = x + distance * Math.cos(t);
	        a.y = y + distance * Math.sin(t);
	      }

	      return a;
	    }
	  }]);

	  return Point;
	}(Tiny.Point);

	exports.default = Point;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.wrapAngle = wrapAngle;
	exports.wrap = wrap;
	exports.degToRad = degToRad;
	exports.radToDeg = radToDeg;
	exports.distance = distance;
	exports.angle = angle;
	exports.clamp = clamp;
	exports.between = between;
	/**
	* 保证给定的angle的值在-180 到 180之间 或者 -PI 到 PI之间
	* @function
	* @static
	* @name wrapAngle
	* @memberof Tiny.Weapon.Math
	* @param {number} angle - 角度
	* @param {boolean} [radians=false] - 如果是true使用弧度 false角度 默认false
	* @return {number} 角度或者弧度 单位和angle参数一致
	*/
	function wrapAngle(angle, radians) {
	  return radians ? this.wrap(angle, -Math.PI, Math.PI) : this.wrap(angle, -180, 180);
	}

	/**
	* Ensures that the value always stays between min and max, by wrapping the value around.
	*
	* If `max` is not larger than `min` the result is 0.
	* @private
	* @function
	* @static
	* @name wrap
	* @memberof Tiny.Weapon.Math
	* @param {number} value - The value to wrap.
	* @param {number} min - The minimum the value is allowed to be.
	* @param {number} max - The maximum the value is allowed to be, should be larger than `min`.
	* @return {number} The wrapped value.
	*/
	function wrap(value, min, max) {
	  var range = max - min;

	  if (range <= 0) {
	    return 0;
	  }

	  var result = (value - min) % range;

	  if (result < 0) {
	    result += range;
	  }

	  return result + min;
	}

	var degreeToRadiansFactor = Math.PI / 180;
	var radianToDegreesFactor = 180 / Math.PI;

	/**
	* 把角度转成弧度
	* @function
	* @static
	* @name degToRad
	* @memberof Tiny.Weapon.Math
	* @param {number} degrees - 角度.
	* @return {number} 弧度
	*/
	function degToRad(degrees) {
	  return degrees * degreeToRadiansFactor;
	};

	/**
	* 弧度转角度
	* @function
	* @static
	* @name radToDeg
	* @memberof Tiny.Weapon.Math
	* @param {number} radians - 弧度
	* @return {number} 角度
	*/
	function radToDeg(radians) {
	  return radians * radianToDegreesFactor;
	};

	/**
	* 计算两个点的距离
	* @function
	* @static
	* @name distance
	* @memberof Tiny.Weapon.Math
	* @param {number} x1
	* @param {number} y1
	* @param {number} x2
	* @param {number} y2
	* @return {number}
	*/
	function distance(x1, y1, x2, y2) {
	  var dx = x1 - x2;
	  var dy = y1 - y2;
	  return Math.sqrt(dx * dx + dy * dy);
	}

	/**
	* 两点之间的角度
	* @function
	* @static
	* @name angle
	* @memberof Tiny.Physics.Ant.Math
	* @param {number} x1
	* @param {number} y1
	* @param {number} x2
	* @param {number} y2
	* @return {number}
	*/
	function angle(x1, y1, x2, y2) {
	  return Math.atan2(y2 - y1, x2 - x1);
	}

	/**
	* 保持v在min和max之间 如果v小于min 返回min ，如果v>max 返回max 否则返回v
	* @function
	* @static
	* @name clamp
	* @memberof Tiny.Physics.Ant.Math
	* @param {float} v - The value to be clamped.
	* @param {float} min - The minimum bounds.
	* @param {float} max - The maximum bounds.
	* @return {number} The clamped value.
	*/
	function clamp(v, min, max) {
	  if (v < min) {
	    return min;
	  } else if (max < v) {
	    return max;
	  } else {
	    return v;
	  }
	}

	/**
	* 返回介于min 和max之前的随机数
	* @function
	* @static
	* @name clamp
	* @memberof Tiny.Physics.Ant.Math
	* @param {number} [min=0] - 最小数
	* @param {number} [max=1] - 最大数
	* @return {number}  返回介于min 和max之前的随机数
	*/
	function between() {
	  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

	  if (min === max) {
	    return min;
	  }

	  if (min < max) {
	    var temp = min;
	    min = max;
	    max = temp;
	  }

	  min = Math.ceil(min);
	  max = Math.floor(max);

	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * Rectangle
	 * @class Rectangle
	 * @constructor
	 * @memberof Tiny.Weapon
	 * @extends Tiny.Rectangle
	 */
	var Rectangle = function (_Tiny$Rectangle) {
	  _inherits(Rectangle, _Tiny$Rectangle);

	  /**
	   * @param {number} [x=0] - x坐标
	   * @param {number} [y=0] - y坐标
	   * @param {number} [width=0] - 宽度
	   * @param {number} [height=0] - 高度
	   */
	  function Rectangle() {
	    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	    var width = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	    var height = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

	    _classCallCheck(this, Rectangle);

	    return _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, x, y, width, height));
	  }

	  /**
	   * 把矩形的中心点设置在x,y
	   * @name Tiny.Weapon.Rectangle#halfWidth
	   * @property {number} x - x 坐标
	   * @property {number} y - y 坐标
	   */


	  _createClass(Rectangle, [{
	    key: "centerOn",
	    value: function centerOn(x, y) {
	      this.centerX = x;
	      this.centerY = y;
	      return this;
	    }

	    /**
	    * 宽度的1/2
	    * @name Tiny.Weapon.Rectangle#halfWidth
	    * @property {number} halfWidth - 宽度的1/2
	    */

	  }, {
	    key: "halfWidth",
	    get: function get() {
	      return this.width / 2;
	    }

	    /**
	    * 高度的1/2
	    * @name Tiny.Weapon.Rectangle#halfWidth
	    * @property {number} halfWidth - 高度的1/2
	    */

	  }, {
	    key: "halfHeight",
	    get: function get() {
	      this.x = this.height / 2;
	    }

	    /**
	    * 矩形中心的x坐标
	    * @name Tiny.Weapon.Rectangle#centerY
	    * @property {number} centerY - 矩形中心的x坐标
	    */

	  }, {
	    key: "centerX",
	    get: function get() {
	      return this.x + this.halfWidth;
	    },
	    set: function set(value) {
	      this.x = value - this.halfWidth;
	    }

	    /**
	    * 矩形中心的y坐标
	    * @name Tiny.Weapon.Rectangle#centerY
	    * @property {number} centerY - 矩形中心的y坐标
	    */

	  }, {
	    key: "centerY",
	    get: function get() {
	      return this.y + this.halfHeight;
	    },
	    set: function set(value) {
	      this.y = value - this.halfHeight;
	    }

	    /**
	    * @name Tiny.Weapon.Rectangle#randomX
	    * @property {number} randomX - 介于矩形的左边界和右边界之间的随机数
	    */

	  }, {
	    key: "randomX",
	    get: function get() {
	      return this.x + Math.random() * this.width;
	    }

	    /**
	    * @name Tiny.Weapon.Rectangle#randomY
	    * @property {number} randomY - 介于矩形的上边界和下边界之间的随机数
	    */

	  }, {
	    key: "randomY",
	    get: function get() {
	      return this.y + Math.random() * this.height;
	    }
	  }]);

	  return Rectangle;
	}(Tiny.Rectangle);

	exports.default = Rectangle;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _math = __webpack_require__(3);

	var WeaponMath = _interopRequireWildcard(_math);

	var _killTypes = __webpack_require__(6);

	var killTypes = _interopRequireWildcard(_killTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	* 子弹
	* @class Bullet
	* @constructor
	* @memberof Tiny.Weapon
	* @extends Tiny.Sprite
	*/
	var Bullet = function (_Tiny$Sprite) {
	  _inherits(Bullet, _Tiny$Sprite);

	  /**
	  * @constructor
	  * @memberof Tiny.Weapon
	  * @extends Tiny.Sprite
	  * @param {Tiny.BaseTexture} texture 子弹的纹理
	  * @param {Tiny.Weapon.Emitter} emitter 子弹发射器实例引用
	  */
	  function Bullet(texture, emitter) {
	    _classCallCheck(this, Bullet);

	    var _this = _possibleConstructorReturn(this, (Bullet.__proto__ || Object.getPrototypeOf(Bullet)).call(this, texture));

	    _this._baseTexture = texture;
	    _this.anchor.set(0.5);

	    _this.data = {
	      emitter: emitter,
	      fromX: 0,
	      fromY: 0,
	      fireTime: 0,
	      // bodyDirty: true,
	      rotateToVelocity: false,
	      killType: 0,
	      killDistance: 0,
	      killLifeSpan: 0
	    };

	    _this._exists = true;
	    _this._alive = true;
	    return _this;
	  }

	  /**
	  * @name Tiny.Weapon.Bullet#exists
	  * @property {boolean} exists 子弹是否存在
	  */


	  _createClass(Bullet, [{
	    key: 'kill',


	    /**
	    * 销毁子弹
	    * @method Tiny.Weapon.Bullet#kill
	    */
	    value: function kill() {
	      this._alive = false;
	      this._exists = false;
	      this.visible = false;
	      this.dispatch('kill', this);
	      console.log('kill');
	      if (this.parent) {
	        this.data.emitter.removeChild(this);
	        this.parent = null;
	      }
	      return this;
	    }

	    /**
	    * @private
	    * @method Tiny.Weapon.Bullet#dispatch
	    * @param {String} eventName - 事件名称
	    * @param {any} args - 可变参数
	    */

	  }, {
	    key: 'dispatch',
	    value: function dispatch(eventName) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      this.emit.apply(this, arguments);
	    }

	    /**
	    * 复活重用
	    * @method Tiny.Weapon.Bullet#revive
	    */

	  }, {
	    key: 'revive',
	    value: function revive() {
	      this._alive = true;
	      this._exists = true;
	      this.visible = true;
	      if (!this.parent) {
	        this.data.emitter.addChild(this);
	      }
	      this.dispatch('revive', this);
	    }

	    /**
	    * 更新子弹
	    * @method Tiny.Weapon.Bullet#update
	    */

	  }, {
	    key: 'update',
	    value: function update() {
	      if (!this.exists) {
	        return;
	      }

	      if (this.data.killType === killTypes.KILL_LIFESPAN) {
	        if (this.data.emitter.timeNow - this.data.fireTime > this.data.killLifeSpan) {
	          this.kill();
	        }
	      } else if (this.data.killType === killTypes.KILL_DISTANCE) {
	        if (WeaponMath.distance(this.x, this.y, this.data.fromX, this.data.fromY, true) > this.data.killDistance) {
	          this.kill();
	        }
	      } else {
	        if (!this.data.emitter.bulletBounds.contains(this.x, this.y)) {
	          this.kill();
	        }
	      }

	      if (this.data.rotateToVelocity) {
	        this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
	      }

	      // TODO: Bullet world wrap？
	    }

	    /**
	    * 重置子弹
	    * @method Tiny.Weapon.Bullet#reset
	    * @param {number} x - x 坐标
	    * @param {number} y - y 坐标
	    * @param {number} rotation - 旋转角度 弧度
	    */

	  }, {
	    key: 'reset',
	    value: function reset() {
	      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	      var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var rotation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	      this.x = x;
	      this.y = y;
	      this.rotation = rotation;
	    }

	    /**
	    * 复制一个新的子弹
	    * @method Tiny.Weapon.Bullet#clone
	    */

	  }, {
	    key: 'clone',
	    value: function clone() {
	      return new Bullet(this._baseTexture, this.data.emitter);
	    }
	  }, {
	    key: 'exists',
	    get: function get() {
	      return this._exists;
	    },
	    set: function set(value) {
	      return this._exists;
	    }

	    /**
	    * @name Tiny.Weapon.Bullet#alive
	    * @property {boolean} exists 子弹是否还活跃
	    */

	  }, {
	    key: 'alive',
	    get: function get() {
	      return this._alive;
	    }
	  }]);

	  return Bullet;
	}(Tiny.Sprite);

	exports.default = Bullet;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * @namespace killTypes
	 * @memberof Tiny.Weapon
	 */

	/**
	* @constant
	* @name Tiny.Weapon.killTypes#KILL_NEVER
	* @property {number} KILL_NEVER 子弹不自动销毁
	*/
	var KILL_NEVER = exports.KILL_NEVER = 0;

	/**
	* @constant
	* @name Tiny.Weapon.killTypes#KILL_LIFESPAN
	* @property {integer} KILL_LIFESPAN 子弹在规定的生命周期内销毁
	*/
	var KILL_LIFESPAN = exports.KILL_LIFESPAN = 1;

	/**
	* @constant
	* @name Tiny.Weapon.killTypes#KILL_DISTANCE
	* @property {integer} KILL_DISTANCE 子弹在规定的距离内销毁
	*/
	var KILL_DISTANCE = exports.KILL_DISTANCE = 2;

	/**
	* @constant
	* @name Tiny.Weapon.killTypes#KILL_WEAPON_BOUNDS
	* @property {integer} KILL_WEAPON_BOUNDS 超出子弹发射器的边界
	*/
	var KILL_WEAPON_BOUNDS = exports.KILL_WEAPON_BOUNDS = 3;

	/**
	* @constant
	* @name Tiny.Weapon.killTypes#KILL_CAMERA_BOUNDS
	* @property {integer} KILL_CAMERA_BOUNDS 超出摄像机的可视区域自动销毁
	*/
	var KILL_CAMERA_BOUNDS = exports.KILL_CAMERA_BOUNDS = 4;

	/**
	* @constant
	* @name Tiny.Weapon.killTypes#KILL_WORLD_BOUNDS
	* @property {integer} KILL_WORLD_BOUNDS 超出游戏边界自动销毁
	*/
	var KILL_WORLD_BOUNDS = exports.KILL_WORLD_BOUNDS = 5;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Bullet = __webpack_require__(5);

	var _Bullet2 = _interopRequireDefault(_Bullet);

	var _math = __webpack_require__(3);

	var TinyMath = _interopRequireWildcard(_math);

	var _Point = __webpack_require__(2);

	var _Point2 = _interopRequireDefault(_Point);

	var _Rectangle = __webpack_require__(4);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	var _BulletPool = __webpack_require__(8);

	var _BulletPool2 = _interopRequireDefault(_BulletPool);

	var _killTypes = __webpack_require__(6);

	var killTypes = _interopRequireWildcard(_killTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	/**
	 * 武器发射器
	 * @class Emitter
	 * @constructor
	 * @memberof Tiny.Weapon
	 * @extends Tiny.Container
	 */
	var Emitter = function (_Tiny$Container) {
	  _inherits(Emitter, _Tiny$Container);

	  /**
	   * @constructor
	   * @param {Tiny.Application} app
	   * @param {Tiny.BaseTexture} texture
	   */
	  function Emitter(app, texture) {
	    _classCallCheck(this, Emitter);

	    /**
	     * 默认子弹缓存池的key
	     */
	    var _this = _possibleConstructorReturn(this, (Emitter.__proto__ || Object.getPrototypeOf(Emitter)).call(this));

	    _this.DEFAULT_KEY = 'default';

	    /**
	    * @name Tiny.Weapon.Emitter#app
	    * @property {Tiny.Application} app - 对当前app实例引用
	    */
	    _this.app = app;

	    /**
	     * @private
	     * @property {number} 累计发射的子弹数
	     * @default 0
	     */
	    _this._fireCount = 0;

	    /**
	     * 当前系统的物理系统
	     */
	    _this._physics = _this.app.physics.ant || _this.app.physics.p2;

	    /**
	     * @private
	     * @property {object} 子弹缓存池
	     */
	    _this._bulletsPools = {};

	    /**
	     * @private
	     * @property {Array} 数组
	     */
	    _this._bullets = [];

	    /**
	     * @name Tiny.Weapon.Emitter#trackedSprite
	     * @property {Tiny.Sprite|Tiny.Image|Tiny.Text|Tiny.DisplayObjects} tiny 当前发射器装在的对象
	     */
	    _this.trackedSprite = null;

	    /**
	     * @name Tiny.Weapon.Emitter#trackRotation
	     * @property {Boolean} trackRotation - 武器是否根据sprite的旋转进行旋转 默认是true
	     * @default true
	     */
	    _this.trackRotation = true;

	    /**
	     * @name Tiny.Weapon.Emitter#trackOffset
	     * @property {Boolean} trackOffset - 发射点相对于发射器装在对象的偏移
	     * @default 0,0
	     */
	    _this.trackOffset = new _Point2.default(0, 0);

	    /**
	     * @private
	     * @property {Point} 临时存储旋转点的变量
	     */
	    _this._rotatedPoint = new _Point2.default(0, 0);

	    /**
	    * @name Tiny.Weapon.Emitter#fireFrom
	    * @property {Rectangle} 子弹发射点的局部区域 在这个区域里随机取值
	    */
	    _this._fireFrom = new _Rectangle2.default(0, 0, 1, 1);

	    /**
	     * @name Tiny.Weapon.Emitter#bulletSpeed
	     * @property {number} 子弹速度
	     * @default 200
	     */
	    _this.bulletSpeed = 200;

	    /**
	    * @name Tiny.Weapon.Emitter#bulletSpeedVariance
	    * @property {number} 子弹速度随机变化的幅度
	    * @default 0
	    */
	    _this.bulletSpeedVariance = 0;

	    /**
	     * @name Tiny.Weapon.Emitter#bulletAngleOffset
	     * @property {number} 子弹相对于sprite的角度偏移
	     * @default 0
	     */
	    _this.bulletAngleOffset = 0;

	    /**
	    * @private
	    * @property {number} 子弹销毁的时机
	    * @default Tiny.Weapon.killTypes.KILL_WORLD_BOUNDS
	    */
	    _this._bulletKillType = killTypes.KILL_WORLD_BOUNDS;

	    /**
	    * @name Tiny.Weapon.Emitter#bulletBounds
	    * @property {number} 子弹生存的边界 默认是tiny的舞台区域
	    */
	    _this.bulletBounds = _this.getWorldBounds();

	    /**
	    * @name Tiny.Weapon.Emitter#bulletAngleVariance
	    * @property {number} 子弹发射角度的随机差异幅度 角度会在这个范围内进行随机取值 有一个随机的变化量
	    * @default 0
	    */
	    _this.bulletAngleVariance = 0;

	    /**
	    * @name Tiny.Weapon.Emitter#bulletGravity
	    * @property {Tiny.Point} 子弹的自定义重力 在ant物理系统中有用
	    * @default 0,0
	    */
	    _this.bulletGravity = new _Point2.default(0, 0);

	    /**
	    * @name Tiny.Weapon.Emitter#bulletLifespan
	    * @property {number} 子弹的生命周期 子弹距离从发射时间大于这个值则自动销毁  当bulletKillType 为 KILL_LIFESPAN时有效
	    * @default 5000
	    */
	    _this.bulletLifespan = 5000;

	    /**
	    * @name Tiny.Weapon.Emitter#bulletKillDistance
	    * @property {number} 子弹的生命周期-长度 子弹距离发射点的距离大于这个值 自动销毁 当bulletKillType 为 KILL_DISTANCE时有效
	    * @default 100
	    */
	    _this.bulletKillDistance = 100;

	    /**
	    * @name Tiny.Weapon.Emitter#bulletRotateToVelocity
	    * @property {boolean} 子弹是否根据速度进行自动旋转
	    * @default false
	     */
	    _this.bulletRotateToVelocity = false;

	    /**
	    * @name Tiny.Weapon.Emitter#autofire
	    * @property {boolean} 是否自动发射
	    * @default false
	    */
	    _this.autofire = false;

	    /**
	     * @name Tiny.Weapon.Emitter#fireLimit
	     * @property {number}  限制的最大发射数 超过这个数字不在发射 <=0 不限制
	     * @default 0
	     */
	    _this.fireLimit = 0;

	    /**
	     * @name Tiny.Weapon.Emitter#fireAngle
	     * @property {number} 发射的角度
	     * @default 0
	     */
	    _this.fireAngle = 0;

	    /**
	     * @name Tiny.Weapon.Emitter#fireRate
	     * @property {number} 发射的频率
	     * @default 100
	     */
	    _this.fireRate = 100;

	    /**
	     * @name Tiny.Weapon.Emitter#fireRate
	     * @property {number} 发射频率的随机误差值
	     * @default 0
	     */
	    _this.fireRateVariance = 0;

	    /**
	    * 如果传递了纹理则注册到默认缓存池中
	    */
	    if (texture) {
	      _this.register(texture);
	    }

	    /**
	     * 定时器 用来更新发射系统
	     * @private
	     */
	    _this._ticker = new Tiny.ticker.Ticker();
	    _this._ticker.add(_this.update, _this);
	    _this._ticker.start();
	    return _this;
	  }

	  /**
	   * 获取系统的边界
	   * @method Tiny.Weapon.Emitter#getWorldBounds
	   */


	  _createClass(Emitter, [{
	    key: 'getWorldBounds',
	    value: function getWorldBounds() {
	      return new _Rectangle2.default(0, 0, this.app.renderer.width, this.app.renderer.height);
	    }

	    /**
	     * @name Tiny.Weapon.Emitter#bulletKillType
	     * @property {number} bulletKillType 子弹销毁的类型
	     */

	  }, {
	    key: 'register',


	    /**
	    * 注册一个武器素材
	    * @method Tiny.Weapon.Emitter#register
	    * @param {Tiny.BaseTexture=} texture
	    * @param {String} [key='default'] - 子弹key 唯一 不可重复
	    */
	    value: function register(texture, key) {
	      if (key === undefined) {
	        key = this.DEFAULT_KEY;
	      }
	      if (!(key in this._bulletsPools)) {
	        this._bulletsPools[key] = new _BulletPool2.default(new _Bullet2.default(texture, this));
	      }
	    }

	    /**
	    * @name Tiny.Weapon.Emitter#timeNow
	    * @property {number} timeNow 当前时间
	    */

	  }, {
	    key: 'fire',


	    /**
	     * @method Tiny.Weapon.Emitter#fire
	     * @param {String} key - 子弹缓存池的key
	     */
	    value: function fire(key) {
	      if (this.trackedSprite == null) {
	        throw Error('trackedSprite is null');
	      }

	      var timeNow = this.timeNow;

	      if (timeNow < this._nextFire || this.fireLimit > 0 && this.fireCount >= this.fireLimit) {
	        return false;
	      }

	      if (key === undefined) {
	        key = this.DEFAULT_KEY;
	      }

	      if (!(key in this._bulletsPools)) {
	        throw Error('please register first');
	      }

	      var bullet = this._bulletsPools[key].getOne();
	      this._bullets.push(bullet);

	      this._physics.enable(bullet, false);

	      if (this.trackRotation) {
	        this._rotatedPoint.set(this.trackedSprite.x + this.trackOffset.x, this.trackedSprite.y + this.trackOffset.y);
	        this._rotatedPoint.rotate(this.trackedSprite.x, this.trackedSprite.y, this.trackedSprite.rotation);

	        if (this._fireFrom.width > 1) {
	          this._fireFrom.centerOn(this._rotatedPoint.x, this._rotatedPoint.y);
	        } else {
	          this._fireFrom.x = this._rotatedPoint.x;
	          this._fireFrom.y = this._rotatedPoint.y;
	        }
	      } else {
	        if (this._fireFrom.width > 1) {
	          this._fireFrom.centerOn(this.trackedSprite.x + this.trackOffset.x, this.trackedSprite.y + this.trackOffset.y);
	        } else {
	          this._fireFrom.x = this.trackedSprite.x + this.trackOffset.x;
	          this._fireFrom.y = this.trackedSprite.y + this.trackOffset.y;
	        }
	      }

	      var bulletSpeed = this.bulletSpeed;

	      // 子弹速度根据设定的幅度进行随意取值
	      if (this.bulletSpeedVariance !== 0) {
	        bulletSpeed += TinyMath.between(-this.bulletSpeedVariance, this.bulletSpeedVariance);
	      }

	      var fromX = this._fireFrom.width > 1 ? this._fireFrom.randomX : this._fireFrom.x;
	      var fromY = this._fireFrom.height > 1 ? this._fireFrom.randomY : this._fireFrom.y;

	      // let angle = (this.trackRotation) ? this.trackedSprite.rotation : this.fireAngle;
	      var angle = this.trackedSprite.rotation + TinyMath.degToRad(this.fireAngle);

	      //  根据角度变量随机调整角度 +-
	      if (this.bulletAngleVariance !== 0) {
	        angle += TinyMath.degToRad(TinyMath.between(-this.bulletAngleVariance, this.bulletAngleVariance));
	      }

	      var moveX = 0;
	      var moveY = 0;

	      // 特殊角度处理
	      if (angle === 0 || angle === 180) {
	        moveX = Math.cos(angle) * bulletSpeed;
	      } else if (angle === 90 || angle === 270) {
	        moveY = Math.sin(angle) * bulletSpeed;
	      } else {
	        moveX = Math.cos(angle) * bulletSpeed;
	        moveY = Math.sin(angle) * bulletSpeed;
	      }

	      bullet.reset(fromX, fromY, angle + this.bulletAngleOffset);

	      bullet.data.fromX = fromX;
	      bullet.data.fromY = fromY;
	      bullet.data.fireTime = timeNow;
	      bullet.data.killType = this.bulletKillType;
	      bullet.data.killDistance = this.bulletKillDistance;
	      bullet.data.killLifeSpan = this.bulletLifespan;
	      bullet.data.rotateToVelocity = this.bulletRotateToVelocity;

	      if (bullet.body) {
	        bullet.body.velocity.x = moveX;
	        bullet.body.velocity.y = moveY;
	        if (bullet.body.gravity) {
	          bullet.body.gravity.set(this.bulletGravity.x, this.bulletGravity.y);
	        }
	      } else {
	        throw Error('set ant physics system first');
	      }

	      var fireRate = this.fireRate;
	      if (this.fireRateVariance !== 0) {
	        fireRate += TinyMath.between(-this.fireRateVariance, this.fireRateVariance);
	        if (fireRate < 0) {
	          fireRate = 0;
	        }
	      }

	      this._nextFire = timeNow + fireRate;

	      this._fireCount++;

	      this.dispatch('fire', bullet, this, bulletSpeed);

	      if (this.fireLimit > 0 && this.fireCount === this.fireLimit) {
	        this.dispatch('fireLimit', this, this.fireLimit);
	      }

	      if (bullet.parent !== this) {
	        this.addChild(bullet);
	      }

	      bullet.revive();
	    }

	    /**
	    * @private
	    * @param {String} eventName
	    * @param {any} args 可变参数
	    */

	  }, {
	    key: 'dispatch',
	    value: function dispatch(eventName) {
	      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        args[_key - 1] = arguments[_key];
	      }

	      this.emit.apply(this, arguments);
	    }

	    /**
	    * 武器需要作用的对象
	    * @method Tiny.Weapon.Emitter#trackSprite
	    * @param {Phaser.Sprite|Object} sprite - 发射器所作用于的对象
	    * @param {integer} [offsetX=0] - 武器发射点相对于sprite的x偏移量
	    * @param {integer} [offsetY=0] - 武器发射点相对于sprite的y偏移量
	    * @param {boolean} [trackRotation=true] - 武器是否根据sprite的旋转进行旋转 默认是true
	    * @return {Tiny.Weapon.Emitter} 当前发射器对象
	    */

	  }, {
	    key: 'trackSprite',
	    value: function trackSprite(sprite) {
	      var offsetX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
	      var offsetY = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
	      var trackRotation = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
	      var fireAngle = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

	      this.trackedSprite = sprite;
	      this.trackRotation = trackRotation;
	      this.trackOffset.set(offsetX, offsetY);
	      this.fireAngle = fireAngle;
	      return this;
	    }

	    /**
	    * 更新
	    * @private
	    */

	  }, {
	    key: 'update',
	    value: function update() {
	      var _this2 = this;

	      // 更新子弹 并回收已销毁的子弹
	      var removed = [];
	      this._bullets.forEach(function (b, i) {
	        b.update();
	        if (!b.exists) {
	          removed.push(b);
	        }
	      });

	      removed.forEach(function (e) {
	        var idx = _this2._bullets.indexOf(e);
	        _this2._bullets.splice(idx, 1);
	      });

	      removed = null;

	      // 自动发射
	      if (this.autofire) {
	        this.fire();
	      }
	    }

	    /**
	    * 销毁当前武器发射器
	    * @method Tiny.Weapon.Emitter#destroy
	    */

	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      this._ticker.remove(this.update, this);
	      this._ticker.stop();
	      this._physics = null;
	      this.app = null;
	      this._bulletsPools = null;
	      this._bullets = null;
	    }
	  }, {
	    key: 'bulletKillType',
	    get: function get() {
	      return this._bulletKillType;
	    },
	    set: function set(type) {
	      switch (type) {
	        // case killTypes.KILL_STATIC_BOUNDS:
	        // case killTypes.KILL_WEAPON_BOUNDS:
	        //   this.bulletBounds = this.bounds;
	        //   break;

	        case killTypes.KILL_CAMERA_BOUNDS:
	        case killTypes.KILL_WORLD_BOUNDS:
	          this.bulletBounds = this.getWorldBounds();
	          break;
	      }

	      this._bulletKillType = type;
	    }
	  }, {
	    key: 'timeNow',
	    get: function get() {
	      return Date.now();
	    }

	    /**
	     * @name Tiny.Weapon.Emitter#fireCount
	     * @property {number} fireCount 已发射的子弹总数
	     */

	  }, {
	    key: 'fireCount',
	    get: function get() {
	      return this._fireCount;
	    }
	  }]);

	  return Emitter;
	}(Tiny.Container);

	exports.default = Emitter;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	* 子弹
	* @class BulletPool
	* @constructor
	* @memberof Tiny.Weapon
	*/
	var BulletPool = function () {
	  /**
	  * @constructor
	  * @param {Tiny.Weapon.Bullet} bullet 子弹实例
	  */
	  function BulletPool(bullet) {
	    _classCallCheck(this, BulletPool);

	    this._bulletCreator = bullet;
	    this._pool = [];
	  }

	  /**
	  * 缓存池是否为空
	  * @method Tiny.Weapon.BulletPool#isEmpty
	  */


	  _createClass(BulletPool, [{
	    key: "isEmpty",
	    value: function isEmpty() {
	      return this.size === 0;
	    }

	    /**
	    * 从缓存池中取出一个子弹
	    * @method Tiny.Weapon.BulletPool#getOne
	    */

	  }, {
	    key: "getOne",
	    value: function getOne() {
	      if (this.isEmpty) {
	        return this._bulletCreator.clone();
	      }
	      return this._pool.shift();
	    }

	    /**
	    * 往缓存池中放入一个子弹
	    * @method Tiny.Weapon.BulletPool#pushOne
	    * @param {Tiny.Weapon.Bullet} bullet 子弹对象
	    */

	  }, {
	    key: "pushOne",
	    value: function pushOne(bullet) {
	      this._pool.push(bullet);
	    }

	    /**
	    * @name Tiny.Weapon.BulletPool#size
	    * @property {number} size - 当前缓存池的大小
	    */

	  }, {
	    key: "size",
	    get: function get() {
	      return this._pool.length;
	    }
	  }]);

	  return BulletPool;
	}();

	exports.default = BulletPool;

/***/ })
/******/ ])
});
;