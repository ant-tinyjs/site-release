// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  // x方向移动10像素，y方向移动20像素
  var action = Tiny.MoveBy(1000, Tiny.point(10, 20));

  this.addChild(sprite);
  // 如此频繁三次，最终x方向移动了30像素，y方向移动了60像素
  sprite.runAction(Tiny.Repeat(3, action));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
