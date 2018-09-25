// 获取地址栏上对应的keyword值
var keyword = getParamsByUrl(location.href, 'keyword');
var page = 1;
var html = '';
var priceSort = 1;
var that;
$(function () {
  // 发送ajax到后台获取对应数据, 显示到页面上
  mui.init({
    pullRefresh: {
      container: '#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
      up: {
        height: 50,//可选.默认50.触发上拉加载拖动距离
        auto: true,//可选,默认false.自动上拉加载一次
        contentrefresh: "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
        contentnomore: '没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
        callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据
      }
    }
  });
  // 点击价格发送ajax获取排序后的数据
  $('#priceSort').on('tap', function () {
    // priceSort = 1升序priceSort = 2降序
    priceSort = priceSort == 1 ? 2 : 1;
    // 页码重置为1
    page = 1;
    // 清空原来的页面
    html = '';
    // 重新开始下拉加载
    mui('#refreshContainer').pullRefresh().refresh(true);
    // 发送ajax获取数据
    getData();
  });
});

function getData() {
  if (!that) {
    that = this;
  }
  // 根据关键字发送ajax到后台获取搜索的数据
  $.ajax({
    type: "get",
    url: "/product/queryProduct",
    data: {
      "page": page++,
      "pageSize": 2,
      "proName": keyword,
      "price": priceSort,
      // "num": numSort
    },
    success: function (result) {
      // console.log(result);
      if (result.data.length > 0) {
        html += template('searchTpl', result);
        $('#search-box').html(html);
        // 隐藏正在加载, false代表隐藏, true代表无更多数据
        that.endPullupToRefresh(false);
      } else {
        that.endPullupToRefresh(true);
      };
    }
  });
};
