import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import {AUTH_ERROR, INPUT_ERROR} from '../utils/constants/ERROR_MESSAGES';
import { PROTOCOL, BASEURL } from '../utils/constants/API_CONSTANTS';

describe('Login form', ()=> {
    const setup = () => {
        const utils = render(<LoginForm />, {wrapper: MemoryRouter});
        const username = utils.getByPlaceholderText('username');
        const password = utils.getByPlaceholderText('password');
        const login = utils.getByDisplayValue('Log In');
        return {
            username,
            password,
            login,
            ...utils,
        }
    }

    it('should render credential inputs and login button', () => {
        render(<LoginForm />);
        expect(screen.getByPlaceholderText('username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Log In')).toBeInTheDocument();
    });

    it('should display error message and prevent authorizing when inputs are empty', async() => {
        const { login } = setup();
        jest.spyOn(window, 'fetch');
        fireEvent.click(login);

        expect(window.fetch).toHaveBeenCalledTimes(0);
        const errorMessage  = await screen.findByText(INPUT_ERROR);
        expect(errorMessage).toBeInTheDocument();
    });

    it('should display login error when credentials are wrong', async() => {
        const { username, password, login } = setup();
        jest.spyOn(window, 'fetch');
        // @ts-ignore
        window.fetch.mockResolvedValueOnce({
            ok: false,
            json: async () => ({error: 'error'}),
        });
        fireEvent.change(username, {target: {value: 'user'}});
        fireEvent.change(password, {target: {value: 'pass'}});
        fireEvent.click(login);

        expect(window.fetch).toHaveBeenCalledWith(
            `${PROTOCOL}://${BASEURL}/tokens`,
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({username: 'user', password: 'pass'})
            }));

        const errorMessage  = await screen.findByText(AUTH_ERROR);
        expect(window.fetch).toHaveBeenCalledTimes(1);
        expect(errorMessage).toBeInTheDocument();
    });
});