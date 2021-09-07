// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var einsteinSprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png');
  var fadeInAction = Tiny.FadeIn(1000);
  var fadeOutAction = Tiny.FadeOut(1000);
  fadeOutAction.setDelay(500);
  fadeOutAction.onComplete = function() {
    einsteinSprite.runAction(fadeInAction);
  };
  fadeInAction.onComplete = function() {
    einsteinSprite.runAction(fadeOutAction);
  };

  this.addChild(einsteinSprite);
  einsteinSprite.runAction(fadeOutAction);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
