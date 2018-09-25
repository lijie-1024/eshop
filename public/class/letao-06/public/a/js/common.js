/**
 * 1 所有页面都判断登录 如果没有登直接跳转 下面的代码不能让他执行看见 一定要同步
 */
$.ajax({
	type:"get",
	url:"/employee/checkRootLogin",
	async:false,//默认是true 异步的 false 同步
	success:function(res){
		if(res.error && res.error==400){//没有登录
			location.href="login.html"
		}
	}
})


$(function(){


 //点击退出 退出跳转到登录页面
 $(".login_out_bot").on("click",function(){

	//confirm("确定要退出吗？")确定 返回true 和取消 false
	if(confirm("确定要退出吗？")){//确定
		$.ajax({
			type:"get",
			url:"/employee/employeeLogout",
			success:function(res){
				if(res.success){
					location.href="login.html"
				}else{
					alert(res.message);
				}
			}
		})
	}

 }) 














	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

});