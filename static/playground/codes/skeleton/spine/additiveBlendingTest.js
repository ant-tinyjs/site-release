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
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/owl.json',
      metadata: {
        spineSkeletonScale: 0.4,
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

  this.addChild(container);
  container.addChild(spineInstance);
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2), Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));

  var state = spineInstance.state;
  var mixBlendAdd = Tiny.spine.MixBlend.add;
  state.setAnimation(0, 'idle', true);
  state.setAnimation(1, 'blink', true);
  var left = state.setAnimation(2, 'left', true);
  var right = state.setAnimation(3, 'right', true);
  var up = state.setAnimation(4, 'up', true);
  var down = state.setAnimation(5, 'down', true);

  left.mixBlend = mixBlendAdd;
  right.mixBlend = mixBlendAdd;
  up.mixBlend = mixBlendAdd;
  down.mixBlend = mixBlendAdd;
  left.alpha = 0;
  right.alpha = 0;
  up.alpha = 0;
  down.alpha = 0;

  // 事件
  container.setEventEnabled(true);
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  container.on('pointermove', function(data) {
    var pos = data.data.global;

    if (pos.x < 0 || pos.y < 0 || pos.x > Tiny.WIN_SIZE.width || pos.y > Tiny.WIN_SIZE.height) {
      return;
    }
    calculateBlend(pos.x, pos.y, right, left, up, down);
  });
};

function calculateBlend(x, y, right, left, up, down) {
  var centerX = Tiny.WIN_SIZE.width / 2;
  var centerY = Tiny.WIN_SIZE.height / 2;

  right.alpha = x < centerX ? 1 - x / centerX : 0;
  left.alpha = x > centerX ? (x - centerX) / (window.innerWidth - centerX) : 0;
  up.alpha = y < centerY ? 1 - y / centerY : 0;
  down.alpha = y > centerY ? (y - centerY) / (window.innerHeight - centerY) : 0;
}
