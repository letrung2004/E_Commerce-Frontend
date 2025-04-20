import axios from "axios"
import cookie from "react-cookies"

// SERVER TRUNG
export const BASE_URL = 'http://localhost:8080/webapp_war_exploded/api/'


// SERVER DAT 
// const BASE_URL = '..........'

export const endpoints = {
    // APIs for auth
    'register': '/auth/register',
    'login': '/auth/login',
    'google-login': '/oauth2/authorization/google',
    'current-user': 'auth/me',


    // APIs for customer
    'getCategories': (storeId) => `/secure/store/${storeId}/categories`,
    'createCategory': (storeId) => `/secure/store/${storeId}/categories`,
    'updateCategory': (storeId, categoryId) => `/secure/store/${storeId}/categories/${categoryId}`,

    'products': '/products',


    // APIs for seller

}

// export const authAPIs = () => {
//     const token = localStorage.getItem('jwtToken');
//     console.info("Token được sử dụng:", token);

//     return axios.create({
//         baseURL: BASE_URL,
//         headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json'
//         }
//     });
// }

export const authAPIs = () => {
    const token = cookie.load("jwtToken");
    console.log("token from APIs: ", token)

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