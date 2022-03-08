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
import io from 'socket.io-client'

// 建立链接
const socket = io('http://ttapi.research.itcast.cn/app/socket.io/')

// 链接建立成功了
socket.on('connect', function () {
  console.log('链接建立成功了')
})

// 触发了某个事件
// socket.on('event', function (data) {
//   console.log('触发了某个事件')
// })

socket.on('disconnect', function () {
  console.log('断开链接了')
})

// 发送消息
// socket.emit('消息类型',消息内容)
// 接收消息
// socket.on('消息类型',function(data){data消息})
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
