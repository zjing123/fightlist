import { getStore, removeStore, multipleRemoveStore } from '@/tools/utils'
import * as types from '../store/mutation-types'

export const incrementAsync = ({ commit }) => {
  setTimeout(() => {
    commit('increment')
  }, 1000)
}

let timerId;
export const start = ({ commit, state })=> {
    timerId = setInterval(function() {

    if(state.time > 0) {
      commit(types.START)
    } else {
       clearInterval(timerId);
    }
  }, 1000)
}

export const initData = ({ commit, state }) => {
    console.log(state)
    if(getStore('userinfo')) {
        commit(types.RECORD_USERINFO, getStore('userinfo'));
    }

    if(getStore('tokens')) {
        commit(types.SET_ACCESS_TOKENS, getStore('tokens'));
    }

    if(getStore('questions_data')) {
        //commit(types.RECORD_QUESTIONS, getStore('question_data'));
    }

    if(getStore('currentResults')) {
        //commit(types.RECORD_CURRENT_RESULTS, getStore('currentResults'))
    }

    if(getStore('usedIndexes')) {
        //commit(types.RECORD_USED_INDEX, getStore('usedIndexes'));
    }

    if(getStore('locale')) {
        commit(types.SET_LOCALE, getStore('locale'));
    }
}

export const resetStore = ({ commit, state }) => {
    multipleRemoveStore(['currentResults', 'questions_data', 'usedIndexes']);
    commit(types.RESET_QUESTIONS);
    commit(types.RESET_USED_INDEX);
    commit(types.RESET_CURRENT_RESULT);
}
