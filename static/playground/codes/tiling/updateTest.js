/**
 * 此示例需要安装插件：tinyjs-plugin-tiling
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  this.count = 0;
  var texture = Tiny.Texture.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/tile.png');
  this.tilingSprite = new Tiny.tiling.TilingSprite(texture, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.addChild(this.tilingSprite);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.updateTransform = function() {
  var count = this.count;
  var tilingSprite = this.tilingSprite;

  count += 0.005;

  tilingSprite.tileScale.x = 2 + Math.sin(count);
  tilingSprite.tileScale.y = 2 + Math.cos(count);

  tilingSprite.tilePosition.x += 1;
  tilingSprite.tilePosition.y += 1;
};
