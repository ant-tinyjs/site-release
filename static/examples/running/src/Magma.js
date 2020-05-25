/* eslint-disable */

var Magma = function (parent) {
  this.textures = [];
  for (var i = 0; i <= 7; i++) {
    this.textures.push(new Tiny.Texture.fromImage(RESOURCES['s_magma' + i]));
  }
  for (var i = 6; i > 0; i--) {
    this.textures.push(new Tiny.Texture.fromImage(RESOURCES['s_magma' + i]));
  }

  var texture = this.textures[0];

  this.sprites = [];
  this.spriteWidth = texture.width - 1;
  var amount = 8;

  if (amount < 3) amount = 3;

  for (var i = 0; i < amount; i++) {
    var sprite = new Tiny.Sprite(texture);
    sprite.setPositionY(Tiny.WIN_SIZE.height - sprite.height);
    parent.addChild(sprite);
    this.sprites.push(sprite);
  }

  this.speed = 1;
  this.offset = 0;
  this.count = 0;
};

Magma.prototype.constructor = Magma;

Magma.prototype.setPosition = function (position) {
  var h = this.spriteWidth;
  var frame = ( this.count) % this.textures.length;
  frame = Math.floor(frame);

  this.offset += 2.5;

  position += this.offset;

  this.count += 0.3;
  for (var i = 0; i < this.sprites.length; i++) {
    var pos = -position * this.speed;
    pos += i * h;
    pos %= h * this.sprites.length;
    pos += h * 2;

    this.sprites[i].texture = this.textures[frame];
    this.sprites[i].setPositionX(Math.floor(pos) + 800 - Game.xOffset);
  }
};
