/**
 * 此示例需要安装插件：tinyjs-plugin-ui
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var self = this;
  /**
   * 定义一个 ui.Button
   * 传入按钮文本 text（可以是字符，也可以是 Tiny.Text）
   * 传入按钮背景图片（可以是图片链接，也可以是 Tiny.Sprite）
   * 点击会同时改变透明度和缩放
   */
  var btn = new Tiny.ui.Button({
    text: 'Tiny.js', //也可以是：new Tiny.Text('Tiny.js')
    background: 'https://zos.alipayobjects.com/rmsportal/qfwEcpYykZOnnad.png', //也可以是：Tiny.Sprite.fromImage('https://zos.alipayobjects.com/rmsportal/qfwEcpYykZOnnad.png')
    active: {
      // 点击后改变按钮透明度
      opacity: 0.5,
      // 点击后改变按钮缩放
      scale: 1.5,
      // 回调会在控制台打印：you tap btn
      callback: function() {
        console.log('you tap btn');
      },
    },
  });
  var renderHandler = function() {
    // btn 实际是 Tiny.Container 类型，所以更改它的 pivot 属性来重设锚点到中心
    btn.setPivot(btn.width / 2, btn.height / 2);
    // 设置按钮居于画布中心
    btn.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
    // 将按钮添加到 Layer 中
    self.addChild(btn);
  };

  // 单元演示需要，防止添加过 cache，不在执行 rendered
  if (btn.background.texture.baseTexture.hasLoaded) {
    renderHandler();
  }
  /**
   * 因为我们要获取按钮的宽高，所以需要在渲染完成后才能获取
   * （如果不需要设置按钮的位置，此处可不用写）
   */
  btn.on('rendered', renderHandler);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
