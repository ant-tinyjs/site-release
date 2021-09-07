/**
 * TinyJS 1.5.0 及以上支持
 */
// 主场景
var Layer = function() {
  Tiny.Container.call(this);
  var self = this;
  var loader = new Tiny.loaders.Loader();

  loader.add({
    url: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/moles/ali_mole.png',
    metadata: {
      pixelFormat: Tiny.TYPES.UNSIGNED_SHORT_4_4_4_4,
    },
  });
  loader.add({
    url: 'https://gw.alipayobjects.com/os/rmsportal/TpNdEfkKbfNBQjgYriHS.json',
    metadata: {
      imageMetadata: {
        pixelFormat: Tiny.TYPES.UNSIGNED_SHORT_4_4_4_4,
      },
    },
  });
  loader.load(function(loaderInstance, resources) {
    self.addChild(Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/moles/ali_mole.png'));

    var textures = [];
    for (var i = 1; i <= 9; i++) {
      // 通过 Texture 的 fromFrame 方法创建纹理。frame 名就是 tileset 资源文件里的 frameId
      textures.push(Tiny.Texture.fromFrame('tileset-chicken-stealing-eating-pirate-0' + (i < 10 ? '0' + i : i) + '.png'));
    }
    // 通过 AnimatedSprite 构造函数创建帧动画
    var mc = new Tiny.AnimatedSprite(textures);
    // 设置动画速度
    mc.animationSpeed = 0.15;
    mc.setPositionY(300);
    mc.play();

    self.addChild(mc);
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
