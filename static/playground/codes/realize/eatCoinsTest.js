// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var self = this;
  var loader = new Tiny.loaders.Loader();
  var opts = {
    loadType: Tiny.loaders.Resource.LOAD_TYPE.IMAGE,
  };

  loader
    .add('bean-trailer', 'https://gw.alipayobjects.com/mdn/rms_87dcb9/afts/img/A*7g04QqzjLAEAAAAAAAAAAAAAARQnAQ', opts)
    .add('bean-eat', 'https://gw.alipayobjects.com/mdn/rms_87dcb9/afts/img/A*984RQJxY79oAAAAAAAAAAAAAARQnAQ', opts)
    .add('coin', 'https://gw.alipayobjects.com/mdn/rms_87dcb9/afts/img/A*iupsTolOhYcAAAAAAAAAAAAAARQnAQ', opts)
    .add('coin-trailer', 'https://gw.alipayobjects.com/mdn/rms_87dcb9/afts/img/A*S7xnRK_v9SQAAAAAAAAAAAAAARQnAQ', opts)
    .add('bean', 'https://gw.alipayobjects.com/mdn/rms_87dcb9/afts/img/A*41Y9QKSoC4EAAAAAAAAAAAAAARQnAQ', opts)
    .load(function() {
      self.init();
      self.isStart = true;
    });
  loader.on('complete', function(loader, resource) {
    loader.reset();
  });
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

Layer.prototype.init = function() {
  var scoreCell = new Tiny.Text('0', {
    fill: 'white',
    stroke: '#4a1850',
    fontSize: 64,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  });
  var coinCell = new Tiny.Container();
  var beanBox = generateBean();

  scoreCell.setAnchor(0.5, 0);
  scoreCell.setPosition(Tiny.WIN_SIZE.width / 2, 100);
  this.score = 0;
  this.beanBox = beanBox;
  this.coinCell = coinCell;
  this.scoreCell = scoreCell;
  this.addChild(coinCell, beanBox, scoreCell);

  var cd = new Tiny.ticker.CountDown({
    duration: 1e3,
  });
  cd.on('update', function(t) {
    for (var i = 0; i < Tiny.randomFromArray([1, 1, 1, 1, 1, 1, 1, 2, 2, 3]); i++) {
      coinCell.addChild(generateCoins());
    }
  });
  cd.start();

  this.eventBind();
};

Layer.prototype.eventBind = function() {
  var beanBox = this.beanBox;
  var isJump = false;
  var initialPosY = beanBox.getPositionY();
  var maxPosY = initialPosY - 220;
  var time = Tiny.getTime();
  var upHandler = function() {
    if (isJump) { return; }

    var diff = Tiny.getTime() - time;

    if (diff > maxPosY) { diff = maxPosY; }

    var distance = diff * 1;
    var action = Tiny.MoveBy(distance / 10, { y: -distance });

    isJump = true;
    action.setEasing(Tiny.TWEEN.Easing.Quintic.Out);
    action.onUpdate = function(tween, object) {
      var beanTrailer = beanBox.$beanTrailer;
      var scale = (initialPosY - tween.y) / maxPosY;

      beanTrailer.setScale(1, scale);
      this._onUpdate.call(this, tween, object); //eslint-disable-line
    };
    action.onComplete = function(tween, object) {
      var back = Tiny.MoveTo(distance / 2, { y: initialPosY });
      var beanTrailer = beanBox.$beanTrailer;
      var bean = beanBox.$bean;

      bean.canEat = true;
      bean.texture = Tiny.TextureCache['bean-eat'];
      back.onStart = function() {
        bean.canEat = false;
        beanTrailer.setScale(1, 0);
        bean.texture = Tiny.TextureCache['bean'];
      };
      back.onComplete = function(tween, object) {
        isJump = false;
      };
      back.setEasing(Tiny.TWEEN.Easing.Elastic.Out);
      back.setDelay(300); // 空中滞留时长
      beanBox.runAction(back);
      this._onComplete.call(this, tween, object); //eslint-disable-line
    };
    beanBox.runAction(action);
  };
  this.setEventEnabled(true);
  this.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height);
  this.on('pointerdown', function(data) {
    data.stopPropagation();
    time = Tiny.getTime();
  });
  this.on('pointerup', upHandler);
  this.on('pointerupoutside', upHandler);
};

Layer.prototype.updateTransform = function() {
  if (!this.isStart) {
    return;
  }
  // 碰撞检测
  var self = this;
  var scoreCell = this.scoreCell;
  var coinCell = this.coinCell;
  var beanBoxPos = this.beanBox.getPosition();
  var bean = this.beanBox.$bean;
  var beanRect = new Tiny.Rectangle(beanBoxPos.x, beanBoxPos.y, bean.width, bean.height);

  coinCell.children.forEach(function(item) {
    var coinRect = new Tiny.Rectangle(item.x + (item.width - item.height), item.y, item.height, item.height);

    if (collisionDetection(beanRect, coinRect) && !item.isDestroy && bean.canEat) {
      var action = Tiny.ScaleTo(200, Tiny.scale(0.8));

      action.onComplete = function() {
        item.destroy({ children: true });
      };
      item.isDestroy = true;
      item.runAction(action);
      scoreCell.text = ++self.score;
    }
  });
  this.containerUpdateTransform();
};

function collisionDetection(rectA, rectB) {
  return (
    Tiny.rectGetMinX(rectA) < Tiny.rectGetMaxX(rectB) - rectB.width / 4 &&
    Tiny.rectGetMaxX(rectA) > Tiny.rectGetMaxX(rectB) + rectB.width / 4 &&
    Tiny.rectGetMinY(rectB) > Tiny.rectGetMinY(rectA) - rectB.height / 4 &&
    Tiny.rectGetMaxY(rectB) < Tiny.rectGetMaxY(rectA) + rectB.height / 4
  );
}

function generateBean() {
  var container = new Tiny.Container();
  var bean = new Tiny.Sprite(Tiny.TextureCache['bean']);
  var beanTrailer = new Tiny.Sprite(Tiny.TextureCache['bean-trailer']);

  bean.canEat = false;
  beanTrailer.setScale(1, 0);
  beanTrailer.setPosition(56, 64);
  container.$beanTrailer = beanTrailer;
  container.$bean = bean;
  container.addChild(beanTrailer, bean);
  container.setPivot(64);
  container.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height * 7.5 / 10);

  return container;
}

function generateCoins() {
  var container = new Tiny.Container();
  var coin = new Tiny.Sprite(Tiny.TextureCache['coin']);
  var coinTrailer = new Tiny.Sprite(Tiny.TextureCache['coin-trailer']);
  var action = Tiny.MoveTo(Tiny.random(2000, 4000), { x: Tiny.WIN_SIZE.width + coinTrailer.width });

  action.onComplete = function(tween, object) {
    container.destroy({ children: true });
    // eslint-disable-next-line no-useless-call
    this._onComplete.call(this, tween, object);
  };
  coin.setPositionX(32);
  coin.setAnchor(1, 0.5);
  coinTrailer.setAnchor(1, 0.5);
  container.addChild(coinTrailer, coin);
  container.setPositionX(-110);
  container.setPositionY(Tiny.random(220, Tiny.WIN_SIZE.height * 7 / 10));
  container.runAction(action);

  return container;
}
