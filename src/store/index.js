import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import { questions } from './questions'

Vue.use(Vuex)
const state = {
  username:'Guest',
  time:30,/*30s*/
  percentage: 100,
  speed: 100 / 30,
  title:'',
  index:0,
  questionIndex:1,
  results: [/*{
    questionId:1,
    question: '1',
    answers: [
      {
        title:'白菜',
        score: 1
      },
      {
        title:'白菜',
        score: 1
      },
      {
        title:'白菜',
        score: 1
      }
    ]
  },
  {
    questionId:2,
    question: '2',
    answers: [
      {
        title:'白菜2',
        score: 2
      },
      {
        title:'白菜2',
        score: 1
      },
      {
        title:'白菜2',
        score: 1
      }
    ]
  },
  {
    questionId:3,
    question: '3',
    answers: [
      {
        title:'白菜3',
        score: 1
      },
      {
        title:'白菜3',
        score: 1
      },
      {
        title:'白菜3',
        score: 1
      }
    ]
  }*/
    /*
    {question
      answers:[{title,score}]
    }
    */
  ],
  questions: questions
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
