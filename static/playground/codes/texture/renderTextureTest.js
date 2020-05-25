// 主场景
var Layer = function(preLayer) {
  Tiny.Container.call(this);
  this.count = 0;

  var renderTexture = Tiny.RenderTexture.create(
    Tiny.WIN_SIZE.width,
    Tiny.WIN_SIZE.height,
  );
  var renderTexture2 = Tiny.RenderTexture.create(
    Tiny.WIN_SIZE.width,
    Tiny.WIN_SIZE.height,
  );
  var currentTexture = renderTexture;

  var outputSprite = new Tiny.Sprite(currentTexture);
  outputSprite.x = Tiny.WIN_SIZE.width / 2;
  outputSprite.y = Tiny.WIN_SIZE.height / 2;
  outputSprite.setAnchor(0.5);
  this.addChild(outputSprite);

  var container = new Tiny.Container();
  container.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  this.addChild(container);

  var ants = [
    'ant.png',
    'cow.png',
    'einstein.png',
    'lamp.png',
    'super.png',
  ];

  var items = [];

  for (var i = 0; i < 20; i++) {
    var item = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/' + ants[i % ants.length]);
    item.setPosition(Math.random() * 400 - 200, Math.random() * 400 - 200);
    item.setAnchor(0.5);
    container.addChild(item);
    items.push(item);
  }

  var count = 0;

  Tiny.app.onUpdate(() => {
    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      item.rotation += 0.1;
    }

    count += 0.01;

    var temp = renderTexture;
    renderTexture = renderTexture2;
    renderTexture2 = temp;

    outputSprite.texture = renderTexture;

    container.rotation -= 0.01;
    outputSprite.scale.set(1 + Math.sin(count) * 0.2);

    Tiny.app.renderer.render(Tiny.app.stage, renderTexture2, false);
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
