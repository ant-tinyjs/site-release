/* eslint-disable */

var Background = function () {

  Tiny.Container.call(this);

  this.scrollPosition = 1500;

  //背景
  this.bg = new Background.createSprite(Tiny.Texture.fromImage(RESOURCES['s_bg']), this, 110);
  this.bgDownBehind = new Background.createSprite(Tiny.Texture.fromImage(RESOURCES['s_bg_down_behind']), this, 60);
  this.bgUpBehind = new Background.createSprite(Tiny.Texture.fromImage(RESOURCES['s_bg_up_behind']), this);

  //树
  for (var j = 1; j <= 2; j++) {
    var tree = Tiny.Sprite.fromImage(RESOURCES['s_tree' + j]);
    tree.setAnchor(0.5, 1);
    tree.setPositionY(Tiny.WIN_SIZE.height - 70);

    this['tree' + j] = tree;
    this.addChild(this['tree' + j]);
  }

  this.bgUpCenter = new Background.createSprite(Tiny.Texture.fromImage(RESOURCES['s_bg_up_center']), this);

  //吊兰
  this.hangs = new Background.createHangs(this);

  this.bgUpFront = new Background.createSprite(Tiny.Texture.fromImage(RESOURCES['s_bg_up_front']), this);
  this.bgDownCenter = new Background.createSprite(Tiny.Texture.fromImage(RESOURCES['s_bg_down_center']), this, 0);

  this.bg.speed = 1 / 2;
  this.bgDownBehind.speed = 1.2 / 2;
  this.bgUpBehind.speed = 1.2 / 2;
  this.bgUpCenter.speed = 1.5 / 2;
  this.bgDownCenter.speed = 1.6 / 2;
  this.bgUpFront.speed = 2 / 2;
};

Background.prototype = Object.create(Tiny.Container.prototype);
Background.prototype.constructor = Background;

Background.prototype.updateTransform = function () {
  var width = Tiny.WIN_SIZE.width;
  this.scrollPosition = Game.directive.x + 4000;

  var treePos = -this.scrollPosition * 1.5 / 2;
  treePos %= width + 556;
  treePos += width + 556;
  treePos -= this.tree1.width / 2;
  this.tree1.setPositionX(treePos - Game.xOffset);

  var tree2Pos = -(this.scrollPosition + width / 2) * 1.5 / 2;
  tree2Pos %= width + 556;
  tree2Pos += width + 556;
  tree2Pos -= this.tree2.width / 2;
  this.tree2.setPositionX(tree2Pos - Game.xOffset);

  this.bg.setPosition(this.scrollPosition);
  this.bgDownBehind.setPosition(this.scrollPosition);
  this.bgUpBehind.setPosition(this.scrollPosition);
  this.bgUpCenter.setPosition(this.scrollPosition);
  this.bgDownCenter.setPosition(this.scrollPosition);
  this.bgUpFront.setPosition(this.scrollPosition);
  this.hangs.setPosition(this.scrollPosition);

  this.containerUpdateTransform();
};

Background.createSprite = function (texture, owner, offsetY) {
  this.sprites = [];
  this.spriteWidth = texture.width - 1;
  var amount = Math.ceil(940 / this.spriteWidth);
  if (amount < 3)amount = 3;

  for (var i = 0; i < amount; i++) {
    var sprite = new Tiny.Sprite(texture);
    if (!Tiny.isUndefined(offsetY)) {
      sprite.setAnchor(0, 1);
      sprite.setPositionY(Tiny.WIN_SIZE.height - offsetY);
    }
    owner.addChild(sprite);
    this.sprites.push(sprite);
  }

  this.speed = 1;
};

Background.createSprite.prototype.setPosition = function (position) {
  var h = this.spriteWidth;

  for (var i = 0; i < this.sprites.length; i++) {
    var pos = -position * this.speed;
    pos += i * h;
    pos %= h * this.sprites.length;
    pos += h * 2;

    this.sprites[i].setPositionX(Math.floor(pos) - Game.xOffset);
  }
};

Background.createHangs = function (owner) {
  this.hangs = [];
  this.owner = owner;

  for (var i = 0; i < 10; i++) {
    var hang = Tiny.Sprite.fromImage(RESOURCES['s_d' + Tiny.random(0, 2)]);
    hang.offset = i * 100 + Math.random() * 50;
    hang.speed = (1.5 + Math.random() * 0.25 ) / 2;
    hang.setPositionY(Math.random() * -200);
    owner.addChild(hang);
    hang.setPositionX(200);
    this.hangs.push(hang);
  }

  this.speed = 1;
};

Background.createHangs.prototype.setPosition = function (position) {
  for (var i = 0; i < this.hangs.length; i++) {
    var hang = this.hangs[i];

    var pos = -(position + hang.offset) * hang.speed;
    pos %= Tiny.WIN_SIZE.width;
    pos += Tiny.WIN_SIZE.width;

    hang.setPositionX(pos);
  }
};
