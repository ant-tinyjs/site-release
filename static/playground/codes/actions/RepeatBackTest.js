// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var antSprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var action = Tiny.MoveBy(1000, Tiny.point(100, 200));

  this.addChild(antSprite);

  antSprite.runAction(Tiny.RepeatForever(Tiny.Back(action)));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
