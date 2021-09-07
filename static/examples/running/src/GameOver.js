/* eslint-disable */

var GameOver = function () {
  Tiny.Sprite.call(this, Tiny.Texture.fromImage(RESOURCES['s_game_over']));

  this.setAnchor(0.5);
  this.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  this.setOpacity(0);
  this.setVisible(false);
};

GameOver.prototype = Object.create(Tiny.Sprite.prototype);
GameOver.prototype.constructor = GameOver;
