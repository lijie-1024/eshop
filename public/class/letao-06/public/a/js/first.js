$(function(){
    //一开始就发送ajax获取所有一级分类 显示到页面上
    var page=1;//默认第一页  全局的
    var pageSize=10;//每页显示的条数
    var totalPage=0;
    // 发ajax
    getData()
    // 下一页
    $("#next").on("click",function(){
        // 页码+1
        page++;
        if(page>totalPage){//最多只能到总页数
            page=totalPage;
            alert('最后一页')
            return;
        }
        getData()
    })
    // 上一页
    $("#prev").on("click",function(){
        // 页码-1
        page--;
        if(page<1){//最少只能到1
            page=1;
            alert('第一页')
            return;
        }
        getData()
    })
    function  getData(){
        $.ajax({
            url:"/category/queryTopCategoryPaging",
            type:"get",
            data:{"page":page,"pageSize":pageSize},
            success:function(res){
                console.log(res);
                totalPage=Math.ceil(res.total/pageSize);//总页数
                var html=template("firstTpl",res)
                $("#first-box").html(html);
            }
        })
    }

    // 点击保存按钮 添加一级分类
    $("#save").on("click",function(){
        // 获取一级分类
        var firstCate= $("input[name=firstCate]").val();
        if(!firstCate){
            alert('请输入分类');
            return;
        }
        // 发送ajax 添加
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:{"categoryName":firstCate},
            success:function(res){
                if(res.success){//成功刷新页面
                    location.reload();
                }
            }
        })
    })


})