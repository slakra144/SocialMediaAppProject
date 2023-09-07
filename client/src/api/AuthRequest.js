import axios from "axios"

//it is the base url for all request will call port 3000
const API =axios.create({baseURL: "http://localhost:5000"})

export const logIn = (formData)=> API.post('/auth/login', formData);
export const signUp = (formData)=> API.post('/auth/register', formData);