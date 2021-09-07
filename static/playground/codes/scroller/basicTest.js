/**
 * 此示例需要安装插件：tinyjs-plugin-scroller
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();
  var scroller = new Tiny.Scroller(function(left, top, zoom) {
    // 滚动的状态同步给 container
    container.position.y = -top;
  }, {
    // 只设置 Y 轴方向可滚动
    scrollingY: true,
  });

  // 增加 100 个数据到 container 里
  for (var i = 0; i < 100; i++) {
    var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
    var text = new Tiny.Text(i, {
      fill: 'white',
    });
    sprite.setPosition(30, 100 * i);
    text.setPosition(10, 100 * i + 40);
    container.addChild(sprite);
    container.addChild(text);
  }

  // 设置滚动的规模，参数依次是 clientWidth, clientHeight, contentWidth, contentHeight
  scroller.setDimensions(Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height, container.width, container.height);
  // 设置 container 可交互
  container.interactive = true;
  // 设置 container 的可触发区域
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, container.height);

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
