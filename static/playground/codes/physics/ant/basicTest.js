/**
 * 此示例需要安装插件：tinyjs-plugin-ant
 */

/**
 * 辅助函数 - 创建一个矩形纯色对象
 *
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
  this.initAnt();
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.initAnt = function() {
  var app = Tiny.app;
  var _this = this;

  // 启用ant物理系统
  Tiny.Physics.Ant.startSystem(app, {
    debug: { // 调试信息
      lineWidth: 1,
      alpha: 1,
      fill: false,
      fillColor: 0xff0000,
      lineColor: 0x0000ff,
    },
  });
  // 设置回弹系数 增加小人落到地上的回跳效果
  app.physics.ant.restitution = 1;
  // 设置y轴重力
  app.physics.ant.gravity.y = 100;

  // => START 创建静态物体
  var staticBlockSprite = createRectSprite(app, 100, 50, 0xffffff);
  staticBlockSprite.setPosition(200, 400);
  // 设置一个name唯一标识一下sprite 方便以后做判断
  staticBlockSprite.name = 'staticBlockSprite';
  // 启动物理属性
  app.physics.ant.enable(staticBlockSprite, true);
  // 设置为静态物体，不受重力等因素影响
  staticBlockSprite.body.static = true;
  // 设置质量
  staticBlockSprite.body.mass = 3;
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
    if (!_this.parent) return;
    var sprite = createCircleSprite(app, 20, getRandomColor());
    sprite.setPosition(100 + Math.floor(Math.random() * 100), 100);
    // 设置一个 name 唯一标识一下 sprite 方便以后做判断
    sprite.name = 'sprite' + index++;
    // 启动物理属性
    app.physics.ant.enable(sprite, true);
    // 设置 body 与物理边界碰撞检测
    sprite.body.collideWorldBounds = true;
    // 设置物理 Body 为半径为20的圆形
    sprite.body.setCircle(20);

    // 两个 sprite 发生碰撞的时候会触发这个事件
    sprite.body.on(Tiny.Physics.Ant.EVENTS.ON_COLLIDE, function(a, b) {
      // console.log('collide', a.name, b.name);
    });

    //  sprite 和边界发生碰撞的时候会触发这个事件
    sprite.body.on(Tiny.Physics.Ant.EVENTS.ON_WORLD_BOUNDS, function() {
      // console.log('worldBounds');
    });

    // 两个 sprite 发生重叠的时候会触发这个事件
    sprite.body.on(Tiny.Physics.Ant.EVENTS.ON_OVER_LAP, function(a, b) {
      // console.log('overlap');
    });

    // 添加碰撞检测对象系统做了优化 重复添加会自动过滤
    sprite.body.addCollides([staticBlockSprite]);
    sprite.body.addCollides(sprites);

    _this.addChild(sprite);

    sprites.push(sprite);
  });
  cd.start();
  // <= END 创建定时器
};
