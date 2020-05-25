// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var antSprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var einsteinSprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png');
  var scaleToAction = Tiny.ScaleTo(500, Tiny.scale(2));

  this.addChild(antSprite);
  this.addChild(einsteinSprite);
  einsteinSprite.setPositionY(200);

  scaleToAction.onUpdate = function(tween, object) {
    console.log('update:', 'scaleX:', tween.scaleX, 'scaleY:', tween.scaleY);
    einsteinSprite.setScale(tween.scaleX, tween.scaleY);
    this._onUpdate.call(this, tween, object); //eslint-disable-line
  };
  antSprite.runAction(scaleToAction);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
