/**
 * @Author: Duncan
 * @Date: 2017.04.23
 * @Last Modified by:
 * @Last Modefied Time:
 * @Function: 测试全局的变量的用处
 */
 require("../global_bootstrap");
 var config = appRequire('config/config');
 
 console.log("name = " + config.app_name);
 
 