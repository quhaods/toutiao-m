<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button class="edit-btn" type="danger" plain round size="mini">编辑</van-button>
    </van-cell>
    <van-grid class="my-grid" :gutter="10" :border="false">
      <van-grid-item class="grid-item" v-for="(channel, index) in myChannels" :key="index" icon="clear">
        <!--
        v-bind:class 语法
        一个对象，对象中的key表示要作用的CSS类名
        对象中value 要计算出布尔值
        true. 则作用该类名
        false. 不作用类名
       -->
        <span class="text" :class="{ active: index === active}" slot="text">
          {{channel.name}}
        </span>
      </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->

    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid class="recommend-grid" :gutter="10" :border="false">
      <van-grid-item class="grid-item" v-for="(channel, index) in recommendChannels" :key="index" :text="channel.name" icon="plus" />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels } from '../../../api/channel'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: []
    }
  },
  components: {},
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  computed: {
    recommendChannels () {
      const channels = []
      this.allChannels.forEach((channel) => {
        // find 遍历数组，找到满足条件的元素项
        const ret = this.myChannels.find((myChannel) => {
          return myChannel.id === channel.id
        })

        // 如果我的频道中不包含该频道，则收集到推荐频道中
        if (!ret) {
          channels.push(channel)
        }
      })
      // 把计算结果返回
      return channels
    }
  },
  created () {
    this.loadAllChannels()
  }
}
</script>

<style lang="less" scope>
.channel-edit {
  padding: 80px 0;
  .van-cell {
    align-items: center;
  }
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      // font-size: 28px;
      // color: #222;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
      }
      .active {
        color: red;
      }
    }
  }
  .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: 10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
      .van-grid-item__text {
        margin-bottom: 12px;
      }
    }
  }
  .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        // display: flex;
        flex-direction: row;
        // align-items: center;
        .van-icon {
          font-size: 28px;
          margin-right: 6px;
        }
        .van-grid-item__text {
          margin-top: 0;
        }
      }
    }
  }
  // .van-button--mini{
  //   padding: 5px 20px;
  // }
}
</style>
