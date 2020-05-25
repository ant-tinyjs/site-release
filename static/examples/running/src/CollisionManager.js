/* eslint-disable */

var CollisionManager = function (layer) {
  this._layer = layer;
};

CollisionManager.prototype.constructor = CollisionManager;

CollisionManager.prototype.update = function () {
  this.avatarVsBlock();
  this.avatarVsPickup();
  this.avatarVsGround();
};

CollisionManager.prototype.avatarVsBlock = function () {
  var enemies = this._layer._enemyManager._enemies;
  var avatar = this._layer._avatar;

  for (var i = 0; i < enemies.length; i++) {
    var enemy = enemies[i];

    var xdist = enemy._x - avatar._pos.x;
    if (xdist > -enemy.width / 2 && xdist < enemy.width / 2) {
      var ydist = enemy._y - avatar._pos.y;

      if (ydist > -enemy.height / 2 - 20 && ydist < enemy.height / 2) {
        if (!avatar.joyRiding) {
          avatar.die();
          this._layer.gameOver();
          enemy.hit();
        }
      }
    }
  }
};

CollisionManager.prototype.avatarVsPickup = function () {
  var pickups = this._layer._pickupManager._pickups;
  var avatar = this._layer._avatar;

  for (var i = 0; i < pickups.length; i++) {
    var pickup = pickups[i];
    if (pickup.isPickedUp) continue;

    var xdist = pickup._x - avatar._pos.x;
    if (xdist > -pickup.width / 2 && xdist < pickup.width / 2) {
      var ydist = pickup._y - avatar._pos.y;

      if (ydist > -pickup.height / 2 && ydist < pickup.height / 2) {
        this._layer._pickupManager.remove(i);
        this._layer.pickup();
      }
    }
  }
};

CollisionManager.prototype.avatarVsGround = function () {
  var grounds = this._layer._groundManager._grounds;
  var avatar = this._layer._avatar;

  var max = grounds.length;
  avatar.onGround = false;

  if (avatar._pos.y > 610) {
    if (this._layer.isPlaying) {
      avatar.boil();
//            this._layer.view.doSplash();
      this._layer.gameOver();
    } else {
      avatar.speed.x *= 0.95;

      if (!Game.interactive) {
        this._layer.showGameover();
        Game.interactive = true;
      }

      if (avatar.bounce === 0) {
        avatar.bounce++;
        avatar.boil();
//                this._layer.view.doSplash();
      }

      return;
    }
  }

  for (var i = 0; i < max; i++) {
    var ground = grounds[i];
    var xdist = ground._x - avatar._pos.x + 1135;
    if (avatar._pos.y > 477) {
      if (xdist > 0 && xdist < 1135) {
        if (avatar.isDead) {
          avatar.bounce++;

          if (avatar.bounce > 2) {
            return;
          }
          Sound.playFallThudSound();
          avatar.textures = [avatar._crashTextures[avatar.bounce]];

          avatar.speed.y *= -0.7;
          avatar.speed.x *= 0.8;

          if (avatar.rotationSpeed > 0) {
            avatar.rotationSpeed = Math.random() * -0.3;
          } else if (avatar.rotationSpeed === 0) {
            avatar.rotationSpeed = Math.random() * 0.3;
          } else {
            avatar.rotationSpeed = 0;
          }
        } else {
          avatar.speed.y = -0.3;
        }

        if (!avatar.isFlying) {
          avatar._pos.y = 478;
          avatar.onGround = true;
        }
      }
    }
  }

  if (avatar._pos.y < 0) {
    avatar._pos.y = 0;
    avatar.speed.y *= 0;
  }
};
