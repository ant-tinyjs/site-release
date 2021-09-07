// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 演示效果，随便找一个单帧图片兜底
  var textures = [Tiny.Texture.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png')];
  var mc = new Tiny.AnimatedSprite(textures);
  mc.animationSpeed = 0.15;
  mc.play();
  this.addChild(mc);

  var url = 'https://gw.alipayobjects.com/os/rmsportal/TpNdEfkKbfNBQjgYriHS.json';

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
  loadJson(url, function(json) {
    var loader = new Tiny.loaders.Loader();
    loader
      .add({
        // 因为是加载 JSON 对象，所以不需要真实资源链接，这里设置任意名称的 .json
        url: 'anyname.json',
        metadata: {
          JSONObject: json,
          fallback: function() {
            // 如果 tileset 的雪碧图加载失败，可以在这里做兜底处理
            console.log('fallback', arguments);
          },
        },
        // 设置加载对象的 xhrType 为 JSONOBJECT 类型
        xhrType: Tiny.loaders.Resource.XHR_RESPONSE_TYPE.JSONOBJECT,
      });
    loader.load(function(loader, resources) {
      // tileset 加载完成后，重新设置帧动画的 textures
      textures = [];
      Object.entries(json.frames).forEach(([key, value]) => {
        textures.push(Tiny.Texture.fromFrame(key));
      });
      mc.textures = textures;
    });
    loader.on('complete', function(loader, resource) {
      loader.reset();
    });
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
