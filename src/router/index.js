import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import NewGame from '@/pages/Newgame'
import Game from '@/pages/Game'
import Play from '@/pages/Play'
import Playresult from '@/pages/Playresult'
import Result from '@/pages/Result'
import Test from '@/pages/Test'
import Login from '@/pages/Login'
import Register from '@/pages/Register'

Vue.use(Router)

export default new Router({
    routes: [{
        name: 'Home',
        path: '/',
        component: Home,
        meta: {
            requireAuth: true,
        }
    }, {
        name: 'NewGame',
        path: '/newgame',
        component: NewGame,
        meta: {
            requireAuth: true,
        }
    }, {
      name: 'Game',
      path: '/game/:type',
      component: Game,
        meta: {
            requireAuth: true,
        }
    }, {
        name: 'Play',
        path: '/play',
        component: Play,
        meta: {
            requireAuth: true,
        }
    }, {
        name: 'Playresult',
        path: '/playresult',
        component: Playresult,
        meta: {
            requireAuth: true,
        }
    }, {
        name: 'Result',
        path: '/result/:dataId',
        component: Result,
        meta: {
            requireAuth: true,
        }
    }, {
        name: 'Login',
        path: '/login',
        component: Login
    }, {
      name: 'Register',
      path: '/register',
      component: Register
    }]
})
