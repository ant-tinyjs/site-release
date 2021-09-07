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
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/heroes.json',
      metadata: {
        spineSkeletonScale: 0.5,
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
  spineInstance.skeleton.setSkinByName('Assassin');
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2), Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineInstance.state.data.defaultMix = 0.2;
  spineInstance.state.data.setMix('roll', 'run', 0);
  spineInstance.state.data.setMix('jump', 'run2', 0);
  setupAnimations(spineInstance.state);

  var cd = new Tiny.ticker.CountDown({
    duration: 5e3,
  });
  cd.on('update', function(t) {
    if (cd.count % 2) {
      randomizeSkin(spineInstance.skeleton);
    } else {
      randomizeAttachments(spineInstance.skeleton);
    }
  });
  cd.start();

  // 重要：记得销毁
  this.on('removed', function() {
    cd.destroy();
  });

  // 事件
  var clickAnim = 0;
  spineInstance.setEventEnabled(true);
  spineInstance.on('pointerdown', function() {
    clickAnim++;
    if (clickAnim % 3 === 0) {
      spineInstance.state.setAnimation(5, 'hideSword', false, 2);
    } else {
      spineInstance.state.setAnimation(5, (clickAnim % 2 === 0) ? 'meleeSwing2' : 'meleeSwing1', false, 0);
    }
  });
};

function setupAnimations(state) {
  state.addAnimation(0, 'idle', true, 1);
  state.addAnimation(0, 'walk', true, 2);
  state.addAnimation(0, 'run', true, 4);
  state.addAnimation(0, 'roll', false, 3);
  state.addAnimation(0, 'run', true, 0);
  state.addAnimation(0, 'run2', true, 1.5);
  state.addAnimation(0, 'jump', false, 3);
  state.addAnimation(0, 'run2', true, 0);
  state.addAnimation(0, 'run', true, 1);
  state.addAnimation(0, 'idle', true, 3);
  state.addAnimation(0, 'idleTired', true, 0.5);
  state.addAnimation(0, 'idle', true, 2);
  state.addAnimation(0, 'walk2', true, 1);
  state.addAnimation(0, 'block', true, 3);
  state.addAnimation(0, 'punch1', false, 1.5);
  state.addAnimation(0, 'block', true, 0);
  state.addAnimation(0, 'punch1', false, 1.5);
  state.addAnimation(0, 'punch2', false, 0);
  state.addAnimation(0, 'block', true, 0);
  state.addAnimation(0, 'hitBig', false, 1.5);
  state.addAnimation(0, 'floorIdle', true, 0);
  state.addAnimation(0, 'floorGetUp', false, 1.5);
  state.addAnimation(0, 'idle', true, 0);
  state.addAnimation(0, 'meleeSwing1-fullBody', false, 1.5);
  state.addAnimation(0, 'idle', true, 0);
  state.addAnimation(0, 'meleeSwing2-fullBody', false, 1.5);
  state.addAnimation(0, 'idle', true, 0);
  state.addAnimation(0, 'idleTired', true, 0.5);
  state.addAnimation(0, 'crouchIdle', true, 1.5);
  state.addAnimation(0, 'crouchWalk', true, 2);
  state.addAnimation(0, 'crouchIdle', true, 2.5).listener = {
    start: function(trackIndex) {
      setupAnimations(state);
    },
  };
  state.setAnimation(1, 'empty', false, 0);
  state.setAnimation(1, 'hideSword', false, 2);
}

function randomizeSkin(skeleton) {
  var result;
  var count = 0;

  for (var skin in skeleton.data.skins) {
    if (skeleton.data.skins[skin].name === 'default') continue;
    if (Math.random() < 1 / ++count) {
      result = skeleton.data.skins[skin];
    }
  }
  console.log('current skin:', result.name);
  setSkin(skeleton, result);
}

function randomizeAttachments(skeleton) {
  var skins = [];

  for (var skin in skeleton.data.skins) {
    skin = skeleton.data.skins[skin];
    if (skin.name === 'default') continue;
    skins.push(skin);
  }

  var newSkin = new Tiny.spine.Skin('random-skin');

  for (var slot = 0; slot < skeleton.slots.length; slot++) {
    var skin = skins[(Math.random() * skins.length - 1) | 0];
    var attachments = skin.attachments[slot];

    for (var attachmentName in attachments) {
      newSkin.setAttachment(slot, attachmentName, attachments[attachmentName]);
    }
  }

  setSkin(skeleton, newSkin);

  // 打印
  var results = [];
  newSkin.attachments.forEach(function(attachment) {
    for (var key in attachment) {
      results.push(attachment[key].name);
    }
  });
  console.log('current attachments:', results.join('|'));
}

function setSkin(skeleton, skin) {
  var slot = skeleton.findSlot('item_near');
  var weapon = slot.getAttachment();

  skeleton.setSkin(skin);
  skeleton.setSlotsToSetupPose();
  slot.setAttachment(weapon);
}
