/*!
 * Name: tinyjs-plugin-dust
 * Description: Dust is a quick and easy particle effects engine
 * Author: yiiqii
 * Version: v0.3.0
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Tiny = global.Tiny || {}, global.Tiny.Dust = factory());
}(this, (function () { 'use strict';

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

  /**
   * Dust - The TinyJS plugin
   *
   * Copy to https://github.com/kittykatattack/dust
   * Some code (c) 2017 kittykatattack
   *
   * @name        tinyjs-plugin-dust
   * @overview    Dust is a quick and easy particle effects engine
   * @author      yiiqii
   * @license     MIT
   */
  var Dust = function () {
    function Dust(x, y, spriteFn, container, options) {
      classCallCheck(this, Dust);
      this.x = x || 0;
      this.y = y || 0;
      this.spriteFn = spriteFn;
      this.container = container || new Tiny.Container();
      if (!spriteFn) {
        throw new Error('Sprite is needed.');
      }
      options = options || {};
      this.number = options.number || 20;
      this.gravity = options.gravity || 0;
      this.randomSpacing = Tiny.isUndefined(options.randomSpacing) ? true : options.randomSpacing;
      this.minAngle = options.minAngle || 0;
      this.maxAngle = options.maxAngle || 6.28;
      this.minSize = options.minSize || 4;
      this.maxSize = options.maxSize || 16;
      this.minSpeed = options.minSpeed || 0.3;
      this.maxSpeed = options.maxSpeed || 3;
      this.minScaleSpeed = options.minScaleSpeed || 0.01;
      this.maxScaleSpeed = options.maxScaleSpeed || 0.05;
      this.minAlphaSpeed = options.minAlphaSpeed || 0.02;
      this.maxAlphaSpeed = options.maxAlphaSpeed || 0.02;
      this.minRotationSpeed = options.minRotationSpeed || 0.01;
      this.maxRotationSpeed = options.maxRotationSpeed || 0.03;
      this.particles = [];
      this.angles = [];
      var self = this;
      var angle = void 0;
      var spacing = (this.maxAngle - this.minAngle) / (this.number - 1);
      Dust.globalParticles.push(this.particles);
      for (var i = 0; i < this.number; i++) {
        if (this.randomSpacing) {
          angle = Tiny.randomFloat(this.minAngle, this.maxAngle);
          this.angles.push(angle);
        } else {
          if (angle === undefined) {
            angle = this.minAngle;
          }
          this.angles.push(angle);
          angle += spacing;
        }
      }
      this.angles.forEach(function (angle) {
        return self.makeParticle(angle);
      });
    }
    createClass(Dust, [{
      key: 'makeParticle',
      value: function makeParticle(angle) {
        var particle = this.spriteFn();
        var gravity = this.gravity;
        var particles = this.particles;
        var container = this.container;
        if (particle.totalFrames > 0) {
          particle.gotoAndStop(Tiny.randomInt(0, particle.totalFrames - 1));
        }
        var size = Tiny.randomInt(this.minSize, this.maxSize);
        particle.width = size;
        particle.height = size;
        particle.x = this.x;
        particle.y = this.y;
        particle.scaleSpeed = Tiny.randomFloat(this.minScaleSpeed, this.maxScaleSpeed);
        particle.alphaSpeed = Tiny.randomFloat(this.minAlphaSpeed, this.maxAlphaSpeed);
        particle.rotationSpeed = Tiny.randomFloat(this.minRotationSpeed, this.maxRotationSpeed);
        var speed = Tiny.randomFloat(this.minSpeed, this.maxSpeed);
        particle.vx = speed * Math.cos(angle);
        particle.vy = speed * Math.sin(angle);
        particles.push(particle);
        container.addChild(particle);
        particle.updateParticle = function () {
          particle.vy += gravity;
          particle.x += particle.vx;
          particle.y += particle.vy;
          if (particle.scale.x - particle.scaleSpeed > 0) {
            particle.scale.x -= particle.scaleSpeed;
          }
          if (particle.scale.y - particle.scaleSpeed > 0) {
            particle.scale.y -= particle.scaleSpeed;
          }
          particle.rotation += particle.rotationSpeed;
          particle.alpha -= particle.alphaSpeed;
          if (particle.alpha <= 0) {
            container.removeChild(particle);
            particles.splice(particles.indexOf(particle), 1);
          }
        };
      }
    }, {
      key: 'update',
      value: function update() {
        if (Dust.globalParticles.length > 0) {
          for (var i = Dust.globalParticles.length - 1; i >= 0; i--) {
            var particles = Dust.globalParticles[i];
            if (particles.length > 0) {
              for (var j = particles.length - 1; j >= 0; j--) {
                var particle = particles[j];
                particle.updateParticle();
              }
            } else {
              Dust.globalParticles.splice(Dust.globalParticles.indexOf(particles), 1);
            }
          }
        }
      }
    }]);
    return Dust;
  }();
  Dust.globalParticles = [];
  var src = Dust;

  return src;

})));
