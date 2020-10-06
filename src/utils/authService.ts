import apiService from './apiService';
import {authToken} from './constants/API_CONSTANTS'

export const login = (username: string, password:string) => {
    const payload = {username: username, password: password};
    apiService.authorize(payload).then(response => {
         response && sessionStorage.setItem(authToken, response);
    });
}