/**
 * 此示例需要安装插件：tinyjs-plugin-scroller
 */

var RESOURCES = {
  avatar_background: 'https://gw.alipayobjects.com/zos/rmsportal/JoNbwqCbuUInZFOTteLV.png',
  avatar_default: 'https://gw.alipayobjects.com/zos/rmsportal/SnDQlocsTluTywDsNFgo.png',
  star_white: 'https://gw.alipayobjects.com/zos/rmsportal/eDDKvLonDtVwjWwJSpVG.png',
  star: 'https://gw.alipayobjects.com/zos/rmsportal/hOFcUMfCyrCaZPrdaNKI.png',
  star_big: 'https://gw.alipayobjects.com/zos/rmsportal/mrPNnqpojbeqmDWaOYjw.png',
  meteor: 'https://gw.alipayobjects.com/zos/rmsportal/GZUGXNzssYvjAcWvhTPb.png',
};
var config = {
  screens: 6,
  count: 54,
  starCount: 100,
  screenPool: [],
  pond: [
    [0.3, 0.5],
    [0.35, 0.6],
    [0.4, 0.7],
    [0.45, 0.8],
    [0.5, 1],
  ],
};

// 初始化各屏及用户属性
for (var i = 0; i < config.screens; i++) {
  var arr = [];
  for (var j = 0; j < config.count / config.screens; j++) {
    var pond = Tiny.randomFromArray(config.pond);
    arr.push({
      x: Tiny.random(0, Tiny.WIN_SIZE.width),
      y: Tiny.random(20, Tiny.WIN_SIZE.height - 300),
      scale: pond[0],
      alpha: pond[1],
    });
  }
  config.screenPool.push(arr);
}

var pool = config.screenPool.concat(config.screenPool).concat(config.screenPool);

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();
  var starContainer = new Tiny.Container();
  var userContainer = new Tiny.Container();
  var scroller = new Tiny.Scroller(function(left, top, zoom) {
    // 滚动的状态同步给 container
    userContainer.position.x = -left;
    starContainer.position.x = -left * 4 / 5;
  }, {
    // 只设置 X 轴方向可滚动
    scrollingX: true,
    bouncing: false,
  });

  // 初始状态
  pool.forEach(function(item, i) {
    var uc = initUser(item);
    var s = initStar(i);
    uc.setPositionX(Tiny.WIN_SIZE.width * i);
    s.setPositionX(Tiny.WIN_SIZE.width * i);
    userContainer.addChild(uc);
    starContainer.addChild(s);
  });

  container.addChild(starContainer);
  container.addChild(userContainer);

  // 设置滚动的规模，参数依次是 clientWidth, clientHeight, contentWidth, contentHeight
  scroller.setDimensions(Tiny.WIN_SIZE.width, Tiny.WIN_SIZE.height, Tiny.WIN_SIZE.width * config.screens * 3, Tiny.WIN_SIZE.height);
  // 设置 container 可交互
  container.interactive = true;
  // 设置 container 的可触发区域
  container.hitArea = new Tiny.Rectangle(0, 0, Tiny.WIN_SIZE.width * config.screens * 3, Tiny.WIN_SIZE.height);

  // 按下时的事件监听
  container.on('pointerdown', function(data) {
    var e = data.data.originalEvent;
    // 同步给 scroller，如果是移动端则使用 e.changedTouches，如果是 PC 上则使用 [e]
    scroller.doTouchStart(e.changedTouches || [e], e.timeStamp);
  });
  // 移动时的事件监听
  container.on('pointermove', function(data) {
    var e = data.data.originalEvent;
    scroller.doTouchMove(e.changedTouches || [e], e.timeStamp, e.scale);
  });
  // 抬起时的事件监听
  container.on('pointerup', function(data) {
    const e = data.data.originalEvent;
    scroller.doTouchEnd(e.timeStamp);
    refreshScroller(scroller);
  });
  // 移出屏幕的事件监听
  container.on('pointerupoutside', function(data) {
    const e = data.data.originalEvent;
    scroller.doTouchEnd(e.timeStamp);
    refreshScroller(scroller);
  });

  this.addChild(container);

  // 可见区域设置为 container 的中间部分
  scroller.scrollTo(Tiny.WIN_SIZE.width * config.screens * 3 / 2);
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;

function initUser(item) {
  // 添加用户
  var users = [];
  var container = new Tiny.Container();
  for (var i = 0; i < config.count / config.screens; i++) {
    var sp = item[i];
    var user = generateUser();
    user.setScale(sp.scale);
    user.setPosition(sp.x, sp.y);
    user.setOpacity(sp.alpha);
    users.push(user);
  }
  // 重排，保证透视效果
  users.sort(function(a, b) {
    return a.scale.x - b.scale.x;
  });
  users.forEach(function(user) {
    container.addChild(user);
  });
  return container;
}

function initStar(offset) {
  // 添加星空
  var container = new Tiny.Container();
  for (var i = 0; i < config.starCount; i++) {
    var star = generateStar();
    star.setPosition(Tiny.random(0, Tiny.WIN_SIZE.width), Tiny.random(20, Tiny.WIN_SIZE.height - 50));
    container.addChild(star);
  }
  return container;
}

/**
 * 辅助函数
 * 生成用户对象并绑定点触事件
 *
 * @param {string} img
 */
function generateUser(img) {
  var container = new Tiny.Container();
  var avatarCell = new Tiny.Container();
  var avatarBackground = Tiny.Sprite.fromImage(RESOURCES.avatar_background);
  var avatarDefault = Tiny.Sprite.fromImage(RESOURCES.avatar_default);
  var avatar = Tiny.Sprite.fromImage(img || RESOURCES.avatar_default);
  var starGig = Tiny.Sprite.fromImage(RESOURCES.star_big);

  avatarBackground.setPosition(-4, -4);
  starGig.setPosition(-154, -30);
  avatarCell.addChild(avatarBackground);
  avatarCell.addChild(avatarDefault);
  avatarCell.addChild(avatar);
  container.addChild(starGig);
  container.addChild(avatarCell);
  // 设置可点击
  container.setEventEnabled(true);
  // 绑定点击/触事件
  container.on('pointertap', function() {
    console.log('clicked');
  });

  return container;
}

/**
 * 辅助函数
 * 生成星星并绑定动作
 */
function generateStar() {
  var star = Tiny.Sprite.fromImage(RESOURCES.star_white);
  star.setScale(0.3);
  star.setOpacity(0);

  // 定义星空动作
  var fadeInAction = Tiny.FadeIn(1000);
  var fadeOutAction = Tiny.FadeOut(1000);
  fadeInAction.setDelay(Tiny.random(0, 5000));
  fadeOutAction.setDelay(500);
  fadeOutAction.onComplete = function() {
    star.runAction(fadeInAction);
  };
  fadeInAction.onComplete = function() {
    star.runAction(fadeOutAction);
  };
  star.runAction(fadeInAction);

  return star;
}

function refreshScroller(scroller) {
  var svalue = scroller.getValues();
  if (svalue.left <= Tiny.WIN_SIZE.width * 2) {
    scroller.scrollBy(Tiny.WIN_SIZE.width * config.screens);
  } else if (svalue.left >= Tiny.WIN_SIZE.width * (config.screens * 3 - 3)) {
    scroller.scrollBy(-Tiny.WIN_SIZE.width * config.screens);
  }
}
