// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();
  var texture = Tiny.Texture.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');

  // 创建 5*5 宫格
  for (var i = 0; i < 25; i++) {
    var sprite = new Tiny.Sprite(texture);
    sprite.setAnchor(0.5);
    sprite.setScale(0.5);
    sprite.setPosition((i % 5) * 50, Math.floor(i / 5) * 50);
    container.addChild(sprite);
  }

  container.setPivot(container.width / 2, container.height / 2);
  container.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  this.addChild(container);

  var action = Tiny.RotateBy(200, { rotation: Tiny.deg2radian(-5) });
  container.runAction(Tiny.RepeatForever(action));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
