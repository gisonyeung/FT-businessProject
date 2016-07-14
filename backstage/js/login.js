$(document).ready(function() {
	var baseurl = 'http://' + window.location.host;
	$('.tab').on('click', function() {
		$('.tab').removeClass('active');
		$(this).addClass('active');
		if( $(this).hasClass('tab-login') ) {
			$('.register').hide();
			$('.login').show();
		} else {
			$('.login').hide();
			$('.register').show();
		}
	});


	// 回车登录
	$("#l-username, #l-password").keypress(function(e){
		// 过滤空格
		if (event.which == 32) { e.preventDefault(); return false; }
		//  回车回调函数
		else if(event.which == 13) {
			$('#loginBtn').click();
		};
	});

	// 登录
	$('#loginBtn').on('click', function(e) {
		var formData = {
			userName : $('#l-username').val(),
			password : $('#l-password').val(),
		}
		// 格式验证
		if( !(/\S/.test(formData.userName)) ) {
			errorTip('login', '用户名不能为空');
			warning('#l-username');
			return false;
		} else if( !(/\S/.test(formData.password)) ) {
			errorTip('login', '密码不能为空');
			warning('#l-password');
			return false;
		}
		// 提交表单
		login(formData);
		return false;
	});

	// 提交表单
	function login(formData) {
		$.ajax({
			url: baseurl + '/user/login',
			type: 'POST',
			data: formData,
			success: function(data) {
				if(data == 'success') {
					location.href = baseurl + '/backstage/allnes.html';
				} else {
					errorTip('login', '登录失败，原因：' + data.reason);
				}
			},
			error: function() {
				errorTip('login', '登录失败，服务器无响应');
			}
		});
	}



	// 注册
	$('#registerBtn').on('click', function() {
		var formData = {
			userName : $('#r-username').val(),
			password : $('#r-password').val(),
			confirmPassword : $('#cpassword').val(),
			teamId : $('#team').val(),
		}
		// 格式验证
		if( !(/\S/.test(formData.userName)) ) {
			errorTip('register', '用户名不能为空');
			warning('#r-username');
			return false;
		} else if( !(/\S/.test(formData.password)) ) {
			errorTip('register', '密码不能为空');
			warning('#r-password');
			return false;
		} else if( formData.password.length < 6 ) {
			errorTip('register', '密码长度不能小于6个字符');
			warning('#r-password');
			return false;
		} else if( !(/\S/.test(formData.confirmPassword)) ) {
			errorTip('register', '确认密码不能为空');
			warning('#cpassword');
			return false;
		} else if( formData.password !== formData.confirmPassword ) {
			errorTip('register', '两次密码输入不一致');
			warning('#cpassword');
			return false;
		}
		// 提交表单
		register(formData);
		return false;
	});

	// 提交表单
	function register(formData) {
		$.ajax({
			url: baseurl + '/user/register',
			type: 'POST',
			data: formData,
			success: function(data) {
				if(data == 'success') {
					successTip('恭喜，注册成功！');
					cleanAll('register');
				} else {
					errorTip('register', '注册失败，原因：' + data.reason);
				}
			},
			error: function() {
				errorTip('register', '注册失败，服务器无响应');
			}
		});
	}










	function errorTip(panel, text) {
		if(panel == 'login') {
			$('.l-error').text(text);
			$('.l-error').addClass('active');
		} else {
			$('.r-error').removeClass('text-success');
			$('.r-error').text(text);
			$('.r-error').addClass('active');
		}
	}

	function successTip(text) {
		$('.r-error').addClass('text-success');
		$('.r-error').text(text);
		$('.r-error').addClass('active');
	}

	function warning(elem) {
		$(elem).parent().addClass('has-error');
		$(elem).focus();
	}

	function cleanAll(panel) {
		if(panel == 'login') {
			$('#l-username').val('');
			$('#l-password').val('');
		} else {
			$('#r-username').val('');
			$('#r-password').val('');
			$('#cpassword').val('');
		}
	}


	$(".colorInput").on('keydown', function() {
		$(this).parent().removeClass('has-error');
	});


	function parseJSON(data) {
   		var obj;
   		try {
   			obj = JSON.parse(data)
   		} catch(e) {
   			obj = {};
   		}
   		return obj;
   };

});