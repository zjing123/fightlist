export const indexIncrement = (state, length) => {
  if(state.index < length) {
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
    state.time--
    state.percentage = state.percentage - state.speed
  }
}

export const initParams = state => {
  state.time = 30
  state.percentage = 100
}

export const pushCurrentResult = (state, result) => {
  state.currentResults.push(result)
}

export const syncResult = state => {
  if(state.currentResults) {
    let score = 0
    for(let result in state.currentResults) {
      for(let answer in result.answers) {
        score += answer.score
      }
    }
    let res = {socre: score, results: state.currentResults}
    state.results.push(res)
    state.currentResults = []
    state.index = 0
  }
}

export const setQuestionIndexToIndex = state => {
  state.index = state.questionIndex - 1
}

export const disableShowBack = state => {
  state.showBack = false
}

export const enableShowBack = state => {
  state.showBack = true
}
