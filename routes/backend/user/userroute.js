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
  
  if (accountName != undefined &&　accountName.length != 0) {
      userData.AccountName = accountName;
   }
   
  if (idCard != undefined && idCard.lenght != 0) {
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
      return ;
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
      return ;
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
      
      if (queryUserInfo !== undefined && queryUserInfo.length !== 0 &&　allCount != -1) {
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
        return ;
      } else {
        res.status(401);
        res.json({
          status: 401,
          isSuccess: false,
          msg: '数据库没有数据'
        })
        
        logger.writeWarn("[routes/backend/user/userroute]" + "数据库中没有数据");
        return ;
      }      
    });
  });

});


module.exports = router;
  
  