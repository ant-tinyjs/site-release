/**
 * 此示例需要安装插件：tinyjs-plugin-spine
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var loader = new Tiny.loaders.Loader();
  var sources = [];
  this.skeletons = [
    ['alien', 'death', ['head', 'splat-fg', 'splat-bg']],
    ['dragon', 'flying', ['R_wing']],
  ];

  this.skeletons.forEach(function(item) {
    sources.push({
      name: item[0] + 'SpineRes',
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/' + item[0] + '.json',
      metadata: {
        spineSkeletonScale: 0.5,
        spineAtlasFile: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/atlas1.atlas',
      },
    });
  });

  loader
    .add(sources)
    .load(this.initSpine.bind(this));
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.initSpine = function(loader, res) {
  var container = new Tiny.Container();
  var clickTimes = 0;
  var self = this;

  this.addChild(container);
  container.setEventEnabled(true);
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  container.on('pointerdown', function() {
    var selected = self.skeletons[clickTimes % 2];
    var name = selected[0];
    var animation = selected[1];

    container.removeChildren();
    self.activedSkeleton = loadSkeleton(container, res[name + 'SpineRes'].spineData, animation, selected[2]);

    clickTimes++;
  });
  this.activedSkeleton = loadSkeleton(container, res[this.skeletons[1][0] + 'SpineRes'].spineData, this.skeletons[1][1], this.skeletons[1][2]);

  this.activedSkeletonSprite = new Tiny.Sprite();
  this.addChild(this.activedSkeletonSprite);
};

Layer.prototype.updateTransform = function() {
  if (this.activedSkeleton) {
    var regions = this.activedSkeleton.regions;
    var slots = this.activedSkeleton.slots;
    var spineInstance = this.activedSkeleton.spineInstance;

    spineInstance.update(1 / 600);

    for (var i = 0, n = regions.length; i < n; i++) {
      var region = regions[i].region;

      for (var ii = 0; ii < slots.length; ii++) {
        var slot = slots[ii];

        if (slot.attachment && slot.attachment.name === region.name) {
          this.activedSkeletonSprite.texture = region.texture;
          break;
        }
      }
    }
  }

  this.containerUpdateTransform();
};

function loadSkeleton(container, spineData, animation, sequenceSlots) {
  var offset = new Tiny.spine.Vector2();
  var bounds = new Tiny.spine.Vector2();
  var spineInstance = new Tiny.spine.Spine(spineData);

  container.addChild(spineInstance);
  spineInstance.skeleton.setToSetupPose();
  spineInstance.update(0);
  spineInstance.autoUpdate = false;
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2), Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineInstance.state.setAnimation(0, animation, true);
  spineInstance.skeleton.setSkinByName('default');

  var regions = [];
  var skeleton = spineInstance.skeleton;
  var slots = sequenceSlots.concat([]);

  for (var i = 0; i < slots.length; i++) {
    var slot = skeleton.findSlot(slots[i]);

    slots[i] = slot;

    var index = slot.data.index;

    for (var name in skeleton.skin.attachments[index]) {
      regions.push(skeleton.skin.attachments[index][name]);
    }
  }

  return {
    regions: regions,
    slots: slots,
    spineInstance: spineInstance,
  };
}
