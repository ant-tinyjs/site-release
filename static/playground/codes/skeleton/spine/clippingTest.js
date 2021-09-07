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
  var debuggerInstance = new Tiny.spine.Debugger(spineInstance, {
    drawMeshHull: true,
    drawMeshTriangles: true,
    drawRegionAttachments: true,
    drawClipping: true,
  });

  this.addChild(container);
  container.addChild(spineInstance);
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2) + 200, Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineInstance.state.setAnimation(0, 'portal', true);

  // 事件
  var clickTimes = 0;
  container.setEventEnabled(true);
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  container.on('pointerdown', function() {
    var ifDrawTriangles = clickTimes % 2;

    debuggerInstance.drawMeshHull = ifDrawTriangles;
    debuggerInstance.drawMeshTriangles = ifDrawTriangles;
    debuggerInstance.drawRegionAttachments = ifDrawTriangles;
    debuggerInstance.drawClipping = ifDrawTriangles;
    if (!ifDrawTriangles) {
      debuggerInstance.clear();
    }
    clickTimes++;
  });
};
