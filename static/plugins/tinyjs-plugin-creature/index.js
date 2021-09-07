/*!
 * Name: tinyjs-plugin-creature
 * Description: Runtime plugin for CreaturePack Web Format
 * Author: yiiqii
 * Version: v0.0.2
 */
!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t.Tiny=t.Tiny||{},t.Tiny.creature={}))}(this,function(t){"use strict";var e=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},i=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),r=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e};function n(t,e){this.offset=e||0,this.view=t}n.prototype.map=function(t){for(var e={},i=0;i<t;i++){e[this.parse()]=this.parse()}return e},n.prototype.bin=function(t){var e=new ArrayBuffer(t);return new Uint8Array(e).set(new Uint8Array(this.view.buffer,this.offset,t),0),this.offset+=t,e},n.prototype.str=function(t){var e=function(t,e,i){for(var r="",n=e,s=e+i;n<s;n++){var a=t.getUint8(n);if(0!=(128&a))if(192!=(224&a))if(224!=(240&a)){if(240!=(248&a))throw new Error("Invalid byte "+a.toString(16));r+=String.fromCharCode((7&a)<<18|(63&t.getUint8(++n))<<12|(63&t.getUint8(++n))<<6|(63&t.getUint8(++n))<<0)}else r+=String.fromCharCode((15&a)<<12|(63&t.getUint8(++n))<<6|(63&t.getUint8(++n))<<0);else r+=String.fromCharCode((15&a)<<6|63&t.getUint8(++n));else r+=String.fromCharCode(a)}return r}(this.view,this.offset,t);return this.offset+=t,e},n.prototype.array=function(t){for(var e=new Array(t),i=0;i<t;i++)e[i]=this.parse();return e},n.prototype.parse=function(){var t,e,i=this.view.getUint8(this.offset);if(160==(224&i))return e=31&i,this.offset++,this.str(e);if(128==(240&i))return e=15&i,this.offset++,this.map(e);if(144==(240&i))return e=15&i,this.offset++,this.array(e);if(0==(128&i))return this.offset++,i;if(224==(224&i))return t=this.view.getInt8(this.offset),this.offset++,t;if(212!==i||0!==this.view.getUint8(this.offset+1)){switch(i){case 217:return e=this.view.getUint8(this.offset+1),this.offset+=2,this.str(e);case 218:return e=this.view.getUint16(this.offset+1),this.offset+=3,this.str(e);case 219:return e=this.view.getUint32(this.offset+1),this.offset+=5,this.str(e);case 196:return e=this.view.getUint8(this.offset+1),this.offset+=2,this.bin(e);case 197:return e=this.view.getUint16(this.offset+1),this.offset+=3,this.bin(e);case 198:return e=this.view.getUint32(this.offset+1),this.offset+=5,this.bin(e);case 192:return this.offset++,null;case 194:return this.offset++,!1;case 195:return this.offset++,!0;case 204:return t=this.view.getUint8(this.offset+1),this.offset+=2,t;case 205:return t=this.view.getUint16(this.offset+1),this.offset+=3,t;case 206:return t=this.view.getUint32(this.offset+1),this.offset+=5,t;case 207:var r=this.view.getUint32(this.offset+1),n=this.view.getUint32(this.offset+5);return t=4294967296*r+n,this.offset+=9,t;case 208:return t=this.view.getInt8(this.offset+1),this.offset+=2,t;case 209:return t=this.view.getInt16(this.offset+1),this.offset+=3,t;case 210:return t=this.view.getInt32(this.offset+1),this.offset+=5,t;case 211:return t=4294967296*(r=this.view.getInt32(this.offset+1))+(n=this.view.getUint32(this.offset+5)),this.offset+=9,t;case 222:return e=this.view.getUint16(this.offset+1),this.offset+=3,this.map(e);case 223:return e=this.view.getUint32(this.offset+1),this.offset+=5,this.map(e);case 220:return e=this.view.getUint16(this.offset+1),this.offset+=3,this.array(e);case 221:return e=this.view.getUint32(this.offset+1),this.offset+=5,this.array(e);case 202:return t=this.view.getFloat32(this.offset+1),this.offset+=5,t;case 203:return t=this.view.getFloat64(this.offset+1),this.offset+=9,t}throw new Error("Unknown type 0x"+i.toString(16))}this.offset+=3};var s=function(){function t(i,r,n){e(this,t),this.beginTime=i,this.endTime=r,this.dataIdx=n}return i(t,[{key:"getAnimPointsOffset",value:function(){return this.dataIdx<0?-1:this.dataIdx+1}},{key:"getAnimUvsOffset",value:function(){return this.dataIdx<0?-1:this.dataIdx+2}},{key:"getAnimColorsOffset",value:function(){return this.dataIdx<0?-1:this.dataIdx+3}}]),t}(),a=function(){function t(i){e(this,t),this.dataIdx=i,this.startTime=0,this.endTime=0,this.firstSet=!1,this.timeSamplesMap={}}return i(t,[{key:"sampleTime",value:function(t){var e=Math.round(t),i=this.timeSamplesMap[e].beginTime,r=this.timeSamplesMap[e].endTime;return r-i<=1e-4?[i,r,0]:[i,r,(t-i)/(r-i)]}},{key:"correctTime",value:function(t,e){if(!1===this.withLoop){if(t<this.startTime)return this.startTime;if(t>this.endTime)return this.endTime}else{if(t<this.startTime)return this.endTime;if(t>this.endTime)return this.startTime}return t}},{key:"addTimeSample",value:function(t,e){var i=new s(t,t,e);this.timeSamplesMap[t]=i,!1===this.firstSet?(this.firstSet=!0,this.startTime=t,this.endTime=t):(this.startTime>t&&(this.startTime=t),this.endTime<t&&(this.endTime=t))}},{key:"finalTimeSamples",value:function(){for(var t=this.startTime,e=Object.keys(this.timeSamplesMap).map(Number).sort(function(t,e){return t-e}),i=0;i<e.length;i++){var r=e[i];if(r!==t){for(var n=t+1;n<r;n++){var a=new s(t,r,-1);this.timeSamplesMap[n]=a}t=r}}}}]),t}(),o=function(){function t(){var i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-1;e(this,t),this.init(i)}return i(t,[{key:"init",value:function(t){this.idx=t,this.visited=!1,this.neighbours=[]}}]),t}(),h=function(){function t(i){e(this,t),this.indices=[],this.uvs=[],this.points=[],this.animClipMap={},this.headerList=[],this.animPairsOffsetList=[],this.dMinX=0,this.dMinY=0,this.dMaxX=0,this.dMaxY=0,this.fileData=function(t){var e=new n(new DataView(t)),i=e.parse();if(e.offset!==t.byteLength)throw new Error(t.byteLength-e.offset+" trailing bytes");return i}(i),this.headerList=this.fileData[this.getBaseOffset()],this.animPairsOffsetList=this.fileData[this.getAnimPairsListOffset()],this.indices=new Array(this.getNumIndices()),this.points=new Array(this.getNumPoints()),this.uvs=new Array(this.getNumUvs()),this.updateIndices(this.getBaseIndicesOffset()),this.updatePoints(this.getBasePointsOffset()),this.updateUVs(this.getBaseUvsOffset()),this.fillDeformRanges(),this.finalAllPointSamples();for(var r=0;r<this.getAnimationNum();r++){for(var s=this.getAnimationOffsets(r),o=this.fileData[s[0]],h=s[0],f=new a(++h);h<s[1];){var u=this.fileData[h];f.addTimeSample(u,h),h+=4}f.finalTimeSamples(),this.animClipMap[o]=f}this.meshRegionsList=this.findConnectedRegions()}return i(t,[{key:"formUndirectedGraph",value:function(){for(var t={},e=this.getNumIndices()/3,i=0;i<e;i++){var r=new Array(3);r[0]=this.indices[3*i],r[1]=this.indices[3*i+1],r[2]=this.indices[3*i+2];for(var n=0;n<r.length;n++){var s=r[n];s in t==!1&&(t[s]=new o(s));for(var a=t[s],h=0;h<r.length;h++){var f=r[h];f!==s&&a.neighbours.push(f)}}}return t}},{key:"regionsDFS",value:function(t,e){var i=[];if(t[e].visited)return i;var r=[];for(r.push(e);r.length>0;){var n=t[r.pop()];if(!1===n.visited){n.visited=!0,i.push(n.idx);for(var s=0;s<n.neighbours.length;s++){var a=n.neighbours[s];r.push(a)}}}return i}},{key:"findConnectedRegions",value:function(){for(var t=[],e=this.formUndirectedGraph(),i=0;i<this.getNumIndices();i++){var r=this.indices[i];if(!1===e[r].visited){var n=this.regionsDFS(e,r);n.sort(function(t,e){return t-e}),t.push([n[0],n[n.length-1]])}}return t}},{key:"updateIndices",value:function(t){for(var e=this.fileData[t],i=0;i<e.length;i++)this.indices[i]=e[i]}},{key:"updatePoints",value:function(t){for(var e=this.fileData[t],i=0;i<e.length;i++)this.points[i]=e[i]}},{key:"updateUVs",value:function(t){for(var e=this.fileData[t],i=0;i<e.length;i++)this.uvs[i]=e[i]}},{key:"getAnimationNum",value:function(){for(var t=0,e=0;e<this.headerList.length;e++)"animation"===this.headerList[e]&&t++;return t}},{key:"hasDeformCompress",value:function(){for(var t=0;t<this.headerList.length;t++){if("deform_comp1"===this.headerList[t])return"deform_comp1";if("deform_comp2"===this.headerList[t])return"deform_comp2";if("deform_comp1_1"===this.headerList[t])return"deform_comp1_1"}return""}},{key:"fillDeformRanges",value:function(){if(""!==this.hasDeformCompress()){var t=this.getAnimationOffsets(this.getAnimationNum()),e=this.fileData[t[0]];this.dMinX=e[0],this.dMinY=e[1],this.dMaxX=e[2],this.dMaxY=e[3]}}},{key:"finalAllPointSamples",value:function(){var t=this.hasDeformCompress();if(""!==t)for(var e=0;e<this.getAnimationNum();e++){var i=this.getAnimationOffsets(e),r=i[0];for(r++;r<i[1];){var n=this.fileData[r+1],s=this.fileData[r+1],a=n.byteLength,o=new DataView(s);"deform_comp2"===t?a=s.byteLength:"deform_comp1_1"===t&&(a=s.byteLength/2);for(var h=new Array(a),f=0;f<a;f++){var u=0,l=0;"deform_comp1"===t?(u=n[f],l=65535):"deform_comp2"===t?(u=o.getUint8(f),l=255):"deform_comp1_1"===t&&(u=o.getUint16(2*f,!0),l=65535);var d=0;f%2==0?(d=u/l*(this.dMaxX-this.dMinX)+this.dMinX,d+=this.points[f]):(d=u/l*(this.dMaxY-this.dMinY)+this.dMinY,d+=this.points[f]),h[f]=d}this.fileData[r+1]=h,r+=4}}}},{key:"getAnimationOffsets",value:function(t){return[this.animPairsOffsetList[2*t],this.animPairsOffsetList[2*t+1]]}},{key:"getBaseOffset",value:function(){return 0}},{key:"getAnimPairsListOffset",value:function(){return 1}},{key:"getBaseIndicesOffset",value:function(){return this.getAnimPairsListOffset()+1}},{key:"getBasePointsOffset",value:function(){return this.getAnimPairsListOffset()+2}},{key:"getBaseUvsOffset",value:function(){return this.getAnimPairsListOffset()+3}},{key:"getNumIndices",value:function(){return this.fileData[this.getBaseIndicesOffset()].length}},{key:"getNumPoints",value:function(){return this.fileData[this.getBasePointsOffset()].length}},{key:"getNumUvs",value:function(){return this.fileData[this.getBaseUvsOffset()].length}}]),t}();"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var f,u,l=(function(t,e){
/*!
   * Name: tinyjs-plugin-mesh
   * Description: The Tiny.js plugin of mesh
   * Author: yiiqii
   * Version: v1.3.1
   */
