// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var antSprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var einsteinSprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png');
  var scaleToAction = Tiny.ScaleTo(500, Tiny.scale(2));
  var moveToAction = Tiny.MoveTo(1500, Tiny.point(100, 100));

  this.addChild(antSprite);
  this.addChild(einsteinSprite);
  einsteinSprite.setOpacity(0);

  moveToAction.onComplete = function(tween, object) {
    antSprite.runAction(Tiny.FadeOut());
    einsteinSprite.runSequenceAction(Tiny.FadeIn(), scaleToAction);
    this._onComplete.call(this, tween, object); //eslint-disable-line
  };
  antSprite.runAction(moveToAction);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
