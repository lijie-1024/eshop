$(function () {
  // 初始化滚动效果
  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005 // flick: 减速系数, 系数越大滚动速度越慢, 滚动距离越小, 默认值0.0006
  });

  // 发送ajax获取左边一级分类的数据拼接出html显示到页面
  // 把默认的二级分类显示出来
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    success: function (response) {
      // console.log(response);
      var html = template(
        "category-first",
        {"result":response.rows}
      );
      $('.links').html(html);
      // 获取到一级分类, 开始获取二级分类
      if (response.rows.length) {
        // 有一级分类, 为links所有后代a标签的第一个添加样式
        $('.links').find('a').eq(0).addClass('active');
        // 发送请求到默认的第一个一级分类
        var id = response.rows[0].id;
        // 发送ajax获取二级分类
        getSecondCategory(id);
      };
    }
  });

  // 点击一级分类发送ajax显示对应的二级分类
  $('.links').on('click', 'a', function () {
    // 获取当前的id
    var id = $(this).attr('data-id');
    // 当前标签加上active, 兄弟移除
    // $('.links a').removeClass('active');
    $(this).addClass('active').siblings().removeClass('active');
    // 发送ajax显示对应二级分类
    getSecondCategory(id);
  });
});

function getSecondCategory(id) {
  // 发送ajax显示对应二级分类
  $.ajax({
    type: "get",
    url: "/category/querySecondCategory",
    data: {"id": id},
    success: function (result) {
      // console.log(result);
      var html = template('category-second', result);
      $('.brand-list').html(html);
    }
  });
};