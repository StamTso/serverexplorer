import {protocol, baseUrl} from './constants/API_CONSTANTS';

type AuthPayload = {
    username: string;
    password: string
}

export default class apiService {
    static async authorize (payload: AuthPayload) {
        const uri = `${protocol}://${baseUrl}/tokens`
        const fetchResult = await fetch(uri, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        if(fetchResult.ok){
            return await fetchResult.json().then(response => response.token);
        }
        return 'error';
    }
}