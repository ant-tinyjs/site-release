/**
 * 此示例需要安装插件：tinyjs-plugin-dragonbones
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var self = this;
  var loader = new Tiny.loaders.Loader();

  loader
    .add('dragonBonesData', 'https://gw.alipayobjects.com/zos/tiny/resources/1.0.3/dragonbones/chicken_ske.json')
    .add('textureDataA', 'https://gw.alipayobjects.com/zos/tiny/resources/1.0.3/dragonbones/chicken_tex.json')
    .add('textureA', 'https://gw.alipayobjects.com/zos/tiny/resources/1.0.3/dragonbones/chicken_tex.png')
    .load(function(loader, resources) {
      self.initDragonBones(resources);
    });
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.initDragonBones = function(resources) {
  // 添加骨骼数据 素材通过 DragonBones Pro 默认示例导出
  Tiny.DragonBones.addDragonBonesData(resources['dragonBonesData'].data);
  Tiny.DragonBones.addTextureAtlasData(resources['textureDataA'].data, resources['textureA'].texture);

  // => START 创建骨骼动画
  var armatureDisplay = Tiny.DragonBones.buildArmatureDisplay('Chicken');

  // armatureDisplay.meshCanvasRenderDrawImageTimes = 3; // 如果用到网格，修复Canvas渲染模式下网格渲染间隙问题
  armatureDisplay.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  armatureDisplay.play('eating');
  this.addChild(armatureDisplay);
  // <= END 创建骨骼动画

  // 重要：记得销毁
  this.on('removed', function() {
    armatureDisplay.dispose();
  });
};
