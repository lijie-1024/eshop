$(function () {
  // 点击注册按钮获取输入内容, 发送到后台插入数据库, 返回状态
  $('#register-btn').on('tap', function () {
    // 获取输入数据, input[name=username]属性选择器
    var username = $('input[name=username]').val();
    var mobile = $('input[name=mobile]').val();
    var password = $('input[name=password]').val();
    var againpass = $('input[name=againpass]').val();
    var vCode = $('input[name=vCode]').val();
    // console.log(username, mobile, password, againpass, vcode);
    // 判断格式
    if (!username) {
      mui.alert('请输入用户名');
      return;
    }
    var reg = /^1\d{10}$/;
    // reg.test匹配
    if (!reg.test(mobile)) {
      mui.alert('请输入正确的手机号');
      return;
    }
    if (againpass != password) {
      mui.alert('两次密码输入不一致');
      return;
    }
    // 发送ajax
    $.ajax({
      type: "post",
      url: "/user/register",
      data: {
        "username": username,
        "password": password,
        "mobile": mobile,
        "vCode": vCode
      },
      success: function (res) {
        // console.log(res);
        if (res.success) {
          mui.alert('注册成功');
          // 跳转登录页面
          setTimeout(function () {
            location.href = 'login.html';
          }, 2000);
        }
      }
    });
  });
  // 点击获取验证码
  $('#getCode').on('tap', function () {
    // 发送ajax
    $.ajax({
      type: "get",
      url: "/user/vCode",
      // 实际中需要传电话号码去后台
      success: function (result) {
        // console.log(result);
        $('input[name=vCode]').val(result.vCode);
      }
    });
  });
});