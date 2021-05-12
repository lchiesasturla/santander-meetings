import { useEffect, useReducer } from 'react';
import axiosClient from '../../config/axios';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';
import { IUser } from '../../interfaces/GenericInterface';
import { AuthTypes } from '../../types/types';
import { tokenAuth } from '../../config/token';

const AuthState = (props: any) => {

    const initialState = {
	    token: localStorage.getItem('token'),
        user: null,
        authenticated: false,
        error: {
            msg_es: '',
            msg_en: ''
        },
        loading: true
    }

    useEffect(() => {
        if(initialState.token)
            getAuthenticatedUser();
    }, [initialState.token])

    const [state, dispatch] = useReducer(AuthReducer, initialState);

    const login = async (data: IUser) => {
        try {
            const response = await axiosClient.post<{token: string}>('/auth', data);
            dispatch({
                type: AuthTypes.LOGIN_SUCCESS,
                payload: response.data.token
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: AuthTypes.LOGIN_FAILED,
                payload: error.response.data
            });
        }
    }

    const createUser = async (data: IUser) => {
        try {
            const response = await axiosClient.post<{token: string}>('/users', data);
            dispatch({
                type: AuthTypes.USER_CREATED,
                payload: response.data.token
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: AuthTypes.USER_NOT_CREATED,
                payload: error.response.data
            });
        }
    }

    const getAuthenticatedUser = async () => {
        try {
            const token = localStorage.getItem('token');
            if(token){
                tokenAuth(token);
            }
            const response = await axiosClient.get<{user: IUser}>('/auth');
            dispatch({
                type: AuthTypes.USER_OBTAINED,
                payload: response.data.user
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: AuthTypes.USER_NOT_OBTAINED,
                payload: error.response.data
            });
        }
    }

    const logout = async () => {
        dispatch({
            type: AuthTypes.LOGOUT_SUCCESS
        });
    }

    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                user: state.user,
                authenticated: state.authenticated,
                error: state.error,
                loading: state.loading,
                login,
                createUser,
                getAuthenticatedUser,
                logout
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;