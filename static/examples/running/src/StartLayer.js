/* eslint-disable */

var StartLayer = function () {
  Tiny.Container.call(this);

  this.setEventEnabled(false);

  this._avatar = new Avatar();
  this._view = new MainView(this);

  this._segmentManager = new SegmentManager(this);
  this._enemyManager = new EnemyManager(this);
  this._pickupManager = new PickupManager(this);
  this._groundManager = new GroundManager(this);
  this._collisionManager = new CollisionManager(this);

  this._avatar.setVisible(false);

  this.bulletMult = 1;
  this.pickupCount = 0;
  this.score = 0;
  this.joyrideMode = false;
  this.joyrideCountdown = 0;
  this.isPlaying = false;
  this.levelCount = 0;

  this._view._game.addChild(this._avatar);

  this._gameOver = new GameOver();

  this._pauseButton = Tiny.Sprite.fromImage(RESOURCES['s_button_pause']);
  this._pauseButton.setEventEnabled(true);
  this._pauseButton.setPosition(Tiny.WIN_SIZE.width - 60, Tiny.WIN_SIZE.height - 60);
  this._pauseButton.setAnchor(0.5);
  this._pauseButton.setOpacity(0);
  this._pauseButton.setVisible(false);

  this.addChild(this._gameOver);
  this.addChild(this._pauseButton);

  var self = this;
  //键盘控制
  var keySpace = new Tiny.Keyboard(32);
  var commandSpace = new Tiny.Keyboard(91);
  var homeSpace = new Tiny.Keyboard(82);
  var selectSpace = new Tiny.Keyboard(23);
  this._view._container.mousedown = this._view._container.touchstart = keySpace.press = selectSpace.press = function (e) {
    self._onTouchStart();
  };
  this._view._container.mouseup = this._view._container.touchend = keySpace.release = selectSpace.release = function (e) {
    self._onTouchEnd();
  };
  this._pauseButton.tap = this._pauseButton.mouseup = commandSpace.press = homeSpace.press = function (e) {
    self.onPaused();
  };

  this.onReady();
};
StartLayer.prototype = Object.create(Tiny.Container.prototype);
StartLayer.prototype.constructor = StartLayer;

StartLayer.prototype.onReady = function () {
  this.black = Tiny.Sprite.fromImage(RESOURCES['s_black_square']);
  this.black.setScale(Tiny.WIN_SIZE.width / 16, Tiny.WIN_SIZE.height / 16);
  this._view._hud.addChild(this.black);

  this.button = this.createStartButton();
  this._view._hud.addChild(this.button);

  this.countDown = new CountDown();
  this._view._hud.addChild(this.countDown);

  var self = this;
  var fadeToAction = Tiny.FadeTo(300, 0.75);
  fadeToAction.setDelay(500);
  fadeToAction.onComplete = function () {
    self._view._container.setEventEnabled(true);
  };
  this.black.runAction(fadeToAction);
  this.button.runAction(fadeToAction);
};

StartLayer.prototype.createStartButton = function () {
  var btn;
  if (Tiny.config.runtime != 'tv') {
    btn = new Tiny.Text('奔跑吧！', {
      fontSize: 64,
      fontFamily: 'Snippet',
      fill: 'white',
      stroke: '#a4410e',
      strokeThickness: 4
    });
  } else {
    btn = Tiny.Sprite.fromImage(RESOURCES['s_button_start']);
  }
  btn.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  btn.setAnchor(0.5, 0.5);
  btn.setOpacity(0);

  return btn;
};

StartLayer.prototype._onTouchStart = function () {
  var self = this;

  var black = self.black, btn = self.button;
  if (!Game.interactive) return;

  if (Game.currentMode === Game.mode.MENU) {
    Game.interactive = false;
    self.start();

    Game.currentMode = Game.mode.PRE;
    Sound.playFootLoopRegularSound();

    if (black) {
      black.runAction(Tiny.FadeOut(200));
    }

    var fadeOutAction = Tiny.FadeOut(300);
    fadeOutAction.onComplete = function () {
      self._view._hud.removeChild(btn);
      self._view.showHud();
      self._view._hud.removeChild(black);
      self.countDown.start(function () {
        self.onCountdownComplete();
      });
    };
    btn.runAction(fadeOutAction);
  } else if (Game.currentMode === Game.mode.GAME_OVER) {
    Game.interactive = false;

    self.addChild(black);

    var fadeInAction = Tiny.FadeIn(300);
    var fadeOutAction = Tiny.FadeOut(500);
    fadeOutAction.setDelay(500);
    fadeInAction.onComplete = function () {
      self._avatar.normalMode();
      self.joyrideComplete();

      self._avatar._pos.x = 0;
      Game.directive.x = -100;
      self.reset();
      self._gameOver.setVisible(false);
      Game.currentMode = Game.mode.PRE;

      black.runAction(fadeOutAction);
    };
    fadeOutAction.onComplete = function () {
      self.start();
      self.countDown.start(function () {
        self.onCountdownComplete();
      });
    };
    black.runAction(fadeInAction);
  } else {
    if (self.isPlaying) self._avatar.jump();
  }
};

StartLayer.prototype._onTouchEnd = function () {
  if (this.isPlaying) {
    this._avatar.fall();
  }
};

