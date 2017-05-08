/**
 * @Author: Duncan
 * @Date: 2017-4-26  19:26
 * @Last Modified by: Duncan
 * @Last Modified Time: 
 * @Funtion: 按项目划分子模块
 */
 
 var apiRoute = appRequire('routes/api/apiroute');
 var userRoute = appRequire('routes/backend/user/userroute');
 module.exports = function (app) {
	 
	 console.log("进入route");
	 //api相关
	 app.use('/api/v1', apiRoute);
	 app.use('/user', userRoute);
 }