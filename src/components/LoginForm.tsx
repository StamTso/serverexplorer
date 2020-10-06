import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import useFormInput from '../utils/hooks/useFormInput'
import apiService from '../utils/apiService';
import {ROUTES} from '../utils/constants/ROUTES';
import {authToken} from '../utils/constants/API_CONSTANTS';

export default function LoginForm() {
    const username = useFormInput('');
    const password = useFormInput('');
    const history = useHistory();
    const[hasLoginError, setHasLoginError] = useState(false);

    if(sessionStorage[authToken]) {
        history.replace(ROUTES.SERVER_LIST);
    }

    const handleLogin = (username: string, password: string) => {
        const payload = {username: username, password: password};
        apiService.authorize(payload).then(response => {
            if(response){
                sessionStorage.setItem(authToken, response);
                history.replace(ROUTES.SERVER_LIST);
                setHasLoginError(false);
            } else {
                setHasLoginError(true);
            }
        });
    }

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
            {hasLoginError &&
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