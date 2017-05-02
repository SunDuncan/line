/**
 * @Author: Duncan
 * @Date: 2017-05-01 20:40
 * @Last Modified By: 
 * @Last Modified Time:
 */
 
 var db_driver = appRequire('db/driver');
 var userModel = appRequire('model/driver/user/usermodel');
 var config = appRequire('config/config');
 
 //根据Account,pwd查询单一有效用户
 exports.querySingleUser = function (accountName, pwd, callback) {
	 var arr = new Array();
	 arr.push("SELECT UserID,UserName,Gender,Pwd,PortraitAddress,AccountName,IDCard,CreateTime,EndTime,IsActive,StatusID");
	 arr.push("from User Where IsActive = 1 and AccountName = ? and Pwd = ?");
	 
	 var querySql = arr.join(' ');
	 
	 //链接mysql池
	 db_driver.mysqlPool.getConnection(function (err, connection) {
		if (err) {
			callback(true);
			return ;
		} 
		
		connection.query(querySql, [accountName, pwd], function (err, results) {
			connection.release();
			if (err) {
				callback(true);
				return ;
			}
			
			callback(false, results);
			return ;
		});
	 });
 }