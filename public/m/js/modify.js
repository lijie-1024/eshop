$(function () {
  // 点击确认修改密码按钮
  $('#modify-btn').on('tap', function () {
    // 获取原密码, 新密码, 确认密码, 验证码
    var originPass = $('input[name=originPass]').val();
    var newPass = $('input[name=newPass]').val();
    var confirmNewPass = $('input[name=confirmNewPass]').val();
    var vCode = $('input[name=vCode]').val();
    // console.log(originPass, newPass, confirmNewPass, vCode);
    // 判断
    if (!originPass) {
      mui.toast('原密码输入错误');
      return;
    }
    if (newPass != confirmNewPass) {
      mui.toast('新密码两次输入不一致');
      return;
    }
    // 发送ajax
    $.ajax({
      type: "post",
      url: "/user/updatePassword",
      data: {
        "oldPassword": originPass,
        "newPassword": newPass,
        "vCode": vCode
      },
      success: function (result) {
        if (result.success) {
          location.href = 'login.html';
        };
      }
    });
  });
  // 点击获取验证码
  $('#getCode').on('tap', function () {
    // 发送ajax
    $.ajax({
      type: "get",
      url: "/user/vCodeForUpdatePassword",
      // 实际中需要传电话号码去后台
      success: function (result) {
        // console.log(result);
        $('input[name=vCode]').val(result.vCode);
      }
    });
  });
});