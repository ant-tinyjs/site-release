/*!
 * Name: tinyjs-plugin-audio
 * Description: Tiny.js 音效插件
 * Author: yiiqii
 * Version: v1.2.0
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.Tiny = global.Tiny || {}, global.Tiny.audio = {})));
}(this, (function (exports) { 'use strict';

  var Resource = Tiny.loaders.Resource;
  var isHTMLAudioSupported = !!window.Audio;
  var webAudioContext = window.AudioContext || window.webkitAudioContext;
  var isWebAudioSupported = window.disableWebAudio === true ? false : !!webAudioContext;
  var isAudioSupported = isWebAudioSupported || isHTMLAudioSupported;
  var isMp3Supported = false;
  var isOggSupported = false;
  var isWavSupported = false;
  var isM4aSupported = false;
  var createGainNode = null;
  var globalWebAudioContext = isWebAudioSupported ? new webAudioContext() : null;
  if (isAudioSupported) {
    var audio = document.createElement('audio');
    isMp3Supported = audio.canPlayType('audio/mpeg;') !== '';
    isOggSupported = audio.canPlayType('audio/ogg; codecs="vorbis"') !== '';
    isWavSupported = audio.canPlayType('audio/wav') !== '';
    isM4aSupported = audio.canPlayType('audio/mp4; codecs="mp4a.40.5"') !== '';
    if (isMp3Supported) _setAudioExt('mp3');
    if (isOggSupported) _setAudioExt('ogg');
    if (isWavSupported) _setAudioExt('wav');
    if (isM4aSupported) _setAudioExt('m4a');
    if (isWebAudioSupported) {
      createGainNode = function createGainNode() {
        return globalWebAudioContext.createGain ? globalWebAudioContext.createGain() : globalWebAudioContext.createGainNode();
      };
    }
  }
  function _setAudioExt(ext) {
    if (isWebAudioSupported) {
      delete Resource._loadTypeMap['mp3'];
      delete Resource._loadTypeMap['ogg'];
      delete Resource._loadTypeMap['wav'];
      Resource._xhrTypeMap['mp3'] = Resource.XHR_RESPONSE_TYPE.BUFFER;
      Resource._xhrTypeMap['ogg'] = Resource.XHR_RESPONSE_TYPE.BUFFER;
      Resource._xhrTypeMap['wav'] = Resource.XHR_RESPONSE_TYPE.BUFFER;
      Resource.setExtensionXhrType(ext, Resource.XHR_RESPONSE_TYPE.BUFFER);
    } else {
      Resource.setExtensionLoadType(ext, Resource.LOAD_TYPE.AUDIO);
    }
  }
  var utils = {
    isHTMLAudioSupported: isHTMLAudioSupported,
    webAudioContext: webAudioContext,
    isWebAudioSupported: isWebAudioSupported,
    isAudioSupported: isAudioSupported,
    isMp3Supported: isMp3Supported,
    isOggSupported: isOggSupported,
    isWavSupported: isWavSupported,
    isM4aSupported: isM4aSupported,
    globalWebAudioContext: globalWebAudioContext,
    createGainNode: createGainNode
  };

  var _allowedExt = ['ogg', 'mp3'];
  var _mimeTypes = {
    mp3: 'audio/mpeg',
    mp4: 'audio/mp4',
    ogg: 'audio/ogg; codecs="vorbis"',
    m4a: 'audio/x-m4a',
    wav: 'audio/wav; codecs="1"'
  };
  function audioParser() {
    return function (resource, next) {
      if (!utils.isAudioSupported || !resource.data) return next();
      var ext = _getExt(resource.url);
      if (_allowedExt.indexOf(ext) === -1 || !_canPlay(ext)) return next();
      var name = resource.name || resource.url;
      if (utils.isWebAudioSupported) {
        utils.globalWebAudioContext.decodeAudioData(resource.data, function (buffer) {
          AudioManager.audios[name] = buffer;
          next();
        });
      } else {
        AudioManager.audios[name] = resource.data;
        return next();
      }
    };
  }
  function audioUrlParser(resourceUrl) {
    var url = void 0;
    if (!Tiny.isArray(resourceUrl)) {
      var arr = [];
      arr.push(resourceUrl);
      resourceUrl = arr;
    }
    for (var i = 0; i < resourceUrl.length; i++) {
      var ext = _getExt(resourceUrl[i]);
      if (_allowedExt.indexOf(ext) !== -1) {
        if (_canPlay(ext)) {
          url = resourceUrl[i];
        } else {
          url = resourceUrl[i].replace(/\.[^\.\/\?\\]*(\?.*)?$/, '.' + _getCanPlayExtension());
        }
      }
    }
    return url;
  }
  function _getExt(url) {
    return url.split('?').shift().split('.').pop().toLowerCase();
  }
  function _canPlay(ext) {
    var canPlay = false;
    switch (ext) {
      case 'm4a':
        canPlay = utils.isM4aSupported;
        break;
      case 'mp3':
        canPlay = utils.isMp3Supported;
        break;
      case 'ogg':
        canPlay = utils.isOggSupported;
        break;
      case 'wav':
        canPlay = utils.isWavSupported;
        break;
    }
    return canPlay;
  }
  function _getCanPlayExtension() {
    var audio = new Audio();
    return Tiny.detect(_allowedExt, function (extension) {
      return audio.canPlayType(_mimeTypes[extension]) ? extension : null;
    });
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var Audio$1 = function (_Tiny$EventEmitter) {
    inherits(Audio, _Tiny$EventEmitter);
    function Audio(data, manager) {
      classCallCheck(this, Audio);
      var _this = possibleConstructorReturn(this, (Audio.__proto__ || Object.getPrototypeOf(Audio)).call(this));
      _this.manager = manager;
      _this.data = data;
      if (!utils.isWebAudioSupported) {
        _this.audio = new window.Audio();
        _this.audio.addEventListener('ended', _this._onEnd.bind(_this));
        _this.audio.src = _this.data.children[0].src;
        _this.audio.preload = 'auto';
        _this.audio.load();
      } else {
        _this.context = utils.globalWebAudioContext;
        _this.gainNode = utils.createGainNode();
      }
      _this.reset();
      return _this;
    }
    createClass(Audio, [{
      key: 'play',
      value: function play() {
        if (this.playing) return this;
        this.emit('play');
        if (utils.isWebAudioSupported) {
          this.source = this.context.createBufferSource();
          this.source.start = this.source.start || this.source.noteOn;
          this.source.stop = this.source.stop || this.source.noteOff;
          this.source.loop = this.loop;
          this.source.onended = this._onEnd.bind(this);
          this._startTime = this.context.currentTime;
          this.source.connect(this.gainNode);
          this.gainNode.connect(this.context.destination);
          this.source.buffer = this.data;
          this.source.start(0, this._paused ? this._lastPauseTime : 0);
        } else {
          this.audio.play();
        }
        this.playing = true;
        return this;
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.emit('stop');
        if (utils.isWebAudioSupported) {
          this.source && this.source.stop(0);
          this._paused = false;
          this._startTime = this.context.currentTime;
        } else {
          this.audio.pause();
          this.audio.currentTime = 0;
        }
        this.playing = false;
        this._paused = false;
        this.reset();
        return this;
      }
    }, {
      key: 'pause',
      value: function pause() {
        if (!this.playing) return this;
        this.emit('pause');
        if (utils.isWebAudioSupported) {
          this._offsetTime += this.context.currentTime - this._startTime;
          this._lastPauseTime = this._offsetTime % this.data.duration;
          this.source.stop(0);
        } else {
          this.audio.pause();
        }
        this.playing = false;
        this._paused = true;
        return this;
      }
    }, {
      key: 'reset',
      value: function reset() {
        this._startTime = 0;
        this._lastPauseTime = 0;
        this._offsetTime = 0;
        this.playing = false;
        this._paused = false;
        if (utils.isWebAudioSupported) {
          this.audio = null;
        }
      }
    }, {
      key: 'remove',
      value: function remove() {
        this.manager.removeAudio(this);
      }
    }, {
      key: '_onEnd',
      value: function _onEnd() {
        if (!utils.isWebAudioSupported) {
          if (this.loop) {
            this.audio.currentTime = 0;
            this.audio.play();
          } else {
            this.reset();
            this.emit('end');
          }
        } else {
          if (!this._paused) {
            this.reset();
            this.emit('end');
          }
        }
      }
    }, {
      key: 'loop',
      get: function get$$1() {
        return this._loop;
      },
      set: function set$$1(value) {
        if (value === this._loop) return;
        this._loop = value;
        if (utils.isWebAudioSupported && this.audio) {
          this.audio.loop = value;
        }
      }
    }, {
      key: 'volume',
      get: function get$$1() {
        return utils.isWebAudioSupported ? this.gainNode.gain.value : this.audio.volume;
      },
      set: function set$$1(value) {
        this.previousVolume = value;
        if (utils.isWebAudioSupported) {
          this.gainNode.gain.value = value;
        } else {
          this.audio.volume = value;
        }
      }
    }, {
      key: 'muted',
      get: function get$$1() {
        return utils.isWebAudioSupported ? this.mute : this.audio.muted;
      },
      set: function set$$1(value) {
        if (utils.isWebAudioSupported) {
          this.mute = value;
          if (!value) {
            this.gainNode.gain.value = this.previousVolume;
            return;
          }
          this.gainNode.gain.value = 0;
        } else {
          this.audio.muted = value;
        }
      }
    }]);
    return Audio;
  }(Tiny.EventEmitter);
  Audio$1.prototype._loop = false;
  Audio$1.prototype._paused = false;
  Audio$1.prototype._startTime = 0;
  Audio$1.prototype._lastPauseTime = 0;
  Audio$1.prototype._offsetTime = 0;
  Audio$1.prototype.previousVolume = 1;
  Audio$1.prototype.mute = false;
  Audio$1.prototype.playing = false;

  var AudioManager = function () {
    function AudioManager() {
      classCallCheck(this, AudioManager);
      this.sounds = [];
    }
    createClass(AudioManager, [{
      key: 'getAudio',
      value: function getAudio(name) {
        var audio = new Audio$1(AudioManager.audios[audioUrlParser(name) || name], this);
        this.sounds.push(audio);
        return audio;
      }
    }, {
      key: 'removeAudio',
      value: function removeAudio(audio) {
        var index = this.sounds.indexOf(audio);
        if (index !== -1) {
          this.sounds.splice(index, 1);
        }
      }
    }, {
      key: 'pause',
      value: function pause(value) {
        value = value !== false;
        this.sounds.forEach(function (item) {
          if (!value && item._paused) {
            item.play();
            return true;
          }
          item.playing && item.pause();
        });
      }
    }, {
      key: 'resume',
      value: function resume() {
        return this.pause(false);
      }
    }]);
    return AudioManager;
  }();
  AudioManager.audios = {};

  var AudioAnalyser = function () {
    function AudioAnalyser(audio, fftSize) {
      classCallCheck(this, AudioAnalyser);
      if (utils.isWebAudioSupported) {
        this.analyser = audio.context.createAnalyser();
        this.analyser.fftSize = fftSize || 2048;
        this.data = new Uint8Array(this.analyser.frequencyBinCount);
        audio.gainNode.connect(this.analyser);
      } else {
        console.warn('not support web audio api. the data will return empty array or zero.');
      }
    }
    createClass(AudioAnalyser, [{
      key: 'getFrequencyData',
      value: function getFrequencyData() {
        utils.isWebAudioSupported && this.analyser.getByteFrequencyData(this.data);
        return this.data || [];
      }
    }, {
      key: 'getAverageFrequency',
      value: function getAverageFrequency() {
        var value = 0;
        var data = this.getFrequencyData();
        if (utils.isWebAudioSupported) {
          for (var i = 0; i < data.length; i++) {
            value += data[i];
          }
        }
        return value / data.length || 0;
      }
    }]);
    return AudioAnalyser;
  }();

  var com = {
    utils: utils,
    AudioManager: AudioManager,
    AudioAnalyser: AudioAnalyser,
    Audio: Audio$1,
    audioParser: audioParser,
    audioUrlParser: audioUrlParser
  };
  var loader = Tiny.loaders.Loader;
  loader.addTinyMiddleware(com.audioParser);
  var baseAdd = loader.prototype.add;
  loader.prototype.add = function (name, url, options, cb) {
    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) === 'object') {
      if (Object.prototype.toString.call(name.url) === '[object Array]') {
        name.url = com.audioUrlParser(name.url);
      }
    }
    if (Object.prototype.toString.call(url) === '[object Array]') {
      url = com.audioUrlParser(url);
    }
    if (Tiny.isArray(name)) {
      name.forEach(function (item, i) {
        var s = void 0;
        if (item.url) {
          s = com.audioUrlParser(item.url);
          s && (name[i].url = s);
        } else {
          s = com.audioUrlParser(item);
          s && (name[i] = s);
        }
      });
    }
    return baseAdd.call(this, name, url, options, cb);
  };
  if (Tiny.Loader) {
    Tiny.Loader = loader ? new loader() : null;
  }
  var manager = new com.AudioManager();

  exports.com = com;
  exports.manager = manager;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
