var starAmount = 1000;
var cameraZ = 0;
var fov = 20;
var baseSpeed = 0.025;
var speed = 0;
var warpSpeed = 0;
var starStretch = 5;
var starBaseSize = 0.05;

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var stars = [];
  var starTexture = Tiny.Texture.fromImage('https://gw.alipayobjects.com/zos/rmsportal/HDbBPcHjplgRjZjNlWIh.png');
  for (var i = 0; i < starAmount; i++) {
    var star = {
      sprite: new Tiny.Sprite(starTexture),
      z: 0,
      x: 0,
      y: 0,
    };
    star.sprite.setAnchor(0.5, 0.7);
    generateStar(star, true);
    this.addChild(star.sprite);
    stars.push(star);
  }

  this.setEventEnabled(true);
  this.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.on('pointertap', function() {
    warpSpeed = warpSpeed > 0 ? 0 : 1;
  });

  var width = Tiny.WIN_SIZE.width;
  var height = Tiny.WIN_SIZE.height;
  Tiny.app.onUpdate(function(delta) {
    speed += (warpSpeed - speed) / 20;
    cameraZ += delta * 10 * (speed + baseSpeed);
    for (var i = 0; i < starAmount; i++) {
      var star = stars[i];
      if (star.z < cameraZ) {
        generateStar(star);
      }

      var z = star.z - cameraZ;
      star.sprite.x = star.x * (fov / z) * width + width / 2;
      star.sprite.y = star.y * (fov / z) * width + height / 2;

      var dxCenter = star.sprite.x - width / 2;
      var dyCenter = star.sprite.y - height / 2;
      var distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter + dyCenter);
      var distanceScale = Math.max(0, (2000 - z) / 2000);
      star.sprite.scale.x = distanceScale * starBaseSize;
      star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / width;
      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

function generateStar(star, initial) {
  star.z = initial ? Math.random() * 2000 : cameraZ + Math.random() * 1000 + 2000;

  var deg = Math.random() * Math.PI * 2;
  var distance = Math.random() * 50 + 1;
  star.x = Math.cos(deg) * distance;
  star.y = Math.sin(deg) * distance;
}
