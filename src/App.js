import { useAuth0 } from "@auth0/auth0-react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Login from "./components/login/login.component";
import Home from "./components/home/home.component";
import Loader from "./components/utils/loader.component";

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  console.log(user);

  const PublicRoute = ({ exact, path, children }) =>
    isLoading ? (
      <Loader />
    ) : isAuthenticated ? (
      <Redirect to="/" />
    ) : (
      <Route exact={exact ? true : false} path={path} children={children} />
    );

  const PrivateRoute = ({ exact, path, children }) =>
    isLoading ? (
      <Loader />
    ) : !user ? (
      <Redirect to="/login" />
    ) : (
      <Route exact={exact ? true : false} path={path} children={children} />
    );

  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" children={<Home />} />
        <PublicRoute path="/login" children={<Login />} />
      </Switch>
    </Router>
  );
}

export default App;
