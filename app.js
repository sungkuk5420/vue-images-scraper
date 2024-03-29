var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var getRawBody = require('raw-body')
var index = require('./routes/index');
var users = require('./routes/users');
var http = require('http');

var app = express();
var cors = require('cors')

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: 5000000}));
app.use(bodyParser.urlencoded({limit: 5000000, extended: true, parameterLimit:50000}));
app.use(function (err, req, res, next) {
  console.log(err)
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '1mb',
    encoding: contentType.parse(req).parameters.charset
  }, function (err, string) {
    console.log(err)
    if (err) return next(err)
    req.text = string
    next()
  })
})
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'vue-masonry-plugin-demo-master/dist')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

const PORT = process.env.PORT || 5000;

var httpServer =http.createServer(app).listen(PORT, function(req,res){
  console.log('Socket IO server has been started '+PORT);
});
// upgrade http server to socket.io server
// io = require('socket.io').listen(httpServer);

// io.sockets.on('connection',function(socket){
//   socket.emit('test',{msg:'Welcome !'});
//   //socket.on('fromclient',function(data){
//   //  socket.broadcast.emit('toclient',data); // 자신을 제외하고 다른 클라이언트에게 보냄
//   //  socket.emit('toclient',data); // 해당 클라이언트에게만 보냄. 다른 클라이언트에 보낼려면?
//   //  console.log('Message from client :'+data.msg);
//   //})
// });