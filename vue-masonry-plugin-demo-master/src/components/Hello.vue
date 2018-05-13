<template>
  <div id="app" class="hello">
    <h1>{{ msg }}</h1>
    <div style="display:inline-block;"><span style="display: inline-block; width:85px;">Id : </span><input type="text" :value="searchStr" v-on:input="changeSearchStr($event.target.value)"/><br>
    <span style="display: inline-block; width:85px;">Password : </span><input type="password" :value="searchStr" v-on:input="changeSearchStr($event.target.value)"/><br></div>
    <button @click="downloadImages()" style="display:inline-block;height: 42px; vertical-align: top;">login</button>
    <select style="top: -10px; position: relative;">
      <option value="product">product</option>
      <option value="sandbox">sandbox</option>
    </select>
    <h2>Root Diractory Name</h2>
    <input type="text" :value="rootDownloadPath" v-on:input="changerootDownloadPath($event.target.value)"/>
    <h2>Search images by keyoword</h2>
    <input type="text" :value="searchStr" v-on:input="changeSearchStr($event.target.value)"/>
    <select :value="searchCount" v-on:input="changeSearchCount($event.target.value)" style="top: 0px; position: relative;">
      <option value="10">10</option>
      <option value="50">50</option>
      <option value="100">100</option>
      <option value="200">200</option>
      <option value="300">300</option>
      <option value="400">400</option>
    </select>
    <button @click="search()">Search</button>
    <button @click="downloadImages()">download</button>

    <br><br>
    <button v-on:click="reDraw">redrawVueMasonry</button>
    <ul class="simple-tabs" id="images-tabs" > 
      <li class=""  v-bind:key="index" v-for="(item, index) in imagesLabels"><span @click="clickTab(key)" v-bind:key="key" v-for="(value, key) in item">{{key}}</span></li>
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
    ...mapGetters({
      imagesBlocks: 'getImagesBlocks',
      loadingIconFlag: 'getLoadingIconFlag',
      showTabName: 'getShowTabName',
      downloadAjaxText: 'getDownloadAjaxText',
      imagesLabels: 'getImagesLabels'
    })
  },
  mounted: function(){
    var thisObj = this;
    window.lockToHideLayer = false;
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
    downloadImages () {
      console.log('click!')
      window.lockToHideLayer = true
      this.$store.dispatch(M.CHANGE_LOADING_ICON_FLAG)
      this.$store.dispatch(M.DOWNLOAD_IMAGES)
    },
    clickTab (tabName) {
      console.log(tabFlag)
      if(tabFlag){
        return false
      }
      tabFlag = true
      var thisObj = this
      thisObj.$store.dispatch(M.CHANGE_SHOW_TAB_NAME, tabName)
      setTimeout(() => {
        thisObj.reDraw()
        setTimeout(() => {
          tabFlag = false
        }, 1000)
      }, 200)
    }
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
    background: black;
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
    &:hover{
      background-color:#ddd;
    }

    span{
      display: block;
      width: 100%;
    }
  }
}
</style>
