/**
 * @Author: Duncan
 * @Date: 2017-05-02 20:32
 * @Last Modified By:
 * @Last Modified Time:
 * @function：注册的路由接口
 */

var express = require('express');
var url = require('url');
var router = express.Router();
var moment = require('moment');
var userService = appRequire('service/driver/user/userservice');
var logger = appRequire("util/loghelper").helper; 
var uploading = appRequire('util/multerconfig');
var userroleService = appRequire('service/driver/userrole/userroleservice');
 
/**
 * 插入用户的信息
 */
router.post('/', function (req, res) {
  var insertData = {};
  var dataRequire = ['UserName', 'Gender', 'Pwd', 'AccountName', 'IDCard', 'RoleID'];
  var dataRequire1 = ['真实姓名', '性别', '密码', '昵称', '证件号码', '角色ID'];
  var require = "未填： ";

  for (var key in dataRequire) {
    if (!(dataRequire[key] in req.body)) {
      require += dataRequire1[key] + " ,";
    }
  }

  if (require != "未填： ") {
    res.status(400);
    res.json({
      status: 400,
      isSuccess: false,
      msg: require
    })
    return;
  }

  var userName = req.body.UserName;
  var gender = req.body.Gender;
  var pwd = req.body.Pwd;
  var accountName = req.body.AccountName;
  var idCard = req.body.IDCard;
  var roleID = req.body.RoleID;

  if (userName == undefined || userName.length > 100 || userName.length <= 0) {
    res.status(400);
    res.json({
      status: 400,
      isSuccess: false,
      msg: '请填写正确的用户名，字段长度不正确'
    })
    return;
  }

  if (gender.length == 0 || isNaN(gender)) {
    res.status(400);
    res.json({
      status: 400,
      isSuccess: false,
      msg: "性别请用0,1数字"
    })
    return;
  }

  if (pwd == undefined || pwd.length > 50 || pwd.length == 0) {
    res.status(400);
    return res.json({
      status: 400,
      isSuccess: false,
      msg: '请填写正确的密码，字段长度不正确'
    })
  }

  if (accountName.length == 0 || accountName.length > 100) {
    res.status(400);
    return res.json({
      status: 400,
      isSuccess: false,
      msg: "请填写正确的昵称，字段长度不正确"
    })
  }

  if (gender.length == 0 || isNaN(gender)) {
    res.status(400);
    res.json({
      status: 400,
      isSuccess: false,
      msg: "角色ID请用1，2数字"
    })
    return;
  }

  if (idCard.length == 0 || !(/^\d{17}[\dxX]$/.test(idCard))) {
    res.status(400);
    return res.json({
      status: 400,
      isSuccess: false,
      msg: "身份证输入的不正确"
    })
  }

  insertData = {
    UserName: userName,
    Gender: gender,
    Pwd: pwd,
    AccountName: accountName,
    IDCard: idCard,
    CreateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
    StatusID: 1,
    IsActive: 1
  }

  //上传头像
  uploading(req, res, function (err) {
    if (err) {
      res.status(400);
      res.json({
        status: 400,
        isSuccess: false,
        msg: "上传头像失败"
      })
      return;
    }

    if (req.file != undefined) {
      var pictureUrl = '/images/portrait/' + req.file.filename;
      insertData.PortraitAddress = pictureUrl;
    }

    //检查是否有重复的昵称
    userService.queryUser({
      AccountName: accountName,
      CurPage: 1,
      PageNum: 15
    }, function (err, queryResult) {
      if (err) {
        res.status(500);
        return res.json({
          status: 500,
          isSuccess: false,
          msg: queryResult
        })
      }

      if (queryResult.length != 0) {
        res.status(400);
        return res.json({
          status: 400,
          isSuccess: false,
          msg: "昵称已经存在"
        })
      }

      userService.insertUser(insertData, function (err, insertResult) {
        if (err) {
          res.status(500);
          return res.json({
            status: 500,
            isSuccess: false,
            msg: insertResult
          })
        }

        if (insertResult.insertId > 0) {
          var userroleData = {
            RoleID: roleID,
            UserID: insertResult.insertId
          }

          userroleService.insertuserRole(userroleData, function (err, insertUserRoleResult) {
            if (err) {
              res.status(500);
              return res.json({
                status: 500,
                isSuccess: false,
                msg: insertUserRoleResult
              })
            }

            if (insertUserRoleResult.insertId > 0) {
              res.status(200);
              return res.json({
                status: 200,
                isSuccess: true,
                msg: "注册成功"
              })
            }
          });
        }
      });
    })
  })
});

module.exports = router;