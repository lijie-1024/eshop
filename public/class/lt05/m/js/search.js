$(function(){
    var keyArr=[];//存 搜索过的 关键字
    // 先去浏览器 获取那些存的 关键字
    // console.log(localStorage.getItem("abc"))//长的很像数组的字符串
    if(localStorage.getItem("abc")){//如果有
        keyArr=JSON.parse(localStorage.getItem("abc"));//转化成数组
        // console.log(keyArr);//把这些搜索过的数据 拼接html 显示到页面
        var html=template("historyTpl",{"result":keyArr});
        $("#history-box").html(html)

    }
    //search.html js 点击搜索按钮
    // 获取 填写的 文本框的值
    // 跳转到 search-result.html页面 显示出搜索的所有商品
    $("#search-btn").on("click",function(){
        // 获取 填写的 文本框的值
        var keyword=$(this).siblings().val();
        // alert(keyword)
        if(keyword){//有值
            // 搜索了 把他存到数组里面
            keyArr.unshift(keyword);//unshift 在前面追加 push 在后面追加 pop 删除后面 shift 删除前面
            // console.log(keyArr)
            // 存到 浏览器 下次 取出来 存 要存字符串 形式
            localStorage.setItem("abc",JSON.stringify(keyArr));
            // 跳转到 search-result页面
            alert("开始跳转");
            location.href="search-result.html?keyword="+keyword
        }else{//没有值
            alert('请输入搜索的商品')
        }
    })

    // 清空历史
    $("#clear").on("click",function(){
        // 清空页面html
        $("#history-box").html('');
        // 清空存的数据
        localStorage.removeItem("abc");
        // 清空那个数组 
        keyArr=[];
    })




})