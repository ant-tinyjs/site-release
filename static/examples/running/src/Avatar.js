/* eslint-disable */

var Avatar = function () {
  this._pos = new Tiny.Point();

  this._runningTextures = [];
  this._flyTextures = [];
  this._crashTextures = [];

  for (var i = 1; i <= 9; i++) {
    this._runningTextures.push(Tiny.Texture.fromFrame('run_0' + i + '.png'));
  }
  for (var i = 1; i <= 3; i++) {
    this._flyTextures.push(Tiny.Texture.fromImage('fly_0' + i + '.png'));
  }
  for (var i = 1; i <= 3; i++) {
    this._crashTextures.push(Tiny.Texture.fromImage('crash_0' + i + '.png'));
  }

  Tiny.AnimatedSprite.call(this, this._runningTextures);

  //帧帧动画速度
  this.animationSpeed = 0.23;

  this.setAnchor(0.5);

  this._pos.y = 477;
  this.ground = 477;
  this.gravity = 0.3;

  this.baseSpeed = 8;
  this.speed = new Tiny.Point(this.baseSpeed, 0);

  this.isFlying = false;
  this.accel = 0;

//    this.width = 26;
//    this.height = 37;

  this.onGround = false;
  this.rotationSpeed = 0;
  this.joyRiding = false;
  this.level = 1;
  this.realAnimationSpeed = 0.23;
};

Avatar.prototype = Object.create(Tiny.AnimatedSprite.prototype);
Avatar.prototype.constructor = Avatar;

Avatar.prototype.doUpdate = function () {
  if (this.isDead) {
    this.updateDieing();
  } else {
    this.updateRunning();
  }
};

Avatar.prototype.joyrideMode = function () {
  this.joyRiding = true;
  Sound.playHyperModeSound();

  new Tiny.TWEEN.Tween(this.speed)
    .to({x: 20}, 300)
    .easing(Tiny.TWEEN.Easing.Cubic.In)
    .start();

  this.realAnimationSpeed = 0.23 * 4;
};

Avatar.prototype.normalMode = function () {
  this.joyRiding = false;
  if (this.onGround === true) {
    Sound.playFootLoopRegularSound();
  }
  new Tiny.TWEEN.Tween(this.speed)
    .to({x: this.baseSpeed}, 600)
    .easing(Tiny.TWEEN.Easing.Cubic.Out)
    .start();

  this.realAnimationSpeed = 0.23;
};

Avatar.prototype.updateRunning = function () {
  this.animationSpeed = this.realAnimationSpeed * Game.time.DELTA_TIME * this.level;

  if (this.isActive) {
    this.isFlying = true;
  }

  if (this.isFlying) {
    this.accel = 0.6;
    this.speed.y -= this.accel * Game.time.DELTA_TIME;
    if (this.speed.y > 0) this.speed.y -= 0.3 * Game.time.DELTA_TIME;
  } else {
    if (this.speed.y < 0) this.speed.y += 0.05 * Game.time.DELTA_TIME;
  }

  this.speed.y += this.gravity * Game.time.DELTA_TIME;

  if (this.speed.y > 8) this.speed.y = 8;
  if (this.speed.y < -9) this.speed.y = -9;

  this._pos.x += this.speed.x * Game.time.DELTA_TIME * this.level;
  this._pos.y += this.speed.y * Game.time.DELTA_TIME;

  if (this.onGround !== this.onGroundCache) {
    this.onGroundCache = this.onGround;

    if (this.onGround) {
      this.textures = this._runningTextures;
      if (this.joyRiding === true) {
        Sound.playFootLoopFastSound();
      } else {
        Sound.playFootLoopRegularSound();
      }
    } else {
      this.textures = this._flyTextures;
    }
  }

  Game.directive.x = this._pos.x - 100;

  this.setPosition(this._pos.x - Game.directive.x, this._pos.y - Game.directive.y);

  this.rotation += (this.speed.y * 0.05 - this.rotation) * 0.1;
};

Avatar.prototype.updateDieing = function () {
  this.speed.x *= 0.999;

  if (this.onGround) this.speed.y *= 0.99;

  this.speed.y += 0.1;
  this.accel += (0 - this.accel) * 0.1 * Game.time.DELTA_TIME;

  this.speed.y += this.gravity * Game.time.DELTA_TIME;

  this._pos.x += this.speed.x * Game.time.DELTA_TIME;
  this._pos.y += this.speed.y * Game.time.DELTA_TIME;

  Game.directive.x = this._pos.x - 100;

  this.setPosition(this._pos.x - Game.directive.x, this._pos.y - Game.directive.y);

  if (this.speed.x < 5) {
    this.rotation += this.rotationSpeed * (this.speed.x / 5) * Game.time.DELTA_TIME;
  } else {
    this.rotation += this.rotationSpeed * Game.time.DELTA_TIME;
  }
};

Avatar.prototype.jump = function () {
  if (this.isDead) {
    if (this.speed.x < 5) {
      this.isDead = false;
      this.speed.x = 10;
    }
  }

  if (this._pos.y != this.ground) {
    this.isFlying = true;
  } else {
    this.isActive = true;
  }
};

Avatar.prototype.die = function () {
  if (this.isDead) return;

  new Tiny.TWEEN.Tween(Game.time)
    .to({speed: 0.1}, 500)
    .easing(Tiny.TWEEN.Easing.Cubic.Out)
    .onComplete(function () {
      Sound.playsDeathJingleSound();
      new Tiny.TWEEN.Tween(Game.time)
        .to({speed: 1}, 500)
        .delay(1000)
        .start();
    })
    .start();

  this.isDead = true;
  this.bounce = 0;
  this.speed.x = 15;
  this.speed.y = -15;
  this.rotationSpeed = 0.3;
//    this.stop();
};

Avatar.prototype.boil = function () {
  if (this.isDead) return;

  Sound.playLavaSploshSound();
  Sound.playsDeathJingleSound();

  this.isDead = true;
};

Avatar.prototype.fall = function () {
  this.isActive = false;
  this.isFlying = false;
};

Avatar.prototype.resume = function () {
  this.play();
  if (this.onGround) {
    Sound.playFootLoopRegularSound();
  }
};
