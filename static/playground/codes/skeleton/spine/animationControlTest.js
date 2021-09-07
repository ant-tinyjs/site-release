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
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/spinosaurus.skel',
      metadata: {
        spineSkeletonScale: 0.5,
      },
    })
    .add({
      name: 'background',
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/images/background.jpg',
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
  var container = new Tiny.Container();
  var spineInstance = new Tiny.spine.Spine(res.spineRes.spineData);
  var background = new Tiny.Sprite(Tiny.TextureCache['background']);

  this.addChild(container);
  background.setScale(0.5);
  container.addChild(background);
  container.addChild(spineInstance);
  spineInstance.skeleton.setToSetupPose();
  spineInstance.update(0);
  spineInstance.autoUpdate = false;
  spineInstance.setPosition(420, 262);
  spineInstance.state.setAnimation(0, 'animation', false);

  // 事件
  var button = new Tiny.Text('拖我', {
    fill: 'white',
  });

  var dragging = false;
  var pointData = null;
  var playTime = 0;
  var timeLine = [0, Tiny.WIN_SIZE.width - button.width];
  var clickHandler = function(data) {
    data.stopPropagation();
    pointData = data;
    dragging = true;
  };
  var leaveHandler = function(data) {
    dragging = false;
    pointData = null;
  };
  var moveHandler = function(data) {
    if (dragging && pointData) {
      var newPos = pointData.data.getLocalPosition(button.parent);
      var x = newPos.x;

      // 0.36 是动画的节点所占 animationDuration 的百分比，此处截断，改成 1 可以查看整个动画
      if (x < timeLine[0] || x > timeLine[1] * 0.36) {
        return;
      }
      button.setPositionX(x);

      // 动画控制
      var percent = x / timeLine[1];
      var animationDuration = spineInstance.state.getCurrent(0).animation.duration;
      var time = animationDuration * percent;
      var delta = time - playTime;

      delta && spineInstance.update(delta);
      playTime = time;
    }
  };
  button.setPosition(0, Tiny.WIN_SIZE.height - 150);
  button.setEventEnabled(true);
  container.addChild(button);
  button.on('pointerdown', clickHandler);
  button.on('pointerup', leaveHandler);
  button.on('pointerupoutside', leaveHandler);
  button.on('pointermove', moveHandler);
};
