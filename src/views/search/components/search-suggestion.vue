<template>
  <div class="search-suggestion">
    <van-cell :title="text" icon="search" v-for="(text,index) in suggestions" :key="index"></van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search.js'
export default {
  name: 'SearchSuggestion',
  data () {
    return {
      suggestions: []
    }
  },
  props: {
    SearchText: {
      type: String,
      required: true
    }
  },
  watch: {
    SearchText: {
      // 当searchText 发生改变的时候就会调用handler函数
      // 注意：handler 函数名称是固定的
      handler (val) {
        // console.log(val)
        this.loadSearchSuggestions(val)
      },
      // 该回调将在侦听开始之后立即被调用
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options
      } catch (error) {
        this.$toast('数据获取失败，请稍后重试')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
