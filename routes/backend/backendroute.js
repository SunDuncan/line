var express = require("express");
var router = express.Router();
var userRoute = appRequire('routes/backend/user/userroute');
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
//router.use('/role', roleRoute);
module.exports = router;