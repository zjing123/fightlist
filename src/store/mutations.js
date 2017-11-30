export const indexIncrement = state => {
  if(state.index < state.results.length -1) {
    state.index++
  }
}

export const indexDecrement = state => {
  if(state.index > 0) {
    state.index--
  }
}

export const questionIndexIncrement = state => {
  state.questionIndex++
}

export const setTitle = (state, title) => {
  state.title = title
}

export const start = (state, timer) => {
  if(state.time >0) {
    state.time--;
    state.percentage = state.percentage - state.speed;
  } else {
    clearInterval(timer);
  }
}

export const initParams = state => {
  state.time = 30
  state.percentage = 100;
}

export const pushResult = (state, result) => {
  state.results.push(result);
}
