// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/zos/rmsportal/feRRHmdAYifYMyChbUbC.png');
  // x方向移动10像素，y方向移动20像素
  var action = Tiny.MoveBy(1000, Tiny.point(10, 20));

  this.addChild(sprite);
  // 每秒移动{10, 20}，最终离开屏幕所见区域
  sprite.runAction(Tiny.RepeatForever(action));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
