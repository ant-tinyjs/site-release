var RESOURCES = [
  'https://zos.alipayobjects.com/rmsportal/nJBojwdMJfUqpCWvwyoA.png',
  'https://zos.alipayobjects.com/rmsportal/kkroUtIawGrWrqOLRmjq.jpg',
  'https://zos.alipayobjects.com/rmsportal/jkgwjYSFHRkorsKaZbng.jpeg',
  'https://zos.alipayobjects.com/rmsportal/HAacythTETlcsPxEePbk.webp',
  'https://os.alipayobjects.com/rmsportal/atrIuwPurrBiNEyWNdQA.ogg',
];

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var text = new Tiny.Text('加载中...', {
    fill: 'white',
    fontSize: 16,
  });
  this.addChild(text);

  // 执行加载
  Tiny.Loader.run({
    resources: RESOURCES,
    onProgress: function(per) {
      console.log('percent:', per + '%');
    },
    onComplete: function(resourceLoader, resource) {
      text.text += '\n[ √ ] ' + resource.url;
      console.log(resource.url);
    },
    onAllComplete: function(resourceLoader, object) {
      console.log('complete');
      Tiny.Loader.destroy();
    },
  });

  var loader = new Tiny.loaders.Loader();
  // 注意：run 方法每个 Application 只能使用调用一次，再次加载资源可以用 load 方法
  loader.add([{
    name: 's_greensleeves_ogg',
    url: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/audios/greensleeves.ogg',
  }, {
    name: 's_alipaylogo_svg',
    url: 'https://zos.alipayobjects.com/rmsportal/moegxSzjyemvqaRTVHlG.svg',
  }]).load();
  loader.on('progress', function(loader, resource) {
    text.text += '\n[ √ ] [ ' + resource.name + ' ] ' + resource.url;
    console.log('url => ' + resource.url, 'name => ' + resource.name);
    console.log('progress => ', loader.progress + '%');
  });
  loader.on('complete', function(loader, resource) {
    text.text += '\n加载完成';
    loader.reset();
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
