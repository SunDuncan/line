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
 var login = appRequire('api/login');
 var sign = appRequire('api/sign');
 
 router.get('/login', function(req, res, next) {
	 res.render('picture', {
		 title: 'loginde',
		 name: '/images/portrait/2.jpg'
	 })
 });
 
 router.use('/login', login);
 router.use('/sign', sign);
 module.exports = router;