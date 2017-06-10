/**
 * @Author: Duncan
 * @Date: 2017-05-04 15:56
 * @Last Modified By:
 * @Last Modified Time:
 * @Function:用户的后端路由模块 
 */

/**
 * 通过用户的ID,来查询用户的个人信息
 */

var express = require('express');
var router = express.Router();
var userService = appRequire('service/driver/user/userservice');
var dateverify = appRequire('util/dateverify');
var logger = appRequire('util/loghelper').helper;
var moment = require('moment');
var uploading = appRequire('util/multerconfig');
var userroleService = appRequire('service/driver/userrole/userroleservice');

router.get('/', function (req, res) {

  logger.writeInfo("[routes/backend/user/userroute]" + "进入用户的信息查询路由");

  var accountID = req.query.key ? req.query.key : '';
  var curPage = parseInt(req.query.curpage) ? parseInt(req.query.curpage) : 1;
  var pageNum = parseInt(req.query.pageNum) ? parseInt(req.query.pageNum) : 15;
  var statusID = req.query.statusID ? req.query.statusID : 1;
  var userName = req.query.UserName;
  var accountName = req.query.AccountName;
  var idCard = req.query.IDCard;

  var userData = {
    CurPage: curPage,
    PageNum: pageNum
  };

  if (userName != undefined && userName.length != 0) {
    userData.UserName = userName;
  }

  if (accountName != undefined && accountName.length != 0) {
    userData.AccountName = accountName;
  }

  if (idCard != undefined && idCard.length != 0) {
    userData.IDCard = idCard;
  }

  if (accountID !== '' && accountID.length !== 0) {
    if (dateverify.isNumeric(accountID)) {
      userData.UserID = accountID;
    } else {
      res.status(401);
      res.json({
        status: 401,
        isSuccess: false,
        msg: '输入的账户ID不是数字'
      });
      logger.writeError("[routes/backend/user/userroute]" + "输入的账号ID不是数字");
      return;
    }
  }

  if (statusID != 1) {
    if (dateverify.isNumeric(statusID)) {
      userData.StatusID = statusID;
    } else {
      res.status(401);
      res.json({
        status: 401,
        isSuccess: false,
        msg: '输入的状态ID不是数字'
      });

      logger.writeError("[routes/backend/user/userroute]" + "输入的状态ID不是数字");
      return;
    }
  }


  userService.queryCountNum(userData, function (err, countNum) {
    if (err) {
      res.status(500);
      res.json({
        status: 500,
        isSuccess: false,
        msg: '查询数量失败，数据库出错'
      });

      logger.writeError("[routes/backend/user/userroute]" + "查询数量失败，数据库出错");
      return;
    }

    var allCount = countNum[0]['num'];

    userService.queryUser(userData, function (err, queryUserInfo) {
      if (err) {
        res.status(500);
        res.json({
          status: 500,
          isSuccess: false,
          msg: '服务器内部的错误'
        });

        logger.writeError("[routes/backend/user/userroute]" + "服务器内部的错误");
        return;
      }

      if (queryUserInfo == undefined && queryUserInfo.length == 0) {
        res.status(401);
        res.json({
          status: 401,
          isSuccess: false,
          msg: '数据库未匹配到数据'
        });

        logger.writeError("[routes/backend/user/userroute]" + "数据库未匹配到数据");
        return;
      }

      if (queryUserInfo !== undefined && queryUserInfo.length !== 0 && allCount != -1) {
        for (var key in queryUserInfo) {
          queryUserInfo[key].CreateTime = moment(queryUserInfo[key].createTime).format('YYYY-MM-DD HH:mm:ss');
        }

        var returnResult = {
          status: 200,
          isSuccess: true,
          msg: '查询成功',
          dataNum: allCount,
          curPage: curPage,
          curpageNum: pageNum,
          totalPage: Math.ceil(allCount / pageNum),
          data: queryUserInfo
        }

        if (returnResult.curPage == returnResult.totalPage) {
          returnResult.curpageNum = returnResult.dataNum - (returnResult.totalPage - 1) * returnResult.curpageNum;
        }

        logger.writeInfo("[routes/backend/user/userroute]查询成功");
        res.status(200);
        res.json(returnResult);
        return;
      } else {
        res.status(401);
        res.json({
          status: 401,
          isSuccess: false,
          msg: '数据库没有数据'
        })

        logger.writeWarn("[routes/backend/user/userroute]" + "数据库中没有数据");
        return;
      }
    });
  });

});

