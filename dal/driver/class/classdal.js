/**
 * @Author: Duncan
 * @Date: 2017-6-10 15:44
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 班级的dal层的操作
 */


var db_driver = appRequire('db/driver');


/**
 *查询已有的班级的id号为了来生成接下来的班级代码
 */
exports.queryClass = function (queryData, callback)
{
    var arrSql = new Array();
    arrSql.push("SELECT ClassID,CreateUserID,CreateTime,ClassCode,IsActive ");
    arrSql.push("FROM class where IsActive = 1");;
    var sql = arrSql.join(' ');

    db_driver.mysqlPool.getConnection (function(err, connection) {
            if (err) {
                callback(true, "数据库链接失败");
                return ;
            }

            connection.query(sql, function (err, results)
            {
                connection.release();
                if (err)
                {
                    callback(true, "服务器的错误（sql）");
                    return ;
                }

                callback(false, results);
                return ;
            })
    });
}


