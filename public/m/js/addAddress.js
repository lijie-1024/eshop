$(function() {
  // 因为是同一个页面添加和修改，所以首先需要判断到底是哪个页面过来的
  var isEdit = location.search.split("=")[1];
  console.log(isEdit);
  if (isEdit == 0) {
    // 添加
    var html = template("editTpl", {});
    $("#contentbox").html(html);
  } else {
    // 编辑传过来的数据
    if (localStorage.getItem("editAddress")) {
      var address = JSON.parse(localStorage.getItem("editAddress"));
      console.log(address);
      var html = template("editTpl", address);
      $("#contentbox").html(html);
    }
  }




  // 初始化弹出选择器 {layer: 3}表示有3行
  var picker = new mui.PopPicker({ layer: 3 });
  // 显示省市区
  picker.setData(cityData);
  // 点击省市区文本框, 显示选择器
  $("#selectCity").on("tap", function() {
    picker.show(function(items) {
      // console.log(items);
      // 将选择内容输入文本框
      $("#selectCity").val(items[0].text + items[1].text + items[2].text);
    });
  });
  // 点击确定按钮, 获取数据, 判断是否符合, 发送ajax添加收获地址
  $("#addAddress").on("tap", function() {
    var postcode = $.trim($("input[name=postcode]").val());
    var username = $.trim($("input[name=username]").val());
    var city = $.trim($("input[name=city]").val());
    var detail = $.trim($("input[name=detail]").val());
    // 判断
    if (!postcode) {
      mui.toast("请输入邮编");
      return;
    }
    if (!username) {
      mui.toast("请输入收货人");
      return;
    }


    var data ={
      postcode: postcode,
      recipients: username,
      address: city,
      addressDetail: detail,
      // id = id
    }
    if(isEdit == 1){
      var url ="/address/updateAddress";
      data.id = address.id;
      var msg = "编辑地址成功";
    }else{
      var url = "/address/addAddress"
      var msg = "添加地址成功";
    }

    // 发送ajax添加地址
    $.ajax({
      type: "post",
      url: url,
      data: data,
      success: function(result) {
        if (result.success) {
          // 跳转到管理地址页面
          mui.toast(msg);
          setTimeout(function() {
            location.href = "address.html";
          }, 2000);
        }
      }
    });
  });

});
