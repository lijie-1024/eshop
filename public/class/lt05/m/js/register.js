$(function(){
// 点击 注册按钮  获取用户名密码手机号这些数据 发送ajax到后台 
// 后台insert into插入数据 返回成功或者失败
// 点击 注册按钮
$("#register-btn").on("tap",function(){
    // 获取用户名密码手机号这些数据
    //input[name=username] 属性选择器
    var username=$("input[name=username]").val();
    var mobile=$("input[name=mobile]").val();
    var password=$("input[name=password]").val();
    var againPass=$("input[name=againPass]").val();
    var vCode=$("input[name=vCode]").val();
    // console.log(username,mobile,password,againPass,vCode);//同时打印
    // 判断是否符合格式
    if(!username){
        mui.alert("请输入用户名");
        return;
    }
    var reg=/^1\d{10}$/;//手机号 1开头 11位 
    // reg.test(mobile) 匹配返回true  不匹配 返回false
    if(!reg.test(mobile)){
        mui.alert("手机格式不对");
        return;
    }
    if(password!=againPass){
        mui.alert("两次密码不一样");
        return;
    }
    // 发送ajax到后台
    $.ajax({
        type:"post",
        url:"/user/register",
        data:{"username":username,"password":password,"mobile":mobile
                ,"vCode":vCode
        },
        success:function(res){
            // console.log(res);
            if(res.success){//成功
                mui.alert("注册成功");
                setTimeout(function(){ //两秒后 跳转到登录页面
                    location.href="login.html"
                }, 2000);
            }
        }
    })
})

// 点击验证码 发送ajax  获取验证码 然后填写到表单
$("#getCode").on("tap",function(){
    //  发送ajax  获取验证码
    // 完成倒计时
    $.ajax({
        type:"get",
        url:"/user/vCode",
        // 一般这里 需要传电话号码 去后台的 这里假的就不写了
        success:function(res){
            console.log(res)
        }
    })
})


})