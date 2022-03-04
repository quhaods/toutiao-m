<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar title="个人信息" left-arrow @click-left="$router.back()">
    </van-nav-bar>
    <!-- 导航栏 -->

    <input type="file" hidden accept="image/*" ref="file" @change="onFileChange">

    <van-cell title="头像" center is-link @click="$refs.file.click()">
      <van-image width="30" height="30" round :src="user.photo" fit="cover" />
    </van-cell>
    <van-cell title="昵称" is-link :value="user.name" @click="isEditNameShow = true" />
    <van-cell title="性别" is-link :value="user.gender === 0 ? '男':'女'" @click="isEditGenderShow = true" />
    <van-cell title="生日" is-link :value="user.birthday" @click="isBirthdayShow=true" />

    <!-- 修改用户头像 -->
    <van-popup class="update-photo-popup" v-model="isEditPhotoShow" position="bottom" :style="{ height: '100%' }">
      <update-photo v-if="isEditPhotoShow" :file="previewImage" @close="isEditPhotoShow=false" @update-photo="user.photo = $event"></update-photo>
    </van-popup>
    <!-- /修改用户头像 -->

    <!-- 修改用户名 -->
    <van-popup v-model="isEditNameShow" position="bottom" :style="{ height: '100%' }">

      <!-- 当你传递给子组件的数据既要使用又要修改，例如这里的name 这种情况下我们可以使用v-model 简写 -->

      <!--
        <update-name @close="isEditNameShow = false" :name="user.name" @update-name="user.name = $event">
        </update-name>
        -->

      <!--
        v-model="user.name"
          :value="user.name" 默认传递名字叫value的数据
          @input="user.name = $event" 默认监听 input 事件
       -->

      <!--
         v-model 只能使用一次 如果有多个数据需要同时保持同步， 使用.sync修饰符
         :gender.sync = "user.gender"
         :gender = "user.gender"
         @update:gender = "user.gender = $event"
        -->

      <update-name v-if="isEditNameShow" @close="isEditNameShow = false" v-model="user.name"></update-name>
    </van-popup>
    <!-- /修改用户名 -->

    <!-- 修改用户性别 -->
    <van-popup v-model="isEditGenderShow" position="bottom">
      <update-gender v-model="user.gender" @close="isEditGenderShow= false"></update-gender>
    </van-popup>
    <!-- /修改用户性别 -->

    <!-- 修改生日 -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <update-birthday v-if="isBirthdayShow" v-model="user.birthday" @close="isBirthdayShow= false"></update-birthday>
    </van-popup>
    <!-- /修改生日 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user.js'
import UpdateName from '../user-profile/components/update-name.vue'
import UpdateGender from '../user-profile/components/update-gender.vue'
import UpdateBirthday from '../user-profile/components/update-birthday.vue'
import UpdatePhoto from './components/update-photo.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {}, // 用户数据
      isEditNameShow: false, // 编辑用户昵称
      isEditGenderShow: false, // 编辑用户性别
      isBirthdayShow: false, // 编辑用户生日
      isEditPhotoShow: false, // 编辑用户头像
      previewImage: null // 预览用户头像开关
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
    },
    onFileChange () {
      // 在弹出层里面预览图片
      // const blob = window.URL.createObjectURL(this.$refs.file.files[0])
      const blob = this.$refs.file.files[0]
      this.previewImage = blob
      // console.log(blob)

      // 展示弹出层
      this.isEditPhotoShow = true

      // 为了解决相同文件不触发change事件，所以在这里手动的情况file的value
      this.$refs.file.value = ''
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
.update-photo-popup {
  background-color: #000;
}
</style>
