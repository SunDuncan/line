/**
 * @Author: Duncan
 * @Date: 2017-06-17 15:35
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 角色的路由层
 */

var express = require('express');
var router = express.Router();
var roleService = appRequire('service/driver/role/roleservice');

/**
 * 插入的操作
 */
router.post('/', function (req, res){ 
    var dataRequire = ['RoleName', 'RoleCode'];
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

    var roleName = req.body.RoleName ? req.body.RoleName : '';
    var roleCode = req.body.RoleCode ? req.body.RoleCode : '';
    

    if (roleName.length == 0) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: "所需要的值不能为空"
        });
    }

    if (roleCode.length == 0) {
        res.status(400);
        return res.json({
            status: 400,
            isSuccess: false,
            msg: "所需要的值不能为空"
        });
    }

    var roleData = {
        RoleName: roleName,
        RoleCode: roleCode,
        IsActive: 1
    }

    roleService.insertRole(roleData, function (err, roleResult) {
        if (err) {
            res.status(500);
            return res.json({
                status: 500,
                isSuccess: false,
                msg: roleResult
            })
        }

        if (roleResult.insertId > 0) {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: true,
                msg: "角色创建成功"
            })
        } else {
            res.status(200);
            return res.json({
                status: 200,
                isSuccess: false,
                msg: '角色创建失败'
            })
        }
    })
})

/**
 * 查询操作
 */

router.get('/', function (req, res){
    var queryData = {
        IsActive: 1
    }

    roleService.queryRole(queryData, function (err, queryResult) {
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

router.put('/', function (req, res){
    var roleID = req.body.RoleID;
    if (roleID == undefined) {
        res.status(400);
        res.json({
            status: 400,
            isSuccess: false,
            msg: "角色的ID不能为空"
        })
        return;
    }

    var updateData = {RoleID: roleID};
    var roleName = req.body.RoleName ? req.body.RoleName : '';
    var roleCode = req.body.RoleCode ? req.body.RoleCode : '';
    var isActive = req.body.IsActive ? req.body.IsActive : 0;

    if (roleName != '')
    {
        updateData.RoleName = roleName;
    } 

    if (roleCode != '') {
        updateData.RoleCode =roleCode;
    }

    if (isActive != 0) {
        updateData.IsActive = isActive;
    }
    roleService.updateRole(updateData, function (err, result){
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

router.delete('/', function (req, res){ 
     var roleID = req.body.RoleID;
    if (roleID == undefined) {
        res.status(400);
        res.json({
            status: 400,
            isSuccess: false,
            msg: "角色的ID不能为空"
        })
        return;
    }

    var updateData = {
        RoleID: roleID,
        IsActive: 0
    };
    
    roleService.updateRole(updateData, function (err, result){
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
})

module.exports = router;