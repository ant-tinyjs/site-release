var RESOURCES = {};
for (let i = 0; i < 10; i++) {
  // 将帧图挨个添加到资源对象中
  RESOURCES['s_font' + i] = 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/figure/b' + i + '.png';
}

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var fontMc = new FontMovieClip();
  this.addChild(fontMc);
  this.addChild(new Tiny.Text('点击屏幕反转动画', {
    fill: 'white',
  }));

  // 立刻播放
  fontMc.play();

  // 设置场景可点击
  this.setEventEnabled(true);
  // 设置点击区域为整个屏幕
  this.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.on('pointerdown', function() {
    // 点击屏幕调用反转方法
    fontMc.reverse();
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

// 动画对象构造函数
function FontMovieClip() {
  var textures = [];
  for (var i = 0; i < 10; i++) {
    // 将帧图挨个添加到纹理数组中
    textures.push(Tiny.Texture.fromImage(RESOURCES['s_font' + i]));
  }

  Tiny.AnimatedSprite.call(this, textures);

  // 设置动画速度，值越大速度越快，这里的 1/60 相当于每秒一帧
  this.animationSpeed = 1 / 60;
  // 设置锚点为小人中心点
  this.setAnchor(0.5);
  // 设置小人的位置为屏幕中心
  this.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2 - 150);
}

FontMovieClip.prototype = Object.create(Tiny.AnimatedSprite.prototype);
FontMovieClip.prototype.constructor = FontMovieClip;
