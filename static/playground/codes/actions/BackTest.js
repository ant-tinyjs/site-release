// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var action = Tiny.MoveBy(1000, Tiny.point(100, 200));

  this.addChild(sprite);
  sprite.setPosition(200, 100);
  // x方向移动了100像素，y方向移动了200像素，然后回到{200, 100}
  sprite.runAction(Tiny.Back(action));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
