$(function(){
    // 1 在search-result.html 引入public.js 不然a跳转不了
    // 2 a标签写成<a href="detail.html?id=<%= data[i].id %>">
    // 获取 商品的 id
    var kuncunNum=0;
    var size=null;//全局的 存尺码
    var id=getParamsByUrl(location.href,'id');//产品id 已经有了 没有必要再去res里面获取了
    // 发送ajax获取对应 id的商品数据
    $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data:{"id":id},
        success:function(res){
            console.log(res);
            // 拼接模板 显示到页面
            kuncunNum=res.num;//把库存 存到全局变量里面
            var html=template("productTpl",res);
            $("#product-box").html(html);
            // 页面上已经都了 才会轮播
            //获得slider插件对象
            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    })
    // 点击 尺寸 加上颜色
    $("#product-box").on("tap",'.size span',function(){
        $(this).addClass("active").siblings("span").removeClass("active");
        size= $(this).html();//尺码
    })
    // 点击 - 
    $("#product-box").on("tap",'#reduce',function(){
        
        var num=$("#ipt").val();
        num--;
        if(num<1){
            num=1;//只能最少一件
        }
        $("#ipt").val(num);
        
    })
    // 点击 +
    $("#product-box").on("tap",'#increase',function(){
    
        var num=$("#ipt").val();
        num++;
        if(num>kuncunNum){
            num=kuncunNum;//最多只能买库存最大的数量
        }
        $("#ipt").val(num);
        
    })
    //如果你没有放到模板里面 就直接绑定 如果放到了 就使用事件委托 
    $("#product-box").on("tap","#addCart",function(){
        //需要 产品id 数量 尺码
        // alert($(".size .active").html())
        if(!size){
            alert("请选择尺码");
            return;
        }
        // 发送ajax添加购物车
        var nowNum=$("#ipt").val();//获取选中的数量
        $.ajax({
            type:"post",
            url:"/cart/addCart",
            data:{
                "productId":id,
                "num":nowNum,//你选中的数量
                "size":size
            },
            success:function(res){
                // console.log(res);
               if(res.success){ //成功弹出是否 去购物车页面
                    mui.confirm("添加成功 你要取购物车页吗？",function(m){
                        if(m.index==1){//确定
                            location.href="cart.html"
                        }
                    })
               }
            }
        })

    })



})