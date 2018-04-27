import { M } from './types'
import ajaxActions from './ajaxActions'

const state = {
  searchStr: '',
  searchCount: 10,
  downloadPath: '',
  imagesBlocks: [
  ]
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
    ajaxActions().searchGoogle(
      state,
      (results) => {
        console.log('action / SEARCH_IMAGES_FROM_GOOGLE / success')
        console.log('results= ', results)
        commit(M.SEARCH_IMAGES_FROM_GOOGLE, results)
      },
      (res) => {
        console.log('action / SEARCH_IMAGES_FROM_GOOGLE / error', res)
      }
    )
  },
  [M.DOWNLOAD_IMAGES] ({ commit }) {
    console.log('download images')
    let thisObj = this
    ajaxActions().downloadImages(
      state,
      (results) => {
        console.log('action / DOWNLOAD_IMAGES / success')
        console.log('results= ', results)
        // commit(M.DOWNLOAD_IMAGES, results)
      },
      (res) => {
        console.log('action / DOWNLOAD_IMAGES / error', res)
      }
    )
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
    state.imagesBlocks = results
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
