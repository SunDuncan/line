/**
 * @Author: Duncan
 * @Date: 2017-06-05 17:46
 * @Last Modified By：
 * @Last Modified Time:
 * @function: 用户角色的服务层
 */

var userRoleDal = appRequire('dal/driver/userrole/userroledal');
/**
 * 插入用户的服务层
 */

exports.insertuserRole = function (insertData, callback) {
    
    userRoleDal.insertUserRole(insertData, function (err, insertResult) {
        if (err) {
            callback(true, insertResult);
            return;
        }

        callback(false, insertResult);
        return ;
    });
}