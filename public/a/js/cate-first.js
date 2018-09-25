$(function() {
  var page = 1;
  var pageSize = 10;
  var totalPage = 0;
  getData();
  function getData() {
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(res) {
        console.log(res);
        totalPage = Math.ceil(res.total / pageSize); //总页数
        var html = template("cateFirstId", res);
        $("#tbody").html(html);
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


  $("#save").on("click",function(){
      var firstCate =$("input[name=firstCate]").val();
      if(!firstCate){
          alert("添加分类");
          return;
      }
      $.ajax({
        type:'post',
        url:"/category/addTopCategory",
        data:{categoryName:firstCate},
        success:function(res){
            if(res.success){
                location.reload();
            }
        }
      })
  })
});
