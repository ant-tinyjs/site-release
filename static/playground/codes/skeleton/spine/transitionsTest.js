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
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/spineboy.json',
      metadata: {
        spineSkeletonScale: 0.5,
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

  this.spineInstance = spineInstance;
  this.addChild(container);
  container.addChild(spineInstance);

  spineInstance.skeleton.setToSetupPose();
  spineInstance.update(0);
  spineInstance.autoUpdate = false;
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2) - 150, Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineInstance.state.data.defaultMix = 0.25;
  setAnimations(spineInstance.state, 0, 0);

  // no mix
  var spineNoMixInstance = new Tiny.spine.Spine(res.spineRes.spineData);

  this.spineNoMixInstance = spineNoMixInstance;
  container.addChild(spineNoMixInstance);
  spineNoMixInstance.skeleton.setToSetupPose();
  spineNoMixInstance.update(0);
  spineNoMixInstance.autoUpdate = false;
  spineNoMixInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2) + 150, Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineNoMixInstance.state.data.defaultMix = 0;
  setAnimations(spineNoMixInstance.state, -0.25, 0);
};

// 这里使用动画播放调节能力的原因是可以慢速看到是否设置动画 Mix 的变化
Layer.prototype.updateTransform = function() {
  // 调整 delta 改变速度
  var delta = 120;

  this.spineInstance && this.spineInstance.update(1 / delta);
  this.spineNoMixInstance && this.spineNoMixInstance.update(1 / delta);
  this.containerUpdateTransform();
};

function setAnimations(state, delay, first) {
  state.addAnimation(0, 'idle', true, first);
  state.addAnimation(0, 'walk', true, 0.6);
  state.addAnimation(0, 'jump', false, 1);
  state.addAnimation(0, 'run', true, delay);
  state.addAnimation(0, 'walk', true, 1.2);
  state.addAnimation(0, 'run', true, 0.5);
  state.addAnimation(0, 'jump', false, 1);
  state.addAnimation(0, 'run', true, delay);
  state.addAnimation(0, 'jump', true, 0.5);
  state.addAnimation(0, 'walk', true, delay).listener = {
    start: function(trackIndex) {
      setAnimations(state, delay, 0.6);
    },
  };
}
