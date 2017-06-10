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
exports.queryClass = function (queryData, callback) {
    var arrSql = new Array();
    arrSql.push("SELECT ClassID,CreateUserID,CreateTime,ClassCode,IsActive ");
    arrSql.push("FROM class where IsActive = 1 Order By ClassID desc limit 0,1");;
    var sql = arrSql.join(' ');

    console.log("查询班级的时候的sql=" + sql);
    db_driver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库链接失败");
            return;
        }

        connection.query(sql, function (err, results) {
            connection.release();
            if (err) {
                callback(true, "服务器的错误（sql）");
                return;
            }

            callback(false, results);
            return;
        })
    });
}

/**
 * @param CreateUserID 用户的ID
 * @param CreateTime 创建的时间
 * @param ClassCode 班级的ID代码
 * @param IsActive 是否有效
 * @function 插入班级的信息
 */

exports.insertClass = function (insertData, callback) {
    var sql = "INSERT INTO class SET ";
    var isFirst = 0;//用来判断是否是第一个
    for (var key in insertData) {
        if (isFirst == 0) {
            sql += key + " = '" + insertData[key] + "' ";
            isFirst++;
        } else {
            sql += ', ' + key + "= '" + insertData[key] + "' ";
        }
    }

    console.log("插入班级信息的sql:" + sql);
    db_driver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库连接失败");
            return;
        }

        connection.query(sql, function (err, results) {
            connection.release();
            if (err) {
                callback(true, "服务器错误sql");
                return;
            }

            callback(false, results);
            return;
        });
    });

}


/**
 * @function: 有条件的查询班级的信息
 */

exports.queryClassInfo = function (queryData, callback) {
    var sql = "SELECT ClassID,CreateUserID,CreateTime,EndTime,ClassCode,IsActive FROM class where IsActive = 1 ";
    for (var key in queryData) {
        sql += " and " + key + " = '" + queryData[key] + "' ";
    }
 
    console.log("有条件的查询班级信息sql:" + sql);

    db_driver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库连接错误");
            return ;
        }

        connection.query(sql, function (err, queryResult) {
            connection.release();
            if (err) {
                callback(true, "服务器出现错误（sql）");
                return ;
            }

            callback(false, queryResult);
            return ;
        })
    });

}

/**
 *@function  删除班级
 */
exports.deleteClass = function (deleteData, callback) {
    var sql = "Update table Class SET IsActive = 0 where ClassID = " + deleteData.ClassID;

    console.log("删除班级的sql:" + sql);
    db_driver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库链接失败");
            return ;
        }

        connection.query(sql, function (err, deleteResult) {
            connection.release();
            if (err) {
                callback(true, "服务器出错（sql）");
                return;
            }

            callback(false, deleteResult);
            return ;
        })
    });
}
