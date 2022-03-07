<template>
  <div class="user-chat">
    <!-- 导航栏 -->
    <van-nav-bar class="xiaozhi-bar" title="小智同学" left-arrow @click-left="$router.back()">
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 消息列表 -->
    <van-cell-group class="message-list">
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
      <van-cell title="单元格" />
    </van-cell-group>
    <!-- /消息列表 -->

    <!-- 输入框 -->
    <van-cell-group class="send-message-wrap">
      <van-field v-model="message" placeholder="请输入消息" :border="false" />
      <van-button class="message-button" size="small" type="primary">发送</van-button>
    </van-cell-group>
    <!-- /输入框 -->
  </div>
</template>

<script>
export default {
  name: 'UserChat',
  data () {
    return {
      message: ''
    }
  }
}
</script>

<style lang="less" scoped>
.user-chat {
  background-color: #ededed;
  .message-list {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow: auto;
  }
  .send-message-wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    padding: 0px 14px;
    align-items: center;
    .message-button {
      width: 100px;
    }
  }
}
</style>
