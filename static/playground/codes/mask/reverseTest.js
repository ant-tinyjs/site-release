// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/bg/pic1.jpg');
  sprite.setScale(0.8);
  container.addChild(sprite);

  var mask = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.1/images/black_square.jpg');
  mask.width = Tiny.WIN_SIZE.width;
  mask.height = Tiny.WIN_SIZE.height;
  mask.setOpacity(0.6);
  container.addChild(mask);

  var g = new Tiny.Graphics();
  g.lineStyle(0);
  g.beginFill(0xFFFFFF);
  g.drawCircle(100, 100, 60);
  g.endFill();
  container.addChild(g);
  g.blendMode = Tiny.BLEND_MODES.OVERLAY;

  container.setEventEnabled(true);
  container.on('pointermove', function(data) {
    var pos = data.data.getLocalPosition(this.parent);
    g.setPosition(~~pos.x - 100, ~~pos.y - 100);
  });

  this.addChild(container);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
