import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import NewGame from '@/pages/Newgame'
import Sticky from '@/pages/Sticky'
import Game from '@/pages/Game'
import Icon from '@/pages/Icon'
import Header from '@/pages/Header'
import Play from '@/pages/Play'
import Playresult from '@/pages/Playresult'
import Result from '@/pages/Result'
import Test from '@/pages/Test'
import Index from '@/pages/Index'

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
    name: 'Playresult',
    path: '/playresult',
    component: Playresult
  }, {
    name: 'Result',
    path: '/result/:dataId',
    component: Result
  }, {
    name: 'Test',
    path: '/test',
    component: Test
  }, {
    name: 'Index',
    path: '/index',
    component: Index
  }]
})
