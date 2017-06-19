
/**
 * @Author: Duncan
 * @Date: 2017-06-17 14:32
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 功能点的数据库的dal层
 */

var db_dirver = appRequire('db/driver');

/**
 * @param RoleName 功能点的名称
 * @param RoleCode 功能点的代号
 * @function 功能点的数据库的dal层
 */

 exports.insertFunction = function (insertData, callback) {
     var sql = "INSERT INTO function SET ";
     var isFirstParam = 0;
     for(var key in insertData) {
         if (isFirstParam == 0) {
             sql += key + " = '" + insertData[key] + "' ";
             isFirstParam++;
         } else {
             sql += ", " + key + " = '" + insertData[key] + "' ";
         }
     }

     console.log("功能点的增加的sql:" + sql);
     db_dirver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库链接错误");
            return ;
        }

        connection.query(sql, function (err, queryResult) {
            connection.release();
            if (err) {
                callback(true, "服务器错误（sql）");
                return ;
            }

            callback(false, queryResult);
            return ;
        });
     });
 }


 /**
  * @function 查看功能点的名称以及状态
  */
 exports.queryFunction = function (queryData, callback) {
     var sql = "SELECT FunctionID,FunctionName as 功能点的名称, FunctionCode as 功能点的代码,IsActive as 有效值 from function where 1=1";
     for (var key in queryData) {
         sql += " and " + key + " = '" + queryData[key] + "' ";  
     }

     console.log("查询功能点的sql:" + sql);

     db_dirver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库连接错误");
            return ;
        }

        connection.query(sql, function (err, queryResult) {
            if (err) {
                callback(true, "服务器错误（sql）");
                return ;
            }

            callback(false, queryResult);
            return ;
        })
     });

 }

  /**
   * @function 修改功能点
   */

  exports.updateFunction = function(updateData, callback) {
      var sql = "UPDATE function SET ";
      var isFirst = 0;
      for (var key in updateData) {
          if (isFirst == 0) {
              sql += key + " = '" + updateData[key] + "' ";
              isFirst++;
          } else {
              sql += ", " + key + " = '" + updateData[key] + "' ";
          }
      }

      sql += "where FunctionID = " +  updateData['FunctionID'];
      console.log("修改功能点的sql:" + sql);
      db_dirver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库链接错误");
            return ;
        }  

        connection.query(sql, function (err, updateResult) {
            connection.release();
            if (err) {
                callback(true, "服务器错误（sql）");
                return ;
            }

            callback(false, updateResult);
            return ;
        });
      });
  }