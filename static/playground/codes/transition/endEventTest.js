// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var btn = new Tiny.Text('点击切换到场景二 >', {
    fill: 'white',
  });
  btn.setPosition(Tiny.WIN_SIZE.width - 30, 30);
  btn.setAnchor(1, 0);
  btn.setEventEnabled(true);
  btn.on('pointerdown', function() {
    var sceneTwo = new SceneTwo();
    // 这里通过 SlideInR 方式切换到场景二，由于为了保证性能，转场时会进行舞台中显示对象的销毁和重新创建，故场景二中的 Action 需要监听 transitionend 后执行
    sceneTwo.on('transitionend', function() {
      sceneTwo.startRunAction();
    });
    Tiny.app.replaceScene(sceneTwo, 'SlideInR');
  });

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');
  var action = Tiny.MoveBy(1000, Tiny.point(100, 200));
  sprite.runAction(Tiny.RepeatForever(Tiny.Back(action)));

  this.addChild(sprite);
  this.addChild(btn);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

// 场景二
var SceneTwo = function() {
  Tiny.Container.call(this);

  var btn = new Tiny.Text('< 点击返回主场景', {
    fill: 'white',
  });
  btn.setPosition(30);
  btn.setEventEnabled(true);
  btn.on('pointerdown', function() {
    // 这里没有使用任何场景动画切换到主场景，故主场景中的 Action 不用监听 transitionend
    Tiny.app.replaceScene(new Layer());
  });

  this.sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png');
  this.sprite.setAnchor(0.5);
  this.sprite.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);

  this.addChild(this.sprite);
  this.addChild(btn);
};

// constructor
SceneTwo.prototype = Object.create(Tiny.Container.prototype);
SceneTwo.prototype.constructor = SceneTwo;

SceneTwo.prototype.startRunAction = function() {
  var action = Tiny.RotateBy(100, { rotation: Tiny.deg2radian(5) });
  this.sprite.runAction(Tiny.RepeatForever(action));
};
