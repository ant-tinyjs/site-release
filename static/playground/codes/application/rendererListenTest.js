// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 准备渲染
  var txt = 'start: ' + (new Date()).getTime();
  var preFlag = true;
  var postFlag = true;
  var self = this;
  // 开始渲染一帧
  Tiny.app.renderer.on('prerender', function() {
    if (preFlag) {
      txt += '\nprerender: ' + (new Date()).getTime();
      preFlag = false;
    }
  });
  // 完成一帧的渲染
  Tiny.app.renderer.on('postrender', function() {
    if (postFlag) {
      txt += '\npostrender: ' + (new Date()).getTime();
      postFlag = false;
      self.addChild(new Tiny.Text(txt, {
        fill: 'white',
      }));
    }
  });
  for (var i = 0; i < 100; i++) {
    var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/mokey.png');
    this.addChild(sprite);
  }
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
