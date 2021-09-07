/*!
 * Name: tinyjs-plugin-tiling
 * Description: A fast way of rendering a tiling image
 * Author: yiiqii
 * Version: v0.1.1
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Tiny = global.Tiny || {}, global.Tiny.tiling = {})));
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

  var tempPoint = new Tiny.Point();
  var TilingSprite = function (_Tiny$Sprite) {
    inherits(TilingSprite, _Tiny$Sprite);
    function TilingSprite(texture) {
      var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 100;
      classCallCheck(this, TilingSprite);
      var _this = possibleConstructorReturn(this, (TilingSprite.__proto__ || Object.getPrototypeOf(TilingSprite)).call(this, texture));
      _this.tileTransform = new Tiny.TransformStatic();
      _this._width = width;
      _this._height = height;
      _this._canvasPattern = null;
      _this.uvTransform = texture.transform || new Tiny.TextureTransform(texture);
      _this.pluginName = 'tilingSprite';
      _this.uvRespectAnchor = false;
      return _this;
    }
    createClass(TilingSprite, [{
      key: '_onTextureUpdate',
      value: function _onTextureUpdate() {
        if (this.uvTransform) {
          this.uvTransform.texture = this._texture;
        }
        this.cachedTint = 0xFFFFFF;
      }
    }, {
      key: '_renderWebGL',
      value: function _renderWebGL(renderer) {
        var texture = this._texture;
        if (!texture || !texture.valid) {
          return;
        }
        this.tileTransform.updateLocalTransform();
        this.uvTransform.update();
        renderer.setObjectRenderer(renderer.plugins[this.pluginName]);
        renderer.plugins[this.pluginName].render(this);
      }
    }, {
      key: '_renderCanvas',
      value: function _renderCanvas(renderer) {
        var texture = this._texture;
        if (!texture.baseTexture.hasLoaded) {
          return;
        }
        var context = renderer.context;
        var transform = this.worldTransform;
        var resolution = renderer.resolution;
        var isTextureRotated = texture.rotate === 2;
        var baseTexture = texture.baseTexture;
        var baseTextureResolution = baseTexture.resolution;
        var modX = this.tilePosition.x / this.tileScale.x % texture.orig.width * baseTextureResolution;
        var modY = this.tilePosition.y / this.tileScale.y % texture.orig.height * baseTextureResolution;
        if (this._textureID !== this._texture._updateID || this.cachedTint !== this.tint) {
          this._textureID = this._texture._updateID;
          var tempCanvas = new Tiny.CanvasRenderTarget(texture.orig.width, texture.orig.height, baseTextureResolution);
          if (this.tint !== 0xFFFFFF) {
            this.tintedTexture = Tiny.CanvasTinter.getTintedTexture(this, this.tint);
            tempCanvas.context.drawImage(this.tintedTexture, 0, 0);
          } else {
            var sx = texture._frame.x * baseTextureResolution;
            var sy = texture._frame.y * baseTextureResolution;
            var sWidth = texture._frame.width * baseTextureResolution;
            var sHeight = texture._frame.height * baseTextureResolution;
            var dWidth = (texture.trim ? texture.trim.width : texture.orig.width) * baseTextureResolution;
            var dHeight = (texture.trim ? texture.trim.height : texture.orig.height) * baseTextureResolution;
            var dx = (texture.trim ? texture.trim.x : 0) * baseTextureResolution;
            var dy = (texture.trim ? texture.trim.y : 0) * baseTextureResolution;
            if (isTextureRotated) {
              tempCanvas.context.rotate(-Math.PI / 2);
              tempCanvas.context.translate(-dHeight, 0);
              tempCanvas.context.drawImage(baseTexture.source, sx, sy, sWidth, sHeight, -dy, dx, dHeight, dWidth);
            } else {
              tempCanvas.context.drawImage(baseTexture.source, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
          }
          this.cachedTint = this.tint;
          this._canvasPattern = tempCanvas.context.createPattern(tempCanvas.canvas, 'repeat');
        }
        context.globalAlpha = this.worldAlpha;
        context.setTransform(transform.a * resolution, transform.b * resolution, transform.c * resolution, transform.d * resolution, transform.tx * resolution, transform.ty * resolution);
        renderer.setBlendMode(this.blendMode);
        context.fillStyle = this._canvasPattern;
        context.scale(this.tileScale.x / baseTextureResolution, this.tileScale.y / baseTextureResolution);
        var anchorX = this.anchor.x * -this._width * baseTextureResolution;
        var anchorY = this.anchor.y * -this._height * baseTextureResolution;
        if (this.uvRespectAnchor) {
          context.translate(modX, modY);
          context.fillRect(-modX + anchorX, -modY + anchorY, this._width / this.tileScale.x * baseTextureResolution, this._height / this.tileScale.y * baseTextureResolution);
        } else {
          context.translate(modX + anchorX, modY + anchorY);
          context.fillRect(-modX, -modY, this._width / this.tileScale.x * baseTextureResolution, this._height / this.tileScale.y * baseTextureResolution);
        }
      }
    }, {
      key: '_calculateBounds',
      value: function _calculateBounds() {
        var minX = this._width * -this._anchor._x;
        var minY = this._height * -this._anchor._y;
        var maxX = this._width * (1 - this._anchor._x);
        var maxY = this._height * (1 - this._anchor._y);
        this._bounds.addFrame(this.transform, minX, minY, maxX, maxY);
      }
    }, {
      key: 'getLocalBounds',
      value: function getLocalBounds(rect) {
        if (this.children.length === 0) {
          this._bounds.minX = this._width * -this._anchor._x;
          this._bounds.minY = this._height * -this._anchor._y;
          this._bounds.maxX = this._width * (1 - this._anchor._x);
          this._bounds.maxY = this._height * (1 - this._anchor._y);
          if (!rect) {
            if (!this._localBoundsRect) {
              this._localBoundsRect = new Tiny.Rectangle();
            }
            rect = this._localBoundsRect;
          }
          return this._bounds.getRectangle(rect);
        }
        return get(TilingSprite.prototype.__proto__ || Object.getPrototypeOf(TilingSprite.prototype), 'getLocalBounds', this).call(this, rect);
      }
    }, {
      key: 'containsPoint',
      value: function containsPoint(point) {
        this.worldTransform.applyInverse(point, tempPoint);
        var width = this._width;
        var height = this._height;
        var x1 = -width * this.anchor._x;
        if (tempPoint.x >= x1 && tempPoint.x < x1 + width) {
          var y1 = -height * this.anchor._y;
          if (tempPoint.y >= y1 && tempPoint.y < y1 + height) {
            return true;
          }
        }
        return false;
      }
    }, {
      key: 'destroy',
      value: function destroy(options) {
        get(TilingSprite.prototype.__proto__ || Object.getPrototypeOf(TilingSprite.prototype), 'destroy', this).call(this, options);
        this.tileTransform = null;
        this.uvTransform = null;
      }
    }, {
      key: 'clampMargin',
      get: function get$$1() {
        return this.uvTransform.clampMargin;
      },
      set: function set$$1(value) {
        this.uvTransform.clampMargin = value;
        this.uvTransform.update(true);
      }
    }, {
      key: 'tileScale',
      get: function get$$1() {
        return this.tileTransform.scale;
      },
      set: function set$$1(value) {
        this.tileTransform.scale.copy(value);
      }
    }, {
      key: 'tilePosition',
      get: function get$$1() {
        return this.tileTransform.position;
      },
      set: function set$$1(value) {
        this.tileTransform.position.copy(value);
      }
    }, {
      key: 'width',
      get: function get$$1() {
        return this._width;
      },
      set: function set$$1(value) {
        this._width = value;
      }
    }, {
      key: 'height',
      get: function get$$1() {
        return this._height;
      },
      set: function set$$1(value) {
        this._height = value;
      }
    }], [{
      key: 'from',
      value: function from(source, width, height) {
        return new TilingSprite(Tiny.Texture.from(source), width, height);
      }
    }, {
      key: 'fromFrame',
      value: function fromFrame(frameId, width, height) {
        var texture = Tiny.TextureCache[frameId];
        if (!texture) {
          throw new Error('The frameId "' + frameId + '" does not exist in the texture cache ' + this);
        }
        return new TilingSprite(texture, width, height);
      }
    }, {
      key: 'fromImage',
      value: function fromImage(imageId, width, height, crossorigin, scaleMode) {
        return new TilingSprite(Tiny.Texture.fromImage(imageId, crossorigin, scaleMode), width, height);
      }
    }]);
    return TilingSprite;
  }(Tiny.Sprite);

  var tempMat = new Tiny.Matrix();
  var tilingSprite = {
    frag: 'varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\nuniform mat3 uMapCoord;\nuniform vec4 uClampFrame;\nuniform vec2 uClampOffset;\n\nvoid main(void){\n  vec2 coord = mod(vTextureCoord - uClampOffset, vec2(1.0, 1.0)) + uClampOffset;\n  coord = (uMapCoord * vec3(coord, 1.0)).xy;\n  coord = clamp(coord, uClampFrame.xy, uClampFrame.zw);\n\n  vec4 sample = texture2D(uSampler, coord);\n  gl_FragColor = sample * uColor;\n}',
    vert: 'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n  gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n  vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}',
    simpleFrag: 'varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 uColor;\n\nvoid main(void)\n{\n  vec4 sample = texture2D(uSampler, vTextureCoord);\n  gl_FragColor = sample * uColor;\n}'
  };
  var TilingSpriteRenderer = function (_Tiny$ObjectRenderer) {
    inherits(TilingSpriteRenderer, _Tiny$ObjectRenderer);
    function TilingSpriteRenderer(renderer) {
      classCallCheck(this, TilingSpriteRenderer);
      var _this = possibleConstructorReturn(this, (TilingSpriteRenderer.__proto__ || Object.getPrototypeOf(TilingSpriteRenderer)).call(this, renderer));
      _this.shader = null;
      _this.simpleShader = null;
      _this.quad = null;
      return _this;
    }
    createClass(TilingSpriteRenderer, [{
      key: 'onContextChange',
      value: function onContextChange() {
        var gl = this.renderer.gl;
        this.shader = new Tiny.Shader(gl, tilingSprite.vert, tilingSprite.frag);
        this.simpleShader = new Tiny.Shader(gl, tilingSprite.vert, tilingSprite.simpleFrag);
        this.renderer.bindVao(null);
        this.quad = new Tiny.Quad(gl, this.renderer.state.attribState);
        this.quad.initVao(this.shader);
      }
    }, {
      key: 'render',
      value: function render(ts) {
        var renderer = this.renderer;
        var quad = this.quad;
        renderer.bindVao(quad.vao);
        var vertices = quad.vertices;
        vertices[0] = vertices[6] = ts._width * -ts.anchor.x;
        vertices[1] = vertices[3] = ts._height * -ts.anchor.y;
        vertices[2] = vertices[4] = ts._width * (1.0 - ts.anchor.x);
        vertices[5] = vertices[7] = ts._height * (1.0 - ts.anchor.y);
        if (ts.uvRespectAnchor) {
          vertices = quad.uvs;
          vertices[0] = vertices[6] = -ts.anchor.x;
          vertices[1] = vertices[3] = -ts.anchor.y;
          vertices[2] = vertices[4] = 1.0 - ts.anchor.x;
          vertices[5] = vertices[7] = 1.0 - ts.anchor.y;
        }
        quad.upload();
        var tex = ts._texture;
        var baseTex = tex.baseTexture;
        var lt = ts.tileTransform.localTransform;
        var uv = ts.uvTransform;
        var isSimple = baseTex.isPowerOfTwo && tex.frame.width === baseTex.width && tex.frame.height === baseTex.height;
        if (isSimple) {
          if (!baseTex._glTextures[renderer.CONTEXT_UID]) {
            if (baseTex.wrapMode === Tiny.WRAP_MODES.CLAMP) {
              baseTex.wrapMode = Tiny.WRAP_MODES.REPEAT;
            }
          } else {
            isSimple = baseTex.wrapMode !== Tiny.WRAP_MODES.CLAMP;
          }
        }
        var shader = isSimple ? this.simpleShader : this.shader;
        renderer.bindShader(shader);
        var w = tex.width;
        var h = tex.height;
        var W = ts._width;
        var H = ts._height;
        tempMat.set(lt.a * w / W, lt.b * w / H, lt.c * h / W, lt.d * h / H, lt.tx / W, lt.ty / H);
        tempMat.invert();
        if (isSimple) {
          tempMat.prepend(uv.mapCoord);
        } else {
          shader.uniforms.uMapCoord = uv.mapCoord.toArray(true);
          shader.uniforms.uClampFrame = uv.uClampFrame;
          shader.uniforms.uClampOffset = uv.uClampOffset;
        }
        shader.uniforms.uTransform = tempMat.toArray(true);
        shader.uniforms.uColor = Tiny.premultiplyTintToRgba(ts.tint, ts.worldAlpha, shader.uniforms.uColor, baseTex.premultipliedAlpha);
        shader.uniforms.translationMatrix = ts.transform.worldTransform.toArray(true);
        shader.uniforms.uSampler = renderer.bindTexture(tex);
        renderer.setBlendMode(Tiny.correctBlendMode(ts.blendMode, baseTex.premultipliedAlpha));
        quad.vao.draw(this.renderer.gl.TRIANGLES, 6, 0);
      }
    }]);
    return TilingSpriteRenderer;
  }(Tiny.ObjectRenderer);
  Tiny.WebGLRenderer.registerPlugin('tilingSprite', TilingSpriteRenderer);

  /**
   * tiling - The TinyJS plugin
   *
   * Copy to https://github.com/pixijs/pixi.js/tree/v4.8.9/src/extras
   * Some code (c) 2013-2017 Mathew Groves, Chad Engler and other contributors.
   * See https://github.com/pixijs/pixi.js/graphs/contributors for the full list of contributors.
   *
   * @name        tinyjs-plugin-tiling
   * @overview    A fast way of rendering a tiling image
   * @author      yiiqii
   * @license     MIT
   */

  exports.TilingSprite = TilingSprite;
  exports.TilingSpriteRenderer = TilingSpriteRenderer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
