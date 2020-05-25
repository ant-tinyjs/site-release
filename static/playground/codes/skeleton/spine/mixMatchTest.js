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
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/mix-and-match.skel',
      metadata: {
        spineSkeletonScale: 0.8,
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
  var container = new Tiny.Container();
  var spineInstance = new Tiny.spine.Spine(res.spineRes.spineData);

  this.addChild(container);
  container.addChild(spineInstance);

  var localRect = spineInstance.getLocalBounds();

  spineInstance.setPivot(container.width / 2, container.height / 2);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - localRect.x, Tiny.WIN_SIZE.height / 2 - localRect.y + 300);

  changeAnimationAndSkin(container, spineInstance);
};

function changeAnimationAndSkin(container, spineInstance) {
  var singleAnimations = ['dress-up', 'aware'];
  var loopAnimations = ['blink', 'dance', 'idle', 'walk'];
  var allAnimations = [].concat(singleAnimations, loopAnimations);

  var skeletonData = spineInstance.spineData;
  var customSkin = new Tiny.spine.Skin('custom');
  var customSkins = {
    accessories: ['backpack', 'bag', 'cape-blue', 'cape-red', 'hat-red-yellow', 'hat-pointy-blue-yellow', 'scarf'],
    clothes: ['dress-blue', 'dress-green', 'hoodie-blue-and-scarf', 'hoodie-orange'],
    eyelids: ['girly', 'semiclosed'],
    eyes: ['eyes-blue', 'green', 'violet', 'yellow'],
    hair: ['blue', 'brown', 'long-blue-with-scarf', 'pink', 'short-red'],
    legs: ['boots-pink', 'boots-red', 'pants-green', 'pants-jeans'],
    nose: ['long', 'short'],
  };
  var setupSkins = ['full-skins/boy', 'full-skins/girl', 'full-skins/girl-blue-cape', 'full-skins/girl-spring-dress'];

  function handler() {
    // skin
    if (Tiny.randomBool()) {
      customSkin.clear();
      customSkin.addSkin(skeletonData.findSkin('skin-base'));
      var names = ['skin-base'];

      for (var skin in customSkins) {
        var skinName = skin + '/' + Tiny.randomFromArray(customSkins[skin]);

        customSkin.addSkin(skeletonData.findSkin(skinName));
        names.push(skinName);
      }
      spineInstance.skeleton.setSkin(customSkin);
      console.log('customSkin =>', names.join('|'));
    } else {
      var skinName = Tiny.randomFromArray(setupSkins);

      spineInstance.skeleton.setSkinByName(skinName);
      console.log('setupSkin =>', skinName);
    }
    spineInstance.skeleton.setSlotsToSetupPose();

    // animation
    var animation = '';
    var currentAnimation;

    try {
      currentAnimation = spineInstance.state.getCurrent(0).animation.name;
    } catch (e) {}

    do {
      animation = Tiny.randomFromArray(allAnimations);
    } while (animation === currentAnimation);

    console.log(animation);
    spineInstance.skeleton.setToSetupPose();
    spineInstance.state.setAnimation(0, animation, loopAnimations.indexOf(animation) !== -1);
  }

  handler();

  container.setEventEnabled(true);
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  container.on('pointerdown', handler);
}
