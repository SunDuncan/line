/**
 * @Author: Duncan
 * @Date: 2017-5-27 8:19
 * @Last Modified By: Duncan
 * @Last Modified Time: 
 * @Function: 用来注册handlebars的帮助函数
 */

module.exports = function (hbs) {
	
	//css的注册模板
	hbs.registerHelper('css', function (str, option) {
		var cssList = this.cssList || [];
		str = str.split(/[,，;；]/);
		console.log('css: ', str);

		str.forEach(function (item) {
			if (cssList.indexOf(item) < 0) {
				cssList.push(item);
			}
		});
		this.cssList = cssList.concat();
	});
	
	
	//js注册模板
	hbs.registerHelper('js', function (str, option) {
		var jsList = this.jsList || [];
		str = str.split(/[,，；;]/);
		console.log('js : ', str);

		str.forEach(function (item) {
			if (jsList.indexOf(item) < 0) {
				jsList.push(item);
			}
		});
	});
}