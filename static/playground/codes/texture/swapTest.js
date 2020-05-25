/**
 * 点击画布切换纹理
 */
// 主场景
var Layer = function() {
  Tiny.Container.call(this);
  var bol = false;

  var dcTexture = Tiny.Texture.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/moles/dc_mole.png');
  var pdTexture = Tiny.Texture.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/moles/pd_mole.png');

  var sprite = new Tiny.Sprite(dcTexture);
  sprite.setAnchor(0.5);
  sprite.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  this.addChild(sprite);

  this.setEventEnabled(true);
  this.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.on('pointertap', function() {
    bol = !bol;
    if (bol) {
      sprite.texture = pdTexture;
    } else {
      sprite.texture = dcTexture;
    }
  });

  var action = Tiny.RotateBy(100, { rotation: Tiny.deg2radian(5) });
  sprite.runAction(Tiny.RepeatForever(action));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
