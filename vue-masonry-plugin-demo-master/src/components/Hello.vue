<template>
  <div id="app" class="hello">
    <!-- <h1>{{ msg }}</h1> -->

    <!-- <div class="grid">

      <div class="form login">
        <div v-show="einsteinInfoId == ''">
          <div data-v-75a60854="" class="form__field">
            <input data-v-75a60854="" id="Keyword" type="text" name="Keyword" placeholder="Keyword" required="required"  :value="searchStr" v-on:input="changeSearchStr($event.target.value)" class="form__input">
            <select :value="searchCount" v-on:input="changeSearchCount($event.target.value)" style="margin:0px 10px; top: 0px; position: relative; width:auto; width:0px; ">
              <option value="25" selected="selected">25장</option>
              <option value="50">50장</option>
              <option value="100">100장</option>
            </select>
            <button @click="search()" class="submit" style="width:auto;">Search</button>
          </div>
          <div style="font-size: 30px;">
            인기 검색어
          </div>
        </div>
      </div>
    </div> -->


    <div class="search-keywords">
      <ul class="simple-tabs">
        <li v-for="(item, index) in searchKeywords" v-bind:key="index" @click="searchThisKeyword(item.text)">
          <span>{{item.text}}</span>
          <span>{{item.count}}</span>
        </li>
      </ul>
    </div>
    <div v-show="einsteinInfoId != ''" class="whiteText">
      <h1>モデル作成 完了</h1>
      <h3>Salesforce SObject Id :</h3>
      <h3>{{einsteinInfoId}}</h3>
    </div>
    <br><br>

    <!-- <button v-on:click="reDraw">redrawVueMasonry</button> -->
    <ul class="simple-tabs" id="images-tabs" >
      <li class=""  v-bind:key="index" v-for="(item, index) in imagesLabels"><span @click="clickTab(key, $event)" v-bind:key="key" v-for="(value, key) in item">{{key}}</span></li>
    </ul>
    <div v-masonry transition-duration="1s" item-selector=".imageDiv" class="masonry-container" id="masonry-container">
      <div v-masonry-tile class="imageDiv " v-bind:key="index" v-for="(item, index) in localImagesBlocks" >
        <a style="display: flex;" :class="[item.checked==='checked' ? 'active' : '']" :data-index="[index]" v-show="item.loaded" >
          <img v-bind:src="item.url || item.thumb" class="image" @click="()=>{clickImage(index)}" :onerror="imgError(item)">
          <input type="checkbox" class="checkbox" :checked="item.checked"/>
        </a>
      </div>
    </div>
    <div class="layer" v-show="loadingIconFlag">
      <div class="layerText">{{downloadAjaxText}}</div>
      <div class="spinner"></div>
    </div>
    <!-- :intervalVal=3000 -->
    <vue-image-slider v-if="localImagesBlocks" v-show="imagePopupFlag" :images="localImagesBlocks.map(i=>i.url)" :imageIndex="imageIndex" :intervalVal="3000"   class="vue-image-slider"  />
    <div class="vue-image-slider-close" v-show="imagePopupFlag" @click="clickImage">X</div>
  </div>
</template>

<script>
var timer;
var tabFlag = false;
import Vue from 'vue'
import { M } from '../store/types'
import { mapGetters } from 'vuex'
import {VueMasonryPlugin} from 'vue-masonry';
import VueImageSlider from '../components/VueImageSlider.vue'

