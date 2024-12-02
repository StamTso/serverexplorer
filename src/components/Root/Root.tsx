import { Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import ServersDashboard from '../ServersDashboard/ServersDashboard';
import { useAuthContext } from '../../hooks/useAuthContext';
import { BASE_PATHS, LOGIN_PATH, SERVERS_LIST_PATH } from '../../constants/routerConstants';

const Root = () => { 
  const{isUserAuthenticated} = useAuthContext()
  
  return (
    <div>
      <Routes>
            {BASE_PATHS.map(path=> {
              return <Route path={path} element={<LoginForm />} key={path}/>
            })}         
            <Route path={SERVERS_LIST_PATH} element={isUserAuthenticated? <ServersDashboard /> : <Navigate to={LOGIN_PATH} />} />
        </Routes>        
    </div>
  );
};

export default Root;
