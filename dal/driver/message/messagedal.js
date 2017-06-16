/**
 * @Author: Duncan
 * @Date: 2017-06-14 19:57
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 教练的通知消息的数据库层
 */

var db_driver = appRequire("db/driver");


/**
 * @param MessageTitle 消息的标题
 * @param MessageContent 消息的内容
 * @param CreateUserID 创建者的ID
 * @param CreateTime 创建的时间
 * @param IsActive 是否有效
 * @function 消息的插入工作
 */

exports.insertMessage = function (insertData, callback) {
    var sql = "INSERT INTO message SET ";
    var isFirstKey = 0;
    for (var key in insertData) {
        if (isFirstKey == 0) {
            sql += key + " = '" + insertData[key] + "' ";
            isFirstKey++;
        } else {
            sql += ", " + key + " = '" + insertData[key] + "' ";
        }        
    }

    console.log("插入教练的通知消息sql:" + sql);
    db_driver.mysqlPool.getConnection(function (err, connection) {
        if (err) {
            callback(true, "数据库的连接失败");
            return;
        }

        connection.query(sql, function(err, insertResult) {
            if (err) {
                callback(true, "服务器的错误(sql)");
                return ;
            }

            callback(false, insertResult);
            return ;
        });
    });
}

//查询某个班级的某一天的消息
exports.queryClassMessage = function (queryData, callback) {
    var sqlArr = new Array();
    sqlArr.push("select B.MessageTitle,B.MessageContent,B.CreateTime from classmessage");
    sqlArr.push("A left join message B on A.MessageID = B.ID where A.ClassID = ");
    
    var sql = sqlArr.join(' ');
    sql +=  queryData['ClassID'] + " and B.Createtime = '" + queryData['CreateTime'] + "' ";

    console.log("查询某一个班级某一天的消息的sql:" + sql);
    db_driver.mysqlPool.getConnection(function (err, connection){ 
        if (err) {
            callback(true, "数据库链接错误");
            return ;
        }

        connection.query(sql, function (err, queryResult) {
            connection.release();
            if (err) {
                callback(true, "服务器的操作错误");
                return ;
            }

            callback(false, queryResult);
            return ;
        })
    })
}