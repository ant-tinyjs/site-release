// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 色值：#FF0000
  var color = Tiny.color(255, 0, 0);
  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  // 色值：#FFFF00
  var action = Tiny.TintTo(1000, Tiny.color(255, 255, 0));

  this.addChild(sprite);
  // 给小蚂蚁染上红色（#FF0000）
  sprite.tint = Tiny.rgb2hex([color.colorR / 255, color.colorG / 255, color.colorB / 255]);
  // sprite.tint = Tiny.color2hex(color);
  sprite.runAction(action);
  action.onComplete = function() {
    // R通道不变，G通道从0升到255，B通道不变，即：[255, 255, 0]，小蚂蚁的染色从红色（#FF0000）变到了黄色（#FFFF00）
    console.log('%c  ', 'background:' + Tiny.hex2string(sprite.tint), Tiny.hex2string(sprite.tint));
    //=> #ffff00
  };
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
