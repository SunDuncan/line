/**
 * @Author: Duncan
 * @Date: 2017-06-05 14:02
 * @Last Modified By:
 * @Last Modified Time:
 * @function: 配置multer
 */

var multer = require("multer");
var path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../', 'public/images/portrait/'));
    },

    //给上传文件重命名，获取天机后缀名
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

var uploading = multer({
    storage: storage,
    limits: {fileSize: 1000000, files: 1}
}).single('portrait');

module.exports = uploading;