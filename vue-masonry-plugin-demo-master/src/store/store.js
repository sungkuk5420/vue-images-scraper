import { M } from './types'
import ajaxActions from './ajaxActions'

const state = {
  searchStr: '',
  searchCount: 25,
  rootDownloadPath: '',
  imagesBlocks: [
  ],
  loadingIconFlag: false,
  showTabName: '',
  downloadAjaxText: '',
  imagesLabels: [],
  username:'',
  password:'',
  connectServerType: 'Product',
  accessToken: '',
  einsteinInfoId: '',
  socketId: ''
}

const getters = {
  getSearchStr () {
    return state.searchStr
  },
  getSearchCount () {
    return state.searchCount
  },
  getRootDownloadPath () {
    return state.rootDownloadPath
  },
  getImagesBlocks () {
    var showIndex = -1
    var index = 0
    state.imagesLabels.forEach(item => {
      if(item[state.showTabName] != undefined){
        showIndex = index
        console.log('show tab : '+state.showTabName)
      }
      index++
    })
    let returnArr = state.imagesBlocks[showIndex];
    if(returnArr){
      console.log(returnArr.map(i=>i.loaded))
      returnArr = returnArr.filter(i=>i.loaded !== false)
    }
    return returnArr
  },
  getAllImagesBlocks () {
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
  },
  getImagesLabels () {
    return state.imagesLabels
  },
  getUsername () {
    return state.username
  },
  getPassword () {
    return state.password
  },
  getConnectServerType () {
    return state.connectServerType
  },
  getAccessToken () {
    return state.accessToken
  },
  getEinsteinInfoId () {
    return state.einsteinInfoId
  },
  getSocketId () {
    return state.socketId
  }
}

const actions = {
  [M.CHANGE_SEARCH_STR] ({ commit }, searchStr) {
    commit(M.CHANGE_SEARCH_STR, searchStr)
  },
  [M.CHANGE_SEARCH_COUNT] ({ commit }, searchCount) {
    commit(M.CHANGE_SEARCH_COUNT, searchCount)
  },
  [M.CHANGE_DOWNLOAD_PATH] ({ commit }, rootDownloadPath) {
    commit(M.CHANGE_DOWNLOAD_PATH, rootDownloadPath)
  },
  [M.LOAD_IMAGES_FROM_FIREBASE] ({ commit },images) {
    commit(M.CHANGE_SHOW_TAB_NAME, this.getters.getSearchStr)
    commit(M.LOAD_IMAGES_FROM_FIREBASE, images)
  },
  [M.SEARCH_IMAGES_FROM_GOOGLE] ({ commit }) {
    console.log('search images')
    let thisObj = this
    commit(M.CHANGE_DOWNLOAD_AJAX_TEXT, "[ " + thisObj.getters.getSearchStr + " ] 이미지검색중")
    ajaxActions().searchGoogle(
      state,
      (results) => {
        console.log('action / SEARCH_IMAGES_FROM_GOOGLE / success')
        console.log('results= ', results)
        commit(M.CHANGE_SHOW_TAB_NAME, thisObj.getters.getSearchStr)
        commit(M.SEARCH_IMAGES_FROM_GOOGLE, results)
        window.lockToHideLayer = false
      },
      (res) => {
        console.log('action / SEARCH_IMAGES_FROM_GOOGLE / error', res)
      }
    )
  },
  [M.IMAGE_LOAD_FAIL] ({ commit },index) {
    commit(M.IMAGE_LOAD_FAIL, index)
  },
  [M.DOWNLOAD_IMAGES] ({ commit }) {
    console.log('download images')
    let thisObj = this
    // commit(M.CHANGE_DOWNLOAD_AJAX_TEXT, "download complete : 0 / " + thisObj.getters.getImagesBlocks.length)

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
  },
  [M.CHANGE_USERNAME] ({ commit }, username) {
    commit(M.CHANGE_USERNAME, username)
  },
  [M.CHANGE_PASSWORD] ({ commit }, password) {
    commit(M.CHANGE_PASSWORD, password)
  },
  [M.LOGIN_AJAX] ({ commit }) {
    console.log('LOGIN_AJAX')
    let thisObj = this
    // commit(M.CHANGE_DOWNLOAD_AJAX_TEXT, "download complete : 0 / " + thisObj.getters.getImagesBlocks.length)

    ajaxActions().login(
      state,
      (results) => {
        console.log('action / LOGIN_AJAX / success')
        console.log('results= ', results)
        // window.lockToHideLayer = false
        commit(M.CHANGE_ACCESS_TOKEN, results)
      },
      (res) => {
        console.log('action / LOGIN_AJAX / error', res)
        commit(M.CHANGE_ACCESS_TOKEN, 'fail')
      }
    )
  },
  [M.CHANGE_CONNECT_SERVER_TYPE] ({ commit }, connectServerType) {
    commit(M.CHANGE_CONNECT_SERVER_TYPE, connectServerType)
  },
  [M.CHANGE_ACCESS_TOKEN] ({ commit }, accessToken) {
    commit(M.CHANGE_ACCESS_TOKEN, accessToken)
  },
  [M.CHANGE_EINSTEIN_INFO_ID] ({ commit }, einsteinInfoId) {
    commit(M.CHANGE_EINSTEIN_INFO_ID, einsteinInfoId)
  },
  [M.SAVE_SOCKET_ID] ({ commit }, socketId) {
    commit(M.SAVE_SOCKET_ID, socketId)
  }


}

