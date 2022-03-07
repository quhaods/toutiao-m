  <template>
  <div class="my-container">
    <!-- 已登录头部 -->
    <div class="header user-info" v-if="user">
      <!-- 基础信息 -->
      <div class="base-info">
        <div class="left">
          <van-image class="avatar" round fit="cover" src="userInfo.photo" />
          <span class="name">{{ userInfo.name }}</span>

        </div>
        <div class="right">
          <van-button size="mini" round to="/user/profile/">编辑资料</van-button>
        </div>
      </div>
      <!-- 数据状态 -->
      <div class="data-stats">
        <div class="data-item">
          <div class="count">{{ userInfo.art_count }}</div>
          <div class="text">头条</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.art_count }}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.fans_count }}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.like_count }}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>

    <!-- 未登录头部 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="">
        <span class="text">登录 / 注册</span>
      </div>
    </div>

    <!-- 方格导航 -->
    <van-grid class="grid-nav mb-9" :column-num="2" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi1"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>

    <van-cell title="消息通知" is-link />
    <van-cell class="mb-9" title="小智同学" is-link to="/user/chat" />
    <van-cell class="logout-cell" title="退出登录" v-if="user" @click="onLogout" clickable />

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'

export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  methods: {
    onLogout () {
      // 退出提示
      this.$dialog
        .confirm({
          title: '确认退出吗'
          // message: '弹窗内容'
        })
        .then(() => {
          // on confirm
          // console.log('确认执行这里')
          // 确认退出：清除登录状态（容器中的user + 本地存储中的user）
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
          console.log('取消执行这里')
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        // console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    }
  },
  created () {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scope>
.my-container {
  .header {
    height: 361px;
    background: url('~@/assets/banner.png');
    background-size: cover;
  }
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
      }
      span {
        padding-top: 15px;
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 231px;
      // background-color: salmon;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin-left: 23px;
        }
      }
    }
    .data-stats {
      // height: 130px;
      // background-color: #ccc;
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi1 {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .mb-9 {
    margin-bottom: 9px;
  }
  .logout-cell {
    font-size: 30px;
    color: #d86262;
    text-align: center;
  }
}
</style>
