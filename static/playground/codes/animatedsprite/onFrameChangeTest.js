var textures = [];
for (var i = 0; i < 10; i++) {
  // 将帧图挨个添加到纹理数组中
  textures.push(Tiny.Texture.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/figure/b' + i + '.png'));
}

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var text = new Tiny.Text('0', {
    fill: 'white',
  });
  var haoMc = new Tiny.AnimatedSprite(textures);
  // 设置动画速度，值越大速度越快，这里的 1/60 相当于每秒一帧
  haoMc.animationSpeed = 1 / 60;
  // 设置锚点为小人中心点
  haoMc.setAnchor(0.5);
  // 设置小人的位置为屏幕中心
  haoMc.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  // 立即播放
  haoMc.play();

  this.addChild(haoMc);
  this.addChild(text);

  haoMc.onFrameChange = function() {
    text.text = (new Date()).toLocaleTimeString();
  };
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
