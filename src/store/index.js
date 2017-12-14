import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import { questions } from './questions'
import config from '@/config/base.config'

Vue.use(Vuex)
const state = {
  username: 'Guest',
  time: config.time,/*30s*/
  percentage: config.percentage,
  speed: config.percentage / config.time,
  title: '',
  index: 0,
  usedIndexes:[], /**回答过的问题id*/
  currentResults:[],
  results: [
    // {
    //   score: 10,
    //   results: [{
    //     questionId:1,
    //     question: '1',
    //     answers:[{
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     }]
    //   }, {
    //     questionId:2,
    //     question: '2',
    //     answers:[{
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     }]
    //   },{
    //     questionId:3,
    //     question: '3',
    //     answers:[{
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     }]
    //   }]
    // },
    // {
    //   score: 10,
    //   results: [{
    //     questionId:1,
    //     question: 1,
    //     answers:[{
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     }]
    //   }, {
    //     questionId:2,
    //     question: 1,
    //     answers:[{
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     }]
    //   },{
    //     questionId:3,
    //     question: 1,
    //     answers:[{
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     },
    //     {
    //       title:'白菜',
    //       score: 1
    //     }]
    //   }]
    // }
  ],
  completed: false,
  questions: questions,
  questionGroup:null,
  fight_id:null,
  showBack: true,
  isLoading: false,
  direction: 'forward'
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
