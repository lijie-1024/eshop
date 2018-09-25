var userInfo=null;
// 发送ajax获取用户信息 顺便判断是否登录
$.ajax({
    type:"get",
    url:"/user/queryUserMessage",
    // ajax 是默认异步的 不会等着执行完 我们需要在等他判断是否登录了
    async:false,//false 同步 代码会一直等着 默认true 异步
    success:function(res){
        // console.log(res);
        if(res.error && res.error==400){
            // mui.toast("请先登录");
            location.href="login.html";
        }
        // 存储 用户的具体信息
        userInfo=res;
    }
})

$(function(){//页面加载完成之后执行的代码
    // 点击退出登录  发送ajax  后台返回成功还是失败 成功跳转到首页
    $("#logout").on('tap',function(){
        $.ajax({
            type:"get",
            url:"/user/logout",
            success:function(res){
                if(res.success){
                    mui.toast("退出成功");
                    setTimeout(function(){
                        location.href="index.html"
                    }, 2000);
                }
            }
        })
    })

    // 拼接模板 显示到页面
    var html=template("userTpl",userInfo);
    $("#userBox").html(html);

})