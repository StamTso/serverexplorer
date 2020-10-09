import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';
import { ServerList } from '../components/ServerList/ServerList';
import Navbar from '../components/Navbar/Navbar';
import { ROUTES } from '../utils/constants/ROUTES';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            path={ROUTES.LOGIN}
          >
            <LoginForm />
          </Route>
          <Route
            path={ROUTES.SERVER_LIST}
          >
            <ServerList />
          </Route>
        </Switch>
      </div>
    </Router>

  );
}

export default App;
