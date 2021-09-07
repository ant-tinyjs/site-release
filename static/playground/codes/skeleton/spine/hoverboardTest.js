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
      url: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/spineboy.json',
      metadata: {
        spineSkeletonScale: 0.8,
        spineAtlasFile: 'https://gw.alipayobjects.com/zos/tiny/owl/1.0.7/assets/spine/atlas1.atlas',
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
    controlBones: ['hoverboard controller', 'hip controller', 'board target', 'crosshair'],
    drawBones: true,
  });

  this.addChild(container);
  container.addChild(spineInstance);
  spineInstance.skeleton.getBounds(offset, bounds, []);
  spineInstance.setPosition(Tiny.WIN_SIZE.width / 2 - (offset.x + bounds.x / 2), Tiny.WIN_SIZE.height / 2 - (offset.y + bounds.y / 2));
  spineInstance.state.setAnimation(0, 'hoverboard', true);
  // spineInstance.state.addAnimation(1, 'aim', true, 0).mixDuration = 0.2;

  // 事件
  container.setEventEnabled(true);
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  container.on('pointerdown', function() {
    hoverboardJump(spineInstance.state);
  });

  // 通过 Bone 获取控制点
  debuggerInstance.controlBones.forEach(function(name) {
    var controlbar = debuggerInstance.controlBonesContainer.getChildByName(name + '-graphics');
    var bone = spineInstance.skeleton.findBone(name);
    var leaveHandler = function(data) {
      this.setOpacity(1);
      this._dragging = false;
      this._data = null;

      if (name === 'crosshair') {
        hoverboardShoot(spineInstance.state);
      }
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
      }
    });
  });
};

function hoverboardJump(state) {
  state.setAnimation(1, 'jump', false);
  state.addEmptyAnimation(1, 0.5, 0);
}

function hoverboardShoot(state) {
  state.setAnimation(2, 'aim', true);
  state.setAnimation(3, 'shoot', false).listener = {
    complete: function(trackIndex) {
      state.setEmptyAnimation(2, 0.2);
      state.clearTrack(3);
    },
  };
}
