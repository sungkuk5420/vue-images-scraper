var Scraper = require ('images-scraper')
  , download = require('image-downloader')
  , promiseLoop = require('promise-loop')
  , google = new Scraper.Google()
  , bing = new Scraper.Bing();
var loopingPromise = function(value) {
    console.log('loopPromiseStart')
    return new Promise(function(resolve, reject) {
        if (value < images.length) {
            var currentImage = images[value];
            var ImageFormat = currentImage.type !== undefined ? currentImage.type : (currentImage.format !== undefined ? currentImage.format : 'error');
            var imageExtension = (ImageFormat.indexOf('png') !== -1) ? 'png' : (ImageFormat.indexOf('jpeg') !== -1 ? 'jpeg' : (ImageFormat.indexOf('jpg') !== -1 ? 'jpg' : 'error'));
            if((imageExtension !== 'error') && (ImageFormat !== 'error')){
                const options = {
                    url: currentImage.url,
                    dest: `./test/download/images/${searchKeyword}${value}.${imageExtension}`
                }
                download.image(options)
                .then(({ filename, image }) => {
                    console.log('download succese')
                    resolve(++value);
                }).catch((err) => {
                    throw err
                    reject();
                })
            }else{
                console.log('extension error')
                resolve(++value);
            }
        } else {
            console.log('\trejecting');
            reject(value < images.length);
        }
    });
};
 
var myPromiseLoop = promiseLoop(loopingPromise);
var searchKeyword = '自動車';
var images = [];
google.list({
    keyword: searchKeyword,
    num: 30,
    detail: true,
    nightmare: {
        show: true
    }
})
.then(function (searchImages) {
    images = searchImages;
    // downloadImages(images)
    myPromiseLoop(0);
}).catch(function(err) {
    console.log('err', err);
});


// bing.list({
//     keyword: searchKeyword,
//     num: 100
// })
// .then(function (images) {
//     downloadImages(images)
// }).catch(function(err) {
//     console.log('err',err);
// })