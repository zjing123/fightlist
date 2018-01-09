import * as types from './mutation-types'
import _ from 'lodash'
import config from '@/config/base.config'

let localStorage = window.localStorage

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
    localStorage.setItem('questions', JSON.stringify(state.questions))
    localStorage.setItem('questionGroup', state.questionGroup)
  }
}

export const setRecordId = (state, data) => {
  if(!state.record_id) {
      state.record_id = data.record_id
      localStorage.setItem('record_id', state.record_id)
  }
}

export const setComplete = (state, payload) => {
  state.completed = payload.completed
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
  state.time = config.time
  state.percentage = config.percentage
  // state.record_id = null
  // state.questionGroup = null
}

export const pushCurrentResult = (state, result) => {
  state.currentResults.push(result)
  localStorage.setItem('currentResults', JSON.stringify(state.currentResults))
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
  localStorage.setItem('usedIndexes', JSON.stringify(state.usedIndexes))
}

export const disableShowBack = state => {
  state.showBack = false
}

export const enableShowBack = state => {
  state.showBack = true
}

export const disableShowMore = state => {
  state.showMore = false
}

export const enableShowMore = state => {
  state.showMore = true
}

export const setResults = (state, payload) => {
  if(payload.result != false) {
    state.results = payload.results
  }
  state.rightResults = payload.rightResults
}

export const setLocale = (state, payload) => {
  state.locale = payload.locale
  localStorage.setItem('locale', state.locale)
}

export const setAccessToken = (state, payload) => {
  state.access_token = payload.access_token
  state.username = payload.username
}

export const changeLoding = (state, payload) => {
  state.isLoading = payload.isLoading
}
