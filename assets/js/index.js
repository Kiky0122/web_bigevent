// 退出登录
$(function() {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()
    var layer = layui.layer
        // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function() {
        console.log('ok');
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //用户退出后需要
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
                // 2. 重新跳转到登录页面
            location.href = '/login.html'
                // location.href = '/login.html'
                // 关闭 confirm 询问框
            layer.close(index)
        })
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        // headers 请求头用户获取用户信息
        url: '/my/userinfo',
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        // 成功失败都回调  放入baseAPI
        //  complete: function(res){
        //     // console.log('执行了回调');
        //     console.log(res);
        //   if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //     console.log('失败');
        //     localStorage.removeItem('token')
        //     location.href ='/login.html'
        //   }
        //  }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1. 获取用户的名称 用户有管理员昵称和用户昵称
    var name = user.nickname || user.username
        // 2. 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)

    // 3. 按需渲染用户的头像,有无头像，否则默认头像
    if (user.user_pic !== null) {
        // 3.1 渲染图片头像
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar')
            .hide()
    } else {
        console.log('更换头像');
        $('.layui-nav-img')
            .hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}