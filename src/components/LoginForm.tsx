import React, { useState } from 'react';
import {login} from '../utils/authService';

const useFormInput = (initialValue:string) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

const handleLogin = (username: string, password: string) => {
    login(username, password);
}


export default function LoginForm() {
    const username = useFormInput('');
    const password = useFormInput('');
    const authToken = sessionStorage.getItem('auth-token');
    const authError = authToken === 'error';


    return(
        <div>
            <div>
                LOGIN<br /><br />
            </div>
            <div>
                Username<br />
                <input
                    type='text'
                    {...username}
                    placeholder='username'

                />
            </div>
            <div>

            </div>
            <div>
                Password<br />
                <input
                    type='password'
                    {...password}
                    placeholder='password'
                />
            </div>
            {authError &&
            <div>
                <><small style={{ color: 'red' }}>Username or password are incorrect</small><br /></>
            </div>
            }

            <div>
                <input
                    type='button'
                    value='Login'
                    onClick={() => handleLogin(username.value, password.value)}
                />
            </div>
        </div>
    )
}