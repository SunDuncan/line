/**
 * @Author: Duncan
 * @Date: 2017-06-15 9:51
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 班级消息的业务层
 */

var classMessageDal = appRequire('dal/driver/classmessagedal/classmessagedal');

exports.insertClassMessage = function (insertData, callback) {
    classMessageDal.insertClassMessage(insertData, function (err, insertResult) {
        if (err) {
            callback(true, insertResult);
            return ;
        }

        callback(false, insertResult);
        return ;
    });
}