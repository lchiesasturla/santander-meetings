import axiosClient from './axios';

export const tokenAuth = (token: string) => {
    if(token){
        axiosClient.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete axiosClient.defaults.headers.common['x-auth-token'];
    }
}