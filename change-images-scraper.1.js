'use strict'

var request = require('request')
  , cheerio = require('cheerio')
  , Promise = require('bluebird')
  , Nightmare = require('nightmare')
  , RateLimiter = require('limiter').RateLimiter
  , EventEmitter = require('events')
  , util = require('util');


const Xvfb = require('xvfb');
const vo = require('vo');

function Scraper () {
        EventEmitter.call(this);
}

util.inherits(Scraper, EventEmitter);

/**
 * Get the image src for images, options specify the details.
 */
Scraper.prototype.list = function (options) {
  var self = this;

  if (!options || !options.keyword) return Promise.reject(new Error('no keyword provided'));

  const xvfb = new Xvfb();

  xvfb.start(function(){
      vo(run)(function(err, result){
        if (err) throw err;
        xvfb.stop();
        console.log(result);

        if (options.num) {
          result = result.slice(0, options.num);
        }

        result.filter(function (r) {
          return r !== null;
        });

        self.emit('end', result);

        return result;
      });
  });

  function *run(){
    var nightmare = new Nightmare({
      width: 1280,
      height: 700,
      show: false,
      waitTimeout: 6000
    });

    return yield nightmare
      .goto('http://www.google.es')
      .evaluate(function(){
        return document.title;
      })
      .end();
  }
}

module.exports = Scraper;
