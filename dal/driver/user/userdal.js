/**
 * @Author: Duncan
 * @Date: 2017-05-01 20:40
 * @Last Modified By: 
 * @Last Modified Time:
 * @function: 用户的dal层
 */

var db_driver = appRequire('db/driver');
var userModel = appRequire('model/driver/user/usermodel');
var config = appRequire('config/config');
var userKey = appRequire('model/driver/user/usermodel');

//根据Account,pwd查询单一有效用户
exports.querySingleUser = function (accountName, pwd, callback) {
	var arr = new Array();
	arr.push("SELECT UserID,UserName,Gender,Pwd,PortraitAddress,AccountName,IDCard,CreateTime,EndTime,IsActive,StatusID");
	arr.push("from User Where IsActive = 1 and AccountName = ? and Pwd = ?");

	var querySql = arr.join(' ');

	console.log('querysql = ' + querySql);
	//链接mysql池
	db_driver.mysqlPool.getConnection(function (err, connection) {
		if (err) {
			callback(true, "数据连接失败");
			return;
		}

		connection.query(querySql, [accountName, pwd], function (err, results) {
			connection.release();
			if (err) {
				callback(true);
				return;
			}

			callback(false, results);
			return;
		});
	});
}

/**
 * 查取用户的信息
 */

exports.queryUser = function (userData, callback) {
	var arr = new Array();
	arr.push('select A.UserID,A.UserName,A.Gender,A.Pwd,A.PortraitAddress,A.AccountName,A.IDCard,A.CreateTime,A.EndTime,A.IsActive,A.StatusID,B.DictionaryValue as Status');
	arr.push(",C.ClassID from User A left join Dictionary B on A.StatusID = B.DictionaryValueID left join classuser C on A.UserID = C.UserID where 1 = 1 and A.IsActive = 1 and B.Category = 'Status'");
	var sql = arr.join(' ');
	for (var key in userData) {
		if (key != 'PageNum' && key != 'CurPage') {
			sql += " and " + key + " = '" + userData[key] + "' ";
		}
	}

	var num = userData['PageNum'];//每一页要显示的数量
	sql += ' order by A.UserID';

	sql += " limit " + (userData['CurPage'] - 1) * num + " , " + num;

	console.log("查询用户的时候: " + sql);
	//链接数据库的池
	db_driver.mysqlPool.getConnection(function (err, connection) {
		connection.release();
		if (err) {
			callback(true);
			return;
		}

		connection.query(sql, function (err, queryResult) {
			if (err) {
				callback(true);
				return;
			}

			callback(false, queryResult);
			return;
		});
	});
}

/**
 * 获取用户的总的数量
 */

exports.countNum = function (data, callback) {
	var sql = "select count(1) as num from User where IsActive = 1 ";

	for (var key in data) {

		if (key != 'PageNum' && key != 'CurPage') {
			sql += ' and ' + key + " = '" + data[key] + "' ";
		}
	}

	console.log("查询用户数量的时候的sql: " + sql);
	//链接数据库的链接池
	db_driver.mysqlPool.getConnection(function (err, connection) {
		connection.release();

		if (err) {
			callback(true);
			return;
		}

		connection.query(sql, function (err, countNum) {
			if (err) {
				callback(true);
				return;
			}

			callback(false, countNum);
			return;
		});
	});

}


/**
 * 插入用户
 */
exports.insert = function (data, callback) {
	var sql = "insert into User set";

	var i = 0;
	for (var key in data) {
		if (i == 0) {
			sql += " " + key + " = '" + data[key] + "' ";
			i++;
		} else {
			sql += ", " + key + " = '" + data[key] + "' ";
		}
	}

	console.log("插入用户的sql: " + sql);

	db_driver.mysqlPool.getConnection(function (err, connection) {
		if (err) {
			console.log("链接数据库池失败");
			callback(true);
			return;
		}

		connection.release();
		connection.query(sql, function (err, insertResult) {
			if (err) {
				callback(true, "数据库插入失败");
				return;
			}

			callback(false, insertResult);
			return;
		});
	})
};

/**
 * 修改用户的信息
 */
exports.update = function (data, callback) {
	var sql = "update User set ";

	//测试
	var i = 0;
	for (var key in data) {
		if (i == 0) {
			sql += key + " = '" + data[key] + "' ";
			i++;
		} else {
			sql += ", " + key + " = '" + data[key] + "' ";
		}
	}

	sql += "where " + userModel.PK + " = " + data[userModel.PK];
	console.log("修改用户的sql: " + sql);
	db_driver.mysqlPool.getConnection(function (err, connection) {
		if (err) {
			callback(true, "数据库连接失败");
			return;
		}

		connection.release();
		connection.query(sql, function (err, updateResult) {
			if (err) {
				callback(true, '服务器的错误(sql)');
				return;
			}

			callback(false, updateResult);
			return;
		});
	})
}