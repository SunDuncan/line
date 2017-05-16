// $(document).ready(function() {
// 		$("#login").click(function() {
// 			$.ajax({
// 				type: "POST",
// 				url: "api/v1/login",
// 				dataType: "json",
// 				data: {
// 					username: $("#username").val(),
// 					password: $("#pass").val()
// 				},
// 				success: function (data) {					
// 					if (data.data.isSuccess) {
// 						$("#buttonResult").html(JSON.stringify(data));
// 						localStorage.setItem("access_token", data.access_token);
// 					    localStorage.setItem("key", data.data.accountId);
// 					    var url = "index?access_token=" + localStorage.getItem("access_token"); 
// 					    location.href = url;
// 					} else {
// 						$("#buttonResult").html("出现错误" + data.msg);
// 					}
// 				},
// 				error: function(jqXHR) {
// 					alert("发生错误："  + jqXHR.status);
// 				}
// 			})
// 		});
// 	});

