$(function() {
    getUserInfo()
})

var layer = layui.layer
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            renderAvatar(res.data)
        }
    })
}

// 渲染用户的头像
function renderAvatar(user) {
    // 1.获取用户的名称
    var name = user.nickname || user.username;
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        $('#layui-nav-img').attr('src', user.user_pic).show()
        $('#text-avata').hide()
    } else {
        $('#layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('#text-avata').html(first).show()
    }
}

// 点击按钮实现退出功能
$('#btnLogout').on('click', function() {
    layer.confirm('is not?', {icon: 3, title:'提示'}, function(index){
        //do something
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index);
      });
})