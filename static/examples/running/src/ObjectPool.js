/* eslint-disable */

var ObjectPool = function (classType) {
  this.classType = classType;
  this.pool = [];
};

// constructor
ObjectPool.prototype.constructor = ObjectPool;

ObjectPool.prototype.get = function () {
  var object = this.pool.pop();
  if (!object) {
    object = new this.classType();

  }
  return object;
};
