/**
 * @Author: Duncan
 * @Date: 2017-06-17 15:25
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 功能点的服务层
 */

var functiondal = appRequire("dal/driver/function/functiondal");

/**
 * 插入功能点
 */
exports.insertFunction = function (insertData, callback) {
    functiondal.insertFunction(insertData, function (err, insertResult) {
        if (err) {
            callback(true, insertResult);
            return ;
        }

        callback(false, insertResult);
        return ;
    });
}

/**
 * 查询功能点
 */
exports.queryFunction = function (queryData, callback) {
    functiondal.queryFunction(queryData, function (err, queryResult) {
        if (err) {
            callback(true, queryResult);
            return ;
        }

        callback(false, queryResult);
        return ;
    })
}

/**
 * 修改功能点
 */
exports.updateFunction = function (updataData, callback) {
    functiondal.updateFunction(updataData, function (err, updataResult) {
        if (err) {
            callback(true, updataResult);
            return ;
        } 

        callback(false, updataResult);
        return ;
    });
}