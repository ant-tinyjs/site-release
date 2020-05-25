// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  // 1. 结束点：{画布宽度 - 50, 画布高度／2}
  // 2. 向上跳跃 160 像素
  // 3. 跳跃 3 次
  var action = Tiny.JumpTo(1200, Tiny.point(Tiny.WIN_SIZE.width - 50, Tiny.WIN_SIZE.height / 2), 160, 3);

  this.addChild(sprite);
  sprite.setAnchor(0.5);
  sprite.setPosition(50, Tiny.WIN_SIZE.height / 2);
  // 动画执行后，y不变化，x从 50 变成 (画布宽度 - 50)
  sprite.runAction(action);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
