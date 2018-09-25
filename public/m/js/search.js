$(function() {
  // 创建数组存储搜索过的关键字
  var keyArr = [];
  // 去浏览器获取存储的关键字
  if (localStorage.getItem("abc")) {
    // 如果有, 转换成数组
    keyArr = JSON.parse(localStorage.getItem("abc"));
    console.log(keyArr.indexOf("1"));

    // 拼接html, 显示到页面
    var html = template("historyTpl", { result: keyArr });
    $("#history-box").html(html);
  }
  // 点击搜索获取填写的文本框的值, 跳转到search-result.html页面, 显示搜索到的所有商品
  $("#search-btn").on("click", function() {
    // 获取文本框值
    var keyword = $(this).siblings().val();
    if (keyword) {
      // 判断一个值是否存在于数组中
      if (keyArr.indexOf(keyword) == -1) {
        // 将获取到的值存入数组
        keyArr.unshift(keyword);
        // console.log(keyArr.indexOf(keyword));
        // 存到浏览器
        localStorage.setItem("abc", JSON.stringify(keyArr));
        // 跳转到search-result页面
        location.href = "search-result.html?keyword=" + keyword;
      }else{
        location.href = "search-result.html?keyword=" + keyword;
      }
    } else {
      alert("请输入商品");
    }
  });

  // 清空历史
  $("#clear").on("click", function() {
    // 清空页面html
    $("#history-box").html("");
    // 清空存储数据
    localStorage.removeItem("abc");
  });

  // 点击历史跳转到相应搜索页面
  $("#history-box").on("tap", "li", function() {
    var key = $(this).text();
    location.href = "search-result.html?keyword=" + key;
  });
});
