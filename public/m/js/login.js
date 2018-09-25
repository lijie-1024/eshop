$(function () {
  // 点击登录按钮
  $('#login-btn').on('click', function () {
    // 获取用户名和密码
    var username = $('input[name=username]').val();
    var password = $('input[name=password]').val();
    // 判断
    if (!username) {
      mui.alert('请输入用户名');
      return;
    }
    if (!password) {
      mui.alert('请输入密码');
      return;
    }
    // 发送ajax
    $.ajax({
      type: "post",
      url: "/user/login",
      data: {
        "username": username,
        "password": password
      },
      beforeSend: function () {
        // 发送ajax之前会执行, return false会阻止ajax继续执行
        $('#login-btn').text('正在登录中...');
      },
      success: function (result) {
        // console.log(result);
        if (result.success) {
          mui.toast('登录成功');
          setTimeout(function () {
            location.href = 'user.html';
          }, 2000);
        }
      }
    });
  })
});