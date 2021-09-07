/* eslint-disable */
/**
 * 此示例需要安装插件：tinyjs-plugin-p2
 *
 * 注：此示例中用到的图片素材来自于网络 请不要用于任何商业项目 有问题请联系我 fusheng.sfs@antfin.com
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 资源已经加载的情况下就不在重复加载
  if (Tiny.isUndefined(Tiny.Loader.resources['ballLotteryTest-bigCircle'])) {
    Tiny.Loader
      .add('ballLotteryTest-bigCircle', 'https://gw.alipayobjects.com/zos/rmsportal/iIHmLIzarWKhilPcBHfC.png')
      .load(() => {
        this.initDemo();
      });
  } else {
    this.initDemo();
  }
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.destory = function() {
  this.control.clear();
  this.cd.stop();
  this.control = null;
};

Layer.prototype.initDemo = function() {
  // 如果已经存在则把上一次创建的销毁
  if (window.ballLotteryTest) {
    window.ballLotteryTest.destory();
  }

  window.ballLotteryTest = this;

  var app = Tiny.app;
  var _this = this;

  // 启用P2物理系统
  Tiny.Physics.P2.startSystem(app);

  //  设置回弹系数 增加小人落到地上的回跳效果
  app.physics.p2.restitution = 2.8;
  // 设置0重力
  app.physics.p2.gravity.y = 0;
  app.physics.p2.gravity.x = 0;

  var smallBallContainer = new Tiny.Container();
  this.addChild(smallBallContainer);

  var smallCircleRadius = 10;
  var bigCircleRadius = 150;

  var bigCircle = new Tiny.Sprite(Tiny.Loader.resources['ballLotteryTest-bigCircle'].texture);
  bigCircle.position.x = Tiny.WIN_SIZE.width / 2;
  bigCircle.position.y = Tiny.WIN_SIZE.height / 2;
  bigCircle.anchor.set(0.5, 0.5);
  this.addChild(bigCircle);

  // 创建一个圆形边界控制器 把所有物理系统中的小球控制在这个圆形的边界之内
  this.control = new CircleBoundController(bigCircle.position.x, bigCircle.position.y, bigCircleRadius, 5, 800);

  // 这里更新控制器  特别注意一点的是必须把第二个参数写成true 否则第二次执行的话新注册的方法不会被执行
  app.onUpdate(function() {
    if (_this.control) {
      _this.control.update();
    }
  }, true);

  // => START 创建定时器，用于逐个创建圆形
  this.cd = new Tiny.ticker.CountDown({
    // 每200毫秒执行一次
    duration: 200,
    // 执行 loopTimes 次
    times: 20
  });
  this.cd.on('update', function() {
    // 这里做一个判断 如果已经被移除则不在进行创建
    if (!_this.parent) return;
    var sprite = createCircleSprite(app, smallCircleRadius, getRandomColor());
    sprite.position.x = Tiny.WIN_SIZE.width / 2;
    sprite.position.y = Tiny.WIN_SIZE.height / 2 + bigCircleRadius - smallCircleRadius;

    app.physics.p2.enable(sprite, false);
    sprite.body.mass = 1;
    sprite.body.setCircle(smallCircleRadius);

    sprite.body.velocity.y = -300;
    sprite.body.velocity.x = Math.floor(Math.random() * 300) * (Math.random() > 0.5 ? -1 : 1);

    smallBallContainer.addChild(sprite);
    _this.control.addBall(sprite);
  });
  // <= END 创建定时器

  // 开始按钮 点击后开始
  var btnFall = createButton(app, '开始', 0, 20, 100, 30, 0xff0000, function() {
    btnFall.visible = false;
    _this.cd.start();
  });
  this.addChild(btnFall);
};

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
 * 辅助函数 - 创建一个带文本和纯色背景的按钮
 * @param {Tiny.Application} app
 * @param {string} name - 按钮的文本
 * @param {number} x - x坐标
 * @param {number} y - y坐标
 * @param {number} width - 宽度
 * @param {number} height - 高度
 * @param {number} color - 按钮背景颜色
 * @param {function} onclick - 按钮的点击事件
 */
function createButton(app, name, x, y, width, height, color, onclick) {
  var graphics = new Tiny.Graphics();
  graphics.beginFill(color);
  graphics.drawRect(0, 0, width, height);
  graphics.bounds = new Tiny.Rectangle(0, 0, width, height);
  var rt = Tiny.RenderTexture.create(width, height);
  app.renderer.render(graphics, rt);
  var sprite = new Tiny.Sprite(rt);
  var title = new Tiny.Text(name, {
    fontSize: 18,
    fill: 'white',
  });
  title.position.set(sprite.width / 2, sprite.height / 2);
  title.anchor.set(0.5, 0.5);
  sprite.addChild(title);
  sprite.position.set(x, y);

  sprite.setEventEnabled(true);

  sprite.on('pointerdown', function(data) {
    onclick(data);
  });

  return sprite;
}

/**
 * 辅助函数 - 生成随机颜色
 */
function getRandomColor() {
  return 0x1000000 + Math.random() * 0x1000000;
}

