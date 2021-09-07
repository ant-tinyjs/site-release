/**
 * 此示例需要安装插件：tinyjs-plugin-tiling
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var texture = Tiny.Texture.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/tile.png');
  var tilingSprite = new Tiny.tiling.TilingSprite(texture, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.addChild(tilingSprite);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
