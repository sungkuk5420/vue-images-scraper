var express = require('express');
var router = express.Router();
var Scraper = require ('images-scraper')
  , download = require('image-downloader')
  , promiseLoop = require('promise-loop')
  // , google = new Scraper.Google()s
  // , bing = new Scraper.Bing()
  , mkdir = require('node-mkdir')
  , zipdir = require('zip-dir');
var FormData = require('form-data');
var fs = require('fs');
var sf = require('node-salesforce');
var conn = undefined;
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log()
  res.sendFile(__dirname.replace("routes","")+"vue-masonry-plugin-demo-master/dist/index.html");
});

router.get("/login", function(req, res, next){
  var connectServerUrl = req.query.connectServerType === "Product" ? 'https://login.salesforce.com' : 'https://test.salesforce.com';
	conn = new sf.Connection({
	  loginUrl : connectServerUrl
  });
  // 'hmatsuyamaechimo@uhuru.jp';
  // 'Salesf0rceNkm4UuwD9UGULsLIeYbqNdA4M';
	var username = req.query.username;
  var password = req.query.password;
	conn.login(username, password, function(err) {
	  if (!err) {
	  	console.log('login success');

      var records = [];
      var sql = " Select id, token__c From EinsteinInfo__c Where recordtype.developername = 'token'";

      conn.query(sql)
        .on("record", function(record) {
          records.push(record);
        })
        .on("end", function(query) {
          var token = '';
          console.log("total in database : " + query.totalSize);
          console.log("total fetched : " + query.totalFetched);
            for (var i=0; i<records.length; i++) {
              console.log("Token : " + records[i].token__c);
              token = records[i].token__c;
          }
          //return token


          res.end(token);
        })
        .run({ autoFetch : true, maxFetch : 4000 })

	  }else{
      console.log('err'+err);
      res.statusCode = 401;
      res.send('None shall pass');
    }
	})
});
router.get('/searchGoogle', function(req, res, next) {
  // searchKeyword = req.query.keyword;

  // var rootDiractoryName = req.query.rootDownloadPath;
  var searchKeyword = req.query.keyword;
  // var socketId = req.query.socketId;
  console.log(searchKeyword)
  console.log(req.query.count)
  var options = {
    userAgent: 'Mozilla/5.0 (X11; Linux i686; rv:64.0) Gecko/20100101 Firefox/64.0', // the user agent
    puppeteer: {
      args: ['--no-sandbox'],
      headless: true
    }, // puppeteer options, for example, { headless: false }
    tbs: {  // every possible tbs search option, some examples and more info: http://jwebnet.net/advancedgooglesearch.html
      // isz:  // options: l(arge), m(edium), i(cons), etc.
      itp:"photo",  // options: clipart, face, lineart, news, photo
      // ic:   // options: color, gray, trans
      // sur:  // options: fmc (commercial reuse with modification), fc (commercial reuse), fm (noncommercial reuse with modification), f (noncommercial reuse)
    },
    safe: false   // enable/disable safe search
  };
  const google = new Scraper(
    options
  );
  
  (async () => {
    const searchedImages = await google.scrape(searchKeyword, req.query.count);
    console.log('searchedImages', searchedImages);
      const images = searchedImages;
      res.end(JSON.stringify(images));
      // downloadImages(images)
  })();

});
router.get('/searchGoogle2', function(req, res, next) {
  // searchKeyword = req.query.keyword;

  // var rootDiractoryName = req.query.rootDownloadPath;
  var searchKeyword = req.query.keyword;
  // var socketId = req.query.socketId;
  console.log(searchKeyword)
  console.log(req.query.count)
  google.list({
    keyword: searchKeyword,
    num: req.query.count,
    detail: true,
    nightmare: {
        show: true
    }
  })
  .then(function (searchImages) {
    console.log(searchImages)
    images = searchImages;
    res.end(JSON.stringify(searchImages));
    // downloadImages(images)
  }).catch(function(err) {
    console.log('err', err);
  });
});
router.post('/downloadImages', function(req, res, next) {
  // console.log(res)
  var completeImages = 0;
  var completePlusFunc = function(params) {

    completeImages++;
    var mytoken = params.mytoken;
    console.log('images', images.length)
    console.log('completeImages', completeImages)
    if( completeImages === images.length){
      console.log('モデル用画像ファイル作成中')
      io.sockets.emit('Change Layer Text', 'モデル用画像ファイル作成中');
      zipdir(rootDownloadPath+rootDiractoryName, { saveTo: rootDownloadPath+rootDiractoryName+'.zip' }, function (err, buffer) {
        io.sockets.emit('Change Layer Text', 'モデル作成中');
        console.log('zip file created!')
        clearInterval(setIntervalFunc);
        console.log('start file upload zip')
        console.log('file open complete')
        // var mytoken = 'NEWSCXBW2WT3HDOSSYSLNFOXNYNFXR6SUNJ4SRP5FCSCMPHKD3IHFYPV5ZW7HEPSG4E4ZIGW352HRPNXGLM5G5VTLVSZZK33E3YXURI';
        var url = "https://api.einstein.ai/v2/vision/datasets/upload/sync";
        console.log(mytoken)
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
          data: fs.createReadStream(rootDownloadPath+rootDiractoryName+'.zip'),
          type: 'image'
        };
        request.post({headers: headers,url: url, formData: formData}, function(err, httpResponse, body) {
          if (err) {
            return console.error('upload failed:', err);
          }
          console.log(httpResponse.statusCode);
          console.log('Upload successful!  Server responded with:', body);
          if(httpResponse.statusCode === 200){
            io.sockets.emit('Change Layer Text', 'モデル作成 完了');

            var datasetid = JSON.parse(body).id;
            var trainUrl = ' https://api.einstein.ai/v2/vision/train'
            //　トレーニング
            var headers = {
              'user-agent': 'curl/7.22.0',
              'Authorization': `Bearer ${mytoken}`,
              'Cache-Control': 'no-cache',
              'Content-Type': 'multipart/form-data'
            };

            var formData = {
              datasetId: `${datasetid}`,
              name: `${rootDiractoryName}`
            };
            request.post({headers: headers,url: trainUrl, formData: formData}, function(err, httpResponse, body) {
              if (err) {
                return console.error('upload failed:', err);
              }

              var modelId = JSON.parse(body).modelId;
              console.log(httpResponse.statusCode);
              var objectNm = 'EinsteinInfo__c';

              //set model info
              var modelinfo = {
                datasetId__c : `${datasetid}`,
                modelId__c : `${modelId}`,
                description__c : `${rootDiractoryName}`
              };

              conn.sobject(objectNm).create(modelinfo, function(err, ret) {
                if (!err && ret.success) {
                  console.log('Created record id : ' + ret.id);
                  io.sockets.emit('Inserted SObject', ret.id);
                  res.send('success register :' +ret.id);

                }else{
                  console.log('error : ' + err);
                }
              });
              console.log('Upload successful22!  Server responded with:', body);
            });

          }else{
            io.sockets.emit('Change Layer Text', 'モデル作成 失敗');
          }
          setTimeout(() => {
            io.sockets.emit('Remove Layer');
          }, 1000);
        });
      });
    }
  };

  var setIntervalFunc = undefined;
  var myPromiseLoop = promiseLoop(loopingPromise, completePlusFunc);
  var images = [];
  images = JSON.parse(req.body.imagesURL);
  var rootDownloadPath = __dirname.replace(/\\/gi,"/").replace("routes","")+'downloadImages/';
  var rootDiractoryName = req.body.rootDownloadPath;
  var imagesLabels = req.body.imagesLabels;
  var mytoken = req.body.mytoken;
  if (rootDownloadPath.substr(rootDownloadPath.length-1,1) !== '/') {
    rootDownloadPath += '/';
  }
  console.log(mytoken)
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
        subDownloadPathResult: subDownloadPathResult,
        completeImages: 0,
        mytoken: mytoken
      });
    })
  }

  run();

  res.end();
});
module.exports = router;

var loopingPromise = function(params) {
  var value = params.value,
      images = params.images,
      subDownloadPathResult = params.subDownloadPathResult,
      completeImages = params.completeImages,
      mytoken= params.mytoken;
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
                    subDownloadPathResult: subDownloadPathResult,
                    completeImages: completeImages,
                    mytoken: mytoken
                  });
              }).catch((err) => {
                  console.log('download error',err)
                  if(currentImage.checked === 'checked'){
                    io.sockets.emit('Download Complete',value);
                  }
                  resolve({
                    value: ++value,
                    images: images,
                    subDownloadPathResult: subDownloadPathResult,
                    completeImages: completeImages,
                    mytoken: mytoken
                  });
              })
          }else{
              console.log('extension error : '+currentImage.type)
              // console.log(ImageFormat)
              resolve({
                value: ++value,
                images: images,
                subDownloadPathResult: subDownloadPathResult,
                completeImages: completeImages,
                mytoken: mytoken
              });
          }
      } else {
        console.log('reject!')
        completeImages++;
        console.log('completeImages!',completeImages)
        reject({
          completeImages: completeImages,
          mytoken: mytoken
        });
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

