var userInfo = '';
// 发送ajax获取用户信息, 判断用户是否登录
$.ajax({
  type: "get",
  url: "/user/queryUserMessage",
  // ajax默认异步, 需要强制ajax等待, 为async设置false代码会同步, 默认true为异步
  async: false,
  success: function (result) {
    // console.log(result);
    if (result.error && result.error == 400) {
      // mui.alert('登录状态失效，请重新登录');
      location.href = 'login.html';
    };
    // 登录状态正常, 存储用户具体信息
    userInfo = result;
  }
});
$(function () {
  // 点击退出登录, 发送ajax, 成功退出跳转首页
  $('#logout').on('tap', function () {
    $.ajax({
      type: "get",
      url: "/user/logout",
      success: function (res) {
        if (res.success) {
          mui.toast('退出成功');
          setTimeout(function () {
            location.href = "index.html";
          }, 2000);
        };
      }
    });
  });
  // 拼接html
  var html = template('userTpl', userInfo);
  $('#userbox').html(html);
});