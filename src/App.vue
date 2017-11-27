<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="40px" body-padding-bottom="55px">
      <x-header slot="header" :title="title"></x-header>
      <router-view></router-view>
    </view-box>
  </div>
</template>

<script>
import { ViewBox, XHeader } from 'vux'
export default {
  name: 'app',
  components: {
    ViewBox,
    XHeader
  },
  computed: {
    title() {
      return 'Demo';
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
</style>
