// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();
  var brush = new Tiny.Graphics();
  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/bg/pic1.jpg');

  container.addChild(sprite);
  container.addChild(brush);

  sprite.mask = brush;

  container.setEventEnabled(true);
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  container.on('pointerdown', pointerDown);
  container.on('pointerup', pointerUp);
  container.on('pointermove', pointerMove);
  this.addChild(container);

  var dragging = false;

  function pointerMove(event) {
    if (dragging) {
      var pos = event.data.getLocalPosition(this.parent);
      brush.beginFill(0xffffff);
      brush.drawCircle(pos.x, pos.y, 50);
      brush.endFill();
    }
  }

  function pointerDown(event) {
    dragging = true;
  }

  function pointerUp(event) {
    dragging = false;
  }
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
