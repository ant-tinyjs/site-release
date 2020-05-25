/**
 * 此示例需要安装插件：tinyjs-plugin-scroller
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();
  var hao = generateHao();
  var scroller = new Tiny.Scroller(function(left, top, zoom) {
    // 滚动的状态同步给 container
    container.position.x = -left;
    hao.setPositionX(left + 80);
    if (left < 1000) {
      // 第一章动画是停止的
      hao.stop();
    } else if (left >= 1000 && left < 2000) {
      // 第二章播放动画，从第三章回来停止 action 并复位
      hao.play();
      Tiny.Action.cleanup(hao);
      hao.runAction(Tiny.RotateTo(200, { rotation: Tiny.deg2radian(0) }));
    } else {
      // 第三章执行顺时针旋转的 action
      hao.runAction(Tiny.RepeatForever(Tiny.RotateBy(1000, { rotation: Tiny.deg2radian(75) })));
    }
  }, {
    // 只设置 X 轴方向可滚动
    scrollingX: true,
  });

  // 实例化一个 Loader
  var loader = new Tiny.loaders.Loader();
  // 添加背景图片
  loader.add([{
    name: 'background',
    url: 'https://gw.alipayobjects.com/zos/rmsportal/oGGaeVAvXXxJFomzZDpl.jpg',
  }]);
  // 保证背景图片加载完成后再获取 container 的真实宽高
  loader.load(function() {
    var background = new Tiny.Sprite(Tiny.TextureCache['background']);
    container.addChild(background);

    // 设置滚动的规模，参数依次是 clientWidth, clientHeight, contentWidth, contentHeight
    scroller.setDimensions(Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height, container.width, container.height);
    // 设置 container 可交互
    container.interactive = true;
    // 设置 container 的可触发区域
    container.hitArea = new Tiny.Rectangle(0, 0, container.width, Tiny.WIN_SIZE.height);

    // 添加hao
    container.addChild(hao);
    hao.stop();
  });
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });

  // 按下时的事件监听
  container.on('pointerdown', function(data) {
    var e = data.data.originalEvent;
    // 同步给 scroller，如果是移动端则使用 e.changedTouches，如果是 PC 上则使用 [e]
    scroller.doTouchStart(e.changedTouches || [e], e.timeStamp);
  });
  // 移动时的事件监听
  container.on('pointermove', function(data) {
    var e = data.data.originalEvent;
    scroller.doTouchMove(e.changedTouches || [e], e.timeStamp, e.scale);
  });
  // 抬起时的事件监听
  container.on('pointerup', function(data) {
    const e = data.data.originalEvent;
    scroller.doTouchEnd(e.timeStamp);
  });
  // 移出屏幕的事件监听
  container.on('pointerupoutside', function(data) {
    const e = data.data.originalEvent;
    scroller.doTouchEnd(e.timeStamp);
  });

  this.addChild(container);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

/**
 * 辅助函数，添加hao
 */
function generateHao() {
  var textures = [];
  for (var i = 0; i < 4; i++) {
    // 将帧图挨个添加到纹理数组中
    textures.push(Tiny.Texture.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/hao/hao' + i + '.png'));
  }
  var haoMc = new Tiny.AnimatedSprite(textures);
  // 设置动画速度，值越大速度越快
  haoMc.animationSpeed = 0.08;
  // 缩小一倍
  haoMc.setScale(0.5);
  // 设置锚点为小人中心点
  haoMc.setAnchor(0.5);
  // 设置小人的位置为屏幕中心
  haoMc.setPositionY(75);

  return haoMc;
}
