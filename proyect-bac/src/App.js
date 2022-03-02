
import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Landing_page from "./pages/Landing_page";

import Categorias from "./pages/Categorias";
import Productos from "./pages/Productos";
import Contactos from "./pages/Contactos";









function App() {


  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Landing_page/>}/>
          <Route exact path="/categ" element={<Categorias/>}/>
          <Route exact path="/products" element={<Productos/>}/>
          <Route exact path="/contacts" element={<Contactos/>}/>
        </Routes>

      </Router>

      

    </div>
  );
}

export default App;
