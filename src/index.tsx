import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/App';
import { StateProvider } from './store';

const app = (
    <StateProvider>
        <App />
    </StateProvider>
);

ReactDOM.render(app, document.getElementById('root'));

