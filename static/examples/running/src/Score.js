/* eslint-disable */

var Score = function () {
  Tiny.Sprite.call(this);

  this.ratio = 0;

  this.glyphs = {};

  for (var i = 0; i <= 10; i++) {
    if (i == 10) i = '_';
    this.glyphs[i] = Tiny.Texture.fromImage(RESOURCES['s_s_font' + i]);
  }

  this.digits = [];

  for (var i = 0; i < 8; i++) {
    this.digits[i] = new Tiny.Sprite(this.glyphs[i]);
    this.addChild(this.digits[i]);
  }

  this.setScore(12345);
};

Score.prototype = Object.create(Tiny.Sprite.prototype);
Score.prototype.constructor = Score;

Score.prototype.setScore = function (score) {
  var split = Score.formatScore(score).split('');
  var position = 0;
  var gap = -10;
  for (var i = 0; i < split.length; i++) {
    var digit = this.digits[i];
    digit.setVisible(true);
    digit.texture = this.glyphs[split[i]];
    digit.setPositionX(position);
    position += digit.width + gap;
  }

  for (var i = 0; i < this.digits.length; i++) {
    this.digits[i].position.x -= position;
  }

  for (var i = split.length; i < this.digits.length; i++) {
    this.digits[i].setVisible(false);
  }
};

Score.prototype.jump = function () {
  this.ratio = 2.2;
};

Score.formatScore = function (n) {
  var nArray = n.toString().split('');
  var text = '';
  var total = nArray.length;

  var offset = (total % 3) - 1;
  for (var i = 0; i < total; i++) {
    text += nArray[i];
    if ((i - offset) % 3 == 0 && i != total - 1)text += '_';
  }

  return text;
};
