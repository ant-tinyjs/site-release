var RESOURCES = {
  imageAnt: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png',
  imageSuperAnt: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/super.png',
  imageEinsteinAnt: 'https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/einstein.png',
};
var container = new Tiny.Container();
var resources = [RESOURCES.imageAnt, RESOURCES.imageSuperAnt, RESOURCES.imageEinsteinAnt];

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  createSprite();
  this.addChild(container);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

function createSprite() {
  for (var i = 0; i < 10; i++) {
    var ant = new Tiny.Sprite(Tiny.Texture.fromImage(resources[Tiny.random(0, resources.length - 1)]));
    ant.setRotation(Math.random() - 0.5);
    ant.setAnchor(0.5);
    ant.setEventEnabled(true);
    ant.setPosition(Tiny.WIN_SIZE.width * Math.random(), Tiny.WIN_SIZE.height * Math.random());
    eventBind(ant);
    container.addChild(ant);
  }
}

function eventBind(ant) {
  ant.on('pointerdown', function(data) {
    data.stopPropagation();
    this.data = data;
    this.setOpacity(0.8);
    this.dragging = true;
  });

  ant.on('pointerup', function(data) {
    this.setOpacity(1);
    this.dragging = false;
    this.data = null;
  });

  ant.on('pointermove', function(data) {
    if (this.dragging && this.data) {
      var newPos = this.data.data.getLocalPosition(this.parent);
      this.setPosition(newPos.x, newPos.y);
    }
  });
}
