var express = require("express");
var router = express.Router();
//用户的后端路由接口
var userRoute = appRequire('routes/backend/user/userroute');
//班级的后端路由接口
var classRoute = appRequire('routes/backend/class/classroute');
//班级用户后端的路由接口
var classUserRoute = appRequire('routes/backend/classuser/classuserroute');
//教练发布消息的接口
var messageRoute = appRequire('routes/backend/message/messageroute');
//队列的接口路由信息
var listRoute = appRequire('routes/backend/list/listroute');
//var roleRoute = appRequire('routes/backend/role/roleroute');

router.get('/login', function (req, res, next) {
	res.render('login', {
		'title': "登录",
		'jsList': {
			login: '/js/login.js'
		}
     });
});

router.get('/roleAdd', function (req, res, next) {

	res.render('roleadd', {
		title: "角色新增",
		'cssList': {
			roleadd: '/css/roleadd.css',
			bootstrap: '/css/bootstrap/bootstrap.min.css'
		}
	});
});

router.get('/functionAdd', function (req, res, next) {
	res.render('functionadd', {
		title: "功能点新增",
		'cssList': {
			roleadd: '/css/functionadd.css',
			bootstrap: '/css/bootstrap/bootstrap.min.css'
		}
	});
});

router.get('/index', function (req, res, next) {
    res.render('index', {
		 'title': "主页" ,
		 'jsList': {
			 index: '/js/index.js'
		 },

		});
});

router.get('/upload', function (req, res, next) {
	res.render('otherpage', {
		'title': "上传文件的测试"
	})
});

router.use('/user', userRoute);
router.use('/class', classRoute);
router.use('/classuser', classUserRoute);
router.use('/message', messageRoute);
router.use('/list', listRoute);
//router.use('/role', roleRoute);
module.exports = router;