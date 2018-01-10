import axios from 'axios'
import qs from 'qs'
import store from '../store'
import * as types from '../store/mutation-types'
import router from '@/router'

axios.defaults.baseURL = BASE_URL

axios.interceptors.request.use(config => {
    store.commit(types.UPDATE_LOADING_STATUS, true)
    if(store.state.tokens.access_token && store.state.tokens.token_type) {
        config.headers.Authorization = store.state.tokens.token_type + ' ' + store.state.tokens.access_token
    }

    return config
}, error => {
    return Promise.reject(err)
})

axios.interceptors.response.use(response => {
    store.commit(types.UPDATE_LOADING_STATUS, false)
    return response
}, error => {
    store.commit(types.UPDATE_LOADING_STATUS, false)
    console.log(error.response)
    if(error.response) {
        switch(error.response.status) {
            case 401:
                store.commit(types.LOGOUT);
                router.replace({
                    path: 'login',
                    query: {redirect: router.currentRoute.fullPath}
                });
                console.log(401)
                return;
            case 422:
              return error.response;
        }
    }

    if(error.response.status == 422) {
        return error.response
    }

    return Promise.reject(error)
})

export default {
    async get(url) {
       let response
       try {
           response = await axios.get(url)
           return response.data
       } catch(err) {
           return reject(err)
       }
   },
    async post(url, params) {
        let response
        try {
            response = await axios.post(url, params)
            return response.data
        } catch(err) {
            return Promise.reject(err)
        }
    }
}
