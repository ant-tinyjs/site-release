/*!
 * Name: tinyjs-plugin-bitmap-text
 * Description: Create a line or multiple lines of text using bitmap font
 * Author: fangjun.yfj
 * Version: v0.1.0
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Tiny = global.Tiny || {}, global.Tiny.BitmapText = factory());
}(this, (function () { 'use strict';

  var splitPathRe =
      /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
  var splitPath = function(filename) {
    return splitPathRe.exec(filename).slice(1);
  };
  function dirname(path) {
    var result = splitPath(path),
        root = result[0],
        dir = result[1];
    if (!root && !dir) {
      return '.';
    }
    if (dir) {
      dir = dir.substr(0, dir.length - 1);
    }
    return root + dir;
  }

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

  var BitmapText = function (_Tiny$Container) {
    inherits(BitmapText, _Tiny$Container);
    function BitmapText(text) {
      var style = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      classCallCheck(this, BitmapText);
      var _this = possibleConstructorReturn(this, (BitmapText.__proto__ || Object.getPrototypeOf(BitmapText)).call(this));
      _this._textWidth = 0;
      _this._textHeight = 0;
      _this._glyphs = [];
      _this._font = {
        tint: style.tint !== undefined ? style.tint : 0xFFFFFF,
        align: style.align || 'left',
        name: null,
        size: 0
      };
      _this.font = style.font;
      _this._text = text;
      _this._maxWidth = 0;
      _this._maxLineHeight = 0;
      _this._letterSpacing = 0;
      _this._anchor = new Tiny.ObservablePoint(function () {
        _this.dirty = true;
      }, _this, 0, 0);
      _this.dirty = false;
      _this.updateText();
      return _this;
    }
    createClass(BitmapText, [{
      key: 'updateText',
      value: function updateText() {
        var data = BitmapText.fonts[this._font.name];
        var scale = this._font.size / data.size;
        var pos = new Tiny.Point();
        var chars = [];
        var lineWidths = [];
        var text = this.text.replace(/(?:\r\n|\r)/g, '\n');
        var textLength = text.length;
        var maxWidth = this._maxWidth * data.size / this._font.size;
        var prevCharCode = null;
        var lastLineWidth = 0;
        var maxLineWidth = 0;
        var line = 0;
        var lastBreakPos = -1;
        var lastBreakWidth = 0;
        var spacesRemoved = 0;
        var maxLineHeight = 0;
        for (var i = 0; i < textLength; i++) {
          var charCode = text.charCodeAt(i);
          var char = text.charAt(i);
          if (/(?:\s)/.test(char)) {
            lastBreakPos = i;
            lastBreakWidth = lastLineWidth;
          }
          if (char === '\r' || char === '\n') {
            lineWidths.push(lastLineWidth);
            maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
            ++line;
            ++spacesRemoved;
            pos.x = 0;
            pos.y += data.lineHeight;
            prevCharCode = null;
            continue;
          }
          var charData = data.chars[charCode];
          if (!charData) {
            continue;
          }
          if (prevCharCode && charData.kerning[prevCharCode]) {
            pos.x += charData.kerning[prevCharCode];
          }
          chars.push({
            texture: charData.texture,
            line: line,
            charCode: charCode,
            position: new Tiny.Point(pos.x + charData.xOffset + this._letterSpacing / 2, pos.y + charData.yOffset)
          });
          pos.x += charData.xAdvance + this._letterSpacing;
          lastLineWidth = pos.x;
          maxLineHeight = Math.max(maxLineHeight, charData.yOffset + charData.texture.height);
          prevCharCode = charCode;
          if (lastBreakPos !== -1 && maxWidth > 0 && pos.x > maxWidth) {
            ++spacesRemoved;
            Tiny.removeItems(chars, 1 + lastBreakPos - spacesRemoved, 1 + i - lastBreakPos);
            i = lastBreakPos;
            lastBreakPos = -1;
            lineWidths.push(lastBreakWidth);
            maxLineWidth = Math.max(maxLineWidth, lastBreakWidth);
            line++;
            pos.x = 0;
            pos.y += data.lineHeight;
            prevCharCode = null;
          }
        }
        var lastChar = text.charAt(text.length - 1);
        if (lastChar !== '\r' && lastChar !== '\n') {
          if (/(?:\s)/.test(lastChar)) {
            lastLineWidth = lastBreakWidth;
          }
          lineWidths.push(lastLineWidth);
          maxLineWidth = Math.max(maxLineWidth, lastLineWidth);
        }
        var lineAlignOffsets = [];
        for (var _i = 0; _i <= line; _i++) {
          var alignOffset = 0;
          if (this._font.align === 'right') {
            alignOffset = maxLineWidth - lineWidths[_i];
          } else if (this._font.align === 'center') {
            alignOffset = (maxLineWidth - lineWidths[_i]) / 2;
          }
          lineAlignOffsets.push(alignOffset);
        }
        var lenChars = chars.length;
        var tint = this.tint;
        for (var _i2 = 0; _i2 < lenChars; _i2++) {
          var c = this._glyphs[_i2];
          if (c) {
            c.texture = chars[_i2].texture;
          } else {
            c = new Tiny.Sprite(chars[_i2].texture);
            this._glyphs.push(c);
          }
          c.position.x = (chars[_i2].position.x + lineAlignOffsets[chars[_i2].line]) * scale;
          c.position.y = chars[_i2].position.y * scale;
          c.scale.x = c.scale.y = scale;
          c.tint = tint;
          if (!c.parent) {
            this.addChild(c);
          }
        }
        for (var _i3 = lenChars; _i3 < this._glyphs.length; ++_i3) {
          this.removeChild(this._glyphs[_i3]);
        }
        this._textWidth = maxLineWidth * scale;
        this._textHeight = (pos.y + data.lineHeight) * scale;
        if (this.anchor.x !== 0 || this.anchor.y !== 0) {
          for (var _i4 = 0; _i4 < lenChars; _i4++) {
            this._glyphs[_i4].x -= this._textWidth * this.anchor.x;
            this._glyphs[_i4].y -= this._textHeight * this.anchor.y;
          }
        }
        this._maxLineHeight = maxLineHeight * scale;
      }
    }, {
      key: 'updateTransform',
      value: function updateTransform() {
        this.validate();
        this.containerUpdateTransform();
      }
    }, {
      key: 'getLocalBounds',
      value: function getLocalBounds() {
        this.validate();
        return get(BitmapText.prototype.__proto__ || Object.getPrototypeOf(BitmapText.prototype), 'getLocalBounds', this).call(this);
      }
    }, {
      key: 'validate',
      value: function validate() {
        if (this.dirty) {
          this.updateText();
          this.dirty = false;
        }
      }
    }, {
      key: 'tint',
      get: function get$$1() {
        return this._font.tint;
      },
      set: function set$$1(value) {
        this._font.tint = typeof value === 'number' && value >= 0 ? value : 0xFFFFFF;
        this.dirty = true;
      }
    }, {
      key: 'align',
      get: function get$$1() {
        return this._font.align;
      },
      set: function set$$1(value) {
        this._font.align = value || 'left';
        this.dirty = true;
      }
    }, {
      key: 'anchor',
      get: function get$$1() {
        return this._anchor;
      },
      set: function set$$1(value) {
        if (typeof value === 'number') {
          this._anchor.set(value);
        } else {
          this._anchor.copy(value);
        }
      }
    }, {
      key: 'font',
      get: function get$$1() {
        return this._font;
      },
      set: function set$$1(value) {
        if (!value) {
          return;
        }
        if (typeof value === 'string') {
          value = value.split(' ');
          this._font.name = value.length === 1 ? value[0] : value.slice(1).join(' ');
          this._font.size = value.length >= 2 ? parseInt(value[0], 10) : BitmapText.fonts[this._font.name].size;
        } else {
          this._font.name = value.name;
          this._font.size = typeof value.size === 'number' ? value.size : parseInt(value.size, 10);
        }
        this.dirty = true;
      }
    }, {
      key: 'text',
      get: function get$$1() {
        return this._text;
      },
      set: function set$$1(value) {
        value = value.toString() || ' ';
        if (this._text === value) {
          return;
        }
        this._text = value;
        this.dirty = true;
      }
    }, {
      key: 'maxWidth',
      get: function get$$1() {
        return this._maxWidth;
      },
      set: function set$$1(value) {
        if (this._maxWidth === value) {
          return;
        }
        this._maxWidth = value;
        this.dirty = true;
      }
    }, {
      key: 'maxLineHeight',
      get: function get$$1() {
        this.validate();
        return this._maxLineHeight;
      }
    }, {
      key: 'textWidth',
      get: function get$$1() {
        this.validate();
        return this._textWidth;
      }
    }, {
      key: 'letterSpacing',
      get: function get$$1() {
        return this._letterSpacing;
      },
      set: function set$$1(value) {
        if (this._letterSpacing !== value) {
          this._letterSpacing = value;
          this.dirty = true;
        }
      }
    }, {
      key: 'textHeight',
      get: function get$$1() {
        this.validate();
        return this._textHeight;
      }
    }], [{
      key: 'registerFont',
      value: function registerFont(xml, textures) {
        var data = {};
        var info = xml.getElementsByTagName('info')[0];
        var common = xml.getElementsByTagName('common')[0];
        var pages = xml.getElementsByTagName('page');
        var res = Tiny.getResolutionOfUrl(pages[0].getAttribute('file'), Tiny.settings.RESOLUTION);
        var pagesTextures = {};
        data.font = info.getAttribute('face');
        data.size = parseInt(info.getAttribute('size'), 10);
        data.lineHeight = parseInt(common.getAttribute('lineHeight'), 10) / res;
        data.chars = {};
        if (textures instanceof Tiny.Texture) {
          textures = [textures];
        }
        for (var i = 0; i < pages.length; i++) {
          var id = pages[i].getAttribute('id');
          var file = pages[i].getAttribute('file');
          pagesTextures[id] = textures instanceof Array ? textures[i] : textures[file];
        }
        var letters = xml.getElementsByTagName('char');
        for (var _i5 = 0; _i5 < letters.length; _i5++) {
          var letter = letters[_i5];
          var charCode = parseInt(letter.getAttribute('id'), 10);
          var page = letter.getAttribute('page') || 0;
          var textureRect = new Tiny.Rectangle(parseInt(letter.getAttribute('x'), 10) / res + pagesTextures[page].frame.x / res, parseInt(letter.getAttribute('y'), 10) / res + pagesTextures[page].frame.y / res, parseInt(letter.getAttribute('width'), 10) / res, parseInt(letter.getAttribute('height'), 10) / res);
          data.chars[charCode] = {
            xOffset: parseInt(letter.getAttribute('xoffset'), 10) / res,
            yOffset: parseInt(letter.getAttribute('yoffset'), 10) / res,
            xAdvance: parseInt(letter.getAttribute('xadvance'), 10) / res,
            kerning: {},
            texture: new Tiny.Texture(pagesTextures[page].baseTexture, textureRect),
            page: page
          };
        }
        var kernings = xml.getElementsByTagName('kerning');
        for (var _i6 = 0; _i6 < kernings.length; _i6++) {
          var kerning = kernings[_i6];
          var first = parseInt(kerning.getAttribute('first'), 10) / res;
          var second = parseInt(kerning.getAttribute('second'), 10) / res;
          var amount = parseInt(kerning.getAttribute('amount'), 10) / res;
          if (data.chars[second]) {
            data.chars[second].kerning[first] = amount;
          }
        }
        BitmapText.fonts[data.font] = data;
        return data;
      }
    }]);
    return BitmapText;
  }(Tiny.Container);
  BitmapText.fonts = {};

  var Resource = Tiny.loaders.Resource;
  function parse(resource, textures) {
    resource.bitmapFont = BitmapText.registerFont(resource.data, textures);
  }
  function bitmapFontParser () {
    return function bitmapFontParser(resource, next) {
      if (!resource.data || resource.type !== Resource.TYPE.XML) {
        next();
        return;
      }
      if (resource.data.getElementsByTagName('page').length === 0 || resource.data.getElementsByTagName('info').length === 0 || resource.data.getElementsByTagName('info')[0].getAttribute('face') === null) {
        next();
        return;
      }
      var xmlUrl = !resource.isDataUrl ? dirname(resource.url) : '';
      if (resource.isDataUrl) {
        if (xmlUrl === '.') {
          xmlUrl = '';
        }
        if (this.baseUrl && xmlUrl) {
          if (this.baseUrl.charAt(this.baseUrl.length - 1) === '/') {
            xmlUrl += '/';
          }
        }
      }
      xmlUrl = xmlUrl.replace(this.baseUrl, '');
      if (xmlUrl && xmlUrl.charAt(xmlUrl.length - 1) !== '/') {
        xmlUrl += '/';
      }
      var pages = resource.data.getElementsByTagName('page');
      var textures = {};
      var completed = function completed(page) {
        textures[page.metadata.pageFile] = page.texture;
        if (Object.keys(textures).length === pages.length) {
          parse(resource, textures);
          next();
        }
      };
      for (var i = 0; i < pages.length; ++i) {
        var pageFile = pages[i].getAttribute('file');
        var url = xmlUrl + pageFile;
        var exists = false;
        for (var name in this.resources) {
          var bitmapResource = this.resources[name];
          if (bitmapResource.url === url) {
            bitmapResource.metadata.pageFile = pageFile;
            if (bitmapResource.texture) {
              completed(bitmapResource);
            } else {
              bitmapResource.onAfterMiddleware.add(completed);
            }
            exists = true;
            break;
          }
        }
        if (!exists) {
          var options = {
            crossOrigin: resource.crossOrigin,
            loadType: Resource.LOAD_TYPE.IMAGE,
            metadata: Object.assign({ pageFile: pageFile }, resource.metadata.imageMetadata),
            parentResource: resource
          };
          this.add(url, options, completed);
        }
      }
    };
  }

  var loader = Tiny.loaders.Loader;
  loader.addTinyMiddleware(bitmapFontParser);
  if (Tiny.Loader) {
    Tiny.Loader = loader ? new loader() : null;
  }

  return BitmapText;

})));
