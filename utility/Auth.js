import {TEST_TOKEN, SEARCH_USER} from "../config/constants";
import axios from "axios";

const ISSERVER = typeof window === "undefined";

export const RequestHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${!ISSERVER ? localStorage.getItem('token') : null}`
}

// axios.post(TEST_TOKEN, {token: token})

export const isLoggedin = () => new Promise((resolve, reject) => {
    if(!ISSERVER){
        const token = localStorage.getItem('roll_no');
        if(token){
            
            resolve(true)
        }
        else {
            resolve(false)
        }

    }
})

export const getUsername = () => {
    if(!ISSERVER){
        const username = localStorage.getItem('username');
        return username
    }
}


export const logout = () => {
    if(!ISSERVER){
        localStorage.removeItem('roll_no');
        localStorage.removeItem('username');
    }
}

export const login = (semester, branch, roll_no, subject) => {
    if(!ISSERVER){
        localStorage.setItem('semester', semester);
        localStorage.setItem('branch', branch);
        localStorage.setItem('roll_no', roll_no);
        localStorage.setItem('subject', subject);
    }
}

export const getToken = () => {
    if(!ISSERVER){
        return localStorage.getItem('rol');
    }
}


export const searchUser = (username) => new Promise((resolve, reject) => {
    axios.post(SEARCH_USER, {username: username})
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})