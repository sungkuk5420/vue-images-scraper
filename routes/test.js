
var Scraper = require ('images-scraper')
, download = require('image-downloader')
, promiseLoop = require('promise-loop')
, google = new Scraper.Google()
, bing = new Scraper.Bing()
, mkdir = require('node-mkdir')
, zipdir = require('zip-dir');


google.list({
    keyword: '소녀시대',
    num: 25,
    detail: true,
    nightmare: {
        show: true
    }
  })
  .then(function (searchImages) {
    images = searchImages;
    console.log(JSON.stringify(searchImages));
    // downloadImages(images)
  }).catch(function(err) {
    console.log('err', err);
  });