Vue.use(VueMasonryPlugin)
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      localImagesBlocks: [],
      searchKeywords: [],
      imagePopupFlag: false,
      imageIndex: 0
    }
  },
  components: {
    VueImageSlider
  },
  computed: {
    searchStr: {
      get () {
        return this.$store.getters.getSearchStr
      },
      set (v) {
        this.$store.dispatch(M.CHANGE_SEARCH_STR, v)
      }
    },
    searchCount: {
      get () {
        return this.$store.getters.getSearchCount
      },
      set (v) {
        this.$store.dispatch(M.CHANGE_SEARCH_COUNT, v)
      }
    },
    rootDownloadPath: {
      get () {
        return this.$store.getters.getRootDownloadPath
      },
      set (v) {
        this.$store.dispatch(M.CHANGE_DOWNLOAD_PATH, v)
      }
    },
    username: {
      get () {
        return this.$store.getters.getUsername
      },
      set (v) {
        this.$store.dispatch(M.CHANGE_USERNAME, v)
      }
    },
    password: {
      get () {
        return this.$store.getters.getPassword
      },
      set (v) {
        this.$store.dispatch(M.CHANGE_PASSWORD, v)
      }
    },
    ...mapGetters({
      imagesBlocks: 'getImagesBlocks',
      allImagesBlocks: 'getAllImagesBlocks',
      loadingIconFlag: 'getLoadingIconFlag',
      showTabName: 'getShowTabName',
      downloadAjaxText: 'getDownloadAjaxText',
      imagesLabels: 'getImagesLabels',
      connectServerType: 'getConnectServerType',
      accessToken: 'getAccessToken',
      einsteinInfoId: 'getEinsteinInfoId'
    })
  },
  watch:{
    imagesBlocks(value){
      console.log("watch!!!!!!!!!!!!!!!!!!")
      this.localImagesBlocks = value;
    }
  },
  mounted: function(){
    var thisObj = this
    window.lockToHideLayer = false
    window.downloadCompleteCount = 0
    // var socket = io.connect('http://localhost:8000');
    // var socket = io.connect('http://54.64.84.165.compute-1.amazonaws.com:8000');
    // var sessionid = undefined;
    // socket.on('connect', function(aa) {
    //   sessionid = socket.id;
    //   thisObj.$store.dispatch(M.SAVE_SOCKET_ID, sessionid)
    // });

    // socket.on('Download Complete',function(data){
    //   var totalImagesCount = 0
    //   for(var i = 0, len = thisObj.allImagesBlocks.length ; i < len ; i++){
    //     var currentImages = thisObj.allImagesBlocks[i].filter((image) => {
    //       return image.checked == 'checked'
    //     })
    //     totalImagesCount += currentImages.length;
    //   }
    //   window.downloadCompleteCount++;
    //   thisObj.$store.dispatch(M.CHANGE_DOWNLOAD_AJAX_TEXT, "画像ファイル圧縮中（"+ window.downloadCompleteCount + " / " + totalImagesCount+"）")
    // });
    // socket.on('Change Layer Text',function(text){
    //   // //console.log('Change Layer Text@@@@@@@@@@@@')
    //   thisObj.$store.dispatch(M.CHANGE_DOWNLOAD_AJAX_TEXT, text)
    // });
    // socket.on('Remove Layer',function(){
    //   window.lockToHideLayer = false
    //   thisObj.$store.dispatch(M.CHANGE_LOADING_ICON_FLAG)
    // });
    // socket.on('Inserted SObject',function(einsteinInfoId){
    //   thisObj.$store.dispatch(M.CHANGE_EINSTEIN_INFO_ID,einsteinInfoId)
    // });


    // document.addEventListener("keydown",function(e){
    //     // //console.log(e.keyCode)

    //     switch(e.keyCode) {
    //       case 13:
    //         // //console.log("enter");
    //         break;

    //       case 118:
    //           thisObj.$store.dispatch(M.CHANGE_USERNAME, 'hmatsuyamaechimo@uhuru.jp');
    //           thisObj.$store.dispatch(M.CHANGE_PASSWORD, 'Salesf0rce');
    //         break;

    //       default:
    //         // //console.log("none setting");
    //         break;
    //     }
    // });

    window.DATABASE = firebase.database();
    console.log(DATABASE);
    window.DATABASE.ref('/keywords').on('value', function (data) {
      var database = data.val();
      window.DB_DATA = Object.keys(database).map(function(data) {
          return database[data];
      });
      window.DB_DATA_IDS = Object.keys(database).map(function(data) {
          return {
              id : data,
              text :database[data].text,
              count :database[data].count
          };
      });
      //console.log(window.DB_DATA);
      function compare(a,b) {
        if (a.count < b.count)
          return 1;
        if (a.count > b.count)
          return -1;
        return 0;
      }

      window.DB_DATA.sort(compare);
      thisObj.searchKeywords = window.DB_DATA.slice(0,10);
      //console.log(thisObj.searchKeywords);
    });

  },
  methods: {
    imgError(item){
      const img = new Image()
      const thisObj = this;
      
      img.onerror=(data)=>{
        if(!data.target.width){
          thisObj.$store.dispatch(M.IMAGE_LOAD_FAIL,item.index)
          // thisObj.localImagesBlocks =  thisObj.$store.getters.getImagesBlocks;
          // console.log(thisObj.$store.getters.getImagesBlocks.map(i=>i.loaded))
        }
      };
      img.src=item.url;
    },
    reDraw () {
      this.$redrawVueMasonry({
        horizontalOrder: false
      });
    },
    changeSearchStr (str) {
      this.searchStr = str
    },
    changeSearchCount (count) {
      this.searchCount = count
    },
    changerootDownloadPath (rootDownloadPath) {
      this.rootDownloadPath = rootDownloadPath
    },
    search () {
      var thisObj = this
      //console.log('click!')
      var hasKeyword = window.DB_DATA_IDS.filter((item)=>{
        //console.log(item);
        return item.text == thisObj.searchStr
      });
      if(hasKeyword.length != 0){
        //console.log(parseInt(hasKeyword[0].count))
        window.DATABASE.ref('keywords/'+hasKeyword[0].id).set({
            text:thisObj.searchStr,
            count: parseInt(hasKeyword[0].count)+1
        });
      }else{
        window.DATABASE.ref('keywords/').push({
            text:thisObj.searchStr,
            count:1
        })
      }

      thisObj.$store.dispatch(M.CHANGE_LOADING_ICON_FLAG)
      window.DATABASE.ref(`/${thisObj.searchStr}`).on('value', function (data) {
        var database = data.val();
        console.log( database)
        if(database){
          const currentImageDatas = Object.keys(database).map(function(data) {
              return database[data];
          });
          thisObj.$store.dispatch(M.LOAD_IMAGES_FROM_FIREBASE,currentImageDatas[0])
        }else{
          window.lockToHideLayer = true
          thisObj.$store.dispatch(M.SEARCH_IMAGES_FROM_GOOGLE)
        }
      });

    },
    downloadImages (event) {
      //console.log('click!')
      if(!event.target.classList.contains('disableBtn')){
        window.downloadCompleteCount = 0
        window.lockToHideLayer = true
        this.$store.dispatch(M.CHANGE_LOADING_ICON_FLAG)
        this.$store.dispatch(M.DOWNLOAD_IMAGES)
      }
    },
    clickTab (tabName, event) {
      if(tabFlag){
        return false
      }
      tabFlag = true

      var activeElements = document.querySelectorAll('#images-tabs .active')
      for(var i=0,len=activeElements.length; i < len; i++){
        if(activeElements[i].classList.contains('active')){
          activeElements[i].classList.remove('active')
        }
      }
      event.target.parentElement.classList.add('active')
      var thisObj = this
      thisObj.$store.dispatch(M.CHANGE_SHOW_TAB_NAME, tabName)
      setTimeout(() => {
        thisObj.reDraw()
        setTimeout(() => {
          tabFlag = false
        }, 1000)
      }, 200)
    },
    changeUsername (username) {
      this.username = username
    },
    changePassword (password) {
      this.password = password
    },
    login () {
      this.$store.dispatch(M.LOGIN_AJAX)
    },
    changeConnectServerType (connectServerType) {
      this.$store.dispatch(M.CHANGE_CONNECT_SERVER_TYPE, connectServerType)
    },
    searchThisKeyword (text) {
      console.log(text);
      this.searchStr = text;
      this.search();
    },
    clickImage(index){
      console.log(index);
      this.imageIndex = index;
      this.imagePopupFlag = !this.imagePopupFlag;
      console.log(this.imagePopupFlag);
      if(this.imagePopupFlag){
        document.body.style.overflow = "hidden";
      }else{
        document.body.style.overflow = "auto";
      }
    },
  },
  updated(){
    //console.log('update')
    var thisObj = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      if(thisObj.loadingIconFlag){
        //console.log('call')
        thisObj.reDraw();
        if(window.lockToHideLayer === false){
          // new Selectables({
          //   elements: 'a',
          //   selectedClass: 'active',
          //   moreUsing: 'shiftKey',
          //   zone: '#masonry-container',
          //   onSelect: function (el) {
          //     thisObj.clickImage(el);
          //     // thisObj.$store.dispatch(M.CHANGE_IMAGE_CHECK, el.dataset.index)
          //   },
          //   onDeselect: function (el) {
          //     thisObj.clickImage(el);
          //     // thisObj.$store.dispatch(M.CHANGE_IMAGE_CHECK, el.dataset.index)
          //   }
          // });
          //console.log('xxx')
          thisObj.$store.dispatch(M.CHANGE_LOADING_ICON_FLAG)
          // var images = document.getElementsByClassName("imageDiv")
          // for(var i = 0, len = images.length; i < len ; i++){
          //   var item = images[i]
          //   var aTag = item.querySelector('a')
          //   if(!aTag.classList.contains('active')){
          //     aTag.classList.add('active')
          //   }
          //   item.querySelector('input').setAttribute('checked', 'checked')
          // }
        }
      }
    }, 3000);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.search-keywords{
    margin-top: 20px;
  .simple-tabs{
    display: flex;
    flex-wrap: wrap;
    max-width: 800px;
    margin: auto;
    margin-bottom: -2px;
    border-collapse: collapse;
    li{
      border: 2px solid #ddd;
      flex: auto;
      margin: 0;
      background-color: #50AC58;
      padding: 2px 0px;
      color:white;
      max-width: 200px;
      word-break: break-all;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      &:hover{
        background-color:#479a4e;
        cursor: pointer;
      }

      &.active{
        background-color:#50AC58;
      }

      span{
        display: block;
        width: 100%;
        font-weight: 500;
        font-size: 18px;
      }
    }
  }
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #50AC58;
}
.imageDiv {
  border: 2px solid #50AC58;
  width:50%;
  display: table-cell;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  .image{
    width:100%;
    height: 100%;
    // opacity: 0.5;

  }

  .checkbox{
    display:none;
    position: absolute;
    width: 20px;
    height: 20px;
  }
}

