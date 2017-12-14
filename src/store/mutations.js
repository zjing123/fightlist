import _ from 'lodash'

export const updateLoadingStatus = (state, payload) => {
  state.isLoading = payload.isLoading
}

export const updateDirection = (state, payload) => {
  state.direction = payload.direction
}

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

export const setQuestions = (state, data) => {
  if(data) {
    state.questions = data.questions
    state.questionGroup = data.group
  }
}

export const setFightId = (state, fightId) => {
  if(!state.fight_id) {
      state.fight_id = fightId
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
  state.time = 60
  state.percentage = 100
  // state.fight_id = null
  // state.questionGroup = null
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

/**
 * [pushUsedIndex 将已经回答过的问题的id记录下来]
 * @param  {[type]} state [description]
 * @param  {[type]} index [description]
 * @return {[type]}       [description]
 */
export const pushUsedIndex = (state, id) => {
  _.uniq(state.usedIndexes.push(id))
}

export const disableShowBack = state => {
  state.showBack = false
}

export const enableShowBack = state => {
  state.showBack = true
}
