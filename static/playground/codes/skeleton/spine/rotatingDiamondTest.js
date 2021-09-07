/**
 * 此示例需要安装插件：tinyjs-plugin-spine
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var loader = new Tiny.loaders.Loader();

  loader
    .add('spineRes', 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.8/assets/spine/rotating-diamond.json')
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
  var animations = spineInstance.skeleton.data.animations;
  var animation = animations[0];

  spineInstance.setPivot(container.width / 2, container.height / 2);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - localRect.x, Tiny.WIN_SIZE.height / 2 - localRect.y);
  animation && spineInstance.state.setAnimation(0, animation.name);

  // 事件
  var animationIndex = 1;
  container.setEventEnabled(true);
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  container.on('pointerdown', function() {
    var animation = animations[animationIndex];
    var name = animation.name;

    spineInstance.state.setAnimation(0, name, false);

    if (animationIndex < animations.length - 1) {
      animationIndex++;
    } else {
      animationIndex = 0;
    }
  });
};
