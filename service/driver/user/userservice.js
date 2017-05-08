/**
 * @Author: Duncan
 * @Date: 2017-05-01 21:15
 * @Last Modified By:
 * @Last Modified Time:
 */

var userDAL = appRequire('dal/driver/user/userdal');

var moment = require('moment');
 
//根据accountname ，pwd查询唯一的有效用户
exports.querySingleUser = function (accountname, pwd, callback) {

	if (accountname == undefined || accountname.length == 0) {
		callback(true, "账号不能为空");
		return;
	}

	if (pwd == undefined || pwd.length == 0) {
		callback(true, "密码不能为空");
	}

	userDAL.querySingleUser(accountname, pwd, function (err, querySingleResult) {
		if (err) {
			callback(true, "查询数据库失败");
			return;
		}

		callback(false, querySingleResult);
		return;
	});
}
 
/**
 * 来获取用户的个人信息，查询
 */

exports.queryUser = function (userData, callback) {

	userDAL.queryUser(userData, function (err, queryResult) {
		if (err) {
			callback(true, '数据库查询出错内部的问题');
			return;
		}

		callback(false, queryResult);
		return;
	});
}
  
/**
 * 获取在线的所有的人的个数
 */
exports.queryCountNum = function (data, callback) {
	   userDAL.countNum(data, function (err, countNum) {
		if (err) {
			callback(true, "数据库查询内部出现错误");
			return;
		}

		return callback(false, countNum);
	   });
}
   
   /**
	* 插入用户
    */
exports.insertUser = function (data, callback) {
	userDAL.insert(data, function (err, inserResult) {
		if (err) {
			callback(true, inserResult);
			return ;
		}
		
		return  callback(false, inserResult);
	});
}	
	