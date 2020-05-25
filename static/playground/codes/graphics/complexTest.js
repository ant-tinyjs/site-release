// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  this.addChild(createGraphics());
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

function createGraphics() {
  var container = new Tiny.Container();
  // 圆弧
  var g1 = new Tiny.Graphics();
  g1.beginFill(0xc9a5c3);
  g1.lineStyle(10, 0xae6eab, 1);
  g1.moveTo(50, 50);
  g1.arc(50, 50, 100, 0, Tiny.deg2radian(30));
  g1.endFill();
  container.addChild(g1);

  // 连续圆弧
  var g2 = new Tiny.Graphics();
  g2.beginFill(0xc9a5c3);
  g2.moveTo(300, 150);
  g2.arc(300, 150, 100, 0, Tiny.deg2radian(30));
  g2.moveTo(300, 150);
  g2.beginFill(0xd2467c);
  g2.arc(300, 150, 100, Tiny.deg2radian(30), Tiny.deg2radian(160));
  g2.moveTo(300, 150);
  g2.beginFill(0xd8819e);
  g2.arc(300, 150, 100, Tiny.deg2radian(160), 0);
  g2.endFill();
  container.addChild(g2);

  // 圆环
  var g3 = new Tiny.Graphics();
  g3.lineStyle(30, 0x5da761, 1);
  g3.arc(100, 200, 50, Tiny.deg2radian(-180), 0);
  g3.endFill();
  container.addChild(g3);

  // 连续圆环
  var g4 = new Tiny.Graphics();
  g4.lineStyle(20, 0x85c3ec, 1);
  g4.arc(150, 350, 100, Tiny.deg2radian(-180), Tiny.deg2radian(-100));
  g4.lineStyle(20, 0x00a3e0, 1);
  g4.arc(150, 350, 100, Tiny.deg2radian(-100), 0);
  g4.lineStyle(20, 0x007aa7, 1);
  g4.arc(150, 350, 100, 0, Tiny.deg2radian(30));
  g4.lineStyle(20, 0x004c87, 1);
  g4.arc(150, 350, 100, Tiny.deg2radian(30), Tiny.deg2radian(-180));
  g4.endFill();
  container.addChild(g4);

  return container;
}
