// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var antSprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var action = Tiny.MoveBy(1000, Tiny.point(100, 200));

  this.addChild(antSprite);

  // 方案一 start
  // action.setRepeatDelay(3000);
  // antSprite.runAction(Tiny.Repeat(3, Tiny.Back(action)));
  // 方案一 end

  // 方案二 start
  antSprite.runAction(Tiny.Repeat(3, Tiny.Back(action), 3000));
  // 方案二 end
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
