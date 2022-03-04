<template>
  <div class="update-photo">
    <img class="image" :src="image" ref="image">
    <van-nav-bar class="toolvar" left-text="取消" right-text="确认" @click-left="$emit('close')" @click-right="onConfirm" />
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { updateUserPhoto } from '@/api/user.js'
export default {
  name: 'UpdatePhoto',
  props: {
    file: {
      type: File,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      cropper: null // 裁切器实例
    }
  },
  mounted () {
    // 获取需要裁切的图片 DOM
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      viewMode: 1, // 常开模式
      dragMode: 'move', // 移动模式
      aspectRatio: 1,
      // autoCropArea: 1, //自动区域
      cropBoxMovable: false, // 裁切框拖动
      cropBoxResizable: false, // 裁切框改变大小
      background: false, // 背景颜色有默认
      movable: true // 图片能否移动
    })
  },
  methods: {
    getCroppedCanvas () {
      return new Promise((resolve) => {
        this.cropper.getCroppedCanvas().toBlob((file) => {
          resolve(file)
        })
      })
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true,
        duration: 0 // 展示时间 0表示持续展示
      })
      // const fd = new FormData()
      // fd.append('photo', this.file)
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      // console.log('onConfirm')
      // 如果要求Content-Type 是multipart/farm-data，则一定要提交FormData数据对象，专门用于文件上传的，不能提交{}，没用

      await updateUserPhoto(fd)

      // 更新父组件中的用户头像
      this.$emit('update-photo', window.URL.createObjectURL(file))
      // 关闭弹出层
      this.$emit('close')
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style lang="less" scoped>
.update-photo {
  .toolvar {
    background-color: #000;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .image {
    display: block;

    /* This rule is very important, please don't ignore this */
    max-width: 100%;
  }
}
</style>
