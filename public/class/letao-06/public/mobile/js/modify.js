$(function(){

	/**
	 * 修改密码
	 * 1.获取修改密码按钮并添加点击事件
	 * 2.获取用户输入的信息
	 * 3.对用户输入的信息做校验
	 * 4.调用修改密码接口 实现修改密码功能
	 * 5.跳转到登录页面 重新登录
	 */
	
	$('#modify-btn').on('tap', function(){

		



	});

	/**
	 * 获取认证码
	 */
	
	$('#getCode').on('tap', function(){

		$.ajax({
			url: '/user/vCodeForUpdatePassword',
			type: 'get',
			success: function(res){
				// 将认证码显示在控制台中
				console.log(res.vCode);
			}
		})

	});

});