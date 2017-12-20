export const incrementAsync = ({ commit }) => {
  setTimeout(() => {
    commit('increment')
  }, 1000)
}

let timerId;
export const start = ({ commit, state })=> {
    timerId = setInterval(function() {

    if(state.time > 0) {
      commit('start')
    } else {
       clearInterval(timerId);
    }
  }, 1000)
}

export const initData = ({ commit, state }) => {
  var windowLocalStorage = window.localStorage
  if(windowLocalStorage.getItem('currentResults')) {
    state.currentResults = JSON.parse(windowLocalStorage.getItem('currentResults'))
  }

  if(windowLocalStorage.getItem('fight_id')) {
    state.fight_id = windowLocalStorage.getItem('fight_id')
  }

  if(windowLocalStorage.getItem('')){

  }
}
