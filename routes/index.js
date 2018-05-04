var express = require('express');
var router = express.Router();
var Scraper = require ('images-scraper')
  , download = require('image-downloader')
  , promiseLoop = require('promise-loop')
  , google = new Scraper.Google()
  , bing = new Scraper.Bing();

var downloadPath = '';
var images = [];
var searchKeyword = '';
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../vue-masonry-plugin-demo-master/dist/', 'index.html'));
});
router.get('/searchGoogle', function(req, res, next) {
  searchKeyword = req.query.keyword;
  google.list({
    keyword: searchKeyword,
    num: req.query.count,
    detail: true,
    nightmare: {
        show: false
    }
  })
  .then(function (searchImages) {
    images = searchImages;
    res.end(JSON.stringify(searchImages));
    // downloadImages(images)
  }).catch(function(err) {
    console.log('err', err);
  });
});
router.post('/downloadImages', function(req, res, next) {
  // console.log(res)
  var myPromiseLoop = promiseLoop(loopingPromise);
  images = JSON.parse(req.body.imagesURL);
  searchKeyword = req.body.searchKeyword
  downloadPath = req.body.downloadPath.replace(/\\/gi,'/');
  // console.log(downloadPath)
  // console.log(downloadPath.substr(downloadPath.length-1,1))
  if (downloadPath.substr(downloadPath.length-1,1) !== '/') {
    downloadPath += '/';
  }
  // console.log(downloadPath);
  myPromiseLoop(0);
  res.end();
});
module.exports = router;


var loopingPromise = function(value) {
  // console.log('loopPromiseStart'+images.length)
  return new Promise(function(resolve, reject) {
      console.log(value)
      if (value < images.length) {
          var currentImage = images[value];
          // console.log('test1')
          var ImageFormat = currentImage.type !== undefined ? currentImage.type : (currentImage.format !== undefined ? currentImage.format : 'error');
          // console.log('test2')
          var imageExtension = (ImageFormat.indexOf('png') !== -1) ? 'png' : (ImageFormat.indexOf('jpeg') !== -1 ? 'jpeg' : (ImageFormat.indexOf('jpg') !== -1 ? 'jpg' : 'error'));
          // console.log('test3')
          if((imageExtension !== 'error') && (ImageFormat !== 'error')){
              // currentImage.url = 'http://blog.rightbrain.co.kr/CMS1/wp-content/uploads/2015/12/1955-Mercedes-Benz-300SL.jpg'
              const options = {
                  url: currentImage.url,
                  dest: `${downloadPath}${searchKeyword}${parseInt(value+1)}.${imageExtension}`
              }
              download.image(options)
              .then(({ filename, image }) => {
                  console.log('download succese')
                  resolve(++value);
              }).catch((err) => {
                  console.log('download error',err)
                  resolve(++value);
              })
          }else{
              console.log('extension error')
              // console.log(ImageFormat)
              resolve(++value);
          }
      } else {
          console.log('\trejecting');
          reject(value < images.length);
      }
  });
};

// bing.list({
//     keyword: searchKeyword,
//     num: 100
// })
// .then(function (images) {
//     downloadImages(images)
// }).catch(function(err) {
//     console.log('err',err);
// })