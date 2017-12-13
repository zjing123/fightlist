import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import { questions } from './questions'

Vue.use(Vuex)
const state = {
  username: 'Guest',
  time: 10,/*30s*/
  percentage: 100,
  speed: 100 / 10,
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
  questions: questions,
  questionGroup:null,
  fight_id:null,
  showBack: true
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
