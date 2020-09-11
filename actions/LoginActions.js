import { LOGIN } from '../graphql/mutations/login';

export const LOGGING_IN = 'LOGGING_IN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const LOGOUT_ACTION = 'LOGOUT_ACTION';

export const loggingIn = () => ({
    type: LOGGING_IN
});

export const loginSuccess = () => ({
    type: LOGIN_SUCCESS
});

export const loginFailed = () => ({
    type: LOGIN_FAILED
});

export const logoutAction = () => ({
    type: LOGOUT_ACTION
});

export const logout = () => (dispatch, getState, client) => {
    dispatch(logoutAction());
}

export const login = (email, password) => async (
    dispatch, getState, client
) => {
    dispatch(loggingIn());
    try {
        const result = await client.mutate({
            mutation: LOGIN,
            variables: {
                email: email,
                password: password
            }
        });
        dispatch(loginSuccess(result.data.login.token));
        return result.data.login.token;
    } catch(e) {
        dispatch(loginFailed());
    }
    
}