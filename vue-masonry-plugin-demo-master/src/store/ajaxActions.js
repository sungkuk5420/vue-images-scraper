import axios from 'axios'
export default () => {
  return {
    searchGoogle(state, cSuccess, cError) {
      let api = axios.create()
      // let apiURL = `http://localhost:5000/searchGoogle?keyword=${state.searchStr}&count=${state.searchCount}`
      // let apiURL = `http://localhost:5000/searchGoogle?keyword=${state.searchStr}&count=200`
      // let apiURL = `https://vue-image-scrapper.herokuapp.com/searchGoogle?keyword=${state.searchStr}&count=200`;
      let apiURL = `http://localhost:4000/searchGoogle?keyword=${state.searchStr}&count=50`
      axios.all(
        [
          api.get(apiURL)
        ]
      ).then(
        (responses) => {
          let errors = responses.filter((res) => {
            return res.status !== 200
          })
          if (errors.length < 1) {
            console.log('200 response= ', responses[0])
            cSuccess(responses[0].data)
          } else {
            let errmsgs = errors.reduce((memo = '', res) => {
              return memo + `${res.status} : ${res.message}\n`
            }, '')
            console.warn(errmsgs)
          }
        },
        (error) => {
          if (error.response.status === 401) {
            cError(error.response.data)
          } else if (error.response.status === 500) {
            cError(error.response.status)
          } else {
            console.warn(error)
          }
        }
      )
    },

    downloadImages(state, cSuccess, cError) {
      let api = axios.create()
      let imagesURL = JSON.stringify(state.imagesBlocks)
      console.log(imagesURL)
      // return false
      let apiURL = `http://localhost:5000/downloadImages`
      // let apiURL = `http://54.64.84.165.compute-1.amazonaws.com:5000/downloadImages`
      axios.all(
        [
          api.post(apiURL, {
            imagesURL: imagesURL,
            imagesLabels: state.imagesLabels,
            rootDownloadPath: state.rootDownloadPath,
            searchKeyword: state.searchStr,
            mytoken: state.accessToken
          })
        ]
      ).then(
        (responses) => {
          let errors = responses.filter((res) => {
            return res.status !== 200
          })
          if (errors.length < 1) {
            console.log('200 response= ', responses[0])
            cSuccess(responses[0].data)
          } else {
            let errmsgs = errors.reduce((memo = '', res) => {
              return memo + `${res.status} : ${res.message}\n`
            }, '')
            console.warn(errmsgs)
          }
        },
        (error) => {
          if (error.response.status === 401) {
            cError(error.response.data)
          } else if (error.response.status === 500) {
            cError(error.response.status)
          } else {
            console.warn(error)
          }
        }
      )
    },

    login(state, cSuccess, cError) {
      let api = axios.create()
      let apiURL = `http://localhost:5000/login?username=${state.username}&password=${state.password}&connectServerType=${state.connectServerType}`
      // let apiURL = `http://54.64.84.165.compute-1.amazonaws.com:5000/login?username=${state.username}&password=${state.password}&connectServerType=${state.connectServerType}`
      axios.all(
        [
          api.get(apiURL)
        ]
      ).then(
        (responses) => {
          let errors = responses.filter((res) => {
            return res.status !== 200
          })
          if (errors.length < 1) {
            console.log('200 response= ', responses[0])
            cSuccess(responses[0].data)
          } else {
            let errmsgs = errors.reduce((memo = '', res) => {
              return memo + `${res.status} : ${res.message}\n`
            }, '')
            console.warn(errmsgs)
          }
        },
        (error) => {
          cError(error)
        }
      )
    }

  }
}
