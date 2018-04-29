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
    <!-- <input type="file" allowdirs webkitdirectory directory id="selectFolder"/> -->
    <br><br>
    <button v-on:click="reDraw">redrawVueMasonry</button>
    <div v-masonry transition-duration="1s" item-selector=".item" class="masonry-container">
      <div v-masonry-tile class="item" v-bind:key="index" v-for="(item, index) in imagesBlocks">
        <img v-bind:src="item.thumb_url || item.thumb" >
      </div>
    </div>
  </div>
</template>

<script>
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
      imagesBlocks: 'getImagesBlocks'
    })
  },
  mounted: function(){
    var thisObj = this;
    this.$redrawVueMasonry();
    // var fileToRead = document.getElementById("selectFolder");
    // fileToRead.addEventListener("change", function(event) {
    //   console.log(thisObj.$refs.downloadPathLabel)
    //   console.log(fileToRead.files[0])
    //   thisObj.$refs.downloadPathLabel.textContent = `Images Download Path = "${fileToRead.value}"`;
    // }, false);
  },
  methods: {
    reDraw () {
      this.$redrawVueMasonry({
        horizontalOrder: true
      });
      // let template = {
      //       title: 'the last block'
      //     }
      // this.blocks.push(template)
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
      this.$store.dispatch(M.SEARCH_IMAGES_FROM_GOOGLE)
    },
    downloadImages () {
      console.log('click!')
      this.$store.dispatch(M.DOWNLOAD_IMAGES)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
.item {
  border: 1px solid #ac0;
  width:200px;
}
.item img{
  width:100%;
}
.masonry-container {
    width: 55%;
    margin: 0 auto;
}
</style>
