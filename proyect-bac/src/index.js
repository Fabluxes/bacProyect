import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";

import NavBar from "./NavBar";

import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";
//Llamamos a las variables de entorno

const domain= process.env.REACT_APP_AUDOM
const clientId=process.env.REACT_APP_CLIENTID







ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
        <App />
     
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
