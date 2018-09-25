$(function(){
    // 点击 登录按钮 获取用户名和密码  判断是否符合  如果符合 发送ajax到后台
    $("#login-btn").on("click",function(){
        // 获取用户名和密码 
        var username=$("input[name=username]").val();
        var password=$("input[name=password]").val();
        // 判断是否符合
        if(!username){
            mui.toast("请输入用户名");
            return;
        }
        if(!password){
            mui.toast("请输入用户名");
            return;
        }
        // 如果符合 发送ajax到后台
        $.ajax({
            type:"post",
            url:"/user/login",
            data:{"username":username,"password":password},
            beforeSend:function(){
                $("#login-btn").text("正在登录中...")
                // 发送ajax之前会执行这个函数 如果return false ajax就不会发送了
            },
            success:function(res){
                // console.log(res);
                if(res.success){//成功
                    mui.toast("登录成功");
                    // 跳转到用户中心页面
                    setTimeout(function(){
                        location.href="user.html";
                    },2000)
                }
            }
        })
    })


})