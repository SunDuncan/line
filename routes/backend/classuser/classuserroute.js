/**
 * @Author: Duncan
 * @Date: 2017-06-11 15:30
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 班级用户的路由层
 */

var express = require('express');
var router = express.Router();
var classuserservice = appRequire("service/driver/classuser/classuserservice");

 //插入班级用户
router.post('/', function (req, res) {
    var dataRequire = ['UserID', 'ClassID'];
    var dataRequire1 = ['用户ID', '班级ID'];
    var err = "未填："
    for (var key in dataRequire) {
        if (!(dataRequire[key] in req.body)) {
            err += dataRequire1[key] + " ";
        }
    }

    if (err != "未填：") {
        res.status(400);
        res.json({
            status: 400,
            isSuccess: false,
            msg: err
        });
        return ;
    }

    var userID = req.body.UserID;
    var classID = req.body.ClassID;
    if (userID && userID.length == 0) {
        res.status(400);
        res.json({
            status: 400,
            isSuccess: false,
            msg: "用户的ID不能为空"
        });
        return ;
    }

    if (classID && classID.length == 0) {
        res.status(400);
        res.json({
            status: 400,
            isSuccess: false,
            msg: "班级的ID不能为空"
        });
        return ;
    }

    var insertData = {
        UserID: userID,
        ClassID: classID
    }

    classuserservice.insertClassUser(insertData, function(err, result) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                isSuccess: false,
                msg: result
            })
            return ;
        }

        if (result.insertId > 0) {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: true,
                msg: "创建成功"
            })
        }

        res.status(500);
        return res.json({
            status: 500,
            isSuccess: false,
            msg: "创建失败"
        });

    })
});

//查询班级中所有的成员以及成员信息的
router.get('/', function (req, res){
    var classID = req.query.ClassID;
    if (classID == undefined) {
        res.status(400);
        res.json({
            status: 400,
            isSuccess: false,
            msg: "班级的ID不能为空"
        });
        return ;
    }

    var getAllInfo = {
        ClassID: classID
    }

    classuserservice.queryClassAllInfo(getAllInfo, function (err, queryResult){
        if (err) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess: false,
                msg: queryResult
            })
        }

        if (queryResult && queryResult.length != 0) {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: true,
                msg: queryResult
            })
        }
        
        res.status(200);
        return res.json({
            status: 200,
            isSuccess: false,
            msg: "未查询到数据"
        })
    });
});

module.exports = router;