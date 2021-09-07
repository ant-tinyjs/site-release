/*!
 * Name: tinyjs-plugin-keyboard
 * Description: KeyboardManager
 * Author: yiiqii
 * Version: v0.1.0
 */
!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(e.Tiny=e.Tiny||{},e.Tiny.Keyboard=n())}(this,function(){"use strict";return function e(n){!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,e);var o={};return o.code=n,o.isDown=!1,o.isUp=!0,o.press=void 0,o.release=void 0,o.downHandler=function(e){e.keyCode===o.code&&(o.isUp&&o.press&&o.press(),o.isDown=!0,o.isUp=!1),e.preventDefault()},o.upHandler=function(e){e.keyCode===o.code&&(o.isDown&&o.release&&o.release(),o.isDown=!1,o.isUp=!0),e.preventDefault()},window.addEventListener("keydown",o.downHandler.bind(o),!1),window.addEventListener("keyup",o.upHandler.bind(o),!1),o}});
