// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'

Vue.use(VueRouter)
Vue.use(Vuex)

sync(store, router)

router.afterEach((to, from) => {
  if(to.path == '/play') {
    store.dispatch('start');
  }

  if(to.path == '/game') {
    store.commit('initParams')
  }
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
