<template>
  <div id="app" class="hello">
    <!-- <h1>{{ msg }}</h1> -->

    <div class="grid">

      <div class="form login">

        <div class="form__field">
          <label for="login__username"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use></svg><span class="hidden">Username</span></label>
          <input style="border-bottom-left-radius: 0;border-top-left-radius: 0;" id="login__username" type="text" name="username" class="form__input" placeholder="Username" :value="username" v-on:input="changeUsername($event.target.value)" required>
        </div>

        <div class="form__field">
          <label for="login__password"><svg class="icon"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#lock"></use></svg><span class="hidden">Password</span></label>
          <input style="border-bottom-left-radius: 0;border-top-left-radius: 0;" id="login__password" type="password" name="password" class="form__input" placeholder="Password" :value="password" v-on:input="changePassword($event.target.value)" required>
        </div>
        <ul class="evnSelect">
          <li>
            <input type="radio" id="f-option" name="selector" :checked="connectServerType==='Product'" v-on:click="changeConnectServerType('Product')">
            <label for="f-option" style="background-color: #2c3338;">Product</label>
            <div class="check"></div>
          </li>

          <li>
            <input type="radio" id="s-option" name="selector" :checked="connectServerType==='SandBox'" value="SandBox" v-on:click="changeConnectServerType('SandBox')">
            <label for="s-option" style="background-color: #2c3338;">SandBox</label>
            <div class="check"><div class="inside"></div></div>
          </li>
        </ul>
        <!-- <div class="form__field">
          <select>
            <option value="product">product</option>
            <option value="sandbox">sandbox</option>
          </select>
        </div> -->

        <div class="form__field">
          <button @click="login()" class="submit" style="padding-left: 45px;">login
            <span  :class="[accessToken==='' ? 'hide' : (accessToken==='fail' ? 'hide2' : 'show')]"  style=" margin-left: 12px; color: #5dff00; position: relative; top: -1px; font-size: 14px; opacity:0;">✔</span>
            <span  :class="[accessToken==='' ? 'hide2' : (accessToken==='fail' ? 'bgColorRed show' : 'hide2')]"  style=" margin-left: 12px; color: #5dff00; position: relative; top: -1px; font-size: 14px; opacity:0;">X</span>
          </button>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" class="icons"><symbol id="arrow-right" viewBox="0 0 1792 1792"><path d="M1600 960q0 54-37 91l-651 651q-39 37-91 37-51 0-90-37l-75-75q-38-38-38-91t38-91l293-293H245q-52 0-84.5-37.5T128 1024V896q0-53 32.5-90.5T245 768h704L656 474q-38-36-38-90t38-90l75-75q38-38 90-38 53 0 91 38l651 651q37 35 37 90z"/></symbol><symbol id="lock" viewBox="0 0 1792 1792"><path d="M640 768h512V576q0-106-75-181t-181-75-181 75-75 181v192zm832 96v576q0 40-28 68t-68 28H416q-40 0-68-28t-28-68V864q0-40 28-68t68-28h32V576q0-184 132-316t316-132 316 132 132 316v192h32q40 0 68 28t28 68z"/></symbol><symbol id="user" viewBox="0 0 1792 1792"><path d="M1600 1405q0 120-73 189.5t-194 69.5H459q-121 0-194-69.5T192 1405q0-53 3.5-103.5t14-109T236 1084t43-97.5 62-81 85.5-53.5T538 832q9 0 42 21.5t74.5 48 108 48T896 971t133.5-21.5 108-48 74.5-48 42-21.5q61 0 111.5 20t85.5 53.5 62 81 43 97.5 26.5 108.5 14 109 3.5 103.5zm-320-893q0 159-112.5 271.5T896 896 624.5 783.5 512 512t112.5-271.5T896 128t271.5 112.5T1280 512z"/></symbol></svg>
        <br>
        <div style="background-color: #5e6266; height: 1px;"></div>
        <br>

        <div v-show="einsteinInfoId == ''">
          <div data-v-75a60854="" class="form__field"><input data-v-75a60854="" id="category" type="text" name="category" placeholder="Category" required="required"  :value="rootDownloadPath" v-on:input="changerootDownloadPath($event.target.value)" class="form__input"></div>
          <div data-v-75a60854="" class="form__field">
            <input data-v-75a60854="" id="Keyword" type="text" name="Keyword" placeholder="Class" required="required"  :value="searchStr" v-on:input="changeSearchStr($event.target.value)" class="form__input">
            <select :value="searchCount" v-on:input="changeSearchCount($event.target.value)" style="margin:0px 10px; top: 0px; position: relative; width:auto;">
              <!-- <option value="10">10</option> -->
              <option value="25" selected="selected">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <!-- <option value="200">200</option> -->
              <!-- <option value="300">300</option> -->
              <!-- <option value="400">400</option> -->
            </select>
            <button @click="search()" class="submit" style="width:auto;">Search</button>
          </div>
          <div data-v-75a60854="" class="form__field">
            <button :class="[accessToken==='' ? 'disableBtn' : (accessToken==='fail' ? 'disableBtn' : '')]" @click="downloadImages($event)" class="submit">Create Model</button>
          </div>
        </div>
      </div>
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
      <div v-masonry-tile class="imageDiv " v-bind:key="index" v-for="(item, index) in imagesBlocks" >
        <a style="display: flex;" :class="[item.checked==='checked' ? 'active' : '']" :data-index="[index]">
          <img v-bind:src="item.thumb_url || item.thumb" class="image">
          <input type="checkbox" class="checkbox" :checked="item.checked"/>
        </a>
      </div>
    </div>
    <div class="layer" v-show="loadingIconFlag">
      <div class="layerText">{{downloadAjaxText}}</div>
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>

