import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../LoginForm';
import * as useServerContextHook from '../../../hooks/useServerContext';
import * as useAuthContextHook from '../../../hooks/useAuthContext';
import mockServers from '../../../tests/data/mockServers';
import * as reactRouterDom from 'react-router-dom';
import * as useLoginHook from '../../../hooks/useLogin'

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('LoginForm Component', () => {
  const handleLoginMock = vi.fn();

  beforeEach(() => {
    // Mock contexts
    vi.spyOn(useServerContextHook, 'useServerContext').mockReturnValue({
      servers: mockServers,
      fetchServers: vi.fn(),
    });

    vi.spyOn(useAuthContextHook, 'useAuthContext').mockReturnValue({
        token: 'mockToken',
        isUserAuthenticated: true,
        setToken: function (token: string | null): void {
            console.log(token);
        }
    });

    // Mock hooks
    vi.spyOn(useLoginHook, 'useLogin').mockReturnValue({
      handleLogin: handleLoginMock,
      loading: false,
      loginError: null
    });

    vi.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(vi.fn());
  });
  it('renders the form inputs and submit button', () => {
    render(<LoginForm />);
    const usernameInput = screen.getByPlaceholderText('Enter username');
    const passwordInput = screen.getByPlaceholderText('Enter password');
    const submitButton = screen.getByText('Log in');

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    render(<LoginForm />);
    const submitButton = screen.getByText('Log in');
    fireEvent.click(submitButton);

    const usernameError = await screen.findByText('Username is required');
    const passwordError = await screen.findByText('Password is required.');

    expect(usernameError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });

  it('calls handleLogin with credentials on form submission', async () => {
    handleLoginMock.mockResolvedValueOnce('');

    render(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText('Enter username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter password'), {
      target: { value: 'password123' },
    });

    const submitButton = screen.getByText('Log in');
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(handleLoginMock).toHaveBeenCalled();
      expect(handleLoginMock).toHaveBeenCalledWith({
        username: 'testuser',
        password: 'password123',
      });
    });
  });
});