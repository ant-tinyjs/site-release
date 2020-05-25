/**
 * 此示例需要安装插件：tinyjs-plugin-spine
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var loader = new Tiny.loaders.Loader();
  var sources = [];
  this.skeletons = [
    ['greengirl', 0.8],
    ['orangegirl', 1],
    ['armorgirl', 0.3],
  ];

  this.skeletons.forEach(function(item) {
    sources.push({
      name: item[0] + 'SpineRes',
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/' + item[0] + '.json',
      metadata: {
        spineSkeletonScale: item[1],
        spineAtlasFile: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/atlas2.atlas',
      },
    });
  });

  loader
    .add(sources)
    .load(this.initSpine.bind(this));
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.initSpine = function(loader, res) {
  var container = new Tiny.Container();
  var clickTimes = 0;
  var self = this;

  this.addChild(container);
  container.setEventEnabled(true);
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  container.on('pointerdown', function() {
    var name = self.skeletons[clickTimes % 3][0];

    container.removeChildren();
    loadSkeleton(container, res[name + 'SpineRes'].spineData);
    clickTimes++;
  });
  loadSkeleton(container, res[this.skeletons[2][0] + 'SpineRes'].spineData);
};

function loadSkeleton(container, spineData) {
  var offset = new Tiny.spine.Vector2();
  var bounds = new Tiny.spine.Vector2();
  var spineInstance = new Tiny.spine.Spine(spineData);
  // eslint-disable-next-line no-unused-vars
  var debuggerInstance = new Tiny.spine.Debugger(spineInstance, {
    drawMeshHull: true,
    drawMeshTriangles: true,
    drawPaths: true,
    drawBones: true,
  });

  container.addChild(spineInstance);
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2), Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineInstance.state.setAnimation(0, 'animation', true);
}
