/* eslint-disable */
/**
 * 此示例需要安装插件：tinyjs-plugin-p2
 */

var Player = function(app) {
  Tiny.Sprite.call(this, Tiny.Loader.resources['player'].texture);
  this.app = app;
  // 启动物理属性
  app.physics.p2.enable(this);
  this.body.name = "player";
  this.body.fixedRotation = true;
  this.body.damping = 0.1;
  this.reset();
}
Player.prototype = Object.create(Tiny.Sprite.prototype);
Player.prototype.reset = function() {
  this.body.setZeroForce();
  this.body.setZeroRotation();
  this.body.setZeroVelocity();
  this.body.x = Tiny.WIN_SIZE.width / 2;
  this.body.y = Tiny.WIN_SIZE.height / 2;
}
Player.prototype.jump = function() {
  this.body.moveUp(240);
}

var Ground = function(app) {
  // Tiny.tiling.TilingSprite.call(this, Tiny.Loader.resources['tiling'].texture, Tiny.WIN_SIZE.width + 400, 120);
  Tiny.Sprite.call(this, Tiny.Loader.resources['tiling'].texture);
  this.app = app;
  this.y = Tiny.WIN_SIZE.height;
  this.x = Tiny.WIN_SIZE.width / 2;
  app.physics.p2.enable(this);
  this.body.static = true;
  this.name = "ground";
}
Ground.prototype = Object.create(Tiny.Sprite.prototype);


// 主场景
var Layer = function() {
  Tiny.Container.call(this);
  // 资源已经加载的情况下就不在重复加载
  if (Tiny.isUndefined(Tiny.Loader.resources['player'])) {
    Tiny.Loader
      .add('player', 'https://gw.alipayobjects.com/zos/rmsportal/fgwbckzYtyxxUBrhFppN.png')
      .add('tiling', 'https://gw.alipayobjects.com/zos/rmsportal/ooEJmLkAtAnLxVljYIXJ.png')
      .load(() => {
        this.initP2();
        this.initGame();
      });
  } else {
    this.initP2();
    this.initGame();
  }
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.initP2 = function() {
  var app = Tiny.app;

  // 启用P2物理系统
  Tiny.Physics.P2.startSystem(app, {
    debug: { // 调试信息
      lineWidth: 1,
      alpha: 1,
      fill: false,
      fillColor: 0xff0000,
      lineColor: 0x0000ff,
    }
  });

  app.physics.p2.restitution = 0;
  app.physics.p2.friction = 0;
  app.physics.p2.gravity.y = 300;
  app.physics.p2.setupWall(false, 'left');
  app.physics.p2.setupWall(false, 'top');
  app.physics.p2.setupWall(false, 'right');
}

Layer.prototype.initGame = function() {
  var app = Tiny.app;

  var title = new Tiny.Text('点击屏幕跳一跳', {
    fontSize: 18,
    fill: 'white',
  });
  title.position.set(Tiny.WIN_SIZE.width / 2, 30);
  title.anchor.set(0.5, 0);
  this.addChild(title);

  var player = new Player(app);
  this.addChild(player);

  var ground = new Ground(app);
  this.addChild(ground);

  function checkIfCanJump() {
    var result = false;
    for (var i = 0; i < app.physics.p2.world.narrowphase.contactEquations.length; i++) {
      var c = app.physics.p2.world.narrowphase.contactEquations[i];
      if ((c.bodyA === player.body.data || c.bodyB === player.body.data) && (c.bodyA === ground.body.data || c.bodyB === ground.body.data)) {
        result = true;
        break;
      }
    }
    return result;
  }

  window.addEventListener('mousedown', () => {
    if (checkIfCanJump()) {
      player.jump();
    }
  })
};
