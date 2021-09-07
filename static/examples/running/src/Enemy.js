/* eslint-disable */

var Enemy = function () {
  Tiny.Sprite.call(this, Tiny.Texture.fromImage(RESOURCES['s_enemy']));

  this.setAnchor(0.5);
  this.isHit = false;
};

Enemy.prototype = Object.create(Tiny.Sprite.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.reset = function () {
  if (this.explosion) {
    this.removeChild(this.explosion);
    this.explosion.reset();
  }

  this.isHit = false;
};

Enemy.prototype.hit = function () {
  if (this.isHit) return;

  Sound.playBlockHitSound();

  this.isHit = true;

  if (!this.explosion) this.explosion = new Explosion();

  this.explosion.explode();
  this.addChild(this.explosion);

  this.texture = Tiny.Texture.fromImage(RESOURCES['s_empty']);
};

Enemy.prototype.update = function () {
  this.setPosition(this._x - Game.directive.x, this._y);
};

/**
 * EnemyManager
 * @constructor
 */
var EnemyManager = function (layer) {
  this._layer = layer;
  this._enemies = [];
  this._enemyPool = new ObjectPool(Enemy);
};

EnemyManager.prototype.update = function () {
  for (var i = 0; i < this._enemies.length; i++) {
    var enemy = this._enemies[i];
    enemy.update();

    if (enemy.getPositionX() < -100 - Game.xOffset && !this._layer._avatar.isDead) {
      this._enemies.splice(i, 1);

      this._layer._view._gameFront.removeChild(enemy);
      i--;
    }
  }
};

EnemyManager.prototype.add = function (x, y) {
  var enemy = this._enemyPool.get();
  enemy._x = x;
  enemy._y = y;
  this._layer._view._gameFront.addChild(enemy);
  this._enemies.push(enemy);
};

EnemyManager.prototype.destroyAll = function () {
  for (var i = 0; i < this._enemies.length; i++) {
    var enemy = this._enemies[i];
    enemy.reset();
    this._layer._view._gameFront.removeChild(enemy);
  }

  this._enemies = [];
};
