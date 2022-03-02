import React from "react";

import { useAuth0 } from "@auth0/auth0-react";


const LogoutButom = () => {
  const { logout } = useAuth0();

  return <button  id="LogB" type="button" onClick={() => logout()} className="btn btn-danger btn-sm">Logout</button>;
};

export default LogoutButom;
