import axios from "axios"

//it is the base url for all request will call port 3000
const API = axios.create({ baseURL: "http://localhost:5000" })

//jwt not understood
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});
export const getUser = (userId) => API.get(`/user/${userId}`)

export const updateUser = (id, FormData) => API.put(`/user/${id}`, FormData)

export const getAllUser = () => API.get('/user');

export const followUser = (id, data) => API.put(`/user/${id}/follow`, data)
// data is info about current user
// id is the user, the current user wants to follows

export const unFollowUser = (id, data) => API.put(`/user/${id}/unfollow`, data)