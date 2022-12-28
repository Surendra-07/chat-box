import { Switch } from 'react-router-dom';
import Signin from './Pages/Signin';
import Home from './Pages/Home';
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoute from './components/PrivateRoute';
import './styles/main.scss';
import { ProfileProvider } from './context/profile.context';
import PublicRoute from './components/PublicRoute';
function App() {
  return (
    <ProfileProvider>
      <Switch>
        <PublicRoute exact path="/signin">
          <Signin />
        </PublicRoute>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </ProfileProvider>
  );
}

export default App;
