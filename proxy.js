'use strict';

var http      = require('http'),
    connect   = require('connect'),
    redirect  = require('connect-redirection'),
    request   = require('superagent'),
    config    = require('./config');

var app = connect().use(redirect());

app.use(function(req, res){
  var cloudfrontUrl = config[req.headers.host + req.url];

  if (cloudfrontUrl === undefined) {
    console.log(req.headers.host + req.url);
    return res.redirect('/404');
  }

  res.writeHead(200, { 'Content-Type' : 'text/html' });

  request
    .get(cloudfrontUrl)
    .pipe(res);
});

http.createServer(app).listen(8000);

