var num = 0;
// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var txt = new Tiny.Text('click the screen', {
    fill: 'white',
  });
  this.addChild(txt);

  var tapHandler = function() {
    num++;
    txt.text = 'clicked: ' + num;

    if (num >= 10) {
      txt.text = 'reach 10 times, pointertap be removed';
      this.off('pointertap', tapHandler);
    }
  };
  this.setEventEnabled(true);
  this.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.on('pointertap', tapHandler);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
