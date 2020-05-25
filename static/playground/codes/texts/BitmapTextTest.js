/**
 * 此示例中用到的 BitmapText 需要安装插件：tinyjs-plugin-bitmap-text
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var self = this;
  var loader = new Tiny.loaders.Loader();
  loader.add([{
    name: 's_font_fnt',
    url: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/bitmaptext/FontEng.xml',
  }]).load(function() {
    var fontText = new Tiny.BitmapText('fnt fonts are supported!\ncreated by \n"Tiny.BitmapText()\n1234567890"', {
      font: '32px Impact',
      tint: '0xff6600',
    });

    fontText.setPosition(30, 30);
    self.addChild(fontText);
  });
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });
};

/**
 * constructor
 */
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
