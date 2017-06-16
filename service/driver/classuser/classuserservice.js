/**
 * @Author: Duncan
 * @Date: 2017-06-11 15:25
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 班级用户的服务层
 */

var classUserDal = appRequire('dal/driver/classuser/classuserdal');


exports.insertClassUser = function (insertData, callback) {
    classUserDal.insertClassUser(insertData, function (err, insertResult){
        if (err) {
            callback(true, insertResult);
            return ;
        }

        callback(false, insertResult);
        return ;
    })
}

/**
 * 查询班级中所有人的信息
 */

exports.queryClassAllInfo = function(queryData, callback) {
    classUserDal.queryClassAllInfo(queryData, function (err, queryRs){
        if (err) {
            callback(true, queryRs);
            return;
        }

        callback(false, queryRs);
        return ;
    });
}


/**
 * 查询班级中是否存在用户
 */
exports.queryIsAtClass = function (queryData, callback) {
    classUserDal.queryIsAtClass(queryData, function(err, queryRs) {
        if (err) {
            callback(true, queryRs);
            return ;
        }

        callback(false, queryRs);
        return ;
    })
}
