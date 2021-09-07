/**
 * 此示例需要安装插件：tinyjs-plugin-easy-animation
 */

var config = {
  fadeInOut: [{
    property: 'alpha',
    easeFunction: 'Linear.None',
    duration: 3000,
    clips: [
      { percent: '0%', value: 1 },
      { percent: '50%', value: 0 },
      { percent: '100%', value: 1 },
    ],
  }],
  rotate: [{
    property: 'rotation',
    easeFunction: 'Back.In',
    duration: 1000,
    clips: [
      { percent: '0%', value: 0 },
      { percent: '100%', value: 360 },
    ],
  }],
  bounceIn: [{
    property: 'scale.x',
    easeFunction: 'Elastic.In',
    duration: 1000,
    clips: [
      { percent: '0%', value: 1 },
      { percent: '100%', value: 2 },
    ],
  }, {
    property: 'scale.y',
    easeFunction: 'Elastic.In',
    duration: 1000,
    clips: [
      { percent: '0%', value: 1 },
      { percent: '100%', value: 2 },
    ],
  }],
};

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/ants/ant.png');

  sprite.setAnchor(0.5);
  sprite.setPosition(200);
  sprite.plugins['easyAnimation'].setAnimationConfig(config);
  sprite.on('onAnimationClipEnd', function(data) {
    console.log(data);
  });
  sprite.on('onAnimationEnd', function(animationName) {
    console.log(animationName);
    if (animationName === 'fadeInOut') {
      sprite.plugins['easyAnimation'].play('bounceIn');
    } else if (animationName === 'bounceIn') {
      sprite.plugins['easyAnimation'].play('rotate', Infinity);
    }
  });
  sprite.plugins['easyAnimation'].play('fadeInOut', 2);
  this.addChild(sprite);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
