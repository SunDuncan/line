/**
 * @Author: Duncan
 * @Date: 2017-06-17 15:35
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 功能点的路由层
 */

var express = require('express');
var router = express.Router();
var functionService = appRequire('service/driver/function/functionservice');

/**
 * 插入的操作
 */
router.post('/', function (req, res) {
    var dataRequire = ['FunctionName', 'FunctionCode'];
    var err = "未填： ";
    for (var key in dataRequire) {
        if (!(dataRequire[key] in req.body)) {
            err += dataRequire[key] + " ";
        }
    }

    if (err != "未填： ") {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: err
        })
    }

    var functionName = req.body.FunctionName ? req.body.FunctionName : '';
    var functionCode = req.body.FunctionCode ? req.body.FunctionCode : '';

    if (functionName.length == 0) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: "所需要的值不能为空"
        });
    }

    if (functionCode.length == 0) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: "所需要的值不能为空"
        });
    }

    var functionData = {
        FunctionName: functionName,
        FunctionCode: functionCode,
        IsActive: 1
    }

    functionService.insertFunction(functionData, function (err, functionResult) {
        if (err) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess: false,
                msg: functionResult
            })
        }

        if (functionResult.insertId > 0) {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: true,
                msg: "功能点创建成功"
            })
        } else {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: false,
                msg: '功能点创建失败'
            })
        }
    })
})

/**
 * 查询操作
 */

router.get('/', function (req, res) {
    var queryData = {
        IsActive: 1
    }

    functionService.queryFunction(queryData, function (err, queryResult) {
        if (err) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess: false,
                msg: queryResult
            })
        }

        if (queryResult.length != 0) {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: true,
                msg: queryResult
            })
        }

        if (queryResult.length == 0) {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: false,
                msg: "未查询到相关的信息"
            })
        }
    });
});


/**
 * 修改的操作
 */

router.put('/', function (req, res) {
    var functionID = req.body.FunctionID;
    if (functionID == undefined) {
        res.status(400);
        res.json({
            status: 400,
            isSuccess: false,
            msg: "功能点的ID不能为空"
        })
        return;
    }

    var updateData = { FunctionID: functionID };
    var functionName = req.body.FunctionName ? req.body.FunctionName : '';
    var functionCode = req.body.FunctionCode ? req.body.FunctionCode : '';
        

    if (functionName != '') {
        updateData.FunctionName = functionName;
    }

    if (functionCode != '') {
        updateData.FunctionCode = functionCode;
    }

    if (isActive != 0) {
        updateData.IsActive = isActive;
    }

    functionService.updateFunction(updateData, function (err, result) {
        if (err) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess: false,
                msg: result
            })
        }

        if (result.affectedRows > 0) {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: true,
                msg: "修改成功"
            })
        } else {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: true,
                msg: "不需要修改"
            })
        }
    })
});

/**
 * 删除操作
 */
router.delete('/', function (req, res) {
    var functionID = req.body.FunctionID;
    if (functionID == undefined) {
        res.status(400);
        res.json({
            status: 400,
            isSuccess: false,
            msg: "功能点的ID不能为空"
        })
        return;
    }

    var updateData = {
        FunctionID: functionID,
        IsActive: 0
    };

    functionService.updateFunction(updateData, function (err, result) {
        if (err) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess: false,
                msg: result
            })
        }

        if (result.affectedRows > 0) {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: true,
                msg: "修改成功"
            })
        } else {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: true,
                msg: "不需要修改"
            })
        }
    })
});

module.exports = router;
