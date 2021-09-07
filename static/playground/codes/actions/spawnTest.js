// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var scaleByAction = Tiny.ScaleBy(1200, Tiny.scale(0.25, 2));
  var rotateTo360Action = Tiny.RotateTo(3000, { rotation: Tiny.PI_2 });

  this.addChild(sprite);
  sprite.setAnchor(0.5);
  sprite.setPosition(200, 200);
  // 小蚂蚁在缩放的同时进行旋转
  sprite.runAction(Tiny.Back(scaleByAction), rotateTo360Action);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
