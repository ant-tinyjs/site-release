/**
 * 此示例需要安装插件：tinyjs-plugin-ui
 * 由于安全策略，ui.DOM 的渲染模式只支持 canvas，如果要用，需要将固定设置启动参数 renderType 为 Tiny.RENDERER_TYPE.CANVAS
 */

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  // 写一段 HTML
  // 注意：标签要是严格 xml，比如<br/>必须要闭合，页面样式不会影响 ui.DOM 片段，各平台下样式呈现可能有偏差
  var html =
    '<div style="font-size:40px;color:#fff;margin:0;padding:0;">' +
    ' I<em> like </em><span style="color:gold;text-shadow:0 0 2px red;">coding</span><br/>我来自<b style="border:1px solid greenyellow;color:gold;text-shadow:1px 5px 5px orangered;">中国</b>' +
    '</div>' +
    '<div style="font-size:18px;height:80px;margin:10px 0;padding:0;">' +
    ' <span style="background-color:pink;padding:5px 10px;color:white;border-radius:5px;margin-right:10px;">I am Tiny.js</span>' +
    ' <span style="background-color:blueviolet;padding:5px 10px;color:white;border-radius:5px;">Hello, Tiny.js, I am 意绮</span>' +
    '</div>';
  // 用上面的那段 HTML 生成 DOM 显示对象
  // 实例化后的 dom 实际就是一个 Tiny.Container，所以，事件绑定或形态变化可直接按显示对象操作
  try {
    var dom = new Tiny.ui.DOM({
      html: html,
    });
    // 将实例化的 dom 直接添加到显示容器中
    this.addChild(dom);
  } catch (e) {
    this.addChild(new Tiny.Text('当前环境不支持 Tiny.ui.Dom', {
      fill: 'white',
    }));
  }
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
