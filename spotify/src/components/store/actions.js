export const USER_REGISTRATION = "USER_REGISTRATION";
export const USER_CREDENTIALS = "USER_CREDENTIALS";

export const submitRegistration = user => dispatch => {
    dispatch({type: USER_REGISTRATION})
}