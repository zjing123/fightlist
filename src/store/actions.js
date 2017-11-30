export const incrementAsync = ({ commit }) => {
  setTimeout(() => {
    commit('increment')
  }, 1000)
}

export const start = ({ commit, state })=> {
  var timer = setInterval(function() {
    commit('start')
  }, 1000)
}
