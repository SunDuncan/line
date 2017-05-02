/**
 * @Author: Duncan
 * @Date: 2017-05-1 17:22
 * @Last Modified by:
 * @Last Modified time: 
 */
 
 var mysql = require('mysql');
 var config = appRequire('config/config');
 
 var dbDriverPool = mysql.createPool(config.mysql);
 
 exports.mysqlPool = dbDriverPool;