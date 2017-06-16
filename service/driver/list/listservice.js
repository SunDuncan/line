/**
 * @Author: Duncan
 * @Date: 2017-6-16 11:06
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 队列的业务层的要求
 */

var listDal = appRequire('dal/driver/list/listdal');


exports.insertDal = function (insertDate, callback) {
    listDal.insertList(insertDate, function (err, insertResult) {
        if (err) {
            callback(true, insertResult);
            return ;
        }

        callback(false, insertResult);
        return ;
    })
} 


//根据具体的条件去查询队列的表格
exports.queryListInfo = function (queryData, callback) {
    listDal.queryListInfo(queryData, function (err, queryResult) {
        if (err) {
            callback(true, queryResult);
            return ;
        }

        callback(false, queryResult);
        return ;
    });
}

//查询队列中所有人的排队情况
exports.queryList = function (queryData, callback) {
    listDal.queryList(queryData, function (err, queryResult) {
        if (err) {
            callback(true, queryResult);
            return;
        }

        callback(false, queryResult);
        return;
    })
}

//退出队列
exports.deleteListUser = function (deleteData, callback) {
    listDal.deleteListUser(deleteData, function (err, deleteResult) {
        if (err) {
            callback(true, deleteResult);
            return ;
        }

        callback(false, deleteResult);
        return ;
    });
}