/*!
 * Name: tinyjs-plugin-scroller
 * Description: 滚动插件
 * Author: fangjun.yfj
 * Version: v0.2.0
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Tiny = global.Tiny || {}, global.Tiny.Scroller = factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var animate = createCommonjsModule(function (module, exports) {
	  var global = typeof window === 'undefined' ? commonjsGlobal : window;
	  var time = Date.now || function () {
	    return +new Date();
	  };
	  var desiredFrames = 60;
	  var millisecondsPerSecond = 1000;
	  var running = {};
	  var counter = 1;
	  exports.requestAnimationFrame = function () {
	    var requestFrame = global.requestAnimationFrame || global.webkitRequestAnimationFrame || global.mozRequestAnimationFrame || global.oRequestAnimationFrame;
	    var isNative = !!requestFrame;
	    if (requestFrame && !/requestAnimationFrame\(\)\s*\{\s*\[native code\]\s*\}/i.test(requestFrame.toString())) {
	      isNative = false;
	    }
	    if (isNative) {
	      return function (callback, root) {
	        requestFrame(callback, root);
	      };
	    }
	    var TARGET_FPS = 60;
	    var requests = {};
	    var rafHandle = 1;
	    var intervalHandle = null;
	    var lastActive = +new Date();
	    return function (callback, root) {
	      var callbackHandle = rafHandle++;
	      requests[callbackHandle] = callback;
	      if (intervalHandle === null) {
	        intervalHandle = setInterval(function () {
	          var time = +new Date();
	          var currentRequests = requests;
	          requests = {};
	          for (var key in currentRequests) {
	            if (currentRequests.hasOwnProperty(key)) {
	              currentRequests[key](time);
	              lastActive = time;
	            }
	          }
	          if (time - lastActive > 2500) {
	            clearInterval(intervalHandle);
	            intervalHandle = null;
	          }
	        }, 1000 / TARGET_FPS);
	      }
	      return callbackHandle;
	    };
	  }();
	  exports.stop = function (id) {
	    var cleared = running[id] !== null;
	    if (cleared) {
	      running[id] = null;
	    }
	    return cleared;
	  };
	  exports.isRunning = function (id) {
	    return running[id] !== null;
	  };
	  exports.start = function (stepCallback, verifyCallback, completedCallback, duration, easingMethod, root) {
	    var start = time();
	    var lastFrame = start;
	    var percent = 0;
	    var dropCounter = 0;
	    var id = counter++;
	    if (id % 20 === 0) {
	      var newRunning = {};
	      for (var usedId in running) {
	        newRunning[usedId] = true;
	      }
	      running = newRunning;
	    }
	    var step = function step(virtual) {
	      var render = virtual !== true;
	      var now = time();
	      if (!running[id] || verifyCallback && !verifyCallback(id)) {
	        running[id] = null;
	        completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, false);
	        return;
	      }
	      if (render) {
	        var droppedFrames = Math.round((now - lastFrame) / (millisecondsPerSecond / desiredFrames)) - 1;
	        for (var j = 0; j < Math.min(droppedFrames, 4); j++) {
	          step(true);
	          dropCounter++;
	        }
	      }
	      if (duration) {
	        percent = (now - start) / duration;
	        if (percent > 1) {
	          percent = 1;
	        }
	      }
	      var value = easingMethod ? easingMethod(percent) : percent;
	      if ((stepCallback(value, now, render) === false || percent === 1) && render) {
	        running[id] = null;
	        completedCallback(desiredFrames - dropCounter / ((now - start) / millisecondsPerSecond), id, percent === 1 || duration === undefined);
	      } else if (render) {
	        lastFrame = now;
	        exports.requestAnimationFrame(step, root);
	      }
	    };
	    running[id] = true;
	    exports.requestAnimationFrame(step, root);
	    return id;
	  };
	});
	var animate_1 = animate.requestAnimationFrame;
	var animate_2 = animate.stop;
	var animate_3 = animate.isRunning;
	var animate_4 = animate.start;

	var NOOP = function NOOP() {};
	var Scroller = function Scroller(callback, options) {
	  this.__callback = callback;
	  this.options = {
	    scrollingX: true,
	    scrollingY: true,
	    animating: true,
	    animationDuration: 250,
	    bouncing: true,
	    locking: true,
	    paging: false,
	    snapping: false,
	    zooming: false,
	    minZoom: 0.5,
	    maxZoom: 3,
	    speedMultiplier: 1,
	    scrollingComplete: NOOP,
	    penetrationDeceleration: 0.03,
	    penetrationAcceleration: 0.08,
	    easingFunction: [easeInOutCubic, easeOutCubic]
	  };
	  for (var key in options) {
	    this.options[key] = options[key];
	  }
	};
	var easeOutCubic = function easeOutCubic(pos) {
	  return Math.pow(pos - 1, 3) + 1;
	};
	var easeInOutCubic = function easeInOutCubic(pos) {
	  if ((pos /= 0.5) < 1) {
	    return 0.5 * Math.pow(pos, 3);
	  }
	  return 0.5 * (Math.pow(pos - 2, 3) + 2);
	};
	Scroller.prototype = {
	  __isSingleTouch: false,
	  __isTracking: false,
	  __didDecelerationComplete: false,
	  __isGesturing: false,
	  __isDragging: false,
	  __isDecelerating: false,
	  __isAnimating: false,
	  __clientLeft: 0,
	  __clientTop: 0,
	  __clientWidth: 0,
	  __clientHeight: 0,
	  __contentWidth: 0,
	  __contentHeight: 0,
	  __snapWidth: 100,
	  __snapHeight: 100,
	  __zoomLevel: 1,
	  __scrollLeft: 0,
	  __scrollTop: 0,
	  __maxScrollLeft: 0,
	  __maxScrollTop: 0,
	  __scheduledLeft: 0,
	  __scheduledTop: 0,
	  __scheduledZoom: 0,
	  __lastTouchLeft: null,
	  __lastTouchTop: null,
	  __lastTouchMove: null,
	  __positions: null,
	  __minDecelerationScrollLeft: null,
	  __minDecelerationScrollTop: null,
	  __maxDecelerationScrollLeft: null,
	  __maxDecelerationScrollTop: null,
	  __decelerationVelocityX: null,
	  __decelerationVelocityY: null,
	  setDimensions: function setDimensions(clientWidth, clientHeight, contentWidth, contentHeight) {
	    if (clientWidth !== null) {
	      this.__clientWidth = clientWidth;
	    }
	    if (clientHeight !== null) {
	      this.__clientHeight = clientHeight;
	    }
	    if (contentWidth !== null) {
	      this.__contentWidth = contentWidth;
	    }
	    if (contentHeight !== null) {
	      this.__contentHeight = contentHeight;
	    }
	    this.__computeScrollMax();
	    this.scrollTo(this.__scrollLeft, this.__scrollTop, true);
	  },
	  setPosition: function setPosition(left, top) {
	    this.__clientLeft = left || 0;
	    this.__clientTop = top || 0;
	  },
	  stopAnimation: function stopAnimation() {
	    if (this.__isDecelerating) {
	      animate.stop(this.__isDecelerating);
	      this.__isDecelerating = false;
	      this.__interruptedAnimation = true;
	    }
	    if (this.__isAnimating) {
	      animate.stop(this.__isAnimating);
	      this.__isAnimating = false;
	      this.__interruptedAnimation = true;
	    }
	  },
	  setSnapSize: function setSnapSize(width, height) {
	    this.__snapWidth = width;
	    this.__snapHeight = height;
	  },
	  getValues: function getValues() {
	    return {
	      left: this.__scrollLeft,
	      top: this.__scrollTop,
	      right: this.__scrollLeft + this.__clientWidth / this.__zoomLevel,
	      bottom: this.__scrollTop + this.__clientHeight / this.__zoomLevel,
	      zoom: this.__zoomLevel
	    };
	  },
	  getPoint: function getPoint(scrollLeft, scrollTop) {
	    var values = this.getValues();
	    return {
	      left: scrollLeft / values.zoom,
	      top: scrollTop / values.zoom
	    };
	  },
	  getScrollMax: function getScrollMax() {
	    return {
	      left: this.__maxScrollLeft,
	      top: this.__maxScrollTop
	    };
	  },
	  zoomTo: function zoomTo(level, isAnimated, fixedLeft, fixedTop, callback) {
	    if (!this.options.zooming) {
	      throw new Error('Zooming is not enabled!');
	    }
	    if (callback) {
	      this.__zoomComplete = callback;
	    }
	    if (this.__isDecelerating) {
	      animate.stop(this.__isDecelerating);
	      this.__isDecelerating = false;
	    }
	    var oldLevel = this.__zoomLevel;
	    if (fixedLeft === undefined) {
	      fixedLeft = this.__clientWidth / 2;
	    }
	    if (fixedTop === undefined) {
	      fixedTop = this.__clientHeight / 2;
	    }
	    level = Math.max(Math.min(level, this.options.maxZoom), this.options.minZoom);
	    this.__computeScrollMax(level);
	    var k = level / oldLevel;
	    var left = k * (this.__scrollLeft + fixedLeft) - fixedLeft;
	    var top = k * (this.__scrollTop + fixedTop) - fixedTop;
	    if (left > this.__maxScrollLeft) {
	      left = this.__maxScrollLeft;
	    } else if (left < 0) {
	      left = 0;
	    }
	    if (top > this.__maxScrollTop) {
	      top = this.__maxScrollTop;
	    } else if (top < 0) {
	      top = 0;
	    }
	    this.__publish(left, top, level, isAnimated);
	  },
	  zoomBy: function zoomBy(factor, isAnimated, originLeft, originTop, callback) {
	    this.zoomTo(this.__zoomLevel * factor, isAnimated, originLeft, originTop, callback);
	  },
	  scrollTo: function scrollTo(left, top, isAnimated, zoom) {
	    if (this.__isDecelerating) {
	      animate.stop(this.__isDecelerating);
	      this.__isDecelerating = false;
	    }
	    if (zoom !== undefined && zoom !== this.__zoomLevel) {
	      if (!this.options.zooming) {
	        throw new Error('Zooming is not enabled!');
	      }
	      left *= zoom;
	      top *= zoom;
	      this.__computeScrollMax(zoom);
	    } else {
	      zoom = this.__zoomLevel;
	    }
	    if (!this.options.scrollingX) {
	      left = this.__scrollLeft;
	    } else {
	      if (this.options.paging) {
	        left = Math.round(left / this.__clientWidth) * this.__clientWidth;
	      } else if (this.options.snapping) {
	        left = Math.round(left / this.__snapWidth) * this.__snapWidth;
	      }
	    }
	    if (!this.options.scrollingY) {
	      top = this.__scrollTop;
	    } else {
	      if (this.options.paging) {
	        top = Math.round(top / this.__clientHeight) * this.__clientHeight;
	      } else if (this.options.snapping) {
	        top = Math.round(top / this.__snapHeight) * this.__snapHeight;
	      }
	    }
	    left = Math.max(Math.min(this.__maxScrollLeft, left), 0);
	    top = Math.max(Math.min(this.__maxScrollTop, top), 0);
	    if (left === this.__scrollLeft && top === this.__scrollTop) {
	      isAnimated = false;
	    }
	    this.__publish(left, top, zoom, isAnimated);
	  },
	  scrollBy: function scrollBy(left, top, isAnimated) {
	    var startLeft = this.__isAnimating ? this.__scheduledLeft : this.__scrollLeft;
	    var startTop = this.__isAnimating ? this.__scheduledTop : this.__scrollTop;
	    this.scrollTo(startLeft + (left || 0), startTop + (top || 0), isAnimated);
	  },
	  doMouseZoom: function doMouseZoom(wheelDelta, timeStamp, pageX, pageY) {
	    var change = wheelDelta > 0 ? 0.97 : 1.03;
	    return this.zoomTo(this.__zoomLevel * change, false, pageX - this.__clientLeft, pageY - this.__clientTop);
	  },
	  doTouchStart: function doTouchStart(touches, timeStamp) {
	    if (touches.length === undefined) {
	      throw new Error('Invalid touch list: ' + touches);
	    }
	    if (timeStamp instanceof Date) {
	      timeStamp = timeStamp.valueOf();
	    }
	    if (typeof timeStamp !== 'number') {
	      throw new Error('Invalid timestamp value: ' + timeStamp);
	    }
	    this.__interruptedAnimation = true;
	    if (this.__isDecelerating) {
	      animate.stop(this.__isDecelerating);
	      this.__isDecelerating = false;
	      this.__interruptedAnimation = true;
	    }
	    if (this.__isAnimating) {
	      animate.stop(this.__isAnimating);
	      this.__isAnimating = false;
	      this.__interruptedAnimation = true;
	    }
	    var currentTouchLeft, currentTouchTop;
	    var isSingleTouch = touches.length === 1;
	    if (isSingleTouch) {
	      currentTouchLeft = touches[0].pageX;
	      currentTouchTop = touches[0].pageY;
	    } else {
	      currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
	      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
	    }
	    this.__initialTouchLeft = currentTouchLeft;
	    this.__initialTouchTop = currentTouchTop;
	    this.__zoomLevelStart = this.__zoomLevel;
	    this.__lastTouchLeft = currentTouchLeft;
	    this.__lastTouchTop = currentTouchTop;
	    this.__lastTouchMove = timeStamp;
	    this.__lastScale = 1;
	    this.__enableScrollX = !isSingleTouch && this.options.scrollingX;
	    this.__enableScrollY = !isSingleTouch && this.options.scrollingY;
	    this.__isTracking = true;
	    this.__didDecelerationComplete = false;
	    this.__isDragging = !isSingleTouch;
	    this.__isSingleTouch = isSingleTouch;
	    this.__positions = [];
	  },
	  doTouchMove: function doTouchMove(touches, timeStamp, scale) {
	    if (touches.length === undefined) {
	      throw new Error('Invalid touch list: ' + touches);
	    }
	    if (timeStamp instanceof Date) {
	      timeStamp = timeStamp.valueOf();
	    }
	    if (typeof timeStamp !== 'number') {
	      throw new Error('Invalid timestamp value: ' + timeStamp);
	    }
	    if (!this.__isTracking) {
	      return;
	    }
	    var currentTouchLeft, currentTouchTop;
	    if (touches.length === 2) {
	      currentTouchLeft = Math.abs(touches[0].pageX + touches[1].pageX) / 2;
	      currentTouchTop = Math.abs(touches[0].pageY + touches[1].pageY) / 2;
	    } else {
	      currentTouchLeft = touches[0].pageX;
	      currentTouchTop = touches[0].pageY;
	    }
	    var positions = this.__positions;
	    if (this.__isDragging) {
	      var moveX = currentTouchLeft - this.__lastTouchLeft;
	      var moveY = currentTouchTop - this.__lastTouchTop;
	      var scrollLeft = this.__scrollLeft;
	      var scrollTop = this.__scrollTop;
	      var level = this.__zoomLevel;
	      if (scale !== undefined && this.options.zooming) {
	        var oldLevel = level;
	        level = level / this.__lastScale * scale;
	        level = Math.max(Math.min(level, this.options.maxZoom), this.options.minZoom);
	        if (oldLevel !== level) {
	          var currentTouchLeftRel = currentTouchLeft - this.__clientLeft;
	          var currentTouchTopRel = currentTouchTop - this.__clientTop;
	          scrollLeft = (currentTouchLeftRel + scrollLeft) * level / oldLevel - currentTouchLeftRel;
	          scrollTop = (currentTouchTopRel + scrollTop) * level / oldLevel - currentTouchTopRel;
	          this.__computeScrollMax(level);
	        }
	      }
	      if (this.__enableScrollX) {
	        scrollLeft -= moveX * this.options.speedMultiplier;
	        var maxScrollLeft = this.__maxScrollLeft;
	        if (scrollLeft > maxScrollLeft || scrollLeft < 0) {
	          if (this.options.bouncing) {
	            scrollLeft += moveX / 2 * this.options.speedMultiplier;
	          } else if (scrollLeft > maxScrollLeft) {
	            scrollLeft = maxScrollLeft;
	          } else {
	            scrollLeft = 0;
	          }
	        }
	      }
	      if (this.__enableScrollY) {
	        scrollTop -= moveY * this.options.speedMultiplier;
	        var maxScrollTop = this.__maxScrollTop;
	        if (scrollTop > maxScrollTop || scrollTop < 0) {
	          if (this.options.bouncing) {
	            scrollTop += moveY / 2 * this.options.speedMultiplier;
	          } else if (scrollTop > maxScrollTop) {
	            scrollTop = maxScrollTop;
	          } else {
	            scrollTop = 0;
	          }
	        }
	      }
	      if (positions.length > 60) {
	        positions.splice(0, 30);
	      }
	      positions.push(scrollLeft, scrollTop, timeStamp);
	      this.__publish(scrollLeft, scrollTop, level);
	    } else {
	      var minimumTrackingForScroll = this.options.locking ? 3 : 0;
	      var minimumTrackingForDrag = 5;
	      var distanceX = Math.abs(currentTouchLeft - this.__initialTouchLeft);
	      var distanceY = Math.abs(currentTouchTop - this.__initialTouchTop);
	      this.__enableScrollX = this.options.scrollingX && distanceX >= minimumTrackingForScroll;
	      this.__enableScrollY = this.options.scrollingY && distanceY >= minimumTrackingForScroll;
	      positions.push(this.__scrollLeft, this.__scrollTop, timeStamp);
	      this.__isDragging = (this.__enableScrollX || this.__enableScrollY) && (distanceX >= minimumTrackingForDrag || distanceY >= minimumTrackingForDrag);
	      if (this.__isDragging) {
	        this.__interruptedAnimation = false;
	      }
	    }
	    this.__lastTouchLeft = currentTouchLeft;
	    this.__lastTouchTop = currentTouchTop;
	    this.__lastTouchMove = timeStamp;
	    this.__lastScale = scale;
	  },
	  doTouchEnd: function doTouchEnd(timeStamp) {
	    if (timeStamp instanceof Date) {
	      timeStamp = timeStamp.valueOf();
	    }
	    if (typeof timeStamp !== 'number') {
	      throw new Error('Invalid timestamp value: ' + timeStamp);
	    }
	    if (!this.__isTracking) {
	      return;
	    }
	    this.__isTracking = false;
	    if (this.__isDragging) {
	      this.__isDragging = false;
	      if (this.__isSingleTouch && this.options.animating && timeStamp - this.__lastTouchMove <= 100) {
	        var positions = this.__positions;
	        var endPos = positions.length - 1;
	        var startPos = endPos;
	        for (var i = endPos; i > 0 && positions[i] > this.__lastTouchMove - 100; i -= 3) {
	          startPos = i;
	        }
	        if (startPos !== endPos) {
	          var timeOffset = positions[endPos] - positions[startPos];
	          var movedLeft = this.__scrollLeft - positions[startPos - 2];
	          var movedTop = this.__scrollTop - positions[startPos - 1];
	          this.__decelerationVelocityX = movedLeft / timeOffset * (1000 / 60);
	          this.__decelerationVelocityY = movedTop / timeOffset * (1000 / 60);
	          var minVelocityToStartDeceleration = this.options.paging || this.options.snapping ? 4 : 1;
	          if (Math.abs(this.__decelerationVelocityX) > minVelocityToStartDeceleration || Math.abs(this.__decelerationVelocityY) > minVelocityToStartDeceleration) {
	            this.__startDeceleration(timeStamp);
	          }
	        } else {
	          this.options.scrollingComplete();
	        }
	      } else if (timeStamp - this.__lastTouchMove > 100) {
	        this.options.scrollingComplete();
	      }
	    }
	    if (!this.__isDecelerating) {
	      if (this.__interruptedAnimation || this.__isDragging) {
	        this.options.scrollingComplete();
	      }
	      this.scrollTo(this.__scrollLeft, this.__scrollTop, true, this.__zoomLevel);
	    }
	    this.__positions.length = 0;
	  },
	  __publish: function __publish(left, top, zoom, isAnimated) {
	    var wasAnimating = this.__isAnimating;
	    if (wasAnimating) {
	      animate.stop(wasAnimating);
	      this.__isAnimating = false;
	    }
	    if (isAnimated && this.options.animating) {
	      this.__scheduledLeft = left;
	      this.__scheduledTop = top;
	      this.__scheduledZoom = zoom;
	      var oldLeft = this.__scrollLeft;
	      var oldTop = this.__scrollTop;
	      var oldZoom = this.__zoomLevel;
	      var diffLeft = left - oldLeft;
	      var diffTop = top - oldTop;
	      var diffZoom = zoom - oldZoom;
	      var step = function (percent, now, render) {
	        if (render) {
	          this.__scrollLeft = oldLeft + diffLeft * percent;
	          this.__scrollTop = oldTop + diffTop * percent;
	          this.__zoomLevel = oldZoom + diffZoom * percent;
	          if (this.__callback) {
	            this.__callback(this.__scrollLeft, this.__scrollTop, this.__zoomLevel);
	          }
	        }
	      }.bind(this);
	      var verify = function (id) {
	        return this.__isAnimating === id;
	      }.bind(this);
	      var completed = function (renderedFramesPerSecond, animationId, wasFinished) {
	        if (animationId === this.__isAnimating) {
	          this.__isAnimating = false;
	        }
	        if (this.__didDecelerationComplete || wasFinished) {
	          this.options.scrollingComplete();
	        }
	        if (this.options.zooming) {
	          this.__computeScrollMax();
	          if (this.__zoomComplete) {
	            this.__zoomComplete();
	            this.__zoomComplete = null;
	          }
	        }
	      }.bind(this);
	      var easingFunc = !wasAnimating ? this.options.easingFunction[0] : this.options.easingFunction[1] || this.options.easingFunction[0];
	      this.__isAnimating = animate.start(step, verify, completed, this.options.animationDuration, easingFunc);
	    } else {
	      this.__scheduledLeft = this.__scrollLeft = left;
	      this.__scheduledTop = this.__scrollTop = top;
	      this.__scheduledZoom = this.__zoomLevel = zoom;
	      if (this.__callback) {
	        this.__callback(left, top, zoom);
	      }
	      if (this.options.zooming) {
	        this.__computeScrollMax();
	        if (this.__zoomComplete) {
	          this.__zoomComplete();
	          this.__zoomComplete = null;
	        }
	      }
	    }
	  },
	  __computeScrollMax: function __computeScrollMax(zoomLevel) {
	    if (zoomLevel === undefined) {
	      zoomLevel = this.__zoomLevel;
	    }
	    this.__maxScrollLeft = Math.max(this.__contentWidth * zoomLevel - this.__clientWidth, 0);
	    this.__maxScrollTop = Math.max(this.__contentHeight * zoomLevel - this.__clientHeight, 0);
	  },
	  __startDeceleration: function __startDeceleration(timeStamp) {
	    if (this.options.paging) {
	      var scrollLeft = Math.max(Math.min(this.__scrollLeft, this.__maxScrollLeft), 0);
	      var scrollTop = Math.max(Math.min(this.__scrollTop, this.__maxScrollTop), 0);
	      var clientWidth = this.__clientWidth;
	      var clientHeight = this.__clientHeight;
	      this.__minDecelerationScrollLeft = Math.floor(scrollLeft / clientWidth) * clientWidth;
	      this.__minDecelerationScrollTop = Math.floor(scrollTop / clientHeight) * clientHeight;
	      this.__maxDecelerationScrollLeft = Math.ceil(scrollLeft / clientWidth) * clientWidth;
	      this.__maxDecelerationScrollTop = Math.ceil(scrollTop / clientHeight) * clientHeight;
	    } else {
	      this.__minDecelerationScrollLeft = 0;
	      this.__minDecelerationScrollTop = 0;
	      this.__maxDecelerationScrollLeft = this.__maxScrollLeft;
	      this.__maxDecelerationScrollTop = this.__maxScrollTop;
	    }
	    var step = function (percent, now, render) {
	      this.__stepThroughDeceleration(render);
	    }.bind(this);
	    var minVelocityToKeepDecelerating = this.options.snapping ? 4 : 0.1;
	    var verify = function () {
	      var shouldContinue = Math.abs(this.__decelerationVelocityX) >= minVelocityToKeepDecelerating || Math.abs(this.__decelerationVelocityY) >= minVelocityToKeepDecelerating;
	      if (!shouldContinue) {
	        this.__didDecelerationComplete = true;
	      }
	      return shouldContinue;
	    }.bind(this);
	    var completed = function (renderedFramesPerSecond, animationId, wasFinished) {
	      this.__isDecelerating = false;
	      if (this.__didDecelerationComplete) {
	        this.options.scrollingComplete();
	      }
	      this.scrollTo(this.__scrollLeft, this.__scrollTop, this.options.snapping);
	    }.bind(this);
	    this.__isDecelerating = animate.start(step, verify, completed);
	  },
	  __stepThroughDeceleration: function __stepThroughDeceleration(render) {
	    var scrollLeft = this.__scrollLeft + this.__decelerationVelocityX;
	    var scrollTop = this.__scrollTop + this.__decelerationVelocityY;
	    if (!this.options.bouncing) {
	      var scrollLeftFixed = Math.max(Math.min(this.__maxDecelerationScrollLeft, scrollLeft), this.__minDecelerationScrollLeft);
	      if (scrollLeftFixed !== scrollLeft) {
	        scrollLeft = scrollLeftFixed;
	        this.__decelerationVelocityX = 0;
	      }
	      var scrollTopFixed = Math.max(Math.min(this.__maxDecelerationScrollTop, scrollTop), this.__minDecelerationScrollTop);
	      if (scrollTopFixed !== scrollTop) {
	        scrollTop = scrollTopFixed;
	        this.__decelerationVelocityY = 0;
	      }
	    }
	    if (render) {
	      this.__publish(scrollLeft, scrollTop, this.__zoomLevel);
	    } else {
	      this.__scrollLeft = scrollLeft;
	      this.__scrollTop = scrollTop;
	    }
	    if (!this.options.paging) {
	      var frictionFactor = 0.95;
	      this.__decelerationVelocityX *= frictionFactor;
	      this.__decelerationVelocityY *= frictionFactor;
	    }
	    if (this.options.bouncing) {
	      var scrollOutsideX = 0;
	      var scrollOutsideY = 0;
	      var penetrationDeceleration = this.options.penetrationDeceleration;
	      var penetrationAcceleration = this.options.penetrationAcceleration;
	      if (scrollLeft < this.__minDecelerationScrollLeft) {
	        scrollOutsideX = this.__minDecelerationScrollLeft - scrollLeft;
	      } else if (scrollLeft > this.__maxDecelerationScrollLeft) {
	        scrollOutsideX = this.__maxDecelerationScrollLeft - scrollLeft;
	      }
	      if (scrollTop < this.__minDecelerationScrollTop) {
	        scrollOutsideY = this.__minDecelerationScrollTop - scrollTop;
	      } else if (scrollTop > this.__maxDecelerationScrollTop) {
	        scrollOutsideY = this.__maxDecelerationScrollTop - scrollTop;
	      }
	      if (scrollOutsideX !== 0) {
	        if (scrollOutsideX * this.__decelerationVelocityX <= 0) {
	          this.__decelerationVelocityX += scrollOutsideX * penetrationDeceleration;
	        } else {
	          this.__decelerationVelocityX = scrollOutsideX * penetrationAcceleration;
	        }
	      }
	      if (scrollOutsideY !== 0) {
	        if (scrollOutsideY * this.__decelerationVelocityY <= 0) {
	          this.__decelerationVelocityY += scrollOutsideY * penetrationDeceleration;
	        } else {
	          this.__decelerationVelocityY = scrollOutsideY * penetrationAcceleration;
	        }
	      }
	    }
	  }
	};

	return Scroller;

})));
