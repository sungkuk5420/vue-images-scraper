<template>
  <div id="app" class="hello">
    <h1>{{ msg }}</h1>
    <h2>Search images by keyoword</h2>
    <input type="text" :value="searchStr" v-on:input="changeSearchStr($event.target.value)"/>
    <h2>Download count</h2>
    <input type="text" :value="searchCount" v-on:input="changeSearchCount($event.target.value)"/>
    <button @click="search()">Search</button>
    <h2 ref="downloadPathLabel">Images Download Path</h2>
    <input type="text" :value="downloadPath" v-on:input="changeDownloadPath($event.target.value)"/>
    <button @click="downloadImages()">download</button>
    <br><br>
    <button v-on:click="reDraw">redrawVueMasonry</button>
    <div v-masonry transition-duration="1s" item-selector=".imageDiv" class="masonry-container" id="masonry-container">
      <div v-masonry-tile class="imageDiv" v-bind:key="index" v-for="(item, index) in imagesBlocks" >
        <a style="display: flex;" class="active">
          <img v-bind:src="item.thumb_url || item.thumb" class="image">
          <input type="checkbox" class="checkbox" checked="checked"/>
        </a>
      </div>
    </div>
    <div class="layer" v-show="loadingIconFlag">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
var timer;
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
    downloadPath: {
      get () {
        return this.$store.getters.getDownloadPath
      },
      set (v) {
        this.$store.dispatch(M.CHANGE_DOWNLOAD_PATH, v)
      }
    },
    ...mapGetters({
      imagesBlocks: 'getImagesBlocks',
      loadingIconFlag: 'getLoadingIconFlag',
      showTabName: 'getShowTabName'
    })
  },
  mounted: function(){
    var thisObj = this;
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
    changeDownloadPath (downloadPath) {
      this.downloadPath = downloadPath
    },
    search () {
      console.log('click!')
      this.$store.dispatch(M.CHANGE_LOADING_ICON_FLAG)
      this.$store.dispatch(M.SEARCH_IMAGES_FROM_GOOGLE)
    },
    downloadImages () {
      console.log('click!')
      this.$store.dispatch(M.DOWNLOAD_IMAGES)
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
        if(thisObj.searchStr === thisObj.showTabName){
          new Selectables({
            elements: 'a',
            selectedClass: 'active',
            moreUsing: 'shiftKey',
            zone: '#masonry-container',
            onSelect: function (el) {
              el.querySelector('input').setAttribute('checked', 'checked');
            },
            onDeselect: function (el) {
              el.querySelector('input').removeAttribute('checked');
            }
          });
          thisObj.$store.dispatch(M.CHANGE_LOADING_ICON_FLAG)
          var images = document.getElementsByClassName("imageDiv")
          for(var i = 0, len = images.length; i < len ; i++){
            var item = images[i]
            var aTag = item.querySelector('a')
            if(!aTag.classList.contains('active')){
              aTag.classList.add('active')
            }
            item.querySelector('input').setAttribute('checked', 'checked')
          }

        }
      }
    }, 500);
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
  display: table;
  border-collapse:collapse;
  position: relative;
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
    min-width: 850px;
    width:85%;
    margin: 0 auto;
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

.spinner {
    margin: 50px;
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
</style>
