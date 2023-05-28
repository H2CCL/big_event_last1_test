$(function() {
    $('#link_reg').on('click', function() {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#link_login').on('click', function() {
        $('.login_box').show()
        $('.reg_box').hide()
    })

    var layer = layui.layer
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            var pwd = $('.reg_box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        var data = {username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()}
        $.post('/api/reguser', data, function(res) {
            if(res.status !== 0) {
                return layer.msg(res.message)
            }
            return layer.msg('注册成功请登录')

            $('#link_login').click();
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})