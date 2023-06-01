$(function() {
    var layer = layui.layer
    // 发起ajax请求数据
    initArtCateList()

    // 获取文章分类的列表
   function initArtCateList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr)
        }
    })
   }

    // 为添加类别绑定点击事件
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            title: '添加文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
          }); 
    })

    // 通过代理的形式为form-add表单绑定submit事件
    $('body').on('submit', '#form-add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败')
                }
                layer.msg('新增分类成功')
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })

    var form = layui.form
    // 通过代理的形式为btn-edit按钮绑定点击事件
    var indexEdit = null
    $('body').on('click', '.btn-edit', function() {
        indexEdit = layer.open({
            title: '修改文章分类',
            type: 1,
            area: ['500px', '250px'],
            content: $('#dialog-edit').html()
          }); 

        var id = $('this').attr('data-id')

        $.ajax({
            method: 'GET',
            url: '/my/article/cates/'+ id,
            success: function(res) {
                form.val('form-edit', res.data)
            }
        })
    })

    // 通过代理的形式为修改分类的表单绑定submit事件
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialze(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败')
                }
                layer.msg('更新分类数据成功')
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })

    // 通过代理的形式为删除按钮绑定点击事件
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if(res.status !== 0) {
                        return layer.msg('删除分类失败')
                    }
                    initArtCateList()
                }
            })
            layer.close(index);
          });
    })
})