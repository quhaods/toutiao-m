<template>
  <div class="update-birthday">
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @cancel="$emit('close')" @confirm="onConfirm" />
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(2022, 1, 1),
      currentDate: new Date(this.value)
      // userBirthday: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true // 禁止北京点击
      })
      // 请求提交更新用户生日
      const date = dayjs(this.currentDate).format('YYYY-MM-DD')

      await getUserProfile({
        birthday: date
      })
      // 更新父组件中的用户生日
      this.$emit('input', date)

      // 关闭弹出层
      this.$emit('close')

      this.$toast.success('保存成功')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
