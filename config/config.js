/**
 * 基础配置的文件都放在这里
 */
 /**
  * @Author Duncan
  * @Date 2017.4.23
  * @Last Modified by: 
  * @Last Modified Time:
  */
 var path = require('path');
 var config = {
	 app_name: 'Duncan',
   app_description: '暂时进行框架的搭建',
   app_keywords: 'Duncan',
   app_version: '0.1.0',
   cookieSecret: '',
   jwt_secret: 'duncan',
   isdev: false, //true:开发环境  false:生产环境
   port: 3000,//服务器的端口
   host: '127.0.0.1',
   mysql: {
     host: '',
     user: '',
     password: '',
     database: '',
     
     connectionLimit: 100,
     supportBigNumbers: true,
   },
   pageCount: '', //分页时每一页要显示的数据量
   
   //邮箱的配置
   mail_opts: {
     host: '',
     port: 25,
     auth: {
       
     }
   },
   
   //redis的配置
   redis_prd: {
  
   },
   
   redis_local: {
     
   }
 }
 
 module.exports = config;