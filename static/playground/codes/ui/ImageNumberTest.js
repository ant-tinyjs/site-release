/**
 * 此示例需要安装插件：tinyjs-plugin-ui
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var self = this;
  var resources = [];
  var loader = new Tiny.loaders.Loader();

  for (var i = 0; i < 10; i++) {
    resources.push('https://gw.alipayobjects.com/os/lib/alipay/tiny-resources/1.0.2/dist/images/snumber/s' + i + '.png');
  }

  loader.add(resources).load(function() {
    var sNumberObj = {};

    for (var i = 0; i < 10; i++) {
      sNumberObj[i] = Tiny.TextureCache['https://gw.alipayobjects.com/os/lib/alipay/tiny-resources/1.0.2/dist/images/snumber/s' + i + '.png'];
    }

    var sNumber = new Tiny.ui.ImageNumber(sNumberObj);
    var sNumberUI = sNumber.create();

    sNumberUI.setScale(5);
    sNumberUI.setPositionY(120);
    self.sNumber = sNumber;
    self.addChild(sNumberUI);
  });
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });

  var ticker = Tiny.ticker.shared;
  var tickerHandler = function(time) {
    var now = new Date(Date.now()).toLocaleTimeString();

    self.sNumber && self.sNumber.update(now);
  };
  ticker.add(tickerHandler);

  this.on('removed', function() {
    ticker.remove(tickerHandler);
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
