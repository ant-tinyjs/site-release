/**
 * 此示例需要安装插件：tinyjs-plugin-mesh
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 定义一个纹理
  var tex = Tiny.Texture.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/tile.png');

  // 使用纹理初始化一个 mesh
  var mesh = new Tiny.mesh.NineSlicePlane(tex, 25, 25, 25, 25);
  mesh.setPosition(100);
  this.addChild(mesh);

  // 定义一个 tween 动作，改变 mesh 的宽高，用作演示效果
  new Tiny.TWEEN.Tween({
    height: 50,
    width: 50,
  })
    .to({
      width: 200,
      height: 300,
    })
    .easing(Tiny.TWEEN.Easing.Cubic.InOut)
    .repeat(Infinity)
    .repeatDelay(500)
    .yoyo(true)
    .onUpdate(function() {
      mesh.height = this.height;
      mesh.width = this.width;
    }).start();
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
