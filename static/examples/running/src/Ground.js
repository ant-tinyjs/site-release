/* eslint-disable */

var Ground = function () {
  Tiny.Sprite.call(this, Tiny.Texture.fromImage(RESOURCES['s_bg_down_front']));

  this.position = new Tiny.Point(0, Tiny.WIN_SIZE.height);
  this.setAnchor(0, 1);
};

Ground.prototype = Object.create(Tiny.Sprite.prototype);
Ground.prototype.constructor = Ground;

/**
 * GroundManager
 * @constructor
 */
var GroundManager = function (layer) {
  this._layer = layer;
  this._grounds = [];
  this._groundPool = new ObjectPool(Ground);
};

GroundManager.prototype.update = function () {
  for (var i = 0; i < this._grounds.length; i++) {
    var ground = this._grounds[i];
    ground.setPositionX(ground._x - Game.directive.x - 16);
    if (ground.getPositionX() < -1135 - Game.xOffset - 16) {
      this._grounds.splice(i, 1);
      i--;
      this._layer._view._gameFront.removeChild(ground);
    }
  }
};

GroundManager.prototype.add = function (x) {
  var ground = this._groundPool.get();
  ground._x = x;
  this._layer._view._gameFront.addChild(ground);
  this._grounds.push(ground);
};

GroundManager.prototype.destroyAll = function () {
  for (var i = 0; i < this._grounds.length; i++) {
    var ground = this._grounds[i];
    this._layer._view._gameFront.removeChild(ground);
  }

  this._grounds = [];
};
