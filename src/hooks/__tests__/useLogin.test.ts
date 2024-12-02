import { renderHook, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { useLogin } from '../../hooks/useLogin';
import * as authContext from '../../hooks/useAuthContext';
import * as authService from '../../services/authService';

const mockToken = 'mockToken';
const mockErrorMessage = 'Invalid credentials';

describe('useLogin Hook', () => {
    const mockSetToken = vi.fn();
    const mockLoginService = vi.fn();

    beforeEach(() => {
        vi.spyOn(authContext, 'useAuthContext').mockReturnValue({
            setToken: mockSetToken,
            token: null,
            isUserAuthenticated: false
        });

        vi.spyOn(authService, 'login').mockImplementation(mockLoginService);
    });

    it('should initialize with default state', () => {
        const { result } = renderHook(() => useLogin());
        expect(result.current.loading).toBe(false);
        expect(result.current.loginError).toBeNull();
    });


    it('should handle login errors and update loginError state', async () => {
        mockLoginService.mockRejectedValueOnce(new Error(mockErrorMessage));

        const { result } = renderHook(() => useLogin());

        await act(async () => {
            try {
                await result.current.handleLogin({ username: 'wronguser', password: 'wrongpassword' });
            } catch (e) {
                const error = e as Error;
                expect(error.message).toMatch(mockErrorMessage);
            }
        });

        expect(mockLoginService).toHaveBeenCalled();
        expect(result.current.loading).toBe(false);
        expect(result.current.loginError).toBe(mockErrorMessage);
        expect(mockSetToken).not.toHaveBeenCalled();
    });

    it('should call loginService and update state on successful login', async () => {
        mockLoginService.mockResolvedValueOnce({ token: mockToken });

        const { result } = renderHook(() => useLogin());

        await act(async () => {
            await result.current.handleLogin({ username: 'testuser', password: 'password123' });
        });

        expect(mockLoginService).toHaveBeenCalled();
        expect(mockLoginService).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
        expect(mockSetToken).toHaveBeenCalledWith(mockToken);
        expect(result.current.loading).toBe(false);
        expect(result.current.loginError).toBeNull();
    });
});
