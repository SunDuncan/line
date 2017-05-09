/**
 * @Author: Duncan
 * @Date: 2017-05-09 19:36
 * @Last Modified by: 
 * @Last Modified time: 
 * @Function: user的测试,用户编辑的部分暂时未完成
 */

require('../global_bootstrap');
var should = require('should');
var userService = appRequire("service/driver/user/userservice"),
	moment = require('moment');
	
var dataTest = {
	UserName: '测试的名字',
	Gender: 1,
	Pwd: '123456',
	PortraitAddress: '',
	IDCard: "110",
	CreateTime: moment().format("YYYY-MM-DD HH:mm:ss"),
	EndTime: '',
	IsActive: 1,
	StatusID: 0,
}
var insertUserID = -1;

describe("用户功能单元测试", function () {
	it("用户新增", function (done) {
		userService.insertUser(dataTest, function (err, results) {
			if (err) {
				return done(err);
			}
			
			results.insertId.should.be.above(0).and.should.be.a.Number;
			insertUserID = results.insertId;
			done();
		});
	});
	
	it("用户的信息查询", function (done) {
		var selectData = {
			UserID: insertUserID,
			PageNum: 15,
			CurPage: 1
		}
		
		userService.queryUser(selectData, function (err, queryResult) {
			if (err) {
				return done(err);
			}
			
			queryResult[0].UserID.should.be.equal(selectData.UserID).and.should.be.a.Number;
			done();
		});
	});
	
}) 

	
	