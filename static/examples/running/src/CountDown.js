/* eslint-disable */

var CountDown = function () {
  Tiny.Container.call(this);
  this.counts = [];

  for (var i = 1; i <= 3; i++) {
    var sprite = Tiny.Sprite.fromImage(RESOURCES['s_t_font' + i]);
    sprite.setAnchor(0.5);
    sprite.setPosition(Tiny.WIN_SIZE.width / 2, Tiny.WIN_SIZE.height / 2);
    sprite.setOpacity(0);
    this.counts.push(sprite);

    this.addChild(sprite);
  }
};

CountDown.prototype = Object.create(Tiny.Container.prototype);
CountDown.prototype.constructor = CountDown;

CountDown.prototype.start = function (onComplete) {
  var self = this;
  this.setVisible(true);

  for (var i = 0; i < 3; i++) {
    this.counts[i].setOpacity(0);
    this.counts[i].setScale(2);
  }

  var fadeInAction = Tiny.FadeIn(500);
  var scaleTo1Action = Tiny.ScaleTo(500, Tiny.scale(1));
  var fadeOutAction = Tiny.FadeOut(100);
  var scaleTo05Action = Tiny.ScaleTo(100, Tiny.scale(0.5));
  scaleTo1Action.setEasing(Tiny.TWEEN.Easing.Elastic.Out);
  fadeOutAction.setEasing(Tiny.TWEEN.Easing.Cubic.Out);
  scaleTo05Action.setEasing(Tiny.TWEEN.Easing.Sinusoidal.Out);

  fadeInAction.onComplete = function () {

    fadeOutAction.onComplete = function () {

      fadeInAction.onComplete = function () {
        self.counts[1].runAction([fadeOutAction, scaleTo05Action]);

        fadeOutAction.onComplete = function () {

          fadeInAction.onComplete = function () {
            fadeOutAction.onComplete = function () {
            };

            self.counts[0].runAction([fadeOutAction, scaleTo05Action]);

            self.setVisible(false);
            onComplete();
          };

          self.counts[0].runAction([fadeInAction, scaleTo1Action]);
        };
      };

      self.counts[1].runAction([fadeInAction, scaleTo1Action]);
    };

    self.counts[2].runAction([fadeOutAction, scaleTo05Action]);
  };

  this.counts[2].runAction([fadeInAction, scaleTo1Action]);
};
