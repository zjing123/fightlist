import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import NewGame from '@/pages/Newgame'
import Game from '@/pages/Game'
import Play from '@/pages/Play'
import Playresult from '@/pages/Playresult'
import Result from '@/pages/Result'
import Test from '@/pages/Test'

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
    name: 'Game',
    path: '/game',
    component: Game
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
  }]
})
