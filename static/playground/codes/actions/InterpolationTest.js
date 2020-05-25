// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var action = Tiny.MoveTo(1200, {
    x: [0, Tiny.WIN_SIZE.width, 100],
    y: [Tiny.WIN_SIZE.height - 120],
  });
  action.setInterpolation(Tiny.TWEEN.Interpolation.Bezier);

  this.addChild(sprite);
  sprite.runAction(action);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
