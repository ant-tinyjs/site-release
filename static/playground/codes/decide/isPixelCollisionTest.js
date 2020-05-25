/**
 * 此示例需要安装插件：tinyjs-plugin-extract
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var self = this;
  // 通过辅助方法创建 5 条随机线段
  var lines = createLines(5);
  // 使用 extract 插件的 pixels 方法获取精灵的像素值
  lines.data = Tiny.app.renderer.plugins.extract.pixels(lines);
  this.addChild(lines);

  // 添加文字，用于触碰后的提示
  var textSprite = new Tiny.Text('', {
    fill: 'white',
    stroke: 'red',
    strokeThickness: 2,
  });
  this.addChild(textSprite);

  // 创建蚂蚁精灵
  var antUrl = 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/lamp.png';
  var texture = Tiny.Texture.fromImage(antUrl);
  var ant = new Tiny.Sprite(texture);
  var updateHandle = function() {
    ant.data = Tiny.app.renderer.plugins.extract.pixels(ant);
    ant.setAnchor(0.5);
    ant.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
    ant.setEventEnabled(true);
    ant.buttonMode = true;
    // 渲染完成立刻检测
    this.decide(ant, lines, textSprite);
  };
  this.addChild(ant);

  if (Tiny.TextureCache[antUrl]) {
    updateHandle.bind(this)();
  } else {
    // 监听纹理加载，只有完全生成后才能获取到准确的 pixels 值
    texture.on('update', updateHandle.bind(this));
  }

  // 蚂蚁拖动事件的监听
  var dragging = false;
  var pointData = null;
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
      var newPos = pointData.data.getLocalPosition(ant.parent);
      ant.setPosition(newPos.x, newPos.y);
      self.decide(ant, lines, textSprite);
    }
  };
  ant.on('pointerdown', clickHandler);
  ant.on('pointerup', leaveHandler);
  ant.on('pointerupoutside', leaveHandler);
  ant.on('pointermove', moveHandler);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.decide = function(ant, lines, textSprite) {
  var collide = Tiny.isPixelCollision(
    ant,
    ant.getPositionX(),
    ant.getPositionY(),
    true,
    lines,
    lines.getPositionX(),
    lines.getPositionY(),
    false);
  textSprite.text = collide ? '碰到线了' : '';
};

/**
 * 辅助方法
 * 创建指定数量的随机线条
 *
 * @param lineNum   - 线个数
 * @return {Tiny.Sprite}
 */
function createLines(lineNum) {
  var space = 8; // 固定值，避免创建的线条首尾在画布显示有"缺口"，值的规则为 lineWidth 的最大值
  var g = new Tiny.Graphics();

  for (var i = 0; i < lineNum; i++) {
    var sx; // 线条起点 x
    var sy; // 线条起点 y
    var ex; // 线条终点 x
    var ey; // 线条终点 y
    var direction = Tiny.randomBool(); // 随机水平方向 or 垂直方向
    var ww = Tiny.WIN_SIZE.width + space; // 线条占据画布的宽度
    var wh = Tiny.WIN_SIZE.height + space; // 线条占据画布的高度
    var lineWidth = Tiny.randomFromArray([1, 1, 2, 2, 2, 3, 3, 3, 4, 6, 8]); // 随机的线条宽度
    // 随机终点位置，右边界和下边界几率大一点
    // -1：下边界右半／左边界下半
    // 0：右边界／下边界
    // 1：上边界右半／右边界下半
    var endRan = Tiny.randomFromArray([-1, 0, 0, 0, 0, 0, 0, 1]) % 2;

    if (direction) { //横向
      // 起点缩进画布 space 的值，坐标取值为：{-8, [-8, 画布高度 + 8]}，即画布左边界
      sx = -space;
      sy = Tiny.random(-space, wh);

      if (endRan === -1) {
        // 坐标取值为：{[(画布宽度 + 8) / 2, 画布宽度 + 8], 画布高度 + 8}，即画布下边界右半
        ex = Tiny.random(ww / 2, ww);
        ey = wh;
      } else if (endRan === 0) {
        // 坐标取值为：{屏幕宽度 + 8, [-8, 画布高度 + 8]}，即画布右边界
        ex = ww;
        ey = Tiny.random(-space, wh);
      } else {
        // 坐标取值为：{[(画布宽度 + 8) / 2, 画布宽度 + 8], -8}，即画布上边界右半
        ex = Tiny.random(ww / 2, ww);
        ey = -space;
      }
    } else { //竖向
      // 坐标取值为：{[-8, 画布宽度 + 8] , -8}，即画布上边界
      sx = Tiny.random(-space, ww);
      sy = -space;

      if (endRan === -1) {
        // 坐标取值为：{-8, [(画布高度 + 8) / 2, 画布高度 + 8]}，即画布左边界下半
        ex = -space;
        ey = Tiny.random(wh / 2, wh);
      } else if (endRan === 0) {
        // 坐标取值为：{[-8, 画布宽度 + 8], 画布高度 + 8}，即画布下边界
        ex = Tiny.random(-space, ww);
        ey = wh;
      } else {
        // 坐标取值为：{画布宽度 + 8, [(画布高度 + 8) / 2, 画布高度 + 8]}，即画布右边界下半
        ex = ww;
        ey = Tiny.random(wh / 2, wh);
      }
    }

    g.lineStyle(lineWidth * 2, 0xffffff);
    g.moveTo(sx, sy);
    g.lineTo(ex, ey);
  }

  // 通过 renderer 的 generateTexture 方法将图形转化成纹理
  var texture = Tiny.app.renderer.generateTexture(g);

  return new Tiny.Sprite(texture);
}
