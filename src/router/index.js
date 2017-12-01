import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import NewGame from '@/components/Newgame'
import Sticky from '@/components/Sticky'
import Game from '@/components/Game'
import Icon from '@/components/Icon'
import Header from '@/components/Header'
import Play from '@/components/Play'
import Result from '@/components/Result'

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
