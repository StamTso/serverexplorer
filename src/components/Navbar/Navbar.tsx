import React from 'react';
import { useHistory } from 'react-router-dom'
import './styles/Navbar.css';

export default function Navbar(props: {location: {pathname: string}}) {
    const history = useHistory();

    const handleLogout = () => {
        sessionStorage.removeItem('auth-token');
        history.replace('/login');
    };

    return (
        <nav>
            <div className="navbar-brand">
                <span>
                    <h1>Server Explorer</h1>
                </span>
            </div>
            {
                props.location.pathname !== '/login' &&
                <div className="button-container">
                    <input
                        className="logout-button"
                        type='button'
                        value='Log Out'
                        onClick={() => handleLogout()}
                    />
                </div>
            }
        </nav>
    )
}