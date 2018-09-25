$(function() {
  $("#login-btn").on("click", function() {
    console.log(111);
    var username = $("input[name='username']").val();
    var password = $("input[name='password']").val();
    if (!username) {
      alert("输入用户名");
      return;
    }
    if (!password) {
      alert("输入密码");
      return;
    }
    $.ajax({
        url:"/employee/employeeLogin",
        type:"post",
        data:{
            username : username,
            password : password
        },
        success:function(res){
            // console.log(res);
            if(res.success){
                location.href = "user.html"
            }else{
                alert(res.message);
            }
        }
    })
  });
});
