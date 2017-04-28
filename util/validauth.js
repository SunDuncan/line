/**
 * @Author: Duncan
 * @Date: 2017-04-28 20:04
 * @Last Modified by:
 * @Last Modified time:
 * @Function: 接口权限
 */
 
 var jwt = require('jwt-simple');
 var config = appRequire('config/config');
 
 
 module.exports = function(req, res, next) {
	 if (res.url === '/' || req.url === '/login' || req.url === '/register') {
		 next();
	 } else {
		 var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
		 var key = (req.body && req.body.jitkey) || (req.query && req.query.jitkey) || req.headers['jitkey'];
		 
		 if (token || key) {
			 
		 } 
	 }
 }