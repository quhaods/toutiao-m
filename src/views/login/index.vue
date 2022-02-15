<template>
  <div class="login-container">
  <!-- 标题 -->
  <van-nav-bar
  class="page-nav-bar"
  title="登录"
  >
    <van-icon name="cross" slot="left" @click="$router.back()"/>
  </van-nav-bar>
  <!-- 标题 -->

<!-- From表单 -->
<!--
  表单验证：
  1、给van-field组件配置rules验证规则
  参考文档http://vant-contrib.gitee.io/vant/#/zh-CN/form#rule-shu-ju-jie-gou
  2、当表单提交的时候会自动触发表单验证
  如果验证通过，会触发 submit事件
  如果验证失败，不会触发 submit事件 -->
<van-form ref="loginFrom" @submit="onSubmit">
  <van-field
    v-model ="user.mobile"
    name="mobile"
    placeholder="请输入手机号"
    :rules="userForRules.mobile"
    type="number"
    maxlength="11"
    >
    <i slot="left-icon" class="toutiao toutiao-shouji"></i>
  </van-field>
  <van-field
    v-model="user.code"
    name="code"
    placeholder="请输入验证码"
    :rules="userForRules.code"
    type="number"
    maxlength="6"
    >
    <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
    <template #button>
      <!-- 倒计时时间 -->
      <van-count-down
      v-if="isCountDownShow"
      :time="1000*60"
      format="ss 秒"
      @finish="isCountDownShow=false"/>
      <van-button
       class="send-sms-btn" round size="small" type="default" native-type="button" v-else
      @click="onSendSms"
      >发送验证码</van-button>
    </template>
  </van-field>
  <div class="login-btn">
    <van-button  block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
<!-- From表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: ''// 验证码
      },
      userForRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          }, {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式有误'
          }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false // 是否展视倒计时
    }
  },
  methods: {
    async onSubmit () {
      // 1.获取表单数据
      const user = this.user
      // 2.表单验证

      // 在组件中使用需要加this.$
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      // 3.提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')

        // 登录成功，跳转回原来页面
        // back方式不严谨
        this.$router.back()
      } catch (err) {
        if (err.response.statue === 400) {
          console.log('手机号或验证码错误')
          this.$toast.fail('手机号或验证码错误')
        } else {
          console.log('登录失败，请稍后重试', err)
          this.$toast.fail('登录失败，请稍后重试')
        }
      }
    },
    // 4.根据请求的响应结果处理后续操作
    async onSendSms () {
      console.log(this.onSendSms)
      // 1.校验手机号
      try {
        await this.$refs.loginFrom.validate('mobile')
        console.log('验证通过')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        // 发送失败关闭倒计时
        this.isCountDownShow = false
        if (err.response.statue === 429) {
          this.$toast('发送的太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container{
  .toutiao{
    font-size: 37px;
  }
  /deep/.send-sms-btn{
    height: 46px;
    width: 160px;
    background-color: #ededed;
    font-size: 22px;
    line-height: 46px;
  }
  .login-btn{
    margin: 53px 28px;
    .van-button{
      background-color: #6db4fb;
      border: none;
      .van-button__text{
        font-size: 30px;
        color: #ffffff;
      }
    }

  }
}
</style>
