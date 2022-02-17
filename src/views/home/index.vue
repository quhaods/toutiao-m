<template>
  <div class="home-container">
    <!-- 标题搜索框 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
      class="search-btn"
      slot="title"
      type="info"
      size="small"
      round
      icon="search"
      >搜索</van-button>
  </van-nav-bar>

    <!-- 头部导航栏/频道列表 -->
    <van-tabs class="channle-tabs" v-model="active" animated swipeable>
      <van-tab
      v-for="channel in channels"
      :key="channel.id"
      :title="channel.name"
      >
      <article-list :channel="channel"/>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn" @click="isChennelEditShow = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
    <channel-edit
    :my-channels="channels"
    :active="active"
     />
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import ArticleList from '@/views/home/components/article-list.vue'
import ChannelEdit from '@/views/home/components/channel-edit.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 0,
      channels: [],
      isChennelEditShow: false // 控制频道编辑弹出层的显示状态
    }
  },
  components: {
    ArticleList,
    ChannelEdit
  },
  methods: {
    async loadchannels () {
      try {
        const { data } = await getUserChannels()
        this.channels = data.data.channels
        // console.log(data)
        // console.log(data)
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }
  },
  created () {
    this.loadchannels()
  }

}
</script>

<style lang="less" scope>
.home-container{
  padding-top: 174px;
  padding-bottom: 100px;
  .van-tabs {
    position: fixed;
    top:92px;
    z-index: 1;
    left: 0;
    right: 0;

  }
  .van-nav-bar__title{
    max-width: 100%;
  }
  .search-btn{
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  .channle-tabs{
    .van-tabs__wrap{
      height: 82px;
    }
    .van-tab{
      min-width: 200px;
      border-right:1px solid #edeff3;
      font-size: 30px;
      color: #777;
    }
    .van-tab--active{
      color: #333;
    }
    .van-tabs__line{
      // bottom: 8px
      width: 31px;
      height: 6px;
      margin-bottom: 8px;
      background-color: #3296fa;
    }
    .placeholder{
      flex-shrink: 0; //不参与flex空间运算
      width: 66px;
      height: 82px;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      opacity: 0.9;
      background-color: #fff;
      i.toutiao{
        font-size: 33px;
        // color: #333;
        }
      &:before{
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url('~@/assets/gradient-gray-line.png');
        background-size: contain;
      }
    }
  }
}
</style>
