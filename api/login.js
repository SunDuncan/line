/**
 * @Author: Duncan
 * @Date: 2017-05-01 19:20
 * @Last Modified By:
 * @Last Modified Time:
 */
 
 var express = require('express');
 var url = require('url');
 var router = express.Router();
 var jwtHelper = appRequire('util/jwthelper'); 
 var userService = appRequire('service/driver/user/userservice');
 
 
 router.post('/', function(req, res) {
	var resultData = {
		data: {
			'isSuccess': false,
			'accountId': -1,
			'signType': -1,
			'msg': '登录失败，请刷新后重试'
		}
	};
	
	var username = req.body.username || '';
	var password = req.body.password || '';
	
	if (!(username && password)) {
		res.status(401);
		resultData.data.isSuccess = false;
		resultData.data.msg = '账号密码不能为空';
		return res.json(resultData);
	}
	
	//当输入的值不为空的时候
	var data = {
		"AccountName": username,
		"password": password
	}
	
	userService.querySingleUser(data.AccountName, data.password, function (err, queryResult) {
		if (err) {
			res.status(500);

			return res.json(resultData);
		}
		
		//账号密码数据库没有查到
		if (queryResult == undefined || queryResult.length == 0) {
			res.status(401);
			resultData.data.msg = '账号密码不匹配，请重新输入';
			return res.json(resultData);
		}
		
		console.log("查询成功 " + queryResult[0].UserID);
		resultData.data.accountId = queryResult[0].UserID;
		resultData.data.isSuccess = true;
		resultData.data.msg = '登录成功';
		
		resultData.data.signType = 1;
		
		var signStatus = resultData.data.signType == 0 ? 1 : 0;
		
		resultData.data.signType = signStatus;
		
		return res.json(jwtHelper.getToken(resultData.data));
		
	});
	
 });
 
 
 
 module.exports = router;