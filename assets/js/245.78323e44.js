(window.webpackJsonp=window.webpackJsonp||[]).push([[245],{533:function(t,s,a){"use strict";a.r(s);var n=a(1),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"content"},[t._m(0),t._m(1),a("p",[t._v('"Basis Universal Supercompressed GPU Texture Codec"——这是来着 '),a("a",{attrs:{href:"https://github.com/BinomialLLC/basis_universal",target:"_blank",rel:"noopener noreferrer"}},[t._v("basis_universal"),a("OutboundLink")],1),t._v(" 的官方介绍，关键词是 "),a("strong",[t._v("Supercompressed")]),t._v("。")]),a("p",[t._v("相比于 .ktx 为容器的压缩纹理，可以理解为它是以 .basis 为容器的压缩纹理格式，不同的是，它是通过 WebAssembly 运行时解码为各端可支持的压缩纹理格式。")]),a("p",[t._v("优点：")]),t._m(2),a("p",[t._v("缺点：")]),t._m(3),t._m(4),t._m(5),a("p",[t._v("【表1】各类型压缩纹理与 png 的大小对比")]),t._m(6),a("p",[t._v("【表2】BASIS 纹理解码耗时（不含加载）对比")]),t._m(7),t._m(8),t._m(9),a("p",[t._v("关于制作 POT 等宽 Atlas 图集可阅读 "),a("router-link",{attrs:{to:"/guide/advanced-texture-compressedtexture.html"}},[t._v("《使用压缩纹理 / 如何使用？》")]),t._v("篇。")],1),t._m(10),a("p",[t._v("通过上面制作生成的 .png，你就可以通过 "),a("router-link",{attrs:{to:"/tools/"}},[t._v("tinyjs-cli")]),t._v(" 来快速生成 BASIS 纹理。")],1),t._m(11),t._m(12),t._m(13),a("blockquote",[a("p",[t._v("Tips")]),a("ul",[a("li",[t._v("生成 BASIS 纹理的功能，"),a("code",[t._v("tinyjs-cli")]),t._v(" 版本需要 "),a("code",[t._v(">=1.4.0")]),t._v("，详细命令请移步："),a("router-link",{attrs:{to:"/tools/#生成压缩纹理"}},[t._v("生成压缩纹理")])],1)])]),t._m(14),a("p",[t._v("使用之前，你最好已经对 "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/WebAssembly",target:"_blank",rel:"noopener noreferrer"}},[t._v("WebAssembly"),a("OutboundLink")],1),t._v(" 有了大致的了解，起码知道它是个什么东西。")]),t._m(15),a("p",[t._v("引用 BASIS 的解码器：")]),t._m(16),t._m(17),a("p",[t._v("初始化压缩纹理插件并执行：")]),t._m(18),t._m(19),t._m(20),a("p",[t._v("使用之前，你最好已经对 "),a("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers",target:"_blank",rel:"noopener noreferrer"}},[t._v("Web Workers"),a("OutboundLink")],1),t._v(" 有了大致的了解，知道是怎么回事。")]),t._m(21),t._m(22)])}),[function(){var t=this.$createElement,s=this._self._c||t;return s("h1",{attrs:{id:"使用-basis-纹理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用-basis-纹理","aria-hidden":"true"}},[this._v("#")]),this._v(" 使用 BASIS 纹理")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"关于"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#关于","aria-hidden":"true"}},[this._v("#")]),this._v(" 关于")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("一套资源：.basis")]),s("li",[this._v("文件体积更小，常规的比 png 还小")]),s("li",[this._v("有损性较低：最终的显示效果与原图基本相差不大")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("需要额外加载两个解码相关的文件：basis_transcoder.js 和 basis_transcoder.wasm")]),s("li",[this._v("有运行时开销：实时解码（借助 WebWorker 可缓解）")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"数据对比"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#数据对比","aria-hidden":"true"}},[this._v("#")]),this._v(" 数据对比")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}},[t._v("文件")]),a("th",{staticStyle:{"text-align":"center"}},[t._v("尺寸（px）")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("大小（kb）")]),a("th",{staticStyle:{"text-align":"left"}}),a("th",{staticStyle:{"text-align":"left"}}),a("th",{staticStyle:{"text-align":"left"}})])]),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}}),a("td",{staticStyle:{"text-align":"center"}}),a("td",{staticStyle:{"text-align":"left"}},[t._v(".png")]),a("td",{staticStyle:{"text-align":"left"}},[t._v(".basis")]),a("td",{staticStyle:{"text-align":"left"}},[t._v(".astc.ktx")]),a("td",{staticStyle:{"text-align":"left"}},[t._v(".pvr.ktx")])]),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("a.png")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("256*256")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("13.44")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("10.217")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("29.684")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("32.868")])]),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("b.png")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("512*512")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("68.864")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("36.697")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("118.436")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("131.172")])]),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("c.png")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("1024*1024")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("353.482")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("134.412")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("467.956")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("524.388")])]),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("d.png")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("2048*2048")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("1391.118")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("417.787")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("1871.524")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("2097.252")])])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("table",[a("thead",[a("tr",[a("th",{staticStyle:{"text-align":"left"}}),a("th",{staticStyle:{"text-align":"center"}},[t._v("a.basis")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("b.basis")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("c.basis")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("d.basis")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("6张basis")]),a("th",{staticStyle:{"text-align":"left"}},[t._v("6张basis且可用")])])]),a("tbody",[a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("尺寸（px）")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("256*256")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("512*512")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("1024*1024")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("2048*2048")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("2048*2048")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("2048*2048")])]),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("iPhone 7P 耗时（ms）")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("59.4")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("98.09")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("126")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("195.84")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("784.62")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("1388.4")])]),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("iPhone 7P Worker 耗时（ms）")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("245.52")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("1103.04")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("1002.8")])]),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("OPPO R11 耗时（ms）")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("24.29")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("63")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("175.5")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("420.3")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("2485.44")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("3228.54")])]),a("tr",[a("td",{staticStyle:{"text-align":"left"}},[t._v("OPPO R11 Worker 耗时（ms）")]),a("td",{staticStyle:{"text-align":"center"}},[t._v("-")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("-")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("435.42")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("2804.55")]),a("td",{staticStyle:{"text-align":"left"}},[t._v("1186.64")])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[s("em",[this._v("* 注：以上数据仅供参考，不代表真实场景。")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("Tips")]),s("ul",[s("li",[this._v("从【表1】可以看出：.basis 格式甚至比 .png 还要小，尺寸越大越明显")]),s("li",[this._v("从【表2】可以看出：\n"),s("ol",[s("li",[this._v("从 d.basis 的耗时分析可以估算 Worker 本身创建+通信是有一定损耗的（平均一次在 50ms 左右）")]),s("li",[this._v("“6张basis” 的纯解码耗时因设备而异，Worker 的优势是可以并行执行，不阻塞后面的逻辑，正如“6张basis+可用”栏目，平均 1s 就能达到可用")])])])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h2",{attrs:{id:"如何使用？"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#如何使用？","aria-hidden":"true"}},[this._v("#")]),this._v(" 如何使用？")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"生成-basis-纹理"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生成-basis-纹理","aria-hidden":"true"}},[this._v("#")]),this._v(" 生成 BASIS 纹理")])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[this._v("# 全量生成 .astc.ktx、.pvr.ktx、.basis")]),this._v("\n$ tiny texture-compressed res/hao.png\n\n"),s("span",{pre:!0,attrs:{class:"token comment"}},[this._v("# 只生成 .basis")]),this._v("\n$ tiny texture-compressed res/hao.png -f basis\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("p",[this._v("通过以上命令，会在 "),s("code",[this._v("res")]),this._v(" 目录下生成以下 BASIS 格式压缩纹理：")])},function(){var t=this.$createElement,s=this._self._c||t;return s("ul",[s("li",[this._v("basis 格式: https://gw.alipayobjects.com/os/tiny/resources/1.0.8/compressedtexture/hao.basis")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h3",{attrs:{id:"使用-basis-纹理-2"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用-basis-纹理-2","aria-hidden":"true"}},[this._v("#")]),this._v(" 使用 BASIS 纹理")])},function(){var t=this.$createElement,s=this._self._c||t;return s("h4",{attrs:{id:"_1、常规姿势"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1、常规姿势","aria-hidden":"true"}},[this._v("#")]),this._v(" 1、常规姿势")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-html extra-class"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("<")]),t._v("script")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("crossorigin")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("anonymous"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),t._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[t._v("src")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation attr-equals"}},[t._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')]),t._v("https://gw.alipayobjects.com/os/tiny/owl/1.0.8/libs/basis_transcoder.js"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),a("span",{pre:!0,attrs:{class:"token script"}}),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("</")]),t._v("script")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(">")])]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("Tips")]),s("ul",[s("li",[this._v("此解码器会自动加载同目录下的 "),s("code",[this._v("basis_transcoder.wasm")]),this._v(" 文件")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Application")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" loader "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loaders"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Loader")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 初始化压缩纹理插件")]),t._v("\nTiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("compressedTexture"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("init")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1. 检测当前环境是否支持 WebAssembly")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2. 只有 WebGL 渲染模式下才走 BASIS 纹理，避免执行无用的 WebAssembly 计算")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("WebAssembly "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("gl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 此 BASIS 方法是 basis_transcoder.js 提供的 wasm 模块")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token constant"}},[t._v("BASIS")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("Module")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" BasisFile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" initializeBasis "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" Module"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// run module")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("initializeBasis")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 执行绑定")]),t._v("\n    Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("compressedTexture"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("BASISLoader"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("bindTranscoder")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("BasisFile"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("catch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("useCT")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("let")]),t._v(" metadata"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("useCT"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 设置 metadata.useFormat 为 basis，告诉加载器明确只使用 BASIS 纹理")]),t._v("\n    metadata "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" useCompressedTexture"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" useFormat"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'basis'")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n  loader\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'logo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'./res/logo.png'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" metadata "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("load")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("loaderInstance"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" resources")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" sprite "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Sprite")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("TextureCache"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'logo'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("blockquote",[a("p",[t._v("Tips")]),a("ul",[a("li",[t._v("TinyJS 1.6.0 及以上版本才支持 BASIS 纹理。")]),a("li",[t._v("与 KTX 容器的压缩纹理一样，BASIS 纹理也只有 WebGL 模式下才有效，如果当前环境不支持 WebGL 会自动降级到同目录下的 "),a("code",[t._v(".png")]),t._v("，支持的话则使用与 "),a("code",[t._v(".png")]),t._v(" 同目录下同文件名的 "),a("code",[t._v(".basis")]),t._v(" 文件")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("h4",{attrs:{id:"_2、多-worker-姿势"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2、多-worker-姿势","aria-hidden":"true"}},[this._v("#")]),this._v(" 2、多 Worker 姿势")])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" app "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Application")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" loader "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("new")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("loaders"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Loader")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 初始化压缩纹理插件")]),t._v("\nTiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("compressedTexture"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("init")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 1. 检测当前环境是否支持 Worker 和 WebAssembly")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 2. 只有 WebGL 渲染模式下才走 BASIS 纹理，避免执行无用的 WebAssembly 计算")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("Worker "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" window"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("WebAssembly "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" app"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("renderer"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("gl"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 加载转换器并执行转换")]),t._v("\n  Tiny"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("plugins"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("compressedTexture"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("WorkedBASISLoader"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("loadAndRunTranscoder")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// basis_transcoder 的 js 及 wasm 文件路径，可使用相对路径。")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 加载后的完整链接为：")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// https://gw.alipayobjects.com/os/tiny/owl/1.0.8/libs/basis_transcoder.js")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// https://gw.alipayobjects.com/os/tiny/owl/1.0.8/libs/basis_transcoder.wasm")]),t._v("\n    path"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://gw.alipayobjects.com/os/tiny/owl/1.0.8/libs'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Worker 线程数，默认为 2，最高 8，可按资源数量设置")]),t._v("\n    threads"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("6")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("then")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("bind")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("catch")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("e")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    console"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("log")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("e"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("else")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("start")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("useCT")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// 使用方法同：1、常规姿势")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])])},function(){var t=this.$createElement,s=this._self._c||t;return s("blockquote",[s("p",[this._v("Tips")]),s("ul",[s("li",[this._v("多 Worker 模式比较适合资源量较大的场景，如果只有1、2个资源，其实常规模式就可以了，因为 Worker 创建和通信的耗时可能反而会让你得不偿失")])])])}],!1,null,null,null);s.default=e.exports}}]);