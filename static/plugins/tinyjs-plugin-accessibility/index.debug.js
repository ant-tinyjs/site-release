/*!
 * Name: tinyjs-plugin-accessibility
 * Description: Renderer plugin for interaction accessibility for end-users with physical impairments which require screen-renders
 * Author: yiiqii
 * Version: v0.0.3
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Tiny = global.Tiny || {}, global.Tiny.accessibility = {})));
}(this, (function (exports) { 'use strict';

  var accessibleTarget = {
    accessible: {
      type: 'label',
      hint: null,
      attr: {}
    },
    _accessible: {
      active: false,
      div: null,
      hitArea: null
    }
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

  var DIV_TOUCH_SIZE = 100;
  var DIV_TOUCH_POS_X = 0;
  var DIV_TOUCH_POS_Y = 0;
  var DIV_TOUCH_ZINDEX = 2;
  var AccessibilityManager = function () {
    function AccessibilityManager(renderer) {
      classCallCheck(this, AccessibilityManager);
      var div = document.createElement('div');
      div.style.width = DIV_TOUCH_SIZE + 'px';
      div.style.height = DIV_TOUCH_SIZE + 'px';
      div.style.position = 'absolute';
      div.style.top = DIV_TOUCH_POS_X + 'px';
      div.style.left = DIV_TOUCH_POS_Y + 'px';
      div.style.zIndex = DIV_TOUCH_ZINDEX;
      div.style.pointerEvents = 'none';
      this.div = div;
      this.dpi = renderer.resolution;
      this.pool = [];
      this.renderId = 0;
      this.debug = false;
      this.eventType = 'pointerdown';
      this.renderer = renderer;
      this.children = [];
      this.isActive = false;
      this._sx = 0;
      this._sy = 0;
    }
    createClass(AccessibilityManager, [{
      key: 'activate',
      value: function activate() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var _opts$debug = opts.debug,
            debug = _opts$debug === undefined ? false : _opts$debug,
            _opts$cell = opts.cell,
            cell = _opts$cell === undefined ? null : _opts$cell,
            eventType = opts.eventType;
        this.debug = debug;
        cell && (this.div = cell);
        eventType && (this.eventType = eventType);
        if (this.isActive) {
          return;
        }
        this.isActive = true;
        this.updateDiv();
        this.renderer.on('postrender', this.update, this);
        if (this.renderer.view.parentNode) {
          this.renderer.view.parentNode.appendChild(this.div);
        }
      }
    }, {
      key: 'deactivate',
      value: function deactivate() {
        if (!this.isActive) {
          return;
        }
        this.isActive = false;
        this.renderer.off('postrender', this.update);
        if (this.div.parentNode) {
          this.div.parentNode.removeChild(this.div);
        }
      }
    }, {
      key: 'updateAccessibleObjects',
      value: function updateAccessibleObjects(displayObject) {
        if (!displayObject.visible || !displayObject.renderable) {
          return;
        }
        if (displayObject.accessible) {
          if (!(displayObject._accessible && displayObject._accessible.active)) {
            this.addChild(displayObject);
          }
          displayObject.renderId = this.renderId;
        }
        var children = displayObject.children;
        for (var i = 0; i < children.length; i++) {
          this.updateAccessibleObjects(children[i]);
        }
      }
    }, {
      key: 'updateDiv',
      value: function updateDiv() {
        var _renderer = this.renderer,
            view = _renderer.view,
            renderWidth = _renderer.width,
            renderHeight = _renderer.height;
        var _view$getBoundingClie = view.getBoundingClientRect(),
            width = _view$getBoundingClie.width,
            height = _view$getBoundingClie.height,
            left = _view$getBoundingClie.left,
            top = _view$getBoundingClie.top;
        var dpi = this.dpi;
        var div = this.div;
        this._sx = width / renderWidth;
        this._sy = height / renderHeight;
        div.style.left = left + 'px';
        div.style.top = top + 'px';
        div.style.width = renderWidth / dpi + 'px';
        div.style.height = renderHeight / dpi + 'px';
      }
    }, {
      key: 'update',
      value: function update() {
        var _renderer2 = this.renderer,
            renderingToScreen = _renderer2.renderingToScreen,
            _lastObjectRendered = _renderer2._lastObjectRendered;
        if (!renderingToScreen) {
          return;
        }
        this.updateAccessibleObjects(_lastObjectRendered);
        for (var i = 0; i < this.children.length; i++) {
          var child = this.children[i];
          if (child.renderId !== this.renderId) {
            child._accessible.active = false;
            Tiny.removeItems(this.children, i, 1);
            this.div.removeChild(child._accessible.div);
            this.pool.push(child._accessible.div);
            child._accessible.div = null;
            i--;
          } else {
            var _accessible = child._accessible,
                hitArea = child.hitArea,
                wt = child.worldTransform;
            var div = _accessible.div;
            var sx = this._sx;
            var sy = this._sy;
            var dpi = this.dpi;
            if (hitArea) {
              if (child._accessible.hitArea !== hitArea) {
                div.style.left = (wt.tx + hitArea.x * wt.a) * sx + 'px';
                div.style.top = (wt.ty + hitArea.y * wt.d) * sy + 'px';
                div.style.width = hitArea.width * wt.a * sx + 'px';
                div.style.height = hitArea.height * wt.d * sy + 'px';
                child._accessible.hitArea = hitArea;
              }
            } else {
              hitArea = child.getBounds();
              this.capHitArea(hitArea);
              div.style.left = hitArea.x * sx * dpi + 'px';
              div.style.top = hitArea.y * sy * dpi + 'px';
              div.style.width = hitArea.width * sx * dpi + 'px';
              div.style.height = hitArea.height * sy * dpi + 'px';
              child._accessible.hitArea = hitArea;
            }
            var _child$accessible = child.accessible,
                attr = _child$accessible.attr,
                hint = _child$accessible.hint;
            if (attr) {
              var attrs = div.attributes;
              for (var _i = attrs.length - 1; _i >= 0; _i--) {
                var _attrs$_i = attrs[_i],
                    name = _attrs$_i.name,
                    value = _attrs$_i.value;
                var attrName = attr[name];
                if (name !== 'style' && attrName && value !== attrName + '') {
                  console.log(name, value);
                  div.setAttribute(name, attrName);
                }
              }
            }
            if (hint) {
              if (div.getAttribute('aria-label') !== hint) {
                console.log(hint);
                div.setAttribute('aria-label', hint);
              }
            }
          }
        }
        this.renderId++;
      }
    }, {
      key: 'capHitArea',
      value: function capHitArea(hitArea) {
        if (hitArea.x < 0) {
          hitArea.width += hitArea.x;
          hitArea.x = 0;
        }
        if (hitArea.y < 0) {
          hitArea.height += hitArea.y;
          hitArea.y = 0;
        }
        if (hitArea.x + hitArea.width > this.renderer.width) {
          hitArea.width = this.renderer.width - hitArea.x;
        }
        if (hitArea.y + hitArea.height > this.renderer.height) {
          hitArea.height = this.renderer.height - hitArea.y;
        }
      }
    }, {
      key: 'addChild',
      value: function addChild(displayObject) {
        displayObject.accessible = Object.assign({}, accessibleTarget.accessible, displayObject.accessible || {});
        if (displayObject.interactive) {
          displayObject.accessible.type = 'button';
        }
        var _displayObject$access = displayObject.accessible,
            type = _displayObject$access.type,
            hint = _displayObject$access.hint,
            attr = _displayObject$access.attr;
        var div = this.pool.pop();
        if (!div) {
          switch (type) {
            case 'label':
              div = document.createElement('div');
              div.setAttribute('role', 'text');
              break;
            default:
              div = document.createElement('button');
              div.style.borderStyle = 'none';
          }
          div.style.width = DIV_TOUCH_SIZE + 'px';
          div.style.height = DIV_TOUCH_SIZE + 'px';
          div.style.backgroundColor = this.debug ? 'rgba(255,0,0,0.5)' : 'transparent';
          div.style.position = 'absolute';
          div.style.zIndex = DIV_TOUCH_ZINDEX;
          div.style.pointerEvents = 'auto';
          div.addEventListener('click', this._onClick.bind(this));
        }
        var title = attr.title;
        if (hint) {
          title = hint;
        }
        title && div.setAttribute('aria-label', title);
        for (var key in attr) {
          if (attr.hasOwnProperty(key)) {
            div.setAttribute(key, attr[key]);
          }
        }
        displayObject._accessible = {
          active: true,
          div: div
        };
        div.displayObject = displayObject;
        this.children.push(displayObject);
        this.div.appendChild(div);
      }
    }, {
      key: '_onClick',
      value: function _onClick(e) {
        var interactionManager = this.renderer.plugins.interaction;
        var eventTypes = this.eventType;
        if (!Tiny.isArray(eventTypes)) {
          eventTypes = [eventTypes];
        }
        eventTypes.forEach(function (eventType) {
          interactionManager.dispatchEvent(e.target.displayObject, eventType, interactionManager.eventData);
        });
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.div = null;
        for (var i = 0; i < this.children.length; i++) {
          this.children[i].div = null;
        }
        this.pool = null;
        this.children = null;
        this.renderer = null;
      }
    }]);
    return AccessibilityManager;
  }();
  Tiny.WebGLRenderer.registerPlugin('accessibility', AccessibilityManager);
  Tiny.CanvasRenderer.registerPlugin('accessibility', AccessibilityManager);

  function autoActivate (app, opts) {
    var extra = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    if (extra.acReader) {
      return app.renderer.plugins.accessibility.activate(opts);
    }
    if (void 0 === extra.acReader) {
      if (Tiny.isMobile.android.device) {
        var button = document.createElement('button');
        button.setAttribute('aria-live', 'assertive');
        button.setAttribute('role', 'alert');
        button.innerText = extra.tip || '请点按两次开启无障碍模式';
        app.view.appendChild(button);
        button.focus();
        button.addEventListener('click', function () {
          app.renderer.plugins.accessibility.activate(opts);
          if (Tiny.isFunction(extra.onActivate)) {
            extra.onActivate(button);
          }
        });
      } else {
        if (extra.forceActivate) {
          app.renderer.plugins.accessibility.activate(opts);
        }
      }
    }
  }

  /**
   * accessibility - The TinyJS plugin
   *
   * Copy to https://github.com/pixijs/pixi.js/tree/v4.8.9/src/accessibility
   * Some code (c) 2013-2017 Mathew Groves, Chad Engler and other contributors.
   * See https://github.com/pixijs/pixi.js/graphs/contributors for the full list of contributors.
   *
   * @name        tinyjs-plugin-extract
   * @overview    Renderer plugin for interaction accessibility for end-users with physical impairments which require screen-renders
   * @author      yiiqii
   * @license     MIT
   */

  exports.accessibleTarget = accessibleTarget;
  exports.AccessibilityManager = AccessibilityManager;
  exports.autoActivate = autoActivate;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
