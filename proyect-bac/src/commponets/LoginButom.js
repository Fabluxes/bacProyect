import React from "react";

import { useAuth0 } from "@auth0/auth0-react";


const LoginButom = () => {
  const { loginWithRedirect } = useAuth0();

  return <button  id="LogB" type="button" onClick={() => loginWithRedirect()} className="btn btn-info btn-sm">Login/Register</button>;
};

export default LoginButom;
