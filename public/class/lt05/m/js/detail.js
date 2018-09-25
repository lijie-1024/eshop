$(function(){
    // 1 在search-result.html 引入public.js 不然a跳转不了
    // 2 a标签写成<a href="detail.html?id=<%= data[i].id %>">
    // 获取 商品的 id
    var kuncunNum=0;
    var id=getParamsByUrl(location.href,'id');
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

    // 点击 尺寸 加上颜色{
    $("#product-box").on("tap",'.size span',function(){
        $(this).addClass("active").siblings("span").removeClass("active");

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
            num=kuncunNum;//最多只能买库存里的
        }
        $("#ipt").val(num);
        
    })



})