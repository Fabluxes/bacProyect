import React from "react";

import { useAuth0 } from "@auth0/auth0-react";


const InfoUser = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
   isAuthenticated && (
      <div>
        <span className="navbar-text" >Bienvenid@ {user.name}!</span>
      
      </div>
    )





);
};

export default InfoUser;
