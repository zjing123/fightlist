import Vue from 'vue'
import Vuex from 'vuex'
import vuexI18n from 'vuex-i18n'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import { questions } from './questions'
import config from '@/config/base.config'

Vue.use(Vuex)
const state = {
    username: 'Guest',
    time: config.time,/*30s*/
    percentage: config.percentage,
    speed: config.percentage / config.time,
    title: '',
    usedIndexes:[], /**回答过的问题id*/
    currentResults:[],
    results: [],
    rightResults: [],
    questions: null,
    questionGroup:null,
    record_id:null,
    showBack: true,
    showMore: true,
    isLoading: false,
    direction: 'forward',
    locale: 'zh_CN',
    access_token: '',
    isLoading: false,
    userinfo:{},
    tokens: {},
    domain: DOMAIN,
    image_path: IMAGE_URL
}

export default new Vuex.Store({
    modules: {
      i18n: vuexI18n.store
    },
    state,
    getters,
    actions,
    mutations
})
