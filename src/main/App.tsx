import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import {ServerList} from '../components/ServerList';
import Navbar from '../components/Navbar';
import {ROUTES} from '../utils/constants/ROUTES';
import '../styles/App.css';

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
