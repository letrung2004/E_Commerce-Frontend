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
    'current-user': 'auth/me',


    // APIs for customer
    'categories': '/categories',
    'products': '/products',
    'createAddress':'/secure/address/create',


    // APIs for seller

}

export const authAPIs = () => {
    const token = cookie.load("access-token");
    console.log("access-token from APIs: ", token)

    return axios.create({
        baseURL: BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }        
    })
}



export default axios.create({
    baseURL: BASE_URL
});