/* eslint-disable */

var BestScore = function () {
  Tiny.Sprite.call(this);

  this.ratio = 0;

  this.glyphs = {};

  for (var i = 0; i <= 10; i++) {
    if (i == 10) i = '_';
    this.glyphs[i] = Tiny.Texture.fromImage(RESOURCES['s_s_font' + i]);
  }

  this.digits = [];

  for (var i = 0; i < 100; i++) {
    this.digits[i] = new Tiny.Sprite(this.glyphs[i]);
    this.digits[i].setScale(0.36);
    this.addChild(this.digits[i]);
  }

  this._bestScore = Util.storage.get('RUNNING_BEST_SCORE');

  this.title = Tiny.Sprite.fromImage(RESOURCES['s_personal_best']);
  this.title.setPositionY(1);
  this.addChild(this.title);
};

BestScore.prototype = Object.create(Tiny.Sprite.prototype);
BestScore.prototype.constructor = BestScore;

BestScore.prototype.setScore = function (score) {
  var split = Score.formatScore(score).split('');
  var position = 0;
  var gap = 3;

  this.title.setPositionX(0);
  position += 70 + gap;

  for (var i = 0; i < split.length; i++) {
    var digit = this.digits[i];
    digit.setVisible(true);
    digit.texture = this.glyphs[split[i]];
    digit.setPositionX(position);
    position += digit.width - gap;
  }

  this.title.position.x -= position;

  for (var i = 0; i < this.digits.length; i++) {
    this.digits[i].position.x -= position;
  }

  for (var i = split.length; i < this.digits.length; i++) {
    this.digits[i].setVisible(false);
  }
};

BestScore.prototype.jump = function () {
  this.ratio = 2.2;
};

BestScore.prototype.update = function () {
  this.setScore(Math.round(parseInt(this._bestScore)) || 0);
};
