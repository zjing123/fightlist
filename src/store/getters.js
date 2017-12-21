import _ from 'lodash'

export const time = state => {
  return state.time
}

export const percentage = state => {
  return state.percentage
}

export const getQuestion = state => {
  return state.questions.find(function(question) {
    return _.indexOf(state.usedIndexes, question.id) === -1
  }) || _.last(state.questions)
}

export const getQuestionById = state => (id) => {
  return state.questions.find(question => question.id === id)
}

export const getScore = state => (questionId, answerTitle) => {
  let question = state.questions.find(question => question.id === questionId)
  let score =  _.result(_.find(question.answers, function(answer) {
    return answer.title === answerTitle
  }), 'score')

  return score === undefined ? 0 : score
}

export const getFirstCurrentResult = state => {
  let isLast = (0 == state.currentResults.length - 1)
  return {result: _.first(state.currentResults), isFirst: true, isLast: isLast}
}

export const getLastCurrentResult = state => {
  let isFirst = (0 == state.currentResults.length - 1)
  return {result: _.last(state.currentResults), isFirst: isFirst, isLast: true}
}

export const getNextCurrentResult = state => (questionId) => {
  let nextCurrentResult = null
  let index = _.findIndex(state.currentResults, function(result){
    return result.id == questionId
  })

  let nextIndex = index + 1
  if(nextIndex <= state.currentResults.length - 1) {
    nextCurrentResult = state.currentResults[nextIndex]
  }

  let isFirst = (nextIndex == 0)
  let isLast = (nextIndex == state.currentResults.length - 1)

  return {result: nextCurrentResult, isLast:isLast, isFirst: isFirst}
}

export const getPrevCurrentResult = state => (questionId) => {
  let prevCurrentResult = null
  let index = _.findIndex(state.currentResults, function(result) {
    return result.id == questionId
  })

  let prevIndex = index -1
  if(prevIndex >= 0) {
    prevCurrentResult = state.currentResults[prevIndex]
  }

  let isFirst = (prevIndex == 0)
  let isLast = (prevIndex == state.currentResults.length -1)

  return {result: prevCurrentResult, isFirst: isFirst, isLast: isLast }
}

export const isEnd = state => {
  return state.questions.length === state.currentResults.length ? true : false;
}

export const getFirstResult = state => {
  let isLast = (0 == state.results.length - 1)
  return {result: _.first(state.results), isFirst: true, isLast: isLast}
}

export const getLastResult = state => {
  let isFirst = (0 == state.results.length - 1)
  return {result: _.last(state.results), isFirst: isFirst, isLast: true}
}

export const getNextResult = state => (questionId) => {
  let nextResult = null
  let index = _.findIndex(state.results, function(result){
    return result.id == questionId
  })

  let nextIndex = index + 1
  if(nextIndex <= state.results.length - 1) {
    nextResult = state.results[nextIndex]
  }

  let isFirst = (nextIndex == 0)
  let isLast = (nextIndex == state.results.length - 1)

  return {result: nextResult, isLast:isLast, isFirst: isFirst}
}

export const getPrevResult = state => (questionId) => {
  let prevResult = null
  let index = _.findIndex(state.results, function(result) {
    return result.id == questionId
  })

  let prevIndex = index -1
  if(prevIndex >= 0) {
    prevResult = state.results[prevIndex]
  }

  let isFirst = (prevIndex == 0)
  let isLast = (prevIndex == state.results.length -1)
  console.log(questionId, prevResult)
  return {result: prevResult, isFirst: isFirst, isLast: isLast }
}
