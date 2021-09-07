/* eslint-disable */

var SegmentManager = function (layer) {
  this._layer = layer;

  this._count = 0;
  this._currentSegment = SEGMENT_DATA[0];
  this._startSegment = {length: 1135 * 2, floor: [0, 1135], blocks: [], coins: []};
  this._last = 0;
  this._position = 0;
};

SegmentManager.prototype.constructor = SegmentManager;

SegmentManager.prototype.reset = function (dontReset) {
  if (dontReset)this._count = 0;
  this._currentSegment = this._startSegment;
  this._currentSegment.start = -200;

  for (var i = 0; i < this._currentSegment.floor.length; i++) {
    this._layer._groundManager.add(this._currentSegment.start + this._currentSegment.floor[i]);
  }
};

SegmentManager.prototype.update = function () {
  this._position = Game.directive.x + Tiny.WIN_SIZE.width * 2;
  var relativePosition = this._position - this._currentSegment.start;

//    console.log(Math.round(relativePosition) + " " + this._currentSegment.length);
  if (relativePosition > this._currentSegment.length) {

    if (this._layer.joyrideMode) {
      var nextSegment = this._startSegment;
      nextSegment.start = this._currentSegment.start + this._currentSegment.length;
      this._currentSegment = nextSegment;

      for (var i = 0; i < this._currentSegment.floor.length; i++) {
        this._layer._groundManager.add(this._currentSegment.start + this._currentSegment.floor[i]);
      }

      return;
    }


    var nextSegment = SEGMENT_DATA[this._count % SEGMENT_DATA.length];
    nextSegment.start = this._currentSegment.start + this._currentSegment.length;

    this._currentSegment = nextSegment;

    //ground
    for (var i = 0; i < this._currentSegment.floor.length; i++) {
      this._layer._groundManager.add(this._currentSegment.start + this._currentSegment.floor[i]);
    }

    var blocks = this._currentSegment.blocks;

    for (var i = 0; i < blocks.length / 2; i++) {
      this._layer._enemyManager.add(this._currentSegment.start + blocks[i * 2], blocks[(i * 2) + 1]);
    }

    var pickups = this._currentSegment.coins;

    for (var i = 0; i < pickups.length / 2; i++) {
      this._layer._pickupManager.add(this._currentSegment.start + pickups[i * 2], pickups[(i * 2) + 1]);
    }

    this._count++;
  }
};
