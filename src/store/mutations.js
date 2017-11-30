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
  if(state.index < state.results.length -1) {
    state.index++
  }
}

export const setTitle = (state, title) => {
  state.title = title
}

export const start = state => {
  if(state.time > 0) {
    state.time--;
    state.percentage = state.percentage - state.speed;
  }
}

export const initParams = state => {
  state.time = 30
  state.percentage = 100;
}

export const pushResult = (state, result) => {
  state.results.push(result);
}

export const setQuestionIndexToIndex = state => {
  state.index = state.questionIndex - 1
}
