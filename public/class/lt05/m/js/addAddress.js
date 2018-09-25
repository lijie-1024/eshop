
// 1 引入对应的js css
// 2 去mobile的js里面复制那个 city.js 省市区数据引入
$(function(){
     //addAddress 页面 添加 跳转过来 地址栏 会有?isEdit=0  编辑跳过来 ?isEdit=1
    // 获取地址栏的isEdit 1.把前面写过的方法 放到public.js里面 在当前页面引入 就可以使用了
    // 2 可以自己直接使用location.search
    var isEdit=location.search.split("=")[1];
    if(isEdit==0){//添加跳过来
        // 把模板显示到页面上
        var html=template("editTpl",{});//添加应该是空的 不该有数据
        $("#editForm").html(html);
    }else{//编辑过来的
          //addAddress 页面 如果有 把刚刚存的 那条地址 拿出来 显示到页面上
        //    localStorage.getItem("editAddress") 是一个长的很像数组或者对象的字符串
        if(localStorage.getItem("editAddress")){
            var address=JSON.parse(localStorage.getItem("editAddress"));
            console.log(address)
            var html=template("editTpl",address);
            $("#editForm").html(html);
        }
    }

    // 3 初始化弹出选择器  {layer:3} 有三行 
    var picker = new mui.PopPicker({layer:3});
    // 4 显示省市区
    picker.setData(cityData);
    // 5 点击省市区文本框 显示
    $("#selectCity").on("tap",function(){
        // 显示
        picker.show(function (items) {//items 形式参数 可以随便改名字
            console.log(items)//数组 有选中的三个省市区
            // 把省市区填写到文本框里
            $("#selectCity").val(items[0].text+items[1].text+items[2].text)
        })
    })

    // 点击确定按钮 获取数据  判断是否符合  发送ajax添加收货地址
    $("#addAddress").on("tap",function(){
        // [name=username] 获取name属性值为username的元素
        var username=$.trim($("input[name=username]").val());
        var postcode=$.trim($("input[name=postcode]").val());
        var city=$.trim($("input[name=city]").val());
        var detail=$.trim($("input[name=detail]").val());
        // 判断是否符合
        if(!username){
            mui.toast("请输入收货人");
            return;
        }
        if(!postcode){
            mui.toast("请输入postcode");
            return;
        }
        // 发送ajax 添加地址
        // 不管编辑还是添加 都需要获取表单的数据 发送ajax
        // 把地址改成对应的
        var data={
            "address":city,
            "addressDetail":detail,
            "recipients":username,
            "postcode":postcode
        };
        if(isEdit==1){//编辑
            var url="/address/updateAddress";
            // 编辑还需要传id
            data.id=address.id;
            var msg='编辑地址成功'
        }else{//添加
            var url="/address/addAddress";
            var msg='添加地址成功';
        }
        $.ajax({
            "type":"post",
            "url":url,
            "data":data,
            success:function(res){
                if(res.success){
                    // 跳转到收货列表
                    mui.toast(msg);
                    setTimeout(function() {
                        location.href="address.html";
                    }, 2000);
                }
            }
        })

    })

    
   
 

})