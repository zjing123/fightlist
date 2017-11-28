export const increment = state => {
  state.time++
  //state.history.push('increment')
}

export const decrement = state => {
  state.time--
  //state.history.push('decrement')
}

export const setTitle = (state, title) => {
  state.title = title
  //state.history.push('setTitle')
}
