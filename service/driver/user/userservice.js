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
		 return ;
	 }
	 
	 if (pwd == undefined || pwd.length == 0) {
		 callback (true,"密码不能为空");
	 }
	 
	 userDAL.querySingleUser(accountname, pwd, function (err, querySingleResult) {
		if (err) {
			callback(true, "查询数据库失败");
			return;
		} 
		
		callback(false, querySingleResult);
		return ;
	 });
 }