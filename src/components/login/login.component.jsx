import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import "./login.css";

const LoginButton = () => {
  const { loginWithPopup, loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const Login = () => {
  return (
    <div className="login container">
      <LoginButton />
    </div>
  );
};

export default Login;
