/**
 * @Author: Duncan
 * @Data: 2017-6-10 16:30
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 班级的路由层
 */

/**
 * 插入的路由
 */

var moment = require('moment');
var classService = appRequire("service/driver/class/classservice");
var express = require("express");
var router = express.Router();

/**
 * 插入班级的信息
 */
router.post('/', function (req, res) {
    var dataReuqire = 'CreateUserID';
    if (!(dataReuqire in req.body)) {
        res.status(400);
        res.json({
            status: 400,
            isSuccess: false,
            msg: "必要的字段用户的ID没有传"
        });
        return;
    }

    var createUserID = req.body.CreateUserID;
    if (createUserID.length == 0) {
        res.status(400);
        res.json({
            status: 400,
            isSuccess: true,
            msg: "用户的ID不能为空"
        });
        return;
    }

    var insertData = {};
    insertData.CreateUserID = createUserID;
    insertData.CreateTime = moment().format('YYYY-MM-DD HH:mm:ss');
    insertData.IsActive = 1;

    classService.queryClassInfo({
        CreateUserID: createUserID
    }, function (err, results) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                isSuccess: false,
                msg: results
            });
            return;
        }

        if (results && results.length == 0) {
            classService.queryClass(function (err, queryClassResults) {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 500,
                        isSuccess: false,
                        msg: queryClassResults
                    });
                    return;
                }


                if (queryClassResults && queryClassResults.length == 0) {
                    insertData.ClassCode = '1';
                    classService.insertClass(insertData, function (err, insertResults) {
                        if (err) {
                            res.status(500);
                            res.json({
                                status: 500,
                                isSuccess: false,
                                msg: insertResults
                            });
                            return;
                        }

                        if (insertResults.insertId > 0) {
                            res.status(200);
                            res.json({
                                status: 200,
                                isSuccess: true,
                                msg: "创建班级成功"
                            });
                            return;
                        }
                    });
                } else {
                    insertData.ClassCode = (queryClassResults[0].ClassID + 1).toString();
                    classService.insertClass(insertData, function (err, insertResults) {
                        if (err) {
                            res.status(500);
                            res.json({
                                status: 500,
                                isSuccess: false,
                                msg: insertResults
                            });
                            return;
                        }

                        if (insertResults.insertId > 0) {
                            res.status(200);
                            res.json({
                                status: 200,
                                isSuccess: true,
                                msg: "创建班级成功"
                            });
                            return;
                        }
                    });
                }
            });
        }

        if (results && results.length != 0) {
            res.status(400);
            res.json({
                status: 400,
                isSuccess: false,
                msg: "此人已经创建过班级，不能重复创建"
            });
            return ;
        }
    })

});

router.delete('/', function (req, res) {
    var classID = req.body.ClassID;
    if (classID && classID.length == 0) {
        res.status(400);
        res.json({
            status: 400,
            isSuccess: false,
            msg: "班级的ID号码不能省略"
        });
        return;
    }

    classService.deleteClass({ClassID: classID}, function (err, deleteResult){
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                isSuccess: false,
                msg: deleteResult
            });
            return ;
        }

        if (deleteResult != undefined && deleteResult.affectedRows != 0) {
            res.status(200);
            res.json({
                status: 200,
                isSuccess: true,
                msg: '删除成功'
            });
            return ;
        } else {
            res.status(500);
            res.json({
                status: 500,
                isSuccess: false,
                msg: "修改信息失败"
            })
            return;
        }
    });
});

/**
 * 查询班级的信息的路由
 */
router.get('/', function (req, res) {
    classService.queryClassAllInfo(function (err, queryClassResults){
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                isSuccess: false,
                msg: queryClassResults
            })
            return;
        }

        res.status(200);
        res.json({
            status: 200,
            isSuccess: true,
            msg: {
                msg: "查询成功",
                data: queryClassResults
            }
        })
        return;
    })
});

module.exports = router;