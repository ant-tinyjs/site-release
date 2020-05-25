var textures = [];
for (var i = 0; i < 4; i++) {
  // 将帧图挨个添加到纹理数组中
  textures.push(Tiny.Texture.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/hao/hao' + i + '.png'));
}

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var haoMc = new Tiny.AnimatedSprite(textures);
  // 设置动画速度，值越大速度越快
  haoMc.animationSpeed = 0.08;
  // 设置锚点为小人中心点
  haoMc.setAnchor(0.5);
  // 缩小一倍
  haoMc.setScale(0.5);
  // 设置小人的位置为屏幕中心
  haoMc.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  // 立即播放
  haoMc.play();

  // 设置小人可点击，点触后暂停／播放
  haoMc.setEventEnabled(true);
  haoMc.on('pointerdown', function() {
    // 调用 Tiny.AnimatedSprite 的属性 playing
    if (this.playing) {
      this.stop();
    } else {
      this.play();
    }
  });

  this.addChild(haoMc);
  this.addChild(new Tiny.Text('点击精灵播放或暂停', {
    fill: 'white',
  }));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
