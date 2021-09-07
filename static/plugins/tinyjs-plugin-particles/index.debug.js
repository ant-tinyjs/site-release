/*!
 * Name: tinyjs-plugin-particles
 * Description: A really fast type of the Container built solely for speed
 * Author: yiiqii
 * Version: v0.4.0
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Tiny = global.Tiny || {}, global.Tiny.particles = {})));
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

  var ParticleContainer = function (_Tiny$Container) {
    inherits(ParticleContainer, _Tiny$Container);
    function ParticleContainer() {
      var maxSize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1500;
      var properties = arguments[1];
      var batchSize = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 16384;
      var autoResize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      classCallCheck(this, ParticleContainer);
      var _this = possibleConstructorReturn(this, (ParticleContainer.__proto__ || Object.getPrototypeOf(ParticleContainer)).call(this));
      var maxBatchSize = 16384;
      if (batchSize > maxBatchSize) {
        batchSize = maxBatchSize;
      }
      if (batchSize > maxSize) {
        batchSize = maxSize;
      }
      _this._properties = [false, true, false, false, false];
      _this._maxSize = maxSize;
      _this._batchSize = batchSize;
      _this._glBuffers = {};
      _this._bufferUpdateIDs = [];
      _this._updateID = 0;
      _this.interactiveChildren = false;
      _this.blendMode = Tiny.BLEND_MODES.NORMAL;
      _this.autoResize = autoResize;
      _this.roundPixels = true;
      _this.baseTexture = null;
      _this.setProperties(properties);
      _this._tint = 0;
      _this.tintRgb = new Float32Array(4);
      _this.tint = 0xFFFFFF;
      return _this;
    }
    createClass(ParticleContainer, [{
      key: 'setProperties',
      value: function setProperties(properties) {
        if (properties) {
          this._properties[0] = 'vertices' in properties || 'scale' in properties ? !!properties.vertices || !!properties.scale : this._properties[0];
          this._properties[1] = 'position' in properties ? !!properties.position : this._properties[1];
          this._properties[2] = 'rotation' in properties ? !!properties.rotation : this._properties[2];
          this._properties[3] = 'uvs' in properties ? !!properties.uvs : this._properties[3];
          this._properties[4] = 'tint' in properties || 'alpha' in properties ? !!properties.tint || !!properties.alpha : this._properties[4];
        }
      }
    }, {
      key: 'updateTransform',
      value: function updateTransform() {
        this.displayObjectUpdateTransform();
      }
    }, {
      key: 'renderWebGL',
      value: function renderWebGL(renderer) {
        var _this2 = this;
        if (!this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable) {
          return;
        }
        if (!this.baseTexture) {
          this.baseTexture = this.children[0]._texture.baseTexture;
          if (!this.baseTexture.hasLoaded) {
            this.baseTexture.once('update', function () {
              return _this2.onChildrenChange(0);
            });
          }
        }
        renderer.setObjectRenderer(renderer.plugins.particle);
        renderer.plugins.particle.render(this);
      }
    }, {
      key: 'onChildrenChange',
      value: function onChildrenChange(smallestChildIndex) {
        var bufferIndex = Math.floor(smallestChildIndex / this._batchSize);
        while (this._bufferUpdateIDs.length < bufferIndex) {
          this._bufferUpdateIDs.push(0);
        }
        this._bufferUpdateIDs[bufferIndex] = ++this._updateID;
      }
    }, {
      key: 'renderCanvas',
      value: function renderCanvas(renderer) {
        if (!this.visible || this.worldAlpha <= 0 || !this.children.length || !this.renderable) {
          return;
        }
        var context = renderer.context;
        var transform = this.worldTransform;
        var isRotated = true;
        var positionX = 0;
        var positionY = 0;
        var finalWidth = 0;
        var finalHeight = 0;
        renderer.setBlendMode(this.blendMode);
        context.globalAlpha = this.worldAlpha;
        this.displayObjectUpdateTransform();
        for (var i = 0; i < this.children.length; ++i) {
          var child = this.children[i];
          if (!child.visible) {
            continue;
          }
          var frame = child._texture.frame;
          context.globalAlpha = this.worldAlpha * child.alpha;
          if (child.rotation % (Math.PI * 2) === 0) {
            if (isRotated) {
              context.setTransform(transform.a, transform.b, transform.c, transform.d, transform.tx * renderer.resolution, transform.ty * renderer.resolution);
              isRotated = false;
            }
            positionX = child.anchor.x * (-frame.width * child.scale.x) + child.position.x + 0.5;
            positionY = child.anchor.y * (-frame.height * child.scale.y) + child.position.y + 0.5;
            finalWidth = frame.width * child.scale.x;
            finalHeight = frame.height * child.scale.y;
          } else {
            if (!isRotated) {
              isRotated = true;
            }
            child.displayObjectUpdateTransform();
            var childTransform = child.worldTransform;
            if (renderer.roundPixels) {
              context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, childTransform.tx * renderer.resolution | 0, childTransform.ty * renderer.resolution | 0);
            } else {
              context.setTransform(childTransform.a, childTransform.b, childTransform.c, childTransform.d, childTransform.tx * renderer.resolution, childTransform.ty * renderer.resolution);
            }
            positionX = child.anchor.x * -frame.width + 0.5;
            positionY = child.anchor.y * -frame.height + 0.5;
            finalWidth = frame.width;
            finalHeight = frame.height;
          }
          var resolution = child._texture.baseTexture.resolution;
          var source = child._texture.baseTexture.source;
          if (navigator.isAppXCanvasPlus) {
            if (source.tagName === 'IMAGE') {
              source = navigator.canUseBinding ? source.$realImage : source.src;
            }
          }
          context.drawImage(source, frame.x * resolution, frame.y * resolution, frame.width * resolution, frame.height * resolution, positionX * renderer.resolution, positionY * renderer.resolution, finalWidth * renderer.resolution, finalHeight * renderer.resolution);
        }
      }
    }, {
      key: 'destroy',
      value: function destroy(options) {
        get(ParticleContainer.prototype.__proto__ || Object.getPrototypeOf(ParticleContainer.prototype), 'destroy', this).call(this, options);
        if (this._buffers) {
          for (var i = 0; i < this._buffers.length; ++i) {
            this._buffers[i].destroy();
          }
        }
        this._properties = null;
        this._buffers = null;
        this._bufferUpdateIDs = null;
      }
    }, {
      key: 'tint',
      get: function get$$1() {
        return this._tint;
      },
      set: function set$$1(value) {
        this._tint = value;
        Tiny.hex2rgb(value, this.tintRgb);
      }
    }]);
    return ParticleContainer;
  }(Tiny.Container);
  var ParticleContainer_1 = ParticleContainer;

  var ParticleShader = function (_Tiny$Shader) {
    inherits(ParticleShader, _Tiny$Shader);
    function ParticleShader(gl) {
      classCallCheck(this, ParticleShader);
      return possibleConstructorReturn(this, (ParticleShader.__proto__ || Object.getPrototypeOf(ParticleShader)).call(this, gl, "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec4 aColor;\n\nattribute vec2 aPositionCoord;\nattribute float aRotation;\n\nuniform mat3 projectionMatrix;\nuniform vec4 uColor;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nvoid main(void){\n    float x = (aVertexPosition.x) * cos(aRotation) - (aVertexPosition.y) * sin(aRotation);\n    float y = (aVertexPosition.x) * sin(aRotation) + (aVertexPosition.y) * cos(aRotation);\n\n    vec2 v = vec2(x, y);\n    v = v + aPositionCoord;\n\n    gl_Position = vec4((projectionMatrix * vec3(v, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = aTextureCoord;\n    vColor = aColor * uColor;\n}", "varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void){\n  vec4 color = texture2D(uSampler, vTextureCoord) * vColor;\n  gl_FragColor = color;\n}"));
    }
    return ParticleShader;
  }(Tiny.Shader);

  function createIndicesForQuads(size) {
    var totalIndices = size * 6;
    var indices = new Uint16Array(totalIndices);
    for (var i = 0, j = 0; i < totalIndices; i += 6, j += 4) {
      indices[i + 0] = j + 0;
      indices[i + 1] = j + 1;
      indices[i + 2] = j + 2;
      indices[i + 3] = j + 0;
      indices[i + 4] = j + 2;
      indices[i + 5] = j + 3;
    }
    return indices;
  }

  var ParticleBuffer = function () {
    function ParticleBuffer(gl, properties, dynamicPropertyFlags, size) {
      classCallCheck(this, ParticleBuffer);
      this.gl = gl;
      this.size = size;
      this.dynamicProperties = [];
      this.staticProperties = [];
      for (var i = 0; i < properties.length; ++i) {
        var property = properties[i];
        property = {
          attribute: property.attribute,
          size: property.size,
          uploadFunction: property.uploadFunction,
          unsignedByte: property.unsignedByte,
          offset: property.offset
        };
        if (dynamicPropertyFlags[i]) {
          this.dynamicProperties.push(property);
        } else {
          this.staticProperties.push(property);
        }
      }
      this.staticStride = 0;
      this.staticBuffer = null;
      this.staticData = null;
      this.staticDataUint32 = null;
      this.dynamicStride = 0;
      this.dynamicBuffer = null;
      this.dynamicData = null;
      this.dynamicDataUint32 = null;
      this._updateID = 0;
      this.initBuffers();
    }
    createClass(ParticleBuffer, [{
      key: 'initBuffers',
      value: function initBuffers() {
        var gl = this.gl;
        var dynamicOffset = 0;
        this.indices = createIndicesForQuads(this.size);
        this.indexBuffer = Tiny.glCore.GLBuffer.createIndexBuffer(gl, this.indices, gl.STATIC_DRAW);
        this.dynamicStride = 0;
        for (var i = 0; i < this.dynamicProperties.length; ++i) {
          var property = this.dynamicProperties[i];
          property.offset = dynamicOffset;
          dynamicOffset += property.size;
          this.dynamicStride += property.size;
        }
        var dynBuffer = new ArrayBuffer(this.size * this.dynamicStride * 4 * 4);
        this.dynamicData = new Float32Array(dynBuffer);
        this.dynamicDataUint32 = new Uint32Array(dynBuffer);
        this.dynamicBuffer = Tiny.glCore.GLBuffer.createVertexBuffer(gl, dynBuffer, gl.STREAM_DRAW);
        var staticOffset = 0;
        this.staticStride = 0;
        for (var _i = 0; _i < this.staticProperties.length; ++_i) {
          var _property = this.staticProperties[_i];
          _property.offset = staticOffset;
          staticOffset += _property.size;
          this.staticStride += _property.size;
        }
        var statBuffer = new ArrayBuffer(this.size * this.staticStride * 4 * 4);
        this.staticData = new Float32Array(statBuffer);
        this.staticDataUint32 = new Uint32Array(statBuffer);
        this.staticBuffer = Tiny.glCore.GLBuffer.createVertexBuffer(gl, statBuffer, gl.STATIC_DRAW);
        this.vao = new Tiny.glCore.VertexArrayObject(gl).addIndex(this.indexBuffer);
        for (var _i2 = 0; _i2 < this.dynamicProperties.length; ++_i2) {
          var _property2 = this.dynamicProperties[_i2];
          if (_property2.unsignedByte) {
            this.vao.addAttribute(this.dynamicBuffer, _property2.attribute, gl.UNSIGNED_BYTE, true, this.dynamicStride * 4, _property2.offset * 4);
          } else {
            this.vao.addAttribute(this.dynamicBuffer, _property2.attribute, gl.FLOAT, false, this.dynamicStride * 4, _property2.offset * 4);
          }
        }
        for (var _i3 = 0; _i3 < this.staticProperties.length; ++_i3) {
          var _property3 = this.staticProperties[_i3];
          if (_property3.unsignedByte) {
            this.vao.addAttribute(this.staticBuffer, _property3.attribute, gl.UNSIGNED_BYTE, true, this.staticStride * 4, _property3.offset * 4);
          } else {
            this.vao.addAttribute(this.staticBuffer, _property3.attribute, gl.FLOAT, false, this.staticStride * 4, _property3.offset * 4);
          }
        }
      }
    }, {
      key: 'uploadDynamic',
      value: function uploadDynamic(children, startIndex, amount) {
        for (var i = 0; i < this.dynamicProperties.length; i++) {
          var property = this.dynamicProperties[i];
          property.uploadFunction(children, startIndex, amount, property.unsignedByte ? this.dynamicDataUint32 : this.dynamicData, this.dynamicStride, property.offset);
        }
        this.dynamicBuffer.upload();
      }
    }, {
      key: 'uploadStatic',
      value: function uploadStatic(children, startIndex, amount) {
        for (var i = 0; i < this.staticProperties.length; i++) {
          var property = this.staticProperties[i];
          property.uploadFunction(children, startIndex, amount, property.unsignedByte ? this.staticDataUint32 : this.staticData, this.staticStride, property.offset);
        }
        this.staticBuffer.upload();
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.dynamicProperties = null;
        this.dynamicBuffer.destroy();
        this.dynamicBuffer = null;
        this.dynamicData = null;
        this.dynamicDataUint32 = null;
        this.staticProperties = null;
        this.staticBuffer.destroy();
        this.staticBuffer = null;
        this.staticData = null;
        this.staticDataUint32 = null;
      }
    }]);
    return ParticleBuffer;
  }();

  var ParticleRenderer = function (_Tiny$ObjectRenderer) {
    inherits(ParticleRenderer, _Tiny$ObjectRenderer);
    function ParticleRenderer(renderer) {
      classCallCheck(this, ParticleRenderer);
      var _this = possibleConstructorReturn(this, (ParticleRenderer.__proto__ || Object.getPrototypeOf(ParticleRenderer)).call(this, renderer));
      _this.shader = null;
      _this.indexBuffer = null;
      _this.properties = null;
      _this.tempMatrix = new Tiny.Matrix();
      _this.CONTEXT_UID = 0;
      return _this;
    }
    createClass(ParticleRenderer, [{
      key: 'onContextChange',
      value: function onContextChange() {
        var gl = this.renderer.gl;
        this.CONTEXT_UID = this.renderer.CONTEXT_UID;
        this.shader = new ParticleShader(gl);
        this.properties = [{
          attribute: this.shader.attributes.aVertexPosition,
          size: 2,
          uploadFunction: this.uploadVertices,
          offset: 0
        }, {
          attribute: this.shader.attributes.aPositionCoord,
          size: 2,
          uploadFunction: this.uploadPosition,
          offset: 0
        }, {
          attribute: this.shader.attributes.aRotation,
          size: 1,
          uploadFunction: this.uploadRotation,
          offset: 0
        }, {
          attribute: this.shader.attributes.aTextureCoord,
          size: 2,
          uploadFunction: this.uploadUvs,
          offset: 0
        }, {
          attribute: this.shader.attributes.aColor,
          size: 1,
          unsignedByte: true,
          uploadFunction: this.uploadTint,
          offset: 0
        }];
      }
    }, {
      key: 'start',
      value: function start() {
        this.renderer.bindShader(this.shader);
      }
    }, {
      key: 'render',
      value: function render(container) {
        var children = container.children;
        var maxSize = container._maxSize;
        var batchSize = container._batchSize;
        var renderer = this.renderer;
        var totalChildren = children.length;
        if (totalChildren === 0) {
          return;
        } else if (totalChildren > maxSize) {
          totalChildren = maxSize;
        }
        var buffers = container._glBuffers[renderer.CONTEXT_UID];
        if (!buffers) {
          buffers = container._glBuffers[renderer.CONTEXT_UID] = this.generateBuffers(container);
        }
        var baseTexture = children[0]._texture.baseTexture;
        this.renderer.setBlendMode(Tiny.correctBlendMode(container.blendMode, baseTexture.premultipliedAlpha));
        var gl = renderer.gl;
        var m = container.worldTransform.copy(this.tempMatrix);
        m.prepend(renderer._activeRenderTarget.projectionMatrix);
        this.shader.uniforms.projectionMatrix = m.toArray(true);
        this.shader.uniforms.uColor = Tiny.premultiplyRgba(container.tintRgb, container.worldAlpha, this.shader.uniforms.uColor, baseTexture.premultipliedAlpha);
        this.shader.uniforms.uSampler = renderer.bindTexture(baseTexture);
        var updateStatic = false;
        for (var i = 0, j = 0; i < totalChildren; i += batchSize, j += 1) {
          var amount = totalChildren - i;
          if (amount > batchSize) {
            amount = batchSize;
          }
          if (j >= buffers.length) {
            if (!container.autoResize) {
              break;
            }
            buffers.push(this._generateOneMoreBuffer(container));
          }
          var buffer = buffers[j];
          buffer.uploadDynamic(children, i, amount);
          var bid = container._bufferUpdateIDs[j] || 0;
          updateStatic = updateStatic || buffer._updateID < bid;
          if (updateStatic) {
            buffer._updateID = container._updateID;
            buffer.uploadStatic(children, i, amount);
          }
          renderer.bindVao(buffer.vao);
          buffer.vao.draw(gl.TRIANGLES, amount * 6);
        }
      }
    }, {
      key: 'generateBuffers',
      value: function generateBuffers(container) {
        var gl = this.renderer.gl;
        var buffers = [];
        var size = container._maxSize;
        var batchSize = container._batchSize;
        var dynamicPropertyFlags = container._properties;
        for (var i = 0; i < size; i += batchSize) {
          buffers.push(new ParticleBuffer(gl, this.properties, dynamicPropertyFlags, batchSize));
        }
        return buffers;
      }
    }, {
      key: '_generateOneMoreBuffer',
      value: function _generateOneMoreBuffer(container) {
        var gl = this.renderer.gl;
        var batchSize = container._batchSize;
        var dynamicPropertyFlags = container._properties;
        return new ParticleBuffer(gl, this.properties, dynamicPropertyFlags, batchSize);
      }
    }, {
      key: 'uploadVertices',
      value: function uploadVertices(children, startIndex, amount, array, stride, offset) {
        var w0 = 0;
        var w1 = 0;
        var h0 = 0;
        var h1 = 0;
        for (var i = 0; i < amount; ++i) {
          var sprite = children[startIndex + i];
          var texture = sprite._texture;
          var sx = sprite.scale.x;
          var sy = sprite.scale.y;
          var trim = texture.trim;
          var orig = texture.orig;
          if (trim) {
            w1 = trim.x - sprite.anchor.x * orig.width;
            w0 = w1 + trim.width;
            h1 = trim.y - sprite.anchor.y * orig.height;
            h0 = h1 + trim.height;
          } else {
            w0 = orig.width * (1 - sprite.anchor.x);
            w1 = orig.width * -sprite.anchor.x;
            h0 = orig.height * (1 - sprite.anchor.y);
            h1 = orig.height * -sprite.anchor.y;
          }
          array[offset] = w1 * sx;
          array[offset + 1] = h1 * sy;
          array[offset + stride] = w0 * sx;
          array[offset + stride + 1] = h1 * sy;
          array[offset + stride * 2] = w0 * sx;
          array[offset + stride * 2 + 1] = h0 * sy;
          array[offset + stride * 3] = w1 * sx;
          array[offset + stride * 3 + 1] = h0 * sy;
          offset += stride * 4;
        }
      }
    }, {
      key: 'uploadPosition',
      value: function uploadPosition(children, startIndex, amount, array, stride, offset) {
        for (var i = 0; i < amount; i++) {
          var spritePosition = children[startIndex + i].position;
          array[offset] = spritePosition.x;
          array[offset + 1] = spritePosition.y;
          array[offset + stride] = spritePosition.x;
          array[offset + stride + 1] = spritePosition.y;
          array[offset + stride * 2] = spritePosition.x;
          array[offset + stride * 2 + 1] = spritePosition.y;
          array[offset + stride * 3] = spritePosition.x;
          array[offset + stride * 3 + 1] = spritePosition.y;
          offset += stride * 4;
        }
      }
    }, {
      key: 'uploadRotation',
      value: function uploadRotation(children, startIndex, amount, array, stride, offset) {
        for (var i = 0; i < amount; i++) {
          var spriteRotation = children[startIndex + i].rotation;
          array[offset] = spriteRotation;
          array[offset + stride] = spriteRotation;
          array[offset + stride * 2] = spriteRotation;
          array[offset + stride * 3] = spriteRotation;
          offset += stride * 4;
        }
      }
    }, {
      key: 'uploadUvs',
      value: function uploadUvs(children, startIndex, amount, array, stride, offset) {
        for (var i = 0; i < amount; ++i) {
          var textureUvs = children[startIndex + i]._texture._uvs;
          if (textureUvs) {
            array[offset] = textureUvs.x0;
            array[offset + 1] = textureUvs.y0;
            array[offset + stride] = textureUvs.x1;
            array[offset + stride + 1] = textureUvs.y1;
            array[offset + stride * 2] = textureUvs.x2;
            array[offset + stride * 2 + 1] = textureUvs.y2;
            array[offset + stride * 3] = textureUvs.x3;
            array[offset + stride * 3 + 1] = textureUvs.y3;
            offset += stride * 4;
          } else {
            array[offset] = 0;
            array[offset + 1] = 0;
            array[offset + stride] = 0;
            array[offset + stride + 1] = 0;
            array[offset + stride * 2] = 0;
            array[offset + stride * 2 + 1] = 0;
            array[offset + stride * 3] = 0;
            array[offset + stride * 3 + 1] = 0;
            offset += stride * 4;
          }
        }
      }
    }, {
      key: 'uploadTint',
      value: function uploadTint(children, startIndex, amount, array, stride, offset) {
        for (var i = 0; i < amount; ++i) {
          var sprite = children[startIndex + i];
          var premultiplied = sprite._texture.baseTexture.premultipliedAlpha;
          var alpha = sprite.alpha;
          var argb = alpha < 1.0 && premultiplied ? Tiny.premultiplyTint(sprite._tintRGB, alpha) : sprite._tintRGB + (alpha * 255 << 24);
          array[offset] = argb;
          array[offset + stride] = argb;
          array[offset + stride * 2] = argb;
          array[offset + stride * 3] = argb;
          offset += stride * 4;
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        if (this.renderer.gl) {
          this.renderer.gl.deleteBuffer(this.indexBuffer);
        }
        get(ParticleRenderer.prototype.__proto__ || Object.getPrototypeOf(ParticleRenderer.prototype), 'destroy', this).call(this);
        this.shader.destroy();
        this.indices = null;
        this.tempMatrix = null;
      }
    }]);
    return ParticleRenderer;
  }(Tiny.ObjectRenderer);
  Tiny.WebGLRenderer.registerPlugin('particle', ParticleRenderer);

  /**
   * A really fast type of the Container built solely for speed
   *
   * Copy to https://github.com/pixijs/pixi.js/tree/v4.8.5/src/particles
   * Some code (c) 2013-2017 Mathew Groves, Chad Engler and other contributors.
   * See https://github.com/pixijs/pixi.js/graphs/contributors for the full list of contributors.
   *
   * @name        tinyjs-plugin-particles
   * @overview    A really fast type of the Container built solely for speed
   * @author      yiiqii
   * @license     MIT
   */

  exports.ParticleContainer = ParticleContainer_1;
  exports.ParticleRenderer = ParticleRenderer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
