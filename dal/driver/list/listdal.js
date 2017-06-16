/**
 * @Author: Duncan
 * @Date: 2017-05-13 17:04
 * @Last Modified By: 
 * @Last Modified Time:
 */
var db_driver = appRequire('db/driver');
var listModel = appRequire('model/driver/list/listModel');
var config = appRequire('config/config');
var logger = appRequire('util/loghelper').helper;


/**
 * @param ListID 队列的ID
 * @param UserID 用户的ID
 * @param ListNum 在队列中的序号
 * @param EnterTime 进入的时间
 * @param ExpireTime 本队列的截止时间
 */
exports.insertList = function (insertData, callback) {
	var insert_sql = 'insert into list set';

	var i = 0;
	for (var key in insertData) {
		if (i == 0) {
			insert_sql += ' ' + key + " = " + " '" + insertData[key] + "' ";
			i++;
		} else {
			insert_sql += ", " + key + " = " + " '" + insertData[key] + "' ";
		}

	}

	logger.writeInfo("新增队列：" + insert_sql);
	console.log("新增队列列表：" + insert_sql);

	//数据库的连接池
	db_driver.mysqlPool.getConnection(function (err, connection) {
		if (err) {
			callback(true);
			logger.writeError("[dal/list/listdal]数据库链接错误");
			return;
		}

		//数据库的插入工作
		connection.query(insert_sql, function (err, insertResults) {
			connection.release();
			if (err) {
				callback(true);
				logger.writeError("[dal/list/listdal]数据库插入错误");
				return;
			}

			callback(false, insertResults);
			return;
		});
	});
}

/**
 * 查询队列
 */
exports.queryList = function (queryData, callback) {
	var sqlArr = new Array();
	sqlArr.push("SELECT A.ListID ,A.UserID,B.AccountName,B.UserName,A.ListNum,A.EnterTime,");
	sqlArr.push("A.ExpireTime from list A left join user B on A.UserID = B.UserID");
	var sql = sqlArr.join(' ');

	sql += " where A.ExpireTime = '" + queryData['ExpireTime'] + "' and A.ListID = " + queryData['ListID'];
	sql += " order by A.ListNum";

	console.log("查询队列中的人的信息：" + sql);
	db_driver.mysqlPool.getConnection(function (err, connection) {
		if (err) {
			callback(true, "数据库的连接出错");
			return ;
		} 

		connection.query(sql, function (err, queryResult) {
			connection.release();
			if (err) {
				callback(true, "服务器出错");
				return ;
			}

			callback(false, queryResult);
			return ;
		});
	})
}


/**
 * @function 根据listID去获取队列的消息
 */

exports.queryListInfo = function (queryData, callback) {
	var sql = "select ListID,UserID,ListNum,EnterTime,EndTime,ExpireTime from list where ";
	var isFirstData = 0;
	for (var key in queryData) {
		if (!isFirstData) {
			sql += key + " = '" + queryData[key] + "' ";
			isFirstData++;
		} else {
			sql += " and " + key + " = '" + queryData[key] + "' ";
		}
	}

	sql += " Order By ListNum desc limit 0,1";
	console.log("根据ListID去获取队列的消息sql:" + sql);
	db_driver.mysqlPool.getConnection(function (err, connection) {
		if (err) {
			callback(true, "数据库的连接失败");
			return;
		}

		connection.query(sql, function (err, queryResult) {
			connection.release();
			if (err) {
				callback(false, "服务器出错（sql）");
				return;
			}

			callback(false, queryResult);
			return;
		})
	});

}

/**
 * 退出队列
 */

exports.deleteListUser = function (deleteData, callback) {
	var sql = "DELETE from List Where UserID = " + deleteData['UserID'];

	console.log("退出队列的sql:" + sql);
	db_driver.mysqlPool.getConnection(function (err, connection) {
		if (err) {
			callback(true, "数据库链接错误");
			return ;
		}

		connection.query(sql, function (err, deleteResult) {
			connection.release();
			if (err) {
				callback(true, "服务器错误(sql)");
				return ;
			}

			callback(false, deleteResult);
			return ;
		})
	})
}