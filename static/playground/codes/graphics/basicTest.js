// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  this.addChild(createGraphics());
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

function createGraphics() {
  var g = new Tiny.Graphics();

  g.beginFill(0xFF3300);
  g.lineStyle(10, 0xffd900, 1);

  // 图形1
  g.moveTo(50, 50);
  g.lineTo(250, 50);
  g.lineTo(100, 100);
  g.lineTo(250, 220);
  g.lineTo(50, 220);
  g.lineTo(50, 50);
  g.endFill();

  g.lineStyle(10, 0xFF0000, 0.8);
  g.beginFill(0xFF700B, 1);

  // 图形2
  g.moveTo(105, 450);
  g.lineTo(225, 460);
  g.lineTo(285, 475);
  g.quadraticCurveTo(300, 300, 240, 350);
  g.lineTo(165, 320);
  g.lineTo(205, 400);
  g.lineTo(105, 450);
  g.endFill();

  // 矩形
  g.lineStyle(2, 0x0000FF, 1);
  g.drawRect(50, 250, 100, 100);

  // 圆
  g.lineStyle(0);
  g.beginFill(0xFFFF0B, 0.5);
  g.drawCircle(100, 400, 100);
  g.endFill();

  // 星形
  g.lineStyle(2, 0xFF6600, 1);
  g.drawStar(250, 120, 5, 50, 25);

  g.lineStyle(20, 0x33FF00);
  g.moveTo(30, 100);
  g.lineTo(300, 300);

  return g;
}
