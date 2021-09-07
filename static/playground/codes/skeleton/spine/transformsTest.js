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
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/transforms.json',
      metadata: {
        spineSkeletonScale: 0.5,
        spineAtlasFile: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/atlas2.atlas',
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
  spineInstance.skeleton.setToSetupPose();
  spineInstance.skeleton.updateWorldTransform();
  var debuggerInstance = new Tiny.spine.Debugger(spineInstance, {
    controlBones: ['wheel2overlay', 'wheel3overlay', 'rotate-handle'],
    drawRegionAttachments: true,
    drawBones: true,
  });

  this.addChild(container);
  container.addChild(spineInstance);
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2), Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));

  // 事件
  this.setEventEnabled(true);
  this.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.on('pointerdown', function(data) {
    data.stopPropagation();
    this.startPos = data.data.getLocalPosition(this.parent);
  });
  this.on('pointermove', function(data) {
    if (this.startPos) {
      var currentPos = data.data.getLocalPosition(this.parent);
      var offsetX = currentPos.x - this.startPos.x;
      var delta = (offsetX * 180 / Tiny.PI_2) / Tiny.WIN_SIZE.width;

      spineInstance.skeleton.findTransformConstraint('wheel2').data.offsetRotation += delta;
      spineInstance.skeleton.findTransformConstraint('wheel3').data.offsetRotation += delta;
      spineInstance.skeleton.findTransformConstraint('wheel1').translateMix += (offsetX > 0 ? 0.01 : -0.01);
    }
  });
  this.on('pointerup', function(data) {
    this.startPos = null;
  });

  // 通过 Bone 获取控制点
  debuggerInstance.controlBones.forEach(function(name) {
    var controlbar = debuggerInstance.controlBonesContainer.getChildByName(name + '-graphics');

    controlbar.setEventEnabled(true);
    controlbar.on('pointerdown', function(data) {
      data.stopPropagation();
      this.startPos = data.data.getLocalPosition(this.parent);
    });
    controlbar.on('pointermove', function(data) {
      if (this.startPos) {
        var currentPos = data.data.getLocalPosition(this.parent);
        var offsetX = currentPos.x;
        var offsetAngle = Math.acos(offsetX / Tiny.WIN_SIZE.width) * 0.01 * Tiny.spine.radians2Degrees;

        if (name === 'rotate-handle') {
          offsetAngle && (spineInstance.skeleton.findBone('wheel1').rotation += offsetAngle);
        } else {
          var bone = spineInstance.skeleton.findBone(name);

          bone.x = currentPos.x - spineInstance.skeleton.x;
          bone.y = -(currentPos.y - spineInstance.skeleton.y);
        }
      }
    });
    controlbar.on('pointerup', function(data) {
      this.startPos = null;
    });
    controlbar.on('pointerupoutside', function(data) {
      this.startPos = null;
    });
  });
};