StartLayer.prototype.onCountdownComplete = function () {
  var pauseButton = this._pauseButton;
  Game.interactive = true;
  Game.currentMode = Game.mode.PLAYING;

  pauseButton.visible = true;

  var fadeInAction = Tiny.FadeIn(600);
  fadeInAction.onComplete = function () {
    pauseButton.interactive = true;
  };
  pauseButton.runAction(fadeInAction);
};

StartLayer.prototype.onPaused = function () {
  if (!this._pauseButton.visible) {
    return;
  }
  this._pauseButton.setScale(0.5);
  var scaleToAction = Tiny.ScaleTo(500, Tiny.scale(1));
  scaleToAction.setEasing(Tiny.TWEEN.Easing.Elastic.Out);
  this._pauseButton.runAction(scaleToAction);

  if (Game.currentMode === Game.mode.PAUSED) {
    Game.interactive = true;
    this._avatar.resume();
    Game.currentMode = Game.mode.PLAYING;

    this._pauseButton.texture = Tiny.Texture.fromImage(RESOURCES['s_button_pause']);

    if (this.isPlaying) {
      this._avatar.fall();
    }
  } else {
    Game.interactive = false;
    this._avatar.stop();
    Game.currentMode = Game.mode.PAUSED;

    this._pauseButton.texture = Tiny.Texture.fromImage(RESOURCES['s_button_start']);
  }
};

StartLayer.prototype.start = function () {
  this._segmentManager.reset();
  this._enemyManager.destroyAll();
  this._pickupManager.destroyAll();
  this.isPlaying = true;
  this.score = 0;
  this._avatar.level = 1;
  this._avatar._pos.y = Tiny.WIN_SIZE.height - 143;
  this._avatar.speed.y = 0;
  this._avatar.speed.x = this._avatar.baseSpeed;
  this._avatar.rotation = 0;
  this._avatar.isFlying = false;
  this._avatar.isDead = false;
  this._avatar.setVisible(true);
  this._avatar.play();
  this.bulletMult = 1;
};

//OVERWRITE
StartLayer.prototype.updateTransform = function () {
  Game.time.update();

  var targetCamY = 0;
  if (targetCamY > 0) targetCamY = 0;
  if (targetCamY < -70) targetCamY = -70;

  Game.directive.y = targetCamY;

  if (Game.currentMode !== Game.mode.PAUSED) {

    this._avatar.doUpdate();
    this._collisionManager.update();
    this._segmentManager.update();
    this._groundManager.update();
    this._enemyManager.update();
    this._pickupManager.update();

    if (this.joyrideMode) {
      this.joyrideCountdown -= Game.time.DELTA_TIME;

      if (this.joyrideCountdown <= 0) {
        this.joyrideComplete();
      }
    }

    this.levelCount += Game.time.DELTA_TIME;

    if (this.levelCount > (60 * 60)) {
      this.levelCount = 0;
      this._avatar.level += 0.05;
      Game.time.speed += 0.05;
    }
  }

  this._view.update();

  this.containerUpdateTransform();
};

StartLayer.prototype.reset = function () {
  this._enemyManager.destroyAll();
  this._groundManager.destroyAll();

  this._segmentManager.reset();

  this._view.zoom = 1;
  this.pickupCount = 0;
  this.levelCount = 0;
  this._avatar.level = 1;

  this._view._game.addChild(this._avatar);
};

StartLayer.prototype.joyrideComplete = function () {
  this.joyrideMode = false;
  this.pickupCount = 0;
  this.bulletMult += 0.3;
  this._view.normalMode();
  this._avatar.normalMode();
  this._enemyManager.destroyAll();
};

StartLayer.prototype.gameOver = function () {
  this.isPlaying = false;

  var nHighscore = Util.storage.get('RUNNING_BEST_SCORE');
  if (!nHighscore || this.score > nHighscore) {
    Util.storage.set('RUNNING_BEST_SCORE', this.score);
  }

  this.onGameover();

  this._view._game.addChild(this._avatar);
};

StartLayer.prototype.onGameover = function () {
  var pauseButton = this._pauseButton;
  pauseButton.interactive = false;

  var fadeOutAction = Tiny.FadeOut(600);
  fadeOutAction.onComplete = function () {
    pauseButton.setVisible(false);
  };
  pauseButton.runAction(fadeOutAction);

  Game.currentMode = Game.mode.GAME_OVER;
  Game.interactive = false;
};

StartLayer.prototype.showGameover = function () {
  this._gameOver.setVisible(true);
  var fadeInAction = Tiny.FadeIn(300);
  fadeInAction.onComplete = function () {
    Game.interactive = true;
  };
  this._gameOver.runAction(fadeInAction);
};

StartLayer.prototype.pickup = function () {
  if (this._avatar.isDead) return;

  this.score += 10;

  Sound.playPickupGrabSound();

  if (this.joyrideMode) {
    return;
  }

  this._view._score.jump();
  this.pickupCount++;

  if (this.pickupCount >= 50 * this.bulletMult && !this._avatar.isDead) {
    this.pickupCount = 0;
    this.joyrideMode = true;
    this.joyrideCountdown = 60 * 10;
    this._view.joyrideMode();
    this._avatar.joyrideMode();
    this._avatar._pos.x = 0;
    Game.directive.x = this._avatar._pos.x - 100;
    this._enemyManager.destroyAll();
    this._pickupManager.destroyAll();
    this._groundManager.destroyAll();
    this._segmentManager.reset();
  }
};
