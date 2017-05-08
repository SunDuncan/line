/**
 * @Author: Duncan
 * @Date: 2017-05-05 20:57
 * @Last Modified by: 
 * @Last Modified time: 
 * @Function: 数据校验
 * @Copy By: Cerious 
 */
var DataVerify = function () {

};

/**
 *判断是否是整数
 * @param str
 * @returns {boolean}
 */
DataVerify.prototype.isNumeric = function (str) {
    if ((typeof str) == 'string' || (typeof str) == 'number') {
        
        var numberValue = parseInt(str);
        if (isNaN(numberValue)) {
            return false;
        }        
        return true;
    }
};

/**
 * 判断一个变量是否为空或者未定义或者null
 * @param data
 * @returns {boolean}
 */
DataVerify.prototype.isNull = function(data){
    return (data == "" || data == undefined || data == null);
};


DataVerify.prototype.isUndefined = function(data){
    return (data == undefined);
};

DataVerify.prototype.isUndefinedArray = function(keyArr,valueArr) {
    if ((keyArr instanceof Array) && (valueArr instanceof Array)) {
        var keyLength = keyArr.length;
        var valueLength = valueArr.length;

        if (keyLength == valueLength) {
            for (var i=0;i<keyLength;i++) {
                if (keyArr[i] == undefined) {
                    return {
                        isRight : false,
                        msg : valueArr[i] + ' 为必填项!'
                    };
                }
            }
        }
    }

    return {
        isRight : true
    };
};

DataVerify.prototype.isNumericArray = function(keyArr,valueArr) {
    if ((keyArr instanceof Array) && (valueArr instanceof Array)) {
        var keyLength = keyArr.length;
        var valueLength = valueArr.length;

        if (keyLength == valueLength) {
            for (var i=0; i<keyLength; i++) {
                if (!(DataVerify.prototype.isNumeric(keyArr[i]))) {
                    return {
                        isRight : false,
                        msg : valueArr[i] + ' 应该是数字类型!'
                    };
                }
            }
        }
    }

    return {
        isRight : true
    };
};


module.exports = new DataVerify();