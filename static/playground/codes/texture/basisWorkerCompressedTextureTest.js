/**
 * 在移动设备上预览压缩纹理格式资源的加载使用
 */
// 主场景
var Layer = function() {
  Tiny.Container.call(this);
  var loader = new Tiny.loaders.Loader();

  // 由于 Playground 工程已经全局初始化压缩纹理插件，所以以下注释，你在使用时别忘记初始化
  // Tiny.plugins.compressedTexture.init(app.renderer);

  // 1. 检测当前环境是否支持 Worker 和 WebAssembly
  // 2. 只有 WebGL 渲染模式下才走 BASIS 纹理，避免执行无用的 WebAssembly 计算
  if (window.Worker && window.WebAssembly && Tiny.app.renderer.gl) {
    // 加载转换器并执行转换
    Tiny.plugins.compressedTexture.WorkedBASISLoader.loadAndRunTranscoder({
      // basis_transcoder 的 js 及 wasm 文件路径，可使用相对路径。
      // 加载后的完整链接为：
      // https://gw.alipayobjects.com/os/tiny/owl/1.0.8/libs/basis_transcoder.js
      // https://gw.alipayobjects.com/os/tiny/owl/1.0.8/libs/basis_transcoder.wasm
      path: 'https://gw.alipayobjects.com/os/tiny/owl/1.0.8/libs',
      // Worker 线程数，默认为 1，最高 8，可按资源数量设置
      threads: 2,
    })
      .then(start.bind(this, true))
      .catch(e => {
        console.log(e);
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
      .add('https://gw.alipayobjects.com/os/tiny/owl/1.0.8/assets/compressedtexture/hao/hao.png', {
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

        this.addChild(mc);
      });
  }
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
