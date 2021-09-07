/*!
 * Name: tinyjs-plugin-easy-animation
 * Description: a easy way to use tiny tween animation
 * Author: zhaizheng.zz
 * Version: v0.1.1
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var xEval = function xEval(operation) {
    var FN = Function;
    return new FN('return ' + operation)();
  };
  var parsePercent = function parsePercent(percentValue) {
    return percentValue.slice(0, -1) / 100;
  };
  var isUndefined = function isUndefined(value) {
    return value === void 0;
  };
  var deepCloneConfig = function deepCloneConfig(config) {
    var configClone = {};
    for (var key in config) {
      if (config.hasOwnProperty(key)) {
        if (config[key] && _typeof(config[key]) === 'object') {
          if (Array.isArray(config[key])) {
            configClone[key] = config[key].map(function (item) {
              if ((typeof item === 'undefined' ? 'undefined' : _typeof(item)) === 'object') {
                return deepCloneConfig(item);
              }
              return item;
            });
          } else {
            configClone[key] = deepCloneConfig(config[key]);
          }
        } else {
          configClone[key] = config[key];
        }
      }
    }
    return configClone;
  };
  var xRequestAnimationFrame = function xRequestAnimationFrame(callback) {
    if (navigator.canUseBinding) {
      return setTimeout(function () {
        callback && callback();
      }, 0);
    } else {
      return window.requestAnimationFrame(function () {
        callback && callback();
      });
    }
  };
  var xCancelAnimationFrame = function xCancelAnimationFrame(handler) {
    if (navigator.canUseBinding) {
      clearTimeout(handler);
    } else {
      window.cancelAnimationFrame(handler);
    }
  };
  var getParentRelativePosValue = function getParentRelativePosValue(displayObject, property, targetValue, toValue, clipIndex) {
    displayObject.displayObjectUpdateTransform();
    var operator = toValue < targetValue ? '-' : '+';
    var localValue = void 0;
    var deltaValue = toValue - targetValue;
    if (property === 'position.x') {
      localValue = displayObject.localTransform.tx;
    } else {
      localValue = displayObject.localTransform.ty;
    }
    toValue = '' + operator + Math.abs(deltaValue);
    if (clipIndex === 0) {
      displayObject.__easyAnimationOperation = toValue;
      return { targetValue: localValue, toValue: toValue };
    } else {
      var _targetValue = xEval('' + localValue + displayObject.__easyAnimationOperation);
      displayObject.__easyAnimationOperation += toValue;
      return { targetValue: _targetValue, toValue: toValue };
    }
  };

  /**
   * @name        tinyjs-plugin-easy-animation
   * @overview    a easy way to use tiny tween animation
   * @author      zhaizheng.zz
   * @license     MIT
   */
  var ANIMATION_FILL_MODE = {
    'FORWARDS': 'forwards',
    'BACKWARDS': 'backwards'
  };
  var EasyAnimation = function () {
    function EasyAnimation(displayObject) {
      classCallCheck(this, EasyAnimation);
      this.pluginName = 'easyAnimation';
      this.displayObject = displayObject;
      this.tweenGroup = new Tiny.TWEEN.Group();
      this.tweenAnimationCache = {};
      this.playingAimationCompleteTimes = {};
      this.playingAnimation = '';
      this.playTimes = 1;
      this.chainAnimationCompleteTimes = 0;
      this.playing = false;
      this.useRelativePositionValue = false;
      this.animationFillMode = 'forwards';
    }
    createClass(EasyAnimation, [{
      key: 'setAnimationConfig',
      value: function setAnimationConfig(config, useRelativePositionValue) {
        var _this = this;
        this.displayObject.updateTransform = function () {
          _this.tweenGroup.update();
          _this.displayObject.containerUpdateTransform.call(_this.displayObject);
        };
        this.useRelativePositionValue = useRelativePositionValue;
        var tweenConfigs = this.__parseAnimationConfig(deepCloneConfig(config));
        this.__createTween(tweenConfigs);
      }
    }, {
      key: 'play',
      value: function play(animationName, playTimes, animationFillMode) {
        var animations = this.tweenAnimationCache[animationName];
        if (!animations) {
          throw new Error('can not find animationName {' + animationName + '} in your configs.');
        }
        if (this.playing) {
          return;
        }
        if (typeof playTimes === 'number') {
          this.playTimes = playTimes || 1;
        }
        if (typeof playTimes === 'string') {
          this.animationFillMode = playTimes;
        }
        if (animationFillMode) {
          this.animationFillMode = animationFillMode;
        }
        this.playingAnimation = animationName;
        this.playing = true;
        this.__playAnimation(animationName);
      }
    }, {
      key: 'stop',
      value: function stop() {
        var animations = this.tweenGroup.getAll();
        animations.forEach(function (animation) {
          animation.stop();
        });
        this.playing = false;
        this.__setAnimationClipCompleteTimes(this.playingAnimation, 0);
        this.playingAnimation = '';
        this.playTimes = 1;
      }
    }, {
      key: 'clear',
      value: function clear() {
        this.tweenAnimationCache = {};
        this.tweenGroup.removeAll();
        this.playingAnimation = '';
        this.playingAimationCompleteTimes = {};
        this.playTimes = 1;
        this.playing = false;
      }
    }, {
      key: '__playAnimation',
      value: function __playAnimation(animationName) {
        var animations = this.tweenAnimationCache[animationName];
        animations.forEach(function (animation) {
          animation.start();
        });
      }
    }, {
      key: '__createTween',
      value: function __createTween(tweenConfigs) {
        var _this2 = this;
        var animationNames = Object.keys(tweenConfigs);
        animationNames.forEach(function (animationName) {
          var tweenConfig = tweenConfigs[animationName];
          var propertyKeys = Object.keys(tweenConfig);
          var displayObjectInitProperty = {};
          _this2.tweenAnimationCache[animationName] = propertyKeys.map(function (property) {
            var configs = tweenConfig[property];
            var tweenCount = 0;
            var firstTween = null;
            var tweenAnimation = configs.reduce(function (prevItem, curItem, index) {
              var property = curItem.property,
                  target = curItem.target,
                  to = curItem.to,
                  easeFunction = curItem.easeFunction,
                  duration = curItem.duration,
                  delay = curItem.delay;
              var _updateProperty = property.split('.');
              var _easeFunction = easeFunction.split('.').reduce(function (prev, cur) {
                return prev[cur];
              }, Tiny.TWEEN.Easing);
              var tween = new Tiny.TWEEN.Tween(target, _this2.tweenGroup);
              var initValue = target[property];
              _this2.__cacheDisplayObjectInitPropertyValue(_updateProperty, property, displayObjectInitProperty);
              tween.animationName = animationName;
              tween.to(to, duration);
              tween.easing(_easeFunction);
              tween.delay(delay);
              tween.onUpdate(function () {
                _this2.__updateDisplayObjectProperty(_updateProperty, target[property]);
              });
              tween.onComplete(function (data) {
                var playingAnimations = _this2.tweenAnimationCache[_this2.playingAnimation];
                if (!playingAnimations) {
                  return;
                }
                var animationTotalCount = playingAnimations.reduce(function (prev, cur) {
                  return prev + cur.tweenCount;
                }, 0);
                var animationPlayCount = animationTotalCount * _this2.playTimes;
                _this2.__setAnimationClipCompleteTimes(_this2.playingAnimation);
                _this2.displayObject.emit('onAnimationClipEnd', data);
                target[property] = initValue;
                var clipCompleteTimes = _this2.__getAnimationClipCompleteTimes(_this2.playingAnimation);
                if (_this2.playTimes === Infinity) {
                  if (animationTotalCount === clipCompleteTimes) {
                    _this2.__setAnimationClipCompleteTimes(_this2.playingAnimation, 0);
                    var rafId = xRequestAnimationFrame(function () {
                      _this2.__playAnimation(_this2.playingAnimation);
                      xCancelAnimationFrame(rafId);
                    });
                  }
                } else {
                  if (clipCompleteTimes % animationTotalCount === 0 && _this2.playTimes > _this2.chainAnimationCompleteTimes + 1) {
                    _this2.chainAnimationCompleteTimes++;
                    var _rafId = xRequestAnimationFrame(function () {
                      _this2.__playAnimation(_this2.playingAnimation);
                      xCancelAnimationFrame(_rafId);
                    });
                  }
                  if (clipCompleteTimes === animationPlayCount) {
                    _this2.playing = false;
                    _this2.__setAnimationClipCompleteTimes(_this2.playingAnimation, 0);
                    _this2.playTimes = 1;
                    _this2.chainAnimationCompleteTimes = 0;
                    if (_this2.animationFillMode === ANIMATION_FILL_MODE.BACKWARDS) {
                      Object.keys(displayObjectInitProperty).forEach(function (key) {
                        var _updateProperty = key.split('.');
                        _this2.__updateDisplayObjectProperty(_updateProperty, displayObjectInitProperty[key]);
                      });
                    }
                    _this2.displayObject.emit('onAnimationEnd', _this2.playingAnimation);
                  }
                }
              });
              tweenCount++;
              if (!prevItem) {
                firstTween = tween;
                return tween;
              }
              prevItem.chain(tween);
              if (!configs[index + 1]) {
                return firstTween;
              } else {
                return tween;
              }
            }, null);
            tweenAnimation.tweenCount = tweenCount;
            return tweenAnimation;
          });
        });
      }
    }, {
      key: '__getAnimationClipCompleteTimes',
      value: function __getAnimationClipCompleteTimes(animationName) {
        return this.playingAimationCompleteTimes[animationName];
      }
    }, {
      key: '__setAnimationClipCompleteTimes',
      value: function __setAnimationClipCompleteTimes(animationName, times) {
        if (!isUndefined(times)) {
          this.playingAimationCompleteTimes[animationName] = times;
          return;
        }
        if (this.playingAimationCompleteTimes[animationName]) {
          this.playingAimationCompleteTimes[animationName]++;
        } else {
          this.playingAimationCompleteTimes[animationName] = 1;
        }
      }
    }, {
      key: '__updateDisplayObjectProperty',
      value: function __updateDisplayObjectProperty(updatePropertyList, value) {
        if (updatePropertyList.length > 1) {
          this.displayObject[updatePropertyList[0]][updatePropertyList[1]] = value;
          return;
        }
        this.displayObject[updatePropertyList[0]] = value;
      }
    }, {
      key: '__cacheDisplayObjectInitPropertyValue',
      value: function __cacheDisplayObjectInitPropertyValue(_updateProperty, property, map) {
        if (_updateProperty.length > 1) {
          map[property] = this.displayObject[_updateProperty[0]][_updateProperty[1]];
        } else {
          map[property] = this.displayObject[_updateProperty[0]];
        }
        return map;
      }
    }, {
      key: '__parseAnimationConfig',
      value: function __parseAnimationConfig(config) {
        var _this3 = this;
        var animationNames = Object.keys(config);
        var tweenParams = {};
        var tweenConfigs = {};
        animationNames.forEach(function (animationName) {
          var curAnimationConfig = config[animationName];
          curAnimationConfig.forEach(function (animation) {
            var property = animation.property,
                _animation$easeFuncti = animation.easeFunction,
                easeFunction = _animation$easeFuncti === undefined ? 'Linear.None' : _animation$easeFuncti,
                duration = animation.duration,
                clips = animation.clips;
            clips.map(function (item) {
              var percent = item.percent;
              if (percent) {
                item.percent = parsePercent(percent);
              }
              if (property === 'rotation') {
                item.value = Tiny.deg2radian(item.value);
              }
              return item;
            }).sort(function (a, b) {
              if (!isUndefined(a.startTime) && !isUndefined(b.startTime)) {
                return a.startTime - b.startTime;
              }
              return a.percent - b.percent;
            }).forEach(function (clip, index) {
              if (!clips[index + 1]) {
                return;
              }
              var _duration = clips[index + 1].startTime - clip.startTime;
              var targetValue = clip.value;
              var toValue = clips[index + 1].value;
              if (!isUndefined(clip.percent) && !isUndefined(clips[index + 1].percent)) {
                _duration = clips[index + 1].percent * duration - clip.percent * duration;
              }
              if (!_duration) {
                throw new Error('animation clips property startTime or percent is required!');
              }
              if (_this3.useRelativePositionValue && (property === 'position.x' || property === 'position.y')) {
                var values = getParentRelativePosValue(_this3.displayObject, property, targetValue, toValue, index);
                targetValue = values.targetValue;
                toValue = values.toValue;
              }
              var param = {
                property: property,
                target: defineProperty({}, property, targetValue),
                to: defineProperty({}, property, toValue),
                duration: _duration,
                easeFunction: clip.easeFunction || easeFunction,
                delay: clip.delay || 0
              };
              if (tweenParams[property]) {
                tweenParams[property].push(param);
              } else {
                tweenParams[property] = [param];
              }
            });
          });
          tweenConfigs[animationName] = tweenParams;
          tweenParams = {};
        });
        return tweenConfigs;
      }
    }]);
    return EasyAnimation;
  }();
  Tiny.DisplayObject.registerPlugin('easyAnimation', EasyAnimation);

})));
