import axios, { AxiosError } from 'axios';
import { LoginPayload, AuthResponse } from '../types/auth';

export const login = async (credentials: LoginPayload): Promise<AuthResponse> => {
    try {
        const response = await axios.post<AuthResponse>('https://playground.tesonet.lt/v1/tokens', credentials);
        return response.data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            const error = e as AxiosError;
            throw new Error(error.message || 'Login failed');
        } else {
            throw new Error('Login failed');
        }
    }
};
