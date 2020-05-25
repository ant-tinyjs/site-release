// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/logo.png');
  this.addChild(sprite);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
