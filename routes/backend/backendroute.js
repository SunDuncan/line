var express = require("express");
var router = express.Router();
var userRoute = appRequire('routes/backend/user/userroute');

router.get('/login', function (req, res, next) {
	res.render('login', {'title': "登录"});
});

router.get('/index', function (req, res, next) {
    res.render('index', {'title': "主页"});	
});

router.use('/user', userRoute);

module.exports = router;