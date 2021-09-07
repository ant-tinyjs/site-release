// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var moveToAction = Tiny.MoveTo(1500, Tiny.point(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2));
  var rotateTo360Action = Tiny.RotateTo(2000, { rotation: Tiny.PI_2 });

  this.addChild(sprite);
  sprite.setAnchor(0.5);
  // 小蚂蚁在移动后再进行旋转
  sprite.runSequenceAction(moveToAction, rotateTo360Action);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
