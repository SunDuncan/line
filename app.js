require("./global_bootstrap");

var path = require("path");
var express = require('express');
var config = appRequire('config/config');
var routes = appRequire('routes/routes');
var bodyParser = require('body-parser');
var app = express();

//加载hbs模块
var hbs = require('hbs');

//避免dot-hell
global.appRequire = function(path) {
  return require(path.resolve(__dirname, path));
}

//制定模板文件的后缀名为html
app.set('view engine', 'html');
//设置views文件夹
app.set('views', path.join(__dirname, 'views'));


//运行hbs模块
app.engine('html', hbs.__express);

//加载body-parser的模块
app.use(bodyParser.json());

//制定静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

routes(app);

var http = require('http');
http.createServer(app).listen(config.port, function () {
  console.log("the Express server is running on " + config.port);
});

module.exports = app;