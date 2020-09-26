import apiService from './apiService';

export const login = (username: string, password:string) => {
    const payload = {username: username, password: password};
    apiService.authorize(payload).then(response => {
        sessionStorage.setItem('auth-token', response);
    })
}