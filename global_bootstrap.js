/**
 * 加载一个全局引用的插件，避免dot hell
 * @module global
 * @param {string} path -- 组件的相对位置
 */
 
 global.appRequire = function(path) {
	 return require(require('path').resolve(__dirname, path));
 }