$(function() {
  var address = null;
  $.ajax({
    type: "get",
    url: "/address/queryAddress",
    success: function(result) {
      // console.log(result);
      address = result;

      var html = template("addressTpl", { result: result });
      $("#addressbox").html(html);
    }
  });

  $("#addressbox").on("tap", ".del", function() {
    var id = $(this).attr("data-id");
    var li = this.parentNode.parentNode;
    mui.confirm("你确认要删除吗？", function(m) {
      if (m.index == 1) {
        $.ajax({
          type: "post",
          url: " /address/deleteAddress",
          data: { "id": id },
          success: function(res) {
            // console.log(res);
            if (res.success == true) {
              location.reload();
            }
          }
        });
      } else {
        mui.swipeoutClose(li);
      }
    });
  });

  $("#addressbox").on("tap",".edit",function(){
    // 获取当前id 找到数据 存在浏览器中 跳到浏览器重
    var id = $(this).attr("data-id");
    for (var i = 0; i < address.length; i++) {
      if(address[i].id == id){
        console.log(address[i]);
        localStorage.setItem("editAddress",JSON.stringify(address[i]))
      }
    }
    location.href="addAddress.html?isEdit=1";
  })
});
