// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 色值；#FF0000
  var color = Tiny.color(255, 0, 0);
  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  // 此处的 Tiny.color(-85, 0, 85) 并不是某个色值，是要针对各自通道要做的差值计算，如：R通道减去85，B通过加上85
  var action = Tiny.TintBy(1000, Tiny.color(-85, 0, 85));

  this.addChild(sprite);
  // 给小蚂蚁染上红色（#FF0000）
  sprite.tint = Tiny.color2hex(color);
  sprite.runAction(action);
  action.onComplete = function() {
    // R通道从255降到170（255-85），G通道不变，B通道从0升到85（0+85），即：[170, 0, 255]，小蚂蚁的染色从红色（#FF0000）变到了深红色（#AA0055）
    console.log('%c  ', 'background:' + Tiny.hex2string(sprite.tint), Tiny.hex2string(sprite.tint), Tiny.hex2color(sprite.tint));
    //=> #aa0055 Object {colorR: 170, colorG: 0, colorB: 85}
  };
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
