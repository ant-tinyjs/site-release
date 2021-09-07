// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var width = Tiny.WIN_SIZE.width;
  var height = Tiny.WIN_SIZE.height;
  var background = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/bg/pic1.jpg');
  var curtain = new Tiny.Graphics();
  var lamp = this.createLamp(100, 300, width, height);

  curtain.beginFill(0x000000, 0.8);
  curtain.drawRect(0, 0, width, height);

  curtain.mask = lamp;
  this.addChild(background);
  this.addChild(curtain);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.createLamp = function(x, y, width, height) {
  var lamp = new Tiny.Graphics();
  var w = 50;
  var h = 50;

  lamp.beginFill(0xffffff);
  lamp.moveTo(0, 0);
  lamp.lineTo(width, 0);
  lamp.lineTo(width, height);
  lamp.lineTo(0, height);
  lamp = oval(lamp, w * 2, h * 2, x + w, y + h);
  lamp.addHole();

  return lamp;
};

// https://gist.github.com/markknol/5c5d48655ebac555a6eec41792acdfb6
function oval(g, w, h, cx, cy) {
  var lx = cx - w * 0.5;
  var rx = cx + w * 0.5;
  var ty = cy - h * 0.5;
  var by = cy + h * 0.5;

  var magic = 0.551915024494;
  var xmagic = magic * w * 0.5;
  var ymagic = h * magic * 0.5;

  g.moveTo(cx, ty);
  g.bezierCurveTo(cx + xmagic, ty, rx, cy - ymagic, rx, cy);
  g.bezierCurveTo(rx, cy + ymagic, cx + xmagic, by, cx, by);
  g.bezierCurveTo(cx - xmagic, by, lx, cy + ymagic, lx, cy);
  g.bezierCurveTo(lx, cy - ymagic, cx - xmagic, ty, cx, ty);

  return g;
}
