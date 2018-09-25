$(function(){

    // 发送ajax 获取所有地址显示到页面上
    // 新注册用户还没有添加地址是没有数据的
    // itcast这个有
    var address=null;//存所有的地址
    $.ajax({
        type:"get",
        url:"/address/queryAddress",
        success:function(res){
            console.log(res)
            address=res;//把所有的地址 存在了 全局变量address里面
            var html=template("addressTpl",{"result":res});
            $("#address-box").html(html);
        }

    })
    // 给删除 绑定事件  弹出框 确定的话 就发送ajax去删除 
    $("#address-box").on("tap",".delete-btn",function(){
        // this 删除的a标签
        // var id=this.getAttribut("data-id") 原生的
        var id=$(this).attr("data-id");//id
        var li=this.parentNode.parentNode;//滑动的li标签
        // var btnArray = ['是aaa', '否bbb'];
        mui.confirm("你确认要删除吗？",function(m){
            if(m.index==1){//确认
                // 发送ajax去删除
                $.ajax({
                    type:"post",
                    url:"/address/deleteAddress",
                    data:{"id":id},
                    success:function(res){
                        if(res.success){// 成功
                            // location.reload();//重新刷新页面
                            $(li).remove();//自杀
                        }
                    }
                })
            }else{//取消
                // 滑动回去 也可以重新刷新页面
                // mui.swipeoutClose(原生的要滑回去的标签)
                mui.swipeoutClose(li)
            }
        })
    })
    // 点击编辑按钮 存储当前的数据  跳转到编辑页面 取这条数据来用
    $("#address-box").on("tap",".edit-btn",function(){
        var id=$(this).attr("data-id"); // 获取当前要编辑的 id
        // address 所有的地址  数组         // 通过id找到 这条地址数据  存在浏览器
        for(var i=0;i<address.length;i++){
            // console.log(address[i]) 是一个对象 里面有id
            if(address[i].id==id){//如果这条数据的id 等于 我要编辑的 id 这条数据就是我想要的
                 // 存起来 一会你在编辑页面，取出来用 // localStorage.setItem(名字,字符串的值)
                localStorage.setItem("editAddress",JSON.stringify(address[i]))
                break;
            }
        }
        location.href="addAddress.html?isEdit=1";   //  跳转到编辑页面 
    })



})