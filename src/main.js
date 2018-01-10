// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import objectAssign from 'object-assign'
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import { AjaxPlugin, ToastPlugin } from 'vux'
import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'
import getRouterTitle from "./router/router.title"
import 'vue-instant/dist/vue-instant.css'
import VueInstant from 'vue-instant'
import config from '@/config/base.config'

Vue.use(VueInstant)

Vue.use(VueRouter)
Vue.use(Vuex)

//同步本地数据
store.dispatch('initData')

/*vuex-i18n begin*/
Vue.use(vuexI18n.plugin, store)
Vue.i18n.set(store.state.locale)

const commonLocales = require('json-loader!yaml-loader!./locales/common.yml')
const vuxLocales = require('json-loader!yaml-loader!./locales/all.yml')
const componentsLocales = require('json-loader!yaml-loader!./locales/components.yml')

const finalLocales = {
  'en': objectAssign(commonLocales['en'], vuxLocales['en'], componentsLocales['en']),
  'zh_CN': objectAssign(commonLocales['zh_CN'], vuxLocales['zh_CN'],componentsLocales['zh_CN']),
  'zh_TW': objectAssign(commonLocales['zh_TW'], vuxLocales['zh_TW'], componentsLocales['zh_TW']),
  'zh_HK': objectAssign(commonLocales['zh_HK'], vuxLocales['zh_HK'], componentsLocales['zh_HK']),
}

for (let i in finalLocales) {
  Vue.i18n.add(i, finalLocales[i])
}
/*vuex-i18n end*/

Vue.use(AjaxPlugin)
Vue.use(ToastPlugin)

sync(store, router)

router.afterEach((to, from) => {
  if(to.path == '/play') {
    store.dispatch('start');
    store.commit('INIT_PARAMS')
  }

  let $disableShowBackPath = ['Home', 'Playresult', 'Login', 'Register'];

  if($disableShowBackPath.indexOf(to.name) !== -1) {
    store.commit('DISABLE_SHOW_BACK')
  } else {
    store.commit('ENABLE_SHOW_BACK')
  }

  if(to.path == '/') {
    store.commit('ENABLE_SHOW_MORE')
  } else {
    store.commit('DISABLE_SHOW_MORE')
  }

  store.commit('SET_TIELE', getRouterTitle(to.name))
})

const history = window.sessionStorage;
history.clear();
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)

router.beforeEach(function(to, from, next) {

    //判断该路由是否需要登录
    if(to.meta.requireAuth) {
        if(store.state.tokens.access_token) {
            next();
        } else {
            next({
              path: '/login',
              query: {redirect: to.fullPath} //将跳转的路由path作为参数,登录成功后跳转到该路由
            });
        }
    } else {
        next();
    }

  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)

  if(toIndex) {
    if(!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      store.commit('UPDATE_DIRECTION', {direction: 'forward'})
    } else {
       store.commit('UPDATE_DIRECTION', { direction: 'reverse' })
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('UPDATE_DIRECTION', {direction: 'forward'})
  }

  if(/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = 'http${url}'
  } else {
    next()
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
