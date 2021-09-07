/**
 * 此示例需要安装插件：tinyjs-plugin-ui
 */
var popBg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALYAAAA1CAYAAADs1BFyAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2tpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpjOGU1OWQzNS05YTQwLTRjNjUtOTdhNi1iYmM3NDU5ZWQ0MjMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MUJCQ0QyRjA5RjE1MTFFOTkyRjBEQTdFQUFDNzBDQTciIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MUJCQ0QyRUY5RjE1MTFFOTkyRjBEQTdFQUFDNzBDQTciIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6REZDOTM0RjE4OUM4MTFFOUJGQTFCNEU5REY5QUM4MjQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6REZDOTM0RjI4OUM4MTFFOUJGQTFCNEU5REY5QUM4MjQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7U0Gv0AAADGUlEQVR42uydy0tUYRyGzyiRRAVZmwojKq1FdhPSapG1ymwRSEsX/jMtuxEuQ3ARRe1atIgw8BqIlzZWtMiMNiWVIlLI9P6Yb2wcHW9zZjzfx/PAA2chg7y+Hn7nnDnfl4ripU5elmfc8VG5T+6KAP4zI7/LT/KDHJVv3HEspGL4jHrZIdvkIf5mUAST8rnskuNb8QvYP8R12SfTiCXQutUa08l3XTTIAYLHMjngOlcyquRduUDYWGatc/ddB2OlVo4QMG6xI66LsVw8XpAvZDXXNpAApuUNN6IUpGKND2mRryg1JIhq18mWzZ6xG+VruYMsIYHMyatyaCPFPiYH5V7yg4SPJU3y43pGke3yKaUGT8aSJ66zS6hc4YfvyJtkBp6wX+6WL1cbRRrczFJJXuARC+6acHilUcRK3kmpwUOssw9zT9S5xbbvfpwnI/CUJtfhZaNIr7xEPuAx/dkOZ4t9So6RCwSAvQswlh1F2skDAqE994w9JQ+SCQSAdbnGin1SviMPCIjjFVwwQoA0W7HPkQMExmkr9glygBBHEd4sh9A4YhePvyPW/YCwmLVip8kBQqOCCIBiA/jBHyv2DDlAYMxYsX+QAwTGLyv2JDlAYExZsSfIAQJjwoo9Qg4QGMNW7F5ygMDoyX4f+6s8QB4Qwnwta7L3sR+TBwSCLaCz+ICmmzwgELpzi20v8vaTCXhOv+vykkfqt8kFPGexw7nritixrbDKojngI2+jzKI56fxiG6zdBz6ybO2+/AJ/izLLBzeSFXiErdv3KMobP/KpckP4WfICD7An5xfl/FrFNmrdSLKH3CDB/HTTxbKtqgu9aGBbH9jmNXNkBwnFunktKrD/+mpv0NgZ+1b+KR4gAcy7bg4V8yFXoswmNmygiUlw2nUyFtiZF73amXcj2N2SexF7qePW7KX+ICrBXuq52EOcQcLGMjnoOlcW7DZhq+wjeCyRfa5jqc0WtFjqZYdsi1gHEIrji3wmu+R4sWfeOKmTzVFmHxA7Phxldk/dKbfxdwPxV866uxuf5Xs5KnsK3ZPeDP8EGADR0+uRO7g/VQAAAABJRU5ErkJggg==';

// 主场景
var Layer = function() {
  Tiny.Container.call(this);

  var container = new Tiny.Container();
  var bgSprite = new Tiny.ui.NinePatch(
    Tiny.Texture.fromImage(popBg),
    400,
    100,
    [25, 17, 1, 20],
    0
  );
  var txt = new Tiny.Text('这是一个多美丽又遗憾的世界', {
    fill: 'white',
    fontSize: 28,
    align: 'center',
  });

  this.addChild(container);
  container.addChild(bgSprite, txt);
  container.setPosition(50, 100);
  bgSprite.setPosition(0, 0);
  bgSprite.setOpacity(0.5);
  txt.setPosition(200 - txt.width / 2, 50 - txt.height / 2);

  // 添加原始图片进行对比
  this.addChild(Tiny.Sprite.fromImage(popBg));
};

// constructor
Layer.prototype = Object.create(Tiny.Container.prototype);
Layer.prototype.constructor = Layer;
