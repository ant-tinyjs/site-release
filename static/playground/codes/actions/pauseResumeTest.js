// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/zos/rmsportal/feRRHmdAYifYMyChbUbC.png');
  var action = Tiny.MoveTo(1000, Tiny.point(100, 200));

  this.addChild(sprite);
  this.addChild(new Tiny.Text('touch screen to pause or resume action', {
    fill: 'white',
  }));
  sprite.runAction(Tiny.RepeatForever(Tiny.Back(action)));

  // 设置场景可点击
  this.setEventEnabled(true);
  // 设置点击区域为整个屏幕
  this.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.on('pointerdown', function() {
    if (action.isPlaying()) {
      action.pause();
    } else {
      action.resume();
    }
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
