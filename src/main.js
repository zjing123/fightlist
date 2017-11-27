// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Home'
import Hello from './components/HelloWorld'
import Tabbar from './components/Tabbar'
import Button from './components/Button'
import Icon from './components/Icon'
import Header from './components/Header'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home
}, {
  path: '/hello',
  component: Hello
}, {
  path: '/tabbar',
  component: Tabbar
}, {
  path: '/button',
  component: Button
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

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
