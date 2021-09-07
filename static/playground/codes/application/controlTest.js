var music;

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 创建并添加说明文字
  var tip = new Tiny.Text('点击画布暂停/开始游戏', {
    fill: 'white',
  });
  this.addChild(tip);

  // 创建并添加精灵，同时绑定旋转动画
  var ant = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png');
  var action = Tiny.RotateBy(100, { rotation: Tiny.deg2radian(5) });
  ant.setAnchor(0.5);
  ant.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  ant.runAction(Tiny.RepeatForever(action));
  this.addChild(ant);

  // 创建并添加时间显示对象
  var txt = new Tiny.Text('当前时间：00:00', {
    fill: 'yellow',
  });
  txt.setAnchor(0.5, 0);
  txt.setPosition(Tiny.WIN_SIZE.width / 2, 200);
  this.addChild(txt);

  // 新建一个定时器，打印当前时间
  var cd = new Tiny.ticker.CountDown({
    duration: 1e3,
  });
  cd.on('update', function(t) {
    txt.text = '当前时间：' + (new Date(Tiny.getTime())).toLocaleTimeString();
  });
  cd.start();

  // 此处用来防止修改代码执行时之前的音频没有停止
  this.on('removed', function() {
    try {
      Tiny.audio.manager.pause();
      Tiny.audio.manager.removeAudio(music);
    } catch (e) {
      console.warn('这个警告没有关系，请不要担心，只是当前环境暂不支持音频插件');
    }
  });

  // 实例化一个 Loader，并添加加载一个音频对象
  var loader = new Tiny.loaders.Loader();
  loader.add([{
    name: 'music',
    url: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/audios/greensleeves.ogg',
  }]);
  // 保证音频资源加载完成后再操作
  loader.load(function() {
    try {
      // 通过音频资源名 music 来初始化一个 Audio 对象
      var music = Tiny.audio.manager.getAudio('music');
      // 设置为循环播放
      music.loop = true;
      // 播放
      music.play();
    } catch (e) {
      console.warn('这个警告没有关系，请不要担心，只是当前环境暂不支持音频插件');
    }
  });
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });

  // 设置场景可点击
  this.setEventEnabled(true);
  // 设置点击区域为整个屏幕
  this.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.on('pointerdown', function() {
    if (Tiny.app.isPaused()) {
      Tiny.app.resume();
    } else {
      Tiny.app.pause();
    }
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
