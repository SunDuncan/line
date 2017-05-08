/**
 * @Author: Duncan
 * @Date: 2017-05-02 20:32
 * @Last Modified By:
 * @Last Modified Time:
 * @function：注册的路由接口
 */

var express = require('express');
var url = require('url');
var router = express.Router();
var moment = require('moment');
var userService = appRequire('service/driver/user/userservice');
 
 
/**
 * 插入用户的信息
 */
router.post('/', function (req, res) {
     
	/**用来检验是否为空 */
	var dataRequire = ['UserName', 'Gender', 'Pwd', 'AccountName', 'IDCard'];
	var dataRequire1 = ['真实姓名', '性别', '密码', '用户昵称', '身份证号'];
	var errSend = '未填： ';
	var userName = req.body.UserName;
	var gender = req.body.Gender;
	var pwd = req.body.Pwd;
	var accountName = req.body.AccountName;
	var idCard = req.body.IDCard;

	for (var key in dataRequire) {
		if (!(dataRequire[key] in req.body)) {
			errSend += dataRequire1[key] + " ,";
		};
	}

	if (errSend != '未填： ') {
		res.status(400);
		res.json({
			status: 400,
			isSuccess: false,
			msg: errSend
		});
		return;
	}

	var dataValue = {
		UserName: userName,
		Gender: gender,
		Pwd: pwd,
		AccountName: accountName,
		IDCard: idCard,	
	}

	var dataValueRequire = '未填值：';
	for (var key in dataValue) {
		if (dataValue[key] == undefined || dataValue[key].length == 0) {
			dataValueRequire += key + ", ";
		}
	}

	if (dataValueRequire != '未填值：') {
		res.status(400);
		res.json({
			status: 400,
			isSuccess: false,
			msg: dataValueRequire
		});
		return;
	}
	 
	//用来用户名判断长度
	if (userName.length > 100) {
		res.status(400);
		return res.json(
			{
				code: 400,
				isSuccess: false,
				msg: "姓名的字符长度超过的100"
			});

	}

	//用来账户名判断长度
	if (accountName.length > 100) {
		res.status(400);
		return res.json(
			{
				code: 400,
				isSuccess: false,
				msg: "昵称名的字符长度超过的100"
			});
	}

    if (!(/^\d{17}[x|\d|X]/.test(idCard))) {
		res.status(400);
		res.json({
			status: 400,
			isSuccess: false,
			msg: "请输入正确的身份证号码"
		});
		return ;
	}
	
    dataValue.CreateTime = moment().format("YYYY-MM-DD HH:mm:ss");
	dataValue.IsActive = 1;
    /**
	 * 相同用户名的判断
	 */
   userService.queryUser({AccountName: accountName,
	   CurPage: 1,
	   PageNum: 15
	   }, function(err, queryResult){
	  if (err) {
		  res.status(500);
		  res.json({
			  status: 500,
			  isSuccess: false,
			  msg: '服务器出错'
		  })
		  return ;
	  } 
	  
	  if (queryResult != undefined && queryResult.length != 0) {
		  res.status(401);
		  return res.json({
			 status: 401,
			 isSuccess: false,
			 msg: "昵称已存在" 
		  })		  
	  }
	  
	  userService.insertUser(dataValue, function (err, insertResult) {
		 if (err) {
			 res.status(500);
			 res.json({
				 status: 500,
				 isSuccess: false,
				 msg: insertResult
			 });
			 return ;
		 } 
		 
		 if (insertResult != 0) {
			 res.status(200);
			 res.json({
				status: 200,
				isSuccess: true,
				msg: "注册成功" 
			 });
			 return ;
		 }
	  });
   });

});



module.exports = router;