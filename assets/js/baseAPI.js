// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 可以免写网址路径的时候，
// 会先调用 ajaxPrefilter 这个函数

$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    // console.log(options.url);

    // 为有权限添加请求头  包含
    if(options.url.indexOf('/my') !== -1){
      options.headers = {
        Authorization: localStorage.getItem('token') || ''
      }
    }


    // 全局complete
    options.complete = function(res) {
      if(res.responseJSON.status === 1 && res.responseJSON.message ==='身份认证失败！'){
        localStorage.removeItem('token')
        location.href ='/login.html'
      }
    }
  })
  