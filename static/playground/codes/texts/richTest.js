// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var style = {
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontFamily: 'Arial',
    fill: '#F7EDCA',
    stroke: '#4a1850',
    strokeThickness: 5,
    dropShadow: true,
    dropShadowColor: 'pink',
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
    wordWrap: true,
    wordWrapWidth: Tiny.WIN_SIZE.width - 50,
  };
  var richText = new Tiny.Text('Rich Text with a lot of options\n中文需要"\\n"\n来换行', style);
  richText.setPosition(30, 30);

  this.addChild(richText);
};

/**
 * constructor
 */
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
