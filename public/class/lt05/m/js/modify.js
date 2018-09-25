$(function(){
// 点击确认修改密码 按钮  获取原密码 新密码 确认密码 验证码 
// 判断是否符合格式
// 如果符合 发送ajax到后台 去修改
// 返回成功或者失败

$("#modify-btn").on("tap",function(){
    // 获取原密码 新密码 确认密码 验证码 
    var originPass=$("input[name=originPass]").val();
    var newPass=$("input[name=newPass]").val();
    var confirmNewPass=$("input[name=confirmNewPass]").val();
    var vCode=$("input[name=vCode]").val();
    console.log(originPass,newPass,confirmNewPass,vCode);
    // 判断是否符合
    if(!originPass){
        mui.toast("请输入原密码");
        return;
    }
    if(newPass!=confirmNewPass){
        mui.toast("两次密码不一样");
        return;
    }
    // 发送ajax
    $.ajax({
        type:"post",
        url:"/user/updatePassword",
        data:{"oldPassword":originPass,"newPassword":newPass,"vCode":vCode},
        success:function(res){
            // console.log(res);
            if(res.success){
                // 调整到登陆 重新登陆
                location.href="login.html";
            }
        }
    })

})
// 点击获取验证码
$("#getCode").on("tap",function(){
    $.ajax({
        type:"get",
        url:"/user/vCodeForUpdatePassword",
        success:function(res){
            console.log(res);
        }
    })
})


})