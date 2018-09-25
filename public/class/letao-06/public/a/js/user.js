$(function(){
// 页面一打开 就发送ajax 获取所有用户数据 显示到页面上
$.ajax({
    type:"get",
    url:"/user/queryUser",
    data:{page:1,pageSize:10},
    success:function(res){
        console.log(res);
        var html=template("userTpl",res);
        $("tbody").html(html);
    }
})
// 点击 按钮 启用变禁用 禁用变启用 
$("#user-box").on("click",".edit-btn",function(){
    // 获取id
    var id=$(this).attr("data-id");
    //获取isDelete 
    var isDelete=$(this).attr("data-isdelete");
    // 发送ajax去修改
    $.ajax({
        type:"post",
        url:"/user/updateUser",
        data:{
            // isDelete 0 变1 1变0
            isDelete:isDelete==1?0:1,
            id:id
        },
        success:function(res){
            if(res.success){
                location.reload();
            }
        }
    })
})

})