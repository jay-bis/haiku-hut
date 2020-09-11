import * as LOGIN_ACTIONS from '../actions/LoginActions';

const INITIAL_STATE = {
    token: '',
    email: '',
    password: '',
    signedIn: false,
    loginLoading: false,
    loginFailure: false
}

const LoginReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case(LOGIN_ACTIONS.LOGGING_IN):
            return { ...state, loginLoading: true, loginFailure: false }
        
        case(LOGIN_ACTIONS.LOGIN_FAILED):
            return { ...state, loginLoading: false, loginFailure: true }

        case(LOGIN_ACTIONS.LOGIN_SUCCESS):
            return { ...state, loginLoading: false, loginFailure: false, signedIn: true }

        case(LOGIN_ACTIONS.LOGOUT_ACTION):
            return { ...state, token: null, signedIn: false }
        default:
            return state
    }
}

export default LoginReducer;