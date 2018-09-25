$(function() {
  var id = getParamsByUrl(location.href, "id");
  $.ajax({
    type: "get",
    url: " /product/queryProductDetail",
    data: { id: id },
    success: function(res) {
      //   console.log(res);
      kucunNum = res.num;
      var html = template("productTpl", { res });
      $("#productBox").html(html);
      //获得slider插件对象
      var gallery = mui(".mui-slider");
      gallery.slider();
    }
  });
  // 给尺码加样式
  $("#productBox").on("tap", ".size span", function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
  // 减号
  $("#productBox").on("tap", ".seleNum .reduce", function() {
    // console.log(111);
    $(this).addClass("active");

    var num = $("#ipt").val();
    num--;
    if (num < 1) {
      num = 1;
    }
    $("#ipt").val(num);
  });
  // 加号
  $("#productBox").on("tap", ".seleNum .increase", function() {
    console.log(222);
    var num = $("#ipt").val();
    num++;
    if (num > kucunNum) {
      num = kucunNum;
    }
    $("#ipt").val(num);
  });

  // 加入购物车
  $("#productBox").on("tap", "#addcart", function() {
    if (!size) {
      mui.alert("请选择尺码");
      return;
    }
    var nowNum = $("#ipt").val();
    var size = $(".size .active").html();
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: id,
        num: nowNum,
        size: size
      },
      success: function(res) {
        console.log(res);
        if (res.success) {
          mui.confirm("添加购物车成功，是否查看？", function(message) {
            if (message.index == 1) {
              location.href = "cart.html";
            }
          });
        }
      }
    });
  });
});
