import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import patitoLogo from './componentes/patito.png';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={patitoLogo} alt="Logo Patito" style={{ width: '55px', height: '55px', borderRadius: '10%' }} />
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inventario</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/charts">Gráficas</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;