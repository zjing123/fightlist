// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Vuex from 'vuex'
import { AjaxPlugin, ToastPlugin } from 'vux'
import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'
import getRouterTitle from "./router/router.title"
import 'vue-instant/dist/vue-instant.css'
import VueInstant from 'vue-instant'
import config from '@/config/base.config'

//console.log(typeof getRouterTitle)

Vue.use(VueInstant)

Vue.use(VueRouter)
Vue.use(Vuex)

AjaxPlugin.$http.defaults.headers.common['Authorization'] = 'Bearer ' + config.access_token
Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)

sync(store, router)

router.afterEach((to, from) => {
  if(to.path == '/play') {
    store.dispatch('start');
    store.commit('initParams')
  }

  if(to.path == '/') {
    store.commit('disableShowBack')
  } else {
    store.commit('enableShowBack')
  }

  store.commit('setTitle', getRouterTitle(to.name))
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
