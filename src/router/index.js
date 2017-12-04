import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import NewGame from '@/pages/Newgame'
import Sticky from '@/pages/Sticky'
import Game from '@/pages/Game'
import Icon from '@/pages/Icon'
import Header from '@/pages/Header'
import Play from '@/pages/Play'
import Result from '@/pages/Result'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'Home',
    path: '/',
    component: Home
  }, {
    name: 'NewGame',
    path: '/newgame',
    component: NewGame
  }, {
    name: 'Sticky',
    path: '/sticky',
    component: Sticky
  }, {
    name: 'Game',
    path: '/game',
    component: Game
  }, {
    name: 'Icon',
    path: '/icon',
    component: Icon
  }, {
    name: 'Header',
    path: '/header',
    component: Header
  }, {
    name: 'Play',
    path: '/play',
    component: Play
  }, {
    name: 'result',
    path: '/result/:dataId',
    component: Result
  }]
})
