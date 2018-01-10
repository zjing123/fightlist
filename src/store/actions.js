import { getStore } from '@/tools/utils'

export const incrementAsync = ({ commit }) => {
  setTimeout(() => {
    commit('increment')
  }, 1000)
}

let timerId;
export const start = ({ commit, state })=> {
    timerId = setInterval(function() {

    if(state.time > 0) {
      commit('START')
    } else {
       clearInterval(timerId);
    }
  }, 1000)
}

export const initData = ({ commit, state }) => {
    if(getStore('userinfo')) {
        commit('RECORD_USERINFO', getStore('userinfo'));
    }

    if(getStore('tokens')) {
        commit('SET_ACCESS_TOKENS', getStore('tokens'));
    }

    if(getStore('questions_data')) {
        commit('RECORD_QUESTIONS', getStore('question_data'));
    }

    if(getStore('usedIndexes')) {
        commit('PUSH_USED_INDEX', getStore('usedIndexes'));
    }

    if(getStore('locale')) {
        commit('SET_LOCALE', getStore('locale'));
    }

    // var windowLocalStorage = window.localStorage
    // if(windowLocalStorage.getItem('currentResults')) {
    //   state.currentResults = JSON.parse(windowLocalStorage.getItem('currentResults'))
    // }
    //
    // if(windowLocalStorage.getItem('record_id')) {
    //   state.record_id = windowLocalStorage.getItem('record_id')
    // }
    //
    // if(windowLocalStorage.getItem('questionGroup')){
    //   state.questionGroup = windowLocalStorage.getItem('questionGroup')
    // }
    //
    // if(windowLocalStorage.getItem('questions')) {
    //   state.questions = JSON.parse(windowLocalStorage.getItem('questions'))
    // }
    //
    // if(windowLocalStorage.getItem('usedIndexes')) {
    //   state.usedIndexes = JSON.parse(windowLocalStorage.getItem('usedIndexes'))
    // }
    //
    // if(windowLocalStorage.getItem('locale')) {
    //   state.locale = windowLocalStorage.getItem('locale')
    // }
}
