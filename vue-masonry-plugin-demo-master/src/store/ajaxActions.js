import axios from 'axios'
export default () => {
  return {
    searchGoogle (state, cSuccess, cError) {
      let api = axios.create()
      let apiURL = `http://localhost:3000/searchGoogle?keyword=${state.searchStr}&count=${state.searchCount}`
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
          }
          else {
            let errmsgs = errors.reduce((memo = '', res) => {
              return memo + `${res.status} : ${res.message}\n`
            }, '')
            console.warn(errmsgs)
          }
        },
        (error) => {
          if (error.response.status === 401) {
            cError(error.response.data)
          }
          else if (error.response.status === 500) {
            cError(error.response.status)
          }
          else {
            console.warn(error)
          }
        }
      )
    },

    downloadImages (state, cSuccess, cError) {
      let api = axios.create()
      let imagesURL = JSON.stringify(state.imagesBlocks)
      console.log(imagesURL)
      // return false
      let apiURL = `http://localhost:3000/downloadImages`
      axios.all(
        [
          api.post(apiURL, {
            imagesURL: imagesURL,
            downloadPath: state.downloadPath,
            searchKeyword: state.searchStr
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
          }
          else {
            let errmsgs = errors.reduce((memo = '', res) => {
              return memo + `${res.status} : ${res.message}\n`
            }, '')
            console.warn(errmsgs)
          }
        },
        (error) => {
          if (error.response.status === 401) {
            cError(error.response.data)
          }
          else if (error.response.status === 500) {
            cError(error.response.status)
          }
          else {
            console.warn(error)
          }
        }
      )
    }

  }
}
