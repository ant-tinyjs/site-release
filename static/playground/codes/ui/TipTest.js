/**
 * 此示例需要安装插件：tinyjs-plugin-ui
 */
var tipBg = 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.8/assets/images/tips-bg.png';

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();
  var txt = new Tiny.Text('把生命的突泉捧在我手里，\n我只觉得它来得新鲜，\n是浓烈的酒，清新的泡沫，\n注入我的奔波、劳作、冒险。', {
    fontSize: 18,
    fontWeight: 'bold',
    fill: '0xff6600',
  });
  var padding = 20;
  var arrowHeight = 10;
  // 320/74 是图片的宽/高
  var np = new Tiny.ui.NinePatch(
    Tiny.Texture.fromImage(tipBg),
    320,
    txt.height + padding + padding + arrowHeight, // 上下各 padding + 小箭头的高
    [320 / 2, padding, 0, 74 - (padding + padding + arrowHeight)],
    0
  );

  txt.setPosition(padding, padding);
  container.addChild(np, txt);
  container.setPosition((Tiny.WIN_SIZE.width - np.width) / 2, (Tiny.WIN_SIZE.height - np.height) / 2);
  this.addChild(container);

  // 添加原始图片进行对比
  this.addChild(Tiny.Sprite.fromImage(tipBg));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
