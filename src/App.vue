<template>
  <div style="height:100%;">
    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
      <x-header slot="header" :title="title" class="header" :left-options="{showBack: showBack}"></x-header>
      <router-view class="router-view" style="height:100%;"></router-view>
      <tabbar slot="bottom" v-show="path === '/'">
            <tabbar-item  v-for="(tabbar, index) in tabbars" v-if="tabbar.show" :selected="tabbar.selected" :link="tabbar.link" :key="index">
              <img slot="icon" :src="tabbar.icon">
              <span slot="label">{{ tabbar.title }}</span>
            </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>

import { ViewBox, XHeader, Tabbar, TabbarItem } from 'vux'
import { mapState, mapAction} from 'vuex'
import tabbars from './config/tabbar.config'

export default {
  name: 'app',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      state: state => state,
      title: state => state.title,
      showBack: state => state.showBack
    })
  },
  methods: {
  },
  data(){
    return {
      tabbars: tabbars
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
@import '~vux/src/styles/close.less';
@import './assets/css/vue-instant-search-custom.css';

html, body {
  height: 100%;
  width:100%;
  overflow-x:hidden;
}

body {
  background-color: #02a2d1;
}

.header {
  background-color: #0c7dad;
  width:100%;
  position:absolute !important;
  left:0;
  top:0;
  z-index:100;
}

.router-view {
  width: 100%;
  top: 46px;
}
</style>
