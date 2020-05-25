// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  // 逆时针旋转75度
  var action = Tiny.RotateBy(1000, { rotation: Tiny.deg2radian(-75) });

  this.addChild(sprite);
  // 设置顺时针方向旋转角度75度
  sprite.setRotation(Tiny.deg2radian(75));
  sprite.setAnchor(0.5);
  sprite.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  // 动画完成后，正好回到0度
  sprite.runAction(action);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
