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
