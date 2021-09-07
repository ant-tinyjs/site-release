// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  this.count = 0;
  this._thing = new Tiny.Graphics();
  this._thing.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);

  this.addChild(this._thing);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.updateTransform = function() {
  var thing = this._thing;
  var count = this.count;

  this.count += 0.1;

  thing.clear();
  thing.lineStyle(10, 0xff0000, 1);
  thing.beginFill(0xffFF00, 0.5);

  thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
  thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
  thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
  thing.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
  thing.lineTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);

  thing.setRotation(count * 0.1);

  this.containerUpdateTransform();
};
