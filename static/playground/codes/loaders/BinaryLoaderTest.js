// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var url = 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/others/level.pda';
  //创建加载对象
  var loader = new Tiny.loaders.BinaryLoader(url);
  //执行加载
  loader.load({
    onComplete: function(data) {
      var GAME_RECT_WIDTH = 256;
      var BOARD_WIDTH = GAME_RECT_WIDTH;
      var colorId = new Array(BOARD_WIDTH);
      var needFillNum = data[0];
      var txt = [];
      var len = 1;
      for (var i = 0; i < GAME_RECT_WIDTH; i++) {
        colorId[i] = new Array(BOARD_WIDTH);
        txt.push('\n');
        for (var j = 0; j < GAME_RECT_WIDTH; j++) {
          colorId[i][j] = data[len++];
          if (+colorId[i][j] === 255) {
            colorId[i][j] = -1;
            txt.push('.');
          } else {
            txt.push(' ');
          }
        }
      }
      console.log(data);
      console.log('load level file:' + url + ', needFillNum:' + needFillNum);
      console.log(txt.join(''));
    },
  });

  this.addChild(new Tiny.Text('watch the console', {
    fill: 'white',
  }));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
