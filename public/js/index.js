$(document).ready(function(){

	var access_token = localStorage.getItem('access_token');
	
	alert(access_token);
	var indexTest = Handlebars.compile($('#loginSuccess').html());
	
	$('#index_container').html(indexTest({access_token: access_token}));
});