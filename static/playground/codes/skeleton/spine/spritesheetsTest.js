/**
 * 此示例需要安装插件：tinyjs-plugin-spine
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var loader = new Tiny.loaders.Loader();

  loader
    .add({
      name: 'spineRes',
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/raptor.json',
      metadata: {
        spineSkeletonScale: 0.3,
        spineAtlasFile: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/atlas1.atlas',
      },
    })
    .load(this.initSpine.bind(this));
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.initSpine = function(loader, res) {
  var offset = new Tiny.spine.Vector2();
  var bounds = new Tiny.spine.Vector2();
  var container = new Tiny.Container();
  var spineInstance = new Tiny.spine.Spine(res.spineRes.spineData);
  var spineSeqInstance = new Tiny.spine.Spine(res.spineRes.spineData);

  this.addChild(container);
  container.addChild(spineInstance);
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2) - 250, Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineInstance.state.data.defaultMix = 0.5;
  spineInstance.state.data.setMix('jump', 'walk', 0.3);
  spineInstance.state.setAnimation(0, 'walk', true);

  spineSeqInstance.setPosition(spineInstance.getPositionX() + spineInstance.width + 50, spineInstance.getPositionY());
  spineSeqInstance.state.setAnimation(0, 'walk', true);
  container.addChild(spineSeqInstance);

  // 事件
  spineInstance.setEventEnabled(true);
  spineInstance.on('pointerdown', function() {
    spineInstance.state.setAnimation(0, 'jump', false);
    spineInstance.state.addAnimation(0, 'walk', true, 0);
  });
};
