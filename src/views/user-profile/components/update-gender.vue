<template>
  <div class="update-gender">
    <van-picker show-toolbar :columns="columns" @cancel="$emit('close')" @confirm="onConfirm" />
  </div>
</template>

<script>
export default {
  name: 'UpdateGender',
  data () {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    onConfirm (value) {
      console.log('onConfirm')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
