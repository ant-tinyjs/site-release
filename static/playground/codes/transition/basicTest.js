var RESOURCES = {
  imagePic1: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/bg/pic1.jpg',
  imagePic2: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/bg/pic2.png',
};
var count = 0;
var scenesList = [
  'FadeColor', // 颜色过渡
  'FadeWhite', // 白色过渡
  'ProgressH', // 横向进度
  'ProgressV', // 纵向进度
  'ProgressInOut', // 内=>外扩散
  'ProgressOutIn', // 外=>内扩散
  'ProgressRadialCW', // 顺时针射线
  'ProgressRadialCCW', // 逆时针射线
  'MoveInL', // 左侧移入
  'MoveInR', // 右侧移入
  'MoveInT', // 头部移入
  'MoveInB', // 底部移入
  'SlideInL', // 左=>右滑动
  'SlideInR', // 右=>左滑动
  'SlideInT', // 头=>底滑动
  'SlideInB', // 底=>头滑动
];

// 主场景
function Layer() {
  Tiny.Container.call(this);

  this.addChild(getScene());
}

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

function getScene() {
  var container = new Tiny.Container();
  var sprite = Tiny.Sprite.fromImage(RESOURCES['imagePic' + (count % 2 + 1)]);
  var txt = new Tiny.Text('点击切换场景\n将使用：' + scenesList[count >= scenesList.length ? 0 : count]);

  sprite.setScale(Tiny.WIN_SIZE.width / 640);
  txt.setPosition(Tiny.WIN_SIZE.width / 2, 60);
  txt.setAnchor(0.5);
  container.addChild(sprite);
  container.addChild(txt);

  container.setEventEnabled(true);
  container.on('pointerdown', function(data) {
    var current = scenesList[count];
    count++;

    // 更改转场类型
    if (current === 'FadeColor') {
      Tiny.app.replaceScene(getScene(), current, 500, 0xFF0000);
    } else {
      Tiny.app.replaceScene(getScene(), current);
    }
  });

  if (count >= scenesList.length) {
    count = 0;
  }
  return container;
}
