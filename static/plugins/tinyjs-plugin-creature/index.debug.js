/*!
 * Name: tinyjs-plugin-creature
 * Description: Runtime plugin for CreaturePack Web Format
 * Author: yiiqii
 * Version: v0.0.2
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Tiny = global.Tiny || {}, global.Tiny.creature = {})));
}(this, (function (exports) { 'use strict';

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  function utf8Read(view, offset, length) {
    var string = '';
    for (var i = offset, end = offset + length; i < end; i++) {
      var byte = view.getUint8(i);
      if ((byte & 0x80) === 0x00) {
        string += String.fromCharCode(byte);
        continue;
      }
      if ((byte & 0xe0) === 0xc0) {
        string += String.fromCharCode((byte & 0x0f) << 6 | view.getUint8(++i) & 0x3f);
        continue;
      }
      if ((byte & 0xf0) === 0xe0) {
        string += String.fromCharCode((byte & 0x0f) << 12 | (view.getUint8(++i) & 0x3f) << 6 | (view.getUint8(++i) & 0x3f) << 0);
        continue;
      }
      if ((byte & 0xf8) === 0xf0) {
        string += String.fromCharCode((byte & 0x07) << 18 | (view.getUint8(++i) & 0x3f) << 12 | (view.getUint8(++i) & 0x3f) << 6 | (view.getUint8(++i) & 0x3f) << 0);
        continue;
      }
      throw new Error('Invalid byte ' + byte.toString(16));
    }
    return string;
  }
  function Decoder(view, offset) {
    this.offset = offset || 0;
    this.view = view;
  }
  Decoder.prototype.map = function (length) {
    var value = {};
    for (var i = 0; i < length; i++) {
      var key = this.parse();
      value[key] = this.parse();
    }
    return value;
  };
  Decoder.prototype.bin = function (length) {
    var value = new ArrayBuffer(length);
    new Uint8Array(value).set(new Uint8Array(this.view.buffer, this.offset, length), 0);
    this.offset += length;
    return value;
  };
  Decoder.prototype.str = function (length) {
    var value = utf8Read(this.view, this.offset, length);
    this.offset += length;
    return value;
  };
  Decoder.prototype.array = function (length) {
    var value = new Array(length);
    for (var i = 0; i < length; i++) {
      value[i] = this.parse();
    }
    return value;
  };
  Decoder.prototype.parse = function () {
    var type = this.view.getUint8(this.offset);
    var value, length;
    if ((type & 0xe0) === 0xa0) {
      length = type & 0x1f;
      this.offset++;
      return this.str(length);
    }
    if ((type & 0xf0) === 0x80) {
      length = type & 0x0f;
      this.offset++;
      return this.map(length);
    }
    if ((type & 0xf0) === 0x90) {
      length = type & 0x0f;
      this.offset++;
      return this.array(length);
    }
    if ((type & 0x80) === 0x00) {
      this.offset++;
      return type;
    }
    if ((type & 0xe0) === 0xe0) {
      value = this.view.getInt8(this.offset);
      this.offset++;
      return value;
    }
    if (type === 0xd4 && this.view.getUint8(this.offset + 1) === 0x00) {
      this.offset += 3;
      return undefined;
    }
    switch (type) {
      case 0xd9:
        length = this.view.getUint8(this.offset + 1);
        this.offset += 2;
        return this.str(length);
      case 0xda:
        length = this.view.getUint16(this.offset + 1);
        this.offset += 3;
        return this.str(length);
      case 0xdb:
        length = this.view.getUint32(this.offset + 1);
        this.offset += 5;
        return this.str(length);
      case 0xc4:
        length = this.view.getUint8(this.offset + 1);
        this.offset += 2;
        return this.bin(length);
      case 0xc5:
        length = this.view.getUint16(this.offset + 1);
        this.offset += 3;
        return this.bin(length);
      case 0xc6:
        length = this.view.getUint32(this.offset + 1);
        this.offset += 5;
        return this.bin(length);
      case 0xc0:
        this.offset++;
        return null;
      case 0xc2:
        this.offset++;
        return false;
      case 0xc3:
        this.offset++;
        return true;
      case 0xcc:
        value = this.view.getUint8(this.offset + 1);
        this.offset += 2;
        return value;
      case 0xcd:
        value = this.view.getUint16(this.offset + 1);
        this.offset += 3;
        return value;
      case 0xce:
        value = this.view.getUint32(this.offset + 1);
        this.offset += 5;
        return value;
      case 0xcf:
        var high = this.view.getUint32(this.offset + 1);
        var low = this.view.getUint32(this.offset + 5);
        value = high * 0x100000000 + low;
        this.offset += 9;
        return value;
      case 0xd0:
        value = this.view.getInt8(this.offset + 1);
        this.offset += 2;
        return value;
      case 0xd1:
        value = this.view.getInt16(this.offset + 1);
        this.offset += 3;
        return value;
      case 0xd2:
        value = this.view.getInt32(this.offset + 1);
        this.offset += 5;
        return value;
      case 0xd3:
        high = this.view.getInt32(this.offset + 1);
        low = this.view.getUint32(this.offset + 5);
        value = high * 0x100000000 + low;
        this.offset += 9;
        return value;
      case 0xde:
        length = this.view.getUint16(this.offset + 1);
        this.offset += 3;
        return this.map(length);
      case 0xdf:
        length = this.view.getUint32(this.offset + 1);
        this.offset += 5;
        return this.map(length);
      case 0xdc:
        length = this.view.getUint16(this.offset + 1);
        this.offset += 3;
        return this.array(length);
      case 0xdd:
        length = this.view.getUint32(this.offset + 1);
        this.offset += 5;
        return this.array(length);
      case 0xca:
        value = this.view.getFloat32(this.offset + 1);
        this.offset += 5;
        return value;
      case 0xcb:
        value = this.view.getFloat64(this.offset + 1);
        this.offset += 9;
        return value;
    }
    throw new Error('Unknown type 0x' + type.toString(16));
  };
  function decode(buffer) {
    var view = new DataView(buffer);
    var decoder = new Decoder(view);
    var value = decoder.parse();
    if (decoder.offset !== buffer.byteLength) throw new Error(buffer.byteLength - decoder.offset + ' trailing bytes');
    return value;
  }

  var CreatureTimeSample = function () {
    function CreatureTimeSample(beginTimeIn, endTimeIn, dataIdxIn) {
      classCallCheck(this, CreatureTimeSample);
      this.beginTime = beginTimeIn;
      this.endTime = endTimeIn;
      this.dataIdx = dataIdxIn;
    }
    createClass(CreatureTimeSample, [{
      key: "getAnimPointsOffset",
      value: function getAnimPointsOffset() {
        if (this.dataIdx < 0) {
          return -1;
        }
        return this.dataIdx + 1;
      }
    }, {
      key: "getAnimUvsOffset",
      value: function getAnimUvsOffset() {
        if (this.dataIdx < 0) {
          return -1;
        }
        return this.dataIdx + 2;
      }
    }, {
      key: "getAnimColorsOffset",
      value: function getAnimColorsOffset() {
        if (this.dataIdx < 0) {
          return -1;
        }
        return this.dataIdx + 3;
      }
    }]);
    return CreatureTimeSample;
  }();

  var CreaturePackAnimClip = function () {
    function CreaturePackAnimClip(dataIdxIn) {
      classCallCheck(this, CreaturePackAnimClip);
      this.dataIdx = dataIdxIn;
      this.startTime = 0;
      this.endTime = 0;
      this.firstSet = false;
      this.timeSamplesMap = {};
    }
    createClass(CreaturePackAnimClip, [{
      key: 'sampleTime',
      value: function sampleTime(timeIn) {
        var lookupTime = Math.round(timeIn);
        var lowTime = this.timeSamplesMap[lookupTime].beginTime;
        var highTime = this.timeSamplesMap[lookupTime].endTime;
        if (highTime - lowTime <= 0.0001) {
          return [lowTime, highTime, 0];
        }
        var curFraction = (timeIn - lowTime) / (highTime - lowTime);
        return [lowTime, highTime, curFraction];
      }
    }, {
      key: 'correctTime',
      value: function correctTime(timeIn, withLoop) {
        if (this.withLoop === false) {
          if (timeIn < this.startTime) {
            return this.startTime;
          } else if (timeIn > this.endTime) {
            return this.endTime;
          }
        } else {
          if (timeIn < this.startTime) {
            return this.endTime;
          } else if (timeIn > this.endTime) {
            return this.startTime;
          }
        }
        return timeIn;
      }
    }, {
      key: 'addTimeSample',
      value: function addTimeSample(timeIn, dataIdxIn) {
        var newTimeSample = new CreatureTimeSample(timeIn, timeIn, dataIdxIn);
        this.timeSamplesMap[timeIn] = newTimeSample;
        if (this.firstSet === false) {
          this.firstSet = true;
          this.startTime = timeIn;
          this.endTime = timeIn;
        } else {
          if (this.startTime > timeIn) {
            this.startTime = timeIn;
          }
          if (this.endTime < timeIn) {
            this.endTime = timeIn;
          }
        }
      }
    }, {
      key: 'finalTimeSamples',
      value: function finalTimeSamples() {
        function packCmpNumber(a, b) {
          return a - b;
        }
        var oldTime = this.startTime;
        var arrayOfNumbers = Object.keys(this.timeSamplesMap).map(Number);
        var sortedKeys = arrayOfNumbers.sort(packCmpNumber);
        for (var k = 0; k < sortedKeys.length; k++) {
          var cmpTime = sortedKeys[k];
          if (cmpTime !== oldTime) {
            for (var fillTime = oldTime + 1; fillTime < cmpTime; fillTime++) {
              var newTimeSample = new CreatureTimeSample(oldTime, cmpTime, -1);
              this.timeSamplesMap[fillTime] = newTimeSample;
            }
            oldTime = cmpTime;
          }
        }
      }
    }]);
    return CreaturePackAnimClip;
  }();

  var GraphNode = function () {
    function GraphNode() {
      var idxIn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
      classCallCheck(this, GraphNode);
      this.init(idxIn);
    }
    createClass(GraphNode, [{
      key: "init",
      value: function init(idxIn) {
        this.idx = idxIn;
        this.visited = false;
        this.neighbours = [];
      }
    }]);
    return GraphNode;
  }();

  var CreaturePackLoader = function () {
    function CreaturePackLoader(bytesIn) {
      classCallCheck(this, CreaturePackLoader);
      this.indices = [];
      this.uvs = [];
      this.points = [];
      this.animClipMap = {};
      this.headerList = [];
      this.animPairsOffsetList = [];
      this.dMinX = 0.0;
      this.dMinY = 0.0;
      this.dMaxX = 0.0;
      this.dMaxY = 0.0;
      this.fileData = decode(bytesIn);
      this.headerList = this.fileData[this.getBaseOffset()];
      this.animPairsOffsetList = this.fileData[this.getAnimPairsListOffset()];
      this.indices = new Array(this.getNumIndices());
      this.points = new Array(this.getNumPoints());
      this.uvs = new Array(this.getNumUvs());
      this.updateIndices(this.getBaseIndicesOffset());
      this.updatePoints(this.getBasePointsOffset());
      this.updateUVs(this.getBaseUvsOffset());
      this.fillDeformRanges();
      this.finalAllPointSamples();
      for (var i = 0; i < this.getAnimationNum(); i++) {
        var curOffsetPair = this.getAnimationOffsets(i);
        var animName = this.fileData[curOffsetPair[0]];
        var k = curOffsetPair[0];
        k++;
        var newClip = new CreaturePackAnimClip(k);
        while (k < curOffsetPair[1]) {
          var curTime = this.fileData[k];
          newClip.addTimeSample(curTime, k);
          k += 4;
        }
        newClip.finalTimeSamples();
        this.animClipMap[animName] = newClip;
      }
      this.meshRegionsList = this.findConnectedRegions();
    }
    createClass(CreaturePackLoader, [{
      key: 'formUndirectedGraph',
      value: function formUndirectedGraph() {
        var retGraph = {};
        var numTriangles = this.getNumIndices() / 3;
        for (var i = 0; i < numTriangles; i++) {
          var triIndices = new Array(3);
          triIndices[0] = this.indices[i * 3];
          triIndices[1] = this.indices[i * 3 + 1];
          triIndices[2] = this.indices[i * 3 + 2];
          for (var m = 0; m < triIndices.length; m++) {
            var triIndex = triIndices[m];
            if (triIndex in retGraph === false) {
              retGraph[triIndex] = new GraphNode(triIndex);
            }
            var curGraphNode = retGraph[triIndex];
            for (var j = 0; j < triIndices.length; j++) {
              var cmpIndex = triIndices[j];
              if (cmpIndex !== triIndex) {
                curGraphNode.neighbours.push(cmpIndex);
              }
            }
          }
        }
        return retGraph;
      }
    }, {
      key: 'regionsDFS',
      value: function regionsDFS(graph, idx) {
        var retData = [];
        if (graph[idx].visited) {
          return retData;
        }
        var gstack = [];
        gstack.push(idx);
        while (gstack.length > 0) {
          var curIdx = gstack.pop();
          var curNode = graph[curIdx];
          if (curNode.visited === false) {
            curNode.visited = true;
            retData.push(curNode.idx);
            for (var m = 0; m < curNode.neighbours.length; m++) {
              var neighbourIdx = curNode.neighbours[m];
              gstack.push(neighbourIdx);
            }
          }
        }
        return retData;
      }
    }, {
      key: 'findConnectedRegions',
      value: function findConnectedRegions() {
        var regionsList = [];
        var graph = this.formUndirectedGraph();
        for (var i = 0; i < this.getNumIndices(); i++) {
          var curIdx = this.indices[i];
          if (graph[curIdx].visited === false) {
            var indicesList = this.regionsDFS(graph, curIdx);
            indicesList.sort(function (a, b) {
              return a - b;
            });
            regionsList.push([indicesList[0], indicesList[indicesList.length - 1]]);
          }
        }
        return regionsList;
      }
    }, {
      key: 'updateIndices',
      value: function updateIndices(idx) {
        var curData = this.fileData[idx];
        for (var i = 0; i < curData.length; i++) {
          this.indices[i] = curData[i];
        }
      }
    }, {
      key: 'updatePoints',
      value: function updatePoints(idx) {
        var curData = this.fileData[idx];
        for (var i = 0; i < curData.length; i++) {
          this.points[i] = curData[i];
        }
      }
    }, {
      key: 'updateUVs',
      value: function updateUVs(idx) {
        var curData = this.fileData[idx];
        for (var i = 0; i < curData.length; i++) {
          this.uvs[i] = curData[i];
        }
      }
    }, {
      key: 'getAnimationNum',
      value: function getAnimationNum() {
        var sum = 0;
        for (var i = 0; i < this.headerList.length; i++) {
          if (this.headerList[i] === 'animation') {
            sum++;
          }
        }
        return sum;
      }
    }, {
      key: 'hasDeformCompress',
      value: function hasDeformCompress() {
        for (var i = 0; i < this.headerList.length; i++) {
          if (this.headerList[i] === 'deform_comp1') {
            return 'deform_comp1';
          } else if (this.headerList[i] === 'deform_comp2') {
            return 'deform_comp2';
          } else if (this.headerList[i] === 'deform_comp1_1') {
            return 'deform_comp1_1';
          }
        }
        return '';
      }
    }, {
      key: 'fillDeformRanges',
      value: function fillDeformRanges() {
        if (this.hasDeformCompress() !== '') {
          var curRangesOffset = this.getAnimationOffsets(this.getAnimationNum());
          var curRanges = this.fileData[curRangesOffset[0]];
          this.dMinX = curRanges[0];
          this.dMinY = curRanges[1];
          this.dMaxX = curRanges[2];
          this.dMaxY = curRanges[3];
        }
      }
    }, {
      key: 'finalAllPointSamples',
      value: function finalAllPointSamples() {
        var deformCompressType = this.hasDeformCompress();
        if (deformCompressType === '') {
          return;
        }
        for (var i = 0; i < this.getAnimationNum(); i++) {
          var curOffsetPair = this.getAnimationOffsets(i);
          var k = curOffsetPair[0];
          k++;
          while (k < curOffsetPair[1]) {
            var ptsRawArray = this.fileData[k + 1];
            var ptsRawByteArray = this.fileData[k + 1];
            var rawNum = ptsRawArray.byteLength;
            var ptsDataview = new DataView(ptsRawByteArray);
            if (deformCompressType === 'deform_comp2') {
              rawNum = ptsRawByteArray.byteLength;
            } else if (deformCompressType === 'deform_comp1_1') {
              rawNum = ptsRawByteArray.byteLength / 2;
            }
            var finalPtsArray = new Array(rawNum);
            for (var m = 0; m < rawNum; m++) {
              var bucketVal = 0;
              var numBuckets = 0;
              if (deformCompressType === 'deform_comp1') {
                bucketVal = ptsRawArray[m];
                numBuckets = 65535;
              } else if (deformCompressType === 'deform_comp2') {
                bucketVal = ptsDataview.getUint8(m);
                numBuckets = 255;
              } else if (deformCompressType === 'deform_comp1_1') {
                bucketVal = ptsDataview.getUint16(m * 2, true);
                numBuckets = 65535;
              }
              var setVal = 0.0;
              if (m % 2 === 0) {
                setVal = bucketVal / numBuckets * (this.dMaxX - this.dMinX) + this.dMinX;
                setVal += this.points[m];
              } else {
                setVal = bucketVal / numBuckets * (this.dMaxY - this.dMinY) + this.dMinY;
                setVal += this.points[m];
              }
              finalPtsArray[m] = setVal;
            }
            this.fileData[k + 1] = finalPtsArray;
            k += 4;
          }
        }
      }
    }, {
      key: 'getAnimationOffsets',
      value: function getAnimationOffsets(idx) {
        return [this.animPairsOffsetList[idx * 2], this.animPairsOffsetList[idx * 2 + 1]];
      }
    }, {
      key: 'getBaseOffset',
      value: function getBaseOffset() {
        return 0;
      }
    }, {
      key: 'getAnimPairsListOffset',
      value: function getAnimPairsListOffset() {
        return 1;
      }
    }, {
      key: 'getBaseIndicesOffset',
      value: function getBaseIndicesOffset() {
        return this.getAnimPairsListOffset() + 1;
      }
    }, {
      key: 'getBasePointsOffset',
      value: function getBasePointsOffset() {
        return this.getAnimPairsListOffset() + 2;
      }
    }, {
      key: 'getBaseUvsOffset',
      value: function getBaseUvsOffset() {
        return this.getAnimPairsListOffset() + 3;
      }
    }, {
      key: 'getNumIndices',
      value: function getNumIndices() {
        return this.fileData[this.getBaseIndicesOffset()].length;
      }
    }, {
      key: 'getNumPoints',
      value: function getNumPoints() {
        return this.fileData[this.getBasePointsOffset()].length;
      }
    }, {
      key: 'getNumUvs',
      value: function getNumUvs() {
        return this.fileData[this.getBaseUvsOffset()].length;
      }
    }]);
    return CreaturePackLoader;
  }();

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports (x) {
  	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var index_debug = createCommonjsModule(function (module, exports) {
  /*!
   * Name: tinyjs-plugin-mesh
   * Description: The Tiny.js plugin of mesh
   * Author: yiiqii
   * Version: v1.3.1
   */
  (function (global, factory) {
    factory(exports);
  }(commonjsGlobal, (function (exports) {  var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };
    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var get = function get(object, property, receiver) {
      if (object === null) object = Function.prototype;
      var desc = Object.getOwnPropertyDescriptor(object, property);
      if (desc === undefined) {
        var parent = Object.getPrototypeOf(object);
        if (parent === null) {
          return undefined;
        } else {
          return get(parent, property, receiver);
        }
      } else if ("value" in desc) {
        return desc.value;
      } else {
        var getter = desc.get;
        if (getter === undefined) {
          return undefined;
        }
        return getter.call(receiver);
      }
    };
    var inherits = function (subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
          value: subClass,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    };
    var possibleConstructorReturn = function (self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    };
    var tempPoint = new Tiny.Point();
    var tempPolygon = new Tiny.Polygon();
    var Mesh = function (_Tiny$Container) {
      inherits(Mesh, _Tiny$Container);
      function Mesh(texture, vertices, uvs, indices, drawMode) {
        classCallCheck(this, Mesh);
        var _this = possibleConstructorReturn(this, (Mesh.__proto__ || Object.getPrototypeOf(Mesh)).call(this));
        _this._texture = texture || Tiny.Texture.EMPTY;
        _this.uvs = uvs || new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]);
        _this.vertices = vertices || new Float32Array([0, 0, 100, 0, 100, 100, 0, 100]);
        _this.indices = indices || new Uint16Array([0, 1, 3, 2]);
        _this.dirty = 0;
        _this.indexDirty = 0;
        _this.vertexDirty = 0;
        _this.autoUpdate = true;
        _this.blendMode = Tiny.BLEND_MODES.NORMAL;
        _this.canvasPadding = Mesh.defaults.canvasPadding;
        _this.drawMode = drawMode || Mesh.DRAW_MODES.TRIANGLE_MESH;
        _this.shader = null;
        _this.tintRgb = new Float32Array([1, 1, 1]);
        _this._glDatas = {};
        _this._uvTransform = new Tiny.TextureTransform(_this._texture);
        _this.uploadUvTransform = false;
        _this.pluginName = 'mesh';
        _this._canvasDrawTimes = 1;
        return _this;
      }
      createClass(Mesh, [{
        key: '_renderWebGL',
        value: function _renderWebGL(renderer) {
          this.refresh();
          renderer.setObjectRenderer(renderer.plugins[this.pluginName]);
          renderer.plugins[this.pluginName].render(this);
        }
      }, {
        key: '_renderCanvas',
        value: function _renderCanvas(renderer) {
          this.refresh();
          renderer.plugins[this.pluginName].render(this);
        }
      }, {
        key: '_onTextureUpdate',
        value: function _onTextureUpdate() {
          this._uvTransform.texture = this._texture;
          this.refresh();
        }
      }, {
        key: 'multiplyUvs',
        value: function multiplyUvs() {
          if (!this.uploadUvTransform) {
            this._uvTransform.multiplyUvs(this.uvs);
          }
        }
      }, {
        key: 'refresh',
        value: function refresh(forceUpdate) {
          if (this.autoUpdate) {
            this.vertexDirty++;
          }
          if (this._uvTransform.update(forceUpdate)) {
            this._refresh();
          }
        }
      }, {
        key: '_refresh',
        value: function _refresh() {}
      }, {
        key: '_calculateBounds',
        value: function _calculateBounds() {
          this._bounds.addVertices(this.transform, this.vertices, 0, this.vertices.length);
        }
      }, {
        key: 'containsPoint',
        value: function containsPoint(point) {
          if (!this.getBounds().contains(point.x, point.y)) {
            return false;
          }
          this.worldTransform.applyInverse(point, tempPoint);
          var vertices = this.vertices;
          var points = tempPolygon.points;
          var indices = this.indices;
          var len = this.indices.length;
          var step = this.drawMode === Mesh.DRAW_MODES.TRIANGLES ? 3 : 1;
          for (var i = 0; i + 2 < len; i += step) {
            var ind0 = indices[i] * 2;
            var ind1 = indices[i + 1] * 2;
            var ind2 = indices[i + 2] * 2;
            points[0] = vertices[ind0];
            points[1] = vertices[ind0 + 1];
            points[2] = vertices[ind1];
            points[3] = vertices[ind1 + 1];
            points[4] = vertices[ind2];
            points[5] = vertices[ind2 + 1];
            if (tempPolygon.contains(tempPoint.x, tempPoint.y)) {
              return true;
            }
          }
          return false;
        }
      }, {
        key: 'destroy',
        value: function destroy(options) {
          for (var id in this._glDatas) {
            var data = this._glDatas[id];
            if (data.destroy) {
              data.destroy();
            } else {
              if (data.vertexBuffer) {
                data.vertexBuffer.destroy();
                data.vertexBuffer = null;
              }
              if (data.indexBuffer) {
                data.indexBuffer.destroy();
                data.indexBuffer = null;
              }
              if (data.uvBuffer) {
                data.uvBuffer.destroy();
                data.uvBuffer = null;
              }
              if (data.vao) {
                data.vao.destroy();
                data.vao = null;
              }
            }
          }
          this._glDatas = null;
          get(Mesh.prototype.__proto__ || Object.getPrototypeOf(Mesh.prototype), 'destroy', this).call(this, options);
        }
      }, {
        key: 'texture',
        get: function get$$1() {
          return this._texture;
        },
        set: function set$$1(value) {
          if (this._texture === value) {
            return;
          }
          this._texture = value;
          if (value) {
            if (value.baseTexture.hasLoaded) {
              this._onTextureUpdate();
            } else {
              value.once('update', this._onTextureUpdate, this);
            }
          }
        }
      }, {
        key: 'tint',
        get: function get$$1() {
          return Tiny.rgb2hex(this.tintRgb);
        },
        set: function set$$1(value) {
          this.tintRgb = Tiny.hex2rgb(value, this.tintRgb);
        }
      }, {
        key: 'canvasDrawTimes',
        get: function get$$1() {
          return this._canvasDrawTimes || 1;
        },
        set: function set$$1(times) {
          this._canvasDrawTimes = times > 10 ? 10 : (times < 0 ? 1 : times | 0) || 1;
        }
      }]);
      return Mesh;
    }(Tiny.Container);
    Mesh.DRAW_MODES = {
      TRIANGLE_MESH: 0,
      TRIANGLES: 1
    };
    Mesh.defaults = {
      canvasPadding: 0
    };
    var glCore = Tiny.glCore;
    var matrixIdentity = Tiny.Matrix.IDENTITY;
    var MeshRenderer = function (_Tiny$ObjectRenderer) {
      inherits(MeshRenderer, _Tiny$ObjectRenderer);
      function MeshRenderer(renderer) {
        classCallCheck(this, MeshRenderer);
        var _this = possibleConstructorReturn(this, (MeshRenderer.__proto__ || Object.getPrototypeOf(MeshRenderer)).call(this, renderer));
        _this.shader = null;
        return _this;
      }
      createClass(MeshRenderer, [{
        key: 'onContextChange',
        value: function onContextChange() {
          var gl = this.renderer.gl;
          this.shader = new Tiny.Shader(gl, 'attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}', 'varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void) {\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}');
        }
      }, {
        key: 'render',
        value: function render(mesh) {
          var renderer = this.renderer;
          var gl = renderer.gl;
          var texture = mesh._texture;
          if (!texture.valid) {
            return;
          }
          var glData = mesh._glDatas[renderer.CONTEXT_UID];
          if (!glData) {
            renderer.bindVao(null);
            glData = {
              shader: this.shader,
              vertexBuffer: glCore.GLBuffer.createVertexBuffer(gl, mesh.vertices, gl.STREAM_DRAW),
              uvBuffer: glCore.GLBuffer.createVertexBuffer(gl, mesh.uvs, gl.STREAM_DRAW),
              indexBuffer: glCore.GLBuffer.createIndexBuffer(gl, mesh.indices, gl.STATIC_DRAW),
              vao: null,
              dirty: mesh.dirty,
              indexDirty: mesh.indexDirty,
              vertexDirty: mesh.vertexDirty
            };
            glData.vao = new glCore.VertexArrayObject(gl).addIndex(glData.indexBuffer).addAttribute(glData.vertexBuffer, glData.shader.attributes.aVertexPosition, gl.FLOAT, false, 2 * 4, 0).addAttribute(glData.uvBuffer, glData.shader.attributes.aTextureCoord, gl.FLOAT, false, 2 * 4, 0);
            mesh._glDatas[renderer.CONTEXT_UID] = glData;
          }
          renderer.bindVao(glData.vao);
          if (mesh.dirty !== glData.dirty) {
            glData.dirty = mesh.dirty;
            glData.uvBuffer.upload(mesh.uvs);
          }
          if (mesh.indexDirty !== glData.indexDirty) {
            glData.indexDirty = mesh.indexDirty;
            glData.indexBuffer.upload(mesh.indices);
          }
          if (mesh.vertexDirty !== glData.vertexDirty) {
            glData.vertexDirty = mesh.vertexDirty;
            glData.vertexBuffer.upload(mesh.vertices);
          }
          renderer.bindShader(glData.shader);
          glData.shader.uniforms.uSampler = renderer.bindTexture(texture);
          renderer.state.setBlendMode(Tiny.correctBlendMode(mesh.blendMode, texture.baseTexture.premultipliedAlpha));
          if (glData.shader.uniforms.uTransform) {
            if (mesh.uploadUvTransform) {
              glData.shader.uniforms.uTransform = mesh._uvTransform.mapCoord.toArray(true);
            } else {
              glData.shader.uniforms.uTransform = matrixIdentity.toArray(true);
            }
          }
          glData.shader.uniforms.translationMatrix = mesh.worldTransform.toArray(true);
          glData.shader.uniforms.uColor = Tiny.premultiplyRgba(mesh.tintRgb, mesh.worldAlpha, glData.shader.uniforms.uColor, texture.baseTexture.premultipliedAlpha);
          var drawMode = mesh.drawMode === Mesh.DRAW_MODES.TRIANGLE_MESH ? gl.TRIANGLE_STRIP : gl.TRIANGLES;
          glData.vao.draw(drawMode, mesh.indices.length, 0);
        }
      }]);
      return MeshRenderer;
    }(Tiny.ObjectRenderer);
    Tiny.WebGLRenderer.registerPlugin('mesh', MeshRenderer);
    var MeshSpriteRenderer = function () {
      function MeshSpriteRenderer(renderer) {
        classCallCheck(this, MeshSpriteRenderer);
        this.renderer = renderer;
      }
      createClass(MeshSpriteRenderer, [{
        key: 'render',
        value: function render(mesh) {
          var renderer = this.renderer;
          var context = renderer.context;
          var transform = mesh.worldTransform;
          var res = renderer.resolution;
          if (renderer.roundPixels) {
            context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res | 0, transform.ty * res | 0);
          } else {
            context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res, transform.ty * res);
          }
          renderer.context.globalAlpha = mesh.worldAlpha;
          renderer.setBlendMode(mesh.blendMode);
          if (mesh.drawMode === Mesh.DRAW_MODES.TRIANGLE_MESH) {
            this._renderTriangleMesh(mesh);
          } else {
            this._renderTriangles(mesh);
          }
        }
      }, {
        key: '_renderTriangleMesh',
        value: function _renderTriangleMesh(mesh) {
          var length = mesh.vertices.length / 2;
          for (var i = 0; i < length - 2; i++) {
            var index = i * 2;
            this._renderDrawTriangle(mesh, index, index + 2, index + 4);
          }
        }
      }, {
        key: '_renderTriangles',
        value: function _renderTriangles(mesh) {
          var indices = mesh.indices;
          var length = indices.length;
          for (var i = 0; i < length; i += 3) {
            var index0 = indices[i] * 2;
            var index1 = indices[i + 1] * 2;
            var index2 = indices[i + 2] * 2;
            this._renderDrawTriangle(mesh, index0, index1, index2);
          }
        }
      }, {
        key: '_renderDrawTriangle',
        value: function _renderDrawTriangle(mesh, index0, index1, index2) {
          var context = this.renderer.context;
          var uvs = mesh.uvs;
          var vertices = mesh.vertices;
          var texture = mesh._texture;
          if (!texture.valid) {
            return;
          }
          var base = texture.baseTexture;
          var textureWidth = base.width;
          var textureHeight = base.height;
          var textureSource = base.source;
          var u0 = void 0;
          var u1 = void 0;
          var u2 = void 0;
          var v0 = void 0;
          var v1 = void 0;
          var v2 = void 0;
          if (mesh.uploadUvTransform) {
            var ut = mesh._uvTransform.mapCoord;
            u0 = (uvs[index0] * ut.a + uvs[index0 + 1] * ut.c + ut.tx) * base.width;
            u1 = (uvs[index1] * ut.a + uvs[index1 + 1] * ut.c + ut.tx) * base.width;
            u2 = (uvs[index2] * ut.a + uvs[index2 + 1] * ut.c + ut.tx) * base.width;
            v0 = (uvs[index0] * ut.b + uvs[index0 + 1] * ut.d + ut.ty) * base.height;
            v1 = (uvs[index1] * ut.b + uvs[index1 + 1] * ut.d + ut.ty) * base.height;
            v2 = (uvs[index2] * ut.b + uvs[index2 + 1] * ut.d + ut.ty) * base.height;
          } else {
            u0 = uvs[index0] * base.width;
            u1 = uvs[index1] * base.width;
            u2 = uvs[index2] * base.width;
            v0 = uvs[index0 + 1] * base.height;
            v1 = uvs[index1 + 1] * base.height;
            v2 = uvs[index2 + 1] * base.height;
          }
          var x0 = vertices[index0];
          var x1 = vertices[index1];
          var x2 = vertices[index2];
          var y0 = vertices[index0 + 1];
          var y1 = vertices[index1 + 1];
          var y2 = vertices[index2 + 1];
          var canvasPadding = mesh.canvasPadding / this.renderer.resolution;
          if (canvasPadding > 0) {
            var paddingX = canvasPadding / Math.abs(mesh.worldTransform.a);
            var paddingY = canvasPadding / Math.abs(mesh.worldTransform.d);
            var centerX = (x0 + x1 + x2) / 3;
            var centerY = (y0 + y1 + y2) / 3;
            var normX = x0 - centerX;
            var normY = y0 - centerY;
            var dist = Math.sqrt(normX * normX + normY * normY);
            x0 = centerX + normX / dist * (dist + paddingX);
            y0 = centerY + normY / dist * (dist + paddingY);
            normX = x1 - centerX;
            normY = y1 - centerY;
            dist = Math.sqrt(normX * normX + normY * normY);
            x1 = centerX + normX / dist * (dist + paddingX);
            y1 = centerY + normY / dist * (dist + paddingY);
            normX = x2 - centerX;
            normY = y2 - centerY;
            dist = Math.sqrt(normX * normX + normY * normY);
            x2 = centerX + normX / dist * (dist + paddingX);
            y2 = centerY + normY / dist * (dist + paddingY);
          }
          context.save();
          context.beginPath();
          context.moveTo(x0, y0);
          context.lineTo(x1, y1);
          context.lineTo(x2, y2);
          context.closePath();
          context.clip();
          var delta = u0 * v1 + v0 * u2 + u1 * v2 - v1 * u2 - v0 * u1 - u0 * v2;
          var deltaA = x0 * v1 + v0 * x2 + x1 * v2 - v1 * x2 - v0 * x1 - x0 * v2;
          var deltaB = u0 * x1 + x0 * u2 + u1 * x2 - x1 * u2 - x0 * u1 - u0 * x2;
          var deltaC = u0 * v1 * x2 + v0 * x1 * u2 + x0 * u1 * v2 - x0 * v1 * u2 - v0 * u1 * x2 - u0 * x1 * v2;
          var deltaD = y0 * v1 + v0 * y2 + y1 * v2 - v1 * y2 - v0 * y1 - y0 * v2;
          var deltaE = u0 * y1 + y0 * u2 + u1 * y2 - y1 * u2 - y0 * u1 - u0 * y2;
          var deltaF = u0 * v1 * y2 + v0 * y1 * u2 + y0 * u1 * v2 - y0 * v1 * u2 - v0 * u1 * y2 - u0 * y1 * v2;
          context.transform(deltaA / delta, deltaD / delta, deltaB / delta, deltaE / delta, deltaC / delta, deltaF / delta);
          if (window.navigator.isAppXCanvasPlus) {
            if (textureSource.tagName === 'IMAGE') {
              textureSource = window.navigator.canUseBinding ? textureSource.$realImage : textureSource.src;
            }
          }
          for (var i = mesh.canvasDrawTimes; i > 0; i--) {
            context.drawImage(textureSource, 0, 0, textureWidth * base.resolution, textureHeight * base.resolution, 0, 0, textureWidth, textureHeight);
          }
          context.restore();
          this.renderer.invalidateBlendMode();
        }
      }, {
        key: 'renderMeshFlat',
        value: function renderMeshFlat(mesh) {
          var context = this.renderer.context;
          var vertices = mesh.vertices;
          var length = vertices.length / 2;
          context.beginPath();
          for (var i = 1; i < length - 2; ++i) {
            var index = i * 2;
            var x0 = vertices[index];
            var y0 = vertices[index + 1];
            var x1 = vertices[index + 2];
            var y1 = vertices[index + 3];
            var x2 = vertices[index + 4];
            var y2 = vertices[index + 5];
            context.moveTo(x0, y0);
            context.lineTo(x1, y1);
            context.lineTo(x2, y2);
          }
          context.fillStyle = '#FF0000';
          context.fill();
          context.closePath();
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.renderer = null;
        }
      }]);
      return MeshSpriteRenderer;
    }();
    Tiny.CanvasRenderer.registerPlugin('mesh', MeshSpriteRenderer);
    var Plane = function (_Mesh) {
      inherits(Plane, _Mesh);
      function Plane(texture, verticesX, verticesY) {
        classCallCheck(this, Plane);
        var _this = possibleConstructorReturn(this, (Plane.__proto__ || Object.getPrototypeOf(Plane)).call(this, texture));
        _this._ready = true;
        _this.verticesX = verticesX || 10;
        _this.verticesY = verticesY || 10;
        _this.drawMode = Mesh.DRAW_MODES.TRIANGLES;
        _this.refresh();
        return _this;
      }
      createClass(Plane, [{
        key: '_refresh',
        value: function _refresh() {
          var texture = this._texture;
          var total = this.verticesX * this.verticesY;
          var verts = [];
          var colors = [];
          var uvs = [];
          var indices = [];
          var segmentsX = this.verticesX - 1;
          var segmentsY = this.verticesY - 1;
          var sizeX = texture.width / segmentsX;
          var sizeY = texture.height / segmentsY;
          for (var i = 0; i < total; i++) {
            var x = i % this.verticesX;
            var y = i / this.verticesX | 0;
            verts.push(x * sizeX, y * sizeY);
            uvs.push(x / segmentsX, y / segmentsY);
          }
          var totalSub = segmentsX * segmentsY;
          for (var _i = 0; _i < totalSub; _i++) {
            var xpos = _i % segmentsX;
            var ypos = _i / segmentsX | 0;
            var value = ypos * this.verticesX + xpos;
            var value2 = ypos * this.verticesX + xpos + 1;
            var value3 = (ypos + 1) * this.verticesX + xpos;
            var value4 = (ypos + 1) * this.verticesX + xpos + 1;
            indices.push(value, value2, value3);
            indices.push(value2, value4, value3);
          }
          this.vertices = new Float32Array(verts);
          this.uvs = new Float32Array(uvs);
          this.colors = new Float32Array(colors);
          this.indices = new Uint16Array(indices);
          this.dirty++;
          this.indexDirty++;
          this.multiplyUvs();
        }
      }, {
        key: '_onTextureUpdate',
        value: function _onTextureUpdate() {
          Mesh.prototype._onTextureUpdate.call(this);
          if (this._ready) {
            this.refresh();
          }
        }
      }]);
      return Plane;
    }(Mesh);
    var DEFAULT_BORDER_SIZE = 10;
    var NineSlicePlane = function (_Plane) {
      inherits(NineSlicePlane, _Plane);
      function NineSlicePlane(texture, leftWidth, topHeight, rightWidth, bottomHeight) {
        classCallCheck(this, NineSlicePlane);
        var _this = possibleConstructorReturn(this, (NineSlicePlane.__proto__ || Object.getPrototypeOf(NineSlicePlane)).call(this, texture, 4, 4));
        _this._origWidth = texture.orig.width;
        _this._origHeight = texture.orig.height;
        _this._width = _this._origWidth;
        _this._height = _this._origHeight;
        _this._leftWidth = typeof leftWidth !== 'undefined' ? leftWidth : DEFAULT_BORDER_SIZE;
        _this._rightWidth = typeof rightWidth !== 'undefined' ? rightWidth : DEFAULT_BORDER_SIZE;
        _this._topHeight = typeof topHeight !== 'undefined' ? topHeight : DEFAULT_BORDER_SIZE;
        _this._bottomHeight = typeof bottomHeight !== 'undefined' ? bottomHeight : DEFAULT_BORDER_SIZE;
        _this._cachedTint = 0xFFFFFF;
        _this._tintedTexture = null;
        _this._canvasUvs = null;
        _this.refresh(true);
        return _this;
      }
      createClass(NineSlicePlane, [{
        key: 'updateHorizontalVertices',
        value: function updateHorizontalVertices() {
          var vertices = this.vertices;
          var h = this._topHeight + this._bottomHeight;
          var scale = this._height > h ? 1.0 : this._height / h;
          vertices[9] = vertices[11] = vertices[13] = vertices[15] = this._topHeight * scale;
          vertices[17] = vertices[19] = vertices[21] = vertices[23] = this._height - this._bottomHeight * scale;
          vertices[25] = vertices[27] = vertices[29] = vertices[31] = this._height;
        }
      }, {
        key: 'updateVerticalVertices',
        value: function updateVerticalVertices() {
          var vertices = this.vertices;
          var w = this._leftWidth + this._rightWidth;
          var scale = this._width > w ? 1.0 : this._width / w;
          vertices[2] = vertices[10] = vertices[18] = vertices[26] = this._leftWidth * scale;
          vertices[4] = vertices[12] = vertices[20] = vertices[28] = this._width - this._rightWidth * scale;
          vertices[6] = vertices[14] = vertices[22] = vertices[30] = this._width;
        }
      }, {
        key: '_renderCanvas',
        value: function _renderCanvas(renderer) {
          var context = renderer.context;
          var transform = this.worldTransform;
          var res = renderer.resolution;
          var isTinted = this.tint !== 0xFFFFFF;
          var texture = this._texture;
          if (isTinted) {
            if (this._cachedTint !== this.tint) {
              this._cachedTint = this.tint;
              this._tintedTexture = Tiny.CanvasTinter.getTintedTexture(this, this.tint);
            }
          }
          var textureSource = !isTinted ? texture.baseTexture.source : this._tintedTexture;
          if (window.navigator.isAppXCanvasPlus) {
            if (textureSource.tagName === 'IMAGE') {
              textureSource = window.navigator.canUseBinding ? textureSource.$realImage : textureSource.src;
            }
          }
          if (!this._canvasUvs) {
            this._canvasUvs = [0, 0, 0, 0, 0, 0, 0, 0];
          }
          var vertices = this.vertices;
          var uvs = this._canvasUvs;
          var u0 = isTinted ? 0 : texture.frame.x;
          var v0 = isTinted ? 0 : texture.frame.y;
          var u1 = u0 + texture.frame.width;
          var v1 = v0 + texture.frame.height;
          uvs[0] = u0;
          uvs[1] = u0 + this._leftWidth;
          uvs[2] = u1 - this._rightWidth;
          uvs[3] = u1;
          uvs[4] = v0;
          uvs[5] = v0 + this._topHeight;
          uvs[6] = v1 - this._bottomHeight;
          uvs[7] = v1;
          for (var i = 0; i < 8; i++) {
            uvs[i] *= texture.baseTexture.resolution;
          }
          context.globalAlpha = this.worldAlpha;
          renderer.setBlendMode(this.blendMode);
          if (renderer.roundPixels) {
            context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res | 0, transform.ty * res | 0);
          } else {
            context.setTransform(transform.a * res, transform.b * res, transform.c * res, transform.d * res, transform.tx * res, transform.ty * res);
          }
          for (var row = 0; row < 3; row++) {
            for (var col = 0; col < 3; col++) {
              var ind = col * 2 + row * 8;
              var sw = Math.max(1, uvs[col + 1] - uvs[col]);
              var sh = Math.max(1, uvs[row + 5] - uvs[row + 4]);
              var dw = Math.max(1, vertices[ind + 10] - vertices[ind]);
              var dh = Math.max(1, vertices[ind + 11] - vertices[ind + 1]);
              context.drawImage(textureSource, uvs[col], uvs[row + 4], sw, sh, vertices[ind], vertices[ind + 1], dw, dh);
            }
          }
        }
      }, {
        key: '_refresh',
        value: function _refresh() {
          get(NineSlicePlane.prototype.__proto__ || Object.getPrototypeOf(NineSlicePlane.prototype), '_refresh', this).call(this);
          var uvs = this.uvs;
          var texture = this._texture;
          this._origWidth = texture.orig.width;
          this._origHeight = texture.orig.height;
          var _uvw = 1.0 / this._origWidth;
          var _uvh = 1.0 / this._origHeight;
          uvs[0] = uvs[8] = uvs[16] = uvs[24] = 0;
          uvs[1] = uvs[3] = uvs[5] = uvs[7] = 0;
          uvs[6] = uvs[14] = uvs[22] = uvs[30] = 1;
          uvs[25] = uvs[27] = uvs[29] = uvs[31] = 1;
          uvs[2] = uvs[10] = uvs[18] = uvs[26] = _uvw * this._leftWidth;
          uvs[4] = uvs[12] = uvs[20] = uvs[28] = 1 - _uvw * this._rightWidth;
          uvs[9] = uvs[11] = uvs[13] = uvs[15] = _uvh * this._topHeight;
          uvs[17] = uvs[19] = uvs[21] = uvs[23] = 1 - _uvh * this._bottomHeight;
          this.updateHorizontalVertices();
          this.updateVerticalVertices();
          this.dirty++;
          this.multiplyUvs();
        }
      }, {
        key: 'width',
        get: function get$$1() {
          return this._width;
        },
        set: function set$$1(value) {
          this._width = value;
          this._refresh();
        }
      }, {
        key: 'height',
        get: function get$$1() {
          return this._height;
        },
        set: function set$$1(value) {
          this._height = value;
          this._refresh();
        }
      }, {
        key: 'leftWidth',
        get: function get$$1() {
          return this._leftWidth;
        },
        set: function set$$1(value) {
          this._leftWidth = value;
          this._refresh();
        }
      }, {
        key: 'rightWidth',
        get: function get$$1() {
          return this._rightWidth;
        },
        set: function set$$1(value) {
          this._rightWidth = value;
          this._refresh();
        }
      }, {
        key: 'topHeight',
        get: function get$$1() {
          return this._topHeight;
        },
        set: function set$$1(value) {
          this._topHeight = value;
          this._refresh();
        }
      }, {
        key: 'bottomHeight',
        get: function get$$1() {
          return this._bottomHeight;
        },
        set: function set$$1(value) {
          this._bottomHeight = value;
          this._refresh();
        }
      }]);
      return NineSlicePlane;
    }(Plane);
    var Rope = function (_Mesh) {
      inherits(Rope, _Mesh);
      function Rope(texture, points) {
        classCallCheck(this, Rope);
        var _this = possibleConstructorReturn(this, (Rope.__proto__ || Object.getPrototypeOf(Rope)).call(this, texture));
        _this.points = points;
        _this.vertices = new Float32Array(points.length * 4);
        _this.uvs = new Float32Array(points.length * 4);
        _this.colors = new Float32Array(points.length * 2);
        _this.indices = new Uint16Array(points.length * 2);
        _this.autoUpdate = true;
        _this.refresh();
        return _this;
      }
      createClass(Rope, [{
        key: '_refresh',
        value: function _refresh() {
          var points = this.points;
          if (points.length < 1 || !this._texture._uvs) {
            return;
          }
          if (this.vertices.length / 4 !== points.length) {
            this.vertices = new Float32Array(points.length * 4);
            this.uvs = new Float32Array(points.length * 4);
            this.colors = new Float32Array(points.length * 2);
            this.indices = new Uint16Array(points.length * 2);
          }
          var uvs = this.uvs;
          var indices = this.indices;
          var colors = this.colors;
          uvs[0] = 0;
          uvs[1] = 0;
          uvs[2] = 0;
          uvs[3] = 1;
          colors[0] = 1;
          colors[1] = 1;
          indices[0] = 0;
          indices[1] = 1;
          var total = points.length;
          for (var i = 1; i < total; i++) {
            var index = i * 4;
            var amount = i / (total - 1);
            uvs[index] = amount;
            uvs[index + 1] = 0;
            uvs[index + 2] = amount;
            uvs[index + 3] = 1;
            index = i * 2;
            colors[index] = 1;
            colors[index + 1] = 1;
            index = i * 2;
            indices[index] = index;
            indices[index + 1] = index + 1;
          }
          this.dirty++;
          this.indexDirty++;
          this.multiplyUvs();
          this.refreshVertices();
        }
      }, {
        key: 'refreshVertices',
        value: function refreshVertices() {
          var points = this.points;
          if (points.length < 1) {
            return;
          }
          var lastPoint = points[0];
          var nextPoint = void 0;
          var perpX = 0;
          var perpY = 0;
          var vertices = this.vertices;
          var total = points.length;
          for (var i = 0; i < total; i++) {
            var point = points[i];
            var index = i * 4;
            if (i < points.length - 1) {
              nextPoint = points[i + 1];
            } else {
              nextPoint = point;
            }
            perpY = -(nextPoint.x - lastPoint.x);
            perpX = nextPoint.y - lastPoint.y;
            var perpLength = Math.sqrt(perpX * perpX + perpY * perpY);
            var num = this._texture.height / 2;
            perpX /= perpLength;
            perpY /= perpLength;
            perpX *= num;
            perpY *= num;
            vertices[index] = point.x + perpX;
            vertices[index + 1] = point.y + perpY;
            vertices[index + 2] = point.x - perpX;
            vertices[index + 3] = point.y - perpY;
            lastPoint = point;
          }
        }
      }, {
        key: 'updateTransform',
        value: function updateTransform() {
          if (this.autoUpdate) {
            this.refreshVertices();
          }
          this.containerUpdateTransform();
        }
      }]);
      return Rope;
    }(Mesh);
    /**
     * Mesh - The TinyJS plugin
     *
     * Copy to https://github.com/pixijs/pixi.js/tree/v4.8.9/src/mesh
     * Some code (c) 2013-2017 Mathew Groves, Chad Engler and other contributors.
     * See https://github.com/pixijs/pixi.js/graphs/contributors for the full list of contributors.
     *
     * @name        tinyjs-plugin-mesh
     * @overview    The Tiny.js plugin of mesh
     * @author      yiiqii
     * @license     MIT
     */
    exports.Mesh = Mesh;
    exports.MeshRenderer = MeshRenderer;
    exports.CanvasMeshRenderer = MeshSpriteRenderer;
    exports.Plane = Plane;
    exports.NineSlicePlane = NineSlicePlane;
    exports.Rope = Rope;
    Object.defineProperty(exports, '__esModule', { value: true });
  })));
  });
  var mesh = unwrapExports(index_debug);

  var CreatureHaxeBaseRenderer = function () {
    function CreatureHaxeBaseRenderer(dataIn) {
      classCallCheck(this, CreatureHaxeBaseRenderer);
      this.data = dataIn;
      this.createRuntimeMap();
      this.isPlaying = true;
      this.isLooping = true;
      this.animBlendFactor = 0;
      this.animBlendDelta = 0;
      this.renderPoints = new Array(this.data.points.length);
      this.renderUvs = new Array(this.data.uvs.length);
      this.renderColors = new Array(this.data.points.length / 2 * 4);
      for (var i = 0; i < this.renderColors.length; i++) {
        this.renderColors[i] = 1.0;
      }
      for (var j = 0; j < this.renderUvs.length; j++) {
        this.renderUvs[j] = this.data.uvs[j];
      }
    }
    createClass(CreatureHaxeBaseRenderer, [{
      key: "createRuntimeMap",
      value: function createRuntimeMap() {
        this.runTimeMap = {};
        var firstSet = false;
        for (var animName in this.data.animClipMap) {
          if (firstSet === false) {
            firstSet = true;
            this.activeAnimationName = animName;
            this.prevAnimationName = animName;
          }
          var animClip = this.data.animClipMap[animName];
          this.runTimeMap[animName] = animClip.startTime;
        }
      }
    }, {
      key: "setActiveAnimation",
      value: function setActiveAnimation(nameIn) {
        if (this.runTimeMap.hasOwnProperty(nameIn)) {
          this.activeAnimationName = nameIn;
          this.prevAnimationName = nameIn;
          this.runTimeMap[this.activeAnimationName] = this.data.animClipMap[this.activeAnimationName].startTime;
        }
      }
    }, {
      key: "blendToAnimation",
      value: function blendToAnimation(nameIn, blendDelta) {
        this.prevAnimationName = this.activeAnimationName;
        this.activeAnimationName = nameIn;
        this.animBlendFactor = 0;
        this.animBlendDelta = blendDelta;
      }
    }, {
      key: "setRunTime",
      value: function setRunTime(timeIn) {
        this.runTimeMap[this.activeAnimationName] = this.data.animClipMap[this.activeAnimationName].correctTime(timeIn, this.isLooping);
      }
    }, {
      key: "getRunTime",
      value: function getRunTime() {
        return this.runTimeMap[this.activeAnimationName];
      }
    }, {
      key: "stepTime",
      value: function stepTime(deltaTime) {
        this.setRunTime(this.getRunTime() + deltaTime);
        this.animBlendFactor += this.animBlendDelta;
        if (this.animBlendFactor > 1) {
          this.animBlendFactor = 1;
        }
      }
    }, {
      key: "interpScalar",
      value: function interpScalar(val1, val2, fraction) {
        return (1.0 - fraction) * val1 + fraction * val2;
      }
    }, {
      key: "syncRenderData",
      value: function syncRenderData() {
        var firstSampleIdx = 0;
        var secondSampleIdx = 1;
        var sampleFraction = 2;
        {
          if (this.activeAnimationName === this.prevAnimationName) {
            var curClip = this.data.animClipMap[this.activeAnimationName];
            var curClipInfo = curClip.sampleTime(this.getRunTime());
            var lowData = curClip.timeSamplesMap[curClipInfo[firstSampleIdx]];
            var highData = curClip.timeSamplesMap[curClipInfo[secondSampleIdx]];
            var animLowPoints = this.data.fileData[lowData.getAnimPointsOffset()];
            var animHighPoints = this.data.fileData[highData.getAnimPointsOffset()];
            for (var i = 0; i < this.renderPoints.length; i++) {
              var lowVal = animLowPoints[i];
              var highVal = animHighPoints[i];
              this.renderPoints[i] = this.interpScalar(lowVal, highVal, curClipInfo[sampleFraction]);
            }
          } else {
            var activeClip = this.data.animClipMap[this.activeAnimationName];
            var activeClipInfo = activeClip.sampleTime(this.getRunTime());
            var activeLowData = activeClip.timeSamplesMap[activeClipInfo[firstSampleIdx]];
            var activeHighData = activeClip.timeSamplesMap[activeClipInfo[secondSampleIdx]];
            var activeAnimLowPoints = this.data.fileData[activeLowData.getAnimPointsOffset()];
            var activeAnimHighPoints = this.data.fileData[activeHighData.getAnimPointsOffset()];
            var prevClip = this.data.animClipMap[this.prevAnimationName];
            var prevClipInfo = prevClip.sampleTime(this.getRunTime());
            var prevLowData = prevClip.timeSamplesMap[prevClipInfo[firstSampleIdx]];
            var prevHighData = prevClip.timeSamplesMap[prevClipInfo[secondSampleIdx]];
            var prevAnimLowPoints = this.data.fileData[prevLowData.getAnimPointsOffset()];
            var prevAnimHighPoints = this.data.fileData[prevHighData.getAnimPointsOffset()];
            for (var j = 0; j < this.renderPoints.length; j++) {
              var activeLowVal = activeAnimLowPoints[j];
              var activeHighVal = activeAnimHighPoints[j];
              var activeVal = this.interpScalar(activeLowVal, activeHighVal, activeClipInfo[sampleFraction]);
              var prevLowVal = prevAnimLowPoints[j];
              var prevHighVal = prevAnimHighPoints[j];
              var prevVal = this.interpScalar(prevLowVal, prevHighVal, prevClipInfo[sampleFraction]);
              this.renderPoints[j] = this.interpScalar(prevVal, activeVal, this.animBlendFactor);
            }
          }
          {
            var _curClip = this.data.animClipMap[this.activeAnimationName];
            var _curClipInfo = _curClip.sampleTime(this.getRunTime());
            var _lowData = _curClip.timeSamplesMap[_curClipInfo[firstSampleIdx]];
            var _highData = _curClip.timeSamplesMap[_curClipInfo[secondSampleIdx]];
            var animLowColors = this.data.fileData[_lowData.getAnimColorsOffset()];
            var animHighColors = this.data.fileData[_highData.getAnimColorsOffset()];
            if (animLowColors.length === this.renderColors.length && animHighColors.length === this.renderColors.length) {
              for (var k = 0; k < this.renderColors.length; k++) {
                var _lowVal = animLowColors[k];
                var _highVal = animHighColors[k];
                this.renderColors[k] = this.interpScalar(_lowVal, _highVal, _curClipInfo[sampleFraction]) / 255.0;
              }
            }
          }
          {
            var _curClip2 = this.data.animClipMap[this.activeAnimationName];
            var _curClipInfo2 = _curClip2.sampleTime(this.getRunTime());
            var _lowData2 = _curClip2.timeSamplesMap[_curClipInfo2[firstSampleIdx]];
            var animUvs = this.data.fileData[_lowData2.getAnimUvsOffset()];
            if (animUvs.length === this.renderUvs.length) {
              for (var l = 0; l < this.renderUvs.length; l++) {
                this.renderUvs[l] = animUvs[l];
              }
            }
          }
        }
      }
    }]);
    return CreatureHaxeBaseRenderer;
  }();

  var Mesh = mesh.Mesh;
  var CreaturePackRenderer = function (_Mesh) {
    inherits(CreaturePackRenderer, _Mesh);
    function CreaturePackRenderer(packData, texture) {
      classCallCheck(this, CreaturePackRenderer);
      var _this = possibleConstructorReturn(this, (CreaturePackRenderer.__proto__ || Object.getPrototypeOf(CreaturePackRenderer)).call(this, texture));
      _this.packData = packData;
      _this.packRenderer = new CreatureHaxeBaseRenderer(_this.packData);
      _this.texture = texture;
      _this.blendMode = Tiny.BLEND_MODES.NORMAL;
      _this.creatureBoundsMin = new Tiny.Point(0, 0);
      _this.creatureBoundsMax = new Tiny.Point(0, 0);
      _this.vertices = new Float32Array(_this.packRenderer.renderPoints.length);
      _this.uvs = new Float32Array(_this.packRenderer.renderUvs.length);
      _this.indices = new Uint16Array(_this.packData.indices.length);
      for (var i = 0; i < _this.indices.length; i++) {
        _this.indices[i] = _this.packData.indices[i];
      }
      _this.colors = new Float32Array([1, 1, 1, 1]);
      _this.updateRenderData(_this.packData.points, _this.packData.uvs);
      _this.drawMode = Mesh.DRAW_MODES.TRIANGLES;
      return _this;
    }
    createClass(CreaturePackRenderer, [{
      key: '_refresh',
      value: function _refresh() {
        this.packRenderer.syncRenderData();
        var _packRenderer = this.packRenderer,
            points = _packRenderer.renderPoints,
            uvs = _packRenderer.renderUvs;
        this.updateRenderData(points, uvs);
        this.dirty++;
      }
    }, {
      key: 'updateRenderData',
      value: function updateRenderData(points, uvs) {
        var _packRenderer2 = this.packRenderer,
            renderPoints = _packRenderer2.renderPoints,
            renderUvs = _packRenderer2.renderUvs;
        for (var i = 0; i < renderPoints.length; i += 2) {
          this.vertices[i] = renderPoints[i];
          this.vertices[i + 1] = -renderPoints[i + 1];
          this.uvs[i] = renderUvs[i];
          this.uvs[i + 1] = renderUvs[i + 1];
        }
      }
    }]);
    return CreaturePackRenderer;
  }(Mesh);

  /**
   * @name        tinyjs-plugin-creature
   * @overview    Runtime plugin for CreaturePack Web Format
   * @author      yiiqii
   * @license     MIT
   */

  exports.CreaturePackLoader = CreaturePackLoader;
  exports.CreaturePackRenderer = CreaturePackRenderer;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
