<template>
  <scroll class="wrapper" :data="data" :pulldown="pulldown" @pulldown="loadData">
    <ul class="content">
      <li v-for="item in data">{{item}}</li>
    </ul>
    <div class="loading-wrapper"></div>
  </scroll>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      data: [],
      pulldown: true
    }
  },
  created() {
    this.loadData()
  },
  methods: {
    loadData() {
      requestData().then((res) => {
        this.data = res.data.concat(this.data) })
      }
    }
  }
</script>
