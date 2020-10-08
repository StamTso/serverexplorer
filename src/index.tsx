import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './main/App';
import { StateProvider } from './store.js';

ReactDOM.render(
  <React.StrictMode>
      <StateProvider>
          <App />
      </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

