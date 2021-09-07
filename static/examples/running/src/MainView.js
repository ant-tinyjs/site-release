/* eslint-disable */

var MainView = function (layer) {
  this._layer = layer;

  this._hud = new Tiny.Container();
  this._container = new Tiny.Container();
  this._game = new Tiny.Container();
  this._gameFront = new Tiny.Container();

  this._container.addChild(this._game);
  this._container.addChild(this._gameFront);

  this._layer.addChild(this._container);
  this._layer.addChild(this._hud);

  if (Game.currentMode == Game.mode.MENU) {
    this.normalBackground = new LowFiBackground();
  } else {
    this.normalBackground = new Background();
  }
  this.joyBackground = new JoyBackground();

  this._magma = new Magma(this._gameFront);

  this._score = new Score();
  this._bestScore = new BestScore();

  //背景
  this._background = this.normalBackground;


  this._game.addChild(this._background);
  this._hud.addChild(this._score);
  this._hud.addChild(this._bestScore);

  this._trail = new Trail(this._game);
  this._trailFire = new TrailFire(this._game);

  this._score.setOpacity(0);
  this._bestScore.setOpacity(0);
  this._score.setPosition(Tiny.WIN_SIZE.width + 300, 12);
  this._bestScore.setPosition(Tiny.WIN_SIZE.width + 300, 100);

  this._zoom = 1;

  this._white = Tiny.Sprite.fromImage(RESOURCES['s_white_square']);
  this._white.setScale(Tiny.WIN_SIZE.width / 16, Tiny.WIN_SIZE.height / 16);

  Game.xOffset = this._container.getPositionX();
  /*
   this._splash = new Splash();
   this._splash.setPosition(300, 300);

   this._game.addChild(this._splash);
   */
};

MainView.prototype.constructor = MainView;

MainView.prototype.showHud = function () {
  this._score.setOpacity(1);
  this._bestScore.setOpacity(1);

  var moveToAction = Tiny.MoveTo(1000, {x: Tiny.WIN_SIZE.width - 20});
  moveToAction.setEasing(Tiny.TWEEN.Easing.Elastic.Out);
  this._score.runAction(moveToAction);
  this._bestScore.runAction(moveToAction);
};

MainView.prototype.update = function () {
  if (Game.currentMode != Game.mode.MENU) {
    var ratio = (this._zoom - 1);
    var position = -Tiny.WIN_SIZE.width / 2;
    var position2 = -this._layer._avatar.getPositionX();
    var inter = position + (position2 - position) * ratio;

    this._container.setPosition(inter * this._zoom, -this._layer._avatar.getPositionY() * this._zoom);

    this._container.position.x += Tiny.WIN_SIZE.width / 2;
    this._container.position.y += Tiny.WIN_SIZE.height / 2;

    Game.xOffset = this._container.getPositionX();

    if (this._container.getPositionY() > 0) this._container.setPositionY(0);
    var yMax = -Tiny.WIN_SIZE.height * this._zoom;
    yMax += Tiny.WIN_SIZE.height;

    if (this._container.getPositionY() < yMax) this._container.setPositionY(yMax);

    this._container.setScale(this._zoom);
  }

  this._trail._target = this._layer._avatar;
  this._trailFire._target = this._layer._avatar;

  this._trail.update();
  this._trailFire.update();

  this._magma.setPosition(Game.directive.x + 4000);
  this._bestScore.update();
  this._score.setScore(Math.round(this._layer.score));
};

MainView.prototype.joyrideMode = function () {
  this._game.removeChild(this._background);
  this._background = this.joyBackground;
  this._game.addChildAt(this._background, 0);
  this._layer.addChild(this._white);
  this._white.setOpacity(1);

  var fadeOut = Tiny.FadeOut(700);
  fadeOut.setEasing(Tiny.TWEEN.Easing.Sinusoidal.Out);
  this._white.runAction(fadeOut);
};

MainView.prototype.normalMode = function () {
  this._game.removeChild(this._background);
  this._background = this.normalBackground;
  this._game.addChildAt(this._background, 0);
  this._layer.addChild(this._white);
  this._white.setOpacity(1);

  var fadeOut = Tiny.FadeOut(500);
  fadeOut.setEasing(Tiny.TWEEN.Easing.Sinusoidal.Out);
  this._white.runAction(fadeOut);
};
