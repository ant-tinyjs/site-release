// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var antSprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var einsteinSprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png');
  var action = Tiny.MoveBy(1000, Tiny.point(10, 20));

  this.addChild(antSprite);
  this.addChild(einsteinSprite);
  einsteinSprite.setPosition(0, 100);

  antSprite.runAction(Tiny.Repeat(3, action));
  einsteinSprite.runAction(Tiny.Repeat(3, Tiny.Action.clone(action)));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
