import {USER_CREDENTIALS, USER_REGISTRATION, USER_CREDENTIALS_FAIL, USER_REGISTRATION_FAIL} from './actions'

const initialState ={
    username:"",
    password:"",
    terms:false,
    error:''
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case USER_CREDENTIALS:
            console.log("Reducer USER CREDENTIALS", action.payload)
            return{
                ...state,
                username: action.payload.username,
                password: action.payload.password,
            }
        case USER_CREDENTIALS_FAIL:
            console.log("USER CREDENTIAL FAIL")
            return{
                ...state,
                error: action.payload
            }
        case USER_REGISTRATION:
            return {
                ...state,
                username: action.payload.username,
                password: action.payload.password
            }
        case USER_REGISTRATION_FAIL:
            return {
                ...state,
                error: action.payload
            }

        default:
            return state;
    
    }
    
}