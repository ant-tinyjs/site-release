/* eslint-disable */
/**
 * 此示例需要安装插件：tinyjs-plugin-p2
 */

// 画固定物体 和 运动物体之间的线
function DebugLine() {
  this.start = new Tiny.Point(0, 0);
  this.end = new Tiny.Point(0, 0);
  this.color = 0xff0000;
  this.lineWidth = 1;
  Tiny.Graphics.call(this);
};

DebugLine.prototype = Object.create(Tiny.Graphics.prototype);
DebugLine.prototype.constructor = DebugLine;

DebugLine.prototype.setTo = function(x, y, x2, y2) {
  this.clear();
  this.lineStyle(1, this.color, 1);
  this.moveTo(x, y);
  this.lineTo(x2, y2);
};

// 主场景
var Layer = function() {
  Tiny.Container.call(this);
  this.initP2();
  this.initGame();
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

  //  设置回弹系数 增加小人落到地上的回跳效果
  app.physics.p2.restitution = 0.8;
  // 设置y轴重力
  app.physics.p2.gravity.y = 100;
}
Layer.prototype.initGame = function() {
  var app = Tiny.app;

  var line = new DebugLine();

  var ant = new Tiny.Sprite(Tiny.Texture.fromImage('https://gw.alipayobjects.com/zos/rmsportal/fgwbckzYtyxxUBrhFppN.png'));
  ant.position.x = Tiny.WIN_SIZE.width / 2;
  ant.position.y = 100;

  // 加入物理系统
  app.physics.p2.enable(ant, true);
  ant.body.fixedRotation = true;
  ant.body.setCircle(20);

  this.addChild(ant);

  // 固定点
  var mouseCursor = new Tiny.Sprite(Tiny.Texture.fromImage('https://gw.alipayobjects.com/zos/rmsportal/PblwIJDJFBUwLWaVyYLR.png'));
  mouseCursor.position.x = Tiny.WIN_SIZE.width / 2;
  mouseCursor.position.y = 100;
  this.addChild(mouseCursor);

  // 设置为固定静态物体
  app.physics.p2.enable(mouseCursor);
  mouseCursor.body.static = true;
  mouseCursor.body.setCircle(10);

  this.setEventEnabled(true);

  var mouseSpring = app.physics.p2.createSpring(mouseCursor, ant.body, 0, 30, 1);
  var dragging = false;
  var drawLine = false;
  var mouseSpring = null;
  this.mousedown = this.touchstart = function(data) {
    dragging = true;
  };

  this.mouseup = this.mouseupoutside = this.touchend = this.touchendoutside = function(data) {
    dragging = false;
  };

  this.mousemove = this.touchmove = function(data) {
    if (dragging) {
      var pos = data.data.getLocalPosition(this);
      mouseCursor.body.x = pos.x;
      mouseCursor.body.y = pos.y;
    }
  };

  this.addChild(line);

  Tiny.ticker.shared.add(function() {
    line.setTo(ant.x, ant.y, mouseCursor.x, mouseCursor.y);
  });
};
