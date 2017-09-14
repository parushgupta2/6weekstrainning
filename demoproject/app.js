var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./db.js');
var request = require("request");
var http = require("http");
var qs = require("querystring");
var session  = require('express-session');
var morgan  = require('morgan');
var getmac = require('getmac');
 var multer  = require('multer');


var app = express();

getmac.getMac(function(err,macAddress){
    if (err)  throw err
    //console.log("******mac adress is here************"+macAddress)
})

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.set('publicfolder',path.join(__dirname, 'public/'));
require('./routes/networks')(app, express);

app.get('/*', function(req, res) {
res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/',express.static(__dirname + '/public'));

//app.use('/event_setting', venues);
//app.use('/users', users);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}




// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

process.on('uncaughtException', function (err) { console.log(err);});
//process.on('SIGTERM', function (err) { console.log(err);});
app.listen(5504,function (req, res) {
  console.log('Servers listening at port 5504');
});


module.exports = app;