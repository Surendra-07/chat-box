import { Switch } from 'react-router-dom';
import Signin from './Pages/Signin';
import Home from './Pages/Home';
import PrivateRoute from './components/PrivateRoute';

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
