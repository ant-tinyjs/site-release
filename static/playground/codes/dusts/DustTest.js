/**
 * 此示例需要安装插件：tinyjs-plugin-dust
 */

var RESOURCES = {
  imageStar: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/heart.png',
  imageHeart: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/star.png',
};
var container = new Tiny.Container();
var dust = null;

// 主场景
var Layer = function() {
  this.setEventEnabled(true);
  Tiny.Container.call(this);

  this.addChild(new Tiny.Text('touch the screen', {
    fill: 'white',
  }));
  this.addChild(container);

  eventBind();
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.updateTransform = function() {
  dust && dust.update();

  this.containerUpdateTransform();
};

function createDust(x, y) {
  var resource = [RESOURCES['imageStar'], RESOURCES['imageHeart']][Tiny.randomInt(0, 1)];
  dust = new Tiny.Dust(x, y, function() {
    return Tiny.Sprite.fromImage(resource);
  }, container, {
    number: 50,
    gravity: 0.1,
    randomSpacing: true,
    minAngle: 0,
    maxAngle: 6.28,
    minSize: 12,
    maxSize: 24,
    minSpeed: 1,
    maxSpeed: 2,
    minScaleSpeed: 0.005,
    maxScaleSpeed: 0.01,
    minAlphaSpeed: 0.005,
    maxAlphaSpeed: 0.01,
    minRotationSpeed: 0.05,
    maxRotationSpeed: 0.1,
  });

  return dust;
}

function eventBind() {
  container.setEventEnabled(true);
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  container.on('pointerdown', function(data) {
    data.stopPropagation();
    var newPos = data.data.getLocalPosition(this.parent);
    if (newPos.x && newPos.y) {
      createDust(newPos.x, newPos.y);
    }
  });
}
