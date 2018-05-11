import { M } from './types'
import ajaxActions from './ajaxActions'

var socket = io.connect('http://localhost:3000');
// var socket = io.connect('http://13.125.125.39:8000');

const state = {
  searchStr: '',
  searchCount: 10,
  downloadPath: '',
  imagesBlocks: [
  ],
  loadingIconFlag: false,
  showTabName: '',
  downloadAjaxText: ''
}

const getters = {
  getSearchStr () {
    return state.searchStr
  },
  getSearchCount () {
    return state.searchCount
  },
  getDownloadPath () {
    return state.downloadPath
  },
  getImagesBlocks () {
    return state.imagesBlocks
  },
  getLoadingIconFlag () {
    return state.loadingIconFlag
  },
  getShowTabName () {
    return state.showTabName
  },
  getDownloadAjaxText () {
    return state.downloadAjaxText
  }
}

const actions = {
  [M.CHANGE_SEARCH_STR] ({ commit }, searchStr) {
    commit(M.CHANGE_SEARCH_STR, searchStr)
  },
  [M.CHANGE_SEARCH_COUNT] ({ commit }, searchCount) {
    commit(M.CHANGE_SEARCH_COUNT, searchCount)
  },
  [M.CHANGE_DOWNLOAD_PATH] ({ commit }, downloadPath) {
    commit(M.CHANGE_DOWNLOAD_PATH, downloadPath)
  },
  [M.SEARCH_IMAGES_FROM_GOOGLE] ({ commit }) {
    console.log('search images')
    let thisObj = this
    commit(M.CHANGE_DOWNLOAD_AJAX_TEXT, "searching : "+ thisObj.getters.getSearchStr)
    ajaxActions().searchGoogle(
      state,
      (results) => {
        console.log('action / SEARCH_IMAGES_FROM_GOOGLE / success')
        console.log('results= ', results)
        commit(M.SEARCH_IMAGES_FROM_GOOGLE, results)
        window.lockToHideLayer = false
        // commit(M.CHANGE_SHOW_TAB_NAME, thisObj.getters.getSearchStr)
      },
      (res) => {
        console.log('action / SEARCH_IMAGES_FROM_GOOGLE / error', res)
      }
    )
  },
  [M.DOWNLOAD_IMAGES] ({ commit }) {
    console.log('download images')
    let thisObj = this
    commit(M.CHANGE_DOWNLOAD_AJAX_TEXT, "download complete : 0 / " + thisObj.getters.getImagesBlocks.length)
    socket.on('Download Complete',function(data){
      console.log('data : '+ data)
      commit(M.CHANGE_DOWNLOAD_AJAX_TEXT, "download complete : "+ data + " / " + thisObj.getters.getImagesBlocks.length)
      if(data ===  thisObj.getters.getImagesBlocks.length-1){
        window.lockToHideLayer = false
      }
    });
    console.log(window.lockToHideLayer)
    ajaxActions().downloadImages(
      state,
      (results) => {
        console.log('action / DOWNLOAD_IMAGES / success')
        console.log('results= ', results)
        // window.lockToHideLayer = false
        // commit(M.DOWNLOAD_IMAGES, results)
      },
      (res) => {
        console.log('action / DOWNLOAD_IMAGES / error', res)
      }
    )
  },
  [M.CHANGE_LOADING_ICON_FLAG] ({ commit }) {
    commit(M.CHANGE_LOADING_ICON_FLAG)
  },
  [M.CHANGE_SHOW_TAB_NAME] ({ commit }, showTabName) {
    commit(M.CHANGE_SHOW_TAB_NAME, showTabName)
  },
  [M.CHANGE_IMAGE_CHECK] ({ commit }, ImageIndex) {
    commit(M.CHANGE_IMAGE_CHECK, ImageIndex)
  },
  [M.CHANGE_DOWNLOAD_AJAX_TEXT] ({ commit }, downloadAjaxText) {
    commit(M.CHANGE_DOWNLOAD_AJAX_TEXT, downloadAjaxText)
  }


}

const mutations = {
  [M.CHANGE_SEARCH_STR] (state, searchStr) {
    state.searchStr = searchStr
  },
  [M.CHANGE_SEARCH_COUNT] (state, searchCount) {
    state.searchCount = searchCount
  },
  [M.CHANGE_DOWNLOAD_PATH] (state, downloadPath) {
    state.downloadPath = downloadPath
  },
  [M.SEARCH_IMAGES_FROM_GOOGLE] (state, results) {
    state.imagesBlocks = results.map((item) => {
      return {
        height: item.height,
        thumb_height: item.thumb_height,
        thumb_url: item.thumb_url,
        thumb_width: item.thumb_width,
        type: item.type,
        url: item.url,
        width: item.width,
        checked: 'checked'
      }
    })
  },
  [M.CHANGE_LOADING_ICON_FLAG] (state) {
    console.log('state.loadingIconFlag : ' + state.loadingIconFlag)
    state.loadingIconFlag = !state.loadingIconFlag
  },
  [M.CHANGE_SHOW_TAB_NAME] (state, showTabName) {
    state.showTabName = showTabName
  },
  [M.CHANGE_IMAGE_CHECK] (state, imageIndex) {
    state.imagesBlocks[imageIndex].checked = state.imagesBlocks[imageIndex].checked === 'checked' ? '' : 'checked'
  },
  [M.CHANGE_DOWNLOAD_AJAX_TEXT] (state, downloadAjaxText) {
    state.downloadAjaxText = downloadAjaxText
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
