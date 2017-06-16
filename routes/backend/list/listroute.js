/**
 * @Author: Duncan
 * @Date: 2017-06-16 11:11
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 队列的路由层
 */

var express = require('express');
var router = express.Router();
var listservice = appRequire('service/driver/list/listservice');
var moment = require('moment');
var classservice = appRequire('service/driver/class/classservice');
var classuserservice = appRequire('service/driver/classuser/classuserservice');

//插入的操作
router.post('/', function (req, res) {
    var dataRequire = ['UserID', 'ClassID'];
    var dataRequire1 = ['用户的ID', '班级的ID'];
    var err = '未填：';
    var enterTime = '';
    var expireTime = '';

    for (var key in dataRequire) {
        if (!(dataRequire[key] in req.body)) {
            err += dataRequire1[key] + " ";
        }
    }

    if (err != '未填：') {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: err
        })
    }

    var classID = req.body.ClassID ? req.body.ClassID : '';
    var userID = req.body.UserID ? req.body.UserID : '';

    if (classID.length == 0) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: "班级的ID不能为空值"
        })
    }

    if (userID.length == 0) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: "用户的ID不能为空值"

        })
    }

    var queryClassUserInfo = {
        ClassID: classID,
        UserID: userID
    }

    console.log("查询班级用户信息：" + JSON.stringify(queryClassUserInfo));
    var insertListInfo = {UserID: userID};
    var queryListInfo = {};
    classuserservice.queryIsAtClass(queryClassUserInfo, function (err, queryResult) {
        if (err) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess: false,
                msg: queryResult
            })
        }

        if (queryResult.length == 0) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess: false,
                msg: "此用户与班级不匹配"
            })
        }

        if (queryResult.length != 0) {
            classservice.queryClassInfo({ ClassID: classID },
                function (err, queryClassResult) {
                    if (err) {
                        res.status(500);
                        return res.json({
                            status: 500,
                            isSuccess: false,
                            msg: queryClassResult
                        })
                    }

                    insertListInfo.ListID = queryClassResult[0].ListID;
                    queryListInfo.ListID = queryClassResult[0].ListID;
                    listservice.queryListInfo(queryListInfo, function (err, queryListResult) {
                        if (err) {
                            res.status(500);
                            return res.json({
                                status: 500,
                                isSuccess: false,
                                msg: queryListResult
                            });
                        }

                        if (queryListResult.length == 0) {
                        
                            enterTime = moment().format('YYYY-MM-DD HH:mm:ss');
                            expireTime = moment().format('YYYY-MM-DD');
                            insertListInfo.EnterTime = enterTime;
                            insertListInfo.ExpireTime = expireTime;
                            insertListInfo.ListNum = 1;
                            listservice.insertDal(insertListInfo, function (err, insertResult) {
                                if (err) {
                                    res.status(500);
                                    return res.json({
                                        status: 500,
                                        isSuccess: false,
                                        msg: insertResult
                                    })
                                }

                                if (insertResult.insertId > 0) {
                                    res.status(200);
                                    return res.json({
                                        status: 200,
                                        isSuccess: true,
                                        msg: "加入队列成功"
                                    })
                                } else {
                                    res.status(500);
                                    return res.json({
                                        status: 500,
                                        isSuccess: false,
                                        msg: "加入队列失败"
                                    })
                                }
                            });
                        }

                        if (queryListResult.length != 0) {
                            enterTime = moment().format('YYYY-MM-DD HH:mm:ss');
                            expireTime = moment().format('YYYY-MM-DD');
                            insertListInfo.EnterTime = enterTime;
                            insertListInfo.ExpireTime = expireTime;
                            insertListInfo.ListNum = queryListResult[0].ListNum + 1;
                            
                            listservice.insertDal(insertListInfo, function (err, insertResult) {
                                if (err) {
                                    res.status(500);
                                    return res.json({
                                        status: 500,
                                        isSuccess: false,
                                        msg: insertResult
                                    })
                                }

                                if (insertResult.insertId > 0) {
                                    res.status(200);
                                    return res.json({
                                        status: 200,
                                        isSuccess: true,
                                        msg: "加入队列成功"
                                    })
                                } else {
                                    res.status(500);
                                    return res.json({
                                        status: 500,
                                        isSuccess: false,
                                        msg: "加入队列失败"
                                    })
                                }
                            });
                        }
                    });
                })
        }
    })
})

router.get('/', function (req, res){

    var classID = req.query.ClassID ? req.query.ClassID : '';
    var expireTime = moment().format('YYYY-MM-DD');
    if (classID == undefined) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: "班级的ID不能为空"
        })
    }

    classservice.queryClassInfo({ClassID: classID}, function (err, queryResult) {
        if (err) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess:false,
                msg: queryResult
            })
        }

        var queryListInfo = {
            ListID: queryResult[0].ListID,
            ExpireTime: expireTime
        }

        listservice.queryList(queryListInfo, function (err, queryListInfoResult) {
            if (err) {
                res.status(500);
                return res.json({
                    status: 500,
                    isSuccess: false,
                    msg: queryListInfoResult
                })
            }

            if (queryListInfoResult.length == 0) {
                res.status(500);
                return res.json({
                    status: 500,
                    isSuccess: false, 
                    msg: "未查询到信息"
                })
            }

            if (queryListInfoResult.length != 0) {
                res.status(200);
                return res.json({
                    status: 200,
                    isSuccess: true, 
                    msg: queryListInfoResult
                })
            }
        })
    });

});

router.delete('/', function (req, res) {
    if (!('UserID' in req.body)) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: '用户的ID不能省'
        })
    }

    var userID = req.body.UserID;
    if (userID == undefined) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: "用户的ID不能为空"
        })
    }

    console.log("userID : " + userID);
    var deleteData = {
        UserID: userID
    }

    listservice.deleteListUser(deleteData, function(err, deleteResult) {
        if (err) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess: false,
                msg: deleteResult
            })
        }

        if (deleteResult.affectedRows > 0) {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: true, 
                msg: "退出成功"
            })
        } else {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: false, 
                msg: "退出失败"
            })
        }
    });
});

module.exports = router;
