var environment = process.env.NODE_ENV || 'development';

var http      = require('http'),
    connect   = require('connect'),
    redirect  = require('connect-redirection'),
    request   = require('superagent'),
    config    = require('./config');

var urls = config[environment].urls;
var base = config[environment].baseUrl;

var app = connect().use(redirect());

app.use(function(req, res){
  var cloudfrontUrl = urls[req.headers.host + req.url];

  if (cloudfrontUrl === undefined) {
    return res.redirect(base + '/404');
  }

  res.writeHead(200, { 'Content-Type' : 'text/html' });

  request
    .get(cloudfrontUrl)
    .pipe(res);
});

http.createServer(app).listen(8000);

