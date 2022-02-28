<template>
  <div class="updata-name">
    <van-nav-bar class="nav-bar" title="修改昵称" left-text="取消" right-text="完成" @click-left="$emit('close')" @click-right="onConfirm">
    </van-nav-bar>
    <div class="field-margin">
      <van-field v-model="localName" rows="1" autosize type="textarea" maxlength="7" placeholder="请输入昵称" show-word-limit />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '../../../api/user'
export default {
  name: 'UpdateName',
  props: {
    // 声明接收父组件v-model 传递的 value 数据
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidclick: true // 禁止背景点击
      })
      try {
        // 请求提交更新用户昵称
        await updateUserProfile({
          name: this.localName
        })
        this.$toast.success('保存成功')
        // 更新成功-> 修改父组件的name -> 关闭弹出层
        // 发布input 事件，更新父组件 v-model绑定的数据
        this.$emit('input', this.localName)
        this.$emit('close')
      } catch (err) {
        if (err && err.response && err.response.status === 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    }
  },
  data () {
    return {
      localName: this.value
    }
  }
}
</script>

<style lang="less" scoped>
.updata-name {
  .nav-bar {
    background-color: #fff;
    /deep/ .van-nav-bar__title {
      color: #323233;
    }
  }
  .field-margin {
    padding: 20px;
  }
}
</style>
