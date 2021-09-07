/**
 * 此示例需要安装插件：tinyjs-plugin-spine
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var loader = new Tiny.loaders.Loader();

  loader
    .add({
      name: 'spineRes',
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/goblins.skel',
      metadata: {
        spineSkeletonScale: 1.5,
      },
    })
    .load(this.initSpine.bind(this));
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.initSpine = function(loader, res) {
  var offset = new Tiny.spine.Vector2();
  var bounds = new Tiny.spine.Vector2();
  var container = new Tiny.Container();
  var spineInstance = new Tiny.spine.Spine(res.spineRes.spineData);

  this.addChild(container);
  container.addChild(spineInstance);
  spineInstance.skeleton.setSkinByName('goblin');
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2), Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineInstance.state.setAnimation(0, 'walk', true);

  changeSkin(container, spineInstance);
};

// changeSkin
function changeSkin(container, spineInstance) {
  var skins = ['goblin', 'goblingirl'];

  container.setEventEnabled(true);
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  container.on('pointerdown', function() {
    var skin = '';
    var currentSkinName = spineInstance.skeleton.skin.name;

    do {
      skin = Tiny.randomFromArray(skins);
    } while (skin === currentSkinName);

    console.log(skin);
    spineInstance.skeleton.setSkinByName(skin);
    spineInstance.skeleton.setSlotsToSetupPose();
  });
}
