/* eslint-disable */

var TrailPartical = function () {
  Tiny.Sprite.call(this, Tiny.Texture.fromImage(RESOURCES['s_trail']));
  this.setAnchor(0.5);
  this.speed = new Tiny.Point();
};

TrailPartical.prototype = Object.create(Tiny.Sprite.prototype);
TrailPartical.prototype.constructor = TrailPartical;

var Trail = function (parent) {
  this._parent = parent;
  this._target = new Tiny.Point();
  this._particals = [];
  this._particalPool = new ObjectPool(TrailPartical);
  this.max = 100;
  this.count = 0;
};

Trail.prototype.constructor = Trail;

Trail.prototype.update = function () {
  if (this._target.isFlying && !this._target.isDead) {
    this.count++;

    if (this.count % 3) {
      var partical = this._particalPool.get();

      this._parent.addChild(partical);
      partical.setPosition(this._target.getPositionX() + ( Math.random() * 10) - 5 - 20, this._target.getPositionY() + 50);
      partical.direction = 0;
      partical.dirSpeed = Math.random() > 0.5 ? -0.1 : 0.1
      partical.sign = this._particals.length % 2 ? -1 : 1;
      partical.scaly = Math.random() * 2 - 1;
      partical.speed.y = this._target.accel * 3;
      partical.alphay = 2;
      partical.rotation = Math.random() * Math.PI * 2;
      partical.setScale(0.2 + Math.random() * 0.5);

      this._particals.push(partical);
    }
  }

  for (var i = 0; i < this._particals.length; i++) {
    var partical = this._particals[i];

    partical.dirSpeed += 0.003 * partical.sign;
    if (partical.dirSpeed > 2)partical.dirSpeed = 2;

    partical.direction += partical.dirSpeed;

    partical.speed.x = Math.sin(partical.direction);
    partical.speed.y = Math.cos(partical.direction);

    partical.position.x += partical.speed.x * 5 * partical.scaly;
    partical.position.y += partical.speed.y * 3;

    partical.alphay *= 0.85;
    partical.rotation += partical.speed.x * 0.1;

    partical.setOpacity(partical.alphay > 1 ? 1 : partical.alphay);

    if (partical.getOpacity() < 0.01) {
      this._parent.removeChild(partical);
      this._particals.splice(i, 1);
      i--;
    }
  }
};
