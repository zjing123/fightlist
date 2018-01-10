import http from './http'

export const getFights = () => http.get('/fights')

export const createNewGame = (params) => http.post('/fights', {
    type: params.type,
    lang: params.lang
});

export const sendLogin = (params) => http.post('/login', {
    email: params.email,
    password: params.password
})

export const sendRegister = (params) => http.post('/register', {
    name: params.username,
    email: params.email,
    password: params.password,
    password_confirmation: params.password_confirmation,
})
