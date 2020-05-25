// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var self = this;
  var supportedExts = Tiny.plugins.compressedTexture.supportedExtensions();
  var uri = 'https://gw.alipayobjects.com/os/tiny/resources/1.0.6/compressedtexture/chicken-fleeing/chicken-fleeing';
  var json = uri + '.json';
  var image = uri + (supportedExts.length === 0 ? '.png' : supportedExts[0] + '.ktx');
  console.log(image);

  /**
   * 辅助方法，用于加载 JSON 数据
   * @param url
   * @param callback
   */
  function loadJson(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);

    xhr.onreadystatechange = function() {
      if (+xhr.readyState === 4) {
        if ((+xhr.status >= 200 && +xhr.status < 300) || +xhr.status === 304) {
          callback(JSON.parse(xhr.responseText));
        }
      }
    };
    xhr.send(null);
  }
  loadJson(json, function(json) {
    var loader = new Tiny.loaders.Loader();
    loader
      .add({
        // 因为是加载 JSON 对象，所以不需要真实资源链接，这里设置任意名称的 .json
        url: 'anyname.json',
        metadata: {
          JSONObject: json,
          image: image,
          useCompressedTexture: true,
          fallback: function() {
            // 如果 tileset 的雪碧图加载失败，可以在这里做兜底处理
            console.log('fallback', arguments);
          },
        },
        // 设置加载对象的 xhrType 为 JSONOBJECT 类型
        xhrType: Tiny.loaders.Resource.XHR_RESPONSE_TYPE.JSONOBJECT,
      })
      .load(function(loader, resources) {
        var textures = [];
        Object.entries(json.frames).forEach(([key, value]) => {
          textures.push(Tiny.Texture.fromFrame(key));
        });
        // 通过 AnimatedSprite 构造函数创建帧动画
        var mc = new Tiny.AnimatedSprite(textures);
        // 设置动画速度
        mc.animationSpeed = 0.15;
        mc.play();

        self.addChild(mc);
      });
    loader.on('complete', function(loader, resource) {
      loader.reset();
    });
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
