import axios from 'axios'
import qs from 'qs'
import store from '../store'

axios.defaults.baseURL = BASE_URL
// axios.defaults.headers.common['Authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImE2NzM2Y2NjMWNmODBiMmZkYWFiMTYxOTQ5M2FmMWEwZTc4NWJmNDNmZGRlMTAyNjFjNTNkOWVkMTc5MTQ3MDc0ZGM3ZWRkNjVkMmFhYzRkIn0.eyJhdWQiOiIyIiwianRpIjoiYTY3MzZjY2MxY2Y4MGIyZmRhYWIxNjE5NDkzYWYxYTBlNzg1YmY0M2ZkZGUxMDI2MWM1M2Q5ZWQxNzkxNDcwNzRkYzdlZGQ2NWQyYWFjNGQiLCJpYXQiOjE1MTUzNzgzMTgsIm5iZiI6MTUxNTM3ODMxOCwiZXhwIjoxNTQ2OTE0MzE4LCJzdWIiOiIzIiwic2NvcGVzIjpbXX0.Np4w7W2hauJ-4kh9S37SxD6iTTwLbgCD4Gn3KNt9srRelCRBmW-_WJ4Se2vqOeExW2o4GF-cpeF2iTGSRotiDuYCeXCOdiadSK4Xk8sPD4Cv33VFNRmEeN1zL_2SxQR41RS4bLYynjDZlH3Y5zW_FpuZqR9dqZfEZflGXHNvYCKR_j5mbORn1UAM6Krk0CdtgxTtPUkPwpLfQG6HKgviLx1K2jxy-ruj2MZFZ5xbQ_ORs-DFr8ED0W1UaK485TJZcRS0xr3sJjm_84DPvjkKeU4zTLgU_vFTeHlD0qn2XPAZxBb9hf10veqObhIiaHOdT4-mgDyPFEtPDH1IaooVmx2HR2lHJlGygYR2rKeOTGPh6nqCTKvoGbAkwOZXyWmj3Ice31d2w1LPPh5XDqdKWXtZmBb4-DFJnfqhKKQo2oq02ptv8On5EO9zdB4dynT0gtmpTRloT7JU2S80-txuI1OqXSbq1CzsXTCfKO5dcvYEg_7yOC-xV9u2yqGrMlLC_Qbtek2Lh2GnyO9WJn-9Q6PrstGslG9wuYQgClvdiOmJoidCYiR3xfyw6I45p4JwDy3Zx3RgQaGXwuflz54jyl3v_jA2gbG4v5MF4PGlozkdIwOZqyGBTwfFI3wyyzz9wydTOxUcbVcI55H2ZKGyZXvcajQE9CmUg7SZc8pkZGA'

axios.interceptors.request.use(config => {
    store.commit('changeLoding', {isLoading: true})
    if(store.state.access_token !== '') {
        config.headers.Authorization = store.state.access_token
    }

    return config
}, error => {
    return Promise.reject(err)
})

axios.interceptors.response.use(response => {
    store.commit('changeLoding', {isLoading: false})
    return response
}, error => {
    store.commit('changeLoding', {isLoading: false})

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
