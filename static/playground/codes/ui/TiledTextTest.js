/**
 * 此示例需要安装插件：tinyjs-plugin-ui
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var self = this;
  var tiledText = new Tiny.ui.TiledText(this, {
    fontSize: 32,
    fontFamily: 'Arial',
    fill: '#ffffff',
  });

  ['绿色办公', '无纸化购物', '地铁出行', 'In-store pay', '网络购票'].forEach(function(text, i) {
    var txt = tiledText.create(text);

    txt.setPosition(20 * i, 80 * i);
    self.addChild(txt);
  });

  var txt2 = tiledText.create('共享单车');

  txt2.setAnchor(0.5);
  txt2.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  this.addChild(txt2);
  this.txt2 = txt2;
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.updateTransform = function() {
  this.txt2.updateText(`当前时间：${new Date().getTime()}`);
  this.containerUpdateTransform();
};
