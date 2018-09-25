var keyword=getParamsByUrl(location.href,"keyword")
var page=1;//第一页
var html='';
var priceSort=1;//1 升序  2降序
var This='';
$(function(){
    // 获取地址栏上面的 对应的 keyword值
    // 发送ajax到后端 获取对应数据  显示到页面上
    // "http://localhost:3000/m/search-result.html?keyword=lv&name=zs&age=18"
    // console.log(keyword)
    mui.init({
        pullRefresh : {
          container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
          up : {
            height:50,//可选.默认50.触发上拉加载拖动距离
            auto:true,//true自动上拉加载一次 false不会
            contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
            contentnomore:'客观没有啦！！！',//可选，请求完毕若没有更多数据时显示的提醒内容；
            callback :getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
    });
    // 点击价格  发送ajax获取排序后的数据
    $("#priceSort").on("tap",function(){
        // 发送ajax获取排序后的数据
        priceSort= priceSort==1? 2 :1;//如果刚刚是1 点击就变成2
        // 页码也要从1开始
        page=1;
        // 清空原来的页面
        html="";
        // 重新开始下拉加载
        mui('#refreshContainer').pullRefresh().refresh(true);
        // 发送ajax获取 排序后的数据
        getData();
        // if(price==1){
        //     order by asc
        // }esle{
        //     order by desc
        // }
    })

})
// 获取参数
function getParamsByUrl(url,name){
   var index=url.indexOf('?')+1;
   var params=url.substr(index);// keyword=lv&name=zs&age=18
    var arr=params.split("&");// ["keyword=lv", "name=zs", "age=18"]
    for(var i=0;i<arr.length;i++){
        var current=arr[i].split("=");//["keyword", "lv"]
        if(current[0]==name){
            return current[1];
        }
    }
    return null;
}
function getData(){
    // var that=this;
    // console.log(this)
    if(!This){//第一次发生ajax 没有This   直接赋值 mui 以后就一直是mui了
        This=this;//This是变量名字 是随便取的// 是 mui
    }
    // 根据 关键字  发送ajax打破后台 获取 搜索的数据 显示到页面
     $.ajax({
        type:"get",
        url:"/product/queryProduct",
        data:{ "page":page++,"pageSize":3, "proName":keyword,"price":priceSort},
        success:function(res){
            // console.log(res);//res正好是一个对象{page: 1, size: 6, data: Array(6), count: 6}
           if(res.data.length>0){//还有数据
                html+=template('searchTpl',res);
                $("#search-box").html(html);
                // 隐藏那个正在加载的 效果 false隐藏 true 代表显示 没有更多数据了
                This.endPullupToRefresh(false);
           }else{
                //    显示 没有更多数据了
                This.endPullupToRefresh(true);
           }
        }
    })
}