/* eslint-disable */

var ExplosionPartical = function (resource) {
  Tiny.Sprite.call(this, Tiny.Texture.fromImage(resource));

  this.setAnchor(0.5);
  this.speed = new Tiny.Point();
};

ExplosionPartical.prototype = Object.create(Tiny.Sprite.prototype);
ExplosionPartical.prototype.constructor = ExplosionPartical;

var Explosion = function () {
  Tiny.Container.call(this);

  this.particals = [];

  this.top = new ExplosionPartical(RESOURCES['s_asplode_inner_top']);
  this.bottom = new ExplosionPartical(RESOURCES['s_asplode_inner_bottom']);

  this.top.setPosition(20, -20);
  this.bottom.setPosition(20, 20);

  this.addChild(this.top);
  this.addChild(this.bottom);

  this.particals = [this.top, this.bottom];

  for (var i = 0; i < 5; i++) {
    this.particals.push(new ExplosionPartical(RESOURCES['s_asplode_spike_top']));
    this.particals.push(new ExplosionPartical(RESOURCES['s_asplode_spike_left']));
  }

  this.clouds = [];

  for (var i = 0; i < 5; i++) {
    var cloud = Tiny.Sprite.fromImage(RESOURCES['s_cloud']);
    this.clouds.push(cloud);
    this.addChild(cloud);
  }

  this.reset();
};

Explosion.prototype = Object.create(Tiny.Container.prototype);
Explosion.prototype.constructor = Explosion;

Explosion.prototype.explode = function () {
  this.exploding = true;
};

Explosion.prototype.reset = function () {
  for (var i = 0; i < this.clouds.length; i++) {
    var cloud = this.clouds[i];
    cloud.setAnchor(0.5);
    cloud.scaleTarget = 2 + Math.random() * 2;
    cloud.setScale(0.5);
    cloud.setOpacity(0.75);
    cloud.setPosition((Math.random() - 0.5) * 150, (Math.random() - 0.5) * 150);
    cloud.speed = new Tiny.Point(Math.random() * 20 - 10, Math.random() * 20 - 10);
    cloud.state = 0;
    cloud.rotSpeed = Math.random() * 0.05;
  }

  for (var i = 0; i < this.particals.length; i++) {
    var partical = this.particals[i];
    this.addChild(partical);
    var angle = (i / this.particals.length) * Math.PI * 2;
    var speed = 7 + Math.random();
    partical.directionX = Math.cos(angle) * speed;
    partical.directionY = Math.sin(angle) * speed;
    partical.rotation = -angle;
    partical.rotationSpeed = Math.random() * 0.02
  }
};

Explosion.prototype.updateTransform = function () {
  if (this.exploding) {
    for (var i = 0; i < this.clouds.length; i++) {
      var cloud = this.clouds[i];
      cloud.rotation += cloud.rotSpeed;
      if (cloud.state === 0) {
        cloud.scale.x += (cloud.scaleTarget - cloud.scale.x) * 0.4;
        cloud.scale.y = cloud.scale.x;

        if (cloud.scale.x > cloud.scaleTarget - 0.1) cloud.state = 1;
      } else {
        cloud.position.x += cloud.speed.x * 0.05;
        cloud.position.y += cloud.speed.y * 0.05;
      }
    }

    for (var i = 0; i < this.particals.length; i++) {
      var partical = this.particals[i];

      partical.directionY += 0.1;
      partical.directionX *= 0.99;
      partical.position.x += partical.directionX;
      partical.position.y += partical.directionY;
      partical.rotation += partical.rotationSpeed;
    }
  }

  this.containerUpdateTransform();
};
