import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ServersDashboard from '../ServersDashboard';
import * as useServerContextHook from '../../../hooks/useServerContext';
import * as useAuthContextHook from '../../../hooks/useAuthContext';
import * as useLogoutHook from '../../../hooks/useLogout';
import * as reactRouterDom from 'react-router-dom';
import * as getCountryISO from '../../../utils/getCountryISO';
import mockCountryIsoLookup from '../../../tests/data/mockCountryIsoLookup';
import mockServers from '../../../tests/data/mockServers';

vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: vi.fn(),
}));

describe('ServersDashboard Component', () => {
  const handleLogoutMock = vi.fn();

  const mockGetCountryISO = vi.spyOn(getCountryISO, 'default');
  mockGetCountryISO.mockImplementation((serverName: string) => {
    const countryName = serverName.split(' #')[0].trim();
    return mockCountryIsoLookup[countryName] || '';
  });

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
    vi.spyOn(useLogoutHook, 'useLogout').mockReturnValue({
      handleLogout: handleLogoutMock,
    });

    vi.spyOn(reactRouterDom, 'useNavigate').mockReturnValue(vi.fn());
  });

  it('renders NavBar at the top with logout button', () => {
    render(<ServersDashboard />);
    const navBarButton = screen.getByText('Log out');
    expect(navBarButton).toBeInTheDocument();
  });

  it('displays the server list with the correct headers', () => {
    render(<ServersDashboard />);
    expect(screen.getByText('Server list')).toBeInTheDocument();
    expect(
      screen.getByText('The distance between you and the server')
    ).toBeInTheDocument();

    expect(screen.getByText('Country name')).toBeInTheDocument();
    expect(screen.getByText('Distance')).toBeInTheDocument();
  });

  it('calls handleLogout when Log out button is clicked', () => {
    render(<ServersDashboard />);
    const logoutButton = screen.getByText('Log out');
    fireEvent.click(logoutButton);

    expect(handleLogoutMock).toHaveBeenCalled();
  });
});
