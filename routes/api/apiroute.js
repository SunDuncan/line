/**
 * @Author: Duncan
 * @Date: 2017-04-26  
 * @Last Modified by:
 * @Last Modified Time：
 * @Function:
 */
 
 var express = require('express');
 var router = express.Router();
 var app1 = express();
 var test = appRequire('util/jwthelper');
 
 router.get('/', function(req, res, next) {
	 res.render('login', {
		 title: 'login登录接口'
	 })
	 test();
 });
 
 router.use(function (req, res, next) {
	 console.log("dadas");
	 next();
 });
 
 module.exports = router;