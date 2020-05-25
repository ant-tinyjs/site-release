/* eslint-disable */

var Pickup = function () {

  this.view = new Tiny.Container();
  this.clip = new Tiny.Sprite(Tiny.Texture.fromImage(RESOURCES['s_pickup' + Tiny.random(1, 5)]));

  this.clip.setAnchor(0.5);

  this.shine = Tiny.Sprite.fromImage(RESOURCES['s_shine']);
  this.shine.setAnchor(0.5);
//    this.shine.setScale(1);
  this.shine.setOpacity(0.5);
  this.view.addChild(this.shine);
  this.view.addChild(this.clip);

  this.width = 100;
  this.height = 100;

  this.count = Math.random() * 300;
};

Pickup.prototype.constructor = Pickup;

Pickup.prototype.update = function () {
  if (!this.isPickedUp) {
    this.count += 0.1 * Game.time.DELTA_TIME;
    this.view.setScale(0.75 + Math.sin(this.count) * 0.1, 0.75 - Math.cos(this.count) * 0.1);
    this.rotation = Math.sin(this.count * 1.5) * 0.2;

    this.shine.rotation = this.count * 0.2;
  } else {
    this.view.setScale(1 - this.ratio);
    this._x = this.pickupPosition.x + (this._avatar._pos.x - this.pickupPosition.x) * this.ratio;
    this._y = this.pickupPosition.y + (this._avatar._pos.y - this.pickupPosition.y) * this.ratio;
  }

  this.view.setPosition(this._x - Game.directive.x, this._y);
};

/**
 * PickupManager
 * @constructor
 */
var PickupManager = function (layer) {
  this._layer = layer;
  this._pickups = [];
  this._pickupPool = new ObjectPool(Pickup);

  this._spawnCount = 0;

  this._pos = 0
};

PickupManager.prototype.update = function () {
  if (this._layer.joyrideMode) {
    this._spawnCount += Game.time.DELTA_TIME;

    if (this._spawnCount > 5) {
      this._pos += 0.15;
      this._spawnCount = 0;
      this.add(Game.directive.x + Tiny.WIN_SIZE.width, 280 + Math.sin(this._pos) * 180);
    }
  }

  for (var i = 0; i < this._pickups.length; i++) {
    var pickup = this._pickups[i];
    pickup.update();

    if (pickup.isPickedUp) {
      pickup.ratio += (1 - pickup.ratio) * 0.3 * Game.time.DELTA_TIME;
      if (pickup.ratio > 0.99) {
        this._pickups.splice(i, 1);

        this._layer._view._gameFront.removeChild(pickup.view);
        i--;
      }
    } else {
      if (pickup.view.getPositionX() < -100 - Game.xOffset) {
        this._pickups.splice(i, 1);

        this._layer._view._gameFront.removeChild(pickup.view);
        i--;
      }
    }
  }
};

PickupManager.prototype.add = function (x, y) {
  var pickup = this._pickupPool.get();
  pickup._x = x;
  pickup._y = y;
  this._layer._view._gameFront.addChild(pickup.view);
  this._pickups.push(pickup);
};

PickupManager.prototype.remove = function (index) {
  var pickup = this._pickups[index];
  pickup.isPickedUp = true;
  pickup._avatar = this._layer._avatar;
  pickup.pickupPosition = {x: pickup._x, y: pickup._y};
  pickup.ratio = 0;
};

PickupManager.prototype.destroyAll = function () {
  for (var i = 0; i < this._pickups.length; i++) {
    var pickup = this._pickups[i]
    this._layer._view._gameFront.removeChild(pickup.view);
  }

  this._pickups = [];
};
