<template>
  <div style="height:100%;">
    <div v-transfer-dom>
     <actionsheet :menus="menus" v-model="showMenu" @on-click-menu="changeLocale"></actionsheet>
   </div>

    <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="55px">
      <x-header
      slot="header"
      :title="title"
      class="header"
      :transition="headerTransition"
      :left-options="leftOptions"
      :right-options="rightOptions"
      @on-click-more="onClickMore"
      ></x-header>

      <transition
      :name="viewTransition" :css="!!direction"
      >
        <router-view class="router-view" style="height:100%;"></router-view>
      </transition>


      <tabbar slot="bottom" v-if="path === '/'">
            <tabbar-item  v-for="(tabbar, index) in tabbars" v-if="tabbar.show" :selected="tabbar.selected" :link="tabbar.link" :key="index">
              <img slot="icon" :src="tabbar.icon">
              <span slot="label">{{ tabbar.title }}</span>
            </tabbar-item>
      </tabbar>
    </view-box>
  </div>
</template>

<script>

import { ViewBox, XHeader, Tabbar, TabbarItem, Actionsheet, TransferDomDirective as TransferDom } from 'vux'
import { mapState, mapAction, mapMutations} from 'vuex'
import tabbars from './config/tabbar.config'

export default {
  name: 'app',
  components: {
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Actionsheet
  },
  directives: {
    TransferDom
  },
  computed: {
    ...mapState({
      route: state => state.route,
      path: state => state.route.path,
      state: state => state,
      title: state => state.title,
      showBack: state => state.showBack,
      showMore: state => state.showMore,
      direction: state => state.direction
    }),
    headerTransition () {
      if (!this.direction) return ''
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    viewTransition () {
      if (!this.direction) return ''
      return 'vux-pop-' + (this.direction === 'forward' ? 'in' : 'out')
    },
    leftOptions () {
      return {
        showBack: this.showBack
      }
    },
    rightOptions () {
      return {
        showMore: this.showMore
      }
    }
  },
  methods: {
    ...mapMutations([
      'SET_LOCALE'
    ]),
    changeLocale (locale) {
      this.$i18n.set(locale);
      this.SET_LOCALE({locale: locale});
      //this.$locale.set(locale)
    },
    onClickMore () {
      this.showMenu = true
    }
  },
  data(){
    return {
      tabbars: tabbars,
      showMenu: false,
      menus: {
        'language.noop': '<span class="menu-title">Language</span>',
        'zh_CN': '中文',
        'en': 'English',
        'zh_HK': '中文繁体(香港)',
        'zh_TW': '中文繁体(臺灣)'
      },
    }
  },
  created () {
    //console.log(this.$i18n.locale())
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

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
