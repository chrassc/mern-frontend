import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="NavbarItems">
      <Link to="/">
      <h1><strong>한국재난정보</strong></h1>
      </Link>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/disaster-list">
          <li>Disaster List</li>
        </Link>
        <Link to="/disaster-map">
          <li>Disaster Map</li>
        </Link>
        <Link to="/map">
          <li>Map</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav
