/* eslint-disable */
/**
 * 此示例需要安装插件：tinyjs-plugin-p2
 */

/**
 * 辅助函数 - 创建一个矩形纯色对象
 * @param {Tiny.Application} app - Tiny.Application
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {number} color - 颜色
 */
function createRectSprite(app, width, height, color) {
  var graphics = new Tiny.Graphics();
  graphics.beginFill(color);
  graphics.drawRect(0, 0, width, height);
  graphics.bounds = new Tiny.Rectangle(0, 0, width, height);
  var rt = Tiny.RenderTexture.create(width, height);
  app.renderer.render(graphics, rt);
  return new Tiny.Sprite(rt);
}

/**
 * 辅助函数 - 创建一个圆形纯色对象
 * @param {Tiny.Application} app
 * @param {number} radius - 半径
 * @param {number} color - 颜色
 */
function createCircleSprite(app, radius, color) {
  var graphics = new Tiny.Graphics();
  graphics.beginFill(color);
  graphics.drawCircle(radius, radius, radius);
  graphics.bounds = new Tiny.Rectangle(0, 0, radius * 2, radius * 2);
  var rt = Tiny.RenderTexture.create(radius * 2, radius * 2);
  app.renderer.render(graphics, rt);
  return new Tiny.Sprite(rt);
}

/**
 * 辅助函数 - 生成随机颜色
 */
function getRandomColor() {
  return 0x1000000 + Math.random() * 0x1000000;
}

// 主场景
var Layer = function() {
  Tiny.Container.call(this);
  this.initP2();
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.initP2 = function() {
  var app = Tiny.app;
  var _this = this;

  // 启用P2物理系统
  Tiny.Physics.P2.startSystem(app, {
    debug: { // 调试信息
      lineWidth: 1,
      alpha: 1,
      fill: false,
      fillColor: 0xff0000,
      lineColor: 0x0000ff,
    }
  });

  //  设置回弹系数 增加小人落到地上的回跳效果
  app.physics.p2.restitution = 1;
  // 设置y轴重力
  app.physics.p2.gravity.y = 100;

  // => START 创建静态物体
  var staticBlockSprite = createRectSprite(app, 100, 50, 0xffffff);
  staticBlockSprite.setPosition(200, 400);
  // 设置一个name唯一标识一下sprite 方便以后做判断
  staticBlockSprite.name = 'staticBlockSprite';
  // 启动物理属性
  app.physics.p2.enable(staticBlockSprite, true);
  // 设置为静态物体，不受重力等因素影响
  staticBlockSprite.body.static = true;
  this.addChild(staticBlockSprite);
  // <= END 创建静态物体

  // 存储已创建的圆形sprite
  var sprites = [];
  var index = 0;
  // => START 创建定时器，用于逐个创建圆形
  var cd = new Tiny.ticker.CountDown({
    // 每200毫秒执行一次
    duration: 200,
    // 执行 loopTimes 次
    times: 20,
  });
  cd.on('update', function() {
    // 这里做一个判断 如果已经被移除则不在进行创建
    if (!_this.parent) return;
    var sprite = createCircleSprite(app, 20, getRandomColor());
    sprite.setPosition(100 + Math.floor(Math.random() * 100), 100);
    // 设置一个name唯一标识一下sprite 方便以后做判断
    sprite.name = 'sprite' + index++;
    // 启动物理属性
    app.physics.p2.enable(sprite, true);
    // 设置 body 与物理边界碰撞检测
    sprite.body.collideWorldBounds = true;
    // 设置物理Body为半径为20的圆形
    sprite.body.setCircle(20);

    _this.addChild(sprite);

    sprites.push(sprite);
  });
  cd.start();
  // <= END 创建定时器
};
