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
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/tank.json',
      metadata: {
        spineSkeletonScale: 0.3,
        spineAtlasFile: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/atlas2.atlas',
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
  // eslint-disable-next-line no-unused-vars
  var debuggerInstance = new Tiny.spine.Debugger(spineInstance, {
    drawPaths: true,
    drawBones: true,
  });

  this.addChild(container);
  this.container = container;
  this.spineInstance = spineInstance;
  container.addChild(spineInstance);
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2), Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineInstance.state.setAnimation(0, 'drive', true);
};

Layer.prototype.updateTransform = function() {
  if (this.spineInstance) {
    var skeleton = this.spineInstance.skeleton;
    var x = skeleton.findBone('tankRoot').worldX;

    this.container.setPositionX(-x - Tiny.WIN_SIZE.width + 200);
  }

  this.containerUpdateTransform();
};