.masonry-container {
    max-width:800px;
    width: 100%;
    margin: 0 auto;
    display:table;
    border-collapse: collapse;
}

.masonry-container .active .image{
  opacity: 1;
}

#s-rectBox {
    position: absolute;
    z-index: 1090;
    border:2px dashed #cbd3e3;
    border-radius:0;
}

.layer{
    position: fixed;
    z-index: 100;
    height: 100%;
    width: 100%;
    background-color: black;
    top: 0;
    opacity: 0.8;
    left: 0;
}

.layerText {
    width: 100%;
    height: 20px;
    margin: auto;
    top: -80px;
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
    color: white;
}

.spinner {
    height: 28px;
    width: 28px;
    animation: rotate 0.8s infinite linear;
    border: 8px solid #50AC58;
    border-right-color: transparent;
    border-radius: 50%;
    margin: auto;
    top: 0;
    bottom: 0;
    position: absolute;
    left: 0;
    right: 0;
}

@keyframes rotate {
  0%    { transform: rotate(0deg); }
  100%  { transform: rotate(360deg); }
}

.simple-tabs{
  display: flex;
  flex-wrap: wrap;
  max-width: 800px;
  margin: auto;
  margin-bottom: -2px;
  border-collapse: collapse;
  li{
    border: 2px solid #ddd;
    flex: auto;
    margin: 0;
    background-color: #50AC58;
    padding: 10px 0px;
    color:white;
    &:hover{
      background-color:#479a4e;
      cursor: pointer;
    }

    &.active{
      background-color:#50AC58;
    }

    span{
      display: block;
      width: 100%;
      font-weight: 500;
      font-size: 18px;
    }
  }
}

