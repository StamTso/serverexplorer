import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavBar from '../NavBar';

describe('NavBar Component', () => {
  it('renders the logo and logout button', () => {
    render(<NavBar onLogout={() => {}} />);
    const logo = screen.getByRole('img');
    const button = screen.getByText('Log out');
    expect(logo).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('handles the logout button click', () => {
    const onLogoutMock = vi.fn();
    render(<NavBar onLogout={onLogoutMock} />);
    const button = screen.getByText('Log out');
    fireEvent.click(button);
    expect(onLogoutMock).toHaveBeenCalled();
  });
});
