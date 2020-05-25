// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var antSprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var einsteinSprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png');
  var action = Tiny.MoveTo(6000, Tiny.point(220, 360));

  einsteinSprite.setPositionY(200);
  antSprite.runAction(action);
  einsteinSprite.runAction(action);

  this.addChild(antSprite);
  this.addChild(einsteinSprite);

  // 两秒后移除 antSprite
  var cd = new Tiny.ticker.CountDown({
    duration: 2e3,
    times: 1,
  });
  cd.on('complete', () => {
    // antSprite 被移除后，自身及子集的所有的 actions 都自动清除，且不影响其他精灵的使用
    this.removeChild(antSprite);
    // 或者使用 destroy
    // antSprite.destroy();
  });
  cd.start();
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