!function(t){var e=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},i=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),r=function t(e,i,r){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,i);if(void 0===n){var s=Object.getPrototypeOf(e);return null===s?void 0:t(s,i,r)}if("value"in n)return n.value;var a=n.get;return void 0!==a?a.call(r):void 0},n=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},s=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e},a=new Tiny.Point,o=new Tiny.Polygon,h=function(t){function h(t,i,r,n,a){e(this,h);var o=s(this,(h.__proto__||Object.getPrototypeOf(h)).call(this));return o._texture=t||Tiny.Texture.EMPTY,o.uvs=r||new Float32Array([0,0,1,0,1,1,0,1]),o.vertices=i||new Float32Array([0,0,100,0,100,100,0,100]),o.indices=n||new Uint16Array([0,1,3,2]),o.dirty=0,o.indexDirty=0,o.vertexDirty=0,o.autoUpdate=!0,o.blendMode=Tiny.BLEND_MODES.NORMAL,o.canvasPadding=h.defaults.canvasPadding,o.drawMode=a||h.DRAW_MODES.TRIANGLE_MESH,o.shader=null,o.tintRgb=new Float32Array([1,1,1]),o._glDatas={},o._uvTransform=new Tiny.TextureTransform(o._texture),o.uploadUvTransform=!1,o.pluginName="mesh",o._canvasDrawTimes=1,o}return n(h,t),i(h,[{key:"_renderWebGL",value:function(t){this.refresh(),t.setObjectRenderer(t.plugins[this.pluginName]),t.plugins[this.pluginName].render(this)}},{key:"_renderCanvas",value:function(t){this.refresh(),t.plugins[this.pluginName].render(this)}},{key:"_onTextureUpdate",value:function(){this._uvTransform.texture=this._texture,this.refresh()}},{key:"multiplyUvs",value:function(){this.uploadUvTransform||this._uvTransform.multiplyUvs(this.uvs)}},{key:"refresh",value:function(t){this.autoUpdate&&this.vertexDirty++,this._uvTransform.update(t)&&this._refresh()}},{key:"_refresh",value:function(){}},{key:"_calculateBounds",value:function(){this._bounds.addVertices(this.transform,this.vertices,0,this.vertices.length)}},{key:"containsPoint",value:function(t){if(!this.getBounds().contains(t.x,t.y))return!1;this.worldTransform.applyInverse(t,a);for(var e=this.vertices,i=o.points,r=this.indices,n=this.indices.length,s=this.drawMode===h.DRAW_MODES.TRIANGLES?3:1,f=0;f+2<n;f+=s){var u=2*r[f],l=2*r[f+1],d=2*r[f+2];if(i[0]=e[u],i[1]=e[u+1],i[2]=e[l],i[3]=e[l+1],i[4]=e[d],i[5]=e[d+1],o.contains(a.x,a.y))return!0}return!1}},{key:"destroy",value:function(t){for(var e in this._glDatas){var i=this._glDatas[e];i.destroy?i.destroy():(i.vertexBuffer&&(i.vertexBuffer.destroy(),i.vertexBuffer=null),i.indexBuffer&&(i.indexBuffer.destroy(),i.indexBuffer=null),i.uvBuffer&&(i.uvBuffer.destroy(),i.uvBuffer=null),i.vao&&(i.vao.destroy(),i.vao=null))}this._glDatas=null,r(h.prototype.__proto__||Object.getPrototypeOf(h.prototype),"destroy",this).call(this,t)}},{key:"texture",get:function(){return this._texture},set:function(t){this._texture!==t&&(this._texture=t,t&&(t.baseTexture.hasLoaded?this._onTextureUpdate():t.once("update",this._onTextureUpdate,this)))}},{key:"tint",get:function(){return Tiny.rgb2hex(this.tintRgb)},set:function(t){this.tintRgb=Tiny.hex2rgb(t,this.tintRgb)}},{key:"canvasDrawTimes",get:function(){return this._canvasDrawTimes||1},set:function(t){this._canvasDrawTimes=t>10?10:(t<0?1:0|t)||1}}]),h}(Tiny.Container);h.DRAW_MODES={TRIANGLE_MESH:0,TRIANGLES:1},h.defaults={canvasPadding:0};var f=Tiny.glCore,u=Tiny.Matrix.IDENTITY,l=function(t){function r(t){e(this,r);var i=s(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,t));return i.shader=null,i}return n(r,t),i(r,[{key:"onContextChange",value:function(){var t=this.renderer.gl;this.shader=new Tiny.Shader(t,"attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\nuniform mat3 translationMatrix;\nuniform mat3 uTransform;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void) {\n    gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n\n    vTextureCoord = (uTransform * vec3(aTextureCoord, 1.0)).xy;\n}","varying vec2 vTextureCoord;\nuniform vec4 uColor;\n\nuniform sampler2D uSampler;\n\nvoid main(void) {\n    gl_FragColor = texture2D(uSampler, vTextureCoord) * uColor;\n}")}},{key:"render",value:function(t){var e=this.renderer,i=e.gl,r=t._texture;if(r.valid){var n=t._glDatas[e.CONTEXT_UID];n||(e.bindVao(null),(n={shader:this.shader,vertexBuffer:f.GLBuffer.createVertexBuffer(i,t.vertices,i.STREAM_DRAW),uvBuffer:f.GLBuffer.createVertexBuffer(i,t.uvs,i.STREAM_DRAW),indexBuffer:f.GLBuffer.createIndexBuffer(i,t.indices,i.STATIC_DRAW),vao:null,dirty:t.dirty,indexDirty:t.indexDirty,vertexDirty:t.vertexDirty}).vao=new f.VertexArrayObject(i).addIndex(n.indexBuffer).addAttribute(n.vertexBuffer,n.shader.attributes.aVertexPosition,i.FLOAT,!1,8,0).addAttribute(n.uvBuffer,n.shader.attributes.aTextureCoord,i.FLOAT,!1,8,0),t._glDatas[e.CONTEXT_UID]=n),e.bindVao(n.vao),t.dirty!==n.dirty&&(n.dirty=t.dirty,n.uvBuffer.upload(t.uvs)),t.indexDirty!==n.indexDirty&&(n.indexDirty=t.indexDirty,n.indexBuffer.upload(t.indices)),t.vertexDirty!==n.vertexDirty&&(n.vertexDirty=t.vertexDirty,n.vertexBuffer.upload(t.vertices)),e.bindShader(n.shader),n.shader.uniforms.uSampler=e.bindTexture(r),e.state.setBlendMode(Tiny.correctBlendMode(t.blendMode,r.baseTexture.premultipliedAlpha)),n.shader.uniforms.uTransform&&(t.uploadUvTransform?n.shader.uniforms.uTransform=t._uvTransform.mapCoord.toArray(!0):n.shader.uniforms.uTransform=u.toArray(!0)),n.shader.uniforms.translationMatrix=t.worldTransform.toArray(!0),n.shader.uniforms.uColor=Tiny.premultiplyRgba(t.tintRgb,t.worldAlpha,n.shader.uniforms.uColor,r.baseTexture.premultipliedAlpha);var s=t.drawMode===h.DRAW_MODES.TRIANGLE_MESH?i.TRIANGLE_STRIP:i.TRIANGLES;n.vao.draw(s,t.indices.length,0)}}}]),r}(Tiny.ObjectRenderer);Tiny.WebGLRenderer.registerPlugin("mesh",l);var d=function(){function t(i){e(this,t),this.renderer=i}return i(t,[{key:"render",value:function(t){var e=this.renderer,i=e.context,r=t.worldTransform,n=e.resolution;e.roundPixels?i.setTransform(r.a*n,r.b*n,r.c*n,r.d*n,r.tx*n|0,r.ty*n|0):i.setTransform(r.a*n,r.b*n,r.c*n,r.d*n,r.tx*n,r.ty*n),e.context.globalAlpha=t.worldAlpha,e.setBlendMode(t.blendMode),t.drawMode===h.DRAW_MODES.TRIANGLE_MESH?this._renderTriangleMesh(t):this._renderTriangles(t)}},{key:"_renderTriangleMesh",value:function(t){for(var e=t.vertices.length/2,i=0;i<e-2;i++){var r=2*i;this._renderDrawTriangle(t,r,r+2,r+4)}}},{key:"_renderTriangles",value:function(t){for(var e=t.indices,i=e.length,r=0;r<i;r+=3){var n=2*e[r],s=2*e[r+1],a=2*e[r+2];this._renderDrawTriangle(t,n,s,a)}}},{key:"_renderDrawTriangle",value:function(t,e,i,r){var n=this.renderer.context,s=t.uvs,a=t.vertices,o=t._texture;if(o.valid){var h=o.baseTexture,f=h.width,u=h.height,l=h.source,d=void 0,c=void 0,v=void 0,m=void 0,p=void 0,g=void 0;if(t.uploadUvTransform){var y=t._uvTransform.mapCoord;d=(s[e]*y.a+s[e+1]*y.c+y.tx)*h.width,c=(s[i]*y.a+s[i+1]*y.c+y.tx)*h.width,v=(s[r]*y.a+s[r+1]*y.c+y.tx)*h.width,m=(s[e]*y.b+s[e+1]*y.d+y.ty)*h.height,p=(s[i]*y.b+s[i+1]*y.d+y.ty)*h.height,g=(s[r]*y.b+s[r+1]*y.d+y.ty)*h.height}else d=s[e]*h.width,c=s[i]*h.width,v=s[r]*h.width,m=s[e+1]*h.height,p=s[i+1]*h.height,g=s[r+1]*h.height;var _=a[e],T=a[i],w=a[r],x=a[e+1],b=a[i+1],A=a[r+1],M=t.canvasPadding/this.renderer.resolution;if(M>0){var D=M/Math.abs(t.worldTransform.a),O=M/Math.abs(t.worldTransform.d),k=(_+T+w)/3,P=(x+b+A)/3,U=_-k,S=x-P,R=Math.sqrt(U*U+S*S);_=k+U/R*(R+D),x=P+S/R*(R+O),U=T-k,S=b-P,R=Math.sqrt(U*U+S*S),T=k+U/R*(R+D),b=P+S/R*(R+O),U=w-k,S=A-P,R=Math.sqrt(U*U+S*S),w=k+U/R*(R+D),A=P+S/R*(R+O)}n.save(),n.beginPath(),n.moveTo(_,x),n.lineTo(T,b),n.lineTo(w,A),n.closePath(),n.clip();var C=d*p+m*v+c*g-p*v-m*c-d*g,B=_*p+m*w+T*g-p*w-m*T-_*g,N=d*T+_*v+c*w-T*v-_*c-d*w,L=d*p*w+m*T*v+_*c*g-_*p*v-m*c*w-d*T*g,I=x*p+m*A+b*g-p*A-m*b-x*g,E=d*b+x*v+c*A-b*v-x*c-d*A,F=d*p*A+m*b*v+x*c*g-x*p*v-m*c*A-d*b*g;n.transform(B/C,I/C,N/C,E/C,L/C,F/C),window.navigator.isAppXCanvasPlus&&"IMAGE"===l.tagName&&(l=window.navigator.canUseBinding?l.$realImage:l.src);for(var W=t.canvasDrawTimes;W>0;W--)n.drawImage(l,0,0,f*h.resolution,u*h.resolution,0,0,f,u);n.restore(),this.renderer.invalidateBlendMode()}}},{key:"renderMeshFlat",value:function(t){var e=this.renderer.context,i=t.vertices,r=i.length/2;e.beginPath();for(var n=1;n<r-2;++n){var s=2*n,a=i[s],o=i[s+1],h=i[s+2],f=i[s+3],u=i[s+4],l=i[s+5];e.moveTo(a,o),e.lineTo(h,f),e.lineTo(u,l)}e.fillStyle="#FF0000",e.fill(),e.closePath()}},{key:"destroy",value:function(){this.renderer=null}}]),t}();Tiny.CanvasRenderer.registerPlugin("mesh",d);var c=function(t){function r(t,i,n){e(this,r);var a=s(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,t));return a._ready=!0,a.verticesX=i||10,a.verticesY=n||10,a.drawMode=h.DRAW_MODES.TRIANGLES,a.refresh(),a}return n(r,t),i(r,[{key:"_refresh",value:function(){for(var t=this._texture,e=this.verticesX*this.verticesY,i=[],r=[],n=[],s=this.verticesX-1,a=this.verticesY-1,o=t.width/s,h=t.height/a,f=0;f<e;f++){var u=f%this.verticesX,l=f/this.verticesX|0;i.push(u*o,l*h),r.push(u/s,l/a)}for(var d=s*a,c=0;c<d;c++){var v=c%s,m=c/s|0,p=m*this.verticesX+v,g=m*this.verticesX+v+1,y=(m+1)*this.verticesX+v,_=(m+1)*this.verticesX+v+1;n.push(p,g,y),n.push(g,_,y)}this.vertices=new Float32Array(i),this.uvs=new Float32Array(r),this.colors=new Float32Array([]),this.indices=new Uint16Array(n),this.dirty++,this.indexDirty++,this.multiplyUvs()}},{key:"_onTextureUpdate",value:function(){h.prototype._onTextureUpdate.call(this),this._ready&&this.refresh()}}]),r}(h),v=10,m=function(t){function a(t,i,r,n,o){e(this,a);var h=s(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,t,4,4));return h._origWidth=t.orig.width,h._origHeight=t.orig.height,h._width=h._origWidth,h._height=h._origHeight,h._leftWidth=void 0!==i?i:v,h._rightWidth=void 0!==n?n:v,h._topHeight=void 0!==r?r:v,h._bottomHeight=void 0!==o?o:v,h._cachedTint=16777215,h._tintedTexture=null,h._canvasUvs=null,h.refresh(!0),h}return n(a,t),i(a,[{key:"updateHorizontalVertices",value:function(){var t=this.vertices,e=this._topHeight+this._bottomHeight,i=this._height>e?1:this._height/e;t[9]=t[11]=t[13]=t[15]=this._topHeight*i,t[17]=t[19]=t[21]=t[23]=this._height-this._bottomHeight*i,t[25]=t[27]=t[29]=t[31]=this._height}},{key:"updateVerticalVertices",value:function(){var t=this.vertices,e=this._leftWidth+this._rightWidth,i=this._width>e?1:this._width/e;t[2]=t[10]=t[18]=t[26]=this._leftWidth*i,t[4]=t[12]=t[20]=t[28]=this._width-this._rightWidth*i,t[6]=t[14]=t[22]=t[30]=this._width}},{key:"_renderCanvas",value:function(t){var e=t.context,i=this.worldTransform,r=t.resolution,n=16777215!==this.tint,s=this._texture;n&&this._cachedTint!==this.tint&&(this._cachedTint=this.tint,this._tintedTexture=Tiny.CanvasTinter.getTintedTexture(this,this.tint));var a=n?this._tintedTexture:s.baseTexture.source;window.navigator.isAppXCanvasPlus&&"IMAGE"===a.tagName&&(a=window.navigator.canUseBinding?a.$realImage:a.src),this._canvasUvs||(this._canvasUvs=[0,0,0,0,0,0,0,0]);var o=this.vertices,h=this._canvasUvs,f=n?0:s.frame.x,u=n?0:s.frame.y,l=f+s.frame.width,d=u+s.frame.height;h[0]=f,h[1]=f+this._leftWidth,h[2]=l-this._rightWidth,h[3]=l,h[4]=u,h[5]=u+this._topHeight,h[6]=d-this._bottomHeight,h[7]=d;for(var c=0;c<8;c++)h[c]*=s.baseTexture.resolution;e.globalAlpha=this.worldAlpha,t.setBlendMode(this.blendMode),t.roundPixels?e.setTransform(i.a*r,i.b*r,i.c*r,i.d*r,i.tx*r|0,i.ty*r|0):e.setTransform(i.a*r,i.b*r,i.c*r,i.d*r,i.tx*r,i.ty*r);for(var v=0;v<3;v++)for(var m=0;m<3;m++){var p=2*m+8*v,g=Math.max(1,h[m+1]-h[m]),y=Math.max(1,h[v+5]-h[v+4]),_=Math.max(1,o[p+10]-o[p]),T=Math.max(1,o[p+11]-o[p+1]);e.drawImage(a,h[m],h[v+4],g,y,o[p],o[p+1],_,T)}}},{key:"_refresh",value:function(){r(a.prototype.__proto__||Object.getPrototypeOf(a.prototype),"_refresh",this).call(this);var t=this.uvs,e=this._texture;this._origWidth=e.orig.width,this._origHeight=e.orig.height;var i=1/this._origWidth,n=1/this._origHeight;t[0]=t[8]=t[16]=t[24]=0,t[1]=t[3]=t[5]=t[7]=0,t[6]=t[14]=t[22]=t[30]=1,t[25]=t[27]=t[29]=t[31]=1,t[2]=t[10]=t[18]=t[26]=i*this._leftWidth,t[4]=t[12]=t[20]=t[28]=1-i*this._rightWidth,t[9]=t[11]=t[13]=t[15]=n*this._topHeight,t[17]=t[19]=t[21]=t[23]=1-n*this._bottomHeight,this.updateHorizontalVertices(),this.updateVerticalVertices(),this.dirty++,this.multiplyUvs()}},{key:"width",get:function(){return this._width},set:function(t){this._width=t,this._refresh()}},{key:"height",get:function(){return this._height},set:function(t){this._height=t,this._refresh()}},{key:"leftWidth",get:function(){return this._leftWidth},set:function(t){this._leftWidth=t,this._refresh()}},{key:"rightWidth",get:function(){return this._rightWidth},set:function(t){this._rightWidth=t,this._refresh()}},{key:"topHeight",get:function(){return this._topHeight},set:function(t){this._topHeight=t,this._refresh()}},{key:"bottomHeight",get:function(){return this._bottomHeight},set:function(t){this._bottomHeight=t,this._refresh()}}]),a}(c),p=function(t){function r(t,i){e(this,r);var n=s(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,t));return n.points=i,n.vertices=new Float32Array(4*i.length),n.uvs=new Float32Array(4*i.length),n.colors=new Float32Array(2*i.length),n.indices=new Uint16Array(2*i.length),n.autoUpdate=!0,n.refresh(),n}return n(r,t),i(r,[{key:"_refresh",value:function(){var t=this.points;if(!(t.length<1)&&this._texture._uvs){this.vertices.length/4!==t.length&&(this.vertices=new Float32Array(4*t.length),this.uvs=new Float32Array(4*t.length),this.colors=new Float32Array(2*t.length),this.indices=new Uint16Array(2*t.length));var e=this.uvs,i=this.indices,r=this.colors;e[0]=0,e[1]=0,e[2]=0,e[3]=1,r[0]=1,r[1]=1,i[0]=0,i[1]=1;for(var n=t.length,s=1;s<n;s++){var a=4*s,o=s/(n-1);e[a]=o,e[a+1]=0,e[a+2]=o,e[a+3]=1,r[a=2*s]=1,r[a+1]=1,i[a=2*s]=a,i[a+1]=a+1}this.dirty++,this.indexDirty++,this.multiplyUvs(),this.refreshVertices()}}},{key:"refreshVertices",value:function(){var t=this.points;if(!(t.length<1))for(var e=t[0],i=void 0,r=0,n=0,s=this.vertices,a=t.length,o=0;o<a;o++){var h=t[o],f=4*o;i=o<t.length-1?t[o+1]:h,n=-(i.x-e.x),r=i.y-e.y;var u=Math.sqrt(r*r+n*n),l=this._texture.height/2;r/=u,n/=u,r*=l,n*=l,s[f]=h.x+r,s[f+1]=h.y+n,s[f+2]=h.x-r,s[f+3]=h.y-n,e=h}}},{key:"updateTransform",value:function(){this.autoUpdate&&this.refreshVertices(),this.containerUpdateTransform()}}]),r}(h);t.Mesh=h,t.MeshRenderer=l,t.CanvasMeshRenderer=d,t.Plane=c,t.NineSlicePlane=m,t.Rope=p,Object.defineProperty(t,"__esModule",{value:!0})}(e)}(f={exports:{}},f.exports),f.exports),d=(u=l)&&u.__esModule&&Object.prototype.hasOwnProperty.call(u,"default")?u.default:u,c=function(){function t(i){e(this,t),this.data=i,this.createRuntimeMap(),this.isPlaying=!0,this.isLooping=!0,this.animBlendFactor=0,this.animBlendDelta=0,this.renderPoints=new Array(this.data.points.length),this.renderUvs=new Array(this.data.uvs.length),this.renderColors=new Array(this.data.points.length/2*4);for(var r=0;r<this.renderColors.length;r++)this.renderColors[r]=1;for(var n=0;n<this.renderUvs.length;n++)this.renderUvs[n]=this.data.uvs[n]}return i(t,[{key:"createRuntimeMap",value:function(){this.runTimeMap={};var t=!1;for(var e in this.data.animClipMap){!1===t&&(t=!0,this.activeAnimationName=e,this.prevAnimationName=e);var i=this.data.animClipMap[e];this.runTimeMap[e]=i.startTime}}},{key:"setActiveAnimation",value:function(t){this.runTimeMap.hasOwnProperty(t)&&(this.activeAnimationName=t,this.prevAnimationName=t,this.runTimeMap[this.activeAnimationName]=this.data.animClipMap[this.activeAnimationName].startTime)}},{key:"blendToAnimation",value:function(t,e){this.prevAnimationName=this.activeAnimationName,this.activeAnimationName=t,this.animBlendFactor=0,this.animBlendDelta=e}},{key:"setRunTime",value:function(t){this.runTimeMap[this.activeAnimationName]=this.data.animClipMap[this.activeAnimationName].correctTime(t,this.isLooping)}},{key:"getRunTime",value:function(){return this.runTimeMap[this.activeAnimationName]}},{key:"stepTime",value:function(t){this.setRunTime(this.getRunTime()+t),this.animBlendFactor+=this.animBlendDelta,this.animBlendFactor>1&&(this.animBlendFactor=1)}},{key:"interpScalar",value:function(t,e,i){return(1-i)*t+i*e}},{key:"syncRenderData",value:function(){if(this.activeAnimationName===this.prevAnimationName)for(var t=this.data.animClipMap[this.activeAnimationName],e=t.sampleTime(this.getRunTime()),i=t.timeSamplesMap[e[0]],r=t.timeSamplesMap[e[1]],n=this.data.fileData[i.getAnimPointsOffset()],s=this.data.fileData[r.getAnimPointsOffset()],a=0;a<this.renderPoints.length;a++){var o=n[a],h=s[a];this.renderPoints[a]=this.interpScalar(o,h,e[2])}else for(var f=this.data.animClipMap[this.activeAnimationName],u=f.sampleTime(this.getRunTime()),l=f.timeSamplesMap[u[0]],d=f.timeSamplesMap[u[1]],c=this.data.fileData[l.getAnimPointsOffset()],v=this.data.fileData[d.getAnimPointsOffset()],m=this.data.animClipMap[this.prevAnimationName],p=m.sampleTime(this.getRunTime()),g=m.timeSamplesMap[p[0]],y=m.timeSamplesMap[p[1]],_=this.data.fileData[g.getAnimPointsOffset()],T=this.data.fileData[y.getAnimPointsOffset()],w=0;w<this.renderPoints.length;w++){var x=c[w],b=v[w],A=this.interpScalar(x,b,u[2]),M=_[w],D=T[w],O=this.interpScalar(M,D,p[2]);this.renderPoints[w]=this.interpScalar(O,A,this.animBlendFactor)}var k=this.data.animClipMap[this.activeAnimationName],P=k.sampleTime(this.getRunTime()),U=k.timeSamplesMap[P[0]],S=k.timeSamplesMap[P[1]],R=this.data.fileData[U.getAnimColorsOffset()],C=this.data.fileData[S.getAnimColorsOffset()];if(R.length===this.renderColors.length&&C.length===this.renderColors.length)for(var B=0;B<this.renderColors.length;B++){var N=R[B],L=C[B];this.renderColors[B]=this.interpScalar(N,L,P[2])/255}var I=this.data.animClipMap[this.activeAnimationName],E=I.sampleTime(this.getRunTime()),F=I.timeSamplesMap[E[0]],W=this.data.fileData[F.getAnimUvsOffset()];if(W.length===this.renderUvs.length)for(var j=0;j<this.renderUvs.length;j++)this.renderUvs[j]=W[j]}}]),t}(),v=d.Mesh,m=function(t){function n(t,i){e(this,n);var s=r(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,i));s.packData=t,s.packRenderer=new c(s.packData),s.texture=i,s.blendMode=Tiny.BLEND_MODES.NORMAL,s.creatureBoundsMin=new Tiny.Point(0,0),s.creatureBoundsMax=new Tiny.Point(0,0),s.vertices=new Float32Array(s.packRenderer.renderPoints.length),s.uvs=new Float32Array(s.packRenderer.renderUvs.length),s.indices=new Uint16Array(s.packData.indices.length);for(var a=0;a<s.indices.length;a++)s.indices[a]=s.packData.indices[a];return s.colors=new Float32Array([1,1,1,1]),s.updateRenderData(s.packData.points,s.packData.uvs),s.drawMode=v.DRAW_MODES.TRIANGLES,s}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(n,v),i(n,[{key:"_refresh",value:function(){this.packRenderer.syncRenderData();var t=this.packRenderer,e=t.renderPoints,i=t.renderUvs;this.updateRenderData(e,i),this.dirty++}},{key:"updateRenderData",value:function(t,e){for(var i=this.packRenderer,r=i.renderPoints,n=i.renderUvs,s=0;s<r.length;s+=2)this.vertices[s]=r[s],this.vertices[s+1]=-r[s+1],this.uvs[s]=n[s],this.uvs[s+1]=n[s+1]}}]),n}();t.CreaturePackLoader=h,t.CreaturePackRenderer=m,Object.defineProperty(t,"__esModule",{value:!0})});
