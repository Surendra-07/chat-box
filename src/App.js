import { Switch } from 'react-router-dom';
import Signin from './Pages/Signin';
import Home from './Pages/Home';
import 'rsuite/dist/styles/rsuite-default.css';
import PrivateRoute from './components/PrivateRoute';
import './styles/main.scss';
function App() {
  return (
    <Switch>
      <PrivateRoute path="/signin">
        <Signin />
      </PrivateRoute>
      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
