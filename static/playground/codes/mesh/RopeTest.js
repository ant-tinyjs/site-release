/**
 * 此示例需要安装插件：tinyjs-plugin-mesh
 */

var count = 0;
// build a rope!
var ropeLength = 15;
var points = [];

for (var i = 0; i < 25; i++) {
  points.push(new Tiny.Point(i * ropeLength, 0));
}

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 初始化绳索
  var strip = new Tiny.mesh.Rope(Tiny.Texture.fromImage('https://gw.alipayobjects.com/zos/rmsportal/FGHjdoMbGNaomwRdauor.png'), points);
  strip.x = 10;
  strip.y = 120;
  this.addChild(strip);

  // 初始化辅助圆点
  var g = new Tiny.Graphics();
  g.x = strip.x;
  g.y = strip.y;
  this.addChild(g);

  Tiny.app.onUpdate(function() {
    count += 0.1;

    // make the snake
    for (var i = 0; i < points.length; i++) {
      // S式
      points[i].y = Math.sin((i * 0.5) + count) * 10;
      points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * 10;

      // 伸缩式
      // strip.points[i].offset = Math.sin((i * 0.5) + count) * 10;
      // points[i].x = i * strip.width/(points.length-1) + Math.cos((i * 0.3) + count) * 20;
    }
    renderPoints(g);
  }, true);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

/**
 * 辅助函数，用于绘制/更新辅助原点
 *
 * @param g
 */
function renderPoints(g) {
  g.clear();

  g.moveTo(points[0].x, points[0].y);

  for (var i = 1; i < points.length; i++) {
    g.lineTo(points[i].x, points[i].y);
  }

  for (var i = 1; i < points.length; i++) {
    g.beginFill(0xff0022);
    g.drawCircle(points[i].x, points[i].y, 5);
    g.endFill();
  }
}
