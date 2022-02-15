import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

const TONKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（token等数据）
    user: getItem(TONKEN_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止之刷新丢失，我们需要把数据备份到本地存储
      setItem(TONKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
