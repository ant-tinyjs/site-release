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

  // 新建一个定时器，设置 3 秒后移除 tickerHandler
  var cd = new Tiny.ticker.CountDown({
    duration: 3e3,
    times: 1,
  });
  cd.on('complete', function(t) {
    ticker.remove(tickerHandler);
  });
  cd.start();

  // 新建一个定时器：每秒打印一次
  var cd2 = new Tiny.ticker.CountDown({
    duration: 1e3,
    times: 10,
  });
  cd2.on('update', function(t) {
    console.log('每秒打印一次，共打印十次', (new Date(Date.now())).toLocaleTimeString());
  });
  cd2.on('complete', function(t) {
    console.log('time out');
  });
  cd2.start();

  // 此处用来防止修改代码执行时之前能销毁调定时器，避免泄露
  this.on('removed', function() {
    cd.destroy();
    cd2.destroy();
    ticker.remove(tickerHandler);
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
