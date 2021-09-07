// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 实例化一个 Loader
  var loader = new Tiny.loaders.Loader();
  // 加载 tileset 资源文件
  loader
    .add('https://a.alipayobjects.com/g/H5Promo/618-payment-promotion/1.0.4/res/images/mole_tile.json')
    .load(() => {
      // 以 frameId 从 TextureCache 里获取纹理
      var aliMoleHitTexture = Tiny.TextureCache['ali_mole_hit.png'];
      var dcMoleTexture = Tiny.TextureCache['dc_mole.png'];
      var aliMoleHitSprite = new Tiny.Sprite(aliMoleHitTexture);
      var dcMoleSprite = new Tiny.Sprite(dcMoleTexture);

      dcMoleSprite.setPositionX(150);
      this.addChild(aliMoleHitSprite);
      this.addChild(dcMoleSprite);
    });
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
