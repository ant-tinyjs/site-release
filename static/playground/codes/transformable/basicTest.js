/**
 * 此示例需要安装插件：tinyjs-plugin-transformable
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var self = this;
  var loader = new Tiny.loaders.Loader();

  loader
    .add({
      name: 'logo',
      url: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/logo.png',
    })
    .load(function() {
      var sprite = Tiny.Sprite.fromImage('logo');
      var ta = new Tiny.Transformable(sprite);

      ta.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
      ta.on('remove:touchend', function(e) {
        console.log('remove', e);
        this.parent.removeChild(this);
      });
      self.addChild(ta);
    });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
