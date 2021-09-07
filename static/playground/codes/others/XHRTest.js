var textField;

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  this.addChild(createTextButton('GET', function() {
    sendRequest('GET');
  }));
  this.addChild(createTextButton('POST', function() {
    sendRequest('POST', 'test=ok');
  }));
  this.addChild(createText());
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

function createText() {
  textField = new Tiny.Text('', {
    fontSize: 16,
    fill: 'white',
    wordWrap: true,
    wordWrapWidth: Tiny.WIN_SIZE.width - 40,
  });
  textField.setPosition(20, 80);

  return textField;
}

function createTextButton(str, callback) {
  var btn = new Tiny.Text(str, {
    fill: 'white',
  });
  btn.setPosition(Tiny.WIN_SIZE.width / 2 - (str === 'GET' ? 50 : -50), 60);
  btn.setAnchor(0.5, 1);
  btn.setEventEnabled(true);
  btn.on('pointerdown', callback);

  return btn;
}

function sendRequest(type, data) {
  var txt = 'Send ' + type + ' Request to httpbin.org\n';
  var xhr = new XMLHttpRequest();
  xhr.open(type, 'http://httpbin.org/' + type.toLowerCase());

  xhr.onreadystatechange = function() {
    if (+xhr.readyState === 4) {
      if ((+xhr.status >= 200 && +xhr.status < 300) || +xhr.status === 304) {
        var httpStatus = xhr.statusText;
        var response = xhr.responseText.substring(0, 500);
        txt += 'Status: ' + httpStatus;
        txt += '\n' + type + ' Response (500 chars): \n' + response + '...';
      } else {
        txt += 'error';
      }
      textField.text = txt;
    }
  };
  xhr.send(data && data);
  textField.text = txt;
}
