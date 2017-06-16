/**
 * @Author: Duncan
 * @Date: 2017-06-11 15:13
 * @Last Modified By:
 * @Last Modified Time: 
 * @function: 班级用户的插入
 */

var db_driver = appRequire("db/driver");

/**
 * @param UserID 用户的ID
 * @param ClassID 班级的ID
 * @function 班级用户的插入
 */

exports.insertClassUser = function (insertData, callback) {
    var sql = "insert into classuser set ClassID = " + insertData['ClassID'] + ", UserID = " + insertData['UserID'];

    console.log("插入班级用户的sql:" + sql);
    db_driver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库链接失败");
            return ;
        }

        connection.query(sql, function(err, results) {
            connection.release();
            if (err) {
                callback(true, "服务器出错（sql）");
                return ;
            }

            callback(false, results);
            return ;
        });
    });
}

/**
 * @param ClassID 班级的ID
 * @function 查询某个班级中的所有人的信息
 */

exports.queryClassAllInfo = function (queryData, callback) {
    var arrsql = new Array();
    arrsql.push("select A.UserName,B.DictionaryCode as Gender,A.AccountName,A.IDCard,D.DictionaryCode as Status from ");
    arrsql.push("classuser C left join user A on  C.UserID = A.UserID left join dictionary B on");
    arrsql.push("A.Gender = B.DictionaryValueID left join dictionary D on A.StatusID = ");
    arrsql.push("D.DictionaryValueID where B.Category = 'Gender' and D.Category = 'Status'");

    var sql = arrsql.join(' ');
    sql += " and C.ClassID = " + queryData['ClassID'];
    
    console.log("查询班级里面的sql:" + sql);
    db_driver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库链接失败");
            return ;
        }

        connection.query(sql, function(err, results) {
            connection.release();
            if (err) {
                callback(true, "服务器出错（sql）");
                return ;
            }

            callback(false, results);
            return ;
        });
    });

}


//根据用户的班级以及用户的ID来获取信息是否存在在次班级中
exports.queryIsAtClass = function (queryData, callback) {
    var sql = "Select ClassID , UserID from classuser where ClassID = " + queryData.ClassID;
    sql += " and UserID = " + queryData.UserID;

    console.log("查询是否存在班级之中的sql:" + sql);
    db_driver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库链接出错");
            return ;
        }

        connection.query(sql, function(err, queryResult) {
            connection.release();
            if (err) {
                callback(true, "服务器错误（sql）");
                return ;
            }

            callback(false, queryResult);
            return ;
        });
    }) 
}