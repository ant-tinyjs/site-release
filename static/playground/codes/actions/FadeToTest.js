// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  // 渐隐到0.1透明度
  var action = Tiny.FadeTo(1000, 0.1);

  this.addChild(sprite);
  sprite.setOpacity(0.8);
  // 小蚂蚁的透明度会从 0.8 变到 0.1
  sprite.runAction(action);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
