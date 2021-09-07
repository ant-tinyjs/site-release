/*!
 * Name: tinyjs-plugin-transformable
 * Description: The Tiny.js plugin for transform something
 * Author: yiiqii
 * Version: v0.1.0
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Tiny = global.Tiny || {}, global.Tiny.Transformable = factory());
}(this, (function () { 'use strict';

  var REMOVE_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABNVBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////YGTPaITr86evbJT764OP3z9T0uMDjU2fdNEvcLETZHjfZHDb/+/v+9/j97/H409j3ytDrhJLhSl7fPlTeOU/cMEj+8/T75Of529/519v2x830vsXysbryrrfwpK/woqzumKTsi5jnbH3lYXPbKUH87e/52t71wsnocoLgQ1jzs7zxqbPvnqntkp/peIfjWmxcOTleAAAANnRSTlMA/Pnv/rtuKCTxpEtDBOLd2tPKtpyORzQuEA307OXEvq6UiXJmVxsXEwmyqIF+eGFQPh8G1cwBBg/JAAACgklEQVRIx5XV6VbiQBAF4Ar7KiIiiPu+6+jM3KCIG+67oCPojDrr+z/CdBpOoOkCku8HnHBySdLVVaFOluaD2dDCZ3IhF01PjEEyEqnVTUfhpbmUAdVIZKhXKj47Bk7yU9fYXD86Gd/smAoOoJvJRT4W9aK7RJaLrRvoZUR/yngEDvjW2nODcCagxmbgkKGUMmrAKW+wpQBhONc/bOf8cCNNDUNwxbPVyCVhK1ROoCsVd9EiQtIGbHd58/pei51cmGaltYoZmeuD7Ztpmq+7UG1fil9raJEiIYamQl6csvOgxG6vTKGoFHFe5JQNdrYjzsmX0XS3L345eoJiRuTULjg9EKcd/rSP7+XxI1QTRBmoflxb//8Ldbuv1vWLWimW9J1Z2DeF37A8yNt+gyYmG4FZP/MPgLJcpjO2Lcah+f5hBc9RORRfB6dgTInq6W4urODekfi4vgNnmUbBON4z664KYE2QB2zwRcYut8EbEDnWucztHXfMjYLzV4Rk8IbP+SnBja2alZF1vDjhZzDX6yX5cC+lqil8sI84TVP6mvwzhVoJeJZLesvkZmlWK56swbtP9uORdb9MLTIU0ptbbpa6R7lltBEQjhP1MZuzah8X89wIWCaitN7cz2h6Y0YANkQu27qjG82tjwDliiM5EgaUuSSbWx8B72gxSG2D6UxvbjkC1Fv3zJOUgq18zrXbdvXJpxS9LmvAjdFh7aXp8tW5mHAR88fJFvS6f/1JQ04f0RsiRcBZzIhRm4CTK4ajpIl5ez9bkBihL71WcphYuSlPt3tcj1MnoRUfeJ70InWT8bPLGNmiXkJrybbQeGCBHFmYm55MjoU93r6vK6vRHDH+Azzf77qpXzbkAAAAAElFTkSuQmCC';
  var ZOOM_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA2CAMAAABUWfHRAAAA9lBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////YGTP/+/v86+3lZHbaJT7cK0P51tv74+b3y9Hqf43kYHLumqb1v8bfP1X++Pn+8/Ttj5zaITr63eH40dbulqLsipjma3vdNEr//f3ztr7xrbbvoKvqfotfJiWrAAAANHRSTlMA+t0FEgP21w8LCPLtzsW/lm5Qu3tUH+7q5rSfm5GMYl9CNCwZybmupYlnS0U8Lad1c3En87nDZgAAAfhJREFUSMet0sdi4jAQgOFxwXSw6R1Cets6goVki0kgddv7v8wusuNIxpLnkP/ky2dpJMFbVthrnBx2i2iUzKrrvaOh3LhuoFSpf5FJU/apgwmZE63MN4qoKNtUs0kHNZUVg1ou6nMSlzyoYGqj3SmnXSRUz8dYq4OkevKKuSwSc0Vm1ZGcJ7ghKrqdv3aDQXsR2zcUbM2ENn74AqIRj1DRiok9YdBZyM5R1Z+N6L5gUCfHWUZ3ljPeX8nhKXc1TOsbk12R3/4xia0Eh5PtlRsU9v1BdEd8mxQ2+yE6pwAwJDEUHb/7ConF3EeAEoXF3QByOvYrZDuuCi2dewjZjivDvs7NV+wpYOgztsYokztNt9GX/3smOHmfV4/3EbhDTWX5XJ7ZIvzp1yUfR1UVoC08fsbYPGALxti12vUBKjEXsecbtfsA4MZdyJZXqO4CoBZzFGYUAGxDdgSGdfhfT3YEhuOta0rOJzAnv3WWKToCwyHwaqIjsLYNQVXJLf1rnvL6PkHYNHJii/tkZlrw0gB5P5nUOtmdQ1QhfGyPG4Gt7hJZA4RsE4n1Qepzm8aqFshdliisYkO8VjmdDSzYLX+SoowzSM4r6lh2CqrskaNS5jgDmg5cI0l1PT6ZVnqHMeQcNwtAya6NetntrEap/L5xGS5FLq9Z5R/gTsBPh18U3QAAAABJRU5ErkJggg==';
  var ROTATE_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA3CAMAAACfBSJ0AAABPlBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////YGTPdMkn30NXZGzX//f3+9vf86Ovxq7XfPlPaIjv++Pn63+P3zNL0vcTwoazumaTbJj/97/H2x83ysLnrh5Xnb3/kX3HiUWXgRlveOlDcKkLZHTf98fP40tjtj5zsipfrhZPqgpDpd4fmaHnlZHbkW27jVGf+9PX64uX52N31wsnulqLodYThSV7fPlTcMEfZHzjZHjf98/TvnKjlYXPfQVdDI8zxAAAAM3RSTlMA+bPxJyILA/vr6LyagDMeFg0G0ZKOiWlfWlNGOjcB9drLwq2lhHVwTC7ft3o/Ghnj4EnYJz4cAAACyElEQVRIx5WW51oiMRSGA9IFQQEVFHuvu3tmZKQtTWBBF3vBvuqW+7+BTSgzJ2EG4vsv3zPvk+TkJECscAUdY479CfIJxjeiSz5o41mw7yTcMtJE3G4DHm9kbJg1F9sCM7Y3B2ozi2CBZyVoaYW2YQC2wJy5tvkVBrPsMtPi8zCMsLNfWwMJvAlRmwYpvMKMszaQI8ztMegDWeyoqhP6sR2dDhUDhrfey9LN96r+gXZkfo5OvY+9vSyjKK/AeLxsqE2lqbZK3/vElZ63qkeqomTYtMeKQeNAFLtdvjfPe6k7hefmN++NdrwocF6hrDA+Tlo3rZOO+EtY7CzT3D7OU7Psy+NipygPJZUNf/Kin3nfgPOS9LNy0YgOz1mS4c5nhD0fEc5jqA+AaS+8Dphd6oVFL/tSq9UuKkb61KTpk3D248B5Osm8ET+zHQsVTeBxRjH4Y8Qaq2seffdFuEDFpK6pKZSnaXAJCJdwX1MHXc4OcXz6QQ8RB07aZDI06IY1NN4kUSnvB11oiuuYSSnvinpnXGvvSHnX1MO95iBTgMilq5qpV6cerlSIzAjbuDL13mhv4wYlJAgIer7lnImWp9PdovEiIXNeoWwli3KmhYu0jMYV1tapPu0xSWP8SsUI4QvT0BeEuP9H0wuchKgX8uCNsAZ94Wuau2M3/r7vgbED4kKh1HHJU6/sVhUAMc00/iS0OhPV0qH+TJRZ8AwIn4u0GRVXxdZ1na4cFIq3WYVRA8wU6TAGGO1KEchWAbOg/y9ZAY7KMbaSN8LrGSc9nMJPtFb4+9613q7FZ36JGMRAJJcvnl+Wqmcg4gsSxCRIYpslGLdd0psW/8uFpbRJIjIuMaNnnfTjHrrHkRliSsw2UFtwEAscywMmC7iINYkli/JHQmQwG6Oe/rn8TjKcvXX7CJK2/HHpf+dux8baasQfDUzt7hNT/gOKANI4PmQ+0QAAAABJRU5ErkJggg==';
  var FLIPX_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAA4CAMAAABuU5ChAAABMlBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////YGTP0v8bumKPyr7jjVmnxqbP/+/vbJD3ZHDb+9vf87e/86ezcL0baIDnsipjncIDmanvjWWviUGPhSV7fPFL63+P41Nn3ztP1wsn1wcjvnantkZ7cKkL98/T98PL75Of52d340df2ytDysbrulaHrhZPqgI7lZHbkXW/gQljeOE/64uX2yc/zt7/wpK/qg5HpeYiG6FF/AAAANHRSTlMACPTsDgH74MePFtbDclgjEgW2mXt3Y0E7NC7izpSHgmpOKyAd+O7m3dC9sKSfVDGpoV1bAT3B8QAAAqxJREFUSMeV1gdX4kAQwPExIRTpHbH3s1+Z6J2RIoq917OcXv3+X+E2OAqzuwn4f08gxN8LjgsseGWlJssTUwF4T8nC4pCBrcxwNtHfE5rKR1EqVuh63f7hIGqayff5qb6cgR6FPluebHwQfRoqe7Ac+meMa1/jInYtrxlIGHvoU1q+mo45qJSV3BIqVXftJiqNMRZHtXXbto9QLljsYMWgxq0Jt4pK5mT7jwth7w4XlFfpnD3UPN3qvxN6VCIWMOmJLdt+vvBwv8XRFS1zcqNI7YhzTb2rn4uj73Twsm5Sb2v5my1aZ46d+koHcy03huzkxoHGndmdDgdcF+bO3nMUd1ThLuIuTJScfS+7i2ebu0HhEoqzjyXXtCWHSYAsd9viZ7PWdrTgKtvMFQBi3FX3xc2PTnewIR5srTMXATC5wxt3Bqdt5+y1ZsVdBgIoObwTt43rN3fv/m9+IndRmJIcLZsnh9yvSgtIbhYmVFdviPtbcu48HlF2BpRlR/Orkzuj+XI3DUnZ0fyQHM1Xcib0y641v13n1eFhw52v5EJgTUvurzu/KyRH941D7sIAUe6ObXqjkaP57p8ytwSwwN2mu9aQufqm+zxzeYC4sq73q9zhqrKuSwADsmvcoOTwQXJGGsCaldwaKs554i4Dogh3O6g6vN5g7ovrBpg7r+sc/ul0Rh+4zSPVpN/UOHykzwG3EQB2wdvzyh16uMtdsYhokb3uLj4iVb30+X6oIRUHKhl8z/fKYHtLEvFyJ6iWgLfSMVQ7Euu7hkrDbFcQ0sCTrUNUmuc7gxUDe+pDCnjLwV6YOQFyRbM7i07qdp3Rbiyj304GMv4sYoE+KxHyVuGS3wY0PuMxx2XwLzWquebQWBq6ZhUjcx0mGBstQ6+lSoXcSHZ4JJdY0W+s/wOoYeI4ogLoOgAAAABJRU5ErkJggg==';
  var FLIPY_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA3BAMAAACr/pT4AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAwUExURUdwTP///////////////////////////9gZM/XCyeRXau6Yo/Ktt/vl6N41TOp/jRf/vt8AAAAHdFJOUwCMF+PBYDWJP8hMAAAB1ElEQVQ4y31UO0gDQRBdL0ZbBcE24K9ViaYVRdIqirbxA7bGS7JEEtKOSmIZbbQ0CKkTEGyjYB9IYWssrLWwcD93u7O7d74id3svszPz5kOIgre9kfHTkzkSgYMMldh0uV2qkE9Z3DFFWDG5WUpj2bGMSdIJRO5bHC1otyPUwaoip13ST8UbUrqMPFbfNF6F1yBU/n4DCA864FH++oPJOv9S0nm4lvJeIUBlCPDLHT4DXPZFSFs61gHANQ+M/aknvywyciaIvQvQFr9fwYcikq7MbQJ7GjrNhodz5m0IjabSIUc8LcoLj7SNS5PUh2oL4AopuGYIW4NGHx1PpT4h7jv4VCIJGosiWRBp3FoQt+cl2QILdUme8IfNSSUC0rG8QNdWniw0ERmNPBnHx3LfTAWLUB1emyJg+bqG7vQMCz/gcfaw8LpkvNqo1qI51YCx7myzkn6iYqs2GfBi8pKGlfFZmwSJVkB0SE11JktTtSYz+ebPO3UxHyUZ0TtWtqOaWk6nOyu+GIdEkL/GR9jTRMpQe0RoSgnipl7P/b9j72UjyFzM/tLhCFPHq48Wa9Im1/HyO7K7x8BOzOZz3BacTe6pVb0UteXnpnhTpPdINLz5Q8PbH9SoSbdHwQAHAAAAAElFTkSuQmCC';
  var ICONS = {
    'remove': [REMOVE_IMAGE, -1, -1],
    'zoom': [ZOOM_IMAGE, -1, 1],
    'rotate': [ROTATE_IMAGE, 1, 1],
    'flipx': [FLIPX_IMAGE, 1, -1],
    'flipy': [FLIPY_IMAGE, 1, -1]
  };
  var DEFAULT_FRAME = {
    fitness: true,
    thickness: 1,
    color: 0xffffff,
    lineOpacity: 1,
    fill: 0,
    fillOpacity: 0
  };

  var constants = /*#__PURE__*/Object.freeze({
    REMOVE_IMAGE: REMOVE_IMAGE,
    ZOOM_IMAGE: ZOOM_IMAGE,
    ROTATE_IMAGE: ROTATE_IMAGE,
    FLIPX_IMAGE: FLIPX_IMAGE,
    FLIPY_IMAGE: FLIPY_IMAGE,
    ICONS: ICONS,
    DEFAULT_FRAME: DEFAULT_FRAME
  });

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

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  var Draggable = function Draggable(target, draggable) {
    classCallCheck(this, Draggable);
    var cancelHandler = function cancelHandler(e) {
      if (!this.activated) return;
      this.activated = false;
    };
    target.setEventEnabled(true);
    target.on('pointerdown', function (e) {
      e.stopPropagation();
      if (e.data.originalEvent.touches && e.data.originalEvent.touches.length > 1) return;
      var _e$data$getLocalPosit = e.data.getLocalPosition(this.parent),
          x = _e$data$getLocalPosit.x,
          y = _e$data$getLocalPosit.y;
      this.activated = true;
      this.lastX = x;
      this.lastY = y;
      this.lastGlobalX = target.x;
      this.lastGlobalY = target.y;
      target.activate();
    });
    target.on('pointermove', function (e) {
      if (e.data.originalEvent.touches && e.data.originalEvent.touches.length > 1) return;
      if (!draggable) return;
      var _e$data$getLocalPosit2 = e.data.getLocalPosition(this.parent),
          x = _e$data$getLocalPosit2.x,
          y = _e$data$getLocalPosit2.y;
      if (this.activated && (this.lastX !== x || this.lastY !== y)) {
        if (draggable.inScreen) {
          x = Math.max(0, Math.min(Tiny.WIN_SIZE.width, x));
          y = Math.max(0, Math.min(Tiny.WIN_SIZE.height, y));
        }
        this.setPosition(this.lastGlobalX + (x - this.lastX), this.lastGlobalY + (y - this.lastY));
      }
    });
    target.on('pointerup', cancelHandler);
    target.on('pointercancel', cancelHandler);
    target.on('pointerupoutside', cancelHandler);
  };

  var Frame = function Frame() {
    classCallCheck(this, Frame);
  };
  Frame.getInstance = function (opts) {
    var w = opts.width,
        h = opts.height,
        thickness = opts.thickness,
        color = opts.color,
        lineOpacity = opts.lineOpacity,
        fill = opts.fill,
        fillOpacity = opts.fillOpacity;
    var rect = new Tiny.Graphics();
    rect.$property = opts;
    rect.beginFill(fill, fillOpacity);
    rect.lineStyle(thickness, color, lineOpacity);
    rect.drawRect(-w / 2, -h / 2, w, h);
    rect.endFill();
    return rect;
  };

  var getLength = function getLength(x, y) {
    return Math.sqrt(x * x + y * y);
  };
  var getAngle = function getAngle(x1, y1, x2, y2) {
    var dot = x1 * x2 + y1 * y2;
    var det = x1 * y2 - y1 * x2;
    var angle = Math.atan2(det, dot) / Math.PI * 180;
    return (angle + 360) % 360;
  };
  function noop() {}

  var customIcons = {};
  function reticfyIcon(icons, x, y) {
    var allIcons = _extends({}, customIcons, ICONS);
    for (var key in allIcons) {
      var _allIcons$key = slicedToArray(allIcons[key], 3),
          a = _allIcons$key[1],
          b = _allIcons$key[2];
      if (icons[key]) {
        icons[key].setPosition(x * a, y * b);
      }
    }
  }
  function reticfyAngle(rotateAngle) {
    if (rotateAngle >= 360) {
      rotateAngle -= 360;
    } else if (rotateAngle < 0) {
      rotateAngle += 360;
    }
    if (rotateAngle > 356 || rotateAngle < 4) {
      rotateAngle = 0;
    } else if (rotateAngle > 86 && rotateAngle < 94) {
      rotateAngle = 90;
    } else if (rotateAngle > 176 && rotateAngle < 184) {
      rotateAngle = 180;
    } else if (rotateAngle > 266 && rotateAngle < 274) {
      rotateAngle = 270;
    }
    return rotateAngle;
  }

  var _ICONS$zoom = slicedToArray(ICONS['zoom'], 3),
      img = _ICONS$zoom[0],
      a = _ICONS$zoom[1],
      b = _ICONS$zoom[2];
  var Zoom = function (_Tiny$Sprite) {
    inherits(Zoom, _Tiny$Sprite);
    function Zoom() {
      classCallCheck(this, Zoom);
      return possibleConstructorReturn(this, (Zoom.__proto__ || Object.getPrototypeOf(Zoom)).apply(this, arguments));
    }
    createClass(Zoom, [{
      key: '$bindEvent',
      value: function $bindEvent(parent) {
        var targetWidth = parent.targetWidth,
            targetHeight = parent.targetHeight,
            spriteContainer = parent.spriteContainer,
            widgetContainer = parent.widgetContainer,
            $icons = parent.$icons;
        var minScale = this.minScale,
            maxScale = this.maxScale;
        var originRadius = getLength(targetWidth, targetHeight);
        var cancelHandler = function cancelHandler(e) {
          if (!this.activated) return;
          this.activated = false;
        };
        this.setEventEnabled(true);
        this.on('pointerdown', function (e) {
          e.stopPropagation();
          var _e$data$getLocalPosit = e.data.getLocalPosition(this.parent),
              x = _e$data$getLocalPosit.x,
              y = _e$data$getLocalPosit.y;
          this.activated = true;
          this.lastX = x;
          this.lastY = y;
        });
        this.on('pointermove', function (e) {
          if (e.data.originalEvent.touches && e.data.originalEvent.touches.length > 1) return;
          if (!this.activated) return;
          var _e$data$getLocalPosit2 = e.data.getLocalPosition(this.parent),
              x = _e$data$getLocalPosit2.x,
              y = _e$data$getLocalPosit2.y;
          var deltaX = x - this.lastX;
          var deltaY = y - this.lastY;
          var alpha = Math.atan2(deltaY, deltaX);
          var radius = getLength(deltaX, deltaY);
          var scale = radius / originRadius * 2;
          var originScale = spriteContainer.scale.x;
          if (alpha > 0) {
            var deltaScale = originScale + scale;
            if (deltaScale >= maxScale) return;
            spriteContainer.setScale(deltaScale);
          } else {
            var _deltaScale = originScale - scale;
            if (_deltaScale <= minScale) return;
            spriteContainer.setScale(_deltaScale);
          }
          var sx = spriteContainer.scale.x;
          var rect = widgetContainer.getChildAt(0);
          widgetContainer.removeChild(rect);
          widgetContainer.addChildAt(Frame.getInstance(_extends({}, rect.$property, {
            width: -targetWidth * sx,
            height: -targetHeight * sx
          })), 0);
          reticfyIcon($icons, targetWidth / 2 * sx, targetHeight / 2 * sx);
          this.lastX = x;
          this.lastY = y;
        });
        this.on('pointerup', cancelHandler);
        this.on('pointercancel', cancelHandler);
        this.on('pointerupoutside', cancelHandler);
      }
    }]);
    return Zoom;
  }(Tiny.Sprite);
  Zoom.getInstance = function (parent, opts) {
    var targetWidth = parent.targetWidth,
        targetHeight = parent.targetHeight,
        $icons = parent.$icons;
    var _opts$sprite = opts.sprite,
        sprite = _opts$sprite === undefined ? img : _opts$sprite,
        minScale = opts.minScale,
        maxScale = opts.maxScale;
    var icon = sprite;
    if (Tiny.isString(icon)) {
      icon = Tiny.Texture.fromImage(icon);
    }
    if (icon instanceof Tiny.Texture) {
      icon = new Zoom(icon);
    }
    $icons['zoom'] = icon;
    icon.setAnchor(0.5);
    icon.setPosition(targetWidth / 2 * a, targetHeight / 2 * b);
    icon.minScale = minScale;
    icon.maxScale = maxScale;
    icon.$bindEvent(parent);
    return icon;
  };

  var _ICONS$rotate = slicedToArray(ICONS['rotate'], 3),
      img$1 = _ICONS$rotate[0],
      a$1 = _ICONS$rotate[1],
      b$1 = _ICONS$rotate[2];
  var Rotate = function (_Tiny$Sprite) {
    inherits(Rotate, _Tiny$Sprite);
    function Rotate() {
      classCallCheck(this, Rotate);
      return possibleConstructorReturn(this, (Rotate.__proto__ || Object.getPrototypeOf(Rotate)).apply(this, arguments));
    }
    createClass(Rotate, [{
      key: '$bindEvent',
      value: function $bindEvent(parent) {
        var target = parent.target,
            widgetContainer = parent.widgetContainer,
            spriteContainer = parent.spriteContainer;
        var fitness = this.fitness;
        var cancelHandler = function cancelHandler(e) {
          if (!this.activated) return;
          this.activated = false;
          this.startAngle = Tiny.radian2deg(this.lastRadian || 0);
        };
        this.setEventEnabled(true);
        this.on('pointerdown', function (e) {
          e.stopPropagation();
          var _e$data$getLocalPosit = e.data.getLocalPosition(fitness ? parent : this.parent),
              x = _e$data$getLocalPosit.x,
              y = _e$data$getLocalPosit.y;
          this.activated = true;
          this.lastX = x;
          this.lastY = y;
          this.startAngle = Tiny.radian2deg(this.lastRadian || 0);
        });
        this.on('pointermove', function (e) {
          if (e.data.originalEvent.touches && e.data.originalEvent.touches.length > 1) return;
          if (!this.activated) return;
          var _e$data$getLocalPosit2 = e.data.getLocalPosition(fitness ? parent : this.parent),
              x = _e$data$getLocalPosit2.x,
              y = _e$data$getLocalPosit2.y;
          var angle = getAngle(this.lastX, this.lastY, x, y);
          var rotateAngle = reticfyAngle(Math.round(this.startAngle + angle));
          var radian = Tiny.deg2radian(rotateAngle);
          if (fitness) {
            widgetContainer.setRotation(radian);
            spriteContainer.setRotation(radian);
          } else {
            target.setRotation(radian);
          }
          this.lastRadian = radian;
        });
        this.on('pointerup', cancelHandler);
        this.on('pointercancel', cancelHandler);
        this.on('pointerupoutside', cancelHandler);
      }
    }]);
    return Rotate;
  }(Tiny.Sprite);
  Rotate.getInstance = function (parent, opts) {
    var targetWidth = parent.targetWidth,
        targetHeight = parent.targetHeight,
        $icons = parent.$icons;
    var _opts$sprite = opts.sprite,
        sprite = _opts$sprite === undefined ? img$1 : _opts$sprite,
        fitness = opts.fitness;
    var icon = sprite;
    if (Tiny.isString(icon)) {
      icon = Tiny.Texture.fromImage(icon);
    }
    if (icon instanceof Tiny.Texture) {
      icon = new Rotate(icon);
    }
    $icons['rotate'] = icon;
    icon.setAnchor(0.5);
    icon.setPosition(targetWidth / 2 * a$1, targetHeight / 2 * b$1);
    icon.fitness = fitness;
    icon.$bindEvent(parent);
    return icon;
  };

  var _ICONS$remove = slicedToArray(ICONS['remove'], 3),
      img$2 = _ICONS$remove[0],
      a$2 = _ICONS$remove[1],
      b$2 = _ICONS$remove[2];
  var Remove = function (_Tiny$Sprite) {
    inherits(Remove, _Tiny$Sprite);
    function Remove() {
      classCallCheck(this, Remove);
      return possibleConstructorReturn(this, (Remove.__proto__ || Object.getPrototypeOf(Remove)).apply(this, arguments));
    }
    createClass(Remove, [{
      key: '$bindEvent',
      value: function $bindEvent(parent) {
        this.setEventEnabled(true);
        this.on('pointerdown', function (e) {
          e.stopPropagation();
        });
        this.on('pointerup', function (e) {
          parent.emit('remove:touchend', e);
        });
      }
    }]);
    return Remove;
  }(Tiny.Sprite);
  Remove.getInstance = function (parent, opts) {
    var targetWidth = parent.targetWidth,
        targetHeight = parent.targetHeight,
        $icons = parent.$icons;
    var _opts$sprite = opts.sprite,
        sprite = _opts$sprite === undefined ? img$2 : _opts$sprite;
    var icon = sprite;
    if (Tiny.isString(icon)) {
      icon = Tiny.Texture.fromImage(icon);
    }
    if (icon instanceof Tiny.Texture) {
      icon = new Remove(icon);
    }
    $icons['remove'] = icon;
    icon.setAnchor(0.5);
    icon.setPosition(targetWidth / 2 * a$2, targetHeight / 2 * b$2);
    icon.$bindEvent(parent);
    return icon;
  };

  var _ICONS$flipx = slicedToArray(ICONS['flipx'], 3),
      img$3 = _ICONS$flipx[0],
      a$3 = _ICONS$flipx[1],
      b$3 = _ICONS$flipx[2];
  var FlipX = function (_Tiny$Sprite) {
    inherits(FlipX, _Tiny$Sprite);
    function FlipX() {
      classCallCheck(this, FlipX);
      return possibleConstructorReturn(this, (FlipX.__proto__ || Object.getPrototypeOf(FlipX)).apply(this, arguments));
    }
    createClass(FlipX, [{
      key: '$bindEvent',
      value: function $bindEvent(parent) {
        var target = parent.target;
        this.setEventEnabled(true);
        this.on('pointerdown', function (e) {
          e.stopPropagation();
        });
        this.on('pointerup', function (e) {
          target.scale.x *= -1;
          parent.emit('flipx:touchend', e);
        });
      }
    }]);
    return FlipX;
  }(Tiny.Sprite);
  FlipX.getInstance = function (parent, opts) {
    var targetWidth = parent.targetWidth,
        targetHeight = parent.targetHeight,
        $icons = parent.$icons;
    var _opts$sprite = opts.sprite,
        sprite = _opts$sprite === undefined ? img$3 : _opts$sprite;
    var icon = sprite;
    if (Tiny.isString(icon)) {
      icon = Tiny.Texture.fromImage(icon);
    }
    if (icon instanceof Tiny.Texture) {
      icon = new FlipX(icon);
    }
    $icons['flipx'] = icon;
    icon.setAnchor(0.5);
    icon.setPosition(targetWidth / 2 * a$3, targetHeight / 2 * b$3);
    icon.$bindEvent(parent);
    return icon;
  };

  var _ICONS$flipy = slicedToArray(ICONS['flipy'], 3),
      img$4 = _ICONS$flipy[0],
      a$4 = _ICONS$flipy[1],
      b$4 = _ICONS$flipy[2];
  var FlipY = function (_Tiny$Sprite) {
    inherits(FlipY, _Tiny$Sprite);
    function FlipY() {
      classCallCheck(this, FlipY);
      return possibleConstructorReturn(this, (FlipY.__proto__ || Object.getPrototypeOf(FlipY)).apply(this, arguments));
    }
    createClass(FlipY, [{
      key: '$bindEvent',
      value: function $bindEvent(parent) {
        var target = parent.target;
        this.setEventEnabled(true);
        this.on('pointerdown', function (e) {
          e.stopPropagation();
        });
        this.on('pointerup', function (e) {
          target.scale.y *= -1;
          parent.emit('flipy:touchend', e);
        });
      }
    }]);
    return FlipY;
  }(Tiny.Sprite);
  FlipY.getInstance = function (parent, opts) {
    var targetWidth = parent.targetWidth,
        targetHeight = parent.targetHeight,
        $icons = parent.$icons;
    var _opts$sprite = opts.sprite,
        sprite = _opts$sprite === undefined ? img$4 : _opts$sprite;
    var icon = sprite;
    if (Tiny.isString(icon)) {
      icon = Tiny.Texture.fromImage(icon);
    }
    if (icon instanceof Tiny.Texture) {
      icon = new FlipY(icon);
    }
    $icons['flipy'] = icon;
    icon.setAnchor(0.5);
    icon.setPosition(targetWidth / 2 * a$4, targetHeight / 2 * b$4);
    icon.$bindEvent(parent);
    return icon;
  };

  var Widget = function (_Tiny$Sprite) {
    inherits(Widget, _Tiny$Sprite);
    function Widget() {
      classCallCheck(this, Widget);
      return possibleConstructorReturn(this, (Widget.__proto__ || Object.getPrototypeOf(Widget)).apply(this, arguments));
    }
    createClass(Widget, [{
      key: '$bindEvent',
      value: function $bindEvent(listeners) {
        this.setEventEnabled(true);
        this.on('pointerdown', listeners.onTouchStart || noop);
        this.on('pointermove', listeners.onTouchMove || noop);
        this.on('pointerup', listeners.onTouchEnd || noop);
        this.on('pointercancel', listeners.onTouchCancel || noop);
        this.on('pointerupoutside', listeners.onTouchCancel || noop);
      }
    }]);
    return Widget;
  }(Tiny.Sprite);
  Widget.getInstance = function (parent, opts) {
    var targetWidth = parent.targetWidth,
        targetHeight = parent.targetHeight,
        $icons = parent.$icons;
    var sprite = opts.sprite,
        name = opts.name,
        pos = opts.pos,
        listeners = opts.listeners;
    var _pos = slicedToArray(pos, 2),
        a = _pos[0],
        b = _pos[1];
    var icon = sprite;
    if (Tiny.isString(icon)) {
      icon = Tiny.Texture.fromImage(icon);
    }
    if (icon instanceof Tiny.Texture) {
      icon = new Widget(icon);
    }
    $icons[name] = icon;
    customIcons[name] = [sprite].concat(toConsumableArray(pos));
    icon.setAnchor(0.5);
    icon.setPosition(targetWidth / 2 * a, targetHeight / 2 * b);
    icon.$bindEvent(listeners);
    return icon;
  };

  var Transformable = function (_Tiny$Container) {
    inherits(Transformable, _Tiny$Container);
    function Transformable(target) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, Transformable);
      var _this = possibleConstructorReturn(this, (Transformable.__proto__ || Object.getPrototypeOf(Transformable)).call(this));
      var _opts$frame = opts.frame,
          frame = _opts$frame === undefined ? {} : _opts$frame,
          _opts$drag = opts.drag,
          drag = _opts$drag === undefined ? {} : _opts$drag,
          _opts$zoom = opts.zoom,
          zoom = _opts$zoom === undefined ? {} : _opts$zoom,
          _opts$rotation = opts.rotation,
          rotation = _opts$rotation === undefined ? {} : _opts$rotation,
          _opts$remove = opts.remove,
          remove = _opts$remove === undefined ? {} : _opts$remove,
          _opts$flipx = opts.flipx,
          flipx = _opts$flipx === undefined ? {} : _opts$flipx,
          _opts$flipy = opts.flipy,
          flipy = _opts$flipy === undefined ? {} : _opts$flipy;
      var _target$getBounds = target.getBounds(),
          width = _target$getBounds.width,
          height = _target$getBounds.height;
      _this.$fixedIndex = false;
      _this.$icons = {};
      _this.target = target;
      _this.spriteContainer = new Tiny.Container();
      _this.widgetContainer = new Tiny.Container();
      target.setAnchor(0.5);
      _this.targetWidth = width;
      _this.targetHeight = height;
      _this.deactivate();
      _this.addChild(_this.spriteContainer);
      _this.addChild(_this.widgetContainer);
      _this.spriteContainer.addChild(target);
      _this.widgetContainer.addChild(Frame.getInstance(_extends({ width: width, height: height }, DEFAULT_FRAME, frame)));
      new Draggable(_this, drag);
      if (zoom) {
        _this.widgetContainer.addChild(Zoom.getInstance(_this, _extends({ minScale: 0.5, maxScale: 1.5 }, zoom)));
      }
      if (rotation) {
        _this.widgetContainer.addChild(Rotate.getInstance(_this, _extends({}, rotation, { fitness: _extends({}, DEFAULT_FRAME, frame).fitness })));
      }
      if (remove) {
        _this.widgetContainer.addChild(Remove.getInstance(_this, _extends({}, remove)));
      }
      if (flipx) {
        _this.widgetContainer.addChild(FlipX.getInstance(_this, _extends({}, flipx)));
      }
      if (!flipx && flipy) {
        _this.widgetContainer.addChild(FlipY.getInstance(_this, _extends({}, flipy)));
      }
      Transformable.instancesPoll.push(_this);
      _this.on('removed', function () {
        Tiny.arrayRemoveObject(Transformable.instancesPoll, _this);
      });
      _this.on('added', function () {
        var p = _this.parent;
        var cancelHandler = function cancelHandler(e) {
          for (var key in _this.$icons) {
            _this.$icons[key].activated = false;
          }
        };
        p.on('pointerup', cancelHandler);
        p.on('pointerout', cancelHandler);
        p.on('pointercancel', cancelHandler);
        p.on('pointerupoutside', cancelHandler);
      });
      return _this;
    }
    createClass(Transformable, [{
      key: 'activate',
      value: function activate() {
        Transformable.deactivateAll();
        this.widgetContainer.renderable = true;
        if (!this.$fixedIndex) {
          this.parent.setChildIndex(this, this.parent.children.length - 1);
        }
        for (var key in this.$icons) {
          this.$icons[key].setEventEnabled(true);
        }
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        this.widgetContainer.renderable = false;
        for (var key in this.$icons) {
          this.$icons[key].setEventEnabled(false);
        }
      }
    }, {
      key: 'fixedIndex',
      value: function fixedIndex(fixed) {
        this.$fixedIndex = fixed;
      }
    }, {
      key: 'addWidget',
      value: function addWidget(name, image) {
        var pos = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [1, 1];
        var listeners = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        this.widgetContainer.addChild(Widget.getInstance(this, {
          name: name,
          sprite: image,
          pos: pos,
          listeners: listeners
        }));
      }
    }]);
    return Transformable;
  }(Tiny.Container);
  Transformable.instancesPoll = [];
  Transformable.deactivateAll = function () {
    Transformable.instancesPoll.forEach(function (item) {
      item.deactivate();
    });
  };

  /**
   * @name        tinyjs-plugin-transformable
   * @overview    The Tiny.js plugin for transform something
   * @author      yiiqii
   * @license     MIT
   */
  Transformable.constants = constants;

  return Transformable;

})));
