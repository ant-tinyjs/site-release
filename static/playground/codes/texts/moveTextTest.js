// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var texts = ['点击可获\n得能量', '评论\n14g', '听歌\n64g'];
  var texture = Tiny.Texture.fromImage('https://gw.alicdn.com/tfs/TB17EMzSpXXXXbpXpXXXXXXXXXX-112-112.png');

  for (var i = 0; i < 10; i++) {
    var container = new Tiny.Container();
    var ballBg = new Tiny.Sprite(texture);
    ballBg.width = Tiny.WIN_SIZE.width * 0.15;
    ballBg.height = Tiny.WIN_SIZE.width * 0.15;
    ballBg.setAnchor(0.5);
    container.setPosition(Math.random() * Math.abs(Tiny.WIN_SIZE.width - 200) + 100, Math.random() * Math.abs(Tiny.WIN_SIZE.height - 200) + 100);
    container.addChild(ballBg);

    var text = new Tiny.Text(Tiny.randomFromArray(texts), {
      wordWrap: true,
      wordWrapWidth: 100,
      align: 'center',
      fontFamily: 'PingFang SC',
      fontSize: Tiny.WIN_SIZE.width * 0.03 + 'px',
      fill: 0xffffff,
    });
    text.setAnchor(0.5);
    container.addChild(text);

    container.setOpacity(Tiny.randomBool() ? 1 : 0.6);

    var action = Tiny.MoveBy(800, Tiny.point(0, Tiny.randomBool() ? 5 : -5));
    container.runAction(Tiny.RepeatForever(Tiny.Back(action)));
    this.addChild(container);
  }
};

/**
 * constructor
 */
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
