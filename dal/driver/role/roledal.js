/**
 * @Author: Duncan
 * @Date: 2017-06-17 14:32
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 角色的数据库的dal层
 */

var db_dirver = appRequire('db/driver');

/**
 * @param RoleName 角色的名称
 * @param RoleCode 角色的代号
 * @function 角色的数据库的dal层
 */

 exports.insertRole = function (insertData, callback) {
     var sql = "INSERT INTO role SET ";
     var isFirstParam = 0;
     for(var key in insertData) {
         if (isFirstParam == 0) {
             sql += key + " = '" + insertData[key] + "' ";
             isFirstParam++;
         } else {
             sql += ", " + key + " = '" + insertData[key] + "' ";
         }
     }

     console.log("角色的增加的sql:" + sql);
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
  * @function 查看角色的名称以及状态
  */
 exports.queryRole = function (queryData, callback) {
     var sql = "SELECT RoleID,RoleName as 角色的名称, RoleCode as 角色的代码,IsActive as 有效值 from role where 1=1";
     for (var key in queryData) {
         sql += " and " + key + " = '" + queryData[key] + "' ";  
     }

     console.log("查询角色的sql:" + sql);

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
   * @function 修改角色
   */

  exports.updateRole = function(updateData, callback) {
      var sql = "UPDATE Role SET ";
      var isFirst = 0;
      for (var key in updateData) {
          if (isFirst == 0) {
              sql += key + " = '" + updateData[key] + "' ";
              isFirst++;
          } else {
              sql += ", " + key + " = '" + updateData[key] + "' ";
          }
      }

      sql += "where RoleID = " +  updateData['RoleID'];
      console.log("修改角色的sql:" + sql);
      db_dirver.mysqlPool.getConnection(function(err, connection) {
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