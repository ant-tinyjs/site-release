/**
 * 注意：因为此功能用到 Sprite 作为 mask，故仅 WebGL 渲染模式下有效
 */
// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var brush = new Tiny.Graphics();
  brush.beginFill(0xffffff);
  brush.drawCircle(0, 0, 50);
  brush.endFill();

  var background = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/bg/pic2.png');
  this.addChild(background);

  var imageToReveal = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/bg/pic1.jpg');
  this.addChild(imageToReveal);

  var renderTexture = Tiny.RenderTexture.create(Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);

  var renderTextureSprite = new Tiny.Sprite(renderTexture);
  this.addChild(renderTextureSprite);
  imageToReveal.mask = renderTextureSprite;

  this.setEventEnabled(true);
  this.on('pointerdown', pointerDown);
  this.on('pointerup', pointerUp);
  this.on('pointermove', pointerMove);

  var dragging = false;

  function pointerMove(event) {
    if (dragging) {
      brush.position.copy(event.data.global);
      Tiny.app.renderer.render(brush, renderTexture, false, null, false);
    }
  }

  function pointerDown(event) {
    dragging = true;
    pointerMove(event);
  }

  function pointerUp(event) {
    dragging = false;
  }
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
