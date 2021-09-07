/* eslint-disable */
/**
 * 此示例需要安装插件：tinyjs-plugin-p2
 */

// 创建纯色方体
function createBox(app, width, height, color) {
  let graphics = new Tiny.Graphics();
  graphics.beginFill(color);
  graphics.drawRect(0, 0, width, height);
  graphics.bounds = new Tiny.Rectangle(0, 0, width, height);
  var rt = Tiny.RenderTexture.create(width, height);
  app.renderer.render(graphics, rt);
  let sprite = new Tiny.Sprite(rt);
  return sprite;
}

// 创建纯色圆
function createCircle(app, radius, color) {
  let graphics = new Tiny.Graphics();
  graphics.beginFill(color);
  graphics.drawCircle(radius, radius, radius);
  graphics.endFill();
  var rt = Tiny.RenderTexture.create(radius * 2, radius * 2);
  app.renderer.render(graphics, rt);
  let sprite = new Tiny.Sprite(rt);
  return sprite;
}

// 获取随机颜色值
function getRandomColor() {
  return 0x1000000 + Math.random() * 0x1000000;
}

// 主场景
var Layer = function() {
  Tiny.Container.call(this);
  // 资源已经加载的情况下就不在重复加载
  if (Tiny.isUndefined(Tiny.Loader.resources['player'])) {
    Tiny.Loader
      .add('player', 'https://gw.alipayobjects.com/zos/rmsportal/fgwbckzYtyxxUBrhFppN.png')
      .add('tiling', 'https://gw.alipayobjects.com/zos/rmsportal/ooEJmLkAtAnLxVljYIXJ.png')
      .load(() => {
        this.initP2();
        this.initGame();
      });
  } else {
    this.initP2();
    this.initGame();
  }
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.initP2 = function() {
  var app = Tiny.app;

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

  app.physics.p2.restitution = 0;
  app.physics.p2.friction = 0;
  app.physics.p2.gravity.y = 300;
}

Layer.prototype.initGame = function() {
  var app = Tiny.app;

  var container = this;

  var _this = this;

  var looptimes = 20;

  // 创建精灵材质
  var spriteMaterial = app.physics.p2.createMaterial('spriteMaterial');
  // 创建地板材质
  var wallMaterial = app.physics.p2.createMaterial('wallMaterial');


  // 设置材质
  app.physics.p2.setWallMaterial(wallMaterial, false, false, false, true);

  // 创建材质接触参数
  var groundPlayerCM = app.physics.p2.createContactMaterial(spriteMaterial, wallMaterial, { friction: 0.6 });
  var spriteCM = app.physics.p2.createContactMaterial(spriteMaterial, spriteMaterial, { friction: 0 });

  staticBox = createCircle(app, 25, getRandomColor());
  staticBox.position.x = 100;
  staticBox.position.y = 300;
  app.physics.p2.enable(staticBox);
  staticBox.body.setCircle(25);

  staticBox.body.static = true;

  container.addChild(staticBox);

  // => START 创建定时器，用于逐个创建圆形
  var cd = new Tiny.ticker.CountDown({
    // 每200毫秒执行一次
    duration: 200,
    // 执行 loopTimes 次
    times: 20,
  });
  cd.on('update', () => {
    // 这里做一个判断 如果已经被移除则不在进行创建
    if (!_this.parent) return;
    var sprite = createBox(app, 40, 40, getRandomColor());
    sprite.position.x = 120;
    sprite.position.y = 100;

    app.physics.p2.enable(sprite);
    sprite.body.mass = 1;

    // 设置材质
    sprite.body.setMaterial(spriteMaterial);

    container.addChild(sprite);
  });
  cd.start();
  // <= END 创建定时器
};
