$(function(){

    // 页面打开发送ajax获取所有商品数据 显示到页面上
    $.ajax({
        url:"/product/queryProductDetailList",
        type:"get",
        data:{"page":1,"pageSize":100},
        success:function(res){
            console.log(res);
            var html=template("productTpl",res)
            $("#product-box").html(html);
        }
    })

     // 一打开 就应该先把二级分类 填到select里面
     $.ajax({
        url:"/category/querySecondCategoryPaging",
        type:"get",
        data:{page:1,pageSize:100},
        success:function(res){
            // console.log(res)
            var data=res.rows;//数组 原生拼接 也可以使用模板引擎
            var str='';
            for(var i=0;i<data.length;i++){
                // brandName品牌名字
                str+=`<option value="${data[i].id}">${data[i].brandName}</option>`
            }
            // 循环完有很多option了 放到select里面
            $("#select-box").html(str);
        }

    })
    var imageArr=[];
    // 上传文件
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
           console.log(data.result.picAddr)
            imageArr.push(data.result.picAddr)//上传的图片地址
            // $("#pre").attr("src",data.result.picAddr)
            var img=document.createElement("img");
            img.src=data.result.picAddr;
            $(img).appendTo("#imgs");
        }
    });

    // 添加产品
     
    // proName|是|产品名称
    // oldPrice|是|老价格
    // price|是|价格
    // proDesc|是|产品描述
    // size|是|产品尺寸
    // statu|是|产品上下架 1没下架 0下架
    // num|是|用户库存
    // brandId|是|归属品牌
    // pic图片数组[{"picName":"24-1.png","picAddr":"product/24-1.png"},{"picName":"24-1.png","picAddr":"product/24-1.png"}]






})