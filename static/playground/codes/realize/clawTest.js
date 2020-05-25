var SPEED = 10;
var ANTS = [];
var SIZE = 3;
var GAP = 70;

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();
  this.addChild(container);

  var cd = new Tiny.ticker.CountDown({
    duration: Tiny.WIN_SIZE.width * SPEED / SIZE,
  });
  cd.on('update', (t) => {
    var sprite = generateSprite();
    container.addChild(sprite);
    ANTS.push(sprite);
    if (ANTS.length >= SIZE + 1) {
      var ant = ANTS.shift();
      container.removeChild(ant);
    }
  });
  cd.start();

  var tongs = Tongs.generate();
  this.addChild(tongs);

  this.setEventEnabled(true);
  this.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.on('pointerdown', function() {
    Tongs.catching(tongs);
  });
  this.on('pointerup', function() {
    // tongs.texture = Tongs.textures[ 0 ];
    // Tongs.back(tongs);
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

function generateSprite() {
  var ants = [
    'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png',
    'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/cow.png',
    'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png',
    'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/lamp.png',
    'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/super.png',
  ];
  var yArr = [300];
  var y = Tiny.randomFromArray(yArr);
  var x = Tiny.WIN_SIZE.width;
  var sprite = Tiny.Sprite.fromImage(Tiny.randomFromArray(ants));
  var action = Tiny.MoveTo(x * SPEED, Tiny.point(x, y));

  sprite.setPosition(-GAP, y);
  sprite.runAction(action);

  return sprite;
}

var Tongs = {
  isCatching: false,
  textures: [
    Tiny.Texture.fromImage('https://gw.alipayobjects.com/zos/rmsportal/prqtRALwwSTHidYawpKg.png'),
    Tiny.Texture.fromImage('https://gw.alipayobjects.com/zos/rmsportal/dHLMrhXixsNHaIMHpKlC.png'),
  ],
  generate: function() {
    var sprite = new Tiny.Sprite(this.textures[0]);
    sprite.setAnchor(0.5, 0);
    sprite.setScale(0.5);
    sprite.setPosition(Tiny.WIN_SIZE.width / 2, 0);

    return sprite;
  },
  catching: function(sprite) {
    if (Tongs.isCatching) {
      return;
    }
    var action = Tiny.MoveTo(600, { y: 290 });

    var tongX = sprite.getPositionX();
    action.onComplete = function(tween, object) {
      // 开始检测是否抓到
      ANTS.forEach(function(ant) {
        var x = ant.getPositionX();
        var rang = [-40, -20];
        if (x - tongX >= rang[0] && x - tongX <= rang[1]) {
          console.log('抓到了');
          ant.removeActions();

          var action = Tiny.MoveTo(600, { y: 0 });
          action.onComplete = function(tween, object) {
            ant.parent.removeChild(ant);
            Tiny.arrayRemoveObject(ANTS, ant);
            this._onComplete.call(this, tween, object); //eslint-disable-line
          };
          ant.runAction(action);
        }
      });
      Tongs.back(sprite);
      this._onComplete.call(this, tween, object); //eslint-disable-line
    };
    sprite.texture = Tongs.textures[1];
    sprite.runAction(action);
    Tongs.isCatching = true;
  },
  back: function(sprite) {
    var action = Tiny.MoveTo(600, { y: 0 });
    sprite.texture = Tongs.textures[0];
    sprite.runAction(action);

    action.onComplete = function(tween, object) {
      Tongs.isCatching = false;
      this._onComplete.call(this, tween, object); //eslint-disable-line
    };
  },
};
