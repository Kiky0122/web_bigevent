$(function() {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function(value) {
            if (value.lengeh > 6) {
                return '长度必须在1-6个字符之间'
            }
        }
    })
    initUserInfo()
        // 初始化用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息失败！')
                }
                console.log(res);
                // 调用layui表单赋值进行绑定表单进行赋值
                form.val('formUserInfo', res.data)
            }
        })
    }

    // 表单重置按钮 阻止默认提交，重新调用ajax获取信息渲染初始数据
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    // 监听表单的ajax提交修改事件  
    $('.layui-form').on('click', function(e) {
        e.preventDefault()
            // 发起ajax请求
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(), //获取表单填写的val
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败!')
                }
                layer.msg('更新用户信息成功！')
                    // 成功之后把信息渲染到父页面index，window当前窗口,调用父index.js的渲染函数
                window.parent.getUserInfo()
            }
        })
    })


})