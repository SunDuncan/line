/**
 * @Author: Duncan
 * @Time: 2017-04-28 19:22
 * @Last Modified by:
 * @Last Modified time:
 * @function: 生成access_token
 */
 
 var jwt = require('jwt-simple');
 var config = appRequire('config/config');
 
 function expiresIn(numDays) {
	 var dateObj = new Date();
	 return dateObj.setDate(dateObj.getDate() + numDays);
 }
 
 exports.getToken = function(user) {
 	var expires = expiresIn(1);//3天后token过期
	 var token = jwt.encode({
		 exp: expires
	 }, config.jwt_secret); 
	 

	 return {
		 access_token: token,
		 data: user,
		 expires: expires
	 }
 
 }