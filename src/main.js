// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import Home from './components/Home'
import NewGame from './components/Newgame'
import Sticky from './components/Sticky'
import Game from './components/Game'
import Icon from './components/Icon'
import Header from './components/Header'

Vue.use(VueRouter)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  }
})

const routes = [{
  path: '/',
  component: Home
}, {
  path: '/newgame',
  component: NewGame
}, {
  path: '/sticky',
  component: Sticky
}, {
  path: '/game',
  component: Game
}, {
  path: '/icon',
  component: Icon
}, {
  path: '/header',
  component: Header
}]

const router = new VueRouter({
  routes
})

sync(store, router)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
