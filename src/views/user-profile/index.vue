<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()">
    </van-nav-bar>
    <!-- 导航栏 -->

    <van-cell title="头像" center is-link value="">
      <van-image width="30" height="30" round :src="user.photo" fit="cover" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow = true" />
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男':'女'" />
    <van-cell title="生日" is-link :value="user.birthday" />

    <van-popup v-model="isEditNameShow" position="bottom" :style="{ height: '100%' }">
      <update-name @close="isEditNameShow = false" :name="user.name" @update-name="user.name = $event"></update-name>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from '../user-profile/components/update-name.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName
  },
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false // 编辑用户昵称
    }
  },
  created () {
    // 加载用户数据
    this.loadUserProfile()
  },
  methods: {
    // 加载用户数据
    async loadUserProfile () {
      const { data } = await getUserProfile()
      // console.log(data)
      this.user = data.data
    }
  }
}
</script>

<style lang="less" scope>
.user-profile {
  .van-nav-bar {
    background-color: #3296fa;
    .van-icon {
      color: #fff;
    }
    .van-nav-bar__title {
      color: #fff;
    }
  }
}
.van-popup {
  background-color: #f5f7f9;
}
</style>
