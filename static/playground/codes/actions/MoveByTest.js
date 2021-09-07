// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  // x方向移动120像素，y方向移动240像素
  var action = Tiny.MoveBy(3000, Tiny.point(120, 240));

  this.addChild(sprite);
  sprite.setPosition(200, 50);
  sprite.runAction(action);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
