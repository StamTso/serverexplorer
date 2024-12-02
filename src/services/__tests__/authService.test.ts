import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { login } from '../authService';
import { LoginPayload, AuthResponse } from '../../types/auth';

const mockedAxios = axios as typeof axios;
const mockError = 'Login failed';

vi.mock('axios');

describe('authService', () => {
  const AUTH_ENDPOINT = 'https://playground.tesonet.lt/v1/tokens';

  it('should return token on successful login', async () => {
    const mockResponse: AuthResponse = { token: 'mockToken' };
    const mockCredentials: LoginPayload = { username: 'testuser', password: 'password123' };

    mockedAxios.post = vi.fn().mockResolvedValueOnce({ data: mockResponse });

    const result = await login(mockCredentials);

    expect(result).toEqual(mockResponse);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith(
      AUTH_ENDPOINT,
      mockCredentials
    );
  });

  it('should throw an error on failed login', async () => {
    mockedAxios.post = vi.fn().mockRejectedValueOnce('');

    const mockCredentials: LoginPayload = { username: 'wronguser', password: 'wrongpassword' };

    await expect(login(mockCredentials)).rejects.toThrow(mockError);
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post).toHaveBeenCalledWith(
        AUTH_ENDPOINT,
      mockCredentials
    );
  });
});
