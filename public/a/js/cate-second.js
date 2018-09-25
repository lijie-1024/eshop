$(function() {
  var page = 1;
  var pageSize = 10;
  var totalPage = 0;
  getData();
  function getData() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(res) {
        //   console.log(res);
        totalPage = Math.ceil(res.total / pageSize); //总页数
        var html = template("secondTpl", res);
        $(".table").html(html);
      }
    });
  }

  $("#prev").on("click", function() {
    page--;
    if (page < 1) {
      page = 1;
      alert("已经第一页");
      return;
    }
    getData();
  });
  $("#next").on("click", function() {
    page++;
    if (page > totalPage) {
      page = totalPage;
      alert("已经最后一页");
      return;
    }
    getData();
  });

  // 页面一打开就先把一级分类填到select内
  $.ajax({
    url: " /category/queryTopCategoryPaging",
    type: "get",
    data: {
      page: 1,
      pageSize: 100
    },
    success: function(res) {
      console.log(res);
      var data = res.rows;
      var str = "";
      for (var i = 0; i < data.length; i++) {
        str += `<option value="${data[i].id}">${data[i].categoryName}</option>`;
      }
      $("#select-box").html(str);
    }
  });
  // 上传图片预览
  var brandLogo = "";
  $("#fileupload").fileupload({
    dataType: "json",
    done: function(e, data) {
      //   console.log(data);
      brandLogo = data.result.picAddr;
      $("#pre").attr("src", data.result.picAddr);
    }
  });

  $("#save").on("click", function() {
    var brandName = $("#brandName").val();
    var categoryId = $("#select-box").val();
    if (!brandName) {
      alert("输入名称");
      return;
    }
    $.ajax({
      type: "post",
      url: "/category/addSecondCategory",
      data: {
        brandName: brandName,
        categoryId: categoryId,
        brandLogo: brandLogo,
        hot: 0
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
