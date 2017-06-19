/**
 * @Author: Duncan
 * @Date: 2017-06-17 15:25
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 角色的服务层
 */

var roledal = appRequire("dal/driver/role/roledal");

/**
 * 插入角色
 */
exports.insertRole = function (insertData, callback) {
    roledal.insertRole(insertData, function (err, insertResult) {
        if (err) {
            callback(true, insertResult);
            return ;
        }

        callback(false, insertResult);
        return ;
    });
}

/**
 * 查询角色
 */
exports.queryRole = function (queryData, callback) {
    roledal.queryRole(queryData, function (err, queryResult) {
        if (err) {
            callback(true, queryResult);
            return ;
        }

        callback(false, queryResult);
        return ;
    })
}

/**
 * 修改角色
 */
exports.updateRole = function (updataData, callback) {
    roledal.updateRole(updataData, function (err, updataResult) {
        if (err) {
            callback(true, updataResult);
            return ;
        } 

        callback(false, updataResult);
        return ;
    });
}