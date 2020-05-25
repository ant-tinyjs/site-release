// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var action = Tiny.MoveTo(2000, Tiny.point(Tiny.WIN_SIZE.width - 100, Tiny.WIN_SIZE.height - 120));
  action.setEasing(Tiny.TWEEN.Easing.Exponential.InOut);

  this.addChild(sprite);
  sprite.runAction(action);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
