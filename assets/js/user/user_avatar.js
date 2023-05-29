var layer = layui.layer
// 1.1获取裁剪区域的DOM元素
var $image = $('#image')
// 1.2配置选项
const options = {
    aspectRatio: 1,
    preview: '.img-preview'
}
// 1.3创建裁剪区域
$image.cropper(options)

$('#btnChooseImage').on('click', function() {
    $('#file').click()
})

$('#file').on('change', function(e) {
    // console.log(e)
    var filist = e.target.files
    if (filist.length === 0) {
        return layer.msg('请选择图片')
    }
    var files = e.target.files[0]
    var imageURL = URL.createObjectURL(files)
    $image
    .cropper('destroy')
    .attr('src', imageURL)
    .cropper(options)
})

// 为确定按钮绑定点击事件
$('#btnChooseImage').on('click', function() {
    var dataURL = $image
    .cropper('getCroppedCanvas', {
        // 创建Canvas画布
        width: 100,
        height: 100
    })
    .toDataURL('image/png')
    $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: dataURL,
        success: function(res) {
            if (res.status !==0) {
                return layer.msg('更新头像失败')
            }
            layer.msg('更新头像成功')
            window.parent.getUserInfo()
        }
    })
})