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
  title:'',
  threads: {
    /*
    id: {
      id,
      name,
      messages: [...ids],
      lastMessage
    }
    */
  },
  questions: questions
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
