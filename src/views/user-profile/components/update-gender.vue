<template>
  <div class="update-gender">
    <van-picker show-toolbar :columns="columns" @cancel="$emit('close')" @confirm="onConfirm" :default-index="defaultIndex" @change="onGenderChange" />
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
export default {
  name: 'UpdateGender',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      defaultIndex: this.value
    }
  },
  methods: {
    onGenderChange (picker, value, index) {
      console.log(picker)
      console.log(value)
      console.log(index)
      this.defaultIndex = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true // 禁止背景点击
      })
      // 请求提交更新用户性别
      await getUserProfile({
        gender: this.defaultIndex
      })
      this.$emit('input', this.defaultIndex)
      this.$emit('close')

      this.$toast.success('保存成功')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
