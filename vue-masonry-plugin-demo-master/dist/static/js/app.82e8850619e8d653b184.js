webpackJsonp([1],{100:function(e,t){},101:function(e,t){},102:function(e,t){},110:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("hello")],1)},staticRenderFns:[]}},111:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"hello",attrs:{id:"app"}},[n("div",{staticClass:"grid"},[n("div",{staticClass:"form login"},[n("div",{directives:[{name:"show",rawName:"v-show",value:""==e.einsteinInfoId,expression:"einsteinInfoId == ''"}]},[n("div",{staticClass:"form__field",attrs:{"data-v-75a60854":""}},[n("input",{staticClass:"form__input",attrs:{"data-v-75a60854":"",id:"Keyword",type:"text",name:"Keyword",placeholder:"Keyword",required:"required"},domProps:{value:e.searchStr},on:{input:function(t){return e.changeSearchStr(t.target.value)}}}),e._v(" "),n("select",{staticStyle:{margin:"0px 10px",top:"0px",position:"relative",width:"0px"},domProps:{value:e.searchCount},on:{input:function(t){return e.changeSearchCount(t.target.value)}}},[n("option",{attrs:{value:"25",selected:"selected"}},[e._v("25장")]),e._v(" "),n("option",{attrs:{value:"50"}},[e._v("50장")]),e._v(" "),n("option",{attrs:{value:"100"}},[e._v("100장")])]),e._v(" "),n("button",{staticClass:"submit",staticStyle:{width:"auto"},on:{click:function(t){return e.search()}}},[e._v("Search")])]),e._v(" "),n("div",{staticStyle:{"font-size":"30px"}},[e._v("\n          인기 검색어\n        ")])])])]),e._v(" "),n("div",{staticClass:"search-keywords"},[n("ul",{staticClass:"simple-tabs"},e._l(e.searchKeywords,function(t,a){return n("li",{key:a,on:{click:function(n){return e.searchThisKeyword(t.text)}}},[n("span",[e._v(e._s(t.text))]),e._v(" "),n("span",[e._v(e._s(t.count))])])}),0)]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:""!=e.einsteinInfoId,expression:"einsteinInfoId != ''"}],staticClass:"whiteText"},[n("h1",[e._v("モデル作成 完了")]),e._v(" "),n("h3",[e._v("Salesforce SObject Id :")]),e._v(" "),n("h3",[e._v(e._s(e.einsteinInfoId))])]),e._v(" "),n("br"),n("br"),e._v(" "),n("ul",{staticClass:"simple-tabs",attrs:{id:"images-tabs"}},e._l(e.imagesLabels,function(t,a){return n("li",{key:a},e._l(t,function(t,a){return n("span",{key:a,on:{click:function(t){return e.clickTab(a,t)}}},[e._v(e._s(a))])}),0)}),0),e._v(" "),n("div",{directives:[{name:"masonry",rawName:"v-masonry"}],staticClass:"masonry-container",attrs:{"transition-duration":"1s","item-selector":".imageDiv",id:"masonry-container"}},e._l(e.localImagesBlocks,function(t,a){return n("div",{directives:[{name:"masonry-tile",rawName:"v-masonry-tile"}],key:a,staticClass:"imageDiv"},[n("a",{directives:[{name:"show",rawName:"v-show",value:t.loaded,expression:"item.loaded"}],class:["checked"===t.checked?"active":""],staticStyle:{display:"flex"},attrs:{"data-index":[a]}},[n("img",{staticClass:"image",attrs:{src:t.url||t.thumb,onerror:e.imgError(t)},on:{click:function(){e.clickImage(a)}}}),e._v(" "),n("input",{staticClass:"checkbox",attrs:{type:"checkbox"},domProps:{checked:t.checked}})])])}),0),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.loadingIconFlag,expression:"loadingIconFlag"}],staticClass:"layer"},[n("div",{staticClass:"layerText"},[e._v(e._s(e.downloadAjaxText))]),e._v(" "),n("div",{staticClass:"spinner"})]),e._v(" "),e.localImagesBlocks?n("vue-image-slider",{directives:[{name:"show",rawName:"v-show",value:e.imagePopupFlag,expression:"imagePopupFlag"}],staticClass:"vue-image-slider",attrs:{images:e.localImagesBlocks.map(function(e){return e.url}),imageIndex:e.imageIndex,intervalVal:3e3}}):e._e(),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.imagePopupFlag,expression:"imagePopupFlag"}],staticClass:"vue-image-slider-close",on:{click:e.clickImage}},[e._v("X")])],1)},staticRenderFns:[]}},112:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"container",style:e.imgSize},[n("transition-group",{attrs:{name:"fade",tag:"div"}},e._l([e.currentIndex],function(t){return n("div",{key:t,style:e.imgSize},[n("img",{attrs:{src:e.currentImg}})])}),0),e._v(" "),n("a",{staticClass:"prev",attrs:{href:"#"},on:{click:e.prev}},[e._v("❮")]),e._v(" "),n("a",{staticClass:"next",attrs:{href:"#"},on:{click:e.next}},[e._v("❯")])],1)},staticRenderFns:[]}},116:function(e,t,n){function a(e){var t=o[e];return t?Promise.all(t.slice(1).map(n.e)).then(function(){return n(t[0])}):Promise.reject(new Error("Cannot find module '"+e+"'."))}var o={"./Hello.vue":[31],"./VueImageSlider.vue":[32]};a.keys=function(){return Object.keys(o)},e.exports=a,a.id=116},20:function(e,t,n){"use strict";n.d(t,"a",function(){return a});var a={CHANGE_SEARCH_STR:"CHANGE_SEARCH_STR",CHANGE_SEARCH_COUNT:"CHANGE_SEARCH_COUNT",CHANGE_DOWNLOAD_PATH:"CHANGE_DOWNLOAD_PATH",DOWNLOAD_IMAGES:"DOWNLOAD_IMAGES",SEARCH_IMAGES_FROM_GOOGLE:"SEARCH_IMAGES_FROM_GOOGLE",LOAD_IMAGES_FROM_FIREBASE:"LOAD_IMAGES_FROM_FIREBASE",CHANGE_LOADING_ICON_FLAG:"CHANGE_LOADING_ICON_FLAG",CHANGE_SHOW_TAB_NAME:"CHANGE_SHOW_TAB_NAME",CHANGE_IMAGE_CHECK:"CHANGE_IMAGE_CHECK",IMAGE_LOAD_FAIL:"IMAGE_LOAD_FAIL",CHANGE_DOWNLOAD_AJAX_TEXT:"CHANGE_DOWNLOAD_AJAX_TEXT",CHANGE_USERNAME:"CHANGE_USERNAME",CHANGE_PASSWORD:"CHANGE_PASSWORD",LOGIN_AJAX:"LOGIN_AJAX",CHANGE_CONNECT_SERVER_TYPE:"CHANGE_CONNECT_SERVER_TYPE",CHANGE_ACCESS_TOKEN:"CHANGE_ACCESS_TOKEN",SAVE_SOCKET_ID:"SAVE_SOCKET_ID",CHANGE_EINSTEIN_INFO_ID:"CHANGE_EINSTEIN_INFO_ID"}},31:function(e,t,n){function a(e){n(101),n(100)}var o=n(11)(n(57),n(111),a,"data-v-75a60854",null);e.exports=o.exports},32:function(e,t,n){function a(e){n(102)}var o=n(11)(n(58),n(112),a,null,null);e.exports=o.exports},34:function(e,t,n){"use strict";function a(e){return function(){return n(116)("./"+e+".vue")}}var o=n(3),s=n(114);o.a.use(s.a),t.a=new s.a({mode:"history",scrollBehavior:function(){return{y:0}},routes:[{path:"/",component:a("Hello")},{path:"*",component:a("Error404")}]})},35:function(e,t,n){"use strict";var a=n(3),o=n(33),s=n(61);a.a.use(o.a),t.a=new o.a.Store({modules:{mapStore:s.a,strict:!1}})},36:function(e,t,n){function a(e){n(99)}var o=n(11)(n(56),n(110),a,null,null);e.exports=o.exports},55:function(e,t){e.exports={_from:"axios@^0.21.1",_id:"axios@0.21.4",_inBundle:!1,_integrity:"sha512-ut5vewkiu8jjGBdqpM44XxjuCjq9LAKeHVmoVfHVzy8eHgxxq8SbAVQNovDA8mVi05kP0Ea/n/UzcSHcTJQfNg==",_location:"/axios",_phantomChildren:{},_requested:{type:"range",registry:!0,raw:"axios@^0.21.1",name:"axios",escapedName:"axios",rawSpec:"^0.21.1",saveSpec:null,fetchSpec:"^0.21.1"},_requiredBy:["/"],_resolved:"https://registry.npmjs.org/axios/-/axios-0.21.4.tgz",_shasum:"c67b90dc0568e5c1cf2b0b858c43ba28e2eda575",_spec:"axios@^0.21.1",_where:"C:\\Users\\pc\\Documents\\vue-images-scraper\\vue-masonry-plugin-demo-master",author:{name:"Matt Zabriskie"},browser:{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},bugs:{url:"https://github.com/axios/axios/issues"},bundleDependencies:!1,bundlesize:[{path:"./dist/axios.min.js",threshold:"5kB"}],dependencies:{"follow-redirects":"^1.14.0"},deprecated:!1,description:"Promise based HTTP client for the browser and node.js",devDependencies:{coveralls:"^3.0.0","es6-promise":"^4.2.4",grunt:"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1",karma:"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2",minimist:"^1.2.0",mocha:"^8.2.1",sinon:"^4.5.0","terser-webpack-plugin":"^4.2.3",typescript:"^4.0.5","url-search-params":"^0.10.0",webpack:"^4.44.2","webpack-dev-server":"^3.11.0"},homepage:"https://axios-http.com",jsdelivr:"dist/axios.min.js",keywords:["xhr","http","ajax","promise","node"],license:"MIT",main:"index.js",name:"axios",repository:{type:"git",url:"git+https://github.com/axios/axios.git"},scripts:{build:"NODE_ENV=production grunt build",coveralls:"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",examples:"node ./examples/server.js",fix:"eslint --fix lib/**/*.js",postversion:"git push && git push --tags",preversion:"npm test",start:"node ./sandbox/server.js",test:"grunt test",version:"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"},typings:"./index.d.ts",unpkg:"dist/axios.min.js",version:"0.21.4"}},56:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(31),o=n.n(a);t.default={name:"app",components:{Hello:o.a}}},57:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a,o=n(65),s=n.n(o),i=n(67),r=n.n(i),c=n(3),u=n(20),l=n(33),d=n(113),_=n(32),h=n.n(_),A=!1;c.a.use(d.a),t.default={name:"hello",data:function(){return{msg:"Welcome to Your Vue.js App",localImagesBlocks:[],searchKeywords:[],imagePopupFlag:!1,imageIndex:0}},components:{VueImageSlider:h.a},computed:r()({searchStr:{get:function(){return this.$store.getters.getSearchStr},set:function(e){this.$store.dispatch(u.a.CHANGE_SEARCH_STR,e)}},searchCount:{get:function(){return this.$store.getters.getSearchCount},set:function(e){this.$store.dispatch(u.a.CHANGE_SEARCH_COUNT,e)}},rootDownloadPath:{get:function(){return this.$store.getters.getRootDownloadPath},set:function(e){this.$store.dispatch(u.a.CHANGE_DOWNLOAD_PATH,e)}},username:{get:function(){return this.$store.getters.getUsername},set:function(e){this.$store.dispatch(u.a.CHANGE_USERNAME,e)}},password:{get:function(){return this.$store.getters.getPassword},set:function(e){this.$store.dispatch(u.a.CHANGE_PASSWORD,e)}}},n.i(l.b)({imagesBlocks:"getImagesBlocks",allImagesBlocks:"getAllImagesBlocks",loadingIconFlag:"getLoadingIconFlag",showTabName:"getShowTabName",downloadAjaxText:"getDownloadAjaxText",imagesLabels:"getImagesLabels",connectServerType:"getConnectServerType",accessToken:"getAccessToken",einsteinInfoId:"getEinsteinInfoId"})),watch:{imagesBlocks:function(e){console.log("watch!!!!!!!!!!!!!!!!!!"),this.localImagesBlocks=e}},mounted:function(){var e=this;window.lockToHideLayer=!1,window.downloadCompleteCount=0,window.DATABASE=firebase.database(),console.log(DATABASE),window.DATABASE.ref("/keywords").on("value",function(t){function n(e,t){return e.count<t.count?1:e.count>t.count?-1:0}var a=t.val();window.DB_DATA=s()(a).map(function(e){return a[e]}),window.DB_DATA_IDS=s()(a).map(function(e){return{id:e,text:a[e].text,count:a[e].count}}),window.DB_DATA.sort(n),e.searchKeywords=window.DB_DATA.slice(0,10)})},methods:{imgError:function(e){var t=new Image,n=this;t.onerror=function(t){t.target.width||n.$store.dispatch(u.a.IMAGE_LOAD_FAIL,e.index)},t.src=e.url},reDraw:function(){this.$redrawVueMasonry({horizontalOrder:!1})},changeSearchStr:function(e){this.searchStr=e},changeSearchCount:function(e){this.searchCount=e},changerootDownloadPath:function(e){this.rootDownloadPath=e},search:function(){var e=this,t=window.DB_DATA_IDS.filter(function(t){return t.text==e.searchStr});0!=t.length?window.DATABASE.ref("keywords/"+t[0].id).set({text:e.searchStr,count:parseInt(t[0].count)+1}):window.DATABASE.ref("keywords/").push({text:e.searchStr,count:1}),e.$store.dispatch(u.a.CHANGE_LOADING_ICON_FLAG),window.DATABASE.ref("/"+e.searchStr).on("value",function(t){var n=t.val();if(console.log(n),n){var a=s()(n).map(function(e){return n[e]});e.$store.dispatch(u.a.LOAD_IMAGES_FROM_FIREBASE,a[0])}else window.lockToHideLayer=!0,e.$store.dispatch(u.a.SEARCH_IMAGES_FROM_GOOGLE)})},downloadImages:function(e){e.target.classList.contains("disableBtn")||(window.downloadCompleteCount=0,window.lockToHideLayer=!0,this.$store.dispatch(u.a.CHANGE_LOADING_ICON_FLAG),this.$store.dispatch(u.a.DOWNLOAD_IMAGES))},clickTab:function(e,t){if(A)return!1;A=!0;for(var n=document.querySelectorAll("#images-tabs .active"),a=0,o=n.length;a<o;a++)n[a].classList.contains("active")&&n[a].classList.remove("active");t.target.parentElement.classList.add("active");var s=this;s.$store.dispatch(u.a.CHANGE_SHOW_TAB_NAME,e),setTimeout(function(){s.reDraw(),setTimeout(function(){A=!1},1e3)},200)},changeUsername:function(e){this.username=e},changePassword:function(e){this.password=e},login:function(){this.$store.dispatch(u.a.LOGIN_AJAX)},changeConnectServerType:function(e){this.$store.dispatch(u.a.CHANGE_CONNECT_SERVER_TYPE,e)},searchThisKeyword:function(e){console.log(e),this.searchStr=e,this.search()},clickImage:function(e){console.log(e),this.imageIndex=e,this.imagePopupFlag=!this.imagePopupFlag,console.log(this.imagePopupFlag),this.imagePopupFlag?document.body.style.overflow="hidden":document.body.style.overflow="auto"}},updated:function(){var e=this;a&&clearTimeout(a),a=setTimeout(function(){e.loadingIconFlag&&(e.reDraw(),!1===window.lockToHideLayer&&e.$store.dispatch(u.a.CHANGE_LOADING_ICON_FLAG))},3e3)}}},58:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={name:"VueImageSlider",data:function(){return{timer:null,currentIndex:0}},watch:{imageIndex:function(e){console.log("changed imageIndex"),this.currentIndex=e,clearInterval(this.timer),this.timer=setInterval(this.next,this.intervalVal)}},props:{imageIndex:{type:Number,default:0},images:Array,intervalVal:Number,height:{type:Number,default:400},width:{type:Number,default:700}},mounted:function(){this.startSlide()},destroyed:function(){this.stopSlide()},methods:{startSlide:function(){this.timer=setInterval(this.next,this.intervalVal)},stopSlide:function(){clearInterval(this.timer)},next:function(){this.currentIndex+=1},prev:function(){this.currentIndex-=1}},computed:{currentImg:function(){return this.images[Math.abs(this.currentIndex)%this.images.length]},imgSize:function(){return{height:this.height+"px",width:this.width+"px"}}}}},59:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(3),o=n(34),s=n(35),i=n(36),r=n.n(i);a.a.config.productionTip=!1,new a.a({el:"#app",template:"<App/>",components:{App:r.a},router:o.a,store:s.a})},60:function(e,t,n){"use strict";var a=n(62),o=n.n(a),s=n(37),i=n.n(s);t.a=function(){return{searchGoogle:function(e,t,n){var a=i.a.create(),o="https://vue-image-scrapper.herokuapp.com/searchGoogle?keyword="+e.searchStr+"&count=200";i.a.all([a.get(o)]).then(function(e){var n=e.filter(function(e){return 200!==e.status});if(n.length<1)console.log("200 response= ",e[0]),t(e[0].data);else{var a=n.reduce(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments[1];return e+(t.status+" : ")+t.message+"\n"},"");console.warn(a)}},function(e){401===e.response.status?n(e.response.data):500===e.response.status?n(e.response.status):console.warn(e)})},downloadImages:function(e,t,n){var a=i.a.create(),s=o()(e.imagesBlocks);console.log(s);i.a.all([a.post("http://localhost:5000/downloadImages",{imagesURL:s,imagesLabels:e.imagesLabels,rootDownloadPath:e.rootDownloadPath,searchKeyword:e.searchStr,mytoken:e.accessToken})]).then(function(e){var n=e.filter(function(e){return 200!==e.status});if(n.length<1)console.log("200 response= ",e[0]),t(e[0].data);else{var a=n.reduce(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments[1];return e+(t.status+" : ")+t.message+"\n"},"");console.warn(a)}},function(e){401===e.response.status?n(e.response.data):500===e.response.status?n(e.response.status):console.warn(e)})},login:function(e,t,n){var a=i.a.create(),o="http://localhost:5000/login?username="+e.username+"&password="+e.password+"&connectServerType="+e.connectServerType;i.a.all([a.get(o)]).then(function(e){var n=e.filter(function(e){return 200!==e.status});if(n.length<1)console.log("200 response= ",e[0]),t(e[0].data);else{var a=n.reduce(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments[1];return e+(t.status+" : ")+t.message+"\n"},"");console.warn(a)}},function(e){n(e)})}}}},61:function(e,t,n){"use strict";var a,o,s=n(66),i=n.n(s),r=n(20),c=n(60),u={searchStr:"",searchCount:25,rootDownloadPath:"",imagesBlocks:[],loadingIconFlag:!1,showTabName:"",downloadAjaxText:"",imagesLabels:[],username:"",password:"",connectServerType:"Product",accessToken:"",einsteinInfoId:"",socketId:""},l={getSearchStr:function(){return u.searchStr},getSearchCount:function(){return u.searchCount},getRootDownloadPath:function(){return u.rootDownloadPath},getImagesBlocks:function(){var e=-1,t=0;u.imagesLabels.forEach(function(n){void 0!=n[u.showTabName]&&(e=t,console.log("show tab : "+u.showTabName)),t++});var n=u.imagesBlocks[e];return n&&(console.log(n.map(function(e){return e.loaded})),n=n.filter(function(e){return!1!==e.loaded})),n},getAllImagesBlocks:function(){return u.imagesBlocks},getLoadingIconFlag:function(){return u.loadingIconFlag},getShowTabName:function(){return u.showTabName},getDownloadAjaxText:function(){return u.downloadAjaxText},getImagesLabels:function(){return u.imagesLabels},getUsername:function(){return u.username},getPassword:function(){return u.password},getConnectServerType:function(){return u.connectServerType},getAccessToken:function(){return u.accessToken},getEinsteinInfoId:function(){return u.einsteinInfoId},getSocketId:function(){return u.socketId}},d=(a={},i()(a,r.a.CHANGE_SEARCH_STR,function(e,t){(0,e.commit)(r.a.CHANGE_SEARCH_STR,t)}),i()(a,r.a.CHANGE_SEARCH_COUNT,function(e,t){(0,e.commit)(r.a.CHANGE_SEARCH_COUNT,t)}),i()(a,r.a.CHANGE_DOWNLOAD_PATH,function(e,t){(0,e.commit)(r.a.CHANGE_DOWNLOAD_PATH,t)}),i()(a,r.a.LOAD_IMAGES_FROM_FIREBASE,function(e,t){var n=e.commit;n(r.a.CHANGE_SHOW_TAB_NAME,this.getters.getSearchStr),n(r.a.LOAD_IMAGES_FROM_FIREBASE,t)}),i()(a,r.a.SEARCH_IMAGES_FROM_GOOGLE,function(e){var t=e.commit;console.log("search images");var a=this;t(r.a.CHANGE_DOWNLOAD_AJAX_TEXT,"[ "+a.getters.getSearchStr+" ] 이미지검색중"),n.i(c.a)().searchGoogle(u,function(e){console.log("action / SEARCH_IMAGES_FROM_GOOGLE / success"),console.log("results= ",e),t(r.a.CHANGE_SHOW_TAB_NAME,a.getters.getSearchStr),t(r.a.SEARCH_IMAGES_FROM_GOOGLE,e),window.lockToHideLayer=!1},function(e){console.log("action / SEARCH_IMAGES_FROM_GOOGLE / error",e)})}),i()(a,r.a.IMAGE_LOAD_FAIL,function(e,t){(0,e.commit)(r.a.IMAGE_LOAD_FAIL,t)}),i()(a,r.a.DOWNLOAD_IMAGES,function(e){e.commit;console.log("download images");console.log(window.lockToHideLayer),n.i(c.a)().downloadImages(u,function(e){console.log("action / DOWNLOAD_IMAGES / success"),console.log("results= ",e)},function(e){console.log("action / DOWNLOAD_IMAGES / error",e)})}),i()(a,r.a.CHANGE_LOADING_ICON_FLAG,function(e){(0,e.commit)(r.a.CHANGE_LOADING_ICON_FLAG)}),i()(a,r.a.CHANGE_SHOW_TAB_NAME,function(e,t){(0,e.commit)(r.a.CHANGE_SHOW_TAB_NAME,t)}),i()(a,r.a.CHANGE_IMAGE_CHECK,function(e,t){(0,e.commit)(r.a.CHANGE_IMAGE_CHECK,t)}),i()(a,r.a.CHANGE_DOWNLOAD_AJAX_TEXT,function(e,t){(0,e.commit)(r.a.CHANGE_DOWNLOAD_AJAX_TEXT,t)}),i()(a,r.a.CHANGE_USERNAME,function(e,t){(0,e.commit)(r.a.CHANGE_USERNAME,t)}),i()(a,r.a.CHANGE_PASSWORD,function(e,t){(0,e.commit)(r.a.CHANGE_PASSWORD,t)}),i()(a,r.a.LOGIN_AJAX,function(e){var t=e.commit;console.log("LOGIN_AJAX");n.i(c.a)().login(u,function(e){console.log("action / LOGIN_AJAX / success"),console.log("results= ",e),t(r.a.CHANGE_ACCESS_TOKEN,e)},function(e){console.log("action / LOGIN_AJAX / error",e),t(r.a.CHANGE_ACCESS_TOKEN,"fail")})}),i()(a,r.a.CHANGE_CONNECT_SERVER_TYPE,function(e,t){(0,e.commit)(r.a.CHANGE_CONNECT_SERVER_TYPE,t)}),i()(a,r.a.CHANGE_ACCESS_TOKEN,function(e,t){(0,e.commit)(r.a.CHANGE_ACCESS_TOKEN,t)}),i()(a,r.a.CHANGE_EINSTEIN_INFO_ID,function(e,t){(0,e.commit)(r.a.CHANGE_EINSTEIN_INFO_ID,t)}),i()(a,r.a.SAVE_SOCKET_ID,function(e,t){(0,e.commit)(r.a.SAVE_SOCKET_ID,t)}),a),_=(o={},i()(o,r.a.CHANGE_SEARCH_STR,function(e,t){e.searchStr=t}),i()(o,r.a.CHANGE_SEARCH_COUNT,function(e,t){e.searchCount=t}),i()(o,r.a.CHANGE_DOWNLOAD_PATH,function(e,t){e.rootDownloadPath=t}),i()(o,r.a.IMAGE_LOAD_FAIL,function(e,t){console.log("IMAGE_LOAD_FAIL mutation : ",t);var n=-1,a=0;e.imagesLabels.forEach(function(t){void 0!=t[e.showTabName]&&(n=a,console.log("show tab : "+e.showTabName)),a++}),e.imagesBlocks[n].filter(function(e){return e.index==t})[0].loaded=!1}),i()(o,r.a.SEARCH_IMAGES_FROM_GOOGLE,function(e,t){var n=0;window.DATABASE.ref(""+e.searchStr).push(t),e.imagesBlocks.push(t.map(function(e){return n++,{index:n,height:e.height,thumb_height:e.thumb_height,thumb_url:e.thumb_url,thumb_width:e.thumb_width,type:e.type,url:e.url,width:e.width,loaded:!0,checked:"checked"}}));var a={};a[e.searchStr]=e.imagesBlocks.length-1,e.imagesLabels.push(a)}),i()(o,r.a.LOAD_IMAGES_FROM_FIREBASE,function(e,t){var n=0;e.imagesBlocks.push(t.map(function(e){return n++,{index:n,height:e.height,thumb_height:e.thumb_height,thumb_url:e.thumb_url,thumb_width:e.thumb_width,type:e.type,url:e.url,width:e.width,loaded:!0,checked:"checked"}}));var a={};a[e.searchStr]=e.imagesBlocks.length-1,e.imagesLabels.push(a)}),i()(o,r.a.CHANGE_LOADING_ICON_FLAG,function(e){console.log("state.loadingIconFlag : "+e.loadingIconFlag),e.loadingIconFlag=!e.loadingIconFlag}),i()(o,r.a.CHANGE_SHOW_TAB_NAME,function(e,t){e.showTabName=t}),i()(o,r.a.CHANGE_IMAGE_CHECK,function(e,t){var n=-1,a=0;e.imagesLabels.forEach(function(t){void 0!=t[e.showTabName]&&(n=a,console.log("show tab : "+e.showTabName)),a++}),e.imagesBlocks[n][t].checked="checked"===e.imagesBlocks[n][t].checked?"":"checked"}),i()(o,r.a.CHANGE_DOWNLOAD_AJAX_TEXT,function(e,t){e.downloadAjaxText=t}),i()(o,r.a.CHANGE_USERNAME,function(e,t){e.username=t}),i()(o,r.a.CHANGE_PASSWORD,function(e,t){e.password=t}),i()(o,r.a.CHANGE_CONNECT_SERVER_TYPE,function(e,t){e.connectServerType=t}),i()(o,r.a.CHANGE_ACCESS_TOKEN,function(e,t){e.accessToken=t}),i()(o,r.a.CHANGE_EINSTEIN_INFO_ID,function(e,t){e.einsteinInfoId=t}),i()(o,r.a.SAVE_SOCKET_ID,function(e,t){e.socketId=t}),o);t.a={state:u,getters:l,actions:d,mutations:_}},99:function(e,t){}},[59]);
//# sourceMappingURL=app.82e8850619e8d653b184.js.map