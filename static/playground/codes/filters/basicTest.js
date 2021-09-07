// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var fragSource = `
    precision mediump float;

    varying vec2 vTextureCoord;
    varying vec4 vColor;

    uniform sampler2D uSampler;
    uniform float customUniform;

    void main(void) {
      vec2 uvs = vTextureCoord.xy;
      vec4 fg = texture2D(uSampler, vTextureCoord);

      fg.r = uvs.y + sin(customUniform);
      gl_FragColor = fg;
    }`;
  var sprite = Tiny.Sprite.fromImage('https://gw.alipayobjects.com/as/g/tiny/resources/1.0.0/images/mokey.png');
  var filter = new Tiny.Filter(null, fragSource);

  this.filter = filter;
  this.addChild(sprite);
  sprite.filters = [filter];
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.updateTransform = function() {
  this.filter.uniforms.customUniform += 0.04;
  this.containerUpdateTransform();
};
