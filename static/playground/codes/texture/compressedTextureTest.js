/**
 * 在移动设备上预览压缩纹理格式资源的加载使用
 */
// 主场景
var Layer = function() {
  Tiny.Container.call(this);
  var loader = new Tiny.loaders.Loader();

  // 由于 Playground 工程已经全局初始化压缩纹理插件，所以以下注释，你在使用时别忘记初始化
  // Tiny.plugins.compressedTexture.init(app.renderer);

  /**
   * 对应的资源文件分别是：
   * - png: /chicken-fleeing.png
   * - astc: /chicken-fleeing.astc.ktx
   * - pvr: /chicken-fleeing.pvr.ktx
   */
  loader.add('https://gw.alipayobjects.com/os/tiny/resources/1.0.6/compressedtexture/chicken-fleeing/chicken-fleeing.json', {
    metadata: { useCompressedTexture: true },
  });
  loader.load((loaderInstance, resources) => {
    var textures = [];
    for (var i = 1; i <= 13; i++) {
      // 通过 Texture 的 fromFrame 方法创建纹理。frame 名就是 tileset 资源文件里的 frameId
      textures.push(Tiny.Texture.fromFrame('0' + (i < 10 ? '0' + i : i) + '.png'));
    }
    // 通过 AnimatedSprite 构造函数创建帧动画
    var mc = new Tiny.AnimatedSprite(textures);
    // 设置动画速度
    mc.animationSpeed = 0.15;
    mc.play();

    this.addChild(mc);
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
