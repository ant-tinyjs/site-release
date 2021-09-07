/* eslint-disable */

var LowFiBackground = function () {
  Tiny.Container.call(this);

  this.width = 1000;
  this.scrollPosition = 1500;

  this.swoosh = new Background.createSprite(Tiny.Texture.fromImage(RESOURCES['s_background']), this);
  this.swoosh.speed = 0.7;
};

LowFiBackground.prototype = Object.create(Tiny.Container.prototype);
LowFiBackground.prototype.constructor = LowFiBackground;

LowFiBackground.prototype.updateTransform = function () {
  this.scrollPosition = Game.directive.x + 4000;

  this.swoosh && this.swoosh.setPosition(this.scrollPosition);

  this.containerUpdateTransform();
};
