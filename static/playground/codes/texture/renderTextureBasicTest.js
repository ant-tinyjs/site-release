// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();
  this.addChild(container);

  var texture = Tiny.Texture.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/super.png');

  for (var i = 0; i < 25; i++) {
    var ant = new Tiny.Sprite(texture);
    ant.x = (i % 5) * 30;
    ant.y = Math.floor(i / 5) * 30;
    ant.setScale(0.5);
    ant.rotation = Math.random() * (Math.PI * 2);
    container.addChild(ant);
  }

  var rt = Tiny.RenderTexture.create(300, 300, Tiny.SCALE_MODES.LINEAR, 1);

  var sprite = new Tiny.Sprite(rt);
  sprite.setPosition(10, Tiny.WIN_SIZE.height - 310);
  this.addChild(sprite);

  container.setPosition(60, 60);

  Tiny.app.onUpdate(function() {
    Tiny.app.renderer.render(container, rt);
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
