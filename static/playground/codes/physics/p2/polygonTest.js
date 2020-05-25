/* eslint-disable */
/**
 * 此示例需要安装插件：tinyjs-plugin-p2
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);
  // 资源已经加载的情况下就不在重复加载
  if (Tiny.isUndefined(Tiny.Loader.resources['polygonTest_physicsData'])) {
    Tiny.Loader
      .add('polygonTest_contra2', 'https://gw.alipayobjects.com/zos/rmsportal/zJYBuQeRROLXCfOHvDhV.png')
      .add('polygonTest_physicsData', 'https://gw.alipayobjects.com/os/rmsportal/tPUUAIZfIonWhOwUDQtj.json')
      .add('polygonTest_enemy', 'https://gw.alipayobjects.com/zos/rmsportal/YxCBSLRACJBLMwquTnYB.png')
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
  app.physics.p2.gravity.y = 0;
}

Layer.prototype.initGame = function() {
  var app = Tiny.app;
  var sprite = new Tiny.Sprite(Tiny.Loader.resources['polygonTest_contra2'].texture);
  sprite.position.x = Tiny.WIN_SIZE.width / 2;
  sprite.position.y = 200;

  // 加入物理系统
  app.physics.p2.enable(sprite, true);
  sprite.body.loadPolygon(Tiny.Loader.resources['polygonTest_physicsData'].data.contra2);
  sprite.body.setZeroDamping();
  sprite.body.angularVelocity = Math.PI;

  this.addChild(sprite);

  var wizball = new Tiny.Sprite(Tiny.Loader.resources['polygonTest_enemy'].texture);
  wizball.position.x = Tiny.WIN_SIZE.width / 2;
  wizball.position.y = 400;

  // 加入物理系统
  app.physics.p2.enable(wizball, true);
  wizball.body.setZeroDamping();
  wizball.body.mass = 1;
  wizball.body.angularVelocity = -Math.PI;
  wizball.body.setCircle(45);

  this.addChild(wizball);
};