const mutations = {
  [M.CHANGE_SEARCH_STR] (state, searchStr) {
    state.searchStr = searchStr
  },
  [M.CHANGE_SEARCH_COUNT] (state, searchCount) {
    state.searchCount = searchCount
  },
  [M.CHANGE_DOWNLOAD_PATH] (state, rootDownloadPath) {
    state.rootDownloadPath = rootDownloadPath
  },
  [M.IMAGE_LOAD_FAIL] (state, imageIndex) {
    console.log("IMAGE_LOAD_FAIL mutation : ", imageIndex)
    var showIndex = -1
    var index = 0
    state.imagesLabels.forEach(item => {
      if(item[state.showTabName] != undefined){
        showIndex = index
        console.log('show tab : '+state.showTabName)
      }
      index++
    })
    // console.log(state.imagesBlocks[showIndex][index])
    // state.imagesBlocks[showIndex][index].loaded = false;
    state.imagesBlocks[showIndex].filter(i=>i.index == imageIndex)[0].loaded = false;
  },
  [M.SEARCH_IMAGES_FROM_GOOGLE] (state, results) {
    var index = 0;
    window.DATABASE.ref(`${state.searchStr}`).push(results)
    state.imagesBlocks.push(results.map((item) => {
      index++;
      return {
        index: index,
        height: item.height,
        thumb_height: item.thumb_height,
        thumb_url: item.thumb_url,
        thumb_width: item.thumb_width,
        type: item.type,
        url: item.url,
        width: item.width,
        loaded: true,
        checked: 'checked'
      }
    }))
    var obj = {};
    obj[state.searchStr] = state.imagesBlocks.length - 1;
    state.imagesLabels.push(obj)
  },
  [M.LOAD_IMAGES_FROM_FIREBASE] (state, results) {
    var index = 0;
    state.imagesBlocks.push(results.map((item) => {
      index++;
      return {
        index: index,
        height: item.height,
        thumb_height: item.thumb_height,
        thumb_url: item.thumb_url,
        thumb_width: item.thumb_width,
        type: item.type,
        url: item.url,
        width: item.width,
        loaded: true,
        checked: 'checked'
      }
    }))
    var obj = {};
    obj[state.searchStr] = state.imagesBlocks.length - 1;
    state.imagesLabels.push(obj)
  },
  [M.CHANGE_LOADING_ICON_FLAG] (state) {
    console.log('state.loadingIconFlag : ' + state.loadingIconFlag)
    state.loadingIconFlag = !state.loadingIconFlag
  },
  [M.CHANGE_SHOW_TAB_NAME] (state, showTabName) {
    state.showTabName = showTabName
  },
  [M.CHANGE_IMAGE_CHECK] (state, imageIndex) {
    var showIndex = -1
    var index = 0
    state.imagesLabels.forEach(item => {
      if(item[state.showTabName] != undefined){
        showIndex = index
        console.log('show tab : '+state.showTabName)
      }
      index++
    })
    state.imagesBlocks[showIndex][imageIndex].checked = state.imagesBlocks[showIndex][imageIndex].checked === 'checked' ? '' : 'checked'
  },
  [M.CHANGE_DOWNLOAD_AJAX_TEXT] (state, downloadAjaxText) {
    state.downloadAjaxText = downloadAjaxText
  },
  [M.CHANGE_USERNAME] (state, username) {
    state.username = username
  },
  [M.CHANGE_PASSWORD] (state, password) {
    state.password = password
  },
  [M.CHANGE_CONNECT_SERVER_TYPE] (state, connectServerType) {
    state.connectServerType = connectServerType
  },
  [M.CHANGE_ACCESS_TOKEN] (state, accessToken) {
    state.accessToken = accessToken
  },
  [M.CHANGE_EINSTEIN_INFO_ID] (state, einsteinInfoId) {
    state.einsteinInfoId = einsteinInfoId
  },
  [M.SAVE_SOCKET_ID] (state, socketId) {
    state.socketId = socketId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
