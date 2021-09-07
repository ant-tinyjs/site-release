/* eslint-disable */

var JoyBackground = function () {
  Tiny.Container.call(this);

  this.width = 1000;
  this.scrollPosition = 1500;

  this.swoosh = new Background.createSprite(Tiny.Texture.fromImage(RESOURCES['s_joy_background']), this);
  this.swoosh.speed = 0.7;
  this.setScale(4, 1.7);
};

JoyBackground.prototype = Object.create(Tiny.Container.prototype);
JoyBackground.prototype.constructor = JoyBackground;

JoyBackground.prototype.updateTransform = function () {
  this.scrollPosition = Game.directive.x + 4000;

  this.swoosh && this.swoosh.setPosition(this.scrollPosition);

  this.containerUpdateTransform();
};
