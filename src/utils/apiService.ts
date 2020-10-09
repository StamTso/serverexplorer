import { PROTOCOL, AUTH_TOKEN, BASEURL } from './constants/API_CONSTANTS';

type AuthPayload = {
    username: string;
    password: string
}

export default class apiService {
    static async authorize(payload: AuthPayload) {
        const uri = `${PROTOCOL}://${BASEURL}/tokens`;
        const fetchResult = await fetch(uri, {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        if (fetchResult.ok) {
            return await fetchResult.json().then(response => response.token);
        }
        return null;
    }

    static async getServers() {
        const uri = `${PROTOCOL}://${BASEURL}/servers`;
        const fetchResult = await fetch(uri, {
            method: 'GET',
            headers: new Headers({ 'Authorization': sessionStorage[AUTH_TOKEN] })
        });

        return fetchResult.json();
    }
}