/**
 * @Author: Duncan
 * @Data: 2017-06-10 16:20
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 班级的服务层
 */

var classDal = appRequire("dal/driver/class/classdal");

//查询班级的基本信息
exports.queryClass  = function (callback)
{
    classDal.queryClass({}, function (err, results) {
        if (err) {
            callback(true, results);
            return ;
        }

        callback(false, results);
        return ;
    });
}


//插入班级的基本信息
exports.insertClass = function (insertData, callback) {
    classDal.insertClass(insertData, function (err, insertResult) {
        if (err) {
            callback(true, insertResult);
            return ;
        }

        callback(false, insertResult);
        return ;
    });
}

//按照创建者的ID来查询班级的情况
exports.queryClassInfo = function (queryClassData, callback) {
    classDal.queryClassInfo(queryClassData, function (err, queryClassResult) {
        if (err) {
            callback(true, queryClassResult);
            return ;
        }

        callback(false, queryClassResult);
        return ;
    }); 
}

//删除班级
exports.deleteClass = function (deleteData, callback) {
    classDal.deleteClass(deleteData, function (err, deleteResult) {
        if (err) {
            callback(true, deleteResult);
            return ;
        }

        callback(false, deleteResult);
        return ;
    });
}

//查询班级的所有的信息
exports.queryClassAllInfo = function(callback) {
    classDal.queryClassAllInfo(function (err, queryClassResult) {
        if (err) {
            callback(true, queryClassResult);
            return ;
        }

        callback(false, queryClassResult);
        return ;
    })
}