/**
 * @Author: Duncan
 * @Date: 2017-06-05 17:21
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 用户角色表的修改
 */

//加载数据库的连接池
var config = appRequire("config/config");
var db_driver = appRequire("db/driver");

/**
 * @param UserID
 * @param RoleID
 */

exports.insertUserRole = function (insertData, callback) {
    var insertSql = "INSERT INTO userrole SET ";
    insertSql += "UserID = " + insertData['UserID'] + ",RoleID = " + insertData['RoleID']; 

    db_driver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库链接失败");
            return;
        }

        connection.query(insertSql, function (err, results) {
            connection.release();
            if (err) {
                callback(true, "服务器错误(sql)");
                return;
            }

            callback(false, results);
            return ;
        });
    });
}