$(function(){
//  点击登录按钮 获取用户名和密码 判断一下 发送ajax
$("#login-button").on("click",function(){
    // 获取用户名和密码
    var username=$('input[name="username"]').val();
    var password=$('input[name="password"]').val();
    // 判断一下 
    if(!username){
        alert("请输入用户名");
        return;
    }
    if(!password){
        alert("请输入密码");
        return;
    }
    $.ajax({//发送ajax 用户名root 密码123456
        url:"/employee/employeeLogin",
        type:"post",
        data:{username:username,password:password},
        success:function(res) {
            if(res.success){
                location.href="user.html"
            }else{
                alert(res.message);
            }
        }
    })
})


})