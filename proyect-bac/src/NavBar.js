import React from "react";
import LoginButom from "./commponets/LoginButom";
import LogoutButom from "./commponets/Logout";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import InfoUser from "./commponets/InfoUser";

function NavBar() {
  const { isAuthenticated } = useAuth0();
  const { name, picture, email } = isAuthenticated;

  var nombreUsuario;
  var accestocategorias;
  var accestoproducts;
  if (isAuthenticated) {
    nombreUsuario = <InfoUser/>;
    accestocategorias = (
      <li className="nav-item">
        <Link className="nav-link" to="/categ">
          Categoria
        </Link>
      </li>
    );
 accestoproducts = (
      <li className="nav-item">
        <Link className="nav-link" to="/products">
          Productos
        </Link>
      </li>
    );
  var accestocontacts=(<li className="nav-item">
        <Link className="nav-link" to="/contacts">
          Contactos
        </Link>
      </li>);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="nav-link" to="">
        <img src="https://i.ibb.co/vwdJq5n/Logo-TV-2015.png" width="70" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav m-left">
          <li className="nav-item">
            <Link className="nav-link" to="">
              Home
            </Link>
          </li>

          {accestocategorias}

           {accestoproducts}

{accestocontacts}

          <li className="nav-item">
            {<a className="nav-link">{nombreUsuario}</a>}
          </li>

          <li className="nav-item">
            <a className="nav-link">
              {isAuthenticated ? <LogoutButom /> : <LoginButom />}
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
export default NavBar;
