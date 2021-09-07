/**
 * 此示例需要安装插件：tinyjs-plugin-extract
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/bg/pic1.jpg');
  // 使用静态方法 fromImage 创建纹理
  var mokeyUrl = 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/mokey.png';
  var texture = Tiny.Texture.fromImage(mokeyUrl);
  // 使用纹理创建精灵
  var mokey = new Tiny.Sprite(texture);
  var g = null;
  var updateHandle = function() {
    // 使用插件 tinyjs-plugin-extract 的方法 pixels 将精灵转换成像素值
    var pixels = Tiny.app.renderer.plugins.extract.pixels(mokey);
    g = pixels2graphics(pixels, mokey.width, mokey.height);
    sprite.mask = g;

    this.addChild(g);
  };
  if (Tiny.TextureCache[mokeyUrl]) {
    updateHandle.bind(this)();
  }
  // 只有等图片加载完成才能获取到像素值
  texture.on('update', updateHandle.bind(this));
  this.addChild(sprite);

  this.setEventEnabled(true);
  this.on('pointermove', function(data) {
    var pos = data.data.getLocalPosition(this.parent);
    g && g.setPosition(~~(pos.x - mokey.width / 2), ~~(pos.y - mokey.height / 2));
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

/**
 * 像素转化为图形
 *
 * @param {Array}   pixels  - 位图像素值
 * @param {Number}  width   - 位图真实宽度
 * @param {Number}  height  - 位图真实高度
 * @return {Tiny.Graphics}
 */
function pixels2graphics(pixels, width, height) {
  var arr = [];
  var pos = [];

  for (var i = 0, len1 = pixels.length; i < len1; i++) {
    if (i % 4 === 0) {
      var rgba = [];
      for (var c = 0; c < 4; c++) {
        rgba.push(pixels[i + c]);
      }
      arr.push(rgba);
    }
  }
  for (var j = 0, len2 = arr.length; j < len2; j++) {
    if (arr[j][3] !== 0) {
      pos.push([j % width, ~~(j / height)]);
    }
  }

  var g = new Tiny.Graphics();
  g.beginFill(0x000000);
  pos.forEach((p) => {
    g.drawRect(p[0], p[1], 1, 1);
  });
  g.endFill();

  return g;
}
