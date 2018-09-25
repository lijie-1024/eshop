 // getParamsByUrl(location.href,"isEdit")
    // 获取参数
function getParamsByUrl(url,name){
    var index=url.indexOf('?')+1;
    var params=url.substr(index);// keyword=lv&name=zs&age=18
    var arr=params.split("&");// ["keyword=lv", "name=zs", "age=18"]
    for(var i=0;i<arr.length;i++){
        var current=arr[i].split("=");//["keyword", "lv"]
        if(current[0]==name){
            return current[1];
        }
    }
    return null;
}
$(function(){

    $("body").on("tap","a",function(){
        // 跳转到对应页面
        // location.href  这个可以 但是现在mui里面也有对应的跳转方法 我们可以用他
        // mui框架有的一个跳转到对应页面的方法
        mui.openWindow({
            url:$(this).attr("href")  //跳转的地址
        })
        
    })
   
})