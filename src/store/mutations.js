import * as types from './mutation-types'
import _ from 'lodash'
import config from '@/config/base.config'
import { setStore, getStore, removeStore, multipleRemoveStore } from '@/tools/utils'

export default {
    [types.UPDATE_LOADING_STATUS](state, isLoading) {
        console.log('Mutation:', types.UPDATE_LOADING_STATUS);
        state.isLoading = isLoading
    },
    [types.UPDATE_DIRECTION](state, payload) {
        console.log('Mutation:', types.UPDATE_DIRECTION);
        state.direction = payload.direction
    },
    [types.RECORD_QUESTIONS](state, payload) {
        console.log('Mutation:', types.RECORD_QUESTIONS);
        if(payload) {
            state.questions = payload.questions;
            state.record_id = payload.record_id;
            setStore('questions_data', {questions: state.questions, record_id: state.record_id});
            // setStore('record_id', state.record_id)
        }
    },
    [types.RESET_QUESTIONS](state) {
        console.log('Mutation:', types.RESET_QUESTIONS);
        state.questions = [];
        state.record_id = null;
    },
    [types.SET_TITLE](state, title) {
        console.log('Mutation:', types.SET_TITLE);
        state.title = title
    },
    [types.START](state) {
        console.log('Mutation:', types.START);
        if(state.time > 0) {
          state.time--
          state.percentage = state.percentage - state.speed
        }
    },
    [types.INIT_PARAMS](state) {
        console.log('Mutation:', types.INIT_PARAMS);
        state.time = config.time;
        state.percentage = config.percentage;
    },
    [types.PUSH_CURRENT_RESULT](state, result) {
        console.log('Mutation:', types.PUSH_CURRENT_RESULT);
        state.currentResults.push(result);
        //setStore('currentResults', state.currentResults);
    },
    [types.RECORD_CURRENT_RESULTS](state, results) {
        console.log('Mutation:', types.RECORD_CURRENT_RESULTS);
        state.currentResults = results;
        //setStore('currentResults', state.currentResults);
    },
    [types.RESET_CURRENT_RESULT](state) {
        console.log('Mutation:', types.RESET_CURRENT_RESULT);
        state.currentResults = [];
    },
    [types.SYNC_RESULT](state) {
        if(state.currentResults) {
            let score = 0;
            for(let result in state.currentResults) {
                for(let answer in result.answers) {
                    score += answer.score;
                }
            }

            let res = {socre: score, results: state.currentResults};
            state.results.push(res);
            state.currentResults = [];
        }
    },
     /**
      * [PUSH_USED_INDEX 将已经回答过的问题的id记录下来]
      * @param  {[object]} state [vuex.state]
      * @param  {[int]} index
      */
    [types.PUSH_USED_INDEX](state, id) {
        state.usedIndexes.push(id)
        state.usedIndexes = _.uniq(state.usedIndexes);
        setStore('usedIndexes', state.usedIndexes);
    },
    /**
     * [usedIndexes 通过数组更新usedIndexes]
     * @type {[array]}
     */
    [types.RECORD_USED_INDEX](state, usedIndexes) {
        state.usedIndexes = _.uniq(usedIndexes)
    },
    [types.RESET_USED_INDEX](state) {
        state.usedIndexes = [];
    },
    [types.DISABLE_SHOW_BACK](state) {
        state.showBack = false;
    },
    [types.ENABLE_SHOW_BACK](state) {
        state.showBack = true;
    },
    [types.DISABLE_SHOW_MORE](state) {
        state.showMore = false;
    },
    [types.ENABLE_SHOW_MORE](state) {
        state.showMore = true;
    },
    [types.SET_RESULTS](state, payload) {
        if(payload.results) {
            state.results = payload.results;
        }
        state.rightResults = payload.rightResults;
    },
    [types.SET_LOCALE](state, payload) {
        state.locale = payload.locale;
        setStore('locale', {locale: state.locale});
    },
    [types.SET_ACCESS_TOKENS](state, tokens) {
        state.tokens = tokens;
        setStore('tokens', state.tokens);
    },
    [types.RECORD_USERINFO](state, user) {
        state.userinfo = user;
        setStore('userinfo', state.userinfo);
    },
    [types.LOGOUT](state) {
        state.userinfo = {};
        state.tokens = {};
    }
}


// let localStorage = window.localStorage
//
// export const setAccessToken = (state, payload) => {
//   state.access_token = payload.access_token
//   state.username = payload.username
// }
