import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'
import useFormInput from '../hooks/useFormInput'
import apiService from '../utils/apiService';
import { ROUTES } from '../utils/constants/ROUTES';
import { authToken } from '../utils/constants/API_CONSTANTS';
import '../styles/LoginForm.css';

export default function LoginForm() {
    const username = useFormInput('');
    const password = useFormInput('');
    const history = useHistory();
    const [hasLoginError, setHasLoginError] = useState(false);
    const [hasEmptyInputs, setHasEmptyInputs] = useState(false);

    if (sessionStorage[authToken]) {
        history.replace(ROUTES.SERVER_LIST);
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const payload = { username: username.value, password: password.value };

        if (payload.username === '' || payload.password === '') {
            hasLoginError && setHasLoginError(false);
            setHasEmptyInputs(true);
            return;
        }

        apiService.authorize(payload).then(response => {
            if (response) {
                sessionStorage.setItem(authToken, response);
                history.replace(ROUTES.SERVER_LIST);
                setHasLoginError(false);
                hasEmptyInputs && setHasEmptyInputs(false);
            } else {
                setHasLoginError(true);
                hasEmptyInputs && setHasEmptyInputs(false);
            }
        });
    }

    return (
        <div
            className='login-container'
        >
            <form
                onSubmit={e => handleLogin(e)}
            >
                <div
                    className='login-title'
                >
                    <p>LOG INTO SERVER EXPLORER</p><br /><br />
                </div>
                <div
                    className='login-label'
                >
                    <input
                        className=' login-input'
                        type='text'
                        {...username}
                        placeholder='username'

                    />
                </div>
                <div>

                </div>
                <div
                    className='login-label'
                >
                    <input
                        className=' login-input'
                        type='password'
                        {...password}
                        placeholder='password'
                    />
                </div>
                {hasLoginError &&
                    <div
                        className='login-error'
                    >
                        <><small style={{ color: 'red' }}>Username or password are incorrect</small><br /></>
                    </div>
                }
                {hasEmptyInputs &&
                    <div
                        className='login-error'
                    >
                        <><small>Login fields cannot be empty</small><br /></>
                    </div>
                }

                <div>
                    <input
                        className='login-button'
                        type='submit'
                        value='Log In'
                    />
                </div>
            </form>
        </div>
    )
}