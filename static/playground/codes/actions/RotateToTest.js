// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  // 顺时针旋转到135度
  var action = Tiny.RotateTo(1000, { rotation: Tiny.deg2radian(135) });

  this.addChild(sprite);
  sprite.setAnchor(0.5);
  // 设置顺时针方向旋转角度15度
  sprite.setRotation(Tiny.deg2radian(15));
  sprite.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  // 动画完成后，旋转到135度
  sprite.runAction(action);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
