/**
 * 此示例需要安装插件：tinyjs-plugin-audio
 *
 * 注：此示例中用到的音频素材来自于网络 请不要用于任何商业项目。
 */
// 实例化一个 Loader
var loader = new Tiny.loaders.Loader();
var music;
var graphics;
var analyser;

// 添加一个音频对象
loader.add([{
  name: 'music',
  url: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/audios/greensleeves.ogg',
}]);

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var self = this;
  var container = new Tiny.Container();
  //创建按钮，第一个参数为文案，第二个为y坐标，第三个为x坐标
  var startBtn = createTextButton('Play');
  var pauseBtn = createTextButton('Pause', 60);
  var stopBtn = createTextButton('Stop', 120);
  var volumePlus = createTextButton('vol+', 160, -30);
  var volumeMinus = createTextButton('vol-', 160, 30);
  var volumeText = new Tiny.Text('音量：50', {
    fill: 'white',
  });
  volumeText.setAnchor(0.5);
  volumeText.setPositionY(200);

  //实例化graphics
  graphics = new Tiny.Graphics();

  container.addChild(startBtn);
  container.addChild(pauseBtn);
  container.addChild(stopBtn);
  container.addChild(volumePlus);
  container.addChild(volumeMinus);
  container.addChild(volumeText);
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
    analyser = new Tiny.audio.com.AudioAnalyser(music, 2048);
    // 设置为循环播放
    music.loop = true;
    music.volume = 0.5;
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
    volumePlus.on('pointerdown', function() {
      if (music.volume + 0.1 > 1) {
        music.volume = 1;
      } else {
        music.volume += 0.1;
      }

      volumeText.text = '音量：' + (music.volume * 100).toFixed(0);
    });

    volumeMinus.on('pointerdown', function() {
      if (music.volume - 0.1 < 0) {
        music.volume = 0;
      } else {
        music.volume -= 0.1;
      }

      volumeText.text = '音量：' + (music.volume * 100).toFixed(0);
    });

    //使用主调度，每帧获取频域数据，并绘制。
    Tiny.app.onUpdate(function() {
      var data = analyser.getFrequencyData();
      music && self.addChild(draw(data));
    }, true);
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

// 创建文字按钮的简单方法
function createTextButton(title, y, x) {
  var btn = new Tiny.Text(title, {
    fill: 'white',
  });
  btn.setAnchor(0.5);
  btn.setPositionX(x || 0);
  btn.setPositionY(y || 0);
  // 设置文字按钮可操作
  btn.setEventEnabled(true);

  return btn;
}

// 辅助函数，绘制曲线
function draw(data) {
  var x = 0;
  var y = Tiny.WIN_SIZE.height / 1.1;

  graphics.clear();
  graphics.lineStyle(2, '0x00FF66', 0.5);

  //根据频域数据绘制折线
  graphics.moveTo(x, y);
  for (var i = 0; i < data.length; i++) {
    if (data[i * 4]) {
      x = i * 10;
      y = Tiny.WIN_SIZE.height / 1.1 - data[i * 4];
      graphics.lineTo(x, y);
    }
  }

  return graphics;
}
