$(function() {
  // 页面渲染用户数据
  $.ajax({
    url: "/user/queryUser",
    type: "get",
    data: {
      page: 1,
      pageSize: 10
    },
    success: function(res) {
      console.log(res);
      var html = template("userTpl", res);
      $("#tbody").html(html);
    }
  });

  // 用户的状态管理
  $("#tbody").on("click", "button", function() {
    var isDelete = $(this).attr("data-isDel");
    var id = $(this).attr("data-id");
    $.ajax({
      url: " /user/updateUser",
      type: "post",
      data: {
        id: id,
        isDelete: isDelete == 1 ? 0 : 1
      },
      success: function(res) {
        console.log(res);
        if (res.success) {
          location.reload();
        }
      }
    });
  });
});
