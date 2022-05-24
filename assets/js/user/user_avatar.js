  $(function() {

      var layer = layui.layer
          // 1.1 获取裁剪区域的 DOM 元素
      var $image = $('#image')
      const options = {
          aspectRatio: 1, // 裁剪框纵横比
          preview: '.img-preview' // 指定预览区域
      }

      // 1.3 创建裁剪区域
      $image.cropper(options)

      //   绑定上传头像点击事件
      $('#btnChooseImage').on('click', function() {
          $('#file').click()
      })

      // 判断用户是否选文件
      $('#file').on('change', function(e) {
          //获取用户选择的文件
          var filelist = e.target.files
          if (filelist.length === 0) {
              return layer.msg('请选择你的照片')
          }
          var file = e.target.files[0]
          var newImgURL = URL.createObjectURL(file)
          $image
              .cropper('destroy') // 销毁旧的裁剪区域
              .attr('src', newImgURL) // 重新设置图片路径
              .cropper(options) // 重新初始化裁剪区域
      })

      //确定按钮
      $('#btnUpload').on('click', function() {
          // 1.拿到用户裁剪之后的文档
          var dataURL = $image
              .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                  width: 100,
                  height: 100
              })
              .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

          alert(1)
              //   2.把头像上传到服务器
          $.ajax({
              method: 'POST',
              url: '/my/update/avatar',
              data: {
                  avatar: dataURL
              },
              success: function(res) {
                  if (res.status !== 0) {
                      return layer.msg('更换头像失败')
                  }
                  layer.msg('更换头像成功')
                      // 重新渲染页面
                  window.parent.getUserInfo()

              }
          })



      })


  })