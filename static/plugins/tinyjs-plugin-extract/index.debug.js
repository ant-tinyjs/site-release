/*!
 * Name: tinyjs-plugin-extract
 * Description: 画布扩展，获取画布的：Image 对象、base64 格式的图片、像素值等等
 * Author: yiiqii
 * Version: v1.4.0
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Tiny = global.Tiny || {}, global.Tiny.extract = {})));
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

  var TEMP_RECT = new Tiny.Rectangle();
  var BYTES_PER_PIXEL = 4;
  var WebGLExtract = function () {
    function WebGLExtract(renderer) {
      classCallCheck(this, WebGLExtract);
      this.renderer = renderer;
      renderer.extract = this;
    }
    createClass(WebGLExtract, [{
      key: 'image',
      value: function image(target) {
        var image = new Image();
        image.src = this.base64(target);
        return image;
      }
    }, {
      key: 'base64',
      value: function base64(target) {
        return this.canvas(target).toDataURL();
      }
    }, {
      key: 'canvas',
      value: function canvas(target, region, fillColor) {
        if (!region && !fillColor) {
          return this._canvas(target);
        }
        var renderer = this.renderer;
        var resolution = renderer.resolution;
        var renderTexture = renderer.generateTexture(target, undefined, resolution, region);
        var result = this._canvas(renderTexture);
        if (fillColor) {
          var frame = region || renderTexture.frame;
          var canvasData = result.getContext('2d').getImageData(0, 0, frame.width * resolution, frame.height * resolution);
          var canvasBuffer = new Tiny.CanvasRenderTarget(frame.width * resolution, frame.height * resolution, 1);
          for (var i = 0, n = canvasData.data.length / 4; i < n; i++) {
            if (canvasData.data[i * 4 + 3] === 0) {
              canvasData.data[i * 4] = (fillColor & 0xff0000) >> 16;
              canvasData.data[i * 4 + 1] = (fillColor & 0x00ff00) >> 8;
              canvasData.data[i * 4 + 2] = fillColor & 0x0000ff;
              canvasData.data[i * 4 + 3] = 255;
            }
          }
          canvasBuffer.context.putImageData(canvasData, 0, 0);
          result = canvasBuffer.canvas;
        }
        return result;
      }
    }, {
      key: '_canvas',
      value: function _canvas(target) {
        var renderer = this.renderer;
        var textureBuffer = void 0;
        var resolution = void 0;
        var frame = void 0;
        var flipY = false;
        var renderTexture = void 0;
        var generated = false;
        if (target) {
          if (target instanceof Tiny.RenderTexture) {
            renderTexture = target;
          } else {
            renderTexture = this.renderer.generateTexture(target);
            generated = true;
          }
        }
        if (renderTexture) {
          textureBuffer = renderTexture.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID];
          resolution = textureBuffer.resolution;
          frame = renderTexture.frame;
          flipY = false;
        } else {
          textureBuffer = this.renderer.rootRenderTarget;
          resolution = textureBuffer.resolution;
          flipY = true;
          frame = TEMP_RECT;
          frame.width = textureBuffer.size.width;
          frame.height = textureBuffer.size.height;
        }
        var width = Math.floor(frame.width * resolution + 1e-4);
        var height = Math.floor(frame.height * resolution + 1e-4);
        var canvasBuffer = new Tiny.CanvasRenderTarget(width, height, 1);
        if (textureBuffer) {
          renderer.bindRenderTarget(textureBuffer);
          var webglPixels = new Uint8Array(BYTES_PER_PIXEL * width * height);
          var gl = renderer.gl;
          gl.readPixels(frame.x * resolution, frame.y * resolution, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webglPixels);
          var canvasData = canvasBuffer.context.getImageData(0, 0, width, height);
          canvasData.data.set(webglPixels);
          canvasBuffer.context.putImageData(canvasData, 0, 0);
          if (flipY) {
            canvasBuffer.context.scale(1, -1);
            canvasBuffer.context.drawImage(canvasBuffer.canvas, 0, -height);
          }
        }
        if (generated) {
          renderTexture.destroy(true);
        }
        return canvasBuffer.canvas;
      }
    }, {
      key: 'pixels',
      value: function pixels(target) {
        var renderer = this.renderer;
        var textureBuffer = void 0;
        var resolution = void 0;
        var frame = void 0;
        var renderTexture = void 0;
        var generated = false;
        if (target) {
          if (target instanceof Tiny.RenderTexture) {
            renderTexture = target;
          } else {
            renderTexture = this.renderer.generateTexture(target);
            generated = true;
          }
        }
        if (renderTexture) {
          textureBuffer = renderTexture.baseTexture._glRenderTargets[this.renderer.CONTEXT_UID];
          resolution = textureBuffer.resolution;
          frame = renderTexture.frame;
        } else {
          textureBuffer = this.renderer.rootRenderTarget;
          resolution = textureBuffer.resolution;
          frame = TEMP_RECT;
          frame.width = textureBuffer.size.width;
          frame.height = textureBuffer.size.height;
        }
        var width = frame.width * resolution;
        var height = frame.height * resolution;
        var webglPixels = new Uint8Array(BYTES_PER_PIXEL * width * height);
        if (textureBuffer) {
          renderer.bindRenderTarget(textureBuffer);
          var gl = renderer.gl;
          gl.readPixels(frame.x * resolution, frame.y * resolution, width, height, gl.RGBA, gl.UNSIGNED_BYTE, webglPixels);
        }
        if (generated) {
          renderTexture.destroy(true);
        }
        return webglPixels;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.renderer.extract = null;
        this.renderer = null;
      }
    }]);
    return WebGLExtract;
  }();
  Tiny.WebGLRenderer.registerPlugin('extract', WebGLExtract);

  var TEMP_RECT$1 = new Tiny.Rectangle();
  var CanvasExtract = function () {
    function CanvasExtract(renderer) {
      classCallCheck(this, CanvasExtract);
      this.renderer = renderer;
      renderer.extract = this;
    }
    createClass(CanvasExtract, [{
      key: 'image',
      value: function image(target) {
        var image = new Image();
        image.src = this.base64(target);
        return image;
      }
    }, {
      key: 'base64',
      value: function base64(target) {
        return this.canvas(target).toDataURL();
      }
    }, {
      key: 'canvas',
      value: function canvas(target, region, fillColor) {
        if (!region && !fillColor) {
          return this._canvas(target);
        }
        var renderer = this.renderer;
        var resolution = renderer.resolution,
            width = renderer.width,
            height = renderer.height;
        var fullRegion = new Tiny.Rectangle(0, 0, width / resolution, height / resolution);
        var renderTexture = renderer.generateTexture(target, undefined, resolution, fullRegion);
        var result = this._canvas(renderTexture);
        var frame = region || renderTexture.frame;
        var canvasData = result.getContext('2d').getImageData(frame.x * resolution, frame.y * resolution, frame.width * resolution, frame.height * resolution);
        var canvasBuffer = new Tiny.CanvasRenderTarget(frame.width * resolution, frame.height * resolution, 1);
        if (fillColor) {
          for (var i = 0, n = canvasData.data.length / 4; i < n; i++) {
            if (canvasData.data[i * 4 + 3] === 0) {
              canvasData.data[i * 4] = (fillColor & 0xff0000) >> 16;
              canvasData.data[i * 4 + 1] = (fillColor & 0x00ff00) >> 8;
              canvasData.data[i * 4 + 2] = fillColor & 0x0000ff;
              canvasData.data[i * 4 + 3] = 255;
            }
          }
        }
        canvasBuffer.context.putImageData(canvasData, 0, 0);
        result = canvasBuffer.canvas;
        return result;
      }
    }, {
      key: '_canvas',
      value: function _canvas(target) {
        var renderer = this.renderer;
        var context = void 0;
        var resolution = void 0;
        var frame = void 0;
        var renderTexture = void 0;
        if (target) {
          if (target instanceof Tiny.RenderTexture) {
            renderTexture = target;
          } else {
            renderTexture = renderer.generateTexture(target);
          }
        }
        if (renderTexture) {
          context = renderTexture.baseTexture._canvasRenderTarget.context;
          resolution = renderTexture.baseTexture._canvasRenderTarget.resolution;
          frame = renderTexture.frame;
        } else {
          context = renderer.rootContext;
          resolution = renderer.resolution;
          frame = TEMP_RECT$1;
          frame.width = this.renderer.width;
          frame.height = this.renderer.height;
        }
        var width = Math.floor(frame.width * resolution + 1e-4);
        var height = Math.floor(frame.height * resolution + 1e-4);
        var canvasBuffer = new Tiny.CanvasRenderTarget(width, height, 1);
        var canvasData = context.getImageData(frame.x * resolution, frame.y * resolution, width, height);
        canvasBuffer.context.putImageData(canvasData, 0, 0);
        return canvasBuffer.canvas;
      }
    }, {
      key: 'pixels',
      value: function pixels(target) {
        var renderer = this.renderer;
        var context = void 0;
        var resolution = void 0;
        var frame = void 0;
        var renderTexture = void 0;
        if (target) {
          if (target instanceof Tiny.RenderTexture) {
            renderTexture = target;
          } else {
            renderTexture = renderer.generateTexture(target);
          }
        }
        if (renderTexture) {
          context = renderTexture.baseTexture._canvasRenderTarget.context;
          resolution = renderTexture.baseTexture._canvasRenderTarget.resolution;
          frame = renderTexture.frame;
        } else {
          context = renderer.rootContext;
          frame = TEMP_RECT$1;
          frame.width = renderer.width;
          frame.height = renderer.height;
        }
        return context.getImageData(0, 0, frame.width * resolution, frame.height * resolution).data;
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.renderer.extract = null;
        this.renderer = null;
      }
    }]);
    return CanvasExtract;
  }();
  Tiny.CanvasRenderer.registerPlugin('extract', CanvasExtract);

  function scale(canvas, width, height) {
    var fillColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0xffffff;
    var ow = canvas.width;
    var oh = canvas.height;
    var s = Math.min(width / ow, height / oh);
    var x = (width / s - ow) / 2;
    var y = (height / s - oh) / 2;
    var color = Tiny.isNumber(fillColor) ? Tiny.hex2string(fillColor) : fillColor;
    var canvasBuffer = new Tiny.CanvasRenderTarget(width, height, 1);
    canvasBuffer.context.scale(s, s);
    canvasBuffer.context.fillStyle = color;
    canvasBuffer.context.fillRect(0, 0, width / s, height / s);
    canvasBuffer.context.drawImage(canvas, x, y);
    return canvasBuffer.canvas;
  }

  /**
   * extract - The TinyJS plugin
   *
   * Copy to https://github.com/pixijs/pixi.js/tree/v4.8.9/src/extract
   * Some code (c) 2013-2017 Mathew Groves, Chad Engler and other contributors.
   * See https://github.com/pixijs/pixi.js/graphs/contributors for the full list of contributors.
   *
   * @name        tinyjs-plugin-extract
   * @overview    画布扩展，获取画布的：Image 对象、base64 格式的图片、像素值等等
   * @author      yiiqii
   * @license     MIT
   */

  exports.webgl = WebGLExtract;
  exports.canvas = CanvasExtract;
  exports.scale = scale;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
