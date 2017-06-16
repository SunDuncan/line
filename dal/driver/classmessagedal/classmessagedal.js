/**
 * @Author: Duncan,
 * @Date: 2017-06-15 9:44
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 班级的消息的数据库的dal层
 */

var db_driver = appRequire("db/driver");
exports.insertClassMessage = function (insertData, callback) {
    var sql = "INSERT INTO classmessage SET ClassID = " + insertData['ClassID'] + ", MessageID = " + insertData['MessageID'];
    
    console.log("插入班级消息的sql:" + sql);
    db_driver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库链接错误");
            return;
        }

        connection.query(sql, function (err, insertResult) {
            connection.release();
            if(err) {
                callback(true, "服务器错误（sql）");
                return ;
            }

            callback(false, insertResult);
            return ;
        })
    });
}