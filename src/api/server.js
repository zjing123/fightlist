import http from './http'

export const getFights = () => http.get('/fights')

export const sendLogin = (data) => http.post('/fights', {
    username: data.username,
    password: data.password
})

export const sendRegister = (data) => http.post('/register', {
    name: data.username,
    email: data.email,
    password: data.password,
    password_confirmation: data.password_confirmation,
})
