// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  // 隐藏100ms，显示1000ms
  var action = Tiny.Blink(100, 1000);

  this.addChild(sprite);
  // 如此频繁三次
  sprite.runAction(Tiny.Repeat(3, action));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