var socket = io.connect('http://localhost:3000');
//  var socket = io.connect('http://13.125.125.39:8000');

var timer;
var tabFlag = false;
import Vue from 'vue'
import { M } from '../store/types'
import { mapGetters } from 'vuex'
import {VueMasonryPlugin} from 'vue-masonry';

Vue.use(VueMasonryPlugin)
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
  mounted: function(){
    var thisObj = this
    window.lockToHideLayer = false
    window.downloadCompleteCount = 0

    socket.on('Download Complete',function(data){
      var totalImagesCount = 0
      for(var i = 0, len = thisObj.allImagesBlocks.length ; i < len ; i++){
        var currentImages = thisObj.allImagesBlocks[i].filter((image) => {
          return image.checked == 'checked'
        })
        totalImagesCount += currentImages.length;
      }
      window.downloadCompleteCount++;
      thisObj.$store.dispatch(M.CHANGE_DOWNLOAD_AJAX_TEXT, "画像ファイル圧縮中（"+ window.downloadCompleteCount + " / " + totalImagesCount+"）")
    });
    socket.on('Change Layer Text',function(text){
      console.log('Change Layer Text@@@@@@@@@@@@')
      thisObj.$store.dispatch(M.CHANGE_DOWNLOAD_AJAX_TEXT, text)
    });
    socket.on('Remove Layer',function(){
      window.lockToHideLayer = false
      thisObj.$store.dispatch(M.CHANGE_LOADING_ICON_FLAG)
    });
    socket.on('Inserted SObject',function(einsteinInfoId){
      thisObj.$store.dispatch(M.CHANGE_EINSTEIN_INFO_ID,einsteinInfoId)
    });


    document.addEventListener("keydown",function(e){
        console.log(e.keyCode)

        switch(e.keyCode) {
          case 13:
            console.log("enter");
            break;

          case 118:
              thisObj.$store.dispatch(M.CHANGE_USERNAME, 'hmatsuyamaechimo@uhuru.jp');
              thisObj.$store.dispatch(M.CHANGE_PASSWORD, 'Salesf0rce');
            break;

          default:
            console.log("none setting");
            break;
        }
    });
  },
  methods: {
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
      console.log('click!')
      window.lockToHideLayer = true
      this.$store.dispatch(M.CHANGE_LOADING_ICON_FLAG)
      this.$store.dispatch(M.SEARCH_IMAGES_FROM_GOOGLE)
    },
    downloadImages (event) {
      console.log('click!')
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

  },
  updated(){
    console.log('update')
    var thisObj = this;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      if(thisObj.loadingIconFlag){
        console.log('call')
        thisObj.reDraw();
        if(window.lockToHideLayer === false){
          new Selectables({
            elements: 'a',
            selectedClass: 'active',
            moreUsing: 'shiftKey',
            zone: '#masonry-container',
            onSelect: function (el) {
              thisObj.$store.dispatch(M.CHANGE_IMAGE_CHECK, el.dataset.index)
              // el.querySelector('input').setAttribute('checked', 'checked');
            },
            onDeselect: function (el) {
              thisObj.$store.dispatch(M.CHANGE_IMAGE_CHECK, el.dataset.index)
              // el.querySelector('input').removeAttribute('checked');
            }
          });
          console.log('xxx')
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
  color: #42b983;
}
.imageDiv {
  border: 2px solid #ac0;
  width:200px;
  display: table-cell;
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  .image{
    width:100%;
    height: 100%;
    opacity: 0.5;

  }

  .checkbox{
    position: absolute;
    width: 20px;
    height: 20px;
  }
}

.masonry-container {
    min-width: 800px;
    width:800px;
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
    border: 8px solid #41b883;
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
  display: table;
  width: 800px;
  margin: auto;
  margin-bottom: -2px;
  border-collapse: collapse;
  li{
    border: 2px solid #ddd;
    flex: auto;
    width: 200px;
    margin: 0;
    display: table-cell;
    background-color: #6a7731;
    padding: 10px 0px;
    color:white;
    &:hover{
      background-color:#8aab14;
      cursor: pointer;
    }

    &.active{
      background-color:#9fc125;
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
  background-color: #8aab14;
  color: #eee;
  font-weight: 700;
  text-transform: uppercase;
}

.login .submit:focus,
.login .submit:hover {
  background-color: #9fc125;
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
</style>
