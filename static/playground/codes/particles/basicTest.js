// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 声明一些所以的位置
  var pos = [-5, -10, -15, -20, -25, -30, -35, -40, 5, 10, 15, 20, 25, 30, 35, 40];
  // 通过构造函数创建 ParticleContainer
  var pContainer = new Tiny.particles.ParticleContainer();

  this.addChild(pContainer);

  for (var i = 0; i < 500; i++) {
    var ant = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png');
    // 创建一个随机持续事件，随机位置的 MoveBy action
    var action = Tiny.MoveBy(Math.abs(Tiny.randomFromArray(pos)) * 1000, Tiny.point(Tiny.randomFromArray(pos) * 10, Tiny.randomFromArray(pos) * 10));

    // 设置 tint，在 Canvas 渲染模式下会发现无效
    ant.tint = Math.random() * 0xE8D4CD;
    ant.setAnchor(0.5);
    ant.setScale(0.5 + Math.random() * 0.3);
    ant.setPosition(Math.random() * Tiny.WIN_SIZE.width, Math.random() * Tiny.WIN_SIZE.height);
    ant.runAction(Tiny.RepeatForever(Tiny.Back(action)));
    pContainer.addChild(ant);
  }
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
