// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 实例化一个 Loader
  var loader = new Tiny.loaders.Loader();
  var tilesetUrl = 'https://gw.alipayobjects.com/os/rmsportal/LpEFSmRsdmTUVaGLqIJf.json';

  // 加载 tileset 资源文件
  loader
    .add(tilesetUrl)
    .load((resourceLoader, resource) => {
      // 判断是否资源加载失败，视情况做兜底处理
      var error = resource[tilesetUrl + '_image'].error;
      if (error) {
        console.error(error);
        this.addChild(new Tiny.Text(error.stack, {
          fontSize: 14,
          fill: 'white',
        }));
        return;
      }
      var textures = [];
      for (var i = 1; i <= 13; i++) {
        // 通过 Texture 的 fromFrame 方法创建纹理。frame 名就是 tileset 资源文件里的 frameId
        textures.push(Tiny.Texture.fromFrame('tileset-chicken-stealing-eating-0' + (i < 10 ? '0' + i : i) + '.png'));
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
