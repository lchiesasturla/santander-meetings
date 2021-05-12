import {AuthTypes} from '../../types/types';

const AuthReducer = (state: any, action: any) => {
    switch (action.type) {
        case AuthTypes.LOGIN_SUCCESS:
        case AuthTypes.USER_CREATED:
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                authenticated: true,
                error: null,
                token: action.payload
            }
        case AuthTypes.USER_OBTAINED:
            return {
                ...state,
                user: action.payload,
                authenticated: true,
                loading: false
            }
        case AuthTypes.USER_NOT_CREATED:
        case AuthTypes.LOGIN_FAILED:
        case AuthTypes.USER_NOT_OBTAINED:
            return {
                ...state,
                authenticated: false,
                error: action.payload,
                token: ''
            }

        case AuthTypes.LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return{
                ...state,
                authenticated: false,
                token: '',
                user: null,
                loading: true
            }

        default:
            return state;
    }
}

export default AuthReducer;