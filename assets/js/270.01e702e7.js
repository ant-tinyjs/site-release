(window.webpackJsonp=window.webpackJsonp||[]).push([[270],{558:function(t,s,a){"use strict";a.r(s);var n=a(1),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),a("p",[t._v("以下是开发者在使用 Tiny.js 做游戏开发过程遇到的一些常见问题，如何解决及规避的总结。\n首先，请确保使用最新版本的 Tiny.js。")]),t._m(1),t._m(2),a("p",[t._v("Tiny.js 支持 WebGL 和 Canvas 两种模式来渲染。但 WebGL 渲染会导致以下问题：")]),t._m(3),t._m(4),a("p",[t._v("iOS 设备使用 UIWebview 进行渲染时，Canvas 区域会有小概率出现蓝屏问题，需要在可以使用 WKWebview 的设备上尽量开启这一特性。")]),t._m(5),t._m(6),t._m(7),t._m(8),a("p",[t._v("如果绘制区域的背景非透明，则可以设置 "),a("code",[t._v("renderOptions.transparent: false")]),t._v(" 这一启动参数，这样在每一帧绘制时渲染引擎无需清理 canvas，可以节省一定的 CPU 开销。具体配置请参考"),a("a",{attrs:{href:"http://tinyjs.net/guide/advanced-startup.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("启动参数"),a("OutboundLink")],1),t._v("。")]),t._m(9),a("p",[t._v("Tiny.js 引擎在 1.1.7 版本增加了帧率设置启动参数。在不明显影响体验的基础上，可以通过降低帧率，即设置 "),a("code",[t._v("fps")]),t._v(" 启动参数，来有效减少 CPU 性能开销。具体配置请参考"),a("a",{attrs:{href:"http://tinyjs.net/guide/advanced-startup.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("启动参数"),a("OutboundLink")],1),t._v("。")]),t._m(10),a("p",[t._v("对于一些重复精灵、大量重复运动的场景，可以使用 ParticleContaier 来优化渲染性能。具体可参考："),a("a",{attrs:{href:"http://tinyjs.net/guide/extras-particlecontainer.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("ParticleContainer"),a("OutboundLink")],1)]),t._m(11),t._m(12),t._m(13),t._m(14),t._m(15),t._m(16),t._m(17),t._m(18),t._m(19),t._m(20),a("p",[t._v("在手动开发粒子特性动画时，注意循环利用或者在不用时销毁动画对象，来避免造成内存无限增长。")]),t._m(21),t._m(22),t._m(23),t._m(24),t._m(25),t._m(26),t._m(27),t._m(28),t._m(29),t._m(30),t._m(31),t._m(32),t._m(33),t._m(34),t._m(35),t._m(36),t._m(37),t._m(38),t._m(39),t._m(40),t._m(41),t._m(42),t._m(43)])}),[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"常见问题"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常见问题","aria-hidden":"true"}},[this._v("#")]),this._v(" 常见问题")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"一、渲染内核"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#一、渲染内核","aria-hidden":"true"}},[this._v("#")]),this._v(" 一、渲染内核")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_1-1-关于渲染模式选择"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-关于渲染模式选择","aria-hidden":"true"}},[this._v("#")]),this._v(" 1-1 关于渲染模式选择")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("Android 4.x、5.x 设备有一定概率渲染异常，Android 6.0.x 系统会有一定概率出现闪屏及黑屏，部分华为低端设备（黑名单统计中）闪退数量增加，因此可以：\n"),s("ul",[s("li",[this._v("Android 6.1 系统版本以下的设备使用 Canvas 渲染模式")]),s("li",[this._v("Android 其他系统版本及设备使用自动识别渲染模式（即不传 "),s("code",[this._v("renderType")]),this._v(" 或传入 "),s("code",[this._v("Tiny.RENDERER_TYPE.UNKNOWN")]),this._v("）")])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_1-2-ios-设备请使用-wkwebview"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-ios-设备请使用-wkwebview","aria-hidden":"true"}},[this._v("#")]),this._v(" 1-2 iOS 设备请使用 WKWebview")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"二、绘制性能"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#二、绘制性能","aria-hidden":"true"}},[this._v("#")]),this._v(" 二、绘制性能")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_2-1-canvas-渲染模式下避免使用-tiny-graphics"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-canvas-渲染模式下避免使用-tiny-graphics","aria-hidden":"true"}},[this._v("#")]),this._v(" 2-1. Canvas 渲染模式下避免使用 Tiny.Graphics")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("Tiny.Graphics")]),this._v(" 底层使用的是 Canvas API 来绘制图形，每一帧进行贴图都会进行计算并绘制。如非必要，请尽量使用图片材质")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_2-2-帧绘制时无需清理-canvas"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-帧绘制时无需清理-canvas","aria-hidden":"true"}},[this._v("#")]),this._v(" 2-2. 帧绘制时无需清理 canvas")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_2-3-合理选择帧率来平衡性能与体验"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-合理选择帧率来平衡性能与体验","aria-hidden":"true"}},[this._v("#")]),this._v(" 2-3. 合理选择帧率来平衡性能与体验")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_2-4-使用-particlecontainer-来优化绘制性能"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-4-使用-particlecontainer-来优化绘制性能","aria-hidden":"true"}},[this._v("#")]),this._v(" 2-4. 使用 ParticleContainer 来优化绘制性能")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_2-5-帧动画可能会导致渲染帧率恢复到-60fps"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-5-帧动画可能会导致渲染帧率恢复到-60fps","aria-hidden":"true"}},[this._v("#")]),this._v(" 2-5. 帧动画可能会导致渲染帧率恢复到 60FPS")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("在 1.1.7、1.1.8、1.2.0、1.2.1 版本的 Tiny.js 下，如果游戏设置 60 以下的 FPS 帧率，当帧动画（"),s("code",[this._v("AnimatedSprite")]),this._v(" 并且 "),s("code",[this._v("loop: false")]),this._v("）播放完成时，游戏主场景帧率会自动恢复到 60 FPS，增加 CPU 性能开销")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"三、内存优化"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#三、内存优化","aria-hidden":"true"}},[this._v("#")]),this._v(" 三、内存优化")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_3-1-清理-actions"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-清理-actions","aria-hidden":"true"}},[this._v("#")]),this._v(" 3-1. 清理 actions")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("如果 Tiny 对象重复或循环执行一些特定的 action，那么在执行动画动作前，需要调用 "),s("code",[this._v("Tiny.Action.cleanup")]),this._v("，来清理 Tiny 对象上残留的 "),s("code",[this._v("Tween")]),this._v(" 实例引用，避免造成内存泄漏。")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// noteLeft 是一个 Tiny.Sprite 实例")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" flyLeft "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("MoveTo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("point")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fadeOutLeft "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("FadeOut")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("3000")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nTiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Action"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("cleanup")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("noteLeft"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\nnoteLeft"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("runAction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("flyLeft"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fadeOutLeft"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_3-2-清理骨骼显示对象"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-清理骨骼显示对象","aria-hidden":"true"}},[this._v("#")]),this._v(" 3-2. 清理骨骼显示对象")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("如果使用了骨骼动画，那么在移除骨骼动画时，请调用骨骼显示对象的 "),s("code",[this._v("dispose")]),this._v(" 方法来销毁骨骼。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[this._v("armatureDisplay"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[this._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[this._v("dispose")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[this._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[this._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[this._v(";")]),this._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_3-3-开发粒子特效注意内存回收"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-3-开发粒子特效注意内存回收","aria-hidden":"true"}},[this._v("#")]),this._v(" 3-3. 开发粒子特效注意内存回收")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("particle")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 每个例子都会执行该方法来绘制运动轨迹")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" snowflake "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Sprite")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("TextureCache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'snow'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  snowflake"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setScale")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("random")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.8")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1.2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  snowflake"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("setOpacity")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("random")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.8")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fallAction "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("MoveTo")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1e3")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("point")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("100")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  fallAction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("onComplete")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    container"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("removeChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("snowflake"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 运动结束后移除 snowflake 对象")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  container"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("addChild")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("snowflake"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  snowflake"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("runAction")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fallAction"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_3-4-减少加载-json-文件的-xhr-请求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-4-减少加载-json-文件的-xhr-请求","aria-hidden":"true"}},[this._v("#")]),this._v(" 3-4. 减少加载 JSON 文件的 xhr 请求")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("可以通过将材质数据以 JSON 对象的形式内联进 js，而不是构建成单个 JSON 文件。这样可以直接使用 "),s("code",[this._v("Tiny.loaders.Loader")]),this._v(" 加载 JSON 对象（需传入 "),s("code",[this._v("metadata.JSONObject")]),this._v("），来有效减少加载 JSON 文件产生的 xhr 请求。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"四、图片拼叠"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#四、图片拼叠","aria-hidden":"true"}},[this._v("#")]),this._v(" 四、图片拼叠")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_4-1-需注意-tilingsprite-平铺图片的像素"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-需注意-tilingsprite-平铺图片的像素","aria-hidden":"true"}},[this._v("#")]),this._v(" 4-1. 需注意 TilingSprite 平铺图片的像素")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("使用 "),s("code",[this._v("TilingSprite")]),this._v(" 绘制纯色或者渐变背景时，如果重复的图片宽度（或者高度）大于 1，在某些特定的像素值上，在部分 iOS 设备上，会导致 webview 卡死。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_4-2-不要使用-tilingsprite-平铺雪碧图的图片"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-不要使用-tilingsprite-平铺雪碧图的图片","aria-hidden":"true"}},[this._v("#")]),this._v(" 4-2. 不要使用 TilingSprite 平铺雪碧图的图片")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("使用 "),s("code",[this._v("TilingSprite")]),this._v(" 平铺图片时，请确保使用的是单张图片，不要将图片合成到雪碧图中。否则会造成平铺的颜色产出半透明的渐变。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_4-3-ninepatch-九宫格渲染间隙规避"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-ninepatch-九宫格渲染间隙规避","aria-hidden":"true"}},[this._v("#")]),this._v(" 4-3. NinePatch 九宫格渲染间隙规避")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("使用 "),s("code",[this._v("NinePatch")]),this._v(" 绘制九宫格时，通过 "),s("code",[this._v("canvasPadding: 1")]),this._v(" 来规避 canvas 渲染间隙问题。（tinyjs-plugin-ui 默认已经规避了这一问题，请确保不要手动改动这一参数）。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_4-4-mesh-网格的渲染间隙规避"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-4-mesh-网格的渲染间隙规避","aria-hidden":"true"}},[this._v("#")]),this._v(" 4-4. Mesh 网格的渲染间隙规避")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("使用 canvas 渲染模式，需要设置网格（"),s("code",[this._v("tinyjs-plugin-mesh")]),this._v("、"),s("code",[this._v("tinyjs-plugin-drangonbones")]),this._v("）的 "),s("code",[this._v("canvasDrawTimes")]),this._v(" 为一个合理值（1到10），来来规避 canvas 渲染间隙")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"五、文字相关"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#五、文字相关","aria-hidden":"true"}},[this._v("#")]),this._v(" 五、文字相关")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_5-1-避免重复创建-tiny-text-实例"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-1-避免重复创建-tiny-text-实例","aria-hidden":"true"}},[this._v("#")]),this._v(" 5-1. 避免重复创建 Tiny.Text 实例")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("每次使用 "),s("code",[this._v("Tiny.Text")]),this._v(" 创建文字实例时，Tiny.js 引擎都会创建一个离屏 canvas 的 DOM 节点，来进行一些文字测量的相关计算。因此要注意不要循环重复创建实例，要尽量重复利用已创建 "),s("code",[this._v("Tiny.Text")]),this._v(" 实例。否则会引发内存泄漏。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_5-2-canvas-无法支持特定字号的-emoji-字符"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-2-canvas-无法支持特定字号的-emoji-字符","aria-hidden":"true"}},[this._v("#")]),this._v(" 5-2. canvas 无法支持特定字号的 emoji 字符")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("code",[this._v("Tiny.Text")]),this._v(" 实例中的文字如果含有 emoji 表情，特定 "),s("code",[this._v("fontSize")]),this._v(" 下，可能会无法展示 emoji 字符，这是由于 canvas 的底层绘制引起，无法解决，但可以通过尝试调整到特定字号（一般是减少字号）来规避。")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_5-3-正确截断含有-emoji-字符的文字"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_5-3-正确截断含有-emoji-字符的文字","aria-hidden":"true"}},[this._v("#")]),this._v(" 5-3. 正确截断含有 emoji 字符的文字")])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("如果在 emoji 字符的中间位置进行截断，可能会导致文字中的截断位置以前的其他字符被截掉，影响展现。所以需要在 emoji 字符开始或者结束的位置进行截断。可以通过 "),s("code",[this._v("encodeURIComponent")]),this._v(" 方法来判断是否在正确的位置进行了截断：")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("try")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("encodeURIComponent")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("text"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 截断不完整的 emoji 会报错")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("catch")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"六、其他"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#六、其他","aria-hidden":"true"}},[this._v("#")]),this._v(" 六、其他")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"_6-1-避免使用客户端时间"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_6-1-避免使用客户端时间","aria-hidden":"true"}},[this._v("#")]),this._v(" 6-1. 避免使用客户端时间")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("p",[t._v("涉及时间获取的逻辑请尽量使用服务端时间。避免使用 "),a("code",[t._v("new Date()")]),t._v(" 或 "),a("code",[t._v("Date.now()")]),t._v(" 来获取时间。也可以 "),a("code",[t._v("Tiny.getTime()")]),t._v(" 方法来获取时间，但在 iOS 8.X 系统上底层还是依赖于 "),a("code",[t._v("Date")]),t._v(" 对象实现，需要特殊处理。")])}],!1,null,null,null);s.default=e.exports}}]);