//



</style>

<style>

/* helpers/align.css */

.align {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* helpers/grid.css */


.grid {
  margin-left: auto;
  margin-right: auto;
  max-width: 20rem;
  width: 90%;
}

/* helpers/hidden.css */

.hidden {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
}

/* helpers/icon.css */

.icons {
  display: none;
}

.icon {
  display: inline-block;
  fill: #606468;
  font-size: 1rem;
  height: 1em;
  vertical-align: middle;
  width: 1em;
}

* {
  box-sizing: inherit;
}

html {
  box-sizing: border-box;
  font-size: 100%;
  height: 100%;
}

body {
  background-color: #2c3338;
  color: #606468;
  font-family: 'Open Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  height: 100%;
  line-height: 1.5;
  margin: 0;
  min-height: 100vh;
}

/* modules/anchor.css */

a {
  color: #eee;
  outline: 0;
  text-decoration: none;
}

a:focus,
a:hover {
  text-decoration: underline;
}

input {
  background-image: none;
  border: 0;
  color: inherit;
  font: inherit;
  margin: 0;
  outline: 0;
  padding: 0;
  transition: background-color 0.3s;
}

.submit {
  cursor: pointer;
}

.form {
  margin: calc(0.875rem * -1);
}

.form input[type='password'],
.form input[type='text'],
.form .submit {
  width: 100%;
}
.form__field .disableBtn{
  cursor: default;
  background-color:#fff !important;
  color:#9e9e9e !important;
  opacity: 0.8;
}

.form__field .show{
  opacity: 1 !important;
}
.form__field .hide2{
  display: none;
}
.form__field .bgColorRed{
  color: red !important;
}
.form__field {
  display: flex;
  margin:  0.875rem;
}
.form__field select{
  width: 100%;
  margin: 0rem 0rem;
  border-radius: 5px;
  background-color: #2c3338;
  color:white;
  background-color: #3b4148;
  font-size:16px;
  border:0;
}
.form__field select::focus{
  outline: -webkit-focus-ring-color auto 0px;
}

.form__field select option{
  background-color:#2c3338;
  color:white;
  font-size:16px;
}

.form__input {
  flex: 1;
}

.login {
  color: #eee;
}

.login label,
.login input[type='text'],
.login input[type='password'],
.login .submit {
  border-radius: 0.25rem;
  padding: 1rem;
  border: 0;
  height:51px;
}

.login label {
  background-color: #363b41;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}

.login input[type='password'],
.login input[type='text'] {
  background-color: #3b4148;
}

.login input[type='password']:focus,
.login input[type='password']:hover,
.login input[type='text']:focus,
.login input[type='text']:hover {
  background-color: #434a52;
}

.login .submit {
  background-color: #50AC58;
  color: #eee;
  font-weight: 700;
  text-transform: uppercase;
}

.login .submit:focus,
.login .submit:hover {
  background-color: #479a4e;
}

/* modules/text.css */

p {
  margin-bottom: 1.5rem;
  margin-top: 1.5rem;
}

.text--center {
  text-align: center;
}

ul.evnSelect{
  list-style: none;
  margin: 0;
  padding: 0;
	overflow: auto;
}

ul.evnSelect li{
  color: #AAAAAA;
  display: inline-block;
  position: relative;
  float: left;
  width: 139px;
  box-sizing: content-box;
  border-bottom: 1px solid #333;
  padding-left:14px;
}

ul.evnSelect li input[type=radio]{
  position: absolute;
  visibility: hidden;
}

ul.evnSelect li label{
  display: block;
  position: relative;
  font-weight: 300;
  font-size: 1.35em;
  margin: 10px auto;
  height: 30px;
  z-index: 9;
  cursor: pointer;
  -webkit-transition: all 0.25s linear;
     padding: 5px;
}

ul.evnSelect li:hover label{
	color: #FFFFFF;
}

ul.evnSelect li .check{
  display: block;
  position: absolute;
  border: 5px solid #AAAAAA;
  border-radius: 100%;
  height: 16px;
  width: 16px;
  top: 16px;
  left: 13px;
  z-index: 5;
  transition: border .25s linear;
  -webkit-transition: border .25s linear;
  z-index: 100;
}

ul.evnSelect li:hover .check {
  border: 5px solid #FFFFFF;
}

ul.evnSelect li .check::before {
  display: block;
  position: absolute;
	content: '';
  border-radius: 100%;
  height: 8px;
  width: 8px;
  top: 4px;
	left: 4px;
  margin: auto;
	transition: background 0.25s linear;
	-webkit-transition: background 0.25s linear;
}

input[type=radio]:checked ~ .check {
  border: 5px solid #8aab14;
}

input[type=radio]:checked ~ .check::before{
  background-color: #8aab14;
}

input[type=radio]:checked ~ label{
  color: white;
}

.whiteText{
  color: white;
}
.whiteText h1{
  margin-bottom: 0;
}
.whiteText h3{
  margin-top: 3px;
  margin-bottom: 0;
}
.vue-image-slider{
  background: #ddd;
  width: 100%!important;
  height: 100%!important;
  position: fixed !important;
  top: 0;
  left: 0;
}
.vue-image-slider > div,
.vue-image-slider > div > div{
  width: 100%!important;
  height: 100%!important;
}

.vue-image-slider > div > div img{
  object-fit: contain;
  width: 100%;
  height: 100%;
}
.vue-image-slider-close{
  position: fixed;
  top: 50px;
  right: 50px;
  background: #a0a0a0;
  color: white;
  padding: 7px 15px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
