/**
 * 在移动设备上预览压缩纹理格式资源的加载使用
 */
// 主场景
var Layer = function() {
  Tiny.Container.call(this);
  var self = this;
  var loader = new Tiny.loaders.Loader();

  // 由于 Playground 工程已经全局初始化压缩纹理插件，所以以下注释，你在使用时别忘记初始化
  // Tiny.plugins.compressedTexture.init(app.renderer);

  // 1. 检测当前环境是否支持 WebAssembly
  // 2. 只有 WebGL 渲染模式下才走 BASIS 纹理，避免执行无用的 WebAssembly 计算
  if (window.WebAssembly && Tiny.app.renderer.gl) {
    // 此 BASIS 方法是 basis_transcoder.js 提供的 wasm 模块，你需要按类似以下方式加载：
    // <script crossorigin="anonymous" src="https://gw.alipayobjects.com/os/tiny/owl/1.0.8/libs/basis_transcoder.js"></script>
    BASIS().then((Module) => {
      const { BasisFile, initializeBasis } = Module;

      // run module
      initializeBasis();

      // 执行绑定
      Tiny.plugins.compressedTexture.BASISLoader.bindTranscoder(BasisFile);

      start(true);
    });
  } else {
    start();
  }

  function start(useCT) {
    let metadata;

    if (useCT) {
      // 设置 metadata.useFormat 为 basis，告诉加载器明确只使用 BASIS 纹理
      metadata = { useCompressedTexture: true, useFormat: 'basis' };
    }

    /**
     * 对应的 basis 资源文件是：
     * - png: /chicken-fleeing.png
     * - basis: /chicken-fleeing.basis
     */
    loader
      .add('https://gw.alipayobjects.com/os/tiny/owl/1.0.8/assets/compressedtexture/chicken-fleeing/chicken-fleeing.json', {
        metadata: metadata,
      })
      .load((loaderInstance, resources) => {
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

        self.addChild(mc);
      });
  }
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
