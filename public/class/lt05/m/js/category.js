$(function(){
    // 初始化 滚动效果
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    
    // 一开始 就发送ajax 获取 左边一级分类的数据 拼接出html 显示到页面
    // 顺便把默认的 二级分类显示出来
    $.ajax({
        type:"get",
        url:"/category/queryTopCategory",
        success:function(response){
            console.log(response)
            // template("模板id",数据对象) 用对象里面的属性
            var html=template(
                "category-first"
                ,{"result":response.rows}
            );
            $(".links").html(html);
            // 有一级 分类 才会有二级分类 确定有才做二级分类
            if(response.rows.length){//有数据
                // find 所有后代 a标签 第一个a加上样式
                $(".links").find("a").eq(0).addClass("active");
                // 发送请求到默认的 第一个一级分类 对应 二级分类
                var id=response.rows[0].id;
                // 发送ajax 获取对应的二级分类
                getSecondCategory(id)
            }
        }
    })

    // 点击一级分类的 标签  发送ajax显示对应的二级分类数据
    $(".links").on("click","a",function(){
        // 获取当前的id
        var id=$(this).attr("data-id");
        // 点击的加 active  其他兄弟 去掉active
        // $(".links a").removeClass("active")
        $(this).addClass("active").siblings().removeClass("active")
        // 发送ajax显示对应的二级分类数据
        getSecondCategory(id)
        // $.ajax({
        //     type:"get",
        //     url:"/category/querySecondCategory",
        //     data:{"id":id},
        //     success:function(res){
        //         // console.log(res); res正好是一个对象 
        //         // {total: 5, rows: Array(5)}
        //         var html=template("category-second",res);
        //         $(".brand-list").html(html);
        //     }
        // })
    })
})

function getSecondCategory(id){
      // 发送ajax显示对应的二级分类数据
      $.ajax({
        type:"get",
        url:"/category/querySecondCategory",
        data:{"id":id},
        success:function(res){
            // console.log(res); res正好是一个对象 
            // {total: 5, rows: Array(5)}
            var html=template("category-second",res);
            $(".brand-list").html(html);
        }
    })

}