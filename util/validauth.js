/**
 * @Author: Duncan
 * @Date: 2017-04-28 20:04
 * @Last Modified by:
 * @Last Modified time:
 * @Function: 接口权限
 */

var jwt = require('jwt-simple');
var config = appRequire('config/config');


module.exports = function (req, res, next) {
	if (res.url === '/' || req.url === '/login' || req.url === '/register' || req.url === '/api/v1/login' || req.url === '/api/v1/sign'
		|| req.url=== "/upload" || req.url === "/user") {
		next();
	} else {
		var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
		var key = (req.body && req.body.key) || (req.query && req.query.key) || req.headers['key'];
		
		if (token || key) {
			try {
				if (token == undefined || token.split('.').length !== 3) {
					res.status(400);
					return res.json({
						"status": 400,
						"message": "token不合法"
					});
				}
               
			  var decoded = jwt.decode(token, config.jwt_secret);

				if (decoded.exp <= Date.now()) {
					res.status(400);
					res.json({
						"status": 400,
						"message": "Token过期"
					});
					return;
				} else {
					next();
				}
			} catch (err) {
				res.status(500);
				res.json({
					"status": 500,
					"message": "应用程序异常",
					"error": err
				})
			}
		} else {
			res.status(401);
			res.json({
				"status": 401,
				"message": "未提供鉴权token"
			});
			return;
		}
	}
}