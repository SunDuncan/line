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
 
/**
 * 暂时用来测试url的token的接口
 */

router.post('/', function (req, res) {

	res.status(200);
	res.json({
		code: 200,
		isSuccess: true,
		msg: 'token测试通过'
	})
});

module.exports = router;