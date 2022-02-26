<template>
  <div class="search-container">
    <!-- 搜索栏 -->
    <form action="/" class="search-form">
      <van-search v-model="searchText" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" @focus="isResultShow=false" background="#3296fa" />
    </form>
    <!-- /搜索栏 -->

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :search-text="searchText" />
    <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion v-else-if="searchText" :search-text="searchText" @search="onSearch" />
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <search-history v-else :searchHistories="searchHistories" @search="onSearch" />
    <!-- /搜索历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchResult from './components/search-result.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import { setItem, getItem } from '../../utils/storage'
import { mapState } from 'vuex'
import { getUserSearchHistories } from '../../api/search'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  data () {
    return {
      searchText: '', // 搜索输入框的内容
      isResultShow: false, // 控制搜索结果的显示状态
      searchHistories: getItem('search-histories') || [] // 搜索历史
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadSearchHistories()
  },
  methods: {
    onSearch (val) {
      // console.log(val)
      // 把输入框设置为你要搜索的文本
      this.searchText = val

      // indexOf 方法 形参提供数组中的项目 返回索引值 没有的话返回-1
      const index = this.searchHistories.indexOf(this.searchText)
      if (index !== -1) {
        // 把重复项目删除
        this.searchHistories.splice(index, 1)
      }
      // 记录搜索历史记录
      // unshift每次添加都放在最顶部
      // 把最新的搜索历史记录放到顶部
      this.searchHistories.unshift(val)

      // 如果用户已登录，则把搜索历史记录存储到线上
      //      提示：只要我们调用获取搜索结果的数据接口，后端会给我们自动存 储用户的搜索历史记录
      // 如果没有登录页，则把搜索历史记录储存到本地
      setItem('search-histories', this.searchHistories)
      // 展示搜索结果
      this.isResultShow = true
    },
    onCancel () {
      // Toast('取消')
      // console.log('onCancel')
      this.$router.back()
    },
    async loadSearchHistories () {
      // 因为后端帮我们储存的用户搜索历史记录太少了 （只有4条）
      // 所以我们这里让后端返回的历史记录和本地的历史记录合并到一起
      // 如果用户已经登录
      let searchHistories = getItem('search-histories') || []
      if (this.user) {
        const { data } = await getUserSearchHistories()
        // console.log(data.data.keywords)
        // 合并数组 ：[...数组，...数组]
        // Set 是 es6 新增的数据类型，可数据去重
        // 把Set转为数组：[...Set对象]
        searchHistories = [
          ...new Set([...searchHistories, ...data.data.keywords])
        ]
      }
      // console.log(searchHistories)

      this.searchHistories = searchHistories
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
