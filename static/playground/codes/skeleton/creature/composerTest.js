/**
 * 此示例需要安装插件：tinyjs-plugin-creature
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var loader = new Tiny.loaders.Loader();

  loader
    .add({
      name: 'creatureRes',
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.8/assets/creature/composer.creature_pack',
      xhrType: Tiny.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER,
    })
    .load(this.initPack.bind(this));
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.initPack = function(loader, res) {
  var byteArray = new Uint8Array(res.creatureRes.data);
  var creaturePack = new Tiny.creature.CreaturePackLoader(byteArray.buffer);
  var texture = Tiny.Texture.fromImage('https://gw.alipayobjects.com/zos/tiny/owl/1.0.8/assets/creature/composer.png');
  var raptorRenderer = new Tiny.creature.CreaturePackRenderer(creaturePack, texture);

  console.log('Loaded CreaturePack Data with size: ' + byteArray.byteLength);
  raptorRenderer.packRenderer.blendToAnimation('default', 0.06);
  this.raptorRenderer = raptorRenderer;
  this.addChild(raptorRenderer);
  this.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
  this.setScale(50);
};

Layer.prototype.updateTransform = function() {
  var raptorRenderer = this.raptorRenderer;

  if (raptorRenderer) {
    raptorRenderer.packRenderer.stepTime(1);
    raptorRenderer.refresh(true);
  }
  this.containerUpdateTransform();
};
