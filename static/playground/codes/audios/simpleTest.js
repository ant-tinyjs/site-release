/**
 * 此示例需要安装插件：tinyjs-plugin-audio
 *
 * 注：此示例中用到的音频素材来自于网络 请不要用于任何商业项目。
 */

// 实例化一个 Loader
var loader = new Tiny.loaders.Loader();
var music;

// 添加一个音频对象
loader.add([{
  name: 'music',
  url: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/audios/greensleeves.ogg',
}]);

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();
  var startBtn = createTextButton('Play');
  var pauseBtn = createTextButton('Pause', 60);
  var stopBtn = createTextButton('Stop', 120);

  container.addChild(startBtn);
  container.addChild(pauseBtn);
  container.addChild(stopBtn);
  container.setPivot(container.width / 2, container.height / 2);
  container.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  this.addChild(container);

  // 此处用来防止修改代码执行时之前的音频没有停止
  this.on('removed', function() {
    Tiny.audio.manager.pause();
    Tiny.audio.manager.removeAudio(music);
  });

  // 保证音频资源加载完成后再操作
  loader.load(function() {
    // 通过音频资源名 music 来初始化一个 Audio 对象
    music = Tiny.audio.manager.getAudio('music');
    // 设置为循环播放
    music.loop = true;

    // 播放
    startBtn.on('pointerdown', function() {
      music.play();
    });
    // 暂停播放（再次播放将从暂停点开始继续播放）
    pauseBtn.on('pointerdown', function() {
      music.pause();
    });
    // 停止播放（停止音乐再次播放从0s开始）
    stopBtn.on('pointerdown', function() {
      music.stop();
    });
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

// 创建文字按钮的简单方法
function createTextButton(title, y) {
  var btn = new Tiny.Text(title, {
    fill: 'white',
  });
  btn.setAnchor(0.5);
  btn.setPositionY(y || 0);
  // 设置文字按钮可操作
  btn.setEventEnabled(true);

  return btn;
}
