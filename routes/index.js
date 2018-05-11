var express = require('express');
var router = express.Router();
var Scraper = require ('images-scraper')
  , download = require('image-downloader')
  , promiseLoop = require('promise-loop')
  , google = new Scraper.Google()
  , bing = new Scraper.Bing()
  , mkdir = require('node-mkdir')
  , zipdir = require('zip-dir');
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
  downloadPath = __dirname.replace(/\\/gi,"/").replace("routes","")+'downloadImages/'
  if (downloadPath.substr(downloadPath.length-1,1) !== '/') {
    downloadPath += '/';
  }  
  async function run() {   
    let path2 = await mkdir('downloadImages/'+searchKeyword+'/', (__dirname.replace(/\\/gi,"/").replace("/routes","")));
    myPromiseLoop(0);
  }
   
  run();

  res.end();
});
module.exports = router;


var loopingPromise = function(value) {
  // console.log('loopPromiseStart'+images.length)
  return new Promise(function(resolve, reject) {
      console.log(value)
      if (value < images.length) {
          var currentImage = images[value];
          var ImageFormat = currentImage.type !== undefined ? currentImage.type : (currentImage.format !== undefined ? currentImage.format : 'error');
          var imageExtension = (ImageFormat.indexOf('png') !== -1) ? 'png' : (ImageFormat.indexOf('jpeg') !== -1 ? 'jpeg' : 'jpg');
          if((imageExtension !== 'error') && (ImageFormat !== 'error') && (currentImage.checked === 'checked')){
              // currentImage.url = 'http://blog.rightbrain.co.kr/CMS1/wp-content/uploads/2015/12/1955-Mercedes-Benz-300SL.jpg'
              const options = {
                  url: currentImage.url,
                  dest: `${downloadPath}${searchKeyword}/${searchKeyword}${parseInt(value+1)}.${imageExtension}`
              }
              download.image(options)
              .then(({ filename, image }) => {
                  console.log('download succese')
                  io.sockets.emit('Download Complete',value);
                  resolve(++value);
              }).catch((err) => {
                  console.log('download error',err)
                  resolve(++value);
              })
          }else{
              console.log('extension error : '+currentImage.type)
              // console.log(ImageFormat)
              resolve(++value);
          }
      } else {
          zipdir(downloadPath+searchKeyword, { saveTo: downloadPath+searchKeyword+'.zip' }, function (err, buffer) {
            console.log('zip file created!')
          });
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

