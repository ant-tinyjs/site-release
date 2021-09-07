var RESOURCES = [
  'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/super.png',
  'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png',
  'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/cow.png',
];

var container = new Tiny.Container();

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  this.ants = [];
  // 设置场景可点击
  this.setEventEnabled(true);
  // 设置点击区域为整个屏幕
  this.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.on('pointerdown', function() {
    if (this.ants.length < 200000) {
      this.createSprite();
    }
  });

  var tips = new Tiny.Text('touch the screen to add', {
    fill: 'white',
  });
  this.countCell = new Tiny.Text('numbers: 0', {
    fill: 'white',
  });
  tips.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  tips.setAnchor(0.5);
  this.addChild(container);
  this.addChild(tips);
  this.addChild(this.countCell);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.createSprite = function() {
  for (var i = 0; i < 100; i++) {
    var ant = new Tiny.Sprite(Tiny.Texture.fromImage(RESOURCES[Tiny.random(0, RESOURCES.length - 1)]));
    ant.setScale(0.1 + Math.random() * 0.2);
    ant.setRotation(Math.random() - 0.5);
    ant.speedX = Math.random() * 10;
    ant.speedY = (Math.random() * 10) - 5;
    this.ants.push(ant);
    container.addChild(ant);
  }

  this.countCell.text = 'numbers: ' + this.ants.length;
};

Layer.prototype.updateTransform = function() {
  var wh = Tiny.WIN_SIZE.height;
  var ww = Tiny.WIN_SIZE.width;
  for (var i = 0; i < this.ants.length; i++) {
    var sprite = this.ants[i];
    sprite.rotation += 0.1 * Math.random();

    sprite.position.x += sprite.speedX;
    sprite.position.y += sprite.speedY;
    sprite.speedY += 0.5;

    if (sprite.position.x > ww) {
      sprite.speedX *= -1;
      sprite.position.x = ww;
    } else if (sprite.position.x < 0) {
      sprite.speedX *= -1;
      sprite.position.x = 0;
    }

    if (sprite.position.y > wh) {
      sprite.speedY *= -0.85;
      sprite.position.y = wh;
      if (Math.random() > 0.5) {
        sprite.speedY -= Math.random() * 6;
      }
    } else if (sprite.position.y < 0) {
      sprite.speedY = 0;
      sprite.position.y = 0;
    }
  }

  this.containerUpdateTransform();
};
