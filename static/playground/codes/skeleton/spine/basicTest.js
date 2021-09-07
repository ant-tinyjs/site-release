/**
 * 此示例需要安装插件：tinyjs-plugin-spine
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var loader = new Tiny.loaders.Loader();

  loader
    .add('spineRes', 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/coin.json')
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
  var spineInstance = new Tiny.spine.Spine(res.spineRes.spineData);

  this.addChild(container);
  container.addChild(spineInstance);

  var localRect = spineInstance.getLocalBounds();

  spineInstance.setPivot(container.width / 2, container.height / 2);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - localRect.x, Tiny.WIN_SIZE.height / 2 - localRect.y);
  spineInstance.state.setAnimation(0, 'animation', true);
};
