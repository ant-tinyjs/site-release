/**
 * 此示例需要安装插件：tinyjs-plugin-easy-animation
 */

var config = {
  breathe: [{
    property: 'scale.x',
    duration: 2000,
    clips: [
      { percent: '0%', value: 2 },
      { percent: '40%', value: 2.5 },
      { percent: '70%', value: 2.5 },
      { percent: '100%', value: 2 },
    ],
  }, {
    property: 'scale.y',
    duration: 2000,
    clips: [
      { percent: '0%', value: 2 },
      { percent: '40%', value: 2.5 },
      { percent: '70%', value: 2.5 },
      { percent: '100%', value: 2 },
    ],
  }],
};

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/heart.png');

  sprite.setAnchor(0.5);
  sprite.setPosition(200);
  sprite.setScale(2);
  sprite.plugins['easyAnimation'].setAnimationConfig(config);
  sprite.plugins['easyAnimation'].play('breathe', Infinity);
  this.addChild(sprite);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
