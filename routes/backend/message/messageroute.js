/**
 * @Author: Duncan
 * @Date: 2017-06-15 8:56
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 通知消息的路由层
 */

var express = require('express');
var router = express.Router();
var messageService = appRequire('service/driver/message/messageservice');
var moment = require('moment');
var classservice = appRequire('service/driver/class/classservice');
var classMessageService = appRequire('service/driver/classmessage/classmessageservice')

/**
 * @param MessageTitle 消息的标题
 * @param MessageContent 消息的内容
 * @param CreateUserID 创建者的ID
 * @param CreateTime 创建的时间
 * @param IsActive 是否有效
 * @function 消息的插入工作
 */

router.post('/', function (req, res){ 
    var dataRequire = ['MessageTitle', 'MessageContent', 'CreateUserID'];
    var err = "未填：";
    for (var key in dataRequire) {
        if (!(dataRequire[key] in req.body)) {
            err += dataRequire[key] + " ";
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

    var messageTitle = req.body.MessageTitle ? req.body.MessageTitle : '';
    var messageContent = req.body.MessageContent ? req.body.MessageContent: '';
    var createUserID = req.body.CreateUserID ? req.body.CreateUserID : '';

    if (messageTitle && messageTitle.length == 0) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: "消息的标题不能为空"
        })
    }

    if (messageContent && messageContent.length == 0 ) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: "消息的内容不能为空"
        })
    }

    if (createUserID && createUserID.length == 0) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: "创建者的用户ID不能省略"
        })
    }

    var createTime = moment().format('YYYY-MM-DD');
    var isActive = 1;
    var insertData = {
        MessageTitle: messageTitle,
        MessageContent: messageContent,
        CreateUserID: createUserID,
        CreateTime: createTime,
        IsActive: isActive
    }

    var insertClassMessageData = {};

    messageService.insertMessage(insertData, function (err,insertResult) 
    {
        if (err) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess: false,
                msg: insertResult
            })
        }

        console.log(JSON.stringify(insertResult));
        if (insertResult.insertId > 0) {
            insertClassMessageData.MessageID = insertResult.insertId;
            classservice.queryClassInfo({CreateUserID: createUserID},function (err, queryResult) {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 500,
                        isSuccess: false,
                        msg: queryResult
                    });
                    return ;
                }

                if (queryResult.length != 0) {
                    insertClassMessageData.ClassID = queryResult[0].ClassID;
                    classMessageService.insertClassMessage(insertClassMessageData, function (err, insertResult) {
                        if (err) {
                            res.status(500);
                            res.json({
                                status: 500,
                                isSuccess: false,
                                msg: insertResult
                            })
                            return;
                        }

                        if (insertResult.insertId > 0) {
                            res.status(200);
                            res.json({
                                status: 200,
                                isSuccess: true, 
                                msg: "发布消息成功"
                            });
                            return ;
                        }

                        res.status(500);
                        res.json({
                            status: 500,
                            isSuccess: false,
                            msg: "发布消息失败"
                        });
                        return;
                    })
                }
            })
        }
    })

})

//查询某一个班级某一天的消息通知
router.get('/', function (req, res){
    var classID = req.query.ClassID ? req.query.ClassID:'';
    if (classID.length == 0){ 
        res.status(400);
        res.json({
            status: 400,
            isSuccess: false,
            msg: "班级的ID不能为空"
        })
        return ;
    }

    //默认为当天的日期
    var queryTime = req.query.CreateTime ? req.query.CreateTime : moment().format('YYYY-MM-DD');
    var queryData = {
        ClassID: classID,
        CreateTime: queryTime
    }

    messageService.queryClassMessage(queryData, function (err, queryResult) {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                isSuccess: false,
                msg: queryResult
            });
            return ;
        }

        if (queryResult.length != 0) {
            res.status(200);
            return res.json({
               status: 200,
               isSuccess: true, 
               msg: queryResult
            })
        }

        res.status(200);
        res.json({
            status: 200,
            isSuccess: false,
            msg: "未查询到数据"
        });
        return ;
    });

})
module.exports = router;