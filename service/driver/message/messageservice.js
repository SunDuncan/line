/**
 * @Author: Duncan
 * @Date: 2017-06-15 8:50
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 通知消息的业务层
 */

var messageDal = appRequire('dal/driver/message/messagedal');

//插入消息的业务层
exports.insertMessage = function (insertData, callback) {
    messageDal.insertMessage(insertData, function (err, inserResult) {
        if (err) {
            callback(true, inserResult);
            return ;
        }

        callback(false, inserResult);
        return ;
    });
}

//查询某一个班级的某一个消息
exports.queryClassMessage = function (queryData, callback) {
    messageDal.queryClassMessage(queryData, function (err, queryResult){
        if (err) {
            callback(true, queryResult);
            return ;
        }

        callback(false, queryResult);
        return ;
    });
} 