/**
 * 用户的注册
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


router.put('/', function (req, res) {
  var dataRequire = ['UserID','UserName', 'Gender', 'Pwd', 'IDCard', 'StatusID'];
  var dataRequire1 = ['用户ID', '用户姓名', '性别', '密码', '身份证号', '状态ID'];
  var require = "未填：";

  for (var key in dataRequire) {
    if (!(dataRequire[key] in req.body)) {
        require += dataRequire1[key] + " ";
    }
  }

  if (require != "未填：")
  {
    res.status(400);
    res.json({
      status: 400,
      isSuccess: false,
      msg: require
    });
    return ;
  }

  var userID = req.body.UserID;

  if (userID == undefined && userID.length == 0) {
    res.status(400);
    res.json({
      status: 400,
      isSuccess: false,
      msg: "没有传用户的ID"
    });
    return;
  }

  var updateData = {};
  updateData.UserID = userID;
  var userName = req.body.UserName;
  var gender = req.body.Gender;
  var pwd = req.body.Pwd;
  var idCard = req.body.IDCard;
  var statusID = req.body.StatusID;

  if (userName != undefined && userName.length != 0) {
    if (userName.length >= 100) {
      res.status(400);
      return res.json({
        status: 400,
        isSuccess: false,
        msg: "真实姓名的字段长度不符合"
      })
    }

    updateData.UserName = userName;
  }

  if (gender != undefined && gender.length != 0) {
    updateData.Gender = gender;
  }

  if (pwd != undefined && pwd.length != 0) {
    if (pwd.length > 50) {
      res.status(400);
      return res.json({
        status: 400,
        isSuccess: false,
        msg: "密码的字段长度太长"
      });
    }

    updateData.Pwd = pwd;
  }

  if (idCard != undefined && idCard.length != 0) {
    if (!(/^\d{17}[\dxX]$/.test(idCard))) {
      res.status(400);
      return res.json({
        status: 400,
        isSuccess: false,
        msg: "身份证输入的不正确"
      });
    }

    updateData.IDCard = idCard;
  }

  if (statusID != undefined && statusID.length != 0) {
    updateData.StatusID = statusID;
  }

  uploading(req, res, function (err) {
    if (err) {
      res.status(400);
      return res.json({
        status: 400,
        isSuccess: false,
        msg: "上传头像失败"
      })
    }

    if (req.file != undefined) {
      var pictureUrl = '/images/portrait/' + req.file.filename;
      updateData.PortraitAddress = pictureUrl;
    }

    userService.updateUser(updateData, function (err, updataResult) {
      if (err) {
        res.status(500);
        res.json({
          status: 500,
          isSuccess: false,
          msg: updataResult
        });
        return;
      }

      if (updataResult != undefined && updataResult.affectedRows != 0) {
        res.status(200);
        res.json({
          status: 200,
          isSuccess: true,
          msg: "修改成功"
        })
        return;
      } else {
        res.status(500);
        res.json({
          status: 500,
          isSuccess: false,
          msg: "修改信息失败"
        });
        return;
      }
    });
  })
});

router.delete('/', function (req, res) {
    var userID = req.body.UserID;
    if (userID == undefined && userID.length == 0) {
      res.status(400);
      return res.json({
        status: 400,
        isSuccess: false,
        msg: "缺少用户的ID"
      })
    }

    var deleteData = {
      UserID: userID,
      IsActive: 0,
      EndTime: moment().format("YYYY-MM-DD HH:mm:ss")
    }

    userService.updateUser(deleteData, function (err, deleteResult) {
        if (err) {
          res.status(500);
          return res.json({
            status: 500,
            isSuccess: false,
            msg: deleteResult
          })
        }

        if (deleteResult != undefined && deleteResult.affectedRows != 0) {
          res.status(200);
          return res.json({
            status: 200,
            isSuccess: true,
            msg: "删除成功"
          })
        } else {
          res.status(500);
          return res.json({
            status: 500,
            isSuccess: false,
            msg: "删除失败"
          })
        }
    }) 
})
module.exports = router;

