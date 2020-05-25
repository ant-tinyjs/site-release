// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  // x、y方向都放大2倍
  var action = Tiny.ScaleBy(1200, Tiny.scale(2));

  this.addChild(sprite);
  sprite.setAnchor(0.5);
  sprite.setScale(3, 1.5);
  sprite.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  sprite.runAction(action);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
