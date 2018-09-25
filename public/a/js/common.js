/*
阻止跳转 没有登陆就回到登录页，把异步改为同步！
*/
$.ajax({
  url: "/employee/checkRootLogin",
  type: "get",
  async: false,
  success: function(res) {
    if (res.error && res.error == 400) {
      location.href = "login.html";
    }
  }
});

$(function() {
  var navLi = $(".navs li");
  navLi.on("click", function() {
    $(this)
      .find("ul")
      .slideToggle();
  });

  $(".login_out_bot").on("click", function() {
    if (confirm("确定要退出吗？")) {
      $.ajax({
        url: "/employee/employeeLogout",
        type: "get",
        success: function(res) {
          if (res.success) {
            location.href = "login.html";
          } else {
            alert(res.message);
          }
        }
      });
    }
  });
});