/**
 * 辅助类 - 圆形边界控制器 目前只支持圆形物体
 * @author 采东<fusheng.sfs@antfin.com>
 * @param {number} x - 边界的圆心x坐标
 * @param {number} y - 边界的圆心y坐标
 * @param {number} radius - 边界的圆半径
 * @param {number} borderThickness - 边框的厚度 为了效果更加真实 增加一个边缘厚度 这样小球和最边缘会保持一个厚度的距离 类似玻璃杯 外壁也是有厚度的 看来效果更舒服
 * @param {number} maxVelcity - 小球运动的最大速度
 * @see https://github.com/qingyangmoke/tinyjs-plugin-worldbounds/blob/master/src/CircleBoundController.js
 */
var CircleBoundController = function(x, y, radius, borderThickness, maxVelcity) {
  this.x = x;
  this.y = y;
  this.left = x - radius;
  this.right = x + radius;
  this.top = y - radius;
  this.bottom = y + radius;
  this.maxVelcity = maxVelcity;
  this.borderThickness = borderThickness;
  this.originRadius = radius;
  this.radius = radius - borderThickness;
  this.balls = [];
};

/**
 * 获取小球的x坐标
 */
CircleBoundController.prototype.getX = function(a) {
  return a.body.x;
};

/**
 * 获取小球的y坐标
 */
CircleBoundController.prototype.getY = function(a) {
  return a.body.y;
};

/**
 * 添加小球
 */
CircleBoundController.prototype.addBall = function(ball) {
  this.balls.push(ball);
};

/**
 * 删除小球
 */
CircleBoundController.prototype.removeBall = function(ball) {
  var index = this.balls.indexOf(ball);
  if (index > -1) {
    this.balls.splice(index, 1);
  }
};

/**
 * 清空小球
 */
CircleBoundController.prototype.clear = function() {
  this.balls.length = 0;
};

/**
 * 判断小球是否在以圆心为原点的x轴上
 */
CircleBoundController.prototype.inXaxis = function(ball) {
  return this.getX(ball) === this.x;
};

/**
 * 判断小球是否在以圆心为原点的y轴上
 */
CircleBoundController.prototype.inYaxis = function(ball) {
  return this.getY(ball) === this.y;
};

/**
 * 获取小球和圆心的角度
 */
CircleBoundController.prototype.getAngle = function(e) {
  return Tiny.Physics.P2.Math.wrapAngle(Tiny.Physics.P2.Math.angle(this.x, this.y, this.getX(e), this.getY(e)), true);
};

/**
 * 获取小球当前角度在圆形边界的最大边界位置
 */
CircleBoundController.prototype.getMaxPointFromBall = function(e) {
  var radius = this.radius - e.width / 2;
  // // 根据角度计算最大距离
  var angle = this.getAngle(e);
  return this.getMaxPoint(angle, radius);
};

/**
 * 根据角度计算半径为radius圆形边界的最大边界位置
 */
CircleBoundController.prototype.getMaxPoint = function(angle, radius) {
  var x0 = 0;
  var y0 = 0;
  if (angle === 0) {
    x0 = radius;
    y0 = 0;
  } else if (angle === Math.PI / 2) {
    x0 = 0;
    y0 = radius;
  } else if (angle === Math.PI) {
    x0 = -radius;
    y0 = 0;
  } else if (angle === -Math.PI / 2) {
    x0 = 0;
    y0 = -radius;
  } else {
    x0 = radius * Math.cos(angle);
    y0 = radius * Math.sin(angle);
  }
  var x1 = this.x + x0;
  var y1 = this.y + y0;
  return {
    x: x1,
    y: y1
  };
};

/**
 * 判断小球是否在圆形边界内
 */
CircleBoundController.prototype.inBound = function(e) {
  var distance = Math.abs(Tiny.Physics.P2.Math.distance(this.getX(e), this.getY(e), this.x, this.y));
  if (distance <= (this.radius - e.width / 2)) {
    return true;
  }
  return false;
};

/**
 * 更新 需要在每次刷新的时候主动调用 建议加到 app.onUpdate() 中执行;
 */
CircleBoundController.prototype.update = function() {
  var _this = this;
  this.balls.forEach(function(e, i) {
    if (!_this.inBound(e)) {
      var maxPoint = _this.getMaxPointFromBall(e);
      var x = _this.getX(e);
      var y = _this.getY(e);
      if ((maxPoint.x < _this.x && x < maxPoint.x) || (maxPoint.x > _this.x && x > maxPoint.x)) {
        e.position.x = maxPoint.x;
        e.body.x = e.position.x;
        e.body.velocity.x *= -1;
      }

      if ((y < _this.y && y < maxPoint.y) || (y > _this.y && y > maxPoint.y)) {
        e.position.y = maxPoint.y;
        e.body.y = e.position.y;
        e.body.velocity.y *= -1;
      }
    }

    e.body.velocity.x = Tiny.Physics.P2.Math.wrap(e.body.velocity.x, -_this.maxVelcity, _this.maxVelcity);
    e.body.velocity.y = Tiny.Physics.P2.Math.wrap(e.body.velocity.y, -_this.maxVelcity, _this.maxVelcity);
  });
};
