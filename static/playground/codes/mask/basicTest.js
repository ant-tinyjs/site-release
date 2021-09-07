var RESOURCES = {
  imagePic1: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/bg/pic1.jpg',
};

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();
  var sprite = Tiny.Sprite.fromImage(RESOURCES['imagePic1']);

  sprite.setScale(0.8);
  container.addChild(sprite);

  var g = new Tiny.Graphics();
  g.lineStyle(0);
  g.beginFill(0xFFFFFF);
  g.drawCircle(100, 100, 60);
  g.endFill();
  container.addChild(g);

  sprite.mask = g;

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
