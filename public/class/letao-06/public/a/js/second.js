$(function(){
    //一开始就发送ajax获取所有二级分类 显示到页面上
    var page=1;//默认第一页  全局的
    var pageSize=10;//每页显示的条数
    var totalPage=0;
    // 发ajax
    getData()
    // 下一页
    $("#nextBtn").on("click",function(){
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
    $("#prevBtn").on("click",function(){
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
            url:"/category/querySecondCategoryPaging",
            type:"get",
            data:{"page":page,"pageSize":pageSize},
            success:function(res){
                // console.log(res);
                totalPage=Math.ceil(res.total/pageSize);//总页数
                var html=template("secondTpl",res)
                $("#second-box").html(html);
            }
        })
    }
    // 一打开 就应该先把一级分类 填到select里面
    $.ajax({
        url:"/category/queryTopCategoryPaging",
        type:"get",
        data:{page:1,pageSize:100},
        success:function(res){
            // console.log(res)
            var data=res.rows;//数组 原生拼接 也可以使用模板引擎
            var str='';
            for(var i=0;i<data.length;i++){
                str+=`<option value="${data[i].id}">${data[i].categoryName}</option>`
            }
            // 循环完有很多option了 放到select里面
            $("#select-box").html(str);
        }

    })
    var url='';//图片的地址
    // 上传文件
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
        //    console.log(data.result.picAddr)
             url=data.result.picAddr//上传的图片地址
            $("#pre").attr("src",data.result.picAddr)
        }
    });
     // 点击保存按钮 添加二级分类
     $("#save").on("click",function(){
        // 获取二级分类 
        var categoryId= $("[name=categoryId]").val();
        var brandName= $("[name=brandName]").val();
        if(!brandName){
            alert('请输入品牌名字');
            return;
        }
        // 发送ajax 添加
        $.ajax({
            type:"post",
            url:"/category/addSecondCategory",
            data:{
                "brandName":brandName,
                "categoryId":categoryId,
                "brandLogo":url,
                "hot":0
            },
            success:function(res){
                if(res.success){//成功刷新页面
                    location.reload();
                }
            }
        })
    })



















})