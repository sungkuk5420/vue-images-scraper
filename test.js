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

    var self = this;
    var search_base = 'https://www.google.com/search?q=%&source=lnms&tbm=isch&sa=X&as_rights=(cc_publicdomain|cc_attribute|cc_sharealike).-(cc_noncommercial|cc_nonderived)';

        console.log('options.nightmare');
        console.log(options.nightmare);
        console.log('options.userAgent');
        console.log(options.userAgent);
        console.log('options.keyword');
        console.log(options.keyword);
    var nightmareFunc = new Nightmare(options.nightmare)

        return yield nightmareFunc
    .useragent('Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36')
    .goto(search_base.replace('%', encodeURIComponent(options.keyword)))
    .wait()
    .inject('js', __dirname + '/jquery-2.1.4.min.js')

    .evaluate(function (timeout) {
      $.data(document, 'timeout', false);
      setTimeout(function () {
        $.data(document, 'timeout', true);
      }, timeout);

      setInterval(function() {
        $('html, body').animate({ scrollTop: $(document).height() }, 1000);

        var button = $('.ksb._kvc');    // try to load more
        if (button) {
          $.data(document, 'finished', false);
          button.click();
        }
      }, 1000);

      // catch all AJAX events such that we can determine when we are finished
      var oldSend = XMLHttpRequest.prototype.send;
      XMLHttpRequest.prototype.send = function () {
        var oldOnReady = this.onreadystatechange;
        this.onreadystatechange = function () {
          oldOnReady.call(this);
          if (this.readyState === XMLHttpRequest.DONE)
            $.data(document, 'finished', true);
        }
        oldSend.apply(this, arguments);
      }
    }, options.timeout || 10000)
    .wait(function () {
      return (($(window).scrollTop() + $(window).height() == $(document).height()) &&
          !$('.ksb._kvc').is(':visible') &&
          $.data(document, 'finished')) || $.data(document, 'timeout');
    })

    .evaluate(function () {
      // get all the src's
      var results = [];
      $('.rg_l').each(function () {
        var meta = JSON.parse($(this).parent().find('.rg_meta').text());

        var item = {
          type: 'image/' + meta.ity,
          width: meta.ow,
          height: meta.oh,
          // size: meta.os.match(/[-+]?(\d*[.])?\d+/)[0], // fails query as property no longer exists
          url: meta.ou,
          thumb_url: meta.tu,
          thumb_width: meta.tw,
          thumb_height: meta.th
          // unit: meta.os.match(/\D+/).slice(-1)[0] // fails query as property no longer exists
        };

        results.push(item);
      });
      return results;
    }).end();
  }
}

module.exports = Scraper;
