import axios from "axios"
import cookie from "react-cookies"

// SERVER TRUNG
const BASE_URL = 'http://localhost:8080/webapp_war_exploded/api/'


// SERVER DAT 
// const BASE_URL = '..........'

export const endpoints = {
    // APIs for auth
    'register': '/auth/register',
    'login': '/auth/login',
    // 'google-login': '/oauth2/authorization/google',
    // 'current-user': '/api/auth/me',


    // APIs for customer
    'categories': '/categories',
    'products': '/products',


    // APIs for seller

}

export const authAPIs = () => {
    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': cookie.load("access-token")
        }
    })
}

export default axios.create({
    baseURL: BASE_URL
});