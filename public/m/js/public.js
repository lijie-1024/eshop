$(function () {
  $('body').on('tap', 'a', function () {
    // 跳转对应页面
    mui.openWindow({
      // 跳转地址
      url: $(this).attr('href')
    });
  });

});
function getParamsByUrl(url, name) {
  var index = url.indexOf('?') + 1;
  var params = url.substr(index);
  // console.log(params);
  var arr = params.split('&');
  for (var i = 0; i < arr.length; i++) {
    // console.log(arr[i].split('='));
    var current = arr[i].split('=');
    if (current[0] == name) {
      return current[1];
    };
  };
  return null;
};