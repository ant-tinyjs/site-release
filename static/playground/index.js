!function(e,n){"use strict";e=e&&e.hasOwnProperty("default")?e.default:e,n=n&&n.hasOwnProperty("default")?n.default:n;var i,t,a,r="",o=document.getElementById("J-code"),s=e("#J-canvas"),p=n(o,{value:"",theme:"monokai",lineHeight:"120%",lineNumbers:!0,scrollbarStyle:"null"}),c={showFPS:!0,dpi:1,canvasId:"J-canvas",width:s.width(),height:s.height(),fixSize:!0,renderType:Tiny.RENDERER_TYPE.WEBGL,renderOptions:{antialias:!0,preserveDrawingBuffer:!0,backgroundColor:2765125}};function l(e){try{Tiny.app.physics&&Tiny.app.physics.p2&&(Tiny.app.physics.p2.clear(),Tiny.app.physics.p2.reset()),Tiny.app.physics&&Tiny.app.physics.ant&&Tiny.app.stageDebugLayer.ant.removeChildren();var n=e;window.eval(n);var i=window.eval("Layer");Tiny.app.replaceScene(new i)}catch(e){Tiny.app.replaceScene(new Tiny.Text(e.stack,{fill:"white",fontSize:16}))}}function h(){var n=function(e){var n="",i={},t={};if("string"==typeof e){var a=e.split("#");if(a.length>1)for(var r=a[1].split("&"),o=0,s=r.length;o<s;o++){var p=r[o].split("=");i[p[0]]=decodeURIComponent(p[1])}var c=a[0].split("?");if(c.length>1)for(var l=c[1].split("&"),h=0,d=l.length;h<d;h++){var u=l[h].split("=");t[u[0]]=decodeURIComponent(u[1])}n=c[0]}return{url:n,hash:i,query:t}}(location.href),i=n.query.js||n.hash.js||"./codes/Playground.js";i?e.ajax({type:"GET",url:i,processData:!1,dataType:"text",success:function(n){r=n,p.setValue(n),self!==top&&e("#J-redirect").attr("show",!0).attr("href",window.location.href),l(n)},error:function(){p.setValue(r)},complete:function(){}}):p&&p.setValue&&p.setValue(r)}Tiny.app=new Tiny.Application(c),Tiny.plugins.compressedTexture.init(Tiny.app.renderer),Tiny.app.run(new Tiny.Text("Rendering..",{fill:"white"})),e("#J-run").on("click",function(){l(p.getValue())}),e("#J-reset").on("click",function(){p.setValue(r),l(r)}),window.onresize=(i=function(){window.innerWidth>600?(e("#J-canvas").width(window.innerWidth/2),e("#J-canvas").height(window.innerHeight)):(e("#J-canvas").width(window.innerWidth),e("#J-canvas").height(window.innerHeight)),l(p.getValue())},t=500,a=void 0,function(){var e=this,n=arguments;clearTimeout(a),a=setTimeout(function(){i.apply(e,n)},t)}),window.addEventListener("hashchange",function(){h()}),h()}($,CodeMirror);
