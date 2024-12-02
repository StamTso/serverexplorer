import { BrowserRouter as Router } from 'react-router-dom';
import Root from './components/Root/Root';
import { AuthContextProvider } from './context/AuthContext';
import { ServerContextProvider } from './context/ServerContext';

function App() {
  return (
    <AuthContextProvider>
      <ServerContextProvider>
        <Router>
          <Root />
        </Router>
      </ServerContextProvider>
    </AuthContextProvider>
  )
}

export default App
