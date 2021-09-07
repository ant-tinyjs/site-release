/* eslint-disable */

var Game = {
  directive: new Tiny.Point(),
  time: new Timer(),
  xOffset: 0,
  interactive: true,
  //当前模式
  currentMode: -2,
  mode: {
    MENU: -2,
    PRE: -1,
    PLAYING: 0,
    PAUSED: 1,
    GAME_OVER: 2
  }
};
