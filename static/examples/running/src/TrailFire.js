/* eslint-disable */

var TrailFirePartical = function () {
  Tiny.Sprite.call(this, Tiny.Texture.fromImage(RESOURCES['s_trail_fire']));
  this.setAnchor(0.5);
  this.speed = new Tiny.Point();
};

TrailFirePartical.prototype = Object.create(Tiny.Sprite.prototype);
TrailFirePartical.prototype.constructor = TrailFirePartical;

var TrailFire = function (parent) {

  this._parent = parent;
  this._target = new Tiny.Point();
  this._particals = [];
  this._particalPool = new ObjectPool(TrailFirePartical);
  this.max = 100;
  this.count = 0;
};

TrailFire.prototype.constructor = TrailFire;

TrailFire.prototype.update = function () {
  if (this._target.isDead) {

    this.count++;

    if (this.count % 3) {

      var partical = this._particalPool.get();

      this._parent.addChild(partical);
      partical.setPosition(this._target.getPositionX() - this._target.width / 4, this._target.getPositionY() - this._target.height / 4);


      partical.speed.x = 1 + Math.random() * 2;
      partical.speed.y = 1 + Math.random() * 2;

      partical.speed.x *= -1;
      partical.speed.y *= 1;
      partical.alphay = 2;
      partical.rotation = Math.random() * Math.PI * 2;
      partical.setScale(0.2 + Math.random() * 0.5);
      this._particals.push(partical);
    }

  }

  for (var i = 0; i < this._particals.length; i++) {
    var partical = this._particals[i];

    partical.scale.x = partical.scale.y *= 1.02;
    partical.alphay *= 0.85;

    partical.alpha = partical.alphay > 1 ? 1 : partical.alphay;
    partical.position.x += partical.speed.x * 2
    partical.position.y += partical.speed.y * 2

    if (partical.alpha < 0.01) {
      this._parent.removeChild(partical);
      this._particals.splice(i, 1);
      i--;
    }
  }
};
