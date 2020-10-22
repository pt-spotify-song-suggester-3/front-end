import {axiosWithAuth} from '../utils/axiosWithAuth'
import axios from 'axios'

export const USER_REGISTRATION = "USER_REGISTRATION";
export const USER_REGISTRATION_FAIL = "USER_REGISTRATION_FAIL"
export const USER_CREDENTIALS = "USER_CREDENTIALS";
export const USER_CREDENTIALS_FAIL = "USER_CREDENTIALS_FAIL"
export const REMOVE_USER = 'REMOVE_USER'

export const submitRegistration = user => dispatch => {
    dispatch({type: USER_REGISTRATION})
    axios.post("https://unit4-spotifysongsuggester.herokuapp.com/api/user/register", user)
    .then(res => {
        console.log("user registration", res)
        localStorage.setItem("token", res.data.token)
    })
    .catch(error => {
        console.log("Action Error", error)
        dispatch({USER_REGISTRATION_FAIL})
    })
}

export const userCredentials = () => dispatch => {
    let user_id = localStorage.getItem('ID')

    axiosWithAuth().get(`api/user/${user_id}`)
    .then(res => {
        console.log("SUCESS",res)
        dispatch({type: USER_CREDENTIALS, payload:res})
    })
    .catch(error => {
        console.log("ERROR", error)
        dispatch({type: USER_CREDENTIALS_FAIL})
    })
}

export const removeUser = (id) => dispatch => {
    dispatch({type: REMOVE_USER})
    axiosWithAuth()
    .delete(`api/user/${id}`)
    .then(res => {
        console.log("User Deleted", res)
    })
    .catch(error => {
        console.log("Error trying to delete user", error)
    })
}

export const update = (user) => dispatch => {
    axiosWithAuth()
    .put(`api/user/${user.id}`, user)
    .then(res => {
        console.log("Updated User Successfully", res)
    })
    .catch(error => {
        console.log("Error in updating user", error)
    })
}