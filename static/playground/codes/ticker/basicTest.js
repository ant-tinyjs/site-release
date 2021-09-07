// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var txt = new Tiny.Text('Hello, Tiny.js', {
    fill: 'white',
  });
  this.addChild(txt);

  var ticker = Tiny.ticker.shared;
  var tickerHandler = function(time) {
    txt.position.x++;
    txt.position.y++;
  };
  ticker.add(tickerHandler);

  this.on('removed', function() {
    ticker.remove(tickerHandler);
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
