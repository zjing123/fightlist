import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NewGame from '@/components/Newgame'
import Sticky from '@/components/Sticky'
import Game from '@/components/Game'
import Icon from '@/components/Icon'
import Header from '@/components/Header'
import Play from '@/components/Play'

Vue.use(Router)

export default new Router({
  routes: [{
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
  }, {
    path: '/play',
    component: Play
  }]
})
