// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var action = Tiny.FadeIn(1000);

  this.addChild(sprite);
  sprite.setOpacity(0);
  sprite.runAction(action);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
