var express = require('express');
var router = express.Router();
var Scraper = require ('images-scraper')
  , download = require('image-downloader')
  , promiseLoop = require('promise-loop')
  , google = new Scraper.Google()
  , bing = new Scraper.Bing()
  , mkdir = require('node-mkdir')
  , zipdir = require('zip-dir');
var rootDownloadPath = '';
var searchKeyword = '';
var imagesLabels = [];
var completeImages = 0;
var setIntervalFunc = undefined;
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
  var images = [];
  images = JSON.parse(req.body.imagesURL);
  searchKeyword = req.body.searchKeyword
  rootDownloadPath = __dirname.replace(/\\/gi,"/").replace("routes","")+'downloadImages/';
  imagesLabels = req.body.imagesLabels;
  if (rootDownloadPath.substr(rootDownloadPath.length-1,1) !== '/') {
    rootDownloadPath += '/';
  }  
  async function run() {
    // console.log(rootDownloadPath);
    // console.log(imagesLabels);
    
    let rootDownloadPathResult = await mkdir('downloadImages/'+req.body.rootDownloadPath+'/', (__dirname.replace(/\\/gi,"/").replace("/routes","")));

    await imagesLabels.forEach((currentLabel)=>{
      mkdir('downloadImages/'+req.body.rootDownloadPath+'/'+Object.keys(currentLabel)[0]+'/', (__dirname.replace(/\\/gi,"/").replace("/routes","")));
      var index = currentLabel[Object.keys(currentLabel)];
      var subDownloadPathResult = __dirname.replace(/\\/gi,"/").replace("routes","")+'downloadImages/'+req.body.rootDownloadPath+'/'+Object.keys(currentLabel)[0]+'/';
      myPromiseLoop({
        value: 0,
        images: images[index],
        subDownloadPathResult: subDownloadPathResult
      });
    })
    setIntervalFunc = setInterval(() => {
      // console.log('images', images.length)
      // console.log('completeImages', completeImages)
      if( completeImages === images.length){
        zipdir(rootDownloadPath+req.body.rootDownloadPath, { saveTo: rootDownloadPath+req.body.rootDownloadPath+'.zip' }, function (err, buffer) {
          console.log('zip file created!')
          clearInterval(setIntervalFunc);
        });
      }
    }, 5000)
    
  }
   
  run();

  res.end();
});
module.exports = router;


var loopingPromise = function(params) {
  var value = params.value,
      images = params.images,
      subDownloadPathResult = params.subDownloadPathResult;
  // console.log('loopPromiseStart'+subDownloadPathResult)
  return new Promise(function(resolve, reject) {
      console.log(value)
      // console.log(images.length)
      if (value < images.length) {
          var currentImage = images[value];
          var ImageFormat = currentImage.type !== undefined ? currentImage.type : (currentImage.format !== undefined ? currentImage.format : 'error');
          var imageExtension = (ImageFormat.indexOf('png') !== -1) ? 'png' : (ImageFormat.indexOf('jpeg') !== -1 ? 'jpeg' : 'jpg');
          if((imageExtension !== 'error') && (ImageFormat !== 'error') && (currentImage.checked === 'checked')){
              // currentImage.url = 'http://blog.rightbrain.co.kr/CMS1/wp-content/uploads/2015/12/1955-Mercedes-Benz-300SL.jpg'
              const options = {
                  url: currentImage.url,
                  dest: `${subDownloadPathResult}/${parseInt(value+1)}.${imageExtension}`
              }
              download.image(options)
              .then(({ filename, image }) => {
                  console.log('download succese')
                  io.sockets.emit('Download Complete',value);
                  resolve({
                    value: ++value,
                    images: images,
                    subDownloadPathResult: subDownloadPathResult
                  });
              }).catch((err) => {
                  console.log('download error',err)
                  resolve({
                    value: ++value,
                    images: images,
                    subDownloadPathResult: subDownloadPathResult
                  });
              })
          }else{
              console.log('extension error : '+currentImage.type)
              // console.log(ImageFormat)
              resolve({
                value: ++value,
                images: images,
                subDownloadPathResult: subDownloadPathResult
              });
          }
      } else {
        console.log('reject!')
        completeImages++;
        console.log('completeImages!',completeImages)
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

