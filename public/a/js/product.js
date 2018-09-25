$(function() {
  var page = 1;
  var pageSize = 100;
  $.ajax({
    url: "/product/queryProductDetailList",
    type: "get",
    data: {
      page: page,
      pageSize: pageSize
    },
    success: function(res) {
      //   console.log(res);
      var html = template("productTpl", res);
      $("#table").html(html);
    }
  });

  // 页面一打开就先把一级分类填到select内
  $.ajax({
    url: "/category/querySecondCategoryPaging",
    type: "get",
    data: {
      page: 1,
      pageSize: 100
    },
    success: function(res) {
      //   console.log(res);
      var data = res.rows;
      var str = "";
      for (var i = 0; i < data.length; i++) {
        str += `<option value="${data[i].id}">${data[i].brandName}</option>`;
      }
      $("#select-box").html(str);
    }
  });
  // 上传图片浏览
  $("#fileupload").fileupload({
    dataType: "json",
    done: function(e, data) {
      console.log(data.result.picAddr);
      imgArr.push(data.result.picAddr);
      var img = document.createElement("img");
      img.src = data.result.picAddr;
      $(img).appendTo("#imgs");
    }
  });
});
