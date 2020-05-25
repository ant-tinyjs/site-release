// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var basicText = new Tiny.Text('Basic Text 基础文本');

  this.addChild(basicText);
};

/**
 * constructor
 */
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
