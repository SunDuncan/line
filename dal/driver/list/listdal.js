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
  * 插入列表
  */
 exports.insertList = function (insertData, callback) {
	 var insert_sql = 'insert into List set';
	 
	 var i = 0;
	 for (var key in insertData) {
		 if (i == 0) {
			 insert_sql += ' ' + key + " = " + " '" + insertData[key] + "' ";
			 i++;
		 } else {
			 insert_sql += ", " + key + " = " + " '" + insertData[key] + "' ";
		 }
		 
		 logger.writeInfo("新增队列：" + insert_sql);
		 console.log("新增队列列表：" + insert_sql);
		 
		 //数据库的连接池
		 db_driver.mysqlPool.getConnection(function (err, connection) {
			if (err) {
				callback(true);
				logger.writeError("[dal/list/listdal]数据库链接错误");
				return ;
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
				return ;
			});
		 });
	 }
 } 
  
  /**
   * 查询列表
   */
  exports.queryList = function (queryData, callback) {
	  var arr = new Array();
	  arr.push('select A.ClassID,B.ListID,D.UserName,E.ListNum from Class A left join List B on B.ClassID = A.ClassID');
	  arr.push('left join ListUser C on C.ClassID = A.ClassID left join User D on D.UserID = C.UserID left join ListUser E on E.UserID = D.UserID');
	  arr.push('where D.StatusID = 1 and B.IsActive = 1');
	  var sql = arr.join(' ');
	  
	  var num = queryData['pageNum'];
	  sql += " order by E.ListNum ";
	  
	  sql += " limit " + (queryData['page'] - 1) * num + " , " + num;
      
	  logger.writeInfo("查询队列：" + sql);
	  console.log("查询队列" + sql);
	  
	  db_driver.mysqlPool.getConnection(function (err, connection) {
		 if (err) {
			 callback(true);
			 logger.writeError('[dal/driver/list/listdal]数据库链接错误');
			 return ;
		 } 
		 
		 connection.query(sql, function (err, queryResult) {
			connection.release();
			if (err) {
				callback(true);
				logger.writeError('[dal/driver/list/listdal]数据库查询出错');
				return ;
			} 
			
			callback(false, queryResult);
			return ;
		 });
	  });	
  } 
   
  /**
   * 根据时间查询列表中的数量
   */
   
   