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
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/vine.json',
      metadata: {
        spineSkeletonScale: 0.5,
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
  var debuggerInstance = new Tiny.spine.Debugger(spineInstance, {
    controlBones: ['base', 'vine-control1', 'vine-control2', 'vine-control3', 'vine-control4'],
    drawMeshHull: true,
    drawMeshTriangles: true,
    drawPaths: true,
    drawBones: true,
  });

  this.addChild(container);
  container.addChild(spineInstance);
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2), Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineInstance.state.setAnimation(0, 'animation', true);

  // 通过 Bone 获取控制点
  debuggerInstance.controlBones.forEach(function(name) {
    var controlbar = debuggerInstance.controlBonesContainer.getChildByName(name + '-graphics');

    controlbar.setEventEnabled(true);
    controlbar.on('pointerdown', function() {
      console.log(name, 'clicked');
    });
  });
};
