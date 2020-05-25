// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 分别写两个 Text，坐标一致，透明度不一样
  var text = new Tiny.Text('<<< 请向左滑动', {
    fill: 'white',
  });
  text.setOpacity(0.6);
  this.addChild(text);

  var text2 = new Tiny.Text('<<< 请向左滑动', {
    fill: 'white',
  });
  this.addChild(text2);

  // 写一个图形，用于实现光影划过的感觉
  var g = new Tiny.Graphics();
  g.lineStyle(0);
  g.beginFill(0xffffff);
  g.moveTo(50, 0);
  g.lineTo(100, 0);
  g.lineTo(50, 30);
  g.lineTo(0, 30);
  g.endFill();
  // 将光影放到文字的右侧，出镜
  g.setPositionX(180);
  this.addChild(g);

  // 给满透明度的文字设置遮罩
  text2.mask = g;

  // 写一个循环动画，模拟光影掠过
  var action = Tiny.MoveTo(1000, Tiny.point(-100, 0));
  action.setEasing(Tiny.TWEEN.Easing.Exponential.InOut);
  g.runAction(Tiny.RepeatForever(action));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
