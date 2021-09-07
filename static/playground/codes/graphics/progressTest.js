// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  this.count = 0;
  this.sector = new Tiny.Graphics();
  this.ring = new Tiny.Graphics();
  this.sector.setPosition(Tiny.WIN_SIZE.width / 2, 150);
  this.ring.setPosition(Tiny.WIN_SIZE.width / 2, 400);

  this.addChild(this.sector);
  this.addChild(this.ring);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.updateTransform = function() {
  var sector = this.sector;
  var ring = this.ring;
  var count = this.count;

  if (count <= 360) {
    this.count += 1;

    sector.clear();
    sector.moveTo(0, 0);
    sector.beginFill(0xc9a5c3);
    sector.arc(0, 0, 100, 0, Tiny.deg2radian(count));

    ring.clear();
    ring.lineStyle(30, 0x5da761, 1);
    ring.arc(0, 0, 100, 0, Tiny.deg2radian(count), false);
  }

  this.containerUpdateTransform();
};
