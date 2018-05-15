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
var rootDiractoryName = '';
var searchKeyword = '';
var imagesLabels = [];
var completeImages = 0;
var setIntervalFunc = undefined;
var FormData = require('form-data');
var fs = require('fs');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../vue-masonry-plugin-demo-master/dist/', 'index.html'));
});
router.get('/searchGoogle', function(req, res, next) {
  // searchKeyword = req.query.keyword;
  rootDiractoryName = req.query.rootDownloadPath;
  searchKeyword = rootDiractoryName+' '+req.query.keyword;
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
  rootDownloadPath = __dirname.replace(/\\/gi,"/").replace("routes","")+'downloadImages/';
  rootDiractoryName = req.body.rootDownloadPath;
  imagesLabels = req.body.imagesLabels;
  if (rootDownloadPath.substr(rootDownloadPath.length-1,1) !== '/') {
    rootDownloadPath += '/';
  }  
  async function run() {
    // console.log(rootDownloadPath);
    // console.log(imagesLabels);
    
    let rootDownloadPathResult = await mkdir('downloadImages/'+rootDiractoryName+'/', (__dirname.replace(/\\/gi,"/").replace("/routes","")));

    await imagesLabels.forEach((currentLabel)=>{
      mkdir('downloadImages/'+rootDiractoryName+'/'+Object.keys(currentLabel)[0]+'/', (__dirname.replace(/\\/gi,"/").replace("/routes","")));
      var index = currentLabel[Object.keys(currentLabel)];
      var subDownloadPathResult = __dirname.replace(/\\/gi,"/").replace("routes","")+'downloadImages/'+rootDiractoryName+'/'+Object.keys(currentLabel)[0]+'/';
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
        io.sockets.emit('Change Layer Text', 'Create Zip File');
        zipdir(rootDownloadPath+rootDiractoryName, { saveTo: rootDownloadPath+rootDiractoryName+'.zip' }, function (err, buffer) {
          io.sockets.emit('Change Layer Text', 'Upload Zip File');
          console.log('zip file created!')
          clearInterval(setIntervalFunc);
          console.log('start file upload zip')
          console.log('file open complete')
          var mytoken = 'NEWSCXBW2WT3HDOSSYSLNFOXNYNFXR6SUNJ4SRP5FCSCMPHKD3IHFYPV5ZW7HEPSG4E4ZIGW352HRPNXGLM5G5VTLVSZZK33E3YXURI';
          var url = "https://api.einstein.ai/v1/vision/datasets/upload";
      
          var request = require('request');
          var headers = {             
              'user-agent': 'curl/7.22.0',
              'Authorization': `Bearer ${mytoken}`,
              'Cache-Control': 'no-cache',
              'Content-Type': 'multipart/form-data'
          };
          
          console.log(rootDownloadPath+rootDiractoryName+'.zip');
          
          var https = require('https');
          var FormData = require('form-data');
          var formData = {
            data: fs.createReadStream(rootDownloadPath+rootDiractoryName+'.zip')
          };
          request.post({headers: headers,url: url, formData: formData}, function(err, httpResponse, body) {
            if (err) {
              return console.error('upload failed:', err);
            }
            console.log(httpResponse.statusCode);
            console.log('Upload successful!  Server responded with:', body);
            if(httpResponse.statusCode === 200){
              io.sockets.emit('Change Layer Text', 'Upload Successful');
            }else{
              io.sockets.emit('Change Layer Text', 'Upload Fail');
            }
            setTimeout(() => {
              io.sockets.emit('Remove Layer');
            }, 500);
          });
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
                  if(currentImage.checked === 'checked'){
                    io.sockets.emit('Download Complete',value);                    
                  }
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

