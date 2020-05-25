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
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/stretchyman.json',
      metadata: {
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
  var debuggerInstance = new Tiny.spine.Debugger(spineInstance, {
    controlBones: ['back leg controller', 'front leg controller', 'back arm controller', 'front arm controller', 'head controller', 'hip controller'],
    drawPaths: true,
    drawBones: true,
  });

  this.spineInstance = spineInstance;
  this.addChild(container);
  container.addChild(spineInstance);
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2), Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineInstance.state.setAnimation(0, 'idle', true);

  // 通过 Bone 获取控制点
  debuggerInstance.controlBones.forEach(function(name) {
    var controlbar = debuggerInstance.controlBonesContainer.getChildByName(name + '-graphics');
    var bone = spineInstance.skeleton.findBone(name);
    var leaveHandler = function(data) {
      this.setOpacity(1);
      this._dragging = false;
      this._data = null;
    };

    controlbar.setEventEnabled(true);
    controlbar.on('pointerdown', function(data) {
      data.stopPropagation();
      this.setOpacity(0.5);
      this._data = data;
      this._dragging = true;
    });
    controlbar.on('pointerup', leaveHandler);
    controlbar.on('pointerupoutside', leaveHandler);
    controlbar.on('pointermove', function(data) {
      if (this._dragging && this._data) {
        var newPos = this._data.data.getLocalPosition(this.parent);
        var temp = new Tiny.spine.Vector2();

        if (bone.parent !== null) {
          bone.parent.worldToLocal(temp.set(newPos.x, newPos.y));
        } else {
          temp.set(newPos.x, newPos.y);
        }

        bone.x = temp.x;
        bone.y = temp.y;

        if (name === 'head controller') {
          bone.x = Tiny.spine.clamp(bone.x, -65, 65);
          bone.y = Math.max(260, bone.y);
        }
      }
    });
  });
};

Layer.prototype.updateTransform = function() {
  if (this.spineInstance) {
    var skeleton = this.spineInstance.skeleton;

    center(skeleton, skeleton.findBone('back leg middle'), skeleton.findBone('back leg 1'), skeleton.findBone('back leg controller'), 65, 1);
    center(skeleton, skeleton.findBone('front leg middle'), skeleton.findBone('front leg 1'), skeleton.findBone('front leg controller'), 65, 1);
    center(skeleton, skeleton.findBone('front arm middle'), skeleton.findBone('front arm 1'), skeleton.findBone('front arm controller'), 90, -1);
    center(skeleton, skeleton.findBone('back arm middle'), skeleton.findBone('back arm 1'), skeleton.findBone('back arm controller'), 90, -1);
    rotate(skeleton, skeleton.findBone('front arm controller'), skeleton.findBone('front arm elbow'));
    rotate(skeleton, skeleton.findBone('back arm controller'), skeleton.findBone('back arm elbow'));

    var headControl = skeleton.findBone('head controller');
    var hipControl = skeleton.findBone('hip controller');
    var head = skeleton.findBone('head');
    var angle = Math.atan2(headControl.worldY - hipControl.worldY, headControl.worldX - hipControl.worldX) * Tiny.spine.radDeg;

    angle = -(angle + 90) * 2.5;
    head.rotation = head.data.rotation + Math.min(90, Math.abs(angle)) * Math.sign(angle);
  }

  this.containerUpdateTransform();
};

function center(skeleton, middleBone, hipBone, footBone, amount, dir) {
  var temp = new Tiny.spine.Vector3();
  var temp2 = new Tiny.spine.Vector3();
  var kneePos = new Tiny.spine.Vector2();

  temp.set(footBone.worldX + skeleton.x, footBone.worldY + skeleton.y)
    .sub(temp2.set(hipBone.worldX + skeleton.x, hipBone.worldY + skeleton.y));

  var dist = Math.sqrt(temp.x * temp.x + temp.y * temp.y);

  temp2.set(hipBone.worldX + skeleton.x, hipBone.worldY + skeleton.y);
  temp.scale(0.5).add(temp2);
  middleBone.parent.worldToLocal(kneePos.set(temp.x, temp.y));
  middleBone.x = kneePos.x;
  middleBone.y = kneePos.y;
  middleBone.children[0].y = (22 + Math.max(0, amount - dist * 0.3)) * dir;
}

function rotate(skeleton, handBone, elbowBone) {
  var v = (new Tiny.spine.Vector3()).set(handBone.worldX, handBone.worldY, 0).sub(new Tiny.spine.Vector3(elbowBone.worldX, elbowBone.worldY, 0)).normalize();
  var angle = Math.acos(v.x) * Tiny.spine.radians2Degrees + 180;

  if (v.y > 0) {
    angle = 360 - angle;
  }
  handBone.rotation = angle;